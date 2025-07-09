// src/services/api.ts
// Serviço para conectar o frontend à API NestJS com tipagem TypeScript

const API_BASE_URL = "http://localhost:3000"; // URL da sua API NestJS

// Interfaces para tipagem
interface Product {
  id: number;
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
  createdAt?: string;
  updatedAt?: string;
}

interface ApiFilters {
  category?: string;
  isNew?: boolean;
  isActive?: boolean;
  [key: string]: unknown;
}

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

class ApiService {
  // Método genérico para fazer requisições
  async request<T = unknown>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Buscar todos os produtos
  async getAllProducts(): Promise<Product[]> {
    return this.request<Product[]>("/products");
  }

  // Buscar produtos por categoria
  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.request<Product[]>(
      `/products/category/${encodeURIComponent(category)}`
    );
  }

  // Buscar produto por ID
  async getProductById(id: string | number): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  // Buscar produtos novos
  async getNewProducts(): Promise<Product[]> {
    return this.request<Product[]>("/products?isNew=true");
  }

  // Buscar produtos seminovos
  async getUsedProducts(): Promise<Product[]> {
    return this.request<Product[]>("/products?isNew=false");
  }

  // Buscar produtos ativos
  async getActiveProducts(): Promise<Product[]> {
    return this.request<Product[]>("/products?isActive=true");
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

    return this.request<Product[]>(endpoint);
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
  Acessorios: "acessorios", // Fallback para categoria sem acento
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
export type { Product, ApiFilters };

// Exportar instância única do serviço
export const apiService = new ApiService();

// Exportar também a classe para casos específicos
export default ApiService;
