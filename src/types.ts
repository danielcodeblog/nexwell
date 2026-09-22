export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  rating: number;
  reviewCount: number;
  capsuleCount: number;
  supplyDays: number;
  description: string;
  badge?: string;
  image: string;
}

export interface Ingredient {
  id: string;
  number: string;
  name: string;
  benefit: string;
  description: string;
  source: string;
}

export interface Principle {
  id: string;
  title: string;
  description: string;
  dotCount: number;
  gridCols: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title?: string;
  avatar: string;
  rotation: string;
  zIndex: number;
}

export interface Pillar {
  number: string;
  title: string;
  description: string;
}

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
  isSubscription: boolean;
  frequency?: string;
  specs?: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  badge?: string;
  description: string;
}

export interface CheckoutFormData {
  email: string;
  phone: string;
  subscribeNewsletter: boolean;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'apple-pay' | 'google-pay' | 'paypal' | 'klarna';
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
}

export interface OrderConfirmationData {
  orderNumber: string;
  date: string;
  items: { name: string; quantity: number; price: number; isSubscription: boolean }[];
  shippingAddress: string;
  customerEmail: string;
  shippingMethod: string;
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  estimatedDelivery: string;
}

export type NavPage = 'home' | 'about' | 'blog' | 'contact';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  content: string[];
  takeaways: string[];
  citations?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
}
