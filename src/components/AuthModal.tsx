import React, { useState } from 'react';
import { Lock, Mail, User, X, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import type { UserAccount } from '../types/index.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Simulate secure Google Auth popup response
    setTimeout(() => {
      const mockGoogleUser: UserAccount = {
        id: `usr_g_${Date.now()}`,
        name: 'صانع محتوى عراقي',
        email: 'creator.iq@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&h=160&q=80',
        role: 'user',
        plan: 'free',
        scansUsedToday: 0,
        scansLimitToday: 3,
        scansUsedThisMonth: 0,
        scansLimitMonth: 90,
        totalScans: 0,
        referralCode: `SABR${Math.floor(Math.random() * 9000 + 1000)}`,
        referralCount: 2,
        bonusScans: 10,
        favoriteAccounts: ['khaby.lame', 'mrbeast'],
        createdAt: new Date().toISOString(),
      };
      setIsLoading(false);
      onLoginSuccess(mockGoogleUser);
      onClose();
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setTimeout(() => {
      const loggedUser: UserAccount = {
        id: `usr_${Date.now()}`,
        name: name || email.split('@')[0],
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name || email
        )}&background=00f2fe&color=030712`,
        role: 'user',
        plan: 'free',
        scansUsedToday: 0,
        scansLimitToday: 3,
        scansUsedThisMonth: 0,
        scansLimitMonth: 90,
        totalScans: 0,
        referralCode: `IQ${Math.floor(Math.random() * 9000 + 1000)}`,
        referralCount: 0,
        bonusScans: 5,
        favoriteAccounts: [],
        createdAt: new Date().toISOString(),
      };
      setIsLoading(false);
      onLoginSuccess(loggedUser);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-gray-950 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {mode === 'login' ? 'تسجيل الدخول إلى TK_SABR' : 'إنشاء حساب جديد في المنصة'}
          </h3>
          <p className="text-xs text-gray-400">
            احفظ سجلات الفحص والتقارير الذكية والمراقبة في لوحتك الشخصية
          </p>
        </div>

        {/* Google Sign-in button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-gray-900 hover:bg-gray-850 border border-gray-800 hover:border-gray-700 text-white font-medium text-xs flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md mb-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>المتابعة باستخدام Google</span>
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-[1px] bg-gray-800" />
          <span className="text-[11px] text-gray-500 font-mono">أو عبر البريد الإلكتروني</span>
          <div className="flex-1 h-[1px] bg-gray-800" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-gray-300 mb-1">الاسم الكامل</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أحمد علي"
                className="w-full h-11 px-3.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-gray-300 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              dir="ltr"
              className="w-full h-11 px-3.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-300 mb-1">كلمة المرور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              dir="ltr"
              className="w-full h-11 px-3.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-gray-900 border-gray-700 text-cyan-400"
              />
              <span>تذكرني على هذا الجهاز</span>
            </label>
            <button
              type="button"
              onClick={() => alert('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك.')}
              className="text-cyan-400 hover:underline"
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-gray-950 font-bold text-xs shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
            ) : mode === 'login' ? (
              <span>تسجيل الدخول</span>
            ) : (
              <span>إنشاء الحساب الآن</span>
            )}
          </button>
        </form>

        {/* Switch mode */}
        <div className="mt-4 pt-4 border-t border-gray-800 text-center text-xs text-gray-400">
          {mode === 'login' ? (
            <p>
              ليس لديك حساب بعد؟{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-cyan-400 hover:underline"
              >
                إنشاء حساب مجاني
              </button>
            </p>
          ) : (
            <p>
              لديك حساب بالفعل؟{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-cyan-400 hover:underline"
              >
                تسجيل الدخول
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
