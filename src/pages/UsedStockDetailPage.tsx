import { ArrowLeft, Phone, RefreshCw, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FAQ from "@/components/FAQ";
import ImageLoader from "@/components/ImageLoader";
import WhyChooseSection from "@/components/WhyChooseCompreFi";
import { openWhatsApp } from "@/data/constants";
import {
  buildUsedStockWhatsAppMessage,
  formatUsedStockInstallment,
  formatUsedStockMoney,
  usedStockUnitName,
} from "@/lib/usedStock";
import { ApiError, apiService, type UsedStockPublicUnit } from "@/services/api";

type DetailState = "loading" | "ready" | "not-found" | "error";

const WHY_CHOOSE_ITEMS = [
  "Todos os aparelhos passam por verificação completa de 47 pontos",
  "Saúde da bateria informada individualmente em cada anúncio.",
  "Suporte vitalício para todos os produtos adquiridos",
  "Programa de indicações com desconto acumulativo",
  "6 meses de garantia CompreFi em todos os seminovos",
];

const UsedStockDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [unit, setUnit] = useState<UsedStockPublicUnit | null>(null);
  const [state, setState] = useState<DetailState>("loading");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [reloadKey, setReloadKey] = useState(0);
  const [isContacting, setIsContacting] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const contactInFlightRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function loadUnit() {
      if (!id) {
        setState("not-found");
        return;
      }

      setState("loading");
      setUnit(null);
      setContactError(null);
      try {
        const result = await apiService.getPublicUsedStockById(id);
        if (!cancelled) {
          setUnit(result);
          setState("ready");
        }
      } catch (error) {
        if (cancelled) return;
        setState(error instanceof ApiError && error.status === 404 ? "not-found" : "error");
      }
    }

    void loadUnit();
    return () => {
      cancelled = true;
    };
  }, [id, reloadKey]);

  const handleWhatsApp = async () => {
    if (!unit || contactInFlightRef.current) return;

    const selectedPaymentMethod = paymentMethod;
    const unitId = unit.id;
    contactInFlightRef.current = true;
    setIsContacting(true);
    setContactError(null);

    try {
      const freshUnit = await apiService.getPublicUsedStockById(unitId);
      setUnit(freshUnit);
      openWhatsApp(buildUsedStockWhatsAppMessage(freshUnit, selectedPaymentMethod));
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        setUnit(null);
        setState("not-found");
        return;
      }
      setContactError(
        "Não foi possível confirmar a disponibilidade agora. Tente novamente antes de falar conosco.",
      );
    } finally {
      contactInFlightRef.current = false;
      setIsContacting(false);
    }
  };

  if (state === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-black" role="status">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-3 h-7 w-7 animate-spin text-[#ff6100]" />
          <p className="text-gray-300">Consultando esta unidade...</p>
        </div>
      </div>
    );
  }

  if (state === "not-found") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-black px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-white">Esta unidade não está mais disponível</h1>
          <p className="mt-3 text-gray-400">
            Ela pode ter sido vendida ou retirada do estoque. Veja as unidades disponíveis no momento.
          </p>
          <Link
            to="/iphones-seminovos"
            className="mt-6 inline-flex items-center rounded-md bg-[#ff6100] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#e55a00]"
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar para seminovos
          </Link>
        </div>
      </div>
    );
  }

  if (state === "error" || !unit) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-black px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-white">Não foi possível abrir esta unidade</h1>
          <p className="mt-3 text-gray-400">Tente consultar novamente em instantes.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setReloadKey((value) => value + 1)}
              className="rounded-md bg-[#ff6100] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#e55a00]"
            >
              Tentar novamente
            </button>
            <Link
              to="/iphones-seminovos"
              className="rounded-md border border-gray-700 px-5 py-3 text-sm text-gray-200 transition-colors hover:bg-gray-900"
            >
              Ver seminovos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <Link
          to="/iphones-seminovos"
          className="mb-6 inline-flex items-center text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar para seminovos
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-4 md:p-6">
            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-lg bg-black/20">
              {unit.image ? (
                <ImageLoader
                  src={unit.image}
                  alt={usedStockUnitName(unit)}
                  className="max-h-[540px] w-full object-contain"
                />
              ) : (
                <span className="text-sm text-gray-500">Imagem indisponível</span>
              )}
              <span className="absolute bottom-3 left-3 rounded bg-black/70 px-2.5 py-1.5 text-xs text-gray-200">
                {unit.imageIsIllustrative ? "Imagem ilustrativa" : "Foto da unidade"}
              </span>
            </div>
          </section>

          <section className="rounded-lg border border-gray-800 bg-gray-900 p-6 md:p-8">
            <p className="mb-3 text-sm font-medium text-[#ff7a1a]">Unidade disponível</p>
            <h1 className="text-3xl font-bold text-white">{unit.model}</h1>
            <p className="mt-2 text-xl text-gray-300">
              {unit.storage} • {unit.color}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-gray-800 px-3 py-1.5 text-gray-200">
                Bateria: {unit.battery === null ? "não informada" : `${unit.battery}%`}
              </span>
              <span className="rounded-full bg-gray-800 px-3 py-1.5 text-gray-200">
                6 meses de garantia CompreFi
              </span>
            </div>

            <div className="mt-8 border-y border-gray-800 py-6">
              {paymentMethod === "pix" ? (
                <p className="text-3xl font-semibold text-[#ff6100]">
                  {formatUsedStockMoney(unit.pixPrice)} <span className="text-base font-medium">no PIX</span>
                </p>
              ) : (
                <p className="text-2xl font-semibold text-white">
                  {formatUsedStockInstallment(unit.installments, unit.installmentPrice)}
                </p>
              )}
            </div>

            {unit.details && (
              <div className="mt-6 rounded-lg bg-gray-800 p-4">
                <h2 className="text-base font-medium text-white">Detalhes da unidade</h2>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-300">{unit.details}</p>
              </div>
            )}

            <div className="mt-7">
              <h2 className="mb-3 text-base font-medium text-white">Forma de pagamento</h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("pix")}
                  disabled={isContacting}
                  aria-pressed={paymentMethod === "pix"}
                  className={`rounded-md border px-4 py-3 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                    paymentMethod === "pix"
                      ? "border-[#ff6100] bg-[#ff6100]/15 text-white"
                      : "border-gray-700 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  PIX
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  disabled={isContacting}
                  aria-pressed={paymentMethod === "card"}
                  className={`rounded-md border px-4 py-3 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                    paymentMethod === "card"
                      ? "border-[#ff6100] bg-[#ff6100]/15 text-white"
                      : "border-gray-700 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Cartão
                </button>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-2 text-sm text-gray-300">
              <Shield size={20} className="text-[#ff6100]" />
              6 meses de garantia CompreFi para sua compra.
            </div>

            {contactError && (
              <p role="alert" className="mt-4 text-sm leading-6 text-red-300">
                {contactError}
              </p>
            )}

            <button
              type="button"
              onClick={() => void handleWhatsApp()}
              disabled={isContacting}
              className="mt-7 flex w-full items-center justify-center rounded-md bg-[#ff6100] py-4 text-base font-medium text-white transition-colors hover:bg-[#e55a00] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Phone size={22} className="mr-2" />
              {isContacting ? "Verificando disponibilidade..." : "Falar sobre esta unidade"}
            </button>
          </section>
        </div>

        <div className="mt-16">
          <WhyChooseSection
            category="iPhones Seminovos"
            title="Por que escolher a CompreFi?"
            items={WHY_CHOOSE_ITEMS}
          />
        </div>

        <div className="mt-16">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default UsedStockDetailPage;
