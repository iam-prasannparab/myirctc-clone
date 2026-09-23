/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TrainSearchForm } from './components/TrainSearchForm';
import { TrainCard } from './components/TrainCard';
import { PassengerFormModal } from './components/PassengerFormModal';
import { TicketModal } from './components/TicketModal';
import { PnrStatusView } from './components/PnrStatusView';
import { RunningStatusView } from './components/RunningStatusView';
import { ECateringView } from './components/ECateringView';
import { TourismView } from './components/TourismView';
import { TomcatWarCenter } from './components/TomcatWarCenter';
import { MyTicketsView } from './components/MyTicketsView';
import { AskDishaWidget } from './components/AskDishaWidget';
import { AuthModal } from './components/AuthModal';

import { MAJOR_STATIONS, MOCK_TRAINS, MOCK_TICKETS } from './data/mockRailData';
import { Station, Train, ClassAvailability, Ticket } from './types';
import { Train as TrainIcon, SlidersHorizontal, CheckCircle, PackageCheck } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('trains');
  
  // Search Form State
  const [fromStation, setFromStation] = useState<Station>(MAJOR_STATIONS[0]); // NDLS
  const [toStation, setToStation] = useState<Station>(MAJOR_STATIONS[2]); // MMCT
  const [journeyDate, setJourneyDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedQuota, setSelectedQuota] = useState<string>('GN');
  
  // Trains Catalog State
  const [searchResults, setSearchResults] = useState<Train[]>(MOCK_TRAINS);

  // Tickets & Session State
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@irctc.co.in',
  });

  // Modals & Floating Widgets State
  const [bookingSelection, setBookingSelection] = useState<{ train: Train; selectedClass: ClassAvailability } | null>(null);
  const [viewingTicket, setViewingTicket] = useState<Ticket | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dishaOpen, setDishaOpen] = useState(false);
  const [cateringInitialPnr, setCateringInitialPnr] = useState<string | undefined>(undefined);

  // Filter Search Action
  const handleSearchTrains = () => {
    setActiveTab('trains');
    // If specific class selected, filter
    if (selectedClass !== 'All') {
      const filtered = MOCK_TRAINS.filter((t) =>
        t.classes.some((c) => c.className === selectedClass)
      );
      setSearchResults(filtered.length > 0 ? filtered : MOCK_TRAINS);
    } else {
      setSearchResults(MOCK_TRAINS);
    }
  };

  // Start Booking Flow
  const handleSelectBooking = (train: Train, sClass: ClassAvailability) => {
    setBookingSelection({ train, selectedClass: sClass });
  };

  // Complete Booking
  const handleBookingComplete = (newTicket: Ticket) => {
    setTickets([newTicket, ...tickets]);
    setBookingSelection(null);
    setViewingTicket(newTicket);
  };

  // Order Food Trigger
  const handleOrderFood = (pnr: string) => {
    setCateringInitialPnr(pnr);
    if (viewingTicket) setViewingTicket(null);
    setActiveTab('ecatering');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 antialiased font-sans">
      {/* 1. IRCTC Dual Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        myTicketsCount={tickets.length}
        onOpenAuth={() => setAuthModalOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
        onOpenDisha={() => setDishaOpen(true)}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 pb-16">
        
        {/* VIEW 1: Trains Search & Listing */}
        {activeTab === 'trains' && (
          <div>
            <TrainSearchForm
              fromStation={fromStation}
              toStation={toStation}
              setFromStation={setFromStation}
              setToStation={setToStation}
              journeyDate={journeyDate}
              setJourneyDate={setJourneyDate}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedQuota={selectedQuota}
              setSelectedQuota={setSelectedQuota}
              onSearch={handleSearchTrains}
              onNavigateTab={setActiveTab}
            />

            {/* Train Results List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>{searchResults.length} Trains available from</span>
                    <span className="text-[#213d77]">{fromStation.name} ({fromStation.code})</span>
                    <span>to</span>
                    <span className="text-[#213d77]">{toStation.name} ({toStation.code})</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Journey Date: <strong className="text-slate-800">{journeyDate}</strong> | Quota: <strong className="text-slate-800">{selectedQuota}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Quick Filters:</span>
                  <button
                    onClick={() => setSearchResults(MOCK_TRAINS.filter(t => t.type === 'VANDE BHARAT' || t.type === 'RAJDHANI'))}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-700"
                  >
                    Vande Bharat & Rajdhani
                  </button>
                  <button
                    onClick={() => setSearchResults(MOCK_TRAINS)}
                    className="px-2.5 py-1 text-xs bg-blue-50 hover:bg-blue-100 rounded font-semibold text-[#213d77]"
                  >
                    Show All
                  </button>
                </div>
              </div>

              {/* Train Cards */}
              <div className="space-y-4">
                {searchResults.map((train) => (
                  <TrainCard
                    key={train.number}
                    train={train}
                    journeyDate={journeyDate}
                    selectedQuota={selectedQuota}
                    onSelectBooking={handleSelectBooking}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PNR Status */}
        {activeTab === 'pnr' && (
          <PnrStatusView onOrderFood={handleOrderFood} />
        )}

        {/* VIEW 3: Live Train Status */}
        {activeTab === 'running' && (
          <RunningStatusView />
        )}

        {/* VIEW 4: E-Catering / Food On Track */}
        {activeTab === 'ecatering' && (
          <ECateringView initialPnr={cateringInitialPnr} />
        )}

        {/* VIEW 5: Tourism & Retiring Rooms */}
        {activeTab === 'tourism' && (
          <TourismView />
        )}

        {/* VIEW 6: My Tickets */}
        {activeTab === 'my-tickets' && (
          <MyTicketsView
            tickets={tickets}
            onViewTicket={(t) => setViewingTicket(t)}
            onOrderFood={handleOrderFood}
            onBookNew={() => setActiveTab('trains')}
          />
        )}

        {/* VIEW 7: Tomcat WAR Deployment Suite */}
        {activeTab === 'war-center' && (
          <TomcatWarCenter />
        )}
      </main>

      {/* 3. Official IRCTC Footer */}
      <Footer onOpenWarCenter={() => setActiveTab('war-center')} />

      {/* 4. Modals & Widgets */}
      
      {/* Booking Form Modal */}
      {bookingSelection && (
        <PassengerFormModal
          train={bookingSelection.train}
          selectedClass={bookingSelection.selectedClass}
          journeyDate={journeyDate}
          selectedQuota={selectedQuota}
          onClose={() => setBookingSelection(null)}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {/* Electronic Reservation Slip (Ticket) Modal */}
      {viewingTicket && (
        <TicketModal
          ticket={viewingTicket}
          onClose={() => setViewingTicket(null)}
          onOrderFood={handleOrderFood}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />

      {/* Floating Ask DISHA 2.0 Assistant */}
      <AskDishaWidget
        isOpen={dishaOpen}
        onClose={() => setDishaOpen(false)}
        onOpenWarCenter={() => setActiveTab('war-center')}
      />

      {/* Floating Ask Disha Launcher Bubble if closed */}
      {!dishaOpen && (
        <button
          onClick={() => setDishaOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#213d77] to-[#08284c] text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 border-2 border-amber-400 group cursor-pointer"
          title="Ask DISHA 2.0"
        >
          <div className="w-8 h-8 rounded-full bg-[#fb792b] flex items-center justify-center text-white font-bold text-xs">
            IRCTC
          </div>
          <div className="hidden sm:block text-left text-xs pr-1">
            <p className="font-extrabold text-amber-300 leading-tight">Ask DISHA 2.0</p>
            <p className="text-[10px] text-slate-300">Railway Virtual Assistant</p>
          </div>
        </button>
      )}
    </div>
  );
}
