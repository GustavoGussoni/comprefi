import React from "react";
import ProductCategoryPage from "../components/ProductCategoryPage";

const Macbooks: React.FC = () => {
  return (
    <ProductCategoryPage
      title="MacBooks"
      subtitle="Lacrados | 1 ano de garantia Apple"
      category="Macbooks"
      emptyIcon="💻"
      emptyMessage="Nenhum MacBook disponível no momento"
    />
  );
};

export default Macbooks;
