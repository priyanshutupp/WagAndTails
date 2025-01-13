import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { filterProducts, products as allProducts } from '../constants/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiSearch, FiCheck } from 'react-icons/fi';
import styles from '../style';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Initial load of products
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filters = {
      pet: searchParams.get('shop-by-pet'),
      category: searchParams.get('shop-by-category'),
      brand: searchParams.get('brands')
    };

    // Get search term from URL if it exists
    const urlSearchTerm = searchParams.get('search');
    if (urlSearchTerm) {
      setSearchTerm(decodeURIComponent(urlSearchTerm));
    }

    // Filter out null values
    Object.keys(filters).forEach(key => 
      filters[key] === null && delete filters[key]
    );

    // If no filters, show all products
    const initialProducts = Object.keys(filters).length === 0 ? allProducts : filterProducts(filters);
    console.log('Initial Products:', initialProducts); // Debug log
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
    setLoading(false);
  }, [location.search]);

  // Search functionality
  useEffect(() => {
    console.log('Search Term:', searchTerm); // Debug log
    console.log('Current Products:', products); // Debug log

    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
      return;
    }

    const searchResults = products.filter(product => {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const descMatch = product.description.toLowerCase().includes(searchLower);
      const petMatch = product.tags.pet.some(pet => pet.toLowerCase().includes(searchLower));
      const categoryMatch = product.tags.category.some(cat => cat.toLowerCase().includes(searchLower));
      const brandMatch = product.tags.brand.some(brand => brand.toLowerCase().includes(searchLower));

      return nameMatch || descMatch || petMatch || categoryMatch || brandMatch;
    });

    console.log('Search Results:', searchResults); // Debug log
    setFilteredProducts(searchResults);
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    const value = e.target.value;
    console.log('Search Input:', value); // Debug log
    setSearchTerm(value);
  };

  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-white text-xl">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className={`${styles.paddingX} py-20`}>
        <div className="container mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-3 pl-12 bg-black-gradient text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dimWhite" size={20} />
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-white mb-4">No Products Found</h2>
              <p className="text-dimWhite">Try adjusting your search or browse our other categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-black-gradient rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div 
                    className="cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-secondary font-bold">
                          ${product.price}
                        </span>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-white">{product.rating}</span>
                          <span className="text-dimWhite text-sm ml-1">
                            ({product.reviews})
                          </span>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Products; 