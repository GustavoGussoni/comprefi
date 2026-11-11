import { useMemo, useState } from "react";
import { PackageCheck, Plus, Search, Trash2 } from "lucide-react";
import {
  itemFromCatalog,
  newItem,
  type CatalogItem,
  type SaleItem,
} from "./model";
import { Button, Field, ProductThumbnail, Select } from "./ui";

type Group = { slug: string; model: string; category: string };

export default function ProductItemsEditor({
  items,
  catalog,
  loading,
  error,
  onChange,
}: {
  items: SaleItem[];
  catalog: CatalogItem[];
  loading: boolean;
  error: string;
  onChange: (items: SaleItem[]) => void;
}) {
  const [query, setQuery] = useState("");
  const groups = useMemo<Group[]>(
    () =>
      Array.from(
        new Map(
          catalog.map((item) => [
            item.groupSlug,
            {
              slug: item.groupSlug,
              model: item.product || item.model,
              category: item.category,
            },
          ]),
        ).values(),
      ),
    [catalog],
  );
  const visible = groups.filter((group) =>
    `${group.model} ${group.category}`
      .toLocaleLowerCase("pt-BR")
      .includes(query.trim().toLocaleLowerCase("pt-BR")),
  );
  const patch = (lineId: string, changes: Partial<SaleItem>) =>
    onChange(
      items.map((item) =>
        item.lineId === lineId ? { ...item, ...changes } : item,
      ),
    );
  const choose = (item: SaleItem, value: string) => {
    if (value === "manual") {
      patch(item.lineId, {
        ...newItem(),
        lineId: item.lineId,
        groupSlug: "manual",
        quantity: item.quantity,
      });
      return;
    }
    const variant = catalog.find((entry) => entry.groupSlug === value);
    if (variant) patch(item.lineId, itemFromCatalog(variant, item));
  };

  return (
    <div className="cf-items-editor">
      <div className="cf-catalog-info">
        <PackageCheck size={17} />
        <span>
          Selecione o produto vendido. O preço continua sendo o combinado.
        </span>
        <small>
          {loading
            ? "Carregando catálogo…"
            : error
              ? "Catálogo indisponível"
              : `${catalog.length} opções`}
        </small>
      </div>
      {error && (
        <p className="cf-error" role="alert">
          {error} Você ainda pode incluir um produto manual sem vínculo com
          variante.
        </p>
      )}
      <label className="cf-catalog-search">
        <Search size={17} />
        <input
          aria-label="Buscar modelo no catálogo"
          placeholder="Buscar iPhone, MacBook, iPad…"
          value={query}
          disabled={loading || Boolean(error)}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      {items.map((item, index) => {
        const options = catalog.filter(
          (entry) => entry.groupSlug === item.groupSlug,
        );
        const storages = Array.from(
          new Set(options.map((entry) => entry.storage)),
        );
        const colors = Array.from(
          new Set(
            options
              .filter((entry) => entry.storage === item.storage)
              .map((entry) => entry.color),
          ),
        );
        const manual = item.groupSlug === "manual";
        const selectedVariant = catalog.find(
          (entry) => entry.id === item.variantId,
        );
        const declareCondition = Boolean(
          selectedVariant && !selectedVariant.condition,
        );
        const declaredSeminovo =
          declareCondition && item.condition === "Seminovo";
        const selectedGroup = groups.find(
          (group) => group.slug === item.groupSlug,
        );
        const listed =
          selectedGroup &&
          !visible.some((group) => group.slug === item.groupSlug)
            ? [selectedGroup, ...visible]
            : visible;
        const catalogItemMissing =
          Boolean(item.variantId) &&
          !catalog.some((entry) => entry.id === item.variantId);
        const crmPending =
          Boolean(item.variantId) &&
          (declaredSeminovo ||
            !item.crmSku ||
            item.crmMappingStatus === "pending");
        return (
          <section
            className="cf-item-editor"
            key={item.lineId}
            aria-label={`Item ${index + 1}`}
          >
            <div className="cf-item-editor-top">
              <span>ITEM {String(index + 1).padStart(2, "0")}</span>
              <button
                type="button"
                className="cf-item-remove"
                aria-label={`Remover item ${index + 1}`}
                disabled={items.length === 1}
                onClick={() =>
                  onChange(
                    items.filter((entry) => entry.lineId !== item.lineId),
                  )
                }
              >
                <Trash2 size={15} /> Remover
              </button>
            </div>
            <div className="cf-item-editor-content">
              <ProductThumbnail item={item} />
              <div className="cf-fields">
                <Select
                  label={`Produto do item ${index + 1}`}
                  required
                  value={manual ? "manual" : item.groupSlug}
                  disabled={loading}
                  onChange={(event) => choose(item, event.target.value)}
                >
                  <option value="" disabled>
                    Selecionar produto
                  </option>
                  {listed.map((group) => (
                    <option key={group.slug} value={group.slug}>
                      {group.model} · {group.category}
                    </option>
                  ))}
                  <option value="manual">
                    Produto não cadastrado · informar manualmente
                  </option>
                </Select>
                {manual ? (
                  <Field
                    label={`Modelo do item ${index + 1}`}
                    required
                    value={item.product}
                    placeholder="Nome exato do produto negociado"
                    onChange={(event) =>
                      patch(item.lineId, { product: event.target.value })
                    }
                  />
                ) : (
                  <Field
                    label={`Modelo do item ${index + 1}`}
                    value={item.product}
                    readOnly
                  />
                )}
                {!manual && item.variantId && (
                  <Field
                    label={`SKU do item ${index + 1}`}
                    value={
                      declaredSeminovo
                        ? "SKU pendente para seminovo"
                        : item.crmSku || "SKU pendente"
                    }
                    readOnly
                  />
                )}
                {manual ? (
                  <Field
                    label={`Armazenamento do item ${index + 1}`}
                    required
                    value={item.storage}
                    onChange={(event) =>
                      patch(item.lineId, { storage: event.target.value })
                    }
                  />
                ) : (
                  <Select
                    label={`Armazenamento do item ${index + 1}`}
                    required
                    disabled={!options.length}
                    value={item.storage}
                    onChange={(event) => {
                      const variant =
                        options.find(
                          (entry) =>
                            entry.storage === event.target.value &&
                            entry.color === item.color,
                        ) ||
                        options.find(
                          (entry) => entry.storage === event.target.value,
                        );
                      if (variant)
                        patch(item.lineId, itemFromCatalog(variant, item));
                    }}
                  >
                    <option value="" disabled>
                      Selecionar capacidade
                    </option>
                    {storages.map((storage) => (
                      <option key={storage}>{storage}</option>
                    ))}
                  </Select>
                )}
                {manual ? (
                  <Field
                    label={`Cor do item ${index + 1}`}
                    required
                    value={item.color}
                    onChange={(event) =>
                      patch(item.lineId, { color: event.target.value })
                    }
                  />
                ) : (
                  <Select
                    label={`Cor do item ${index + 1}`}
                    required
                    disabled={!colors.length}
                    value={item.color}
                    onChange={(event) => {
                      const variant = options.find(
                        (entry) =>
                          entry.storage === item.storage &&
                          entry.color === event.target.value,
                      );
                      if (variant)
                        patch(item.lineId, itemFromCatalog(variant, item));
                    }}
                  >
                    <option value="" disabled>
                      Selecionar cor
                    </option>
                    {colors.map((color) => (
                      <option key={color}>{color}</option>
                    ))}
                  </Select>
                )}
                <Field
                  label={`Quantidade do item ${index + 1}`}
                  type="number"
                  min="1"
                  max="20"
                  step="1"
                  required
                  value={item.quantity}
                  onChange={(event) =>
                    patch(item.lineId, { quantity: Number(event.target.value) })
                  }
                />
                {manual || declareCondition ? (
                  <Select
                    label={`Condição do item ${index + 1}`}
                    required
                    value={item.condition}
                    onChange={(event) =>
                      patch(item.lineId, { condition: event.target.value })
                    }
                  >
                    <option value="" disabled>
                      Confirme a condição negociada
                    </option>
                    <option>Novo e lacrado</option>
                    <option>Seminovo</option>
                  </Select>
                ) : (
                  <Field
                    label={`Condição do item ${index + 1}`}
                    value={item.condition || "Selecionar produto"}
                    readOnly
                  />
                )}
              </div>
            </div>
            <p className="cf-item-footnote">
              {manual
                ? "Item manual: PDF e cadastro continuam; só o CRM fica bloqueado."
                : crmPending
                  ? "SKU pendente: PDF e cadastro continuam; só o CRM fica bloqueado."
                  : catalogItemMissing
                    ? "A variante deste pedido não está no catálogo central atual. Selecione outra variante ou marque o item como manual."
                    : item.variantId
                      ? declareCondition
                        ? "Modelo, cor e capacidade vinculados ao Catálogo. Confirme a condição, pois ela não foi informada no cadastro central."
                        : "Modelo, cor, capacidade e condição vinculados à variante do catálogo central."
                      : "Selecione um modelo depois que o catálogo central terminar de carregar."}
            </p>
          </section>
        );
      })}
      <Button
        secondary
        disabled={items.length >= 20}
        onClick={() => onChange([...items, newItem()])}
      >
        <Plus size={17} /> Adicionar outro produto
      </Button>
      <p className="cf-help">
        Adicionar, remover ou trocar itens não altera o valor do pedido. Informe
        o total negociado na etapa Pagamento.
      </p>
    </div>
  );
}
