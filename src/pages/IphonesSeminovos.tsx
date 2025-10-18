import React from "react";
import ProductCategoryPage from "../components/ProductCategoryPage";

const IphonesSeminovos: React.FC = () => {
  return (
    <ProductCategoryPage
      title="iPhones Seminovos"
      subtitle="Seminovos com garantia | Bateria acima de 80%"
      category="iPhones Seminovos"
      emptyIcon="📱"
      emptyMessage="Nenhum iPhone seminovo disponível no momento"
    />
  );
};

export default IphonesSeminovos;
