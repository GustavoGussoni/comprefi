import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { saleSheetApi, safeError, type HealthState } from "./api";
import type { PublicSheet } from "./model";
import CustomerForm from "./CustomerForm";
import "./sale-sheet.css";

export default function PublicSaleSheet() {
  const { token = "" } = useParams();
  const [sheet, setSheet] = useState<PublicSheet | null>(null);
  const [health, setHealth] = useState<HealthState>({ state: "unknown" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setSheet(null);
    setError("");
    void (async () => {
      try {
        const state = await saleSheetApi.health(controller.signal);
        if (controller.signal.aborted) return;
        setHealth(state);
        if (state.state !== "ready") {
          setError(
            "A ficha de venda ainda não está disponível. Solicite orientação ao vendedor.",
          );
          return;
        }
        const result = await saleSheetApi.publicSheet(token, controller.signal);
        if (!controller.signal.aborted) setSheet(result);
      } catch (caught) {
        if (!controller.signal.aborted) setError(safeError(caught));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [token]);
  return (
    <div className="sale-sheet sale-sheet-public">
      <Helmet>
        <title>Ficha de venda · CompreFi</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      {loading ? (
        <main className="cf-health-blocker" role="status">
          <h1>Carregando ficha…</h1>
          <p>Conferindo disponibilidade do link.</p>
        </main>
      ) : error || !sheet || health.state !== "ready" ? (
        <main className="cf-health-blocker">
          <span className="cf-eyebrow">FICHA DE VENDA</span>
          <h1>Ficha indisponível</h1>
          <p role="alert">{error || "Solicite um novo link ao vendedor."}</p>
        </main>
      ) : (
        <CustomerForm
          key={token}
          sale={sheet}
          crmMode={health.crmMode}
          onSubmit={(customer, key) =>
            saleSheetApi.submit(token, customer, key)
          }
        />
      )}
    </div>
  );
}
