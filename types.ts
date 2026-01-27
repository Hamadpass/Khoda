
export type Language = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface Product {
  id: string;
  name: LocalizedString;
  category: 'fruits' | 'vegetables' | 'organic';
  price: number;
  image: string;
  unit: string;
  organic: boolean;
  description?: LocalizedString;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  phone: string;
  role: 'customer' | 'admin';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
