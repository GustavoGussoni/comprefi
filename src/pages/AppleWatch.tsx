import React from "react";
import ProductCategoryPage from "../components/ProductCategoryPage";

const AppleWatch: React.FC = () => {
  return (
    <ProductCategoryPage
      title="Apple Watch"
      subtitle="Lacrados | 1 ano de garantia Apple"
      category="Apple Watch"
      emptyIcon="⌚"
      emptyMessage="Nenhum Apple Watch disponível no momento"
    />
  );
};

export default AppleWatch;
