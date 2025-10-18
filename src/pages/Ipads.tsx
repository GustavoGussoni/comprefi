import React from "react";
import ProductCategoryPage from "../components/ProductCategoryPage";

const Ipads: React.FC = () => {
  return (
    <ProductCategoryPage
      title="iPads"
      subtitle="Lacrados | 1 ano de garantia Apple"
      category="iPads"
      emptyIcon="📱"
      emptyMessage="Nenhum iPad disponível no momento"
    />
  );
};

export default Ipads;
