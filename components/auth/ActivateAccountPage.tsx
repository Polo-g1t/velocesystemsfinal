'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import { VeloceLogo, VeloceBigEmblem } from './LoginPage';

// Red circular X error icon matching user mockups
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

interface ActivateAccountPageProps {
  initialErrorState?: boolean;
}

export const ActivateAccountPage: React.FC<ActivateAccountPageProps> = ({
  initialErrorState = false,
}) => {
  const { setAuthView, activateAccount } = useEMS();

  // Field states
  const [employeeId, setEmployeeId] = useState(initialErrorState ? '26-XXXX-XXX' : '');
  const [companyEmail, setCompanyEmail] = useState(initialErrorState ? 'employee@veloceglobal.com' : '');
  const [empIdError, setEmpIdError] = useState<string | null>(
    initialErrorState ? 'Employee ID/Number is invalid' : null
  );
  const [emailError, setEmailError] = useState<string | null>(
    initialErrorState ? 'Please enter a valid company email address' : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmpIdError(null);
    setEmailError(null);
    setSuccessBanner(null);

    let hasError = false;

    // Validation matching Screen 4
    if (!employeeId.trim() || employeeId === '26-XXXX-XXX') {
      setEmpIdError('Employee ID/Number is invalid');
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !companyEmail.trim() ||
      companyEmail === 'employee@veloceglobal.com' ||
      !emailRegex.test(companyEmail)
    ) {
      setEmailError('Please enter a valid company email address');
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);
    try {
      const res = await activateAccount(employeeId, companyEmail);
      if (!res.success) {
        if (res.message?.toLowerCase().includes('id')) {
          setEmpIdError('Employee ID/Number is invalid');
        } else {
          setEmailError(res.message || 'Please enter a valid company email address');
        }
      } else {
        setSuccessBanner(res.message || 'Default password sent to your email via EmailJS!');
        setTimeout(() => {
          setAuthView('first-login');
        }, 1600);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview helper state switchers
  const handleSetScreen3 = () => {
    setEmployeeId('');
    setCompanyEmail('');
    setEmpIdError(null);
    setEmailError(null);
    setSuccessBanner(null);
  };

  const handleSetScreen4 = () => {
    setEmployeeId('26-XXXX-XXX');
    setCompanyEmail('employee@veloceglobal.com');
    setEmpIdError('Employee ID/Number is invalid');
    setEmailError('Please enter a valid company email address');
    setSuccessBanner(null);
  };

  const handleFillPoloActivation = () => {
    setEmployeeId('EMP-1042');
    setCompanyEmail('gonzalezpolo256@gmail.com');
    setEmpIdError(null);
    setEmailError(null);
    setSuccessBanner(null);
  };

  const handleFillMarcusActivation = () => {
    setEmployeeId('MGR-2001');
    setCompanyEmail('j7core256@gmail.com');
    setEmpIdError(null);
    setEmailError(null);
    setSuccessBanner(null);
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

      {/* Main Grid: Left Activation Form & Right Welcome Card */}
      <div className="max-w-6xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-6">
        {/* Left Side: Activation Form */}
        <div className="lg:col-span-5 max-w-[400px] w-full mx-auto lg:mx-0">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-wide text-white mb-8">
            Activate Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Employee ID/Number Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Employee ID/Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => {
                    setEmployeeId(e.target.value);
                    if (empIdError) setEmpIdError(null);
                  }}
                  placeholder="26-XXXX-XXX"
                  className={`w-full bg-[#CFD3D8] text-slate-900 placeholder-[#7E8590] px-4 py-2.5 rounded-md text-sm font-medium focus:outline-none transition-all ${empIdError
                      ? 'border-2 border-[#E04B4B] pr-10'
                      : 'border border-transparent focus:ring-2 focus:ring-slate-400'
                    }`}
                />
                {empIdError && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                    <ValidationXIcon />
                  </div>
                )}
              </div>
              {empIdError && (
                <p className="text-[13px] font-medium text-[#E04B4B] mt-1.5 leading-tight">
                  {empIdError}
                </p>
              )}
            </div>

            {/* Company Email Field */}
            <div className={empIdError ? 'pt-1' : ''}>
              <label className="block text-sm font-medium text-white mb-2">
                Company Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={companyEmail}
                  onChange={(e) => {
                    setCompanyEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  placeholder="employee@veloceglobal.com"
                  className={`w-full bg-[#CFD3D8] text-slate-900 placeholder-[#7E8590] px-4 py-2.5 rounded-md text-sm font-medium focus:outline-none transition-all ${emailError
                      ? 'border-2 border-[#E04B4B] pr-10'
                      : 'border border-transparent focus:ring-2 focus:ring-slate-400'
                    }`}
                />
                {emailError && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                    <ValidationXIcon />
                  </div>
                )}
              </div>
              {emailError && (
                <p className="text-[13px] font-medium text-[#E04B4B] mt-1.5 leading-tight">
                  {emailError}
                </p>
              )}
            </div>

            {/* Success Banner if email dispatched */}
            {successBanner && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-200 text-xs font-medium leading-relaxed">
                ✓ {successBanner}
              </div>
            )}

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#8C8273] hover:bg-[#7F7567] active:bg-[#70675A] disabled:opacity-60 text-white font-medium py-2.5 rounded-lg text-sm transition-colors cursor-pointer shadow-sm tracking-wider flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SENDING VIA EMAILJS...
                  </>
                ) : (
                  'ACTIVATE'
                )}
              </button>
            </div>

            {/* Return to Login Link */}
            <div className="text-center pt-3">
              <button
                type="button"
                onClick={() => setAuthView('login')}
                className="text-sm text-white underline hover:text-slate-200 transition-colors cursor-pointer"
              >
                Go back to log in page?
              </button>
            </div>
          </form>

          {/* Quick Demo Toolbar for Screen 3 vs Screen 4 */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-400">Demo Fill:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={handleFillPoloActivation}
                className="px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 border border-blue-700 text-xs font-medium cursor-pointer"
                title="Polo C. Gonzalez (gonzalezpolo256@gmail.com)"
              >
                Polo (EMP-1042)
              </button>
              <button
                type="button"
                onClick={handleFillMarcusActivation}
                className="px-2.5 py-1 rounded bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 border border-amber-700 text-xs font-medium cursor-pointer"
                title="Marcus Rivera (j7core256@gmail.com)"
              >
                Marcus (MGR-2001)
              </button>
              <button
                type="button"
                onClick={handleSetScreen4}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${empIdError
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
