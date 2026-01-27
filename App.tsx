
import React, { useState, useEffect, useCallback } from 'react';
import { db } from './services/supabaseClient';
import { Product, CartItem, Order, User, Language } from './types';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import AdminDashboard from './components/AdminDashboard';
import OrderHistory from './components/OrderHistory';
import GeminiAssistant from './components/GeminiAssistant';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeSection, setActiveSection] = useState<'home' | 'admin' | 'orders'>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [isInitializing, setIsInitializing] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);

  // Safely initialize application data
  useEffect(() => {
    const init = async () => {
      try {
        const savedUserStr = localStorage.getItem('khodarji_user');
        const savedCartStr = localStorage.getItem('khodarji_cart');
        
        if (savedCartStr) {
          try {
            setCart(JSON.parse(savedCartStr));
          } catch (e) {
            console.error("Cart parse error", e);
            localStorage.removeItem('khodarji_cart');
          }
        }

        if (savedUserStr) {
          try {
            const parsedUser = JSON.parse(savedUserStr);
            if (parsedUser && parsedUser.phone) {
              setUser(parsedUser);
              const fetchedOrders = await db.getOrders(parsedUser.role === 'admin' ? undefined : parsedUser.phone);
              setOrders(fetchedOrders || []);
            }
          } catch (e) {
            console.error("User parse error", e);
            localStorage.removeItem('khodarji_user');
          }
        }
      } catch (e) {
        console.error("Initialization global error", e);
      } finally {
        // Minimum delay for branding experience
        setTimeout(() => setIsInitializing(false), 800);
      }

      try {
        setIsProductsLoading(true);
        const fetchedProducts = await db.getProducts();
        setProducts(fetchedProducts || []);
      } catch (e) {
        console.error("Products fetch error", e);
      } finally {
        setIsProductsLoading(false);
      }
    };
    init();
  }, []);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('khodarji_cart', JSON.stringify(cart));
  }, [cart]);

  const handlePhoneIdentification = async (phone: string) => {
    try {
      const { user: newUser } = await db.signIn(phone);
      if (newUser) {
        setUser(newUser);
        localStorage.setItem('khodarji_user', JSON.stringify(newUser));
        const fetchedOrders = await db.getOrders(newUser.role === 'admin' ? undefined : newUser.phone);
        setOrders(fetchedOrders || []);
        return newUser;
      }
    } catch (e) {
      console.error("Login error", e);
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('khodarji_user');
    setActiveSection('home');
    setOrders([]);
  };

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateCartQuantity = useCallback((id: string, quantity: number) => {
    setCart(prev => prev.map(item => id === item.id ? { ...item, quantity: Math.max(0.5, quantity) } : item));
  }, []);

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    const updatedOrder = await db.updateOrderStatus(id, status);
    if (updatedOrder) {
      setOrders(prev => prev.map(o => o.id === id ? updatedOrder : o));
    }
  };

  const createOrder = async (phone: string) => {
    if (cart.length === 0) return;
    
    setIsOrdering(true);
    let currentUser = user;
    
    // Auto-identify if phone changed or user not logged in
    if (!currentUser || currentUser.phone !== phone) {
      currentUser = await handlePhoneIdentification(phone);
    }
    
    if (!currentUser) {
      setIsOrdering(false);
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal >= 20 ? 0 : 2;
    const order: Order = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      customerPhone: phone,
      items: [...cart],
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    try {
      await db.createOrder(order);
      setOrders(prev => [order, ...prev]);
      setCart([]);
      setIsCartOpen(false);
      // Wait for state propagation before switching view
      setTimeout(() => setActiveSection('orders'), 100);
    } catch (e) {
      console.error("Order creation failed", e);
    } finally {
      setIsOrdering(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc] w-full">
        <div className="animate-float mb-6 text-6xl">🥬</div>
        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-[#266041] animate-[loading_1.5s_infinite_ease-in-out]"></div>
        </div>
        <p className="mt-6 text-[#266041] font-black tracking-tight text-xl">
          {lang === 'ar' ? 'خضرجي في خدمتك...' : 'Khodarji is preparing...'}
        </p>
        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  // Determine what to show in main content area
  const renderContent = () => {
    if (activeSection === 'admin' && user?.role === 'admin') {
      return (
        <div className="w-full px-4 md:px-12 mt-8 animate-in slide-in-from-bottom-4">
          <AdminDashboard 
            lang={lang} 
            products={products} 
            setProducts={setProducts} 
            orders={orders}
            onUpdateOrderStatus={updateOrderStatus}
          />
        </div>
      );
    }

    if (activeSection === 'orders' && user) {
      return (
        <div className="w-full px-4 md:px-12 mt-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-4">
          <OrderHistory lang={lang} orders={orders} />
        </div>
      );
    }

    // Default: Home Section
    return (
      <div className="animate-in fade-in duration-700 w-full">
        <section className="relative h-[45vh] md:h-[60vh] flex items-center justify-center w-full">
          <div className="absolute inset-0 bg-cover bg-center w-full h-full" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600')` }}>
            <div className="absolute inset-0 bg-black/45 backdrop-grayscale-[0.1]" />
          </div>
          
          <div className="relative text-center px-6 z-10 w-full max-w-6xl">
            <h1 className="text-4xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl">
              {lang === 'ar' ? 'خضرتك بلدية وطازجة' : 'Jordan\'s Finest Produce'}
            </h1>
            <p className="text-lg md:text-3xl text-white/95 mb-10 font-bold">
              {lang === 'ar' ? 'توصيل لباب بيتك بلمح البصر' : 'Delivered to your door instantly'}
            </p>
            <button 
              onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#ff5722] hover:bg-[#e64a19] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all transform hover:scale-105 active:scale-95"
            >
              {lang === 'ar' ? 'تسوق الآن' : 'Shop Now'}
            </button>
          </div>
        </section>

        <div id="shop" className="w-full px-4 md:px-8 lg:px-12 mt-8 md:mt-16">
          <ProductGrid 
            products={products} 
            lang={lang} 
            onAddToCart={addToCart} 
            searchTerm={searchTerm}
            isLoading={isProductsLoading}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col w-full overflow-x-hidden ${lang === 'ar' ? 'font-tajawal' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        user={user} 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)}
        onLogout={logout}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onSearch={setSearchTerm}
      />

      <main className="flex-grow pt-16 w-full">
        {renderContent()}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        lang={lang}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={createOrder}
        phone={user?.phone || ""}
        isOrdering={isOrdering}
      />

      <GeminiAssistant cartItems={cart} lang={lang} />

      <footer className="bg-[#1a202c] text-white py-16 mt-20 w-full">
        <div className="w-full px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
            <div>
              <h3 className="text-3xl font-black mb-6 flex items-center justify-center md:justify-start gap-3">
                <span className="bg-[#266041] p-1.5 rounded-lg">🥕</span>
                {lang === 'ar' ? 'خضرجي - عمان' : 'Khodarji - Amman'}
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {lang === 'ar' 
                  ? 'نوفر لك أفضل المحاصيل الزراعية من مزارعنا في الأردن مباشرة إلى مائدتك مع ضمان الجودة العالية.' 
                  : 'We bring the best agricultural produce from our farms in Jordan straight to your table with quality guaranteed.'}
              </p>
            </div>
            <div>
              <h4 className="font-black text-2xl mb-6">{lang === 'ar' ? 'تواصل معنا' : 'Get in Touch'}</h4>
              <p className="text-gray-400 mb-2 text-lg">WhatsApp: +962 790 801 695</p>
              <p className="text-gray-400 text-lg">Email: support@khodarji.jo</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
               <h4 className="font-black text-2xl mb-6">{lang === 'ar' ? 'تابعنا' : 'Follow Us'}</h4>
               <div className="flex gap-8 text-3xl">
                 <i className="bi bi-facebook hover:text-[#ff5722] cursor-pointer transition-colors"></i>
                 <i className="bi bi-instagram hover:text-[#ff5722] cursor-pointer transition-colors"></i>
                 <i className="bi bi-twitter-x hover:text-[#ff5722] cursor-pointer transition-colors"></i>
               </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Khodarji. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
