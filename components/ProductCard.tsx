
import React, { useState } from 'react';
import { Product, Language } from '../types';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onAdd: (p: Product, q: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, lang, onAdd }) => {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name[lang]} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        {product.organic && (
          <span className="absolute top-3 right-3 bg-green-600 text-white text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider shadow-lg">
            {lang === 'ar' ? 'عضوي' : 'Organic'}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-black text-gray-800 text-sm md:text-base line-clamp-2 min-h-[2.5rem] mb-1 leading-tight">
          {product.name[lang]}
        </h3>
        
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-[#ff5722] font-black text-xl">{product.price.toFixed(2)}</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">JD / {product.unit}</span>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-1 border border-gray-100">
            <button 
              onClick={() => setQty(prev => Math.max(0.5, prev - 0.5))}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-[#266041] font-black hover:bg-green-50 shadow-sm transition-colors"
            >-</button>
            <span className="font-black text-xs">
              {qty} <span className="text-[9px] opacity-40 font-bold">{product.unit}</span>
            </span>
            <button 
              onClick={() => setQty(prev => prev + 0.5)}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-[#266041] font-black hover:bg-green-50 shadow-sm transition-colors"
            >+</button>
          </div>

          <button 
            onClick={() => onAdd(product, qty)}
            className="w-full bg-[#266041] hover:bg-[#1a4a32] text-white py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/10 active:scale-95"
          >
            <i className="bi bi-cart-plus text-lg"></i>
            <span>{lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
