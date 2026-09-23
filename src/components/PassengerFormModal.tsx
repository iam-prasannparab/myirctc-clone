import React, { useState } from 'react';
import { 
  X, 
  User, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Smartphone, 
  Train as TrainIcon, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Train, ClassAvailability, Passenger, Ticket, Station, QuotaType } from '../types';

interface PassengerFormModalProps {
  train: Train;
  selectedClass: ClassAvailability;
  journeyDate: string;
  selectedQuota: string;
  onClose: () => void;
  onBookingComplete: (ticket: Ticket) => void;
}

export const PassengerFormModal: React.FC<PassengerFormModalProps> = ({
  train,
  selectedClass,
  journeyDate,
  selectedQuota,
  onClose,
  onBookingComplete,
}) => {
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: 'p-1',
      name: '',
      age: 28,
      gender: 'MALE',
      berthPreference: 'LOWER',
      mealPreference: 'VEG',
    }
  ]);

  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [emailAddress, setEmailAddress] = useState('passenger@irctc.co.in');
  const [optTravelInsurance, setOptTravelInsurance] = useState(true);
  const [autoUpgradation, setAutoUpgradation] = useState(true);
  const [paymentMode, setPaymentMode] = useState<'IPAY' | 'UPI' | 'NETBANKING' | 'CARDS'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Add passenger
  const addPassenger = () => {
    if (passengers.length >= 4) {
      setErrorMsg('Maximum 4 passengers allowed per reservation form.');
      return;
    }
    setPassengers([
      ...passengers,
      {
        id: `p-${Date.now()}`,
        name: '',
        age: 25,
        gender: 'MALE',
        berthPreference: 'NO_CHOICE',
        mealPreference: 'VEG',
      }
    ]);
  };

  const removePassenger = (id: string) => {
    if (passengers.length <= 1) return;
    setPassengers(passengers.filter((p) => p.id !== id));
  };

  const updatePassenger = (id: string, field: keyof Passenger, value: any) => {
    setPassengers(
      passengers.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Calculations
  const baseTicketFare = selectedClass.fare * passengers.length;
  const reservationFee = 40 * passengers.length;
  const superfastFee = 45 * passengers.length;
  const insuranceAmount = optTravelInsurance ? 0.45 * passengers.length : 0;
  const gst = Math.round(baseTicketFare * 0.05);
  const totalAmount = baseTicketFare + reservationFee + superfastFee + insuranceAmount + gst;

  // Process Simulated Payment & Create Ticket
  const handleProceedPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    for (const p of passengers) {
      if (!p.name.trim()) {
        setErrorMsg('Please enter passenger name for all passengers.');
        return;
      }
    }

    if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number for ticket SMS updates.');
      return;
    }

    setErrorMsg('');
    setIsProcessing(true);

    // Simulate payment latency and ticket issuance
    setTimeout(() => {
      // Generate realistic 10-digit PNR
      const generatedPnr = String(Math.floor(1000000000 + Math.random() * 9000000000));
      const coachLetter = selectedClass.className === '1A' ? 'H' : selectedClass.className === '2A' ? 'A' : selectedClass.className === '3A' ? 'B' : selectedClass.className === '3E' ? 'M' : selectedClass.className === 'CC' ? 'C' : 'S';
      const coachNumber = Math.floor(1 + Math.random() * 5);
      const coachName = `${coachLetter}${coachNumber}`;

      const updatedPassengers = passengers.map((p, idx) => {
        const berthNum = 12 + idx * 2;
        const berthType = p.berthPreference !== 'NO_CHOICE' ? p.berthPreference.replace('_', ' ') : 'Lower Berth';
        return {
          ...p,
          allocatedCoach: coachName,
          allocatedBerth: berthNum,
          allocatedBerthType: berthType,
          bookingStatus: `CNF ${coachName} ${berthNum}`,
          currentStatus: `CNF ${coachName} ${berthNum}`,
        };
      });

      const newTicket: Ticket = {
        pnr: generatedPnr,
        trainNumber: train.number,
        trainName: train.name,
        journeyDate,
        bookingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        fromStation: train.origin,
        toStation: train.destination,
        boardingStation: train.origin,
        selectedClass: selectedClass.className,
        quota: selectedQuota as QuotaType,
        passengers: updatedPassengers,
        baseFare: baseTicketFare,
        reservationCharge: reservationFee,
        superfastCharge: superfastFee,
        tatkalCharge: 0,
        cateringCharge: 0,
        gst,
        insuranceAmount,
        totalFare: totalAmount,
        chartStatus: 'CHART PREPARED',
        transactionId: `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`,
      };

      setIsProcessing(false);
      onBookingComplete(newTicket);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-auto overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-[#213d77] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrainIcon className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-base">
                Passenger Details & Reservation Form
              </h3>
              <p className="text-xs text-blue-200">
                {train.number} - {train.name} | {train.origin.code} ➔ {train.destination.code} | Class: {selectedClass.className}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border-l-4 border-rose-600 p-3 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleProceedPayment} className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Section 1: Passenger List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-[#fb792b]" />
                <span>Passenger Information (Max 4)</span>
              </h4>
              <button
                type="button"
                onClick={addPassenger}
                className="text-xs font-semibold text-[#213d77] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Passenger</span>
              </button>
            </div>

            <div className="space-y-3">
              {passengers.map((p, index) => (
                <div
                  key={p.id}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">
                      Passenger #{index + 1}
                    </span>
                    {passengers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePassenger(p.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove passenger"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                    {/* Name (Col 4) */}
                    <div className="sm:col-span-4">
                      <label className="block text-slate-600 font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="As per Aadhaar / Govt ID"
                        value={p.name}
                        onChange={(e) => updatePassenger(p.id, 'name', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-medium focus:ring-1 focus:ring-[#213d77] outline-none"
                        required
                      />
                    </div>

                    {/* Age (Col 2) */}
                    <div className="sm:col-span-2">
                      <label className="block text-slate-600 font-medium mb-1">
                        Age *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="110"
                        value={p.age}
                        onChange={(e) => updatePassenger(p.id, 'age', Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-medium focus:ring-1 focus:ring-[#213d77] outline-none"
                        required
                      />
                    </div>

                    {/* Gender (Col 2) */}
                    <div className="sm:col-span-2">
                      <label className="block text-slate-600 font-medium mb-1">
                        Gender
                      </label>
                      <select
                        value={p.gender}
                        onChange={(e) => updatePassenger(p.id, 'gender', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded font-medium bg-white outline-none"
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="TRANSGENDER">Transgender</option>
                      </select>
                    </div>

                    {/* Berth Preference (Col 2) */}
                    <div className="sm:col-span-2">
                      <label className="block text-slate-600 font-medium mb-1">
                        Berth
                      </label>
                      <select
                        value={p.berthPreference}
                        onChange={(e) => updatePassenger(p.id, 'berthPreference', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded font-medium bg-white outline-none"
                      >
                        <option value="NO_CHOICE">No Choice</option>
                        <option value="LOWER">Lower</option>
                        <option value="MIDDLE">Middle</option>
                        <option value="UPPER">Upper</option>
                        <option value="SIDE_LOWER">Side Lower</option>
                        <option value="SIDE_UPPER">Side Upper</option>
                        <option value="WINDOW_SIDE">Window</option>
                      </select>
                    </div>

                    {/* Food Preference (Col 2) */}
                    <div className="sm:col-span-2">
                      <label className="block text-slate-600 font-medium mb-1">
                        Meal
                      </label>
                      <select
                        value={p.mealPreference}
                        onChange={(e) => updatePassenger(p.id, 'mealPreference', e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded font-medium bg-white outline-none"
                      >
                        <option value="VEG">Veg</option>
                        <option value="NON_VEG">Non-Veg</option>
                        <option value="NO_FOOD">No Food</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Contact Details & Preferences */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Contact Details for Ticket Confirmation
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Mobile Number (SMS updates)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-2 bg-slate-200 text-slate-600 rounded-l border border-r-0 border-slate-300 font-mono font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    maxLength={10}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-r font-medium outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-medium outline-none"
                  required
                />
              </div>
            </div>

            {/* Travel Insurance & Auto-upgradation */}
            <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={optTravelInsurance}
                  onChange={(e) => setOptTravelInsurance(e.target.checked)}
                  className="rounded text-[#213d77]"
                />
                <span className="text-slate-700 font-medium">
                  Opt for Travel Insurance (₹0.45/person) - Covers death/disability up to ₹10 Lakhs.
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoUpgradation}
                  onChange={(e) => setAutoUpgradation(e.target.checked)}
                  className="rounded text-[#213d77]"
                />
                <span className="text-slate-700 font-medium">
                  Consider for Auto-Upgradation without any additional fare.
                </span>
              </label>
            </div>
          </div>

          {/* Section 3: Payment Gateway Selector */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Payment Gateway
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMode('UPI')}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  paymentMode === 'UPI'
                    ? 'border-[#213d77] bg-blue-50 ring-2 ring-[#213d77]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <QrCode className="w-5 h-5 text-[#213d77] mb-1" />
                <span className="text-xs font-bold text-slate-800">BHIM UPI / QR</span>
                <span className="text-[10px] text-emerald-700 font-medium">₹0 Conv. Fee</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('IPAY')}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  paymentMode === 'IPAY'
                    ? 'border-[#213d77] bg-blue-50 ring-2 ring-[#213d77]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#fb792b] mb-1" />
                <span className="text-xs font-bold text-slate-800">IRCTC iPay</span>
                <span className="text-[10px] text-slate-500">Fast Auto Refund</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('NETBANKING')}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  paymentMode === 'NETBANKING'
                    ? 'border-[#213d77] bg-blue-50 ring-2 ring-[#213d77]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <Building2 className="w-5 h-5 text-indigo-600 mb-1" />
                <span className="text-xs font-bold text-slate-800">Net Banking</span>
                <span className="text-[10px] text-slate-500">SBI, HDFC, ICICI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('CARDS')}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  paymentMode === 'CARDS'
                    ? 'border-[#213d77] bg-blue-50 ring-2 ring-[#213d77]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <Smartphone className="w-5 h-5 text-slate-700 mb-1" />
                <span className="text-xs font-bold text-slate-800">Debit / Credit</span>
                <span className="text-[10px] text-slate-500">Visa, RuPay, MC</span>
              </button>
            </div>
          </div>

          {/* Section 4: Fare Breakdown & Submit */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs space-y-1 w-full sm:w-auto">
              <div className="flex justify-between sm:justify-start gap-4 text-slate-700">
                <span>Base Fare ({passengers.length} pax):</span>
                <span className="font-mono font-bold">₹{baseTicketFare}</span>
              </div>
              <div className="flex justify-between sm:justify-start gap-4 text-slate-500 text-[11px]">
                <span>Reservation & SF Charges:</span>
                <span className="font-mono">₹{reservationFee + superfastFee}</span>
              </div>
              <div className="flex justify-between sm:justify-start gap-4 text-slate-500 text-[11px]">
                <span>GST (5%) & Insurance:</span>
                <span className="font-mono">₹{gst + insuranceAmount}</span>
              </div>
              <div className="flex justify-between sm:justify-start gap-4 text-sm font-extrabold text-[#213d77] pt-1 border-t border-amber-200">
                <span>Total Amount Payable:</span>
                <span className="font-mono text-base text-[#fb792b]">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3 bg-[#fb792b] hover:bg-[#ea580c] disabled:bg-slate-400 text-white font-extrabold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Confirming PNR & Seat...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>PAY ₹{totalAmount.toLocaleString()} & BOOK TICKET</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
