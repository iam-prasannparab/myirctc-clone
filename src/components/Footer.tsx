import React from 'react';
import { ShieldCheck, Phone, Mail, Award, ExternalLink, PackageCheck } from 'lucide-react';

interface FooterProps {
  onOpenWarCenter: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWarCenter }) => {
  return (
    <footer className="bg-[#08284c] text-slate-300 mt-16 border-t-4 border-[#fb792b]">
      {/* 1. Helpline and Key Features Band */}
      <div className="bg-[#0c3461] py-6 px-4 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-blue-900/50 text-[#fb792b]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Railway Helpline: 139</p>
              <p className="text-slate-400">Security, Medical & General Inquiries</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-blue-900/50 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">100% Safe Payments</p>
              <p className="text-slate-400">IRCTC iPay, UPI & PCI-DSS 256-Bit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-blue-900/50 text-amber-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Customer Care Mail</p>
              <p className="text-slate-400">care@irctc.co.in (24x7 Support)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-emerald-900/40 text-emerald-300">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Tomcat Deployment Ready</p>
              <button 
                onClick={onOpenWarCenter}
                className="text-amber-400 hover:text-amber-300 underline font-medium text-xs text-left"
              >
                Generate .war archive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Directory Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
        <div>
          <h4 className="text-white font-bold mb-3 tracking-wide uppercase text-[11px] text-[#fb792b]">
            IRCTC Trains & Booking
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li><span className="hover:text-white cursor-pointer">General Ticket Booking</span></li>
            <li><span className="hover:text-white cursor-pointer">Tatkal / Premium Tatkal</span></li>
            <li><span className="hover:text-white cursor-pointer">Connecting Journey Booking</span></li>
            <li><span className="hover:text-white cursor-pointer">Foreign Tourist Quota</span></li>
            <li><span className="hover:text-white cursor-pointer">Special Trains & Vande Bharat</span></li>
            <li><span className="hover:text-white cursor-pointer">Train Schedule & Route Map</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 tracking-wide uppercase text-[11px] text-[#fb792b]">
            Enquiries & Tracking
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li><span className="hover:text-white cursor-pointer">PNR Status & Probability</span></li>
            <li><span className="hover:text-white cursor-pointer">Live Train Running Status (NTES)</span></li>
            <li><span className="hover:text-white cursor-pointer">Seat Availability Calendar</span></li>
            <li><span className="hover:text-white cursor-pointer">Fare Breakdown & Concessions</span></li>
            <li><span className="hover:text-white cursor-pointer">Coach Position & Composition</span></li>
            <li><span className="hover:text-white cursor-pointer">File TDR / Refund Tracking</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 tracking-wide uppercase text-[11px] text-[#fb792b]">
            IRCTC Services & Stays
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li><span className="hover:text-white cursor-pointer">E-Catering (Meal on Seat)</span></li>
            <li><span className="hover:text-white cursor-pointer">Station Retiring Rooms & Dorms</span></li>
            <li><span className="hover:text-white cursor-pointer">Bharat Gaurav Tourist Trains</span></li>
            <li><span className="hover:text-white cursor-pointer">Maharajas Express Luxury Train</span></li>
            <li><span className="hover:text-white cursor-pointer">Air Ticketing & Bus Booking</span></li>
            <li><span className="hover:text-white cursor-pointer">Travel Insurance Claims</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 tracking-wide uppercase text-[11px] text-[#fb792b]">
            DevOps & Tomcat WAR
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li>
              <button onClick={onOpenWarCenter} className="text-emerald-400 hover:underline">
                Generate irctc.war
              </button>
            </li>
            <li>
              <button onClick={onOpenWarCenter} className="hover:text-white">
                Inspect WEB-INF/web.xml
              </button>
            </li>
            <li>
              <button onClick={onOpenWarCenter} className="hover:text-white">
                Tomcat 9, 10 & 11 Setup Guide
              </button>
            </li>
            <li>
              <span className="text-slate-400">CLI: npm run build:war</span>
            </li>
            <li className="pt-2">
              <span className="inline-block bg-slate-800 text-amber-300 px-2 py-1 rounded text-[10px] font-mono border border-slate-700">
                Jakarta Servlet 5.0 Compatible
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Legal, Security & CRIS Emblem */}
      <div className="border-t border-slate-800 bg-[#051c37] py-6 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Designed & Maintained with CRIS (Centre for Railway Information Systems)</span>
          </div>

          <p className="text-[11px]">
            Copyright © 2026 - IRCTC. All Rights Reserved. Indian Railways Catering & Tourism Corporation Ltd.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Terms & Conditions</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Refund Rules</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
