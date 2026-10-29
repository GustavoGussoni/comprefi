export const USED_STOCK_ILLUSTRATIONS = [
  {
    value: "/assets/used-stock/iphone16-pro-max-natural.jpg",
    label: "iPhone 16 Pro Max — Natural",
  },
  {
    value: "/assets/used-stock/iphone16-pro-max-preto.jpg",
    label: "iPhone 16 Pro Max — Preto",
  },
  {
    value: "/assets/used-stock/iphone12-pro-max-azul.jpg",
    label: "iPhone 12 Pro Max — Azul",
  },
] as const;

export const USED_STOCK_ILLUSTRATION_PATHS = USED_STOCK_ILLUSTRATIONS.map(
  (illustration) => illustration.value,
);
