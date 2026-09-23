import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Train as TrainIcon, 
  UtensilsCrossed, 
  ShieldCheck, 
  QrCode,
  Share2
} from 'lucide-react';
import { Ticket } from '../types';

interface TicketModalProps {
  ticket: Ticket;
  onClose: () => void;
  onOrderFood: (pnr: string) => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  ticket,
  onClose,
  onOrderFood,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-auto overflow-hidden border border-slate-300">
        
        {/* Top Action Ribbon */}
        <div className="bg-[#08284c] text-white px-5 py-3 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm tracking-wide">
              Electronic Reservation Slip (ERS) - Ticket Confirmed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable ERS Ticket Document */}
        <div id="printable-ticket" className="p-6 bg-white text-slate-900 font-sans text-xs space-y-4">
          
          {/* 1. Official IRCTC Header */}
          <div className="border-b-2 border-[#213d77] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#213d77] flex items-center justify-center text-amber-400 font-bold">
                <TrainIcon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg tracking-tight text-[#213d77]">
                  INDIAN RAILWAYS CATERING AND TOURISM CORPORATION
                </h2>
                <p className="text-[11px] text-slate-600 font-medium">
                  IRCTC NextGen e-Ticketing System · Centre for Railway Information Systems (CRIS)
                </p>
              </div>
            </div>

            {/* Simulated QR Code for Ticket Authenticity */}
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-200">
              <div className="w-12 h-12 bg-white border border-slate-300 rounded flex items-center justify-center p-1">
                <QrCode className="w-10 h-10 text-slate-800" />
              </div>
              <div className="text-[10px]">
                <p className="font-mono font-bold text-slate-900">{ticket.transactionId}</p>
                <p className="text-emerald-700 font-semibold">● VERIFIED E-TICKET</p>
              </div>
            </div>
          </div>

          {/* 2. Key Booking Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-blue-50/60 p-3.5 rounded-lg border border-blue-100 text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">PNR NUMBER</p>
              <p className="text-base font-extrabold font-mono text-[#213d77]">{ticket.pnr}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">TRAIN NO. & NAME</p>
              <p className="font-bold text-slate-800 truncate">{ticket.trainNumber} / {ticket.trainName}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">CLASS & QUOTA</p>
              <p className="font-bold text-slate-800">{ticket.selectedClass} | {ticket.quota}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">DATE OF JOURNEY</p>
              <p className="font-bold text-slate-800 font-mono">{ticket.journeyDate}</p>
            </div>
          </div>

          {/* 3. Journey Route Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">From (Origin)</p>
              <p className="font-bold text-slate-900">{ticket.fromStation.name} ({ticket.fromStation.code})</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">To (Destination)</p>
              <p className="font-bold text-slate-900">{ticket.toStation.name} ({ticket.toStation.code})</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Chart Status</p>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                {ticket.chartStatus}
              </span>
            </div>
          </div>

          {/* 4. Passenger Reservation Table */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase mb-1.5 flex items-center justify-between">
              <span>Passenger Reservation Details</span>
              <span className="text-[10px] text-slate-500 lowercase font-normal">
                (Valid ID proof required during travel)
              </span>
            </h4>

            <div className="border border-slate-300 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#213d77] text-white">
                  <tr>
                    <th className="py-2 px-3">#</th>
                    <th className="py-2 px-3">Passenger Name</th>
                    <th className="py-2 px-3">Age / Sex</th>
                    <th className="py-2 px-3">Booking Status</th>
                    <th className="py-2 px-3">Coach / Seat</th>
                    <th className="py-2 px-3">Berth Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {ticket.passengers.map((p, index) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-400">{index + 1}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800">{p.name}</td>
                      <td className="py-2.5 px-3 text-slate-600">{p.age} Yrs / {p.gender.charAt(0)}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-emerald-700 font-bold font-mono">
                          {p.bookingStatus || 'CNF'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-extrabold text-[#213d77]">
                        {p.allocatedCoach} - {p.allocatedBerth}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-medium">
                        {p.allocatedBerthType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Fare Summary & Tax Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] space-y-1">
              <p className="font-bold text-slate-700 uppercase text-[10px]">Payment & Transaction Info</p>
              <p className="text-slate-600">Transaction ID: <span className="font-mono font-bold">{ticket.transactionId}</span></p>
              <p className="text-slate-600">Booking Time: <span className="font-mono">{ticket.bookingDate}</span></p>
              <p className="text-slate-600">Payment Gateway: IRCTC iPay / UPI Instant</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Ticket Base Fare:</span>
                <span className="font-mono">₹{ticket.baseFare}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Reservation & SF Fee:</span>
                <span className="font-mono">₹{ticket.reservationCharge + ticket.superfastCharge}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (5%) + Insurance:</span>
                <span className="font-mono">₹{ticket.gst + ticket.insuranceAmount}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-300">
                <span>Total Amount Paid:</span>
                <span className="font-mono text-[#fb792b]">₹{ticket.totalFare.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 6. Authentic IRCTC Mandatory Instructions */}
          <div className="text-[10px] text-slate-500 bg-amber-50/60 p-3 rounded border border-amber-200 space-y-0.5">
            <p className="font-bold text-amber-900">IMPORTANT PASSENGER INSTRUCTIONS:</p>
            <p>1. At least one passenger must present original Govt ID proof (Aadhaar, Voter Card, Passport, Driving License, Pan Card) during journey.</p>
            <p>2. Prescribed time for cancellation of confirmed ticket without heavy clerkage is up to 48 hours before train departure.</p>
            <p>3. Travel insurance policy is serviced by designated insurance partners under Ministry of Railways policy.</p>
          </div>
        </div>

        {/* Modal Footer / Post-Booking Actions */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 no-print">
          <button
            onClick={() => onOrderFood(ticket.pnr)}
            className="px-4 py-2 bg-[#213d77] hover:bg-[#1a2f5c] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            <span>Order Meals to Seat for PNR #{ticket.pnr}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
