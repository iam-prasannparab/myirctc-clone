import React, { useState } from 'react';
import { 
  Hotel, 
  MapPin, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Compass, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { MAJOR_STATIONS } from '../data/mockRailData';

export const TourismView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PACKAGES' | 'RETIRING_ROOMS'>('PACKAGES');
  const [selectedStation, setSelectedStation] = useState('NDLS');
  const [bookingNotice, setBookingNotice] = useState<string | null>(null);

  const touristTrains = [
    {
      id: 'bg-1',
      title: 'Bharat Gaurav: Jyotirlinga Yatra',
      route: 'Delhi ➔ Ujjain ➔ Omkareshwar ➔ Somnath ➔ Dwarka',
      duration: '8 Nights / 9 Days',
      price: '₹18,450',
      category: 'Spiritual Circuit',
      features: ['All Meals (Veg)', 'AC Bus Transfers', 'Hotel Night Stays', 'Travel Insurance']
    },
    {
      id: 'bg-2',
      title: 'Maharajas Express: Heritage of India',
      route: 'Mumbai ➔ Udaipur ➔ Jodhpur ➔ Bikaner ➔ Jaipur ➔ Agra ➔ Delhi',
      duration: '6 Nights / 7 Days',
      price: '₹4,95,000',
      category: 'World Luxury Train',
      features: ['5-Star Suite on Wheels', 'Fine Dining Cars', 'Palace Excursions', 'Butler Service']
    },
    {
      id: 'bg-3',
      title: 'Golden Chariot: Pride of South',
      route: 'Bengaluru ➔ Bandipur ➔ Mysore ➔ Hampi ➔ Badami ➔ Goa',
      duration: '5 Nights / 6 Days',
      price: '₹2,65,000',
      category: 'Heritage Special',
      features: ['Royal Luxury Coaches', 'Ayurvedic Spa Onboard', 'Wildlife Safari', 'Heritage Guides']
    },
    {
      id: 'bg-4',
      title: 'Himalayan Queen & Darjeeling Toy Train',
      route: 'Kalka ➔ Shimla / New Jalpaiguri ➔ Darjeeling',
      duration: '4 Nights / 5 Days',
      price: '₹14,200',
      category: 'UNESCO World Heritage Rail',
      features: ['Narrow Gauge Steam Rake', 'Mountain View Stays', 'Tea Garden Walk', 'Sightseeing']
    }
  ];

  const retiringRooms = [
    {
      type: 'Executive AC Suite Room',
      occupancy: 'Double Bed (2 Adults + 1 Child)',
      price24h: '₹1,800',
      price12h: '₹1,100',
      amenities: ['Air Conditioned', 'Attached Bathroom & Geyser', 'Wi-Fi', '24h Room Service', 'Direct Station Concourse Access']
    },
    {
      type: 'Deluxe AC Room',
      occupancy: 'Double Bed',
      price24h: '₹1,400',
      price12h: '₹850',
      amenities: ['Air Conditioned', 'En-suite Toilet', 'Fresh Linen', 'Locker Facility']
    },
    {
      type: 'AC Dormitory Bed',
      occupancy: 'Single Traveler Bed',
      price24h: '₹450',
      price12h: '₹280',
      amenities: ['Air Conditioned Hall', 'Personal Luggage Locker', 'Charging Port & Reading Lamp', 'Clean Shower Cabins']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#08284c] via-[#103b70] to-[#213d77] text-white p-6 rounded-t-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white">
              <Hotel className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                IRCTC Tourism & Station Retiring Rooms
              </h1>
              <p className="text-xs text-blue-200">
                Official tourist circuits, luxury royal trains & economical station lodging across India
              </p>
            </div>
          </div>

          {/* Segmented Control */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg border border-white/20 text-xs">
            <button
              onClick={() => setActiveTab('PACKAGES')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                activeTab === 'PACKAGES'
                  ? 'bg-white text-[#213d77] shadow-sm'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Tourist Trains & Tours
            </button>
            <button
              onClick={() => setActiveTab('RETIRING_ROOMS')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                activeTab === 'RETIRING_ROOMS'
                  ? 'bg-white text-[#213d77] shadow-sm'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Station Retiring Rooms
            </button>
          </div>
        </div>
      </div>

      {bookingNotice && (
        <div className="bg-emerald-50 border-x border-b border-emerald-200 p-4 text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{bookingNotice}</span>
          </div>
          <button
            onClick={() => setBookingNotice(null)}
            className="text-emerald-900 font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* View 1: Tourist Trains & Packages */}
      {activeTab === 'PACKAGES' && (
        <div className="bg-white border-x border-b border-slate-200 p-6 rounded-b-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Featured Indian Railway Tourist Circuits
              </h2>
              <p className="text-xs text-slate-500">
                All packages include train travel, hotel stays, sanitized meals, and dedicated tour escorts.
              </p>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-bold text-[#fb792b] bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
              Dekho Apna Desh
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {touristTrains.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#213d77] px-2 py-0.5 rounded">
                      {tour.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {tour.duration}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 mb-1">
                    {tour.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-medium flex items-center gap-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#fb792b] shrink-0" />
                    <span>{tour.route}</span>
                  </p>

                  <div className="space-y-1 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Package Inclusions:</p>
                    <div className="grid grid-cols-2 gap-1 text-[11px]">
                      {tour.features.map((feat, idx) => (
                        <span key={idx} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Starting From</p>
                    <p className="text-lg font-black font-mono text-[#213d77]">{tour.price}</p>
                  </div>

                  <button
                    onClick={() => setBookingNotice(`Booking interest registered for "${tour.title}". An IRCTC tourism specialist will contact your registered phone shortly.`)}
                    className="px-4 py-2 bg-[#fb792b] hover:bg-[#ea580c] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Book Tour Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Retiring Rooms at Major Stations */}
      {activeTab === 'RETIRING_ROOMS' && (
        <div className="bg-white border-x border-b border-slate-200 p-6 rounded-b-xl space-y-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-end justify-between gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                Select Railway Station for Retiring Room Booking
              </label>
              <select
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                className="w-full py-2 px-3 text-xs font-semibold border border-slate-300 rounded bg-white outline-none"
              >
                {MAJOR_STATIONS.slice(0, 12).map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name} ({st.code}) - {st.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-slate-500">
              <p>● Booking open for Confirmed / RAC PNR holders</p>
              <p>● Slots available: 12 Hours & 24 Hours duration</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {retiringRooms.map((room, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 mb-1">
                    {room.type}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">{room.occupancy}</p>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs space-y-1 mb-4">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Tariff Rates:</p>
                    <div className="flex justify-between font-mono font-bold text-slate-800">
                      <span>12 Hours Slot:</span>
                      <span className="text-[#213d77]">{room.price12h}</span>
                    </div>
                    <div className="flex justify-between font-mono font-bold text-slate-800">
                      <span>24 Hours Slot:</span>
                      <span className="text-[#fb792b]">{room.price24h}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 mb-4">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Amenities:</p>
                    {room.amenities.map((am, aIdx) => (
                      <p key={aIdx} className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{am}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setBookingNotice(`Retiring room booking simulated for "${room.type}" at station code ${selectedStation}. Room reservation voucher generated!`)}
                  className="w-full py-2 bg-[#213d77] hover:bg-[#1a2f5c] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Reserve at {selectedStation}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
