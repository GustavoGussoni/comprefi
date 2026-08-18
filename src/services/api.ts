// src/services/api.ts
// Serviço para conectar o frontend à API NestJS com tipagem TypeScript
// Versão atualizada com métodos para admin

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // URL da sua API NestJS

// Interface para o produto da API (como vem do backend)
interface ApiProduct {
  id: string;
  model: string;
  storage: string;
  color: string;
  battery: string;
  originalPrice: string;
  installmentPrice: string;
  pixPrice: string;
  details: string;
  image?: string;
  realImages: string[];
  category: string;
  specs: string;
  isNew?: boolean;
  isActive?: boolean;
  cost?: number;
  freight?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Interface para o produto usado nos componentes (compatível com ProductDetail)
export interface Product {
  id: string;
  model: string;
  storage: string;
  color: string;
  battery: string;
  originalPrice: string;
  installmentPrice: string;
  pixPrice: string;
  details: string;
  image: string; // ← Sempre string, nunca undefined
  realImages: string[];
  category: string;
  specs: string;
  isNew?: boolean;
  isActive?: boolean;
  cost?: number;
  freight?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiFilters {
  category?: string;
  isNew?: boolean;
  isActive?: boolean;
  [key: string]: any;
}

interface CalculatePricesRequest {
  cost: number;
  freight?: number;
  category?: string;
}

interface CalculatedPricesResponse {
  pixPrice: string;
  installmentPrice: string;
  originalPrice: string;
  rawValues: {
    pixPrice: number;
    installmentPrice: number;
    originalPrice: number;
  };
}

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

class ApiService {
  private authToken: string | null = null;

  // Função para normalizar produto da API para o formato usado nos componentes
  private normalizeProduct(apiProduct: ApiProduct): Product {
    return {
      ...apiProduct,
      image: apiProduct.image || "", // ← Garantir que nunca seja undefined
      realImages: apiProduct.realImages || [], // ← Garantir que seja array
    };
  }

  // Função para normalizar array de produtos
  private normalizeProducts(apiProducts: ApiProduct[]): Product[] {
    return apiProducts.map((product) => this.normalizeProduct(product));
  }

  // Método para definir token de autenticação
  setAuthToken(token: string) {
    this.authToken = token;
  }

  // Método para remover token de autenticação
  clearAuthToken() {
    this.authToken = null;
  }

  // Método genérico para fazer requisições
  async request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Adicionar token de autenticação se disponível
    if (this.authToken) {
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }

    const config: RequestInit = {
      headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          this.clearAuthToken();
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");
          // Disparar evento para que o ProtectedRoute redirecione ao login
          window.dispatchEvent(new Event("auth:expired"));
          throw new Error("Token expirado. Faça login novamente.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Para DELETE que retorna 204, não tentar fazer parse do JSON
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // ========================================
  // MÉTODOS DE AUTENTICAÇÃO
  // ========================================

  async login(
    email: string,
    password: string
  ): Promise<{ access_token: string; user: any }> {
    const result = await this.request<{ access_token: string; user: any }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );

    this.setAuthToken(result.access_token);
    return result;
  }

  async register(name: string, email: string, password: string): Promise<any> {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  // ========================================
  // MÉTODOS DE PRODUTOS (PÚBLICOS)
  // ========================================

  // Buscar todos os produtos
  async getAllProducts(): Promise<Product[]> {
    const apiProducts = await this.request<ApiProduct[]>("/products");
    return this.normalizeProducts(apiProducts);
  }

  // Buscar produtos por categoria
  async getProductsByCategory(category: string): Promise<Product[]> {
    const apiProducts = await this.request<ApiProduct[]>(
      `/products/category/${encodeURIComponent(category)}`
    );
    return this.normalizeProducts(apiProducts);
  }

  // Buscar produto por ID
  async getProductById(id: string | number): Promise<Product> {
    const apiProduct = await this.request<ApiProduct>(`/products/${id}`);
    return this.normalizeProduct(apiProduct);
  }

  // Buscar produtos com filtros
  async getProductsWithFilters(filters: ApiFilters = {}): Promise<Product[]> {
    const queryParams = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      if (
        filters[key] !== undefined &&
        filters[key] !== null &&
        filters[key] !== ""
      ) {
        queryParams.append(key, String(filters[key]));
      }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : "/products";

    const apiProducts = await this.request<ApiProduct[]>(endpoint);
    return this.normalizeProducts(apiProducts);
  }

  // Buscar categorias disponíveis
  async getCategories(): Promise<string[]> {
    return this.request<string[]>("/products/categories");
  }

  // ========================================
  // MÉTODOS DE ADMIN (REQUEREM AUTENTICAÇÃO)
  // ========================================

  // Calcular preços
  async calculatePrices(
    data: CalculatePricesRequest
  ): Promise<CalculatedPricesResponse> {
    return this.request<CalculatedPricesResponse>(
      "/products/calculate-prices",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  // Criar produto
  async createProduct(productData: Partial<Product>): Promise<Product> {
    const apiProduct = await this.request<ApiProduct>("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
    return this.normalizeProduct(apiProduct);
  }

  // Atualizar produto
  async updateProduct(
    id: string,
    productData: Partial<Product>
  ): Promise<Product> {
    const apiProduct = await this.request<ApiProduct>(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(productData),
    });
    return this.normalizeProduct(apiProduct);
  }

  // Deletar produto
  async deleteProduct(id: string): Promise<void> {
    await this.request(`/products/${id}`, {
      method: "DELETE",
    });
  }

  // Criar múltiplos produtos
  async bulkCreateProducts(
    productsData: Partial<Product>[]
  ): Promise<Product[]> {
    const apiProducts = await this.request<ApiProduct[]>(
      "/products/bulk-create",
      {
        method: "POST",
        body: JSON.stringify(productsData),
      }
    );
    return this.normalizeProducts(apiProducts);
  }

  // Sincronizar com Google Sheets
  async syncFromGoogleSheets(): Promise<any> {
    return this.request("/products/sync-from-sheet", {
      method: "POST",
    });
  }

  // ========================================
  // MÉTODOS DE USUÁRIOS (ADMIN)
  // ========================================

  // Buscar todos os usuários
  async getAllUsers(): Promise<any[]> {
    return this.request<any[]>("/users");
  }

  // Buscar usuário por ID
  async getUserById(id: string): Promise<any> {
    return this.request<any>(`/users/${id}`);
  }

  // Atualizar usuário
  async updateUser(id: string, userData: any): Promise<any> {
    return this.request<any>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
    });
  }

  // Deletar usuário
  async deleteUser(id: string): Promise<void> {
    await this.request(`/users/${id}`, {
      method: "DELETE",
    });
  }
}

// Mapeamento de categorias para URLs
export const categoryMapping: Record<string, string> = {
  "iPhones Seminovos": "iphones-seminovos",
  "iPhones Novos": "iphones-novos",
  Macbooks: "macbooks",
  iPads: "ipads",
  "Apple Watch": "apple-watch",
  Acessórios: "acessorios",
  //Acessorios: "acessorios", // Fallback para categoria sem acento
};

// Mapeamento reverso (URL para categoria)
export const urlToCategoryMapping: Record<string, string> = {
  "iphones-seminovos": "iPhones Seminovos",
  "iphones-novos": "iPhones Novos",
  macbooks: "Macbooks",
  ipads: "iPads",
  "apple-watch": "Apple Watch",
  acessorios: "Acessórios",
};

// Exportar tipos para uso em outros arquivos
export type { ApiFilters, CalculatePricesRequest, CalculatedPricesResponse };

// Exportar instância única do serviço
export const apiService = new ApiService();

// Exportar também a classe para casos específicos
export default ApiService;
