import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productApi } from '../../services/api'
import ProductCard from '../../components/common/ProductCard'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    minPrice: '',
    maxPrice: '',
    sortBy: 'popularity'
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productApi.getAll()
        setProducts(data)
      } catch (err) {
        console.error('Failed to fetch products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter and sort
  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) return false
    if (filters.minPrice && product.price < parseFloat(filters.minPrice)) return false
    if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) return false
    return true
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low-high': return a.price - b.price
      case 'price-high-low': return b.price - a.price
      case 'name-a-z': return a.name.localeCompare(b.name)
      case 'name-z-a': return b.name.localeCompare(a.name)
      default: return 0
    }
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        {filters.category === 'all'
          ? 'All Products'
          : filters.category === 'fans'
            ? 'Fans'
            : 'Air Conditioners'}
      </h1>

      {/* Filters */}
      <div className="mb-8 rounded-lg bg-white p-4 shadow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label htmlFor="category" className="label">Category</label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="input w-full"
            >
              <option value="all">All Products</option>
              <option value="fans">Fans</option>
              <option value="ac">Air Conditioners</option>
            </select>
          </div>
          <div>
            <label htmlFor="minPrice" className="label">Min Price</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min Price"
              className="input w-full"
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className="label">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max Price"
              className="input w-full"
            />
          </div>
          <div>
            <label htmlFor="sortBy" className="label">Sort By</label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="input w-full"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse rounded-lg bg-gray-200 p-4">
              <div className="mb-4 h-40 w-full rounded bg-gray-300"></div>
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
              <div className="mb-4 h-4 w-1/2 rounded bg-gray-300"></div>
              <div className="flex items-center justify-between">
                <div className="h-6 w-1/4 rounded bg-gray-300"></div>
                <div className="h-8 w-1/3 rounded bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="mt-16 text-center">
          <h3 className="text-xl font-medium text-gray-700">No products found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsPage
