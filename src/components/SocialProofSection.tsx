import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  ExternalLink,
  Play,
  ImageIcon,
} from "lucide-react";

/** Link da publicação com os depoimentos no Instagram */
const INSTAGRAM_POST_URL = "https://www.instagram.com/p/DNtAhPo3Bif/";

/* ------------------------------------------------------------------ */
/*  Depoimentos — imports estáticos                                    */
/* ------------------------------------------------------------------ */

import dep01 from "@/assets/images/depoimentos/depoimento-01.jpg";
import dep02 from "@/assets/images/depoimentos/depoimento-02.jpg";
import dep03 from "@/assets/images/depoimentos/depoimento-03.jpg";
import dep04 from "@/assets/images/depoimentos/depoimento-04.jpg";
import dep05 from "@/assets/images/depoimentos/depoimento-05.jpg";
import dep06 from "@/assets/images/depoimentos/depoimento-06.jpg";
import dep07 from "@/assets/images/depoimentos/depoimento-07.jpg";
import dep08 from "@/assets/images/depoimentos/depoimento-08.jpg";
import dep09 from "@/assets/images/depoimentos/depoimento-09.jpg";

const depoimentos = [
  dep01,
  dep02,
  dep03,
  dep04,
  dep05,
  dep06,
  dep07,
  dep08,
  dep09,
];

/* ------------------------------------------------------------------ */
/*  Mural — import.meta.glob (auto-load da pasta)                     */
/* ------------------------------------------------------------------ */

const muralModules = import.meta.glob<{ default: string }>(
  "@/assets/images/mural/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

const muralImages = Object.values(muralModules).map((mod) => mod.default);

/* ------------------------------------------------------------------ */
/*  IntersectionObserver hook                                          */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ------------------------------------------------------------------ */
/*  Carrossel de Depoimentos                                           */
/* ------------------------------------------------------------------ */

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = depoimentos.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) next();
    if (touchStart - touchEnd < -50) prev();
  };

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div
        className="relative overflow-hidden rounded-2xl h-[280px] sm:h-[320px] md:h-[360px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {depoimentos.map((src, i) => (
            <div
              key={i}
              className="w-full shrink-0 px-1 h-full flex items-center justify-center"
            >
              <img
                src={src}
                alt={`Depoimento de cliente ${i + 1}`}
                className="max-w-full max-h-full rounded-xl border border-gray-700/50 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 border border-gray-700/50 text-white transition-colors z-10"
        aria-label="Depoimento anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 border border-gray-700/50 text-white transition-colors z-10"
        aria-label="Próximo depoimento"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots + Instagram link */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {depoimentos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-[#FF6100] w-6"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Ir para depoimento ${i + 1}`}
          />
        ))}
      </div>

      {/* Link para a publicação */}
      <div className="flex justify-center mt-4">
        <a
          href={INSTAGRAM_POST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#FF6100] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Ver publicação no Instagram
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Vídeo YouTube (formato Shorts — vertical 9:16)                     */
/* ------------------------------------------------------------------ */

const YOUTUBE_VIDEO_ID = "Re_rCRT6R28";

function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  if (YOUTUBE_VIDEO_ID && isPlaying) {
    return (
      <div className="flex justify-center">
        <div className="relative w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden border border-gray-700/50">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
            title="Depoimento em vídeo — CompreFi"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div
        onClick={() => YOUTUBE_VIDEO_ID && setIsPlaying(true)}
        className={`relative w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden border border-gray-700/50 bg-[#0d1117] flex items-center justify-center ${
          YOUTUBE_VIDEO_ID ? "cursor-pointer group" : ""
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#FF6100]/20 border-2 border-[#FF6100]/40 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF6100]/30 transition-colors">
            <Play className="w-7 h-7 text-[#FF6100] ml-1" />
          </div>
          <p className="text-gray-400 text-sm">
            {YOUTUBE_VIDEO_ID
              ? "Clique para assistir"
              : "Em breve: depoimento em vídeo"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mural de Fotos                                                     */
/* ------------------------------------------------------------------ */

function PhotoWall() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (muralImages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-700/50 bg-[#0d1117] p-12 text-center">
        <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium mb-2">
          Mural de fotos com clientes
        </p>
        <p className="text-gray-600 text-sm">
          Em breve: +20 fotos de entregas presenciais
        </p>
        <p className="text-gray-700 text-xs mt-3">
          Adicione fotos em{" "}
          <code className="text-gray-500">src/assets/images/mural/</code>
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Grid de fotos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
        {muralImages.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelectedPhoto(src)}
            className="relative aspect-square rounded-xl overflow-hidden border border-gray-700/30 hover:border-[#FF6100]/40 transition-all duration-300 group"
          >
            <img
              src={src}
              alt={`Entrega CompreFi ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox via Portal — renderiza fora da hierarquia de overflow */}
      {selectedPhoto &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl font-light z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              &times;
            </button>
            <img
              src={selectedPhoto}
              alt="Foto ampliada"
              className="max-w-full max-h-[90vh] rounded-xl object-contain"
            />
          </div>,
          document.body
        )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function SocialProofSection() {
  const { ref: headerRef, isVisible: headerVisible } = useInView(0.1);
  const { ref: carouselRef, isVisible: carouselVisible } = useInView(0.1);
  const { ref: videoRef, isVisible: videoVisible } = useInView(0.1);
  const { ref: muralRef, isVisible: muralVisible } = useInView(0.1);

  return (
    <section className="relative w-full bg-[#111827] py-20 md:py-28 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Quem comprou, <span className="text-[#FF6100]">aprovou</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Depoimentos reais de clientes que confiaram na CompreFi
          </p>
        </div>

        {/* Depoimentos Instagram */}
        <div
          ref={carouselRef}
          className={`mb-16 md:mb-20 max-w-2xl mx-auto transition-all duration-700 ${
            carouselVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <Instagram className="w-5 h-5 text-[#FF6100]" />
            <h3 className="text-lg font-semibold text-white">
              Direto do Instagram
            </h3>
          </div>
          <TestimonialsCarousel />
        </div>

        {/* Vídeo */}
        <div
          ref={videoRef}
          className={`mb-16 md:mb-20 max-w-3xl mx-auto transition-all duration-700 ${
            videoVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <Play className="w-5 h-5 text-[#FF6100]" />
            <h3 className="text-lg font-semibold text-white">
              Depoimento em vídeo
            </h3>
          </div>
          <VideoSection />
        </div>

        {/* Mural de fotos */}
        <div
          ref={muralRef}
          className={`transition-all duration-700 ${
            muralVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="w-5 h-5 text-[#FF6100]" />
            <h3 className="text-lg font-semibold text-white">
              Nossos clientes
            </h3>
          </div>
          <PhotoWall />
        </div>
      </div>
    </section>
  );
}
