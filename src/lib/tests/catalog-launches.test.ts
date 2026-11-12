import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { launchProducts } from "../../data/products/launch-products";
import { categoryRegistry, findGroupedProductBySlug } from "../../data/categories";
import { resolveCatalogGallery, resolveCatalogImages } from "../catalogImages";
import { sellableCatalogProduct } from "../sellableCatalogProduct";
import { sellableMacbook } from "../sellableMacbook";
import { canSaveCatalogPricing, hasPositiveCost } from "../catalogPricingGate";
import { getVariantPrice, getLowestPrice, hasValidVariantPricing, isPositivePrice, pricingKey } from "../../types/product";
import type { GroupedProduct, VariantPricing } from "../../types/product";

const root = process.cwd();
const manifest = JSON.parse(readFileSync(process.env.CATALOG_MANIFEST!, "utf8"));
const assets = JSON.parse(readFileSync(process.env.ASSETS_MANIFEST!, "utf8"));
const baseline = JSON.parse(readFileSync(process.env.CATALOG_BASELINE!, "utf8"));
const price: VariantPricing = { pixPrice: "R$ 1.000,00", originalPrice: "R$ 1.200,00", installmentPrice: "R$ 100,00" };

function groupedRegistry() {
  return Object.values(categoryRegistry).flatMap((category) => [
    ...(category.groupedProducts || []),
    ...(category.groupedSections || []).flatMap((section) => section.products),
  ]);
}

function remote(product: GroupedProduct) {
  const activeVariants = product.storages.flatMap((storage) => product.colors.map((color) => ({ storage, color: color.name, isActive: true })));
  return { isActive: true, activeVariants, pricing: Object.fromEntries(activeVariants.map((variant) => [pricingKey(variant.storage, variant.color), price])) };
}

test("3 grupos e 62 variantes idênticos ao manifesto central; preços locais vazios", () => {
  assert.equal(launchProducts.length, 3);
  let variants = 0;
  for (const product of launchProducts) {
    const group = manifest.groups.find((entry: { slug: string }) => entry.slug === product.slug);
    assert.ok(group);
    for (const key of ["model", "category", "specs", "details", "battery", "storages"] as const) assert.deepEqual(product[key], group[key], key);
    const keys = product.storages.flatMap((storage) => product.colors.map((color) => pricingKey(storage, color.name)));
    assert.deepEqual(keys, group.variants.map((entry: { storage: string; color: string }) => pricingKey(entry.storage, entry.color)));
    variants += keys.length;
    assert.deepEqual(product.pricing, {});
    assert.equal(product.requiresCatalogAvailability, true);
    assert.equal(findGroupedProductBySlug(product.slug)?.product, product);
  }
  assert.equal(variants, 62);
  assert.doesNotMatch(launchProducts[2].specs, /Cellular/);
});

test("100 imagens registradas: caminho, ordem, hash, principal e galeria", () => {
  const used: string[] = [];
  for (const product of launchProducts) {
    for (const color of product.colors) {
      const gallery = resolveCatalogGallery(product, product.storages[0], color.name);
      assert.equal(gallery.length, product.slug === "iphone-duo" ? 5 : 3);
      assert.equal(gallery[0], color.image);
      for (let index = 0; index < gallery.length; index++) {
        const relative = gallery[index].slice(root.length + 1);
        const asset = assets.files.find((entry: { path: string }) => entry.path === relative);
        assert.ok(asset, relative);
        assert.equal(asset.order, index, relative);
        assert.equal(createHash("sha256").update(readFileSync(gallery[index])).digest("hex"), asset.outputSha256);
        used.push(relative);
      }
    }
  }
  assert.equal(used.length, 100);
  assert.equal(new Set(used).size, 100);
  assert.deepEqual([...used].sort(), assets.files.map((entry: { path: string }) => entry.path).sort());
});

test("catálogo anterior preservado integralmente: todos os campos, preços e mappings", () => {
  const current = groupedRegistry().filter((product) => !product.requiresCatalogAvailability);
  assert.deepEqual(current, baseline.grouped);
  assert.deepEqual(Object.values(categoryRegistry).flatMap((category) => [...(category.products || []), ...(category.sections || []).flatMap((section) => section.products)]), baseline.flat);
  for (const product of current) for (const color of product.colors) {
    assert.deepEqual(resolveCatalogGallery(product, product.storages[0], color.name), [product.imageByStorage?.[product.storages[0]] ?? color.image, ...color.gallery].filter(Boolean));
  }
  assert.equal(sellableMacbook, sellableCatalogProduct);
});

test("todos os 62 pares selecionam imagens e ofertas corretas após preço e ativação central", () => {
  for (const product of launchProducts) {
    const active = sellableCatalogProduct(product, remote(product));
    assert.ok(active);
    assert.deepEqual(active.storages, product.storages);
    assert.deepEqual(active.colors, product.colors);
    for (const storage of active.storages) for (const color of active.colors) {
      assert.equal(getVariantPrice(active.pricing, storage, color.name), price);
      assert.deepEqual(resolveCatalogImages(active, storage, color.name), { image: color.image, gallery: color.gallery });
    }
  }
});

test("gate fail-closed: pendente, inativo, ausente ou preço inválido não gera produto público", () => {
  for (const product of launchProducts) {
    const r = remote(product);
    assert.equal(sellableCatalogProduct(product, undefined), null);
    assert.equal(sellableCatalogProduct(product, { ...r, isActive: false }), null);
    assert.equal(sellableCatalogProduct(product, { ...r, activeVariants: [] }), null);
    assert.equal(sellableCatalogProduct(product, { ...r, pricing: {} }), null);
    assert.equal(sellableCatalogProduct({ ...product, pricing: r.pricing }, { ...r, pricing: {} }), null);
    assert.equal(sellableCatalogProduct(product, { ...r, activeVariants: r.activeVariants.map((variant) => ({ ...variant, isActive: false })) }), null);
    for (const invalid of ["", "R$ 0,00", "R$ -100,00", "NaN", "Infinity", "texto 500", "R$ 1,00x"]) {
      const invalidPrices = Object.fromEntries(Object.keys(r.pricing).map((key) => [key, { ...price, pixPrice: invalid }]));
      assert.equal(sellableCatalogProduct(product, { ...r, pricing: invalidPrices }), null);
    }
  }
});

test("somente variante ativa e precificada aparece; storage/cor pendente não recebe fallback", () => {
  const product = launchProducts[2];
  const r = remote(product);
  const first = r.activeVariants[0];
  const key = pricingKey(first.storage, first.color);
  const active = sellableCatalogProduct(product, { ...r, activeVariants: [first], pricing: { [key]: price, "46mm": price } });
  assert.ok(active);
  assert.deepEqual(active.storages, [first.storage]);
  assert.deepEqual(active.colors.map((color) => color.name), [first.color]);
  assert.deepEqual(Object.keys(active.pricing), [key]);
  assert.deepEqual(resolveCatalogGallery(product, "42mm", "cor inválida"), []);
});

test("helpers de preço não aceitam oferta zero e preservam fallback válido antigo", () => {
  for (const invalid of ["", "R$ 0,00", "R$ -10,00", "undefined", "R$ 1.234,567"]) assert.equal(isPositivePrice(invalid), false);
  for (const valid of ["R$ 100", "R$ 1.000,00", "R$ 10.000,90", "0,01", "1234,56"]) assert.equal(isPositivePrice(valid), true);
  assert.equal(hasValidVariantPricing({ ...price, installmentPrice: "R$ 0,00" }), false);
  assert.equal(getVariantPrice({ "128GB": price }, "128GB", "Preto"), price);
  assert.equal(getVariantPrice({ "128GB-Preto": { ...price, pixPrice: "R$ 0,00" }, "128GB": price }, "128GB", "Preto"), null);
  assert.equal(getLowestPrice({ zero: { ...price, pixPrice: "R$ 0,00" }, valid: price }), price.pixPrice);
});

test("primeira precificação exige custo real positivo, sem preços provisórios; ofertas antigas editáveis", () => {
  assert.equal(canSaveCatalogPricing(undefined, price, "", false), false);
  assert.equal(canSaveCatalogPricing(undefined, price, "500", true), true);
  assert.equal(canSaveCatalogPricing(undefined, price, "500", false), false);
  assert.equal(canSaveCatalogPricing(undefined, price, "", true), false);
  assert.equal(canSaveCatalogPricing(price, price, "", false), true);
  assert.equal(canSaveCatalogPricing(price, { ...price, pixPrice: "R$ 0,00" }, "500", true), false);
  for (const invalid of ["", "0", "-1", "NaN", "Infinity", "20x"]) assert.equal(hasPositiveCost(invalid), false);
});

test("resolver MacBook mantém exatamente a disponibilidade e saída original em todos os modelos antigos", () => {
  type Remote = ReturnType<typeof remote>;
  function original(local: GroupedProduct, r: Remote | undefined): GroupedProduct | null {
    if (!r?.isActive) return null;
    const available = new Set((r.activeVariants || []).filter((variant) => variant.isActive).map(({ storage, color }) => `${storage}-${color}`));
    const pricing: Record<string, VariantPricing> = {};
    const colorsByStorage: Record<string, string[]> = {};
    const positive = (value: string | undefined) => {
      if (!value) return false;
      const amount = Number(value.replace(/[^\d,]/g, "").replace(",", "."));
      return Number.isFinite(amount) && amount > 0;
    };
    for (const storage of local.storages) for (const color of local.colors) {
      const key = `${storage}-${color.name}`;
      const p = r.pricing[key];
      if (available.has(key) && positive(p?.pixPrice) && positive(p?.installmentPrice) && positive(p?.originalPrice)) {
        pricing[key] = p;
        (colorsByStorage[storage] ||= []).push(color.name);
      }
    }
    const storages = local.storages.filter((storage) => colorsByStorage[storage]);
    if (!storages.length) return null;
    return { ...local, storages, colors: local.colors.filter((color) => storages.some((storage) => colorsByStorage[storage].includes(color.name))), colorsByStorage, pricing };
  }
  const macbooks = groupedRegistry().filter((product) => product.category.toLowerCase() === "macbooks");
  assert.ok(macbooks.length > 0, "Cobertura de MacBooks não pode ser vazia");
  for (const product of macbooks) {
    const r = remote(product);
    const scenarios: (Remote | undefined)[] = [undefined, r, { ...r, isActive: false }, { ...r, pricing: {} }, { ...r, activeVariants: [] }, { ...r, activeVariants: r.activeVariants.map((variant, index) => ({ ...variant, isActive: index % 2 === 0 })) }, { ...r, pricing: Object.fromEntries(Object.keys(r.pricing).map((key, index) => [key, index % 2 ? price : { ...price, pixPrice: "R$ 0,00" }])) }];
    for (const scenario of scenarios) assert.deepEqual(sellableMacbook(product, scenario), original(product, scenario), product.slug);
  }
});
