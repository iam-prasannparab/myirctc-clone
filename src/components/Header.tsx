import React, { useState, useEffect } from 'react';
import { 
  Train, 
  Search, 
  Compass, 
  UtensilsCrossed, 
  Hotel, 
  PackageCheck, 
  Ticket as TicketIcon, 
  Menu, 
  X, 
  User, 
  Clock, 
  Phone, 
  AlertCircle,
  HelpCircle,
  DownloadCloud
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  myTicketsCount: number;
  onOpenAuth: () => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onOpenDisha: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  myTicketsCount,
  onOpenAuth,
  user,
  onLogout,
  onOpenDisha,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  // Live IST Server Clock simulation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as DD-MMM-YYYY [HH:mm:ss]
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = String(now.getDate()).padStart(2, '0');
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${day}-${month}-${year} [${hrs}:${mins}:${secs}]`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'trains', label: 'Book Ticket', icon: Train },
    { id: 'pnr', label: 'PNR Status', icon: Search },
    { id: 'running', label: 'Live Train Status', icon: Compass },
    { id: 'ecatering', label: 'Food On Track', icon: UtensilsCrossed },
    { id: 'tourism', label: 'Holiday & Rooms', icon: Hotel },
    { id: 'my-tickets', label: `My Tickets (${myTicketsCount})`, icon: TicketIcon },
    { id: 'war-center', label: 'Tomcat WAR Suite', icon: PackageCheck, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      {/* 1. Top Emergency / IRCTC Utility Ribbon */}
      <div className="bg-[#08284c] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Alerts ticker */}
          <div className="flex items-center gap-2 overflow-hidden text-slate-200">
            <span className="bg-[#fb792b] text-white font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0">
              IRCTC Alerts
            </span>
            <span className="truncate text-xs text-slate-300">
              Vande Bharat Special bookings active · Free cancellation available 48h prior · Direct Tomcat WAR export enabled
            </span>
          </div>

          {/* Right: Live IST Clock & IRCTC Utilities */}
          <div className="flex items-center gap-4 shrink-0 text-slate-300">
            <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-amber-300">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentTime}</span>
            </div>

            <div className="hidden lg:flex items-center gap-1 text-[11px]">
              <Phone className="w-3 h-3 text-[#fb792b]" />
              <span>Support: 14646</span>
            </div>

            {/* Language toggle */}
            <button 
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className="text-[11px] font-semibold hover:text-white px-1.5 py-0.5 rounded border border-slate-600 hover:border-slate-400 transition-colors"
            >
              {lang === 'EN' ? 'हिन्दी' : 'English'}
            </button>

            {/* User Auth */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
                <span className="text-xs font-medium text-emerald-400 truncate max-w-[120px]">
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={onLogout}
                  className="text-[11px] text-slate-400 hover:text-rose-300 underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1 text-xs font-semibold text-white bg-[#fb792b] hover:bg-[#ea580c] px-2.5 py-0.5 rounded transition-colors"
              >
                <User className="w-3 h-3" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Brand Bar & Nav */}
      <div className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          
          {/* Official IRCTC + Indian Railways Logo Lockup */}
          <div 
            onClick={() => setActiveTab('trains')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Indian Railways Emblem styled icon */}
            <div className="w-10 h-10 rounded-full bg-[#213d77] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
              <Train className="w-6 h-6 text-amber-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-[#213d77]">
                  IRCTC
                </span>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-blue-100 text-[#213d77] font-bold">
                  NextGen
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                INDIAN RAILWAYS · भारतीय रेल
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#213d77] text-white shadow-sm'
                      : item.highlight
                      ? 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                      : 'text-slate-700 hover:text-[#213d77] hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : item.highlight ? 'text-amber-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Quick WAR Download & Ask Disha Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('war-center')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md shadow-sm transition-colors whitespace-nowrap"
              title="Apache Tomcat WAR Deployment Suite"
            >
              <DownloadCloud className="w-4 h-4" />
              <span>Export Tomcat WAR</span>
            </button>

            <button
              onClick={onOpenDisha}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#213d77] border border-[#213d77] hover:bg-blue-50 rounded-md transition-colors whitespace-nowrap"
            >
              <HelpCircle className="w-4 h-4 text-[#fb792b]" />
              <span className="hidden sm:inline">Ask</span> DISHA 2.0
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#213d77] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                setActiveTab('war-center');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-md"
            >
              <DownloadCloud className="w-4 h-4" />
              <span>Deploy to Tomcat (WAR)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
