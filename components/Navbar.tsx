
import React, { useState } from 'react';
import { User, Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  user: User | null;
  cartCount: number;
  onCartClick: () => void;
  onLogout: () => void;
  activeSection: 'home' | 'admin' | 'orders';
  setActiveSection: (s: 'home' | 'admin' | 'orders') => void;
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  lang, setLang, user, cartCount, onCartClick, onLogout, activeSection, setActiveSection, onSearch
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    onSearch(val);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${user?.role === 'admin' ? 'bg-indigo-900' : 'bg-[#266041]'} text-white shadow-xl w-full`}>
      <div className="w-full px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 lg:gap-8">
          <button 
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-2 group"
          >
            <div className="bg-white text-green-800 p-1.5 rounded-lg shadow-inner group-hover:rotate-12 transition-transform">
              <span className="text-xl">🥕</span>
            </div>
            <span className="text-2xl font-black tracking-tighter hidden sm:inline">
              {lang === 'ar' ? 'خضرجي' : 'Khodarji'}
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <button 
              onClick={() => setActiveSection('home')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeSection === 'home' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            {user && (
              <button 
                onClick={() => setActiveSection('orders')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeSection === 'orders' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                {lang === 'ar' ? 'طلباتي' : 'Orders'}
              </button>
            )}
            {user?.role === 'admin' && (
              <button 
                onClick={() => setActiveSection('admin')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeSection === 'admin' ? 'bg-orange-500 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                {lang === 'ar' ? 'المدير' : 'Admin'}
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 max-w-2xl relative">
          <input 
            type="text"
            placeholder={lang === 'ar' ? 'ابحث عن خضار أو فواكه...' : 'Search produce...'}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-white/10 border border-white/20 rounded-2xl py-2 px-4 pl-10 focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-sm font-medium"
          />
          <div className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 opacity-60`}>
            <i className="bi bi-search text-lg"></i>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-5">
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="text-sm font-black hover:bg-white/20 px-3 py-2 rounded-xl border border-white/15 transition-all active:scale-90"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          <button 
            onClick={onCartClick}
            className="relative p-2.5 hover:bg-white/15 rounded-full transition-all group"
          >
            <i className="bi bi-bag-fill text-2xl group-hover:scale-110 transition-transform"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[11px] font-black h-5 w-5 flex items-center justify-center rounded-full shadow-lg border-2 border-[#266041]">
                {cartCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-white/20 mx-1 hidden sm:block"></div>

          {user && (
            <div className="flex items-center gap-2">
              <button 
                onClick={onLogout}
                className="bg-white/15 hover:bg-red-500/90 p-2.5 rounded-full transition-all group active:scale-90"
                title={lang === 'ar' ? 'خروج' : 'Logout'}
              >
                <i className="bi bi-box-arrow-right text-xl"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
