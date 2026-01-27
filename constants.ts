
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- VEGETABLES ---
  { 
    id: 'v1', 
    name: { en: "Local Baladi Tomatoes", ar: "بندورة بلدية" }, 
    category: "vegetables", 
    price: 0.65, 
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'v2', 
    name: { en: "Fresh Cucumbers", ar: "خيار بلدي طازج" }, 
    category: "vegetables", 
    price: 0.75, 
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'v3', 
    name: { en: "Zucchini (Kousa)", ar: "كوسا بلدية" }, 
    category: "vegetables", 
    price: 0.85, 
    image: "https://images.unsplash.com/photo-1557844352-761f2565b576?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'v4', 
    name: { en: "Large Black Eggplant", ar: "باذنجان أسود عجمي" }, 
    category: "vegetables", 
    price: 0.55, 
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'v5', 
    name: { en: "Small Makdous Eggplant", ar: "باذنجان للمكدوس" }, 
    category: "vegetables", 
    price: 0.90, 
    image: "https://images.unsplash.com/photo-1518485033148-4722152e92bc?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'v6', 
    name: { en: "Yellow Potatoes", ar: "بطاطا" }, 
    category: "vegetables", 
    price: 0.50, 
    image: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'v7', 
    name: { en: "Red Onions", ar: "بصل أحمر" }, 
    category: "vegetables", 
    price: 0.45, 
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'v8', 
    name: { en: "Fresh Garlic", ar: "ثوم بلدي" }, 
    category: "vegetables", 
    price: 1.20, 
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=500", 
    organic: false,
    unit: "Bunch"
  },
  { 
    id: 'v9', 
    name: { en: "Okra (Bamya)", ar: "بامية بلدية" }, 
    category: "vegetables", 
    price: 2.50, 
    image: "https://images.unsplash.com/photo-1627440019941-030986950346?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'v10', 
    name: { en: "Fresh Molokhia (Leaves)", ar: "ملوخية ورق" }, 
    category: "vegetables", 
    price: 1.50, 
    image: "https://images.unsplash.com/photo-1515471204579-20bcc904fbd8?w=500", 
    organic: false,
    unit: "Bunch"
  },
  { 
    id: 'v11', 
    name: { en: "Cauliflower", ar: "زهرة / قرنبيط" }, 
    category: "vegetables", 
    price: 0.95, 
    image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=500", 
    organic: false,
    unit: "Piece"
  },
  { 
    id: 'v12', 
    name: { en: "Green Cabbage", ar: "ملفوف أخضر" }, 
    category: "vegetables", 
    price: 0.60, 
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'v13', 
    name: { en: "Hot Green Chili", ar: "فلفل حار أخضر" }, 
    category: "vegetables", 
    price: 1.10, 
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'v14', 
    name: { en: "Mixed Bell Peppers", ar: "فلفل حلو مشكل" }, 
    category: "vegetables", 
    price: 1.40, 
    image: "https://images.unsplash.com/photo-1566275529824-cca6d00a2175?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'v15', 
    name: { en: "Bunch of Parsley", ar: "ضمة بقدونس" }, 
    category: "vegetables", 
    price: 0.20, 
    image: "https://images.unsplash.com/photo-1515471204579-20bcc904fbd8?w=500", 
    organic: false,
    unit: "Bunch"
  },
  { 
    id: 'v16', 
    name: { en: "Bunch of Mint", ar: "ضمة نعنع" }, 
    category: "vegetables", 
    price: 0.20, 
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500", 
    organic: false,
    unit: "Bunch"
  },

  // --- FRUITS ---
  { 
    id: 'f1', 
    name: { en: "Valencia Oranges", ar: "برتقال فالنسيا" }, 
    category: "fruits", 
    price: 0.85, 
    image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'f2', 
    name: { en: "Yellow Lemons", ar: "ليمون أصفر" }, 
    category: "fruits", 
    price: 0.95, 
    image: "https://images.unsplash.com/photo-1582722872445-44c56bb3a3dd?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'f3', 
    name: { en: "Red Gala Apples", ar: "تفاح أحمر جالا" }, 
    category: "fruits", 
    price: 1.35, 
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'f4', 
    name: { en: "Green Smith Apples", ar: "تفاح أخضر" }, 
    category: "fruits", 
    price: 1.50, 
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'f5', 
    name: { en: "Local Bananas", ar: "موز بلدي" }, 
    category: "fruits", 
    price: 0.80, 
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'f6', 
    name: { en: "Organic Chiquita Bananas", ar: "موز عضوي" }, 
    category: "organic", 
    price: 1.10, 
    image: "https://images.unsplash.com/photo-1481349579423-ba96c36e4b1a?w=500", 
    organic: true,
    unit: "KG"
  },
  { 
    id: 'f7', 
    name: { en: "Fresh Strawberries", ar: "فراولة طازجة" }, 
    category: "fruits", 
    price: 2.25, 
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500", 
    organic: false,
    unit: "Box"
  },
  { 
    id: 'f8', 
    name: { en: "Medjool Dates", ar: "تمر مجهول فاخر" }, 
    category: "fruits", 
    price: 4.50, 
    image: "https://images.unsplash.com/photo-1589135091720-6d09323565e3?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'f9', 
    name: { en: "Pomegranates", ar: "رمان بلدي" }, 
    category: "fruits", 
    price: 1.80, 
    image: "https://images.unsplash.com/photo-1615485500704-8e990f3900f1?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'f10', 
    name: { en: "Local Grapes", ar: "عنب بلدي" }, 
    category: "fruits", 
    price: 2.00, 
    image: "https://images.unsplash.com/photo-1537640538966-79f369b41e8f?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'f11', 
    name: { en: "Summer Watermelon", ar: "بطيخ أحمر" }, 
    category: "fruits", 
    price: 3.50, 
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=500", 
    organic: false,
    unit: "Piece"
  },
  { 
    id: 'f12', 
    name: { en: "Sweet Melon", ar: "شمام بلدي" }, 
    category: "fruits", 
    price: 1.25, 
    image: "https://images.unsplash.com/photo-1571575173749-bef82583870a?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'f13', 
    name: { en: "Peaches", ar: "دراق بلدي" }, 
    category: "fruits", 
    price: 1.75, 
    image: "https://images.unsplash.com/photo-1521245028319-35ca3ff3539a?w=500", 
    organic: false,
    unit: "KG"
  },
  { 
    id: 'f14', 
    name: { en: "Apricots", ar: "مشمش مستكاوي" }, 
    category: "fruits", 
    price: 2.00, 
    image: "https://images.unsplash.com/photo-1559181567-c3190cb9959b?w=500", 
    organic: false,
    unit: "KG"
  }
];

export const COLORS = {
  primary: '#266041',
  secondary: '#ff5722',
  accent: '#1a4a32',
  price: '#ff6b35',
};
