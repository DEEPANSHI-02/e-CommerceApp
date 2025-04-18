import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (variant) => {
    addToCart({
      ...product,
      selectedSize: variant.size,
      selectedColor: variant.color,
      quantity: 1,
      price: product.price,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-gray-600 font-medium mb-4">Price: ₹{product.price}</p>

      <div className="space-y-2 mb-4">
        {product.variants.map((variant, index) => (
          <div key={index} className="border p-2 rounded text-sm text-gray-700">
            <p>
              <span className="font-semibold">Size:</span> {variant.size}
            </p>
            <p>
              <span className="font-semibold">Color:</span> {variant.color}
            </p>
            <p>
              <span className="font-semibold">In stock:</span> {variant.stock}
            </p>
            <button
              onClick={() => handleAddToCart(variant)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs"
            >
              Add this Variant
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/products/${product._id}`)}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
