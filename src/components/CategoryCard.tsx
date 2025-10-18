import React from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  link: string;
  description: string;
  icon?: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  link,
  description,
  icon,
}) => {
  return (
    <Link
      to={link}
      className="category-card block bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6100]/20 hover:-translate-y-1 cursor-pointer border border-gray-700 hover:border-[#ff6100]"
    >
      <div className="p-6">
        {icon && <div className="mb-4 text-[#ff6100]">{icon}</div>}
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="text-[#ff6100] font-medium flex items-center">
          Ver produtos
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
