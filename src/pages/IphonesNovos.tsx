import React from "react";
import ProductCategoryPage from "../components/ProductCategoryPage";

const IphonesNovos: React.FC = () => {
  return (
    <ProductCategoryPage
      title="iPhones Novos"
      subtitle="Lacrados | 1 ano de garantia Apple"
      category="iPhones Novos"
      emptyIcon="📱"
      emptyMessage="Nenhum iPhone novo disponível no momento"
    />
  );
};

export default IphonesNovos;
