import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../style";
import { useAuth } from '../context/AuthContext';
import { banner } from "../assets";
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample featured products (we'll replace this with real data later)
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Dog Food",
      price: 49.99,
      image: banner, // Using banner as placeholder, replace with actual product image
      rating: 4.8,
      reviews: 128,
      category: "food"
    },
    {
      id: 2,
      name: "Interactive Cat Toy",
      price: 24.99,
      image: banner,
      rating: 4.5,
      reviews: 89,
      category: "toys"
    },
    {
      id: 3,
      name: "Pet Grooming Kit",
      price: 34.99,
      image: banner,
      rating: 4.7,
      reviews: 156,
      category: "grooming"
    },
    {
      id: 4,
      name: "Cozy Pet Bed",
      price: 59.99,
      image: banner,
      rating: 4.9,
      reviews: 203,
      category: "accessories"
    }
  ];

  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      {/* Hero Section with Search */}
      <section className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={banner} 
            alt="banner" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        </div>

        <div className={`${styles.paddingX} container mx-auto relative z-10`}>
          <div className="max-w-2xl">
            <h1 className="font-poppins font-semibold text-[52px] sm:text-[72px] text-white leading-[1.2] mb-6">
              Find Everything
              <br />
              <span className="text-gradient">For Your Pet</span>
            </h1>
            <p className="text-dimWhite text-[18px] sm:text-[20px] mb-8 max-w-lg">
              Discover premium pet supplies, food, toys, and accessories for all your furry friends.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative max-w-xl mb-8">
              <input
                type="text"
                placeholder="Search for products, brands, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-black-gradient text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-gradient text-primary px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-4">
              {!user && (
                <button
                  onClick={() => navigate('/signup')}
                  className="py-4 px-6 bg-green-gradient font-poppins font-medium text-[18px] text-primary rounded-[10px] outline-none"
                >
                  Get Started
                </button>
              )}
              <button
                onClick={() => navigate('/about')}
                className="py-4 px-6 font-poppins font-medium text-[18px] text-white border-2 border-white hover:bg-dimWhite hover:text-primary rounded-[10px] outline-none transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`${styles.paddingX} py-20`}>
        <div className="container mx-auto">
          <h2 className="font-poppins font-semibold text-[40px] text-white text-center mb-16">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-black-gradient rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-secondary font-bold">${product.price}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-white">{product.rating}</span>
                        <span className="text-dimWhite text-sm ml-1">({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <button 
                    className={`w-full py-2 px-4 font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 ${
                      isInCart(product.id)
                        ? 'bg-secondary text-white'
                        : 'bg-green-gradient text-primary'
                    }`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {isInCart(product.id) ? (
                      <>
                        <FiCheck />
                        Item Added
                      </>
                    ) : (
                      <>
                        <FiShoppingCart />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`${styles.paddingX} py-20 bg-black-gradient-2`}>
        <div className="container mx-auto text-center">
          <h2 className="font-poppins font-semibold text-[40px] text-white mb-6">
            Ready to Give Your Pet the Best Care?
          </h2>
          <p className="text-dimWhite text-[18px] mb-8 max-w-2xl mx-auto">
            Join our community of happy pet owners and give your furry friend the care they deserve.
          </p>
          {!user && (
            <button
              onClick={() => navigate('/signup')}
              className="py-4 px-8 bg-green-gradient font-poppins font-medium text-[18px] text-primary rounded-[10px] outline-none hover:opacity-90 transition-opacity"
            >
              Start Your Journey
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 