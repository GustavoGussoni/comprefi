import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { launchProducts } from "../../data/products/launch-products";
import { launchColorAliases, normalizeLaunchColor, normalizeLaunchModel } from "../../data/products/launch-names";
import { sellableCatalogProduct } from "../sellableCatalogProduct";
import { normalizeCatalogLaunchSearch } from "../catalogLaunchUrl";
import { resolveCatalogGallery, resolveCatalogImages } from "../catalogImages";
import { getVariantPrice, pricingKey } from "../../types/product";
import type { GroupedProduct, VariantPricing } from "../../types/product";

interface NameGroup { model: string; oldModel: string; colors: Record<string, string> }
interface NameVariant { slug: string; storage: string; oldColor: string; newColor: string }
const map: { groups: Record<string, NameGroup>; variants: NameVariant[] } = JSON.parse(readFileSync(process.env.CATALOG_NAME_MAP!, "utf8"));
const baseline: { grouped: GroupedProduct[] } = JSON.parse(readFileSync(process.env.CATALOG_BASELINE!, "utf8"));

// Ofertas sintéticas exclusivamente em teste, distintas por par e idioma para detectar trocas.
function offer(index: number): VariantPricing {
  return { pixPrice: `R$ ${1000 + index},01`, originalPrice: `R$ ${2000 + index},02`, installmentPrice: `R$ ${100 + index},03` };
}
function local(variant: NameVariant): GroupedProduct {
  return launchProducts.find((product) => product.slug === variant.slug)!;
}
function remote(variant: NameVariant, activeColor: string, priceColor: string, value: VariantPricing) {
  return { isActive: true, activeVariants: [{ storage: variant.storage, color: activeColor, isActive: true }], pricing: { [pricingKey(variant.storage, priceColor)]: value } };
}

test("mapa exclusivo: 3 slugs, 32 cores, 62 pares, modelos e aliases EN/PT exatos", () => {
  assert.equal(Object.keys(map.groups).length, 3);
  assert.equal(Object.values(map.groups).reduce((sum, group) => sum + Object.keys(group.colors).length, 0), 32);
  assert.equal(map.variants.length, 62);
  assert.equal(new Set(map.variants.map((variant) => `${variant.slug}:${variant.storage}:${variant.newColor}`)).size, 62);
  for (const product of launchProducts) {
    const group = map.groups[product.slug];
    assert.equal(product.model, group.model);
    assert.deepEqual(product.colors.map((color) => color.name).sort(), Object.values(group.colors).sort());
    for (const [en, pt] of Object.entries(group.colors)) {
      assert.equal(normalizeLaunchColor(product.slug, en), pt);
      assert.equal(normalizeLaunchColor(product.slug, pt), pt);
      assert.deepEqual(launchColorAliases(product.slug, en), [pt, en]);
      assert.deepEqual(launchColorAliases(product.slug, pt), [pt, en]);
      for (const invalid of [en.toLowerCase(), `${en} `, ` ${pt}`, "cor inválida", "__proto__", "constructor"]) {
        assert.equal(normalizeLaunchColor(product.slug, invalid), invalid);
        assert.deepEqual(resolveCatalogGallery(product, product.storages[0], invalid), []);
      }
    }
  }
});

test("62 pares × 4 combinações de idioma da ativação/preço: preço remoto exato sem misturar ofertas/imagens", () => {
  map.variants.forEach((variant, index) => {
    const product = local(variant);
    const color = product.colors.find((entry) => entry.name === variant.newColor)!;
    const old = baseline.grouped.find((entry) => entry.slug === variant.slug)!;
    const oldColor = old.colors.find((entry) => entry.name === variant.oldColor)!;
    assert.deepEqual({ ...color, name: variant.oldColor }, oldColor);
    for (const activeColor of [variant.oldColor, variant.newColor]) {
      for (const priceColor of [variant.oldColor, variant.newColor]) {
        const value = offer(index);
        const r = remote(variant, activeColor, priceColor, value);
        const snapshot = JSON.stringify(r);
        const active = sellableCatalogProduct(product, r);
        assert.ok(active);
        assert.equal(JSON.stringify(r), snapshot, "não mutar chaves remotas/snapshots");
        assert.deepEqual(active.storages, [variant.storage]);
        assert.deepEqual(active.colors.map((entry) => entry.name), [variant.newColor]);
        assert.deepEqual(active.colorsByStorage, { [variant.storage]: [variant.newColor] });
        assert.deepEqual(Object.keys(active.pricing), [pricingKey(variant.storage, variant.newColor)]);
        assert.equal(getVariantPrice(active.pricing, variant.storage, variant.newColor), value);
        for (const alias of [variant.oldColor, variant.newColor]) {
          assert.deepEqual(resolveCatalogImages(active, variant.storage, alias), { image: oldColor.image, gallery: oldColor.gallery });
        }
      }
    }
  });
});

test("62 pares EN/PT: inatividade, grupo ausente/inativo e três campos de preço inválido nunca recebem fallback", () => {
  const invalidValues = ["", "R$ 0,00", "R$ -1,00", "NaN", "Infinity", "texto 500", "R$ 1,00x"];
  map.variants.forEach((variant, index) => {
    const product = local(variant);
    for (const alias of [variant.oldColor, variant.newColor]) {
      const r = remote(variant, alias, alias, offer(index));
      assert.equal(sellableCatalogProduct(product, undefined), null);
      assert.equal(sellableCatalogProduct(product, { ...r, isActive: false }), null);
      assert.equal(sellableCatalogProduct(product, { ...r, activeVariants: [] }), null);
      assert.equal(sellableCatalogProduct(product, { ...r, activeVariants: r.activeVariants.map((entry) => ({ ...entry, isActive: false })) }), null);
      assert.equal(sellableCatalogProduct(product, { ...r, pricing: {} }), null);
      assert.equal(sellableCatalogProduct({ ...product, pricing: r.pricing }, { ...r, pricing: {} }), null);
      assert.equal(sellableCatalogProduct(product, { ...r, pricing: { [variant.storage]: offer(index) } }), null);
      for (const field of ["pixPrice", "originalPrice", "installmentPrice"] as const) {
        for (const invalid of invalidValues) {
          assert.equal(sellableCatalogProduct(product, { ...r, pricing: { [pricingKey(variant.storage, alias)]: { ...offer(index), [field]: invalid }, [variant.storage]: offer(index) } }), null);
        }
      }
      for (const invalidColor of [`${alias} `, alias.toLowerCase(), "cor inválida"]) {
        assert.equal(sellableCatalogProduct(product, remote(variant, invalidColor, alias, offer(index))), null);
        assert.equal(sellableCatalogProduct(product, remote(variant, alias, invalidColor, offer(index))), null);
      }
      assert.equal(sellableCatalogProduct(product, { ...r, activeVariants: [{ storage: "storage inválido", color: alias, isActive: true }] }), null);
    }
  });
});

test("62 pares: aliases duplicados não reativam variante; PT tem precedência sem fallback de preço inválido", () => {
  map.variants.forEach((variant, index) => {
    const product = local(variant);
    const enKey = pricingKey(variant.storage, variant.oldColor);
    const ptKey = pricingKey(variant.storage, variant.newColor);
    const enPrice = offer(index);
    const ptPrice = offer(index + 100);
    const r = remote(variant, variant.oldColor, variant.oldColor, enPrice);
    const both = { ...r, pricing: { [enKey]: enPrice, [ptKey]: ptPrice } };
    assert.equal(sellableCatalogProduct(product, both)?.pricing[ptKey], ptPrice);
    assert.equal(sellableCatalogProduct(product, { ...both, pricing: { ...both.pricing, [ptKey]: { ...ptPrice, pixPrice: "R$ -1,00" } } }), null);
    for (const [active, inactive] of [[variant.oldColor, variant.newColor], [variant.newColor, variant.oldColor]]) {
      assert.equal(sellableCatalogProduct(product, { ...both, activeVariants: [{ storage: variant.storage, color: active, isActive: true }, { storage: variant.storage, color: inactive, isActive: false }] }), null);
    }
  });
});

test("mistura EN/PT nos 62 pares mantém ofertas únicas e somente pares ativos, sem reativar as quatro combinações Ultra", () => {
  for (const product of launchProducts) {
    const variants = map.variants.filter((variant) => variant.slug === product.slug);
    const pricing = Object.fromEntries(variants.map((variant, index) => [pricingKey(variant.storage, index % 2 ? variant.oldColor : variant.newColor), offer(index)]));
    const activeVariants = variants.map((variant, index) => ({ storage: variant.storage, color: index % 2 ? variant.newColor : variant.oldColor, isActive: index % 3 === 0 }));
    const result = sellableCatalogProduct(product, { isActive: true, pricing, activeVariants });
    assert.ok(result);
    assert.equal(Object.keys(result.pricing).length, activeVariants.filter((variant) => variant.isActive).length);
    variants.forEach((variant, index) => {
      const value = getVariantPrice(result.pricing, variant.storage, variant.newColor);
      if (activeVariants[index].isActive) assert.equal(value, pricing[pricingKey(variant.storage, index % 2 ? variant.oldColor : variant.newColor)]);
      else assert.equal(value, null);
    });
  }
});

test("modelos legados normalizam somente match exato; título customizado e demais metadados do admin preservados", () => {
  for (const product of launchProducts) {
    const group = map.groups[product.slug];
    const variant = map.variants.find((entry) => entry.slug === product.slug)!;
    const r = remote(variant, variant.oldColor, variant.oldColor, offer(0));
    for (const model of [group.oldModel, group.model, ` ${group.oldModel}`, `${group.oldModel} Edição do Admin`, "Meu título personalizado", group.oldModel.toLowerCase()]) {
      const expected = model === group.oldModel ? group.model : model;
      assert.equal(normalizeLaunchModel(product.slug, model), expected);
      const active = sellableCatalogProduct(product, { ...r, model, specs: "Especificações customizadas", details: "Detalhes customizados", battery: "99%" });
      assert.equal(active?.model, expected);
      assert.equal(active?.specs, "Especificações customizadas");
      assert.equal(active?.details, "Detalhes customizados");
      assert.equal(active?.battery, "99%");
    }
  }
});

test("62 URLs antigas EN e URLs PT resolvem exatamente mesmo storage, cor, preço e imagens históricas", () => {
  map.variants.forEach((variant, index) => {
    const product = local(variant);
    const old = baseline.grouped.find((entry) => entry.slug === variant.slug)!;
    const value = offer(index);
    const active = sellableCatalogProduct(product, remote(variant, variant.oldColor, variant.oldColor, value))!;
    const pathname = `/${product.category}/${product.slug}`;
    for (const alias of [variant.oldColor, variant.newColor]) {
      const search = `?storage=${encodeURIComponent(variant.storage)}&color=${encodeURIComponent(alias)}&origem=link-antigo`;
      const url = new URL(`${pathname}${normalizeCatalogLaunchSearch(product.slug, search)}#fotos`, "http://localhost");
      assert.equal(url.pathname, pathname);
      assert.equal(url.hash, "#fotos");
      assert.equal(url.searchParams.get("origem"), "link-antigo");
      const storage = url.searchParams.get("storage")!;
      const color = url.searchParams.get("color")!;
      assert.equal(storage, variant.storage);
      assert.equal(color, variant.newColor);
      assert.ok(active.storages.includes(storage));
      assert.ok(active.colorsByStorage?.[storage].includes(color), "ProductDetail não deve cair na primeira cor");
      assert.equal(getVariantPrice(active.pricing, storage, color), value);
      assert.deepEqual(resolveCatalogGallery(active, storage, color), resolveCatalogGallery(old, variant.storage, variant.oldColor));
      assert.equal(normalizeCatalogLaunchSearch(product.slug, url.search), url.search, "normalização idempotente");
    }
  });
});

test("aliases não escapam dos três slugs; URLs desconhecidas permanecem byte a byte e imagens aceitam EN/PT nos dois sentidos", () => {
  const variant = map.variants[0];
  const product = local(variant);
  const color = product.colors[0];
  const legacy = { ...product, colors: [{ ...color, name: variant.oldColor }] };
  assert.deepEqual(resolveCatalogImages(legacy, variant.storage, variant.newColor), resolveCatalogImages(product, variant.storage, variant.oldColor));
  for (const slug of ["iphone-17", "apple-watch-ultra-3", "iphone-duo-custom", "__proto__", "constructor"]) {
    assert.equal(normalizeLaunchColor(slug, variant.oldColor), variant.oldColor);
    assert.equal(normalizeLaunchModel(slug, map.groups[product.slug].oldModel), map.groups[product.slug].oldModel);
    const search = "?storage=256GB&color=Star%20White&x=%20";
    assert.equal(normalizeCatalogLaunchSearch(slug, search), search);
    assert.deepEqual(resolveCatalogGallery({ ...product, slug }, variant.storage, variant.oldColor), []);
    assert.equal(sellableCatalogProduct({ ...product, slug }, remote(variant, variant.oldColor, variant.oldColor, offer(0))), null);
  }
  for (const search of ["", "?storage=1TB", "?color=star%20white", "?color=Star%20White%20", "?color=cor%20inv%C3%A1lida", "?color=Branco%20Estelar&x=%20"]) {
    assert.equal(normalizeCatalogLaunchSearch(product.slug, search), search);
  }
});
