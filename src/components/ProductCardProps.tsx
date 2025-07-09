export interface ProductCardProps {
  product: {
    id: number;
    model: string;
    storage?: string;
    color?: string;
    battery?: string;
    originalPrice?: string;
    installmentPrice?: string;
    pixPrice: string;
    details?: string;
    image?: string;
    category: string;
  };
  onSelectPaymentMethod: (productId: number, method: "pix" | "card") => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBuyNow: (product: any) => void;
  selectedPaymentMethod?: "pix" | "card";
}
