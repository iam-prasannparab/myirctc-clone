import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Calendar, 
  MapPin, 
  Search, 
  ShieldAlert, 
  Sparkles, 
  Compass, 
  FileSpreadsheet, 
  SlidersHorizontal,
  PackageCheck
} from 'lucide-react';
import { MAJOR_STATIONS, QUOTAS, TRAIN_CLASSES } from '../data/mockRailData';
import { Station } from '../types';

interface TrainSearchFormProps {
  fromStation: Station;
  toStation: Station;
  setFromStation: (st: Station) => void;
  setToStation: (st: Station) => void;
  journeyDate: string;
  setJourneyDate: (d: string) => void;
  selectedClass: string;
  setSelectedClass: (c: string) => void;
  selectedQuota: string;
  setSelectedQuota: (q: string) => void;
  onSearch: () => void;
  onNavigateTab: (tab: string) => void;
}

export const TrainSearchForm: React.FC<TrainSearchFormProps> = ({
  fromStation,
  toStation,
  setFromStation,
  setToStation,
  journeyDate,
  setJourneyDate,
  selectedClass,
  setSelectedClass,
  selectedQuota,
  setSelectedQuota,
  onSearch,
  onNavigateTab,
}) => {
  const [fromQuery, setFromQuery] = useState(fromStation.name);
  const [toQuery, setToQuery] = useState(toStation.name);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  // Checkbox filters
  const [isFlexibleDate, setIsFlexibleDate] = useState(false);
  const [isDivyangConcession, setIsDivyangConcession] = useState(false);
  const [isAvailableBerthOnly, setIsAvailableBerthOnly] = useState(false);
  const [isRailwayPass, setIsRailwayPass] = useState(false);

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
    setFromQuery(toStation.name);
    setToQuery(temp.name);
  };

  const filteredFromStations = MAJOR_STATIONS.filter(
    (s) =>
      s.name.toLowerCase().includes(fromQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(fromQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(fromQuery.toLowerCase())
  );

  const filteredToStations = MAJOR_STATIONS.filter(
    (s) =>
      s.name.toLowerCase().includes(toQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(toQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(toQuery.toLowerCase())
  );

  // Date shortcuts
  const setQuickDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setJourneyDate(`${yyyy}-${mm}-${dd}`);
  };

  return (
    <div className="relative">
      {/* Background Hero Banner */}
      <div className="bg-gradient-to-r from-[#08284c] via-[#103b70] to-[#213d77] pt-8 pb-20 px-4 sm:px-6 shadow-inner text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 text-[#fb792b] font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Official Indian Railways Ticketing Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              Book Train Tickets & Live Train Status
            </h1>
            <p className="text-sm text-slate-300">
              Check PNR, seat availability in Vande Bharat, Rajdhani, Shatabdi & Mail/Express trains with instant confirmation prediction.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="hidden lg:flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-xs">
            <div className="border-r border-white/20 pr-4">
              <p className="text-slate-300">Daily Bookings</p>
              <p className="text-xl font-bold font-mono text-amber-300">14.8 Lakh+</p>
            </div>
            <div className="border-r border-white/20 pr-4">
              <p className="text-slate-300">Active Trains</p>
              <p className="text-xl font-bold font-mono text-emerald-300">13,520</p>
            </div>
            <div>
              <p className="text-slate-300">Tomcat Deployment</p>
              <p className="text-xl font-bold font-mono text-blue-300">.WAR Ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main IRCTC Booking Card Floating Over Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-5 sm:p-7">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-6 bg-[#fb792b] rounded-sm"></div>
              <h2 className="text-base sm:text-lg font-bold text-[#213d77] uppercase tracking-wide">
                BOOK TICKET
              </h2>
            </div>

            {/* Date Quick Shortcuts */}
            <div className="hidden md:flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">Quick Dates:</span>
              <button
                type="button"
                onClick={() => setQuickDate(0)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setQuickDate(1)}
                className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#213d77] font-semibold rounded"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => setQuickDate(2)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded"
              >
                Day After
              </button>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch();
            }}
            className="space-y-5"
          >
            {/* Grid 1: Origin, Swap, Destination, Journey Date */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              
              {/* Origin Station (Col 4) */}
              <div className="md:col-span-4 relative">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  FROM (ORIGIN STATION)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#fb792b] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fromQuery}
                    onChange={(e) => {
                      setFromQuery(e.target.value);
                      setShowFromSuggestions(true);
                    }}
                    onFocus={() => setShowFromSuggestions(true)}
                    placeholder="Enter station name or code"
                    className="w-full pl-9 pr-3 py-2.5 text-sm font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#213d77] focus:border-transparent outline-none uppercase"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {fromStation.code}
                  </span>
                </div>

                {/* Suggestions Dropdown */}
                {showFromSuggestions && (
                  <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-xl max-h-56 overflow-y-auto">
                    {filteredFromStations.slice(0, 8).map((st) => (
                      <div
                        key={st.code}
                        onClick={() => {
                          setFromStation(st);
                          setFromQuery(`${st.name} - ${st.code}`);
                          setShowFromSuggestions(false);
                        }}
                        className="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b border-slate-100 last:border-0"
                      >
                        <div>
                          <p className="font-bold text-slate-800">{st.name}</p>
                          <p className="text-[11px] text-slate-500">{st.city}, {st.state}</p>
                        </div>
                        <span className="font-mono font-bold bg-[#213d77] text-white px-2 py-0.5 rounded text-[11px]">
                          {st.code}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Station Swap Button (Col 1) */}
              <div className="md:col-span-1 flex justify-center pb-1">
                <button
                  type="button"
                  onClick={swapStations}
                  className="p-2.5 bg-slate-100 hover:bg-[#213d77] hover:text-white text-slate-600 rounded-full transition-colors border border-slate-300 shadow-sm"
                  title="Swap Origin and Destination"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </div>

              {/* Destination Station (Col 4) */}
              <div className="md:col-span-4 relative">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  TO (DESTINATION STATION)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={toQuery}
                    onChange={(e) => {
                      setToQuery(e.target.value);
                      setShowToSuggestions(true);
                    }}
                    onFocus={() => setShowToSuggestions(true)}
                    placeholder="Enter station name or code"
                    className="w-full pl-9 pr-3 py-2.5 text-sm font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#213d77] focus:border-transparent outline-none uppercase"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {toStation.code}
                  </span>
                </div>

                {/* Suggestions Dropdown */}
                {showToSuggestions && (
                  <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-xl max-h-56 overflow-y-auto">
                    {filteredToStations.slice(0, 8).map((st) => (
                      <div
                        key={st.code}
                        onClick={() => {
                          setToStation(st);
                          setToQuery(`${st.name} - ${st.code}`);
                          setShowToSuggestions(false);
                        }}
                        className="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b border-slate-100 last:border-0"
                      >
                        <div>
                          <p className="font-bold text-slate-800">{st.name}</p>
                          <p className="text-[11px] text-slate-500">{st.city}, {st.state}</p>
                        </div>
                        <span className="font-mono font-bold bg-[#213d77] text-white px-2 py-0.5 rounded text-[11px]">
                          {st.code}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Journey Date (Col 3) */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  DATE OF JOURNEY
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#213d77] outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Grid 2: Class, Quota, Search CTA */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end pt-2">
              
              {/* Class Selection */}
              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  ALL CLASSES / CATEGORY
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs font-semibold border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#213d77] outline-none"
                >
                  {TRAIN_CLASSES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quota Selection */}
              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  QUOTA SELECTION
                </label>
                <select
                  value={selectedQuota}
                  onChange={(e) => setSelectedQuota(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs font-semibold border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#213d77] outline-none"
                >
                  {QUOTAS.map((q) => (
                    <option key={q.code} value={q.code}>
                      {q.name} ({q.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="md:col-span-4">
                <button
                  type="submit"
                  className="w-full py-2.5 px-6 text-sm font-bold text-white bg-[#fb792b] hover:bg-[#ea580c] rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>SEARCH TRAINS</span>
                </button>
              </div>
            </div>

            {/* IRCTC Checkbox Options */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600 font-medium">
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={isDivyangConcession}
                  onChange={(e) => setIsDivyangConcession(e.target.checked)}
                  className="rounded text-[#213d77] focus:ring-0"
                />
                <span>Person With Disability Concession</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={isFlexibleDate}
                  onChange={(e) => setIsFlexibleDate(e.target.checked)}
                  className="rounded text-[#213d77] focus:ring-0"
                />
                <span>Flexible With Date (±3 Days)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={isAvailableBerthOnly}
                  onChange={(e) => setIsAvailableBerthOnly(e.target.checked)}
                  className="rounded text-[#213d77] focus:ring-0"
                />
                <span>Train with Available Berth</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={isRailwayPass}
                  onChange={(e) => setIsRailwayPass(e.target.checked)}
                  className="rounded text-[#213d77] focus:ring-0"
                />
                <span>Railway Pass Concession</span>
              </label>
            </div>
          </form>
        </div>

        {/* Quick Rail Utility Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div
            onClick={() => onNavigateTab('pnr')}
            className="bg-white p-3.5 rounded-lg border border-slate-200 hover:border-[#213d77] hover:shadow-md cursor-pointer transition-all flex items-center gap-3 group"
          >
            <div className="p-2.5 rounded-lg bg-blue-50 text-[#213d77] group-hover:bg-[#213d77] group-hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">PNR Enquiry</p>
              <p className="text-[11px] text-slate-500">Check current seat status</p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('running')}
            className="bg-white p-3.5 rounded-lg border border-slate-200 hover:border-[#213d77] hover:shadow-md cursor-pointer transition-all flex items-center gap-3 group"
          >
            <div className="p-2.5 rounded-lg bg-amber-50 text-[#fb792b] group-hover:bg-[#fb792b] group-hover:text-white transition-colors">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Live Train Status</p>
              <p className="text-[11px] text-slate-500">Real-time GPS delay track</p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('ecatering')}
            className="bg-white p-3.5 rounded-lg border border-slate-200 hover:border-[#213d77] hover:shadow-md cursor-pointer transition-all flex items-center gap-3 group"
          >
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">E-Catering Meals</p>
              <p className="text-[11px] text-slate-500">Delivery directly to seat</p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('war-center')}
            className="bg-emerald-50/80 p-3.5 rounded-lg border border-emerald-300 hover:border-emerald-600 hover:shadow-md cursor-pointer transition-all flex items-center gap-3 group"
          >
            <div className="p-2.5 rounded-lg bg-emerald-600 text-white group-hover:scale-105 transition-transform">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-950">Tomcat WAR Builder</p>
              <p className="text-[11px] text-emerald-700">Deploy .war on Apache Tomcat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
