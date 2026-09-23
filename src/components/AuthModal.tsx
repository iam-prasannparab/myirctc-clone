import React, { useState } from 'react';
import { X, User, Lock, RefreshCw, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('rahul_railway');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K9P2');

  if (!isOpen) return null;

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: isRegister ? fullName : 'Rahul Sharma',
      email: isRegister ? email : 'rahul.sharma@example.com',
    });
    onClose();
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess({
      name: 'Rahul Sharma',
      email: 'rahul.sharma@irctc.co.in',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#213d77] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">
              {isRegister ? 'Register IRCTC Account' : 'IRCTC User Login'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {isRegister && (
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Full Name (as per Govt ID)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#213d77] outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-bold mb-1">
              User Name / IRCTC Login ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter IRCTC username"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded font-medium focus:ring-1 focus:ring-[#213d77] outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded font-medium focus:ring-1 focus:ring-[#213d77] outline-none"
                required
              />
            </div>
          </div>

          {/* Captcha Box */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Verification Code (Captcha)
            </label>
            <div className="flex items-center gap-2">
              <div className="bg-slate-200 border border-slate-300 px-4 py-1.5 rounded font-mono font-extrabold text-base tracking-widest text-[#213d77] select-none line-through">
                {captchaCode}
              </div>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="p-2 border border-slate-300 rounded hover:bg-slate-100 text-slate-600"
                title="Refresh Captcha"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Type characters"
                className="flex-1 px-3 py-2 border border-slate-300 rounded uppercase font-mono font-bold outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#fb792b] hover:bg-[#ea580c] text-white font-bold rounded-lg shadow transition-colors cursor-pointer text-sm"
          >
            {isRegister ? 'COMPLETE REGISTRATION' : 'SIGN IN TO IRCTC'}
          </button>

          {/* Demo 1-Click Login Shortcut */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="text-[#213d77] font-bold hover:underline flex items-center gap-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Quick Demo Sign-In</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-slate-500 hover:text-slate-900 underline"
            >
              {isRegister ? 'Already have account? Sign In' : 'New User? Register here'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
