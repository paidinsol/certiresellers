export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Air Jordan 4 Retro 'Bred'",
    price: 210.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    category: "Sneakers",
    description: "The iconic Air Jordan 4 in the classic Black/Cement Grey-Summit White-Fire Red colorway. A timeless basketball legend.",
    inStock: true
  },
  {
    id: 2,
    name: "Air Jordan 4 Retro 'White Cement'",
    price: 200.00,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    category: "Sneakers",
    description: "Clean and classic Air Jordan 4 in White/Fire Red-Black-Tech Grey. The OG colorway that started it all.",
    inStock: true
  },
  {
    id: 3,
    name: "Air Jordan 4 Retro 'Black Cat'",
    price: 190.00,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop&crop=center",
    category: "Sneakers",
    description: "Sleek all-black Air Jordan 4 inspired by Michael Jordan's 'Black Cat' nickname. Stealth and style combined.",
    inStock: true
  },
  {
    id: 4,
    name: "Air Jordan 4 Retro 'University Blue'",
    price: 200.00,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop&crop=center",
    category: "Sneakers",
    description: "Fresh Air Jordan 4 in University Blue/Tech Grey-White-Black. A modern take on the classic silhouette.",
    inStock: true
  },
  {
    id: 5,
    name: "Air Jordan 4 Retro 'Lightning'",
    price: 190.00,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center",
    category: "Sneakers",
    description: "Bold Air Jordan 4 in Tour Yellow/Dark Blue Grey-White. Electric colorway that demands attention.",
    inStock: true
  },
  {
    id: 6,
    name: "Air Jordan 4 Retro 'Military Blue'",
    price: 190.00,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop&crop=center",
    category: "Sneakers",
    description: "Classic Air Jordan 4 in White/Neutral Grey-Military Blue. A fan favorite with timeless appeal.",
    inStock: true
  },
  {
    id: 7,
    name: "Air Jordan 4 Retro 'Red Thunder'",
    price: 200.00,
    image: "https://images.laced.com/products/66dec5c7-75b4-448d-b368-54938d8f18ae.jpg",
    category: "Sneakers",
    description: "Striking Air Jordan 4 in Black/Fire Red-Cement Grey-Summit White. Bold red accents on premium black leather.",
    inStock: false
  },
  {
    id: 8,
    name: "Air Jordan 4 Retro 'Cool Grey'",
    price: 0.50,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
    category: "Sneakers",
    description: "Sophisticated Air Jordan 4 in Cool Grey/Chrome-Dark Charcoal. Perfect balance of style and versatility.",
    inStock: true
  },
  {
    id: 9,
    name: "Air Jordan 4 Retro 'Oreo'",
    price: 190.00,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center",
    category: "Sneakers",
    description: "Clean Air Jordan 4 in White/Tech Grey-Black-Fire Red. The perfect blend of classic and contemporary.",
    inStock: true
  }
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
}
