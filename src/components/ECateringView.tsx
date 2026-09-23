import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Train as TrainIcon,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { MOCK_FOOD_ITEMS } from '../data/mockRailData';
import { FoodItem, CartItem } from '../types';

interface ECateringViewProps {
  initialPnr?: string;
}

export const ECateringView: React.FC<ECateringViewProps> = ({ initialPnr }) => {
  const [pnr, setPnr] = useState(initialPnr || '4256198421');
  const [selectedStation, setSelectedStation] = useState('KOTA JN (21:30)');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'VEG' | 'NON_VEG' | 'SNACKS' | 'BEVERAGES'>('ALL');
  const [cart, setCart] = useState<CartItem[]>([
    { food: MOCK_FOOD_ITEMS[0], quantity: 1 }
  ]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [coachBerth, setCoachBerth] = useState('Coach B3, Berth 37');

  const addToCart = (food: FoodItem) => {
    const existing = cart.find((item) => item.food.id === food.id);
    if (existing) {
      setCart(cart.map((item) => item.food.id === food.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { food, quantity: 1 }]);
    }
  };

  const removeFromCart = (foodId: string) => {
    const existing = cart.find((item) => item.food.id === foodId);
    if (!existing) return;
    if (existing.quantity === 1) {
      setCart(cart.filter((item) => item.food.id !== foodId));
    } else {
      setCart(cart.map((item) => item.food.id === foodId ? { ...item, quantity: item.quantity - 1 } : item));
    }
  };

  const filteredFoods = selectedCategory === 'ALL'
    ? MOCK_FOOD_ITEMS
    : MOCK_FOOD_ITEMS.filter((f) => f.category === selectedCategory);

  const subtotal = cart.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 25 : 0;
  const gst = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + deliveryFee + gst;

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setOrderConfirmed(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="bg-[#213d77] text-white p-6 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#fb792b] flex items-center justify-center text-white">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              IRCTC e-Catering · Food on Track
            </h1>
            <p className="text-xs text-blue-200">
              Get fresh, hygienic restaurant food delivered right to your train seat & berth
            </p>
          </div>
        </div>
      </div>

      {/* PNR & Upcoming Station Filter Ribbon */}
      <div className="bg-white border-x border-b border-slate-200 p-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1 uppercase text-[10px]">
              Passenger PNR Number
            </label>
            <input
              type="text"
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              className="w-full px-3 py-2 font-mono font-bold border border-slate-300 rounded focus:ring-1 focus:ring-[#213d77] outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 uppercase text-[10px]">
              Select Upcoming Delivery Station
            </label>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="w-full px-3 py-2 font-semibold border border-slate-300 rounded bg-white outline-none"
            >
              <option value="KOTA JN (21:30)">KOTA JN (21:30 hrs - Halt 10m)</option>
              <option value="BRC (03:45)">VADODARA JN (03:45 hrs - Halt 10m)</option>
              <option value="ST (05:15)">SURAT (05:15 hrs - Halt 5m)</option>
              <option value="KANPUR CENTRAL (10:10)">KANPUR CENTRAL (10:10 hrs - Halt 5m)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 uppercase text-[10px]">
              Seat / Berth for Delivery
            </label>
            <input
              type="text"
              value={coachBerth}
              onChange={(e) => setCoachBerth(e.target.value)}
              placeholder="e.g. Coach B3, Berth 37"
              className="w-full px-3 py-2 font-medium border border-slate-300 rounded outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Menu Catalog + Floating Cart */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Food Catalog (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(['ALL', 'VEG', 'NON_VEG', 'SNACKS', 'BEVERAGES'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#213d77] text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Dishes List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredFoods.map((food) => {
              const inCart = cart.find((item) => item.food.id === food.id);
              return (
                <div
                  key={food.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-3 h-3 rounded-full ${
                            food.category === 'VEG' ? 'bg-emerald-600' : food.category === 'NON_VEG' ? 'bg-red-600' : 'bg-amber-600'
                          }`}></span>
                          <h3 className="font-bold text-sm text-slate-900 leading-snug">
                            {food.name}
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">
                          by {food.restaurant}
                        </p>
                      </div>

                      <span className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{food.rating}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {food.description}
                    </p>

                    <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="w-3 h-3 text-[#fb792b]" />
                      <span>Available at: {food.deliveryStation}</span>
                    </div>
                  </div>

                  {/* Price & Add Action */}
                  <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base font-extrabold text-slate-900 font-mono">
                      ₹{food.price}
                    </span>

                    {inCart ? (
                      <div className="flex items-center gap-2 bg-[#213d77] text-white px-2 py-1 rounded-md text-xs font-bold">
                        <button
                          onClick={() => removeFromCart(food.id)}
                          className="hover:text-amber-400 p-0.5"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono px-1">{inCart.quantity}</span>
                        <button
                          onClick={() => addToCart(food)}
                          className="hover:text-amber-400 p-0.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(food)}
                        className="px-3.5 py-1.5 bg-[#fb792b] hover:bg-[#ea580c] text-white text-xs font-bold rounded-md shadow-sm transition-colors cursor-pointer"
                      >
                        ADD TO SEAT
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Cart & Delivery Summary (Col 4) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-md p-5 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#213d77]" />
                <h3 className="font-bold text-sm text-slate-900">
                  Seat Delivery Tray ({cart.length})
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                PNR: {pnr}
              </span>
            </div>

            {orderConfirmed ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Meal Order Placed!</span>
                </div>
                <p>
                  Your meal will be freshly cooked and delivered hot to <strong>{coachBerth}</strong> when the train arrives at <strong>{selectedStation}</strong>.
                </p>
                <p className="text-[11px] text-emerald-700">
                  Verification OTP will be sent to your mobile 15 mins prior to station arrival.
                </p>
                <button
                  onClick={() => setOrderConfirmed(false)}
                  className="w-full mt-2 py-1.5 bg-emerald-700 text-white font-bold rounded text-xs"
                >
                  Order Another Meal
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                {cart.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">
                    Your meal tray is empty. Add dishes to get delivered to your seat.
                  </p>
                ) : (
                  <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto mb-4">
                    {cart.map((item) => (
                      <div key={item.food.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{item.food.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            ₹{item.food.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">
                            ₹{item.food.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100 mb-4">
                  <div className="flex justify-between">
                    <span>Food Subtotal:</span>
                    <span className="font-mono">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IRCTC Station Delivery Fee:</span>
                    <span className="font-mono">₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%):</span>
                    <span className="font-mono">₹{gst}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total Amount:</span>
                    <span className="font-mono text-[#fb792b]">₹{totalAmount}</span>
                  </div>
                </div>

                {/* Confirm Order CTA */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0}
                  className="w-full py-2.5 bg-[#fb792b] hover:bg-[#ea580c] disabled:bg-slate-300 text-white font-bold text-xs rounded-lg shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>CONFIRM ORDER & DELIVER TO SEAT</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
