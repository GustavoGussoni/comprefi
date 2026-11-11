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
            "Não foi possível abrir seu cadastro. Tente novamente ou fale com seu vendedor.",
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
        <title>Seu cadastro · CompreFi</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      {loading ? (
        <main className="cf-health-blocker" role="status">
          <h1>Carregando seu cadastro…</h1>
          <p>Conferindo disponibilidade do link.</p>
        </main>
      ) : error || !sheet || health.state !== "ready" ? (
        <main className="cf-health-blocker">
          <span className="cf-eyebrow">SEU CADASTRO COMPREFI</span>
          <h1>Não foi possível abrir o cadastro</h1>
          <p role="alert">{error || "Peça um novo link ao seu vendedor."}</p>
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
