import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/main";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]); // select default variant
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.stock === 0) {
      alert("Please select a variant that is in stock.");
      return;
    }

    const cartItem = {
      ...product,
      selectedVariant,
    };

    addToCart(cartItem);
    alert("Added to cart!");
  };

  if (loading) return <div className="text-center py-10">Loading product...</div>;
  if (!product) return <div className="text-center py-10 text-red-600">Product not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">{product.name}</h1>
      <p className="text-gray-700 text-lg mb-2">Price: ₹{product.price}</p>
      <p className="text-sm text-gray-500 mb-4 capitalize">Category: {product.category}</p>

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Variant:</label>
        <select
          className="w-full p-2 border rounded"
          value={JSON.stringify(selectedVariant)}
          onChange={(e) => setSelectedVariant(JSON.parse(e.target.value))}
        >
          {product.variants.map((variant, index) => (
            <option key={index} value={JSON.stringify(variant)}>
              {variant.size} / {variant.color} — {variant.stock} in stock
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
