
import { Product, Order, User } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

class MockSupabase {
  private getStorage<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private setStorage<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  async signIn(phone: string): Promise<{ user: User | null; error: string | null }> {
    await delay(800);
    if (!/^7[0-9]{8}$/.test(phone)) {
      return { user: null, error: 'Invalid Jordanian phone number (must be 7XXXXXXXX)' };
    }
    
    let users = this.getStorage<User>('users');
    let user = users.find(u => u.phone === phone);
    
    if (!user) {
      // First user ever is an admin for demo purposes
      const role = users.length === 0 ? 'admin' : 'customer';
      user = { id: Math.random().toString(36).substr(2, 9), phone, role };
      users.push(user);
      this.setStorage('users', users);
    }
    
    return { user, error: null };
  }

  async getProducts(): Promise<Product[]> {
    await delay(500);
    const products = this.getStorage<Product>('products');
    // If empty OR if the catalog was significantly updated (new constant list is larger), reset it
    if (products.length < INITIAL_PRODUCTS.length) {
      this.setStorage('products', INITIAL_PRODUCTS);
      return INITIAL_PRODUCTS;
    }
    return products;
  }

  async saveProduct(product: Product): Promise<void> {
    await delay(600);
    let products = this.getStorage<Product>('products');
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.push(product);
    }
    this.setStorage('products', products);
  }

  async deleteProduct(id: string): Promise<void> {
    await delay(400);
    let products = this.getStorage<Product>('products');
    products = products.filter(p => p.id !== id);
    this.setStorage('products', products);
  }

  async getOrders(phone?: string): Promise<Order[]> {
    await delay(700);
    const orders = this.getStorage<Order>('orders');
    return phone ? orders.filter(o => o.customerPhone === phone) : orders;
  }

  async createOrder(order: Order): Promise<void> {
    await delay(1200);
    const orders = this.getStorage<Order>('orders');
    orders.push(order);
    this.setStorage('orders', orders);
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
    await delay(500);
    const orders = this.getStorage<Order>('orders');
    const index = orders.findIndex(o => o.id === id);
    if (index >= 0) {
      orders[index].status = status;
      this.setStorage('orders', orders);
      return orders[index];
    }
    return null;
  }
}

export const db = new MockSupabase();
