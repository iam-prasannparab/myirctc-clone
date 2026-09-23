import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Train as TrainIcon, 
  MapPin, 
  Calendar, 
  UserCheck, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Ban
} from 'lucide-react';
import { MOCK_TICKETS } from '../data/mockRailData';
import { Ticket } from '../types';

interface PnrStatusViewProps {
  onOrderFood: (pnr: string) => void;
}

export const PnrStatusView: React.FC<PnrStatusViewProps> = ({ onOrderFood }) => {
  const [pnrInput, setPnrInput] = useState('4256198421');
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(MOCK_TICKETS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cancellationResult, setCancellationResult] = useState<{
    refundAmount: number;
    deduction: number;
    message: string;
  } | null>(null);

  const handleSearch = (e?: React.FormEvent, samplePnr?: string) => {
    if (e) e.preventDefault();
    const query = (samplePnr || pnrInput).trim();
    setCancellationResult(null);

    if (query.length !== 10 || !/^\d+$/.test(query)) {
      setError('Please enter a valid 10-digit numeric Indian Railways PNR number.');
      setCurrentTicket(null);
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const found = MOCK_TICKETS.find((t) => t.pnr === query);
      if (found) {
        setCurrentTicket(found);
      } else {
        // Generate a simulated live PNR record on the fly so any 10-digit number works nicely
        const randomClass = ['3A', '2A', 'SL', 'CC'][Math.floor(Math.random() * 4)];
        const simulated: Ticket = {
          pnr: query,
          trainNumber: '12952',
          trainName: 'MUMBAI TEJAS RAJDHANI',
          journeyDate: '25-Sep-2026',
          bookingDate: '21-Sep-2026',
          fromStation: { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
          toStation: { code: 'MMCT', name: 'MUMBAI CENTRAL', city: 'Mumbai', state: 'Maharashtra' },
          boardingStation: { code: 'NDLS', name: 'NEW DELHI', city: 'Delhi', state: 'Delhi' },
          selectedClass: randomClass as any,
          quota: 'GN',
          chartStatus: Math.random() > 0.4 ? 'CHART PREPARED' : 'CHART NOT PREPARED',
          transactionId: `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`,
          baseFare: 2150,
          reservationCharge: 40,
          superfastCharge: 45,
          tatkalCharge: 0,
          cateringCharge: 240,
          gst: 110,
          insuranceAmount: 0.45,
          totalFare: 2585.45,
          passengers: [
            {
              id: 'p-sim-1',
              name: 'Gaurav Kumar',
              age: 34,
              gender: 'MALE',
              berthPreference: 'LOWER',
              mealPreference: 'VEG',
              allocatedCoach: 'B2',
              allocatedBerth: 24,
              allocatedBerthType: 'Lower Berth (LB)',
              bookingStatus: 'RAC 4',
              currentStatus: 'CNF B2 24 (Upgraded)',
            }
          ]
        };
        setCurrentTicket(simulated);
      }
    }, 600);
  };

  const handleSimulateCancel = () => {
    if (!currentTicket) return;
    const clerkage = currentTicket.selectedClass.includes('A') ? 240 : 120;
    const refund = Math.max(0, currentTicket.totalFare - clerkage);
    setCancellationResult({
      refundAmount: refund,
      deduction: clerkage,
      message: `Cancellation processed! As per IRCTC refund rules for ${currentTicket.selectedClass}, a clerkage fee of ₹${clerkage} was deducted. Refund of ₹${refund.toLocaleString()} credited to original payment source within 24 hours.`
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="bg-[#213d77] text-white p-6 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Passenger Name Record (PNR) Enquiry
            </h1>
            <p className="text-xs text-blue-200">
              Check live reservation status, confirmation probability & coach layout
            </p>
          </div>
        </div>
      </div>

      {/* PNR Search Box */}
      <div className="bg-white border-x border-b border-slate-200 p-6 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
              Enter 10-Digit PNR Number
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={10}
                value={pnrInput}
                onChange={(e) => setPnrInput(e.target.value)}
                placeholder="e.g. 4256198421"
                className="w-full px-4 py-2.5 text-base font-mono font-bold tracking-widest border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#213d77] outline-none"
              />
              <span className="absolute right-3 top-3 text-xs text-slate-400 font-mono">
                {pnrInput.length}/10
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-2.5 bg-[#fb792b] hover:bg-[#ea580c] disabled:bg-slate-400 text-white font-bold text-sm rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>CHECK STATUS</span>
          </button>
        </form>

        {/* Quick Test PNRs */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Quick Test PNRs:</span>
          {MOCK_TICKETS.map((t) => (
            <button
              key={t.pnr}
              type="button"
              onClick={() => {
                setPnrInput(t.pnr);
                handleSearch(undefined, t.pnr);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-[#213d77] font-mono font-semibold rounded border border-slate-200 transition-colors"
            >
              {t.pnr} ({t.trainName.split(' ')[0]})
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-50 border-l-4 border-rose-600 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* PNR Results Card */}
      {currentTicket && (
        <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
          {/* Status Header */}
          <div className="bg-slate-50 border-b border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-bold uppercase">PNR NUMBER</span>
                <span className="text-lg font-mono font-extrabold text-[#213d77]">
                  {currentTicket.pnr}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  currentTicket.chartStatus === 'CHART PREPARED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {currentTicket.chartStatus}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Train: <strong className="text-slate-900">{currentTicket.trainNumber} - {currentTicket.trainName}</strong> | Class: {currentTicket.selectedClass} | Quota: {currentTicket.quota}
              </p>
            </div>

            {/* Actions: Order Meals / Cancel */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOrderFood(currentTicket.pnr)}
                className="px-3 py-1.5 bg-[#213d77] text-white hover:bg-[#1a2f5c] text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
              >
                <span>Order Food on Track</span>
              </button>
              <button
                onClick={handleSimulateCancel}
                className="px-3 py-1.5 border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Cancel Ticket</span>
              </button>
            </div>
          </div>

          {cancellationResult && (
            <div className="p-4 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Cancellation Confirmed!</p>
                <p>{cancellationResult.message}</p>
              </div>
            </div>
          )}

          {/* Route Overview */}
          <div className="p-5 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-slate-500 font-semibold uppercase text-[10px]">Boarding From</p>
              <p className="text-sm font-bold text-slate-800">{currentTicket.fromStation.name} ({currentTicket.fromStation.code})</p>
              <p className="text-slate-500">{currentTicket.journeyDate}</p>
            </div>

            <div>
              <p className="text-slate-500 font-semibold uppercase text-[10px]">Destination</p>
              <p className="text-sm font-bold text-slate-800">{currentTicket.toStation.name} ({currentTicket.toStation.code})</p>
              <p className="text-slate-500">Day 2</p>
            </div>

            <div>
              <p className="text-slate-500 font-semibold uppercase text-[10px]">Total Fare Paid</p>
              <p className="text-sm font-mono font-bold text-slate-900">₹{currentTicket.totalFare.toLocaleString()}</p>
              <p className="text-emerald-700 font-medium text-[11px]">Payment Mode: Online (IRCTC)</p>
            </div>
          </div>

          {/* Passenger Roster */}
          <div className="p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Passenger Status Details
            </h3>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#213d77] text-white">
                  <tr>
                    <th className="py-2.5 px-3">Passenger</th>
                    <th className="py-2.5 px-3">Age / Sex</th>
                    <th className="py-2.5 px-3">Booking Status</th>
                    <th className="py-2.5 px-3">Current Status</th>
                    <th className="py-2.5 px-3">Coach / Seat</th>
                    <th className="py-2.5 px-3">Berth Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentTicket.passengers.map((p, index) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-800">
                        #{index + 1} {p.name}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {p.age} / {p.gender.charAt(0)}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-700">
                        {p.bookingStatus}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {p.currentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-extrabold text-[#213d77]">
                        {p.allocatedCoach} - {p.allocatedBerth}
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium">
                        {p.allocatedBerthType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Coach Position Guide */}
          <div className="p-5 bg-slate-50 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Train Coach Composition & Position
            </h4>
            <p className="text-[11px] text-slate-500 mb-3">
              Standard rake layout from locomotive engine to rear brake van:
            </p>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-[10px] font-mono">
              <span className="bg-red-800 text-white font-bold px-2 py-1.5 rounded shrink-0">
                LOCO ENGINE
              </span>
              <span className="bg-slate-300 text-slate-700 px-2 py-1.5 rounded shrink-0">
                GEN
              </span>
              <span className="bg-slate-300 text-slate-700 px-2 py-1.5 rounded shrink-0">
                S1
              </span>
              <span className="bg-slate-300 text-slate-700 px-2 py-1.5 rounded shrink-0">
                S2
              </span>
              <span className="bg-blue-800 text-white font-bold px-2.5 py-1.5 rounded shrink-0 ring-2 ring-amber-400">
                B1 (YOUR COACH)
              </span>
              <span className="bg-blue-800 text-white font-bold px-2 py-1.5 rounded shrink-0">
                B2
              </span>
              <span className="bg-blue-800 text-white font-bold px-2 py-1.5 rounded shrink-0">
                B3
              </span>
              <span className="bg-indigo-900 text-white font-bold px-2 py-1.5 rounded shrink-0">
                A1
              </span>
              <span className="bg-amber-800 text-white font-bold px-2 py-1.5 rounded shrink-0">
                H1
              </span>
              <span className="bg-slate-300 text-slate-700 px-2 py-1.5 rounded shrink-0">
                PANTRY
              </span>
              <span className="bg-slate-300 text-slate-700 px-2 py-1.5 rounded shrink-0">
                SLR / GUARD
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
