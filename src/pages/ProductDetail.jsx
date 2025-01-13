import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../constants/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiStar, FiCheck } from 'react-icons/fi';
import styles from '../style';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const fetchedProduct = getProductById(id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setRelatedProducts(getRelatedProducts(fetchedProduct));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart({ ...product, quantity: selectedQuantity });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-white text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className={`${styles.paddingX} py-20`}>
        <div className="container mx-auto">
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full rounded-xl shadow-lg"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold text-white">{product.name}</h1>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl text-secondary font-bold">
                  ${product.price}
                </span>
                <div className="flex items-center text-yellow-500">
                  <FiStar className="fill-current" />
                  <span className="ml-1 text-white">{product.rating}</span>
                  <span className="ml-1 text-dimWhite">({product.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-dimWhite text-lg">{product.description}</p>

              {/* Features */}
              <div>
                <h3 className="text-white font-semibold text-xl mb-3">Features</h3>
                <ul className="list-disc list-inside space-y-2 text-dimWhite">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-white font-semibold text-xl mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-black-gradient rounded-lg p-3">
                      <span className="text-secondary capitalize">{key}:</span>
                      <span className="text-white ml-2">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="flex items-center gap-4 pt-6">
                <div className="flex items-center bg-black-gradient rounded-lg">
                  <button
                    className="px-4 py-2 text-white hover:text-secondary transition-colors"
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 text-white">{selectedQuantity}</span>
                  <button
                    className="px-4 py-2 text-white hover:text-secondary transition-colors"
                    onClick={() => setSelectedQuantity(Math.min(product.stock, selectedQuantity + 1))}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 ${
                    isInCart(product.id)
                      ? 'bg-secondary text-white'
                      : 'bg-green-gradient text-primary'
                  }`}
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

              {/* Stock Status */}
              <div className="text-dimWhite">
                {product.stock > 0 ? (
                  <span className="text-green-500">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-semibold text-white mb-8">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <div 
                    key={relatedProduct.id}
                    className="bg-black-gradient rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <img 
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-secondary font-bold">
                          ${relatedProduct.price}
                        </span>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-white">{relatedProduct.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;