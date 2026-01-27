
import React, { useState } from 'react';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (phone: string) => void;
  lang: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, lang }) => {
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(phone);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            💬
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {lang === 'ar' ? 'تسجيل الدخول' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {lang === 'ar' 
              ? 'أدخل رقم الواتساب الخاص بك للمتابعة' 
              : 'Enter your WhatsApp number to continue'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left" dir="ltr">
              <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                Phone Number (Jordan)
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-bold">
                  +962
                </span>
                <input
                  type="tel"
                  required
                  placeholder="7XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  className="flex-1 block w-full rounded-none rounded-r-lg border border-gray-300 p-3 text-lg font-bold tracking-widest focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            
            <p className="text-[10px] text-gray-400">
              {lang === 'ar' 
                ? 'بالدخول، أنت توافق على استلام تحديثات طلبك عبر الواتساب' 
                : 'By logging in, you agree to receive order updates via WhatsApp'}
            </p>

            <button 
              type="submit"
              className="w-full bg-[#266041] hover:bg-[#1a4a32] text-white py-3 rounded-xl font-bold shadow-lg transition-all"
            >
              {lang === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
            </button>
          </form>
          
          <button onClick={onClose} className="mt-4 text-sm text-gray-400 hover:text-gray-600 font-medium">
            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
