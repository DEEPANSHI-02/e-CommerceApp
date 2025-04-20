import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { productApi } from '../../services/api'
import { useCart } from '../../hooks/useCart'

const ProductDetailPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await productApi.getById(id)
        setProduct(data)
        if (data.colors?.length > 0) setSelectedColor(data.colors[0])
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0])
      } catch (err) {
        console.error('Failed to fetch product details:', err)
        setError('Failed to load product details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedColor, selectedSize)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 3000)
    }
  }

  const getColorName = (colorHex) => {
    if (!product || !product.colorNames) return 'Color'
    const index = product.colors.indexOf(colorHex)
    return index >= 0 ? product.colorNames[index] : 'Color'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex animate-pulse flex-col md:flex-row md:space-x-8">
          <div className="mb-8 h-96 w-full rounded-lg bg-gray-300 md:mb-0 md:w-1/2"></div>
          <div className="w-full md:w-1/2">
            <div className="mb-4 h-8 w-3/4 rounded bg-gray-300"></div>
            <div className="mb-4 h-4 w-1/4 rounded bg-gray-300"></div>
            <div className="mb-6 h-4 w-full rounded bg-gray-300"></div>
            <div className="mb-8 space-y-2">
              <div className="h-4 w-full rounded bg-gray-300"></div>
              <div className="h-4 w-full rounded bg-gray-300"></div>
              <div className="h-4 w-2/3 rounded bg-gray-300"></div>
            </div>
            <div className="mb-4 h-10 w-1/3 rounded bg-gray-300"></div>
            <div className="h-12 w-full rounded bg-gray-300"></div>
          </div>
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
              <div className="mt-4">
                <Link to="/products" className="text-red-800 underline hover:text-red-900">
                  Return to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : product && (
        <>
          <div className="mb-8">
            <Link to="/products" className="text-primary-600 hover:text-primary-800">
              &larr; Back to Products
            </Link>
          </div>
          <div className="flex flex-col rounded-lg bg-white p-4 shadow-lg md:flex-row md:space-x-8 md:p-6">
            <div className="mb-8 w-full md:mb-0 md:w-1/2">
              <img src={product.image} alt={product.name} className="h-full w-full rounded-lg object-cover" />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
              <p className="mb-4 text-2xl font-bold text-primary-600">${product.price.toFixed(2)}</p>
              <p className="mb-6 text-gray-700">{product.description}</p>

              {product.colors?.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-medium">Color: {getColorName(selectedColor)}</h3>
                  <div className="flex flex-wrap space-x-2">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`h-8 w-8 rounded-full border-2 ${
                          selectedColor === color ? 'border-primary-500' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes?.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-medium">Size: {selectedSize}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-md border px-4 py-2 ${
                          selectedSize === size
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-lg font-medium">Quantity</h3>
                <div className="flex w-32 items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="h-10 w-12 border-y border-gray-300 bg-white text-center text-gray-900"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`mb-4 w-full rounded-lg px-6 py-3 text-center text-base font-medium text-white transition-colors ${
                  addedToCart ? 'bg-success-500' : 'bg-primary-600 hover:bg-primary-700'
                }`}
              >
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>

              {addedToCart && (
                <div className="mb-4 rounded-lg bg-success-50 p-3 text-center text-success-800">
                  Item added to your cart!
                  <Link to="/cart" className="ml-2 font-medium underline">
                    View Cart
                  </Link>
                </div>
              )}

              {product.features?.length > 0 && (
                <div className="mt-8">
                  <h3 className="mb-2 text-lg font-medium">Features</h3>
                  <ul className="list-inside list-disc space-y-1 text-gray-700">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {product.specs && (
            <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold">Specifications</h2>
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="border-b border-gray-200 py-2 pl-4 pr-3 font-medium text-gray-900">
                          {key}
                        </td>
                        <td className="border-b border-gray-200 py-2 px-3 text-gray-700">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ProductDetailPage
