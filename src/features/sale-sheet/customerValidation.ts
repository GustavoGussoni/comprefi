import { digits, validCpf, type Client } from "./model";

export type CustomerField = keyof Client;
export type CustomerValidationErrors = Partial<Record<CustomerField, string>>;
export type CustomerStep = 0 | 1;

const BRAZILIAN_STATES = new Set([
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]);

const ASCII_EMAIL_LOCAL = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
const ASCII_EMAIL_LABEL = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;

export const cpfDigits = (value: string) => digits(value).slice(0, 11);
export const cepDigits = (value: string) => digits(value).slice(0, 8);

export function formatCpf(value: string): string {
  const normalized = cpfDigits(value);
  if (normalized.length <= 3) return normalized;
  if (normalized.length <= 6)
    return `${normalized.slice(0, 3)}.${normalized.slice(3)}`;
  if (normalized.length <= 9)
    return `${normalized.slice(0, 3)}.${normalized.slice(3, 6)}.${normalized.slice(6)}`;
  return `${normalized.slice(0, 3)}.${normalized.slice(3, 6)}.${normalized.slice(6, 9)}-${normalized.slice(9)}`;
}

export function formatCep(value: string): string {
  const normalized = cepDigits(value);
  return normalized.length > 5
    ? `${normalized.slice(0, 5)}-${normalized.slice(5)}`
    : normalized;
}

export function normalizeEmail(value: string): string {
  return value.trim();
}

export function getCpfError(value: string): string | null {
  if (cpfDigits(value).length !== 11) return "CPF deve ter 11 dígitos.";
  if (!validCpf(value)) return "Confira os dígitos do CPF.";
  return null;
}

export function validateCpf(value: string): boolean {
  return getCpfError(value) === null;
}

export function getEmailError(value: string): string | null {
  const email = normalizeEmail(value);
  if (!email || email.length > 254 || /\s/.test(email))
    return "Informe um e-mail válido.";

  const at = email.indexOf("@");
  if (at <= 0 || at !== email.lastIndexOf("@"))
    return "Informe um e-mail válido.";

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (
    local.length > 64 ||
    !ASCII_EMAIL_LOCAL.test(local) ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..")
  )
    return "Informe um e-mail válido.";

  const labels = domain.split(".");
  if (
    labels.length < 2 ||
    labels.some((label) => !ASCII_EMAIL_LABEL.test(label))
  )
    return "Informe um e-mail válido.";
  const tld = labels[labels.length - 1];
  if (!/^(?:[A-Za-z]{2,63}|xn--[A-Za-z0-9-]{2,59})$/i.test(tld))
    return "Informe um e-mail válido.";
  return null;
}

export function validateEmail(value: string): boolean {
  return getEmailError(value) === null;
}

export function isStrictPastDate(value: string, today = new Date()): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  )
    return false;

  const currentDay = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  return date.getTime() < currentDay;
}

export function normalizeClient(client: Client): Client {
  return {
    ...client,
    name: client.name.trim(),
    cpf: formatCpf(client.cpf),
    phone: client.phone.trim(),
    email: normalizeEmail(client.email),
    birth: client.birth.trim(),
    cep: formatCep(client.cep),
    street: client.street.trim(),
    number: client.number.trim(),
    complement: client.complement.trim(),
    district: client.district.trim(),
    city: client.city.trim(),
    state: client.state.trim().toUpperCase(),
    instagram: client.instagram.trim(),
  };
}

export function getCustomerFieldError(
  field: CustomerField,
  client: Client,
): string | null {
  const value = client[field];
  switch (field) {
    case "name":
      return value.trim().split(/\s+/).filter(Boolean).length < 2
        ? "Informe seu nome completo."
        : null;
    case "cpf":
      return getCpfError(value);
    case "phone":
      return digits(value).length !== 11
        ? "Informe um celular com DDD e 11 dígitos."
        : null;
    case "email":
      return getEmailError(value);
    case "birth":
      return !isStrictPastDate(value) ? "Confira a data de nascimento." : null;
    case "cep":
      return cepDigits(value).length !== 8
        ? "Informe um CEP com 8 dígitos."
        : null;
    case "street":
      return value.trim().length < 2
        ? "Informe um endereço com pelo menos 2 caracteres."
        : null;
    case "number":
      return value.trim() ? null : "Informe o número ou S/N.";
    case "district":
      return value.trim().length < 2
        ? "Informe um bairro com pelo menos 2 caracteres."
        : null;
    case "city":
      return value.trim().length < 2
        ? "Informe uma cidade com pelo menos 2 caracteres."
        : null;
    case "state":
      return BRAZILIAN_STATES.has(value.trim().toUpperCase())
        ? null
        : "Selecione um estado válido.";
    case "complement":
    case "instagram":
      return null;
  }
}

const STEP_FIELDS: Record<CustomerStep, CustomerField[]> = {
  0: ["name", "cpf", "birth", "phone", "email"],
  1: ["cep", "street", "number", "district", "city", "state"],
};

export function validateCustomerStep(
  step: CustomerStep,
  client: Client,
): CustomerValidationErrors {
  return STEP_FIELDS[step].reduce<CustomerValidationErrors>((errors, field) => {
    const error = getCustomerFieldError(field, client);
    if (error) errors[field] = error;
    return errors;
  }, {});
}

export function validateCustomer(client: Client): CustomerValidationErrors {
  return {
    ...validateCustomerStep(0, client),
    ...validateCustomerStep(1, client),
  };
}

export function firstInvalidCustomerStep(
  errors: CustomerValidationErrors,
): CustomerStep | null {
  if (STEP_FIELDS[0].some((field) => errors[field])) return 0;
  if (STEP_FIELDS[1].some((field) => errors[field])) return 1;
  return null;
}

export const customerFieldsForStep = (step: CustomerStep) => [
  ...STEP_FIELDS[step],
];
