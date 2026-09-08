const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

export type UserRole = "ADMIN" | "SALES";
export type CrmDeliveryStatus = "NOT_SENT" | "PENDING" | "SENT" | "FAILED";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiProduct {
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

export interface Product extends Omit<ApiProduct, "image"> {
  image: string;
}

export interface ApiFilters {
  category?: string;
  isNew?: boolean;
  isActive?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface CalculatePricesRequest {
  cost: number;
  freight?: number;
  category?: string;
}

export interface CalculatedPricesResponse {
  pixPrice: string;
  installmentPrice: string;
  originalPrice: string;
  rawValues: {
    pixPrice: number;
    installmentPrice: number;
    originalPrice: number;
  };
}

export interface TradeCalculationRequest {
  modeloAtual: string;
  capacidadeAtual: string;
  corAtual: string;
  bateriaAtual: number;
  valorManual?: number;
  defeitos?: string[];
  pecasTrocadas?: boolean;
  quaisPecas?: string;
  modeloDesejado: string;
  ondeOuviu?: string;
  tempoPensando?: string;
  urgenciaTroca?: string;
}

export interface DesiredTradeProduct {
  modelo: string;
  pixPrice: string;
  installmentPrice: string;
  originalPrice: string;
}

export interface TradeCalculationResult {
  questionarioId: string;
  offerExpiresAt: string;
  descontoPercentual: number;
  valorBase: number;
  depreciacaoBateria: number;
  depreciacaoDefeitos: number;
  valorAparelho: number;
  precoProduto: number;
  valorFinal: number;
  valorComDesconto: number;
  valorManualUsado: boolean;
  produtoDesejado: DesiredTradeProduct;
  temDefeito: boolean;
  precisaCotacao: boolean;
  cupomDesconto: string;
  resumoDetalhado: string;
}

export interface TradeContactInput {
  nome: string;
  email: string;
  whatsapp: string;
  cep: string;
  fonte?: string;
}

export interface CrmDeliveryResult {
  questionarioId: string;
  leadSaved: true;
  crmSent: boolean;
  crmStatus: CrmDeliveryStatus;
  ofertaExpirada: boolean;
  offerExpiresAt: string | null;
}

export interface TradeSimulation extends TradeCalculationResult {
  id: string;
  modeloAtual: string;
  capacidadeAtual: string;
  corAtual: string;
  bateriaAtual: number;
  defeitos: string[] | null;
  pecasTrocadas: boolean;
  quaisPecas: string | null;
  modeloDesejado: string;
  produtoDesejadoNome: string | null;
  ondeOuviu: string | null;
  tempoPensando: string | null;
  urgenciaTroca: string | null;
  nome: string | null;
  email: string | null;
  whatsapp: string | null;
  cep: string | null;
  mensagemFollowUp: string | null;
  crmStatus: CrmDeliveryStatus;
  crmAttempts: number;
  crmLastAttemptAt: string | null;
  crmSentAt: string | null;
  crmLastError: string | null;
  crmExternalId: string | null;
  crmExternalUrl: string | null;
  etapaAtual: number;
  concluido: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SimulationQuery {
  page?: number;
  limit?: number;
  search?: string;
  crmStatus?: CrmDeliveryStatus;
  concluido?: boolean;
  precisaCotacao?: boolean;
  modeloAtual?: string;
  modeloDesejado?: string;
}

export interface SimulationStats {
  total: number;
  concluidos: number;
  pendentes: number;
  precisamCotacao: number;
  falhasCrm: number;
  enviadosCrm: number;
  ultimaSemana: number;
  modelosDesejados: { modelo: string; count: number }[];
  modelosAtuais: { modelo: string; count: number }[];
  origens: { origem: string | null; count: number }[];
  simulacoesECapturas: {
    date: string;
    simulacoes: number;
    formularios: number;
    enviadosCrm: number;
  }[];
}

export interface UpdateSimulationInput {
  concluido?: boolean;
  precisaCotacao?: boolean;
  valorAparelho?: number;
  valorFinal?: number;
  valorComDesconto?: number;
  offerExpiresAt?: string;
}

export interface DataCrazyTradePayload extends Record<string, unknown> {
  questionarioId: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

class ApiService {
  private authToken: string | null = this.getStoredToken();

  private normalizeProduct(apiProduct: ApiProduct): Product {
    return {
      ...apiProduct,
      image: apiProduct.image || "",
      realImages: apiProduct.realImages || [],
    };
  }

  private normalizeProducts(apiProducts: ApiProduct[]): Product[] {
    return apiProducts.map((product) => this.normalizeProduct(product));
  }

  private getStoredToken(): string | null {
    return typeof window === "undefined"
      ? null
      : window.localStorage.getItem("admin_token");
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    window.localStorage.setItem("admin_token", token);
  }

  clearAuthToken(): void {
    this.authToken = null;
    window.localStorage.removeItem("admin_token");
    window.localStorage.removeItem("admin_user");
  }

  logout(): void {
    this.clearAuthToken();
  }

  async request<T>(
    endpoint: string,
    options: ApiRequestOptions = {},
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");

    let body: BodyInit | undefined;
    if (options.body !== undefined) {
      if (
        typeof options.body === "string" ||
        options.body instanceof FormData ||
        options.body instanceof URLSearchParams ||
        options.body instanceof Blob
      ) {
        body = options.body;
      } else {
        headers.set("Content-Type", "application/json");
        body = JSON.stringify(options.body);
      }
    }

    if (this.authToken) {
      headers.set("Authorization", `Bearer ${this.authToken}`);
    }

    const response = await fetch(url, {
      ...options,
      headers,
      body,
    });
    const responseBody = await this.readResponse(response);

    if (!response.ok) {
      if (response.status === 401 && this.authToken) {
        this.clearAuthToken();
        window.dispatchEvent(new Event("auth:expired"));
      }

      throw new ApiError(
        this.getErrorMessage(responseBody, response.status),
        response.status,
        responseBody,
      );
    }

    return responseBody as T;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: AuthUser }> {
    const result = await this.request<{
      access_token: string;
      user: AuthUser;
    }>("/auth/login", {
      method: "POST",
      body: { email, password },
    });

    this.setAuthToken(result.access_token);
    window.localStorage.setItem("admin_user", JSON.stringify(result.user));
    return result;
  }

  me(): Promise<AuthUser> {
    return this.request<AuthUser>("/auth/me");
  }

  register(input: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
  }): Promise<AuthUser> {
    return this.request<AuthUser>("/auth/register", {
      method: "POST",
      body: input,
    });
  }

  calculateTrade(
    data: TradeCalculationRequest,
  ): Promise<TradeCalculationResult> {
    return this.request<TradeCalculationResult>("/trade/calculate", {
      method: "POST",
      body: data,
    });
  }

  submitTradeContact(
    questionarioId: string,
    data: TradeContactInput,
  ): Promise<CrmDeliveryResult> {
    return this.request<CrmDeliveryResult>(
      `/trade/questionarios/${encodeURIComponent(questionarioId)}/contact`,
      { method: "POST", body: data },
    );
  }

  getSimulations(
    query: SimulationQuery = {},
  ): Promise<PaginatedResponse<TradeSimulation>> {
    return this.request<PaginatedResponse<TradeSimulation>>(
      `/trade/questionarios${this.toQueryString(query)}`,
    );
  }

  getSimulationStats(): Promise<SimulationStats> {
    return this.request<SimulationStats>("/trade/questionarios/stats");
  }

  getSimulation(id: string): Promise<TradeSimulation> {
    return this.request<TradeSimulation>(
      `/trade/questionarios/${encodeURIComponent(id)}`,
    );
  }

  resendSimulation(id: string): Promise<CrmDeliveryResult> {
    return this.request<CrmDeliveryResult>(
      `/trade/questionarios/${encodeURIComponent(id)}/resend`,
      { method: "POST" },
    );
  }

  getSimulationPayload(id: string): Promise<DataCrazyTradePayload> {
    return this.request<DataCrazyTradePayload>(
      `/trade/questionarios/${encodeURIComponent(id)}/payload`,
    );
  }

  updateSimulation(
    id: string,
    data: UpdateSimulationInput,
  ): Promise<TradeSimulation> {
    return this.request<TradeSimulation>(
      `/trade/questionarios/${encodeURIComponent(id)}`,
      { method: "PATCH", body: data },
    );
  }

  deleteSimulation(id: string): Promise<void> {
    return this.request<void>(
      `/trade/questionarios/${encodeURIComponent(id)}`,
      { method: "DELETE" },
    );
  }

  async getAllProducts(): Promise<Product[]> {
    return this.normalizeProducts(
      await this.request<ApiProduct[]>("/products"),
    );
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.normalizeProducts(
      await this.request<ApiProduct[]>(
        `/products/category/${encodeURIComponent(category)}`,
      ),
    );
  }

  async getProductById(id: string | number): Promise<Product> {
    return this.normalizeProduct(
      await this.request<ApiProduct>(`/products/${id}`),
    );
  }

  async getProductsWithFilters(
    filters: ApiFilters = {},
  ): Promise<Product[]> {
    const endpoint = `/products${this.toQueryString(filters)}`;
    return this.normalizeProducts(
      await this.request<ApiProduct[]>(endpoint),
    );
  }

  getCategories(): Promise<string[]> {
    return this.request<string[]>("/products/categories");
  }

  calculatePrices(
    data: CalculatePricesRequest,
  ): Promise<CalculatedPricesResponse> {
    return this.request<CalculatedPricesResponse>(
      "/products/calculate-prices",
      { method: "POST", body: data },
    );
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    return this.normalizeProduct(
      await this.request<ApiProduct>("/products", {
        method: "POST",
        body: productData,
      }),
    );
  }

  async updateProduct(
    id: string,
    productData: Partial<Product>,
  ): Promise<Product> {
    return this.normalizeProduct(
      await this.request<ApiProduct>(`/products/${id}`, {
        method: "PATCH",
        body: productData,
      }),
    );
  }

  async deleteProduct(id: string): Promise<void> {
    await this.request(`/products/${id}`, { method: "DELETE" });
  }

  async bulkCreateProducts(
    productsData: Partial<Product>[],
  ): Promise<Product[]> {
    return this.normalizeProducts(
      await this.request<ApiProduct[]>("/products/bulk-create", {
        method: "POST",
        body: productsData,
      }),
    );
  }

  syncFromGoogleSheets(): Promise<unknown> {
    return this.request("/products/sync-from-sheet", { method: "POST" });
  }

  getAllUsers(): Promise<AuthUser[]> {
    return this.request<AuthUser[]>("/users");
  }

  getUserById(id: string): Promise<AuthUser> {
    return this.request<AuthUser>(`/users/${id}`);
  }

  updateUser(
    id: string,
    userData: Partial<Pick<AuthUser, "name" | "email" | "role">> & {
      password?: string;
    },
  ): Promise<AuthUser> {
    return this.request<AuthUser>(`/users/${id}`, {
      method: "PATCH",
      body: userData,
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.request(`/users/${id}`, { method: "DELETE" });
  }

  private async readResponse(response: Response): Promise<unknown> {
    if (response.status === 204) return undefined;

    const text = await response.text();
    if (!text) return undefined;

    try {
      return JSON.parse(text) as unknown;
    } catch {
      return text;
    }
  }

  private getErrorMessage(body: unknown, status: number): string {
    if (body && typeof body === "object" && "message" in body) {
      const message = (body as { message?: unknown }).message;
      if (Array.isArray(message)) return message.join(". ");
      if (typeof message === "string") return message;
    }

    return `Não foi possível concluir a solicitação (HTTP ${status}).`;
  }

  private toQueryString<T extends object>(values: T): string {
    const query = new URLSearchParams();

    Object.entries(values as Record<string, unknown>).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        query.set(key, String(value));
      }
    });

    const result = query.toString();
    return result ? `?${result}` : "";
  }
}

export const categoryMapping: Record<string, string> = {
  "iPhones Seminovos": "iphones-seminovos",
  "iPhones Novos": "iphones-novos",
  Macbooks: "macbooks",
  iPads: "ipads",
  "Apple Watch": "apple-watch",
  Acessórios: "acessorios",
};

export const urlToCategoryMapping: Record<string, string> = {
  "iphones-seminovos": "iPhones Seminovos",
  "iphones-novos": "iPhones Novos",
  macbooks: "Macbooks",
  ipads: "iPads",
  "apple-watch": "Apple Watch",
  acessorios: "Acessórios",
};

export const apiService = new ApiService();
export default ApiService;
