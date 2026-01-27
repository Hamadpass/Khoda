
import React, { useState, useEffect } from 'react';
import { CartItem, Language } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  lang: Language;
  onUpdateQuantity: (id: string, q: number) => void;
  onRemove: (id: string) => void;
  onCheckout: (phone: string) => void;
  phone: string;
  isOrdering?: boolean;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, onClose, cart, lang, onUpdateQuantity, onRemove, onCheckout, phone, isOrdering 
}) => {
  const [inputPhone, setInputPhone] = useState(phone);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 20 ? 0 : 2;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (phone) setInputPhone(phone);
  }, [phone]);

  const handleWhatsApp = () => {
    if (!inputPhone || !/^7[0-9]{8}$/.test(inputPhone)) {
      alert(lang === 'ar' ? 'الرجاء إدخال رقم هاتف أردني صحيح أولاً' : 'Please enter a valid Jordanian phone number first');
      return;
    }

    let msg = lang === 'ar' 
      ? `🛍️ *طلب جديد من خضرجي*\n--------------------------\n📞 رقم الهاتف: ${inputPhone}\n\n*المنتجات:*\n` 
      : `🛍️ *New Order from Khodarji*\n--------------------------\n📞 Phone: ${inputPhone}\n\n*Items:*\n`;
    
    cart.forEach(item => {
      msg += `• ${item.name[lang]}: ${item.quantity} ${item.unit} (${(item.price * item.quantity).toFixed(2)} JD)\n`;
    });
    
    msg += lang === 'ar'
      ? `\n--------------------------\n💰 *المجموع:* ${total.toFixed(2)} JD`
      : `\n--------------------------\n💰 *Total:* ${total.toFixed(2)} JD`;

    window.open(`https://wa.me/962790801695?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleCheckoutClick = () => {
    if (!/^7[0-9]{8}$/.test(inputPhone)) {
      alert(lang === 'ar' ? 'الرجاء إدخال رقم هاتف أردني صحيح (7XXXXXXXX)' : 'Please enter a valid Jordanian phone number (7XXXXXXXX)');
      return;
    }
    onCheckout(inputPhone);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} w-full max-w-md h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-500`}>
        <div className="p-6 bg-[#266041] text-white flex items-center justify-between shadow-lg">
          <h2 className="text-2xl font-black flex items-center gap-3">
             <span className="bg-white/20 p-2 rounded-xl">🛍️</span>
             {lang === 'ar' ? 'سلة التسوق' : 'Your Basket'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-32 opacity-30">
              <div className="text-8xl mb-6">🥬</div>
              <p className="text-lg font-bold">{lang === 'ar' ? 'سلة التسوق فارغة' : 'Empty basket sounds sad'}</p>
              <button onClick={onClose} className="mt-4 text-green-700 font-black hover:underline">
                {lang === 'ar' ? 'اذهب للتسوق' : 'Go Shop Now'}
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-3xl border border-gray-100 group hover:shadow-md transition-all">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-2xl shadow-sm" alt="" />
                    <div className="flex-grow">
                      <h4 className="font-black text-gray-800 text-sm line-clamp-1 mb-1">{item.name[lang]}</h4>
                      <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-wider">{item.price.toFixed(2)} JD / {item.unit}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-white border border-gray-100 p-1 rounded-xl shadow-sm">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 0.5)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-50 text-green-700 font-bold">-</button>
                          <span className="w-12 text-center text-xs font-black">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 0.5)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-50 text-green-700 font-bold">+</button>
                        </div>
                        <span className="font-black text-green-800 text-sm">{(item.price * item.quantity).toFixed(2)} JD</span>
                      </div>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-red-300 hover:text-red-500 self-start">
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-orange-50 rounded-[2.5rem] border border-orange-100 space-y-4">
                <div className="flex items-center gap-2">
                   <span className="text-xl">📞</span>
                   <label className="text-xs font-black text-orange-800 uppercase tracking-widest block">
                    {lang === 'ar' ? 'رقم الواتساب للتواصل' : 'WhatsApp Contact'}
                  </label>
                </div>
                <div className="flex" dir="ltr">
                  <span className="inline-flex items-center px-4 rounded-l-3xl border border-r-0 border-orange-200 bg-white text-orange-800 text-sm font-bold">+962</span>
                  <input
                    type="tel"
                    placeholder="7XXXXXXXX"
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                    className="flex-1 block w-full rounded-none rounded-r-3xl border border-orange-200 p-3.5 text-lg font-black tracking-widest focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-t-[40px] shadow-2xl space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>{lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
              <span>{subtotal.toFixed(2)} JD</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>{lang === 'ar' ? 'توصيل' : 'Delivery'}</span>
              <span className={deliveryFee === 0 ? 'text-green-600 font-black' : ''}>
                {deliveryFee === 0 ? (lang === 'ar' ? 'مجاني' : 'FREE') : `${deliveryFee.toFixed(2)} JD`}
              </span>
            </div>
            <div className="flex justify-between text-2xl font-black text-gray-900 pt-4 border-t border-gray-200">
              <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
              <span className="text-orange-600">{total.toFixed(2)} JD</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button 
              disabled={cart.length === 0 || isOrdering}
              onClick={handleCheckoutClick}
              className="w-full bg-[#266041] hover:bg-[#1a4a32] text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-green-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 flex items-center justify-center gap-3"
            >
              {isOrdering ? (
                 <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                lang === 'ar' ? 'إرسال الطلب' : 'Submit Order'
              )}
            </button>
            
            <button 
              disabled={cart.length === 0}
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-3xl font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-green-500/10"
            >
              <i className="bi bi-whatsapp text-2xl"></i>
              {lang === 'ar' ? 'اطلب عبر واتساب' : 'WhatsApp Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
