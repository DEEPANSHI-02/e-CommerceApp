import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/product.service";
import ProductCard from "../components/products/ProductCard";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      category === "all" || product.category?.toLowerCase() === category;
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO BAR */}
      <div className="bg-white shadow-md px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Text */}
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-4xl font-bold text-blue-800 mb-2">Welcome to BreezeCool</h1>
            <p className="text-gray-600 text-lg">
              Your destination for premium Fans and Air Conditioners.
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center">
          <img
  src="https://via.placeholder.com/400x300.png?text=Fan+or+AC"
  alt="Product"
  className="rounded-xl shadow-lg w-full max-w-md object-cover"
/>



          </div>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 rounded-lg border w-full md:w-1/2 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded-lg ${
              category === "all"
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCategory("fan")}
            className={`px-4 py-2 rounded-lg ${
              category === "fan"
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Fans
          </button>
          <button
            onClick={() => setCategory("ac")}
            className={`px-4 py-2 rounded-lg ${
              category === "ac"
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            ACs
          </button>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-full text-gray-500">
            Loading products...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
