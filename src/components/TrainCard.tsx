import React, { useState } from 'react';
import { Clock, Train as TrainIcon, Calendar, Info, CheckCircle2, ChevronRight, X, Utensils } from 'lucide-react';
import { Train, ClassAvailability, QuotaType } from '../types';

interface TrainCardProps {
  train: Train;
  journeyDate: string;
  selectedQuota: string;
  onSelectBooking: (train: Train, selectedClass: ClassAvailability) => void;
}

export const TrainCard: React.FC<TrainCardProps> = ({
  train,
  journeyDate,
  selectedQuota,
  onSelectBooking,
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassAvailability>(train.classes[0]);
  const [showRouteModal, setShowRouteModal] = useState(false);

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Status styling helper
  const getStatusBadge = (cls: ClassAvailability) => {
    if (cls.status === 'AVAILABLE') {
      return (
        <span className="text-emerald-700 font-bold">
          AVAILABLE-{String(cls.statusNumber).padStart(4, '0')}
        </span>
      );
    }
    if (cls.status === 'RAC') {
      return (
        <span className="text-amber-700 font-bold">
          RAC {cls.statusNumber} / RAC {Math.max(1, cls.statusNumber - 6)}
        </span>
      );
    }
    return (
      <span className="text-rose-700 font-bold">
        WL {cls.statusNumber} / WL {Math.max(1, cls.statusNumber - 12)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* 1. Header Strip: Train No, Name, Runs On, Schedule link */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#213d77] text-white flex items-center justify-center font-bold text-xs">
            <TrainIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-sm tracking-wide">
                {train.number}
              </span>
              <span className="font-bold text-sm text-[#213d77]">
                {train.name}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-[#213d77]">
                {train.type}
              </span>
              {train.pantryAvailable && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-medium">
                  <Utensils className="w-3 h-3" /> Pantry Car
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Runs On & Route schedule */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-slate-500 font-medium">Runs On:</span>
            <div className="flex items-center gap-1">
              {daysOfWeek.map((day, idx) => {
                const runs = train.runsOn[idx];
                return (
                  <span
                    key={idx}
                    className={`w-4 h-4 flex items-center justify-center text-[10px] font-bold rounded ${
                      runs ? 'bg-emerald-100 text-emerald-800' : 'text-slate-300'
                    }`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setShowRouteModal(true)}
            className="text-xs font-semibold text-[#213d77] hover:underline"
          >
            Train Schedule
          </button>
        </div>
      </div>

      {/* 2. Middle Body: Origin -> Duration -> Destination */}
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Departure Info (Col 4) */}
          <div className="md:col-span-4 flex items-start gap-3">
            <div>
              <p className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                {train.departureTime}
              </p>
              <p className="text-xs font-bold text-slate-800">
                {train.origin.name} ({train.origin.code})
              </p>
              <p className="text-[11px] text-slate-500">{journeyDate}</p>
            </div>
          </div>

          {/* Duration Graphic (Col 4) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center px-4">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5" /> {train.duration}
            </span>
            <div className="w-full flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full border-2 border-[#213d77] bg-white"></div>
              <div className="flex-1 border-t-2 border-dashed border-slate-300 relative">
                <TrainIcon className="w-3.5 h-3.5 text-[#fb792b] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#fb792b]"></div>
            </div>
            <span className="text-[11px] text-slate-500 mt-1">
              {train.route.length} stops en route
            </span>
          </div>

          {/* Arrival Info (Col 4) */}
          <div className="md:col-span-4 flex items-start justify-start md:justify-end gap-3 text-left md:text-right">
            <div>
              <p className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                {train.arrivalTime}
              </p>
              <p className="text-xs font-bold text-slate-800">
                {train.destination.name} ({train.destination.code})
              </p>
              <p className="text-[11px] text-slate-500">Day 2 (Next Day)</p>
            </div>
          </div>
        </div>

        {/* 3. Class Availability Cards Grid */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
            Select Class & Availability ({selectedQuota} Quota)
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {train.classes.map((cls) => {
              const isSelected = selectedClass.className === cls.className;
              return (
                <div
                  key={cls.className}
                  onClick={() => setSelectedClass(cls)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#213d77] bg-blue-50/70 ring-2 ring-[#213d77]/30 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-sm text-[#213d77]">
                      {cls.className}
                    </span>
                    <span className="font-mono font-bold text-sm text-slate-900">
                      ₹{cls.fare.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 truncate mb-1">
                    {cls.classFullName}
                  </p>

                  <div className="text-xs">
                    {getStatusBadge(cls)}
                  </div>

                  {cls.chancePercentage && (
                    <p className="text-[10px] text-emerald-700 font-medium mt-1">
                      {cls.chancePercentage}% confirmation probability
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Action Banner for Selected Class */}
        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-700">
            <span className="font-bold text-slate-900">Selected: {selectedClass.classFullName} ({selectedClass.className})</span>
            <span className="mx-2 text-slate-400">·</span>
            <span>Status: </span>
            {getStatusBadge(selectedClass)}
            <span className="mx-2 text-slate-400">·</span>
            <span>Fare: <strong className="text-slate-900 font-mono">₹{selectedClass.fare}</strong></span>
          </div>

          <button
            onClick={() => onSelectBooking(train, selectedClass)}
            className="w-full sm:w-auto px-6 py-2 bg-[#fb792b] hover:bg-[#ea580c] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Book Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Train Route Schedule Modal */}
      {showRouteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="bg-[#213d77] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrainIcon className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm">
                  {train.number} - {train.name} Route Schedule
                </h3>
              </div>
              <button
                onClick={() => setShowRouteModal(false)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">#</th>
                    <th className="py-2 px-3">Station</th>
                    <th className="py-2 px-3">Arrives</th>
                    <th className="py-2 px-3">Departs</th>
                    <th className="py-2 px-3">Halt</th>
                    <th className="py-2 px-3">Dist (km)</th>
                    <th className="py-2 px-3">Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {train.route.map((st, index) => (
                    <tr key={st.stationCode} className="hover:bg-slate-50">
                      <td className="py-2 px-3 text-slate-400">{index + 1}</td>
                      <td className="py-2 px-3 font-semibold text-slate-800">
                        {st.stationName} ({st.stationCode})
                      </td>
                      <td className="py-2 px-3 font-mono">{st.arrivalTime}</td>
                      <td className="py-2 px-3 font-mono">{st.departureTime}</td>
                      <td className="py-2 px-3">{st.haltMinutes ? `${st.haltMinutes}m` : '-'}</td>
                      <td className="py-2 px-3 font-mono">{st.distanceKm}</td>
                      <td className="py-2 px-3 font-bold text-blue-900">PF #{st.platform}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowRouteModal(false)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
