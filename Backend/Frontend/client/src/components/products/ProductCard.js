import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mt-1">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
