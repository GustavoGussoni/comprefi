import { useState } from "react";
import { Plus, Trash2, Search, PackageCheck } from "lucide-react";
import { catalogProducts } from "./catalogProducts";
import { newItem, itemFromCatalog, type SaleItem } from "./model";
import { Button, Field, Select, ProductThumbnail } from "./ui";

const groups = Array.from(
  new Map(
    catalogProducts.map(v => [
      v.groupSlug,
      { slug: v.groupSlug, model: v.model, category: v.category },
    ])
  ).values()
);

export default function ProductItemsEditor({
  items,
  onChange,
}: {
  items: SaleItem[];
  onChange: (items: SaleItem[]) => void;
}) {
  const [query, setQuery] = useState("");
  const visible = groups.filter(g =>
    `${g.model} ${g.category}`
      .toLocaleLowerCase("pt-BR")
      .includes(query.trim().toLocaleLowerCase("pt-BR"))
  );
  const patch = (lineId: string, changes: Partial<SaleItem>) =>
    onChange(items.map(i => (i.lineId === lineId ? { ...i, ...changes } : i)));
  const choose = (item: SaleItem, slug: string) => {
    const variant = catalogProducts.find(v => v.groupSlug === slug);
    if (variant) patch(item.lineId, itemFromCatalog(variant, item));
    else
      patch(item.lineId, {
        ...newItem(),
        lineId: item.lineId,
        quantity: item.quantity,
        groupSlug: slug,
      });
  };
  return (
    <div className="cf-items-editor">
      <div className="cf-catalog-info">
        <PackageCheck size={17} />
        <span>
          Modelos e variantes do catálogo. O valor final é seu combinado.
        </span>
        <small>Cópia de leitura · prévia</small>
      </div>
      <label className="cf-catalog-search">
        <Search size={17} />
        <input
          aria-label="Buscar modelo no catálogo"
          placeholder="Buscar iPhone, MacBook, iPad…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </label>
      {items.map((item, index) => {
        const options = catalogProducts.filter(
          v => v.groupSlug === item.groupSlug
        );
        const storages = Array.from(new Set(options.map(v => v.storage)));
        const colors = Array.from(
          new Set(
            options.filter(v => v.storage === item.storage).map(v => v.color)
          )
        );
        const manual = item.groupSlug === "manual";
        const selectedGroup = groups.find(g => g.slug === item.groupSlug);
        const listed =
          selectedGroup && !visible.some(g => g.slug === item.groupSlug)
            ? [selectedGroup, ...visible]
            : visible;
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
                  onChange(items.filter(i => i.lineId !== item.lineId))
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
                  value={item.groupSlug}
                  onChange={e => choose(item, e.target.value)}
                >
                  <option value="" disabled>
                    Selecionar produto
                  </option>
                  {listed.map(g => (
                    <option key={g.slug} value={g.slug}>
                      {g.model} · {g.category}
                    </option>
                  ))}
                  <option value="manual">
                    Produto não cadastrado · informar manualmente
                  </option>
                </Select>
                {manual && (
                  <Field
                    label={`Modelo do item ${index + 1}`}
                    required
                    value={item.product}
                    placeholder="Nome exato do produto negociado"
                    onChange={e =>
                      patch(item.lineId, { product: e.target.value })
                    }
                  />
                )}
                {manual ? (
                  <Field
                    label={`Armazenamento do item ${index + 1}`}
                    required
                    value={item.storage}
                    onChange={e =>
                      patch(item.lineId, { storage: e.target.value })
                    }
                  />
                ) : (
                  <Select
                    label={`Armazenamento do item ${index + 1}`}
                    required
                    disabled={!options.length}
                    value={item.storage}
                    onChange={e => {
                      const variant =
                        options.find(
                          v =>
                            v.storage === e.target.value &&
                            v.color === item.color
                        ) || options.find(v => v.storage === e.target.value);
                      if (variant)
                        patch(item.lineId, itemFromCatalog(variant, item));
                    }}
                  >
                    <option value="" disabled>
                      Selecionar capacidade
                    </option>
                    {storages.map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </Select>
                )}
                {manual ? (
                  <Field
                    label={`Cor do item ${index + 1}`}
                    required
                    value={item.color}
                    onChange={e =>
                      patch(item.lineId, { color: e.target.value })
                    }
                  />
                ) : (
                  <Select
                    label={`Cor do item ${index + 1}`}
                    required
                    disabled={!colors.length}
                    value={item.color}
                    onChange={e => {
                      const variant = options.find(
                        v =>
                          v.storage === item.storage &&
                          v.color === e.target.value
                      );
                      if (variant)
                        patch(item.lineId, itemFromCatalog(variant, item));
                    }}
                  >
                    <option value="" disabled>
                      Selecionar cor
                    </option>
                    {colors.map(c => (
                      <option key={c}>{c}</option>
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
                  onChange={e =>
                    patch(item.lineId, { quantity: Number(e.target.value) })
                  }
                />
                {manual ? (
                  <Select
                    label={`Condição do item ${index + 1}`}
                    value={item.condition}
                    onChange={e =>
                      patch(item.lineId, { condition: e.target.value })
                    }
                  >
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
                ? "Item manual: sem vínculo ou foto do catálogo; não cria produto no banco."
                : item.variantId
                  ? "Modelo, cor e capacidade vinculados à variante do catálogo. Foto ilustrativa da vitrine."
                  : "Selecione um modelo para carregar as capacidades e cores cadastradas."}
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
        Adicionar, remover ou trocar itens não altera o valor da ficha. Informe
        o total negociado na condição financeira.
      </p>
    </div>
  );
}
