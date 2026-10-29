import { Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageLoader from "@/components/ImageLoader";
import { openWhatsApp } from "@/data/constants";
import {
  buildUsedStockWhatsAppMessage,
  formatUsedStockInstallment,
  formatUsedStockMoney,
  usedStockUnitName,
} from "@/lib/usedStock";
import { ApiError, apiService, type UsedStockPublicUnit } from "@/services/api";

interface UsedStockCardProps {
  unit: UsedStockPublicUnit;
}

const UsedStockCard: React.FC<UsedStockCardProps> = ({ unit }) => {
  const [currentUnit, setCurrentUnit] = useState(unit);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [isContacting, setIsContacting] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const contactInFlightRef = useRef(false);
  const detailPath = `/seminovos/${encodeURIComponent(currentUnit.id)}`;

  useEffect(() => {
    setCurrentUnit(unit);
    setIsUnavailable(false);
    setContactError(null);
  }, [unit]);

  const handleWhatsApp = async () => {
    if (contactInFlightRef.current) return;

    const selectedPaymentMethod = paymentMethod;
    contactInFlightRef.current = true;
    setIsContacting(true);
    setContactError(null);

    try {
      const freshUnit = await apiService.getPublicUsedStockById(currentUnit.id);
      setCurrentUnit(freshUnit);
      openWhatsApp(buildUsedStockWhatsAppMessage(freshUnit, selectedPaymentMethod));
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        setIsUnavailable(true);
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

  if (isUnavailable) {
    return (
      <article className="rounded-lg border border-gray-800 bg-gray-900 p-4" aria-live="polite">
        <h2 className="text-lg font-bold text-white">Esta unidade não está mais disponível</h2>
        <p className="mt-2 text-sm text-gray-400">
          Ela pode ter sido vendida ou retirada do estoque. Veja as unidades disponíveis no momento.
        </p>
        <Link
          to="/iphones-seminovos"
          className="mt-4 inline-flex text-sm font-medium text-[#ff6100] transition-colors hover:text-[#ff8a42]"
        >
          Ver seminovos disponíveis
        </Link>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
      <div className="p-4">
        <Link to={detailPath} className="mb-3 block">
          <div className="relative flex min-h-[190px] items-center justify-center overflow-hidden rounded-lg bg-black/20">
            {currentUnit.image ? (
              <ImageLoader
                src={currentUnit.image}
                alt={usedStockUnitName(currentUnit)}
                className="max-h-[220px] w-full object-contain"
              />
            ) : (
              <span className="text-sm text-gray-500">Imagem indisponível</span>
            )}
            <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-[11px] text-gray-200">
              {currentUnit.imageIsIllustrative ? "Imagem ilustrativa" : "Foto da unidade"}
            </span>
          </div>
        </Link>

        <Link to={detailPath} className="block">
          <h2 className="mb-1 text-lg font-bold text-white">{currentUnit.model}</h2>
          <p className="mb-2 text-sm text-gray-400">
            {currentUnit.storage} • {currentUnit.color}
          </p>
        </Link>

        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-gray-300">
            Bateria: {currentUnit.battery === null ? "não informada" : `${currentUnit.battery}%`}
          </span>
          <span className="rounded bg-gray-800 px-2 py-1 text-white">6 meses de garantia CompreFi</span>
        </div>

        {currentUnit.details && <p className="mb-3 line-clamp-2 text-xs text-gray-400">{currentUnit.details}</p>}

        <div className="mb-3">
          {paymentMethod === "pix" ? (
            <p className="text-base font-semibold text-[#ff6100]">
              {formatUsedStockMoney(currentUnit.pixPrice)} <span className="text-xs font-medium">no PIX</span>
            </p>
          ) : (
            <p className="text-base font-semibold text-white">
              {formatUsedStockInstallment(currentUnit.installments, currentUnit.installmentPrice)}
            </p>
          )}
        </div>

        <div className="mb-2 flex gap-1">
          <button
            type="button"
            onClick={() => setPaymentMethod("pix")}
            disabled={isContacting}
            className={`flex-1 rounded-md py-1 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              paymentMethod === "pix"
                ? "bg-[#ff610061] text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            aria-pressed={paymentMethod === "pix"}
          >
            PIX
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            disabled={isContacting}
            className={`flex-1 rounded-md py-1 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              paymentMethod === "card"
                ? "bg-[#ff610061] text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            aria-pressed={paymentMethod === "card"}
          >
            Cartão
          </button>
        </div>

        {contactError && (
          <p role="alert" className="mb-2 text-xs leading-5 text-red-300">
            {contactError}
          </p>
        )}

        <button
          type="button"
          onClick={() => void handleWhatsApp()}
          disabled={isContacting}
          className="flex w-full items-center justify-center rounded-md bg-[#ff6100] py-1.5 text-sm text-white transition-colors hover:bg-[#e55a00] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Phone size={16} className="mr-1" />
          {isContacting ? "Verificando disponibilidade..." : "Falar sobre esta unidade"}
        </button>
      </div>
    </article>
  );
};

export default UsedStockCard;
