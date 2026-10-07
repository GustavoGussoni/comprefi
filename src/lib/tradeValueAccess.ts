import type { AuthUser } from "@/services/api";

export function canManageTradeValues(user: Pick<AuthUser, "role" | "email">): boolean {
  return (
    user.role === "ADMIN" ||
    (user.role === "SALES" &&
      user.email.trim().toLowerCase() === "iago@comprefi.com")
  );
}
