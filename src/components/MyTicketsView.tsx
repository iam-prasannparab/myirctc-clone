import React from 'react';
import { Ticket as TicketIcon, Calendar, MapPin, Printer, UtensilsCrossed, ArrowRight, ShieldCheck } from 'lucide-react';
import { Ticket } from '../types';

interface MyTicketsViewProps {
  tickets: Ticket[];
  onViewTicket: (ticket: Ticket) => void;
  onOrderFood: (pnr: string) => void;
  onBookNew: () => void;
}

export const MyTicketsView: React.FC<MyTicketsViewProps> = ({
  tickets,
  onViewTicket,
  onOrderFood,
  onBookNew,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="bg-[#213d77] text-white p-6 rounded-t-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#fb792b] flex items-center justify-center text-white">
            <TicketIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              My Booked Train Tickets
            </h1>
            <p className="text-xs text-blue-200">
              Active electronic reservation slips, upcoming journey tickets & booking history
            </p>
          </div>
        </div>

        <button
          onClick={onBookNew}
          className="px-4 py-2 bg-[#fb792b] hover:bg-[#ea580c] text-white text-xs font-bold rounded-lg shadow transition-colors cursor-pointer"
        >
          + Book New Train
        </button>
      </div>

      <div className="bg-white border-x border-b border-slate-200 p-6 rounded-b-xl shadow-sm space-y-4">
        {tickets.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <TicketIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-base text-slate-700">No Tickets Booked Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Search trains between stations like New Delhi, Mumbai, Varanasi or Bengaluru and book your journey.
            </p>
            <button
              onClick={onBookNew}
              className="px-5 py-2 bg-[#213d77] text-white font-bold text-xs rounded-lg hover:bg-[#1a2f5c] transition-colors"
            >
              Search & Book Trains
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((t) => (
              <div
                key={t.pnr}
                className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-[#213d77] bg-blue-100 px-2 py-0.5 rounded">
                      PNR: {t.pnr}
                    </span>
                    <span className="font-extrabold text-sm text-slate-900">
                      {t.trainNumber} - {t.trainName}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {t.chartStatus}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#fb792b]" />
                      {t.fromStation.name} ➔ {t.toStation.name}
                    </span>
                    <span className="font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Date: {t.journeyDate}
                    </span>
                    <span className="font-medium">
                      Class: <strong>{t.selectedClass}</strong> | Quota: <strong>{t.quota}</strong>
                    </span>
                  </div>

                  <div className="text-xs text-slate-500">
                    Passengers ({t.passengers.length}):{' '}
                    {t.passengers.map((p) => `${p.name} (${p.allocatedCoach || 'B3'} - ${p.allocatedBerth || '37'})`).join(', ')}
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => onViewTicket(t)}
                    className="w-full sm:w-auto px-4 py-2 bg-[#213d77] hover:bg-[#1a2f5c] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View / Print ERS</span>
                  </button>

                  <button
                    onClick={() => onOrderFood(t.pnr)}
                    className="w-full sm:w-auto px-4 py-2 border border-[#213d77] text-[#213d77] hover:bg-blue-50 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5 text-[#fb792b]" />
                    <span>Order Food</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
