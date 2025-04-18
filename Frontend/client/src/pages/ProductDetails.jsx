import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/product.service';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1,
    };

    addToCart(cartItem);
    alert('Product added to cart!');
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-8">
      <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg object-cover" />

      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-blue-600 mb-4">₹{product.price}</p>

        <div className="mb-4">
          <label className="block mb-1">Select Size</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select --</option>
            {product.variants.size.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Select Color</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select --</option>
            {product.variants.color.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
