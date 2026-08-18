import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  Save,
  X,
  Power,
  PowerOff,
  Search,
  Filter,
  Package,
  BarChart3,
  RefreshCw,
  Settings,
  Plus,
  DollarSign,
  Truck,
  Percent,
  Calculator,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ============================================
// Types
// ============================================
interface Variant {
  id: string;
  storage: string;
  color: string;
  originalPrice: string;
  installmentPrice: string;
  pixPrice: string;
  isActive: boolean;
}

interface ProductGroup {
  id: string;
  slug: string;
  model: string;
  category: string;
  section: string | null;
  specs: string | null;
  details: string | null;
  battery: string | null;
  storages: string[];
  isActive: boolean;
  sortOrder: number;
  variantCount: number;
  variants: Variant[];
}

interface CatalogStats {
  totalGroups: number;
  activeGroups: number;
  totalVariants: number;
  activeVariants: number;
  byCategory: { category: string; count: number }[];
}

interface MarginConfig {
  pixMargin: number;
  originalMargin: number;
}

interface FreightConfig {
  [category: string]: number;
}

interface EditingVariantData {
  variantId: string;
  slug: string;
  storage: string;
  color: string;
  cost: string;
  originalPrice: string;
  installmentPrice: string;
  pixPrice: string;
  costEdited: boolean;
}

// ============================================
// Defaults & Helpers
// ============================================
const DEFAULT_MARGINS: MarginConfig = {
  pixMargin: 10,
  originalMargin: 16,
};

const DEFAULT_FREIGHT: FreightConfig = {
  "iphones-novos": 100,
  "iphones-seminovos": 100,
  macbooks: 200,
  ipads: 150,
  "apple-watch": 80,
  acessorios: 50,
};

const categoryLabels: Record<string, string> = {
  "iphones-novos": "iPhones Novos",
  "iphones-seminovos": "iPhones Seminovos",
  macbooks: "MacBooks",
  ipads: "iPads",
  "apple-watch": "Apple Watch",
  acessorios: "Acessórios",
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("admin_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Parse "R$ 1.234,56" → 1234.56
const parseBRL = (value: string): number => {
  if (!value) return 0;
  const cleaned = value.replace(/[R$\s.]/g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
};

// 1234.56 → "R$ 1.234,56"
const formatBRL = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

// Carregar config do localStorage
const loadMargins = (): MarginConfig => {
  try {
    const saved = localStorage.getItem("comprefi_margins");
    if (saved) return JSON.parse(saved);
  } catch {}
  return DEFAULT_MARGINS;
};

const loadFreight = (): FreightConfig => {
  try {
    const saved = localStorage.getItem("comprefi_freight");
    if (saved) return { ...DEFAULT_FREIGHT, ...JSON.parse(saved) };
  } catch {}
  return DEFAULT_FREIGHT;
};

// ============================================
// Sub-components
// ============================================

// Painel de configuração de margens e frete
const ConfigPanel: React.FC<{
  margins: MarginConfig;
  freight: FreightConfig;
  onMarginsChange: (m: MarginConfig) => void;
  onFreightChange: (f: FreightConfig) => void;
  categories: string[];
}> = ({ margins, freight, onMarginsChange, onFreightChange, categories }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 space-y-4">
      <h4 className="text-sm font-semibold text-gray-300 flex items-center space-x-2">
        <Settings className="w-4 h-4 text-gray-400" />
        <span>Configuracoes de Calculo</span>
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Margens */}
        <div className="space-y-3">
          <p className="text-xs text-gray-400 flex items-center space-x-1">
            <Percent className="w-3 h-3" />
            <span>Margens (quanto menor o %, maior o preco final)</span>
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Margem PIX (%)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="50"
                  step="0.5"
                  value={margins.pixMargin}
                  onChange={(e) =>
                    onMarginsChange({
                      ...margins,
                      pixMargin: parseFloat(e.target.value) || 10,
                    })
                  }
                  className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  / {(1 - margins.pixMargin / 100).toFixed(4)}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Margem Original (%)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="50"
                  step="0.5"
                  value={margins.originalMargin}
                  onChange={(e) =>
                    onMarginsChange({
                      ...margins,
                      originalMargin: parseFloat(e.target.value) || 16,
                    })
                  }
                  className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  / {(1 - margins.originalMargin / 100).toFixed(4)}
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            PIX = (Custo + Frete) / {(1 - margins.pixMargin / 100).toFixed(2)} |
            Original = (Custo + Frete) /{" "}
            {(1 - margins.originalMargin / 100).toFixed(2)} | 12x = (PIX /
            0.877) / 12
          </p>
        </div>

        {/* Frete por categoria */}
        <div className="space-y-3">
          <p className="text-xs text-gray-400 flex items-center space-x-1">
            <Truck className="w-3 h-3" />
            <span>Frete por Categoria</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <label
                  className="text-xs text-gray-500 w-28 truncate"
                  title={categoryLabels[cat] || cat}
                >
                  {categoryLabels[cat] || cat}
                </label>
                <div className="flex items-center">
                  <span className="text-xs text-gray-600 mr-1">R$</span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={freight[cat] || 0}
                    onChange={(e) =>
                      onFreightChange({
                        ...freight,
                        [cat]: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Formulário para novo produto
const NewProductForm: React.FC<{
  onSave: (slug: string) => void;
  onCancel: () => void;
  categories: string[];
}> = ({ onSave, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    slug: "",
    model: "",
    category: categories[0] || "iphones-novos",
    section: "",
    specs: "",
    details: "",
    battery: "",
    storages: ["128 GB"],
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!formData.slug || !formData.model || !formData.category) {
      alert("Preencha slug, nome e categoria");
      return;
    }
    try {
      setSaving(true);
      const res = await fetch(`${API_URL}/catalog/admin/products`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          slug: formData.slug,
          model: formData.model,
          category: formData.category,
          section: formData.section || null,
          specs: formData.specs || null,
          details: formData.details || null,
          battery: formData.battery || null,
          storages: formData.storages.filter((s) => s.trim()),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erro ao criar produto");
      }
      onSave(formData.slug);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addStorage = () => {
    setFormData({ ...formData, storages: [...formData.storages, ""] });
  };

  const updateStorage = (index: number, value: string) => {
    const updated = [...formData.storages];
    updated[index] = value;
    setFormData({ ...formData, storages: updated });
  };

  const removeStorage = (index: number) => {
    setFormData({
      ...formData,
      storages: formData.storages.filter((_, i) => i !== index),
    });
  };

  // Auto-gerar slug a partir do model
  const generateSlug = (model: string) => {
    return model
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 space-y-4 border border-blue-800">
      <h4 className="text-sm font-semibold text-gray-300 flex items-center space-x-2">
        <Plus className="w-4 h-4 text-blue-400" />
        <span>Novo Produto</span>
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">
            Nome do Modelo *
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => {
              const model = e.target.value;
              setFormData({
                ...formData,
                model,
                slug: generateSlug(model),
              });
            }}
            placeholder="iPhone 17 Pro Max"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Slug *</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="iphone-17-pro-max"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">
            Categoria *
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Secao</label>
          <input
            type="text"
            value={formData.section}
            onChange={(e) =>
              setFormData({ ...formData, section: e.target.value })
            }
            placeholder="Linha Pro"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Specs</label>
          <input
            type="text"
            value={formData.specs}
            onChange={(e) =>
              setFormData({ ...formData, specs: e.target.value })
            }
            placeholder='Chip A19 Pro | Tela 6.9"'
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Detalhes</label>
          <input
            type="text"
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            placeholder="Lacrado com NF"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Storages */}
      <div>
        <label className="block text-xs text-gray-400 mb-2">
          Opcoes de Storage
        </label>
        <div className="flex flex-wrap gap-2">
          {formData.storages.map((s, i) => (
            <div key={i} className="flex items-center space-x-1">
              <input
                type="text"
                value={s}
                onChange={(e) => updateStorage(i, e.target.value)}
                placeholder="256 GB"
                className="w-24 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {formData.storages.length > 1 && (
                <button
                  onClick={() => removeStorage(i)}
                  className="p-0.5 hover:bg-gray-700 rounded"
                >
                  <X className="w-3 h-3 text-gray-500" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addStorage}
            className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 px-2 py-1 border border-dashed border-gray-700 rounded"
          >
            <Plus className="w-3 h-3" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-2">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Criando..." : "Criar Produto"}</span>
        </button>
        <button
          onClick={onCancel}
          className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Cancelar</span>
        </button>
      </div>
    </div>
  );
};

// ============================================
// Main Component
// ============================================
const CatalogTable: React.FC = () => {
  const [products, setProducts] = useState<ProductGroup[]>([]);
  const [stats, setStats] = useState<CatalogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showInactive, setShowInactive] = useState(true);

  // Config
  const [showConfig, setShowConfig] = useState(false);
  const [margins, setMargins] = useState<MarginConfig>(loadMargins);
  const [freight, setFreight] = useState<FreightConfig>(loadFreight);

  // Expansão
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  // Edição de variantes
  const [editingVariant, setEditingVariant] =
    useState<EditingVariantData | null>(null);

  // Edição de produto
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editProductValues, setEditProductValues] = useState({
    model: "",
    specs: "",
    details: "",
  });

  // Novo produto
  const [showNewProduct, setShowNewProduct] = useState(false);

  // Nova variante
  const [addingVariantSlug, setAddingVariantSlug] = useState<string | null>(
    null,
  );
  const [newVariant, setNewVariant] = useState({
    storage: "",
    color: "",
    cost: "",
  });

  // Ref para scroll-to-product
  const productRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollToSlug = useRef<string | null>(null);

  // ============================================
  // Persist config
  // ============================================
  useEffect(() => {
    localStorage.setItem("comprefi_margins", JSON.stringify(margins));
  }, [margins]);

  useEffect(() => {
    localStorage.setItem("comprefi_freight", JSON.stringify(freight));
  }, [freight]);

  // ============================================
  // Price calculation
  // ============================================
  const calculatePrices = useCallback(
    (cost: number, category: string) => {
      const frete = freight[category] || 100;
      const base = cost + frete;
      const pixDivisor = 1 - margins.pixMargin / 100;
      const originalDivisor = 1 - margins.originalMargin / 100;

      const pixPrice = base / pixDivisor;
      const originalPrice = base / originalDivisor;
      const installmentPrice = pixPrice / 0.877 / 12;

      return {
        pixPrice: formatBRL(pixPrice),
        originalPrice: formatBRL(originalPrice),
        installmentPrice: formatBRL(installmentPrice),
      };
    },
    [margins, freight],
  );

  // Recalcular 12x quando PIX muda manualmente
  const recalcInstallment = (pixStr: string): string => {
    const pix = parseBRL(pixStr);
    if (pix <= 0) return "R$ 0,00";
    return formatBRL(pix / 0.877 / 12);
  };

  // ============================================
  // Data fetching (sem resetar scroll)
  // ============================================
  const loadData = async () => {
    try {
      setError(null);
      const [productsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/catalog/admin/products?includeInactive=true`, {
          headers: getAuthHeaders(),
        }),
        fetch(`${API_URL}/catalog/admin/stats`, {
          headers: getAuthHeaders(),
        }),
      ]);

      if (productsRes.status === 401 || statsRes.status === 401) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        window.dispatchEvent(new Event("auth:expired"));
        return;
      }
      if (!productsRes.ok) throw new Error(`Erro ${productsRes.status}`);
      if (!statsRes.ok) throw new Error(`Erro stats ${statsRes.status}`);

      const [productsData, statsData] = await Promise.all([
        productsRes.json(),
        statsRes.json(),
      ]);

      setProducts(productsData);
      setStats(statsData);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar catalogo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Scroll para produto recém-criado
  useEffect(() => {
    if (scrollToSlug.current && productRefs.current[scrollToSlug.current]) {
      setTimeout(() => {
        productRefs.current[scrollToSlug.current!]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setExpandedSlug(scrollToSlug.current);
        scrollToSlug.current = null;
      }, 100);
    }
  }, [products]);

  // ============================================
  // Filtros
  // ============================================
  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;
    const matchesActive = showInactive || p.isActive;
    return matchesSearch && matchesCategory && matchesActive;
  });

  const groupedByCategory = filteredProducts.reduce(
    (acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    },
    {} as Record<string, ProductGroup[]>,
  );

  // ============================================
  // Actions
  // ============================================
  const toggleProductActive = async (slug: string, currentActive: boolean) => {
    try {
      const res = await fetch(`${API_URL}/catalog/admin/products/${slug}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive: !currentActive }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar");
      await loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleVariantActive = async (slug: string, variant: Variant) => {
    try {
      const res = await fetch(
        `${API_URL}/catalog/admin/products/${slug}/variants`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            variants: [
              {
                storage: variant.storage,
                color: variant.color,
                isActive: !variant.isActive,
              },
            ],
          }),
        },
      );
      if (!res.ok) throw new Error("Erro ao atualizar variante");
      await loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Iniciar edição de variante (clicando no campo custo ou no botão)
  const startEditVariant = (slug: string, variant: Variant) => {
    setEditingVariant({
      variantId: variant.id,
      slug,
      storage: variant.storage,
      color: variant.color,
      cost: "",
      originalPrice: variant.originalPrice,
      installmentPrice: variant.installmentPrice,
      pixPrice: variant.pixPrice,
      costEdited: false,
    });
  };

  // Quando custo muda → recalcular tudo
  const handleCostChange = (cost: string, category: string) => {
    if (!editingVariant) return;
    const costNum = parseFloat(cost) || 0;
    if (costNum > 0) {
      const prices = calculatePrices(costNum, category);
      setEditingVariant({
        ...editingVariant,
        cost,
        ...prices,
        costEdited: true,
      });
    } else {
      setEditingVariant({ ...editingVariant, cost, costEdited: false });
    }
  };

  // Quando PIX muda manualmente → recalcular 12x
  const handlePixChange = (pixPrice: string) => {
    if (!editingVariant) return;
    setEditingVariant({
      ...editingVariant,
      pixPrice,
      installmentPrice: recalcInstallment(pixPrice),
    });
  };

  // Quando Original muda manualmente → não recalcula nada
  const handleOriginalChange = (originalPrice: string) => {
    if (!editingVariant) return;
    setEditingVariant({ ...editingVariant, originalPrice });
  };

  // Salvar variante (mantém posição)
  const saveVariant = async () => {
    if (!editingVariant) return;
    try {
      const res = await fetch(
        `${API_URL}/catalog/admin/products/${editingVariant.slug}/variants`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            variants: [
              {
                storage: editingVariant.storage,
                color: editingVariant.color,
                originalPrice: editingVariant.originalPrice,
                installmentPrice: editingVariant.installmentPrice,
                pixPrice: editingVariant.pixPrice,
              },
            ],
          }),
        },
      );
      if (!res.ok) throw new Error("Erro ao salvar precos");
      setEditingVariant(null);
      await loadData(); // Não reseta expandedSlug, mantém posição
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Editar produto
  const startEditProduct = (product: ProductGroup) => {
    setEditingProduct(product.slug);
    setEditProductValues({
      model: product.model,
      specs: product.specs || "",
      details: product.details || "",
    });
  };

  const saveProduct = async (slug: string) => {
    try {
      const res = await fetch(`${API_URL}/catalog/admin/products/${slug}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(editProductValues),
      });
      if (!res.ok) throw new Error("Erro ao salvar produto");
      setEditingProduct(null);
      await loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Adicionar nova variante a um produto existente
  const handleAddVariant = async (slug: string, category: string) => {
    if (!newVariant.storage || !newVariant.color) {
      alert("Preencha storage e cor");
      return;
    }
    const costNum = parseFloat(newVariant.cost) || 0;
    let prices = {
      originalPrice: "R$ 0,00",
      installmentPrice: "R$ 0,00",
      pixPrice: "R$ 0,00",
    };
    if (costNum > 0) {
      prices = calculatePrices(costNum, category);
    }

    try {
      const res = await fetch(
        `${API_URL}/catalog/admin/products/${slug}/variants`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            variants: [
              {
                storage: newVariant.storage,
                color: newVariant.color,
                ...prices,
              },
            ],
          }),
        },
      );
      if (!res.ok) throw new Error("Erro ao adicionar variante");
      setAddingVariantSlug(null);
      setNewVariant({ storage: "", color: "", cost: "" });
      await loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Callback quando novo produto é criado
  const handleNewProductCreated = (slug: string) => {
    setShowNewProduct(false);
    scrollToSlug.current = slug;
    loadData();
  };

  // ============================================
  // Render
  // ============================================
  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
        <p className="text-gray-400">Carregando catalogo...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {stats.totalGroups}
                </p>
                <p className="text-xs text-blue-300">Produtos</p>
              </div>
            </div>
          </div>
          <div className="bg-green-900/30 border border-green-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Power className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {stats.activeGroups}
                </p>
                <p className="text-xs text-green-300">Ativos</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-900/30 border border-purple-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {stats.totalVariants}
                </p>
                <p className="text-xs text-purple-300">Variantes</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-900/30 border border-orange-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {categories.length}
                </p>
                <p className="text-xs text-orange-300">Categorias</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome ou slug..."
                className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as categorias</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat] || cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showInactive}
                onChange={(e) => setShowInactive(e.target.checked)}
                className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-xs">Inativos</span>
            </label>
            <button
              onClick={() => setShowConfig(!showConfig)}
              className={`p-2 rounded-md transition-colors ${
                showConfig
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-400"
              }`}
              title="Configuracoes"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={loadData}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
              title="Recarregar"
            >
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div>
            <button
              onClick={() => setShowNewProduct(!showNewProduct)}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Produto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Config Panel */}
      {showConfig && (
        <ConfigPanel
          margins={margins}
          freight={freight}
          onMarginsChange={setMargins}
          onFreightChange={setFreight}
          categories={Object.keys(categoryLabels)}
        />
      )}

      {/* New Product Form */}
      {showNewProduct && (
        <NewProductForm
          categories={
            categories.length > 0 ? categories : Object.keys(categoryLabels)
          }
          onSave={handleNewProductCreated}
          onCancel={() => setShowNewProduct(false)}
        />
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
          <p>{error}</p>
          <button
            onClick={loadData}
            className="mt-2 bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Produtos por Categoria */}
      {Object.entries(groupedByCategory).map(([category, categoryProducts]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Package className="w-5 h-5 text-blue-400" />
            <span>{categoryLabels[category] || category}</span>
            <span className="text-sm font-normal text-gray-400">
              ({categoryProducts.length} produtos)
            </span>
          </h3>

          <div className="space-y-1">
            {categoryProducts.map((product) => (
              <div
                key={product.slug}
                ref={(el) => {
                  productRefs.current[product.slug] = el;
                }}
                className={`bg-gray-900 rounded-lg border ${
                  product.isActive
                    ? "border-gray-800"
                    : "border-red-900/50 opacity-60"
                }`}
              >
                {/* Product Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
                  onClick={() =>
                    setExpandedSlug(
                      expandedSlug === product.slug ? null : product.slug,
                    )
                  }
                >
                  <div className="flex items-center space-x-3 flex-1">
                    {expandedSlug === product.slug ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    <div>
                      <span className="font-medium text-white">
                        {product.model}
                      </span>
                      {product.section && (
                        <span className="ml-2 text-xs text-gray-500">
                          {product.section}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500">
                      {product.variantCount} var.
                    </span>
                    <span className="text-xs text-gray-600 font-mono hidden md:inline">
                      {product.slug}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        product.isActive
                          ? "bg-green-900/50 text-green-400"
                          : "bg-red-900/50 text-red-400"
                      }`}
                    >
                      {product.isActive ? "Ativo" : "Inativo"}
                    </span>

                    <div
                      className="flex items-center space-x-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => startEditProduct(product)}
                        className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                        title="Editar produto"
                      >
                        <Settings className="w-3.5 h-3.5 text-blue-400" />
                      </button>
                      <button
                        onClick={() =>
                          toggleProductActive(product.slug, product.isActive)
                        }
                        className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                        title={product.isActive ? "Desativar" : "Ativar"}
                      >
                        {product.isActive ? (
                          <PowerOff className="w-3.5 h-3.5 text-yellow-400" />
                        ) : (
                          <Power className="w-3.5 h-3.5 text-green-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Edit Product Form */}
                {editingProduct === product.slug && (
                  <div
                    className="px-4 pb-4 space-y-3 border-t border-gray-800"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Nome do modelo
                        </label>
                        <input
                          type="text"
                          value={editProductValues.model}
                          onChange={(e) =>
                            setEditProductValues({
                              ...editProductValues,
                              model: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Specs
                        </label>
                        <input
                          type="text"
                          value={editProductValues.specs}
                          onChange={(e) =>
                            setEditProductValues({
                              ...editProductValues,
                              specs: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Detalhes
                        </label>
                        <input
                          type="text"
                          value={editProductValues.details}
                          onChange={(e) =>
                            setEditProductValues({
                              ...editProductValues,
                              details: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => saveProduct(product.slug)}
                        className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Salvar</span>
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Cancelar</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Expanded Variants */}
                {expandedSlug === product.slug && (
                  <div className="border-t border-gray-800">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-gray-400 text-xs border-b border-gray-800">
                            <th className="text-left px-4 py-2">Storage</th>
                            <th className="text-left px-4 py-2">Cor</th>
                            <th className="text-left px-4 py-2">
                              <span className="flex items-center space-x-1">
                                <DollarSign className="w-3 h-3" />
                                <span>Custo</span>
                              </span>
                            </th>
                            <th className="text-left px-4 py-2">Original</th>
                            <th className="text-left px-4 py-2">PIX</th>
                            <th className="text-left px-4 py-2">12x</th>
                            <th className="text-center px-4 py-2">Status</th>
                            <th className="text-center px-4 py-2">Acoes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...product.variants].sort((a, b) => {
                            const parseSize = (s: string): number => {
                              const num = parseFloat(s);
                              if (s.includes('TB')) return num * 1024;
                              if (s.includes('GB')) return num;
                              if (s.includes('mm')) return num;
                              return 0;
                            };
                            return parseSize(b.storage) - parseSize(a.storage);
                          }).map((variant) => {
                            const isEditing =
                              editingVariant?.variantId === variant.id;

                            return (
                              <tr
                                key={variant.id}
                                className={`border-b border-gray-800/50 hover:bg-gray-800/30 ${
                                  !variant.isActive ? "opacity-50" : ""
                                }`}
                              >
                                <td className="px-4 py-2 text-white font-medium">
                                  {variant.storage}
                                </td>
                                <td className="px-4 py-2 text-gray-300">
                                  {variant.color}
                                </td>

                                {isEditing ? (
                                  <>
                                    {/* Custo */}
                                    <td className="px-4 py-1">
                                      <div className="relative">
                                        <Calculator className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-yellow-500" />
                                        <input
                                          type="number"
                                          step="0.01"
                                          value={editingVariant.cost}
                                          onChange={(e) =>
                                            handleCostChange(
                                              e.target.value,
                                              product.category,
                                            )
                                          }
                                          placeholder="Custo"
                                          autoFocus
                                          className="w-28 pl-7 pr-2 py-1 bg-gray-800 border border-yellow-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                        />
                                      </div>
                                    </td>
                                    {/* Original (editável) */}
                                    <td className="px-4 py-1">
                                      <input
                                        type="text"
                                        value={editingVariant.originalPrice}
                                        onChange={(e) =>
                                          handleOriginalChange(e.target.value)
                                        }
                                        className="w-28 px-2 py-1 bg-gray-800 border border-purple-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                                      />
                                    </td>
                                    {/* PIX (editável → recalcula 12x) */}
                                    <td className="px-4 py-1">
                                      <input
                                        type="text"
                                        value={editingVariant.pixPrice}
                                        onChange={(e) =>
                                          handlePixChange(e.target.value)
                                        }
                                        className="w-28 px-2 py-1 bg-gray-800 border border-green-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
                                      />
                                    </td>
                                    {/* 12x (calculado automaticamente) */}
                                    <td className="px-4 py-1">
                                      <span className="text-xs text-blue-400 bg-gray-800 px-2 py-1 rounded border border-gray-700 inline-block w-28">
                                        {editingVariant.installmentPrice}
                                      </span>
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    {/* Custo - clicável para entrar em edição */}
                                    <td
                                      className="px-4 py-2 text-gray-500 text-xs cursor-pointer hover:text-yellow-400 hover:bg-gray-800/50 transition-colors"
                                      onClick={() =>
                                        startEditVariant(product.slug, variant)
                                      }
                                      title="Clique para editar precos"
                                    >
                                      <span className="flex items-center space-x-1">
                                        <Calculator className="w-3 h-3" />
                                        <span>inserir</span>
                                      </span>
                                    </td>
                                    <td className="px-4 py-2 text-gray-400">
                                      {variant.originalPrice}
                                    </td>
                                    <td className="px-4 py-2 text-green-400 font-medium">
                                      {variant.pixPrice}
                                    </td>
                                    <td className="px-4 py-2 text-blue-400">
                                      {variant.installmentPrice}
                                    </td>
                                  </>
                                )}

                                <td className="px-4 py-2 text-center">
                                  <button
                                    onClick={() =>
                                      toggleVariantActive(product.slug, variant)
                                    }
                                    className={`text-xs px-2 py-0.5 rounded ${
                                      variant.isActive
                                        ? "bg-green-900/50 text-green-400 hover:bg-green-800/50"
                                        : "bg-red-900/50 text-red-400 hover:bg-red-800/50"
                                    }`}
                                  >
                                    {variant.isActive ? "Ativo" : "Inativo"}
                                  </button>
                                </td>
                                <td className="px-4 py-2 text-center">
                                  {isEditing ? (
                                    <div className="flex items-center justify-center space-x-1">
                                      <button
                                        onClick={saveVariant}
                                        className="p-1 hover:bg-green-900/50 rounded"
                                        title="Salvar"
                                      >
                                        <Save className="w-3.5 h-3.5 text-green-400" />
                                      </button>
                                      <button
                                        onClick={() => setEditingVariant(null)}
                                        className="p-1 hover:bg-gray-700 rounded"
                                        title="Cancelar"
                                      >
                                        <X className="w-3.5 h-3.5 text-gray-400" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        startEditVariant(product.slug, variant)
                                      }
                                      className="p-1 hover:bg-gray-700 rounded opacity-40 hover:opacity-100 transition-opacity"
                                      title="Editar precos"
                                    >
                                      <DollarSign className="w-3.5 h-3.5 text-yellow-400" />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Add Variant */}
                    <div className="px-4 py-3 border-t border-gray-800/50">
                      {addingVariantSlug === product.slug ? (
                        <div className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={newVariant.storage}
                            onChange={(e) =>
                              setNewVariant({
                                ...newVariant,
                                storage: e.target.value,
                              })
                            }
                            placeholder="256 GB"
                            className="w-24 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={newVariant.color}
                            onChange={(e) =>
                              setNewVariant({
                                ...newVariant,
                                color: e.target.value,
                              })
                            }
                            placeholder="Titanio Natural"
                            className="w-36 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                          <div className="relative">
                            <DollarSign className="absolute left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-yellow-500" />
                            <input
                              type="number"
                              step="0.01"
                              value={newVariant.cost}
                              onChange={(e) =>
                                setNewVariant({
                                  ...newVariant,
                                  cost: e.target.value,
                                })
                              }
                              placeholder="Custo"
                              className="w-24 pl-6 pr-2 py-1 bg-gray-800 border border-yellow-700 rounded text-white text-xs focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                          </div>
                          <button
                            onClick={() =>
                              handleAddVariant(product.slug, product.category)
                            }
                            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                          >
                            <Save className="w-3 h-3" />
                            <span>Salvar</span>
                          </button>
                          <button
                            onClick={() => {
                              setAddingVariantSlug(null);
                              setNewVariant({
                                storage: "",
                                color: "",
                                cost: "",
                              });
                            }}
                            className="p-1 hover:bg-gray-700 rounded"
                          >
                            <X className="w-3.5 h-3.5 text-gray-400" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAddingVariantSlug(product.slug)}
                          className="flex items-center space-x-1 text-xs text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Adicionar variante</span>
                        </button>
                      )}
                    </div>

                    {product.variants.length === 0 && (
                      <div className="px-4 py-6 text-center text-gray-500 text-sm">
                        Nenhuma variante cadastrada. Clique em "Adicionar
                        variante".
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nenhum produto encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default CatalogTable;
