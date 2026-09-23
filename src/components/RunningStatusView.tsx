import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Train as TrainIcon, 
  RefreshCw, 
  Radio 
} from 'lucide-react';
import { MOCK_TRAINS } from '../data/mockRailData';
import { Train } from '../types';

export const RunningStatusView: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState<Train>(MOCK_TRAINS[0]);
  const [trainQuery, setTrainQuery] = useState(MOCK_TRAINS[0].number);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = trainQuery.toLowerCase().trim();
    const found = MOCK_TRAINS.find(
      (t) =>
        t.number.includes(query) ||
        t.name.toLowerCase().includes(query)
    );
    if (found) {
      setSelectedTrain(found);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="bg-[#08284c] text-white p-6 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#fb792b] flex items-center justify-center text-white">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Live Train Running Status (NTES)
            </h1>
            <p className="text-xs text-slate-300">
              National Train Enquiry System · Real-time satellite GPS tracking & platform updates
            </p>
          </div>
        </div>
      </div>

      {/* Train Selector / Search Bar */}
      <div className="bg-white border-x border-b border-slate-200 p-6 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
              Enter Train Number or Name
            </label>
            <input
              type="text"
              value={trainQuery}
              onChange={(e) => setTrainQuery(e.target.value)}
              placeholder="e.g. 12952, Vande Bharat, Rajdhani..."
              className="w-full px-4 py-2.5 text-sm font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#213d77] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-2.5 bg-[#fb792b] hover:bg-[#ea580c] text-white font-bold text-sm rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            <span>TRACK TRAIN</span>
          </button>
        </form>

        {/* Quick Popular Trains */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Popular Trains:</span>
          {MOCK_TRAINS.map((t) => (
            <button
              key={t.number}
              type="button"
              onClick={() => {
                setTrainQuery(t.number);
                setSelectedTrain(t);
              }}
              className={`px-2.5 py-1 rounded border text-xs font-semibold transition-colors ${
                selectedTrain.number === t.number
                  ? 'bg-[#213d77] text-white border-[#213d77]'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {t.number} - {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Live Train Status Telemetry Display */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
        
        {/* Train Info & Live Status Banner */}
        <div className="bg-slate-50 border-b border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-[#213d77] font-mono">
                {selectedTrain.number}
              </span>
              <span className="text-base font-bold text-slate-900">
                {selectedTrain.name}
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-[#213d77]">
                {selectedTrain.type}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Runs from: <strong>{selectedTrain.origin.name}</strong> to <strong>{selectedTrain.destination.name}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-800 text-xs font-bold">
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>RUNNING ON TIME</span>
            </div>

            <button
              onClick={handleRefresh}
              className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-600"
              title="Refresh GPS location"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Current Live Position Highlight */}
        <div className="bg-amber-50/80 border-b border-amber-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-[#fb792b] text-white">
              <TrainIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-sm">
                Departed {selectedTrain.route[1]?.stationName || selectedTrain.origin.name}
              </p>
              <p className="text-slate-600">
                Next stop: <strong className="text-slate-900">{selectedTrain.route[2]?.stationName || selectedTrain.destination.name}</strong> in ~42 km (Est. Arrival in 28 mins)
              </p>
            </div>
          </div>

          <span className="text-[11px] text-slate-500 font-mono">
            GPS synced 1 min ago
          </span>
        </div>

        {/* Route Stations Timeline */}
        <div className="p-6 overflow-x-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
            Station Halts & Live Telemetry
          </h3>

          <div className="relative border-l-2 border-slate-300 ml-4 pl-6 space-y-8">
            {selectedTrain.route.map((st, index) => {
              const isFirst = index === 0;
              const isLast = index === selectedTrain.route.length - 1;
              const isPassed = st.status === 'PASSED';
              const isCurrent = st.status === 'CURRENT';

              return (
                <div key={st.stationCode} className="relative group">
                  {/* Timeline bullet */}
                  <div
                    className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 transition-all ${
                      isCurrent
                        ? 'bg-[#fb792b] border-[#213d77] ring-4 ring-orange-200 scale-125'
                        : isPassed
                        ? 'bg-emerald-600 border-white'
                        : 'bg-white border-slate-400'
                    }`}
                  />

                  {/* Card Content */}
                  <div className={`p-4 rounded-lg border transition-all ${
                    isCurrent
                      ? 'bg-blue-50/70 border-[#213d77] shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            {st.stationName}
                          </span>
                          <span className="font-mono text-xs font-extrabold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                            {st.stationCode}
                          </span>
                          <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                            Platform #{st.platform}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Distance: {st.distanceKm} km · Halt: {st.haltMinutes > 0 ? `${st.haltMinutes} mins` : 'Origin/Dest'}
                        </p>
                      </div>

                      {/* Timings */}
                      <div className="flex items-center gap-6 text-xs text-right">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Scheduled</p>
                          <p className="font-mono font-bold text-slate-700">
                            {st.arrivalTime} - {st.departureTime}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Status</p>
                          {isCurrent ? (
                            <span className="font-bold text-[#fb792b] animate-pulse">
                              AT STATION
                            </span>
                          ) : isPassed ? (
                            <span className="font-bold text-emerald-700">
                              DEPARTED ON TIME
                            </span>
                          ) : (
                            <span className="font-medium text-slate-500">
                              EXPECTED ON TIME
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
