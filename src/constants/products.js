import { banner } from '../assets';

export const products = [
  {
    id: 1,
    name: "Premium Dog Food",
    price: 49.99,
    image: banner, // We'll replace with actual product images later
    rating: 4.8,
    reviews: 128,
    tags: {
      pet: ['dogs'],
      category: ['food'],
      brand: ['royal-canin']
    },
    description: "High-quality premium dog food made with real meat and essential nutrients.",
    features: [
      "Made with real chicken as the first ingredient",
      "Contains omega-3 and omega-6 fatty acids",
      "No artificial preservatives or flavors",
      "Supports healthy digestion"
    ],
    specifications: {
      weight: "15 kg",
      ageRange: "Adult",
      flavor: "Chicken",
      type: "Dry Food"
    },
    stock: 50
  },
  {
    id: 2,
    name: "Interactive Cat Toy",
    price: 24.99,
    image: banner,
    rating: 4.5,
    reviews: 89,
    tags: {
      pet: ['cats'],
      category: ['toys'],
      brand: ['whiskas']
    },
    description: "Interactive toy that keeps your cat entertained and active.",
    features: [
      "Battery-operated moving toy",
      "Multiple play modes",
      "Durable construction",
      "Encourages exercise"
    ],
    specifications: {
      material: "Pet-safe plastic",
      batteryType: "2 x AA (included)",
      dimensions: "15cm x 15cm x 5cm",
      color: "Multi-colored"
    },
    stock: 30
  },
  {
    id: 3,
    name: "Bird Cage Deluxe",
    price: 89.99,
    image: banner,
    rating: 4.7,
    reviews: 45,
    tags: {
      pet: ['birds'],
      category: ['accessories'],
      brand: ['purina']
    },
    description: "Spacious and secure cage for your feathered friend.",
    features: [
      "Multiple perches and feeding stations",
      "Easy-clean removable bottom tray",
      "Secure lock mechanism",
      "Built-in toys and swings"
    ],
    specifications: {
      dimensions: "60cm x 40cm x 80cm",
      material: "Stainless steel",
      color: "Silver",
      includes: "Perches, feeders, and toys"
    },
    stock: 15
  },
  {
    id: 4,
    name: "Fish Tank Filter",
    price: 34.99,
    image: banner,
    rating: 4.6,
    reviews: 156,
    tags: {
      pet: ['fish'],
      category: ['accessories'],
      brand: ['purina']
    },
    description: "High-performance filter for crystal clear aquarium water.",
    features: [
      "3-stage filtration system",
      "Quiet operation",
      "Easy maintenance",
      "Adjustable flow rate"
    ],
    specifications: {
      tankSize: "Up to 100L",
      flowRate: "400L/hr",
      power: "12W",
      filterMedia: "Included"
    },
    stock: 25
  },
  {
    id: 5,
    name: "Hamster Habitat",
    price: 45.99,
    image: banner,
    rating: 4.9,
    reviews: 78,
    tags: {
      pet: ['small-pets'],
      category: ['accessories'],
      brand: ['hills']
    },
    description: "Complete habitat setup for small pets with multiple levels.",
    features: [
      "Multiple levels and tunnels",
      "Exercise wheel included",
      "Water bottle and food dish",
      "Easy to clean design"
    ],
    specifications: {
      dimensions: "45cm x 30cm x 30cm",
      material: "Pet-safe plastic and wire",
      color: "Multi-colored",
      includes: "Wheel, bottle, food dish"
    },
    stock: 20
  },
  {
    id: 6,
    name: "Professional Grooming Kit",
    price: 79.99,
    image: banner,
    rating: 4.7,
    reviews: 203,
    tags: {
      pet: ['dogs', 'cats'],
      category: ['grooming'],
      brand: ['pedigree']
    },
    description: "Complete professional grooming kit for pets.",
    features: [
      "Professional-grade clippers",
      "Multiple guard combs",
      "Grooming scissors",
      "Storage case included"
    ],
    specifications: {
      clipperType: "Cordless",
      runtime: "4 hours",
      includes: "8 guard combs, scissors, brush",
      warranty: "2 years"
    },
    stock: 35
  }
];

export const filterProducts = (filters) => {
  return products.filter(product => {
    if (filters.pet && !product.tags.pet.includes(filters.pet)) return false;
    if (filters.category && !product.tags.category.includes(filters.category)) return false;
    if (filters.brand && !product.tags.brand.includes(filters.brand)) return false;
    return true;
  });
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return products.slice(0, 4); // Returns first 4 products as featured
};

export const getRelatedProducts = (currentProduct, limit = 4) => {
  return products
    .filter(product => 
      product.id !== currentProduct.id && 
      (
        product.tags.pet.some(pet => currentProduct.tags.pet.includes(pet)) ||
        product.tags.category.some(cat => currentProduct.tags.category.includes(cat))
      )
    )
    .slice(0, limit);
}; 