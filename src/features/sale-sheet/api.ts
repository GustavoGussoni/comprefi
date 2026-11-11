import { API_BASE_URL, ApiError, apiService } from "@/services/api";
import type {
  CatalogItem,
  Client,
  CrmDeliveryMode,
  PublicSheet,
  SheetSnapshot,
  SheetTerms,
} from "./model";

import { createPayload } from "./payload";
import {
  DELIVERY_DEADLINE_EXPIRED_MESSAGE,
  publicSubmissionValidationMessage,
} from "./submissionError";

const PREFIX = "/ficha-venda";
export type CreatedSheet = {
  sheet: SheetSnapshot;
  token?: string;
  replayed?: boolean;
};
export type HealthState =
  | { state: "ready"; crmMode: CrmDeliveryMode }
  | { state: "unknown" };
export type PublicSubmission = {
  reference: string;
  revision: number;
  submitted: true;
};

export function errorStatus(error: unknown): number | undefined {
  return error instanceof ApiError ? error.status : undefined;
}
export function safeError(error: unknown): string {
  const status = errorStatus(error);
  if (status === 401) return "Sua sessão expirou. Entre novamente.";
  if (status === 403) return "Sua conta não tem permissão para esta ação.";
  if (status === 404 || status === 503)
    return "Não foi possível abrir o cadastro ou pedido. Peça orientação à equipe.";
  if (status === 410)
    return "Este link expirou ou foi encerrado. Peça um novo link ao vendedor.";
  if (status === 409)
    return "O pedido mudou ou já recebeu o cadastro. Atualize e confira o resultado com a equipe. Não crie outro pedido nem repita com dados diferentes.";
  if (
    status === 400 &&
    error instanceof ApiError &&
    error.message === DELIVERY_DEADLINE_EXPIRED_MESSAGE
  ) {
    return DELIVERY_DEADLINE_EXPIRED_MESSAGE;
  }
  if (status === 400 || status === 422)
    return "Confira os campos e condições antes de tentar novamente.";
  return "Não foi possível confirmar o resultado. Repita o mesmo envio, sem alterar os dados, para evitar duplicidade.";
}

async function publicRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${PREFIX}${path}`, {
    ...options,
    cache: "no-store",
    credentials: "omit",
    referrerPolicy: "no-referrer",
    redirect: "error",
  });
  if (!response.ok) {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = undefined;
    }
    throw new ApiError(
      publicSubmissionValidationMessage(response.status, body) ||
        "Não foi possível abrir ou enviar o cadastro.",
      response.status,
    );
  }
  return response.json() as Promise<T>;
}

export const saleSheetApi = {
  async health(signal?: AbortSignal): Promise<HealthState> {
    const value = await publicRequest<{ status?: string; crmMode?: string }>(
      "/health",
      { signal },
    );
    return value.status === "ok" &&
      (value.crmMode === "disabled" || value.crmMode === "datacrazy")
      ? { state: "ready", crmMode: value.crmMode }
      : { state: "unknown" };
  },
  catalog(signal?: AbortSignal) {
    return apiService.request<CatalogItem[]>(`${PREFIX}/catalog`, {
      signal,
      cache: "no-store",
      referrerPolicy: "no-referrer",
    });
  },
  sheets(signal?: AbortSignal) {
    return apiService.request<SheetSnapshot[]>(`${PREFIX}/admin`, {
      signal,
      cache: "no-store",
      referrerPolicy: "no-referrer",
    });
  },
  sheet(id: string) {
    return apiService.request<SheetSnapshot>(
      `${PREFIX}/admin/${encodeURIComponent(id)}`,
      { cache: "no-store", referrerPolicy: "no-referrer" },
    );
  },
  create(terms: SheetTerms, key: string) {
    return apiService.request<CreatedSheet>(`${PREFIX}/admin`, {
      method: "POST",
      headers: { "Idempotency-Key": key },
      body: createPayload(terms),
      cache: "no-store",
      referrerPolicy: "no-referrer",
    });
  },
  edit(id: string, revision: number, terms: SheetTerms, key: string) {
    return apiService.request<CreatedSheet>(
      `${PREFIX}/admin/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: { "Idempotency-Key": key },
        body: { revision, terms: createPayload(terms) },
        cache: "no-store",
        referrerPolicy: "no-referrer",
      },
    );
  },
  cancel(id: string, revision: number) {
    return apiService.request<SheetSnapshot>(
      `${PREFIX}/admin/${encodeURIComponent(id)}/cancel`,
      {
        method: "POST",
        body: { revision },
        cache: "no-store",
        referrerPolicy: "no-referrer",
      },
    );
  },
  archive(id: string, revision: number) {
    return apiService.request<SheetSnapshot>(
      `${PREFIX}/admin/${encodeURIComponent(id)}/archive`,
      {
        method: "POST",
        body: { revision },
        cache: "no-store",
        referrerPolicy: "no-referrer",
      },
    );
  },
  unarchive(id: string, revision: number, archivedAt: string) {
    return apiService.request<SheetSnapshot>(
      `${PREFIX}/admin/${encodeURIComponent(id)}/unarchive`,
      {
        method: "POST",
        body: { revision, archivedAt },
        cache: "no-store",
        referrerPolicy: "no-referrer",
      },
    );
  },
  rotate(id: string) {
    return apiService.request<CreatedSheet>(
      `${PREFIX}/admin/${encodeURIComponent(id)}/link`,
      { method: "POST", cache: "no-store", referrerPolicy: "no-referrer" },
    );
  },
  revoke(id: string) {
    return apiService.request<SheetSnapshot>(
      `${PREFIX}/admin/${encodeURIComponent(id)}/revoke`,
      { method: "POST", cache: "no-store", referrerPolicy: "no-referrer" },
    );
  },
  retryContract(id: string) {
    return apiService.request<SheetSnapshot>(
      `${PREFIX}/admin/${encodeURIComponent(id)}/contract/retry`,
      { method: "POST", cache: "no-store", referrerPolicy: "no-referrer" },
    );
  },
  retryCrm(id: string) {
    return apiService.request<SheetSnapshot>(
      `${PREFIX}/admin/${encodeURIComponent(id)}/crm/retry`,
      { method: "POST", cache: "no-store", referrerPolicy: "no-referrer" },
    );
  },
  payload(id: string) {
    return apiService.request<unknown>(
      `${PREFIX}/admin/${encodeURIComponent(id)}/crm-payload`,
      { cache: "no-store", referrerPolicy: "no-referrer" },
    );
  },
  async download(id: string): Promise<Blob> {
    // Exactly the session key used by ProtectedRoute/ApiService, read only at action time.
    const token = window.localStorage.getItem("admin_token");
    if (!token) throw new ApiError("Sessão ausente.", 401);
    const response = await fetch(
      `${API_BASE_URL}${PREFIX}/admin/${encodeURIComponent(id)}/contract`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/pdf",
        },
        cache: "no-store",
        credentials: "omit",
        referrerPolicy: "no-referrer",
        redirect: "error",
      },
    );
    if (response.status === 401) {
      apiService.clearAuthToken();
      window.dispatchEvent(new Event("auth:expired"));
    }
    if (!response.ok)
      throw new ApiError("Falha no download autenticado.", response.status);
    if (!response.headers.get("Content-Type")?.includes("application/pdf"))
      throw new Error("Documento inválido.");
    return response.blob();
  },
  publicSheet(token: string, signal?: AbortSignal) {
    return publicRequest<PublicSheet>(`/public/${encodeURIComponent(token)}`, {
      signal,
    });
  },
  submit(token: string, customer: Client, key: string) {
    return publicRequest<PublicSubmission>(
      `/public/${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": key },
        body: JSON.stringify({ customer, accepted: true }),
      },
    );
  },
};
