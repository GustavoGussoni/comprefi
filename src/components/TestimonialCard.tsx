import React from "react";
import StarRating from "./StarRating";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  text,
  rating = 5,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-[#ff6100]/50 transition-all duration-300">
      <div className="mb-4">
        <StarRating rating={rating} />
      </div>
      <p className="text-gray-300 mb-4 italic">"{text}"</p>
      <p className="text-white font-medium">{name}</p>
    </div>
  );
};

export default TestimonialCard;
