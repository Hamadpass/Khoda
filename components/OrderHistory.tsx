
import React from 'react';
import { Order, Language } from '../types';

interface OrderHistoryProps {
  orders: Order[];
  lang: Language;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, lang }) => {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <span className="bg-green-100 p-2 rounded-xl">📦</span>
        {lang === 'ar' ? 'سجل الطلبات' : 'Order History'}
      </h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
          <p className="text-gray-400 mb-4">{lang === 'ar' ? 'ليس لديك طلبات سابقة' : 'You have no past orders'}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 bg-gray-50 flex items-center justify-between border-b">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                  <h4 className="font-bold">#{order.id}</h4>
                </div>
                <div className="text-right">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                    order.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                    order.status === 'completed' ? 'bg-green-100 text-green-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {lang === 'ar' 
                      ? (order.status === 'pending' ? 'قيد الانتظار' : order.status === 'completed' ? 'مكتمل' : 'ملغي')
                      : order.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name[lang]} x {item.quantity}</span>
                      <span className="font-medium">{(item.price * item.quantity).toFixed(2)} JD</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{lang === 'ar' ? 'الإجمالي' : 'Total'}</p>
                    <p className="text-xl font-bold text-orange-600">{order.total.toFixed(2)} JD</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
