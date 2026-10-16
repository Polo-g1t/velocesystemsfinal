'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';

// High-fidelity Veloce Shield Emblem SVG matching exact design mockup
export const VeloceEmblemPath = () => (
  <svg
    viewBox="0 0 320 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Outer Shield Frame with metallic border */}
    <path
      d="M160 38L56 86V142L40 162L62 178V204L160 278L258 204V86L160 38Z"
      fill="#282D36"
      stroke="#4A5260"
      strokeWidth="9"
      strokeLinejoin="round"
    />

    {/* Shield Facet - Left Dark Bevel */}
    <path
      d="M62 92L160 48V268L68 198V174L48 158L62 140V92Z"
      fill="#22262E"
    />

    {/* Shield Facet - Right Midtone Bevel */}
    <path
      d="M160 48L252 92V198L160 268V48Z"
      fill="#363C47"
    />

    {/* Inner Shield Cavity Fill */}
    <path
      d="M74 100L160 58L240 100V190L160 252L74 190V100Z"
      fill="#20242C"
    />

    {/* Central Dynamic Arrow / Lightning Motif */}
    <g filter="drop-shadow(0px 8px 14px rgba(0,0,0,0.55))">
      {/* 3D Arrow Head - Top Light Surface */}
      <path
        d="M256 74L176 80L194 112L256 74Z"
        fill="#828D9F"
      />
      {/* 3D Arrow Head - Bottom Right Surface */}
      <path
        d="M256 74L194 112L254 150L256 74Z"
        fill="#5D6675"
      />

      {/* Main Diagonal Arrow Shaft - Top Light Facet */}
      <path
        d="M194 112L132 174L104 148L88 174L148 234L166 216L218 164L194 112Z"
        fill="#707A8A"
      />

      {/* Shaft Lower Bevel / Shadow Edge */}
      <path
        d="M88 174L148 234L136 246L76 186L88 174Z"
        fill="#4A5260"
      />

      {/* Left Lightning Barb Point */}
      <path
        d="M104 148L88 174L60 162L82 142L104 148Z"
        fill="#5A6372"
      />

      {/* Inner Lower Shield Crest / Loop */}
      <path
        d="M148 234L160 222L196 186L210 200L160 250L136 226L148 234Z"
        fill="#535B69"
      />
      <path
        d="M196 186L210 200V160L196 186Z"
        fill="#667080"
      />
    </g>
  </svg>
);

export const VeloceLogo = ({ className = 'w-9 h-9' }: { className?: string }) => (
  <div className={`${className} shrink-0`}>
    <VeloceEmblemPath />
  </div>
);

export const VeloceBigEmblem = () => (
  <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center">
    <VeloceEmblemPath />
  </div>
);

// Red circular X error icon matching Screen 2
const ValidationXIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9.5" stroke="#E04B4B" strokeWidth="2.2" />
    <path
      d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5"
      stroke="#E04B4B"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

interface LoginPageProps {
  initialValidationState?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialValidationState = false }) => {
  const { login, setAuthView } = useEMS();

  // Form states
  const [username, setUsername] = useState(initialValidationState ? 'Jaden' : '');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(
    initialValidationState ? 'The username does not exist' : null
  );
  const [passwordError, setPasswordError] = useState<string | null>(
    initialValidationState ? 'Please enter your password' : null
  );

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError(null);
    setPasswordError(null);

    let hasError = false;

    if (!username.trim()) {
      setUsernameError('The username does not exist');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Please enter your password');
      hasError = true;
    }

    if (hasError) return;

    // Check credentials against registered employees / managers
    const res = await login(username, password);
    if (!res.success) {
      if (res.message?.toLowerCase().includes('password')) {
        setPasswordError('Incorrect password entered');
      } else {
        setUsernameError('The username does not exist');
      }
    }
  };

  // Demo helpers to instantly switch between Screen 1 and Screen 2
  const handleSetScreen1 = () => {
    setUsername('');
    setPassword('');
    setUsernameError(null);
    setPasswordError(null);
  };

  const handleSetScreen2 = () => {
    setUsername('Jaden');
    setPassword('');
    setUsernameError('The username does not exist');
    setPasswordError('Please enter your password');
  };

  const handleFillPoloEmployee = () => {
    setUsername('gonzalezpolo256@gmail.com');
    setPassword('VeloceDefault#2026');
    setUsernameError(null);
    setPasswordError(null);
  };

  const handleFillMarcusManager = () => {
    setUsername('j7core256@gmail.com');
    setPassword('ManagerDefault#2026');
    setUsernameError(null);
    setPasswordError(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#262B34] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-12 font-sans select-none">
      {/* Top Header Logo */}
      <div className="flex items-center gap-3.5">
        <VeloceLogo className="w-9 h-9 sm:w-10 sm:h-10" />
        <span className="text-2xl sm:text-[28px] font-bold tracking-tight text-white font-sans">
          Veloce Systems
        </span>
      </div>

      {/* Main Grid: Left Login Form & Right Welcome Card */}
      <div className="max-w-6xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-6">
        {/* Left Side: Login Form */}
        <div className="lg:col-span-5 max-w-[400px] w-full mx-auto lg:mx-0">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-wide text-white mb-8">
            WELCOME BACK!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Username or Company Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (usernameError) setUsernameError(null);
                  }}
                  placeholder={usernameError ? '' : 'pgonzalez or gonzalezpolo256@gmail.com'}
                  className={`w-full bg-[#CFD3D8] text-slate-900 placeholder-[#7E8590] px-4 py-2.5 rounded-md text-sm font-medium focus:outline-none transition-all ${usernameError
                    ? 'border-2 border-[#E04B4B] pr-10'
                    : 'border border-transparent focus:ring-2 focus:ring-slate-400'
                    }`}
                />
                {usernameError && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                    <ValidationXIcon />
                  </div>
                )}
              </div>
              {usernameError && (
                <p className="text-[13px] font-medium text-[#E04B4B] mt-1.5 leading-tight">
                  {usernameError}
                </p>
              )}
            </div>

            {/* Password Input Field */}
            <div className={usernameError ? 'pt-1' : ''}>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError(null);
                  }}
                  placeholder={passwordError ? '' : 'password'}
                  className={`w-full bg-[#CFD3D8] text-slate-900 placeholder-[#7E8590] px-4 py-2.5 rounded-md text-sm font-medium focus:outline-none transition-all ${passwordError
                    ? 'border-2 border-[#E04B4B] pr-10'
                    : 'border border-transparent focus:ring-2 focus:ring-slate-400'
                    }`}
                />
                {passwordError && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                    <ValidationXIcon />
                  </div>
                )}
              </div>
              {passwordError && (
                <p className="text-[13px] font-medium text-[#E04B4B] mt-1.5 leading-tight">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="w-full bg-[#8C8273] hover:bg-[#7F7567] active:bg-[#70675A] text-white font-medium py-2.5 rounded-lg text-sm transition-colors cursor-pointer shadow-sm"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => setAuthView('first-login')}
                className="w-full bg-[#8C8273] hover:bg-[#7F7567] active:bg-[#70675A] text-white font-medium py-2.5 rounded-lg text-sm transition-colors cursor-pointer shadow-sm"
              >
                Forgot Password
              </button>
            </div>

            {/* Activate Account Link */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setAuthView('activate')}
                className="text-sm text-white underline hover:text-slate-200 transition-colors cursor-pointer"
              >
                Activate account?
              </button>
            </div>
          </form>

          {/* Screen Switcher & Demo Helper Toolbar */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-400">Demo Fill:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={handleFillPoloEmployee}
                className="px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 border border-blue-700 text-xs font-medium cursor-pointer"
                title="Fill Polo C. Gonzalez (gonzalezpolo256@gmail.com)"
              >
                Polo (Employee)
              </button>
              <button
                type="button"
                onClick={handleFillMarcusManager}
                className="px-2.5 py-1 rounded bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 border border-amber-700 text-xs font-medium cursor-pointer"
                title="Fill Marcus Rivera (j7core256@gmail.com)"
              >
                Marcus (Manager)
              </button>
              <button
                type="button"
                onClick={handleSetScreen2}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${usernameError
                  ? 'bg-rose-900/90 text-rose-200 border border-rose-700 font-semibold'
                  : 'bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-900'
                  }`}
              >
                Error State
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Welcome Card */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end">
          <div className="w-full max-w-[480px] bg-[#20242B] rounded-[32px] p-8 sm:p-12 lg:p-14 flex flex-col items-center text-center shadow-xl border border-white/5 space-y-7">
            <VeloceBigEmblem />

            <div className="space-y-3.5">
              <h2 className="text-xl sm:text-[24px] font-extrabold tracking-wide text-white uppercase">
                WELCOME TO VELOCE SYSTEMS
              </h2>
              <p className="text-xs sm:text-[14px] text-[#D1D5DB] leading-relaxed max-w-[380px] mx-auto font-normal">
                At Veloce Systems, we build scalable, high-performance software solutions that power modern enterprises worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Spacer */}
      <div className="text-[11px] text-slate-500/80 text-center py-1">
        © 2026 Veloce Systems Inc.
      </div>
    </div>
  );
};
