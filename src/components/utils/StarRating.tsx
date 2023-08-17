import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  const filledStars = Math.min(Math.max(rating, 0), maxStars);

  return (
    <div>
      {Array.from({ length: maxStars }).map((_, index) => (
        <span
          key={index}
          style={{
            color: index < filledStars ? "yellowgreen" : "gray",
            marginRight: "5px",
          }}
        >
          <FaStar />
        </span>
      ))}
    </div>
  );
};

export default StarRating;
