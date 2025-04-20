import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productApi } from '../../services/api'
import ProductCard from '../../components/common/ProductCard'

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Normally, we'd call an API like this:
        // const { data } = await productApi.getFeatured()
        
        // For demo purposes, using mock data
        const mockData = [
          {
            id: 1,
            name: 'Premium Ceiling Fan',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1565374392886-8ce933b2cc9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            colors: ['#000000', '#FFFFFF', '#A0AEC0'],
            sizes: ['Small', 'Medium', 'Large'],
          },
          {
            id: 2,
            name: 'Smart AC Unit',
            price: 499.99,
            image: 'https://images.unsplash.com/photo-1615164769329-202683bb2526?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            colors: ['#FFFFFF', '#A0AEC0'],
            sizes: ['1 Ton', '1.5 Ton', '2 Ton'],
          },
          {
            id: 3,
            name: 'Portable Air Cooler',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1573770012830-0ca8e9a7e29a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            colors: ['#000000', '#FFFFFF', '#3182CE'],
            sizes: [],
          },
          {
            id: 4,
            name: 'Tower Fan',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            colors: ['#000000', '#FFFFFF'],
            sizes: [],
          },
          {
            id: 5,
            name: 'Energy Efficient AC',
            price: 349.99,
            image: 'https://images.unsplash.com/photo-1501183238709-6e5d33a8909e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            colors: ['#FFFFFF'],
            sizes: ['0.75 Ton', '1 Ton', '1.5 Ton'],
          },
        ]
        
        setFeaturedProducts(mockData)
      } catch (err) {
        console.error('Failed to fetch featured products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-20 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Air conditioning units" 
            className="h-full w-full object-cover opacity-30"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Stay Cool, Stay Comfortable
            </h1>
            <p className="mt-4 text-xl">
              Premium cooling solutions for every space. From energy-efficient ACs to whisper-quiet fans.
            </p>
            <div className="mt-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link to="/products" className="btn-primary px-8 py-3 text-base font-medium">
                Shop Now
              </Link>
              <Link to="/products?category=featured" className="btn-outline bg-transparent px-8 py-3 text-base font-medium text-white hover:bg-white/10">
                View Bestsellers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {[...Array(5)].map((_, index) => (
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
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose CoolBreeze?</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="card flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary-100 p-3">
                <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Energy Efficient</h3>
              <p className="text-gray-600">
                Our products are designed to save energy while providing optimal cooling performance.
              </p>
            </div>
            <div className="card flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary-100 p-3">
                <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Long Warranty</h3>
              <p className="text-gray-600">
                All products come with an extended warranty and reliable customer support.
              </p>
            </div>
            <div className="card flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary-100 p-3">
                <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the highest quality materials and components in all our products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">What Our Customers Say</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="card">
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-700">
                "The Smart AC I bought from CoolBreeze has been a game-changer. It's quiet, efficient, and the app control is seamless."
              </p>
              <div className="flex items-center">
                <div className="mr-4 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                  <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Customer" />
                </div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">New York, NY</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-700">
                "I've purchased three tower fans for different rooms in my house. They're stylish, powerful, and very affordable."
              </p>
              <div className="flex items-center">
                <div className="mr-4 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" />
                </div>
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-gray-500">Los Angeles, CA</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-700">
                "The delivery was super fast, and the installation team was professional. My new AC works perfectly for my apartment."
              </p>
              <div className="flex items-center">
                <div className="mr-4 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Customer" />
                </div>
                <div>
                  <p className="font-medium">Emily Rodriguez</p>
                  <p className="text-sm text-gray-500">Chicago, IL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to upgrade your cooling system?</h2>
          <p className="mb-8 text-xl">
            Browse our wide selection of premium fans and air conditioners today.
          </p>
          <Link to="/products" className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-medium text-primary-600 shadow-md transition-colors hover:bg-gray-100">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage