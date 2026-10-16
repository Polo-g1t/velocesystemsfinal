'use client';

import React, { useState, useEffect } from 'react';
import { EMSProvider, useEMS } from '../context/EMSContext';
import { LoginPage } from './auth/LoginPage';
import { ActivateAccountPage } from './auth/ActivateAccountPage';
import { UpdateCredentialsPage } from './auth/UpdateCredentialsPage';
import { EmployeeDashboard } from './employee/EmployeeDashboard';

function MainApp() {
  const {
    isLoggedIn,
    authView,
    setAuthView,
    logout,
  } = useEMS();

  // Active Screen Selector: 1 to 8
  const [selectedScreen, setSelectedScreen] = useState<number>(8);

  // Sync state when natural login / view changes occur
  useEffect(() => {
    if (isLoggedIn && authView === 'app') {
      setSelectedScreen(8);
    } else if (authView === 'login') {
      if (selectedScreen > 2) setSelectedScreen(1);
    } else if (authView === 'activate') {
      if (selectedScreen < 3 || selectedScreen > 4) setSelectedScreen(3);
    } else if (authView === 'first-login') {
      if (selectedScreen < 5 || selectedScreen > 7) setSelectedScreen(5);
    }
  }, [isLoggedIn, authView]);

  const handleSelectScreen = (screenNum: number) => {
    setSelectedScreen(screenNum);
    if (screenNum === 1 || screenNum === 2) {
      setAuthView('login');
    } else if (screenNum === 3 || screenNum === 4) {
      setAuthView('activate');
    } else if (screenNum >= 5 && screenNum <= 7) {
      setAuthView('first-login');
    } else if (screenNum === 8) {
      setAuthView('app');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#262B34] flex flex-col justify-between select-none">
      {/* Active Screen Display */}
      <div className="flex-1 flex flex-col">
        {selectedScreen === 1 && <LoginPage key="screen-1" />}
        {selectedScreen === 2 && <LoginPage key="screen-2" initialValidationState={true} />}
        {selectedScreen === 3 && <ActivateAccountPage key="screen-3" />}
        {selectedScreen === 4 && <ActivateAccountPage key="screen-4" initialErrorState={true} />}
        {selectedScreen === 5 && <UpdateCredentialsPage key="screen-5" initialScreen="screen5" />}
        {selectedScreen === 6 && <UpdateCredentialsPage key="screen-6" initialScreen="screen6" />}
        {selectedScreen === 7 && <UpdateCredentialsPage key="screen-7" initialScreen="screen7" />}
        {selectedScreen === 8 && <EmployeeDashboard key="screen-8" />}
      </div>

      {/* Global Screen Selector (Sticky Bottom Bar for Instant Verification) */}
      <div className="sticky bottom-0 z-50 w-full bg-[#1A1E26]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-semibold text-white tracking-wide">
            EMS SCREEN SELECTOR:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => handleSelectScreen(1)}
            className={`px-3 py-1.5 rounded-md transition-all font-medium cursor-pointer ${
              selectedScreen === 1
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
              selectedScreen === 2
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
              selectedScreen === 3
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
              selectedScreen === 4
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
              selectedScreen === 5
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
              selectedScreen === 6
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
              selectedScreen === 7
                ? 'bg-rose-900 text-rose-100 border border-rose-700 shadow font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Screen 7: Feedback
          </button>

          <button
            type="button"
            onClick={() => handleSelectScreen(8)}
            className={`px-3 py-1.5 rounded-md transition-all font-medium cursor-pointer ${
              selectedScreen === 8
                ? 'bg-emerald-800 text-emerald-100 border border-emerald-600 shadow font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Screen 8: Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AppContainer() {
  return (
    <EMSProvider>
      <MainApp />
    </EMSProvider>
  );
}
