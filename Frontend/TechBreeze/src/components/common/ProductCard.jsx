import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { id, name, price, image, colors = [], sizes = [] } = product

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // If product has variants, navigate to product page
    if (colors.length > 0 || sizes.length > 0) {
      window.location.href = `/products/${id}`
      return
    }
    
    // Otherwise add default product to cart
    addToCart(product, 1)
    
    // Show brief animation or notification
    const button = e.currentTarget
    button.classList.add('bg-success-500')
    button.innerText = 'Added!'
    
    setTimeout(() => {
      button.classList.remove('bg-success-500')
      button.innerText = 'Add to Cart'
    }, 1500)
  }

  return (
    <div className="card group overflow-hidden">
      <Link to={`/products/${id}`} className="block">
        <div className="relative mb-3 overflow-hidden pt-[100%]">
          <img
            src={image}
            alt={name}
            className="absolute left-0 top-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          {colors.length > 0 && (
            <div className="absolute bottom-2 left-2 flex space-x-1">
              {colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="h-4 w-4 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
              {colors.length > 3 && (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-medium shadow-sm">
                  +{colors.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
        <h3 className="mb-1 text-base font-medium">{name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">${price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="btn-primary rounded-full px-3 py-1 text-xs transition-colors"
          >
            Add to Cart
          </button>
        </div>
        {sizes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {sizes.slice(0, 4).map((size, index) => (
              <span key={index} className="rounded-md bg-gray-100 px-2 py-1 text-xs">
                {size}
              </span>
            ))}
            {sizes.length > 4 && (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                +{sizes.length - 4}
              </span>
            )}
          </div>
        )}
      </Link>
    </div>
  )
}

export default ProductCard