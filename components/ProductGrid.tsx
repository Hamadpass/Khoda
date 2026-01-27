
import React, { useState, useMemo } from 'react';
import { Product, Language } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  lang: Language;
  onAddToCart: (p: Product, q: number) => void;
  searchTerm: string;
  isLoading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, lang, onAddToCart, searchTerm, isLoading }) => {
  const [filter, setFilter] = useState<Product['category'] | 'all'>('all');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = filter === 'all' || p.category === filter;
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        p.name.en.toLowerCase().includes(term) || 
        p.name.ar.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, filter, searchTerm]);

  const categories = [
    { id: 'all', label: { ar: 'الكل', en: 'All' } },
    { id: 'fruits', label: { ar: 'فواكه', en: 'Fruits' } },
    { id: 'vegetables', label: { ar: 'خضروات', en: 'Vegetables' } },
    { id: 'organic', label: { ar: 'عضوي', en: 'Organic' } },
  ];

  const renderSkeletons = () => (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 animate-pulse">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full">
          <div className="aspect-square bg-gray-100" />
          <div className="p-3 space-y-3">
            <div className="h-3 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
            <div className="h-8 bg-gray-50 rounded-xl w-full mt-4" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-4 w-full">
      <div className="flex overflow-x-auto pb-6 mb-2 scrollbar-hide gap-3 justify-start md:justify-center">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id as any)}
            className={`px-6 py-2 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
              filter === cat.id 
                ? 'bg-[#266041] text-white shadow-xl scale-105 ring-4 ring-green-100' 
                : 'bg-white text-gray-600 hover:bg-green-50 hover:text-[#266041] border border-gray-100 shadow-sm'
            }`}
          >
            {cat.label[lang]}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="text-center py-8">
             <div className="inline-block w-8 h-8 border-4 border-[#266041] border-t-transparent rounded-full animate-spin mb-3"></div>
             <p className="text-[#266041] font-black text-sm">
               {lang === 'ar' ? 'جارٍ جلب المحاصيل الطازجة...' : 'Gathering fresh produce...'}
             </p>
          </div>
          {renderSkeletons()}
        </div>
      ) : (
        <>
          {searchTerm && (
            <p className="mb-6 text-gray-400 font-bold text-sm text-center">
              {lang === 'ar' 
                ? `نتائج البحث عن "${searchTerm}"` 
                : `Search results for "${searchTerm}"`}
            </p>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 w-full">
            {filtered.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                lang={lang} 
                onAdd={onAddToCart} 
              />
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100 mt-8">
              <div className="text-7xl mb-6 grayscale opacity-30 animate-bounce">🔍</div>
              <h3 className="text-xl font-black text-gray-800 mb-2">
                {lang === 'ar' ? 'لم نجد ما تبحث عنه' : 'No results found'}
              </h3>
              <p className="text-gray-500 font-medium">
                {lang === 'ar' 
                  ? 'جرّب البحث بكلمات مختلفة أو تغيير التصنيف' 
                  : 'Try searching for something else or changing categories'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
