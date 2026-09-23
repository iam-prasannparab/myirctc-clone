import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Sparkles, 
  Clock, 
  Train as TrainIcon, 
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { DISHA_FAQS } from '../data/mockRailData';

interface AskDishaWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWarCenter: () => void;
}

export const AskDishaWidget: React.FC<AskDishaWidgetProps> = ({
  isOpen,
  onClose,
  onOpenWarCenter,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; action?: 'war' }>>([
    {
      sender: 'bot',
      text: 'Namaste! I am Ask DISHA 2.0, your Indian Railways virtual assistant. How may I assist you with train booking, PNR status, refund rules, or Tomcat WAR deployment?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const newMsgs = [...messages, { sender: 'user' as const, text }];
    setMessages(newMsgs);
    setInputText('');

    // Formulate response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botReply = '';
      let action: 'war' | undefined = undefined;

      if (lower.includes('tatkal')) {
        botReply = 'Tatkal booking timings:\n• AC Classes (1A, 2A, 3A, 3E, CC, EC): Opens at 10:00 AM IST.\n• Non-AC Classes (Sleeper, 2S): Opens at 11:00 AM IST.\nBooking starts 1 day prior to the train\'s departure from source station.';
      } else if (lower.includes('refund') || lower.includes('cancel')) {
        botReply = 'Cancellation & Refund Rules:\n• >48 hrs before departure: AC 1A/EC ₹240, 2A ₹200, 3A/CC ₹180, SL ₹120 flat clerkage.\n• 48h to 12h: 25% of fare.\n• 12h to 4h: 50% of fare.\n• After chart preparation: File TDR online for eligible refund.';
      } else if (lower.includes('rac')) {
        botReply = 'RAC (Reservation Against Cancellation) guarantees travel on the train with a sitting berth (shared lower berth). If confirmed passengers cancel, RAC gets automatically upgraded to full sleeping berth without extra fee.';
      } else if (lower.includes('war') || lower.includes('tomcat') || lower.includes('deploy')) {
        botReply = 'To deploy this portal on Apache Tomcat:\n1. Click "Tomcat WAR Suite" or use our 1-click WAR builder.\n2. Download "irctc.war".\n3. Copy into "$CATALINA_HOME/webapps/".\n4. Tomcat auto-expands and hosts at http://localhost:8080/irctc!';
        action = 'war';
      } else if (lower.includes('insurance')) {
        botReply = 'Optional travel insurance costs just ₹0.45 per passenger and provides coverage up to ₹10,00,000 for death/permanent total disability during the rail journey.';
      } else {
        botReply = `Regarding "${text}": You can check live train schedules, book tickets, check 10-digit PNR status, or package this app as a Tomcat WAR archive right from the top navigation!`;
      }

      setMessages([...newMsgs, { sender: 'bot', text: botReply, action }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col h-[520px]">
      
      {/* Header */}
      <div className="bg-[#213d77] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#fb792b] to-amber-300 flex items-center justify-center text-white shadow">
            <Bot className="w-5 h-5 text-[#08284c]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm">Ask DISHA 2.0</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-[10px] text-blue-200">IRCTC AI Virtual Assistant</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${
              m.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
              m.sender === 'user' ? 'bg-slate-300 text-slate-700' : 'bg-[#213d77] text-amber-300'
            }`}>
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3 rounded-xl max-w-[80%] whitespace-pre-line leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#213d77] text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-tl-none'
              }`}
            >
              {m.text}

              {m.action === 'war' && (
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenWarCenter();
                    }}
                    className="w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-[11px] flex items-center justify-center gap-1"
                  >
                    <span>Open Tomcat WAR Exporter</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Suggestions Chips */}
      <div className="p-2 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        {DISHA_FAQS.map((faq, fIdx) => (
          <button
            key={fIdx}
            onClick={() => handleSendMessage(faq.q)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#213d77] rounded-full whitespace-nowrap shrink-0 border border-slate-200 transition-colors"
          >
            {faq.q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask DISHA anything about trains..."
          className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#213d77] outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-[#fb792b] hover:bg-[#ea580c] text-white rounded-lg transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
