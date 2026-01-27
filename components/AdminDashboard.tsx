
import React, { useState } from 'react';
import { Product, Order, Language } from '../types';
import { db } from '../services/supabaseClient';

interface AdminDashboardProps {
  lang: Language;
  products: Product[];
  setProducts: (p: Product[]) => void;
  orders: Order[];
  onUpdateOrderStatus: (id: string, status: Order['status']) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, products, setProducts, orders, onUpdateOrderStatus }) => {
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure?')) {
      await db.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    const product = {
      ...editingProduct,
      id: editingProduct.id || Math.random().toString(36).substr(2, 9),
    } as Product;
    
    await db.saveProduct(product);
    const updated = await db.getProducts();
    setProducts(updated);
    setEditingProduct(null);
  };

  const stats = [
    { label: { ar: 'المنتجات', en: 'Products' }, val: products.length, icon: '🥬' },
    { label: { ar: 'الطلبات', en: 'Orders' }, val: orders.length, icon: '🛒' },
    { label: { ar: 'الإيرادات', en: 'Revenue' }, val: `${orders.reduce((s, o) => s + (o.status === 'completed' ? o.total : 0), 0).toFixed(2)} JD`, icon: '💰' },
  ];

  return (
    <div className="py-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-indigo-900 flex items-center gap-3">
          <span className="bg-indigo-100 p-2 rounded-2xl">🛡️</span>
          {lang === 'ar' ? 'لوحة تحكم المدير' : 'Admin Terminal'}
        </h2>
        <div className="flex gap-2">
           {tab === 'products' && (
             <button 
              onClick={() => setEditingProduct({ name: { en: '', ar: '' }, category: 'vegetables', price: 0, unit: 'KG', organic: false, image: '' })}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg transition-all"
            >
              + {lang === 'ar' ? 'منتج جديد' : 'New Product'}
            </button>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-indigo-50 flex items-center justify-between group hover:shadow-xl transition-all">
            <div>
              <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">{s.label[lang]}</p>
              <p className="text-4xl font-black text-indigo-900">{s.val}</p>
            </div>
            <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{s.icon}</span>
          </div>
        ))}
      </div>

      <div className="flex bg-gray-100 p-1.5 rounded-2xl w-fit gap-2 mb-8">
        <button 
          onClick={() => setTab('products')}
          className={`px-8 py-2.5 rounded-xl font-black text-sm transition-all ${tab === 'products' ? 'bg-white text-indigo-900 shadow-md' : 'text-gray-500 hover:bg-white/50'}`}
        >
          {lang === 'ar' ? 'المخزون' : 'Inventory'}
        </button>
        <button 
          onClick={() => setTab('orders')}
          className={`px-8 py-2.5 rounded-xl font-black text-sm transition-all ${tab === 'orders' ? 'bg-white text-indigo-900 shadow-md' : 'text-gray-500 hover:bg-white/50'}`}
        >
          {lang === 'ar' ? 'الطلبات' : 'Orders'}
        </button>
      </div>

      {tab === 'products' ? (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left" dir="ltr">
              <thead className="bg-gray-50 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Product</th>
                  <th className="px-8 py-4">Price</th>
                  <th className="px-8 py-4">Unit</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-8 py-4">
                      {p.organic ? <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Organic</span> : <span className="text-xs text-gray-400">Standard</span>}
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} className="w-10 h-10 rounded-xl object-cover shadow-sm" alt="" />
                        <span className="font-bold text-indigo-900">{p.name[lang]}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 font-mono font-bold">{p.price.toFixed(2)} JD</td>
                    <td className="px-8 py-4 text-xs font-bold text-gray-500">{p.unit}</td>
                    <td className="px-8 py-4 text-right space-x-3">
                      <button onClick={() => setEditingProduct(p)} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 font-bold text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left" dir="ltr">
              <thead className="bg-gray-50 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Total</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-8 py-4 font-mono font-bold text-indigo-900">#{o.id}</td>
                    <td className="px-8 py-4 text-sm">+{o.customerPhone}</td>
                    <td className="px-8 py-4 font-black text-orange-600">{o.total.toFixed(2)} JD</td>
                    <td className="px-8 py-4">
                      <select 
                        value={o.status}
                        onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                        className={`text-xs font-bold border-none rounded-lg p-1.5 focus:ring-0 cursor-pointer ${
                          o.status === 'completed' ? 'bg-green-100 text-green-700' : 
                          o.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-8 py-4">
                      <button 
                        onClick={() => setSelectedOrder(o)}
                        className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-100"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="absolute inset-0 bg-indigo-900/40" onClick={() => setEditingProduct(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-black text-indigo-900 mb-6">{lang === 'ar' ? 'تعديل البيانات' : 'Update Product'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] font-black text-indigo-300 uppercase">Product Name (EN)</label>
                  <input required value={editingProduct.name?.en} onChange={e => setEditingProduct({...editingProduct, name: {...editingProduct.name!, en: e.target.value}})} className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black text-indigo-300 uppercase">الاسم بالعربي</label>
                  <input required value={editingProduct.name?.ar} onChange={e => setEditingProduct({...editingProduct, name: {...editingProduct.name!, ar: e.target.value}})} className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 font-tajawal text-right" dir="rtl" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-indigo-300 uppercase">Price (JD)</label>
                  <input type="number" step="0.01" required value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-indigo-300 uppercase">Unit</label>
                  <input required value={editingProduct.unit} onChange={e => setEditingProduct({...editingProduct, unit: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black text-indigo-300 uppercase">Image URL</label>
                  <input required value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="flex items-center gap-2 py-2">
                  <input type="checkbox" checked={editingProduct.organic} onChange={e => setEditingProduct({...editingProduct, organic: e.target.checked})} className="rounded text-green-600 focus:ring-green-500" />
                  <label className="text-sm font-bold text-indigo-900">Organic Product</label>
                </div>
              </div>
              <div className="flex gap-3 pt-6">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-black shadow-lg hover:bg-indigo-700 transition-all">Save Changes</button>
                <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-2xl font-bold hover:bg-gray-200">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="absolute inset-0 bg-indigo-900/40" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-2xl font-black text-indigo-900 mb-2">Order Details</h3>
            <p className="text-xs text-indigo-300 font-bold mb-6 tracking-widest uppercase">ID: #{selectedOrder.id}</p>
            
            <div className="space-y-4 max-h-[40vh] overflow-y-auto mb-6 pr-2">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="font-bold text-indigo-900 text-sm">{item.name[lang]}</p>
                      <p className="text-[10px] text-gray-400">{item.quantity} {item.unit} x {item.price.toFixed(2)} JD</p>
                    </div>
                  </div>
                  <span className="font-bold text-indigo-900 text-sm">{(item.quantity * item.price).toFixed(2)} JD</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
               <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>Subtotal</span>
                  <span>{selectedOrder.subtotal.toFixed(2)} JD</span>
               </div>
               <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>Delivery</span>
                  <span>{selectedOrder.deliveryFee.toFixed(2)} JD</span>
               </div>
               <div className="flex justify-between text-xl font-black text-orange-600 pt-2">
                  <span>Total</span>
                  <span>{selectedOrder.total.toFixed(2)} JD</span>
               </div>
            </div>

            <button 
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-8 bg-indigo-900 text-white py-4 rounded-2xl font-black hover:bg-indigo-800 transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
