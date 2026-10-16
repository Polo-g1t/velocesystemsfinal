'use client';

import React, { useState, useEffect } from 'react';
import { useEMS } from '../../context/EMSContext';
import { LoginPage } from './LoginPage';
import { ActivateAccountPage } from './ActivateAccountPage';
import { UpdateCredentialsPage } from './UpdateCredentialsPage';

export const AuthContainer: React.FC = () => {
  const { authView, setAuthView } = useEMS();

  // Active Phase 1 Screen selector: 1 to 7
  const [activeScreen, setActiveScreen] = useState<number>(1);

  // Sync activeScreen when authView changes naturally
  useEffect(() => {
    if (authView === 'login') {
      if (activeScreen > 2) setActiveScreen(1);
    } else if (authView === 'activate') {
      if (activeScreen < 3 || activeScreen > 4) setActiveScreen(3);
    } else if (authView === 'first-login') {
      if (activeScreen < 5) setActiveScreen(5);
    }
  }, [authView]);

  const handleSelectScreen = (screenNumber: number) => {
    setActiveScreen(screenNumber);
    if (screenNumber === 1 || screenNumber === 2) {
      setAuthView('login');
    } else if (screenNumber === 3 || screenNumber === 4) {
      setAuthView('activate');
    } else if (screenNumber >= 5) {
      setAuthView('first-login');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#262B34] flex flex-col justify-between">
      {/* Active Phase 1 Screen View */}
      <div className="flex-1 flex flex-col">
        {activeScreen === 1 && <LoginPage key="screen-1" />}
        {activeScreen === 2 && <LoginPage key="screen-2" initialValidationState={true} />}
        {activeScreen === 3 && <ActivateAccountPage key="screen-3" />}
        {activeScreen === 4 && <ActivateAccountPage key="screen-4" initialErrorState={true} />}
        {activeScreen === 5 && <UpdateCredentialsPage key="screen-5" initialScreen="screen5" />}
        {activeScreen === 6 && <UpdateCredentialsPage key="screen-6" initialScreen="screen6" />}
        {activeScreen === 7 && <UpdateCredentialsPage key="screen-7" initialScreen="screen7" />}
      </div>

      {/* Global Phase 1 Screen Navigator (Sticky Bottom Bar for Instant Verification) */}
      <div className="sticky bottom-0 z-50 w-full bg-[#1A1E26]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-semibold text-white tracking-wide">
            PHASE 1 SCREEN SELECTOR:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => handleSelectScreen(1)}
            className={`px-3 py-1.5 rounded-md transition-all font-medium cursor-pointer ${
              activeScreen === 1
                ? 'bg-[#8C8273] text-white shadow font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Screen 1: Login
          </button>

          <button
            type="button"
            onClick={() => handleSelectScreen(2)}
            className={`px-3 py-1.5 rounded-md transition-all font-medium cursor-pointer ${
              activeScreen === 2
                ? 'bg-rose-900 text-rose-100 border border-rose-700 shadow font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Screen 2: Login Error
          </button>

          <button
            type="button"
            onClick={() => handleSelectScreen(3)}
            className={`px-3 py-1.5 rounded-md transition-all font-medium cursor-pointer ${
              activeScreen === 3
                ? 'bg-[#8C8273] text-white shadow font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Screen 3: Activate
          </button>

          <button
            type="button"
            onClick={() => handleSelectScreen(4)}
            className={`px-3 py-1.5 rounded-md transition-all font-medium cursor-pointer ${
              activeScreen === 4
                ? 'bg-rose-900 text-rose-100 border border-rose-700 shadow font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Screen 4: Activate Error
          </button>

          <button
            type="button"
            onClick={() => handleSelectScreen(5)}
            className={`px-3 py-1.5 rounded-md transition-all font-medium cursor-pointer ${
              activeScreen === 5
                ? 'bg-[#8C8273] text-white shadow font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Screen 5: Update Creds
          </button>

          <button
            type="button"
            onClick={() => handleSelectScreen(6)}
            className={`px-3 py-1.5 rounded-md transition-all font-medium cursor-pointer ${
              activeScreen === 6
                ? 'bg-rose-900 text-rose-100 border border-rose-700 shadow font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Screen 6: Invalid Pass
          </button>

          <button
            type="button"
            onClick={() => handleSelectScreen(7)}
            className={`px-3 py-1.5 rounded-md transition-all font-medium cursor-pointer ${
              activeScreen === 7
                ? 'bg-emerald-900 text-emerald-100 border border-emerald-700 shadow font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Screen 7: Feedback
          </button>
        </div>
      </div>
    </div>
  );
};
