import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const DEFAULT_TITLE = "CompreFi — iPhones, MacBooks, iPads e Apple Watch com os melhores preços";
const DEFAULT_DESCRIPTION =
  "Compre iPhones, MacBooks, iPads, Apple Watch e acessórios Apple com os melhores preços do Brasil. Novos e seminovos com garantia. Parcele em até 12x ou pague no Pix com desconto.";
const DEFAULT_IMAGE = "https://comprefi.com/og-image.webp";
const SITE_URL = "https://comprefi.com";

export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | CompreFi` : DEFAULT_TITLE;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  return (
    <Helmet>
      {/* Básico */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph (Facebook, WhatsApp) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="CompreFi" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Extras */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#f97316" />
    </Helmet>
  );
}
