import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";

interface ZoomableLightboxProps {
  images: string[];
  startIndex: number;
  productName?: string;
  onClose: () => void;
}

/**
 * Lightbox fullscreen com:
 * - Carrossel Embla (swipe entre fotos)
 * - Pinch-to-zoom no mobile
 * - Scroll-to-zoom no desktop
 * - Drag para mover quando com zoom
 * - Double-tap/double-click para zoom toggle
 * - Botão de reset zoom
 */
const ZoomableLightbox: React.FC<ZoomableLightboxProps> = ({
  images,
  startIndex,
  productName = "Produto",
  onClose,
}) => {
  const [lightboxRef, lightboxApi] = useEmblaCarousel({
    loop: true,
    startIndex,
    watchDrag: () => {
      // Desabilitar drag do Embla quando estiver com zoom
      if (zoomRef.current > 1.05) return false;
      return true;
    },
  });

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const translateRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);

  // Refs para gestos de toque (pinch-to-zoom)
  const lastTouchDistRef = useRef(0);
  const lastTouchCenterRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastTapRef = useRef(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Sincronizar ref com state
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    translateRef.current = translate;
  }, [translate]);

  // Atualizar contador quando navega
  const onSelect = useCallback(() => {
    if (!lightboxApi) return;
    setCurrentIndex(lightboxApi.selectedScrollSnap());
    // Reset zoom ao mudar de slide
    setZoom(1);
    setTranslate({ x: 0, y: 0 });
  }, [lightboxApi]);

  useEffect(() => {
    if (!lightboxApi) return;
    onSelect();
    lightboxApi.on("select", onSelect);
    return () => {
      lightboxApi.off("select", onSelect);
    };
  }, [lightboxApi, onSelect]);

  // Sincronizar com startIndex
  useEffect(() => {
    if (lightboxApi) {
      lightboxApi.scrollTo(startIndex, true);
    }
  }, [lightboxApi, startIndex]);

  // Bloquear scroll do body (iOS-safe)
  useEffect(() => {
    scrollYRef.current = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, []);

  // Teclado: Escape, setas, +/-
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") lightboxApi?.scrollPrev();
      if (e.key === "ArrowRight") lightboxApi?.scrollNext();
      if (e.key === "+" || e.key === "=") {
        setZoom((z) => Math.min(z + 0.5, 5));
      }
      if (e.key === "-") {
        setZoom((z) => {
          const newZ = Math.max(z - 0.5, 1);
          if (newZ <= 1) setTranslate({ x: 0, y: 0 });
          return newZ;
        });
      }
      if (e.key === "0") {
        setZoom(1);
        setTranslate({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxApi, onClose]);

  // Scroll-to-zoom (desktop)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom((z) => {
      const newZ = Math.max(1, Math.min(z + delta, 5));
      if (newZ <= 1) setTranslate({ x: 0, y: 0 });
      return newZ;
    });
  }, []);

  // Double-click para toggle zoom (desktop)
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setZoom((z) => {
      if (z > 1.05) {
        setTranslate({ x: 0, y: 0 });
        return 1;
      }
      return 2.5;
    });
  }, []);

  // Mouse drag para mover quando com zoom (desktop)
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1.05) return;
      e.preventDefault();
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.clientX - translateRef.current.x,
        y: e.clientY - translateRef.current.y,
      };
    },
    [zoom],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDraggingRef.current || zoom <= 1.05) return;
      e.preventDefault();
      setTranslate({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    },
    [zoom],
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Touch handlers para pinch-to-zoom e drag
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistRef.current = Math.sqrt(dx * dx + dy * dy);
      lastTouchCenterRef.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
    } else if (e.touches.length === 1 && zoomRef.current > 1.05) {
      // Single touch drag quando com zoom
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.touches[0].clientX - translateRef.current.x,
        y: e.touches[0].clientY - translateRef.current.y,
      };
    }

    // Double-tap detection
    if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        // Double tap
        setZoom((z) => {
          if (z > 1.05) {
            setTranslate({ x: 0, y: 0 });
            return 1;
          }
          return 2.5;
        });
      }
      lastTapRef.current = now;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch move
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (lastTouchDistRef.current > 0) {
        const scale = dist / lastTouchDistRef.current;
        setZoom((z) => {
          const newZ = Math.max(1, Math.min(z * scale, 5));
          if (newZ <= 1) setTranslate({ x: 0, y: 0 });
          return newZ;
        });
      }
      lastTouchDistRef.current = dist;
    } else if (
      e.touches.length === 1 &&
      isDraggingRef.current &&
      zoomRef.current > 1.05
    ) {
      // Drag quando com zoom
      e.preventDefault();
      setTranslate({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y,
      });
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    lastTouchDistRef.current = 0;
    isDraggingRef.current = false;
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.97)",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#999", fontSize: "14px" }}>
            {currentIndex + 1} / {images.length}
          </span>
          {zoom > 1.05 && (
            <button
              onClick={resetZoom}
              style={{
                backgroundColor: "rgba(255, 97, 0, 0.6)",
                border: "none",
                borderRadius: "4px",
                padding: "4px 8px",
                color: "white",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              {Math.round(zoom * 100)}% — Resetar
            </button>
          )}
        </div>
        <button
          style={{
            backgroundColor: "#ff6100",
            border: "none",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={onClose}
          aria-label="Fechar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Carrossel */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          touchAction: zoom > 1.05 ? "none" : "pan-x",
        }}
        ref={lightboxRef}
      >
        <div style={{ display: "flex", height: "100%" }}>
          {images.map((img, index) => (
            <div
              key={index}
              ref={index === currentIndex ? imageContainerRef : undefined}
              style={{
                flex: "0 0 100%",
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                overflow: "hidden",
                cursor: zoom > 1.05 ? "grab" : "zoom-in",
              }}
              onWheel={handleWheel}
              onDoubleClick={handleDoubleClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={img}
                alt={`${productName} - Foto ${index + 1}`}
                draggable={false}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                  transform:
                    index === currentIndex
                      ? `scale(${zoom}) translate(${translate.x / zoom}px, ${translate.y / zoom}px)`
                      : "none",
                  transition: isDraggingRef.current
                    ? "none"
                    : "transform 0.2s ease-out",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Setas de navegação (desktop, ocultas quando com zoom) */}
        {zoom <= 1.05 && (
          <>
            <button
              onClick={() => lightboxApi?.scrollPrev()}
              className="hidden md:flex items-center justify-center"
              style={{
                position: "absolute",
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 97, 0, 0.8)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label="Anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => lightboxApi?.scrollNext()}
              className="hidden md:flex items-center justify-center"
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 97, 0, 0.8)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label="Próxima"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Footer hint */}
      <div
        style={{
          textAlign: "center",
          padding: "8px",
          color: "#666",
          fontSize: "12px",
          flexShrink: 0,
        }}
      >
        {zoom > 1.05 ? (
          <span>Arraste para mover • Toque duplo para resetar</span>
        ) : (
          <>
            <span className="md:hidden">
              Deslize para navegar • Toque duplo ou pinça para zoom
            </span>
            <span className="hidden md:inline">
              Scroll para zoom • Duplo clique para ampliar • Setas do teclado
              para navegar
            </span>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default ZoomableLightbox;
