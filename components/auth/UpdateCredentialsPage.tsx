'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import { VeloceLogo } from './LoginPage';

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

// Green circular Checkmark icon matching Screen 7
const ValidationCheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9.5" stroke="#16A34A" strokeWidth="2.2" />
    <path
      d="M7.5 12.5L10.5 15.5L16.5 9.5"
      stroke="#16A34A"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

interface UpdateCredentialsPageProps {
  initialScreen?: 'screen5' | 'screen6' | 'screen7';
}

export const UpdateCredentialsPage: React.FC<UpdateCredentialsPageProps> = ({
  initialScreen = 'screen5',
}) => {
  const { setAuthView, updateFirstLoginCredentials, pendingActivationUser } = useEMS();

  // Field values
  const [username, setUsername] = useState(
    initialScreen === 'screen5'
      ? (pendingActivationUser?.role === 'manager' ? 'mrivera' : pendingActivationUser?.name === 'Polo C. Gonzalez' ? 'pgonzalez' : '')
      : 'Johndoe'
  );
  const [password, setPassword] = useState(
    initialScreen === 'screen6'
      ? 'Sdj2Kafdw!'
      : initialScreen === 'screen7'
      ? 'StrongP@ss123'
      : ''
  );
  const [confirmPassword, setConfirmPassword] = useState(
    initialScreen === 'screen7' ? 'Mismatch' : ''
  );

  // Error/Success state flags
  const [passwordState, setPasswordState] = useState<'idle' | 'invalid' | 'strong'>(
    initialScreen === 'screen6' ? 'invalid' : initialScreen === 'screen7' ? 'strong' : 'idle'
  );
  const [confirmState, setConfirmState] = useState<'idle' | 'mismatch'>(
    initialScreen === 'screen7' ? 'mismatch' : 'idle'
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live validator
  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (!val) {
      setPasswordState('idle');
      return;
    }

    // Check strength (8+ chars, upper, number, symbol)
    const isStrong =
      val.length >= 8 &&
      /[A-Z]/.test(val) &&
      /[0-9]/.test(val) &&
      /[^A-Za-z0-9]/.test(val);

    if (val === 'Sdj2Kafdw!') {
      setPasswordState('invalid');
    } else if (isStrong) {
      setPasswordState('strong');
    } else {
      setPasswordState('invalid');
    }

    if (confirmPassword && val !== confirmPassword) {
      setConfirmState('mismatch');
    } else if (confirmPassword && val === confirmPassword) {
      setConfirmState('idle');
    }
  };

  const handleConfirmPasswordChange = (val: string) => {
    setConfirmPassword(val);
    if (!val) {
      setConfirmState('idle');
      return;
    }
    if (val !== password) {
      setConfirmState('mismatch');
    } else {
      setConfirmState('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!username.trim()) {
      setErrorMessage('Username is required.');
      return;
    }

    if (!password) {
      setPasswordState('invalid');
      setErrorMessage('Please enter a new password.');
      return;
    }

    if (password.length < 8) {
      setPasswordState('invalid');
      setErrorMessage('New password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmState('mismatch');
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const defaultPass = pendingActivationUser?.defaultPassword || 'VeloceDefault#2026';
      const res = await updateFirstLoginCredentials(username.trim(), defaultPass, password);
      if (!res.success) {
        setErrorMessage(res.message || 'Failed to update credentials.');
      } else {
        setSuccessMessage('✓ Password & credentials updated successfully in Supabase! Redirecting to login...');
        setTimeout(() => {
          setAuthView('login');
        }, 1500);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1-Click State Switchers for Screen 5, Screen 6, Screen 7
  const handleSetScreen5 = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setPasswordState('idle');
    setConfirmState('idle');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSetScreen6 = () => {
    setUsername('Johndoe');
    setPassword('Sdj2Kafdw!');
    setConfirmPassword('');
    setPasswordState('invalid');
    setConfirmState('idle');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSetScreen7 = () => {
    setUsername('Johndoe');
    setPassword('StrongP@ssw0rd!');
    setConfirmPassword('Mismatch!');
    setPasswordState('strong');
    setConfirmState('mismatch');
    setShowPassword(false);
    setShowConfirmPassword(false);
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

      {/* Main Centered Content (Screens 5, 6, 7 have no right card!) */}
      <div className="w-full max-w-[420px] mx-auto my-auto py-8">
        {/* Centered Two-Line Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-wide text-white leading-tight uppercase">
            UPDATE USER<br />CREDENTIALS
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* USERNAME Field */}
          <div>
            <label className="block text-sm font-medium text-white mb-2 uppercase">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Johndoe"
              className="w-full bg-[#CFD3D8] text-slate-900 placeholder-[#7E8590] px-4 py-2.5 rounded-md text-sm font-medium focus:outline-none border border-transparent focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* PASSWORD Field */}
          <div className={passwordState === 'invalid' ? 'pt-1' : ''}>
            <label className="block text-sm font-medium text-white mb-2 uppercase">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Must be atleast 8 characters"
                className={`w-full bg-[#CFD3D8] text-slate-900 placeholder-[#7E8590] pl-4 pr-16 py-2.5 rounded-md text-sm font-medium focus:outline-none transition-all ${
                  passwordState === 'invalid'
                    ? 'border-2 border-[#E04B4B]'
                    : passwordState === 'strong'
                    ? 'border-2 border-[#16A34A]'
                    : 'border border-transparent focus:ring-2 focus:ring-slate-400'
                }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {passwordState === 'invalid' && <ValidationXIcon />}
                {passwordState === 'strong' && <ValidationCheckIcon />}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-600 hover:text-slate-900 focus:outline-none p-0.5 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            {passwordState === 'invalid' && (
              <p className="text-[13px] font-medium text-[#E04B4B] mt-1.5 leading-tight">
                Password is invalid
              </p>
            )}
            {passwordState === 'strong' && (
              <p className="text-[13px] font-medium text-[#16A34A] mt-1.5 leading-tight">
                Password strength, strong
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD Field */}
          <div className={passwordState !== 'idle' ? 'pt-1' : ''}>
            <label className="block text-sm font-medium text-white mb-2 uppercase">
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                placeholder="Confirm Password"
                className={`w-full bg-[#CFD3D8] text-slate-900 placeholder-[#7E8590] pl-4 pr-16 py-2.5 rounded-md text-sm font-medium focus:outline-none transition-all ${
                  confirmState === 'mismatch'
                    ? 'border-2 border-[#E04B4B]'
                    : 'border border-transparent focus:ring-2 focus:ring-slate-400'
                }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {confirmState === 'mismatch' && <ValidationXIcon />}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-600 hover:text-slate-900 focus:outline-none p-0.5 transition-colors cursor-pointer"
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            {confirmState === 'mismatch' && (
              <p className="text-[13px] font-medium text-[#E04B4B] mt-1.5 leading-tight">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Error & Success Feedback Banners */}
          {errorMessage && (
            <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-lg text-rose-200 text-xs font-medium leading-relaxed">
              ✕ {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-200 text-xs font-medium leading-relaxed">
              {successMessage}
            </div>
          )}

          {/* SAVE Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8C8273] hover:bg-[#7F7567] active:bg-[#70675A] disabled:opacity-60 text-white font-medium py-2.5 rounded-lg text-sm transition-colors cursor-pointer shadow-sm tracking-wider uppercase flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SAVING TO DATABASE...
                </>
              ) : (
                'SAVE'
              )}
            </button>
          </div>
        </form>

        {/* Quick Demo Toolbar for Screens 5, 6, 7 */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span className="font-medium text-slate-400">Preview States:</span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={handleSetScreen5}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                passwordState === 'idle' && confirmState === 'idle'
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
            >
              Screen 5 (Clean)
            </button>
            <button
              type="button"
              onClick={handleSetScreen6}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                passwordState === 'invalid'
                  ? 'bg-rose-900/90 text-rose-200 border border-rose-700 font-semibold'
                  : 'bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-900'
              }`}
            >
              Screen 6 (Invalid)
            </button>
            <button
              type="button"
              onClick={handleSetScreen7}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                passwordState === 'strong'
                  ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700 font-semibold'
                  : 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-900'
              }`}
            >
              Screen 7 (Strength/Mismatch)
            </button>
          </div>
        </div>

        {/* Return to Login link */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => setAuthView('login')}
            className="text-xs text-slate-400 underline hover:text-white transition-colors cursor-pointer"
          >
            ← Return to Login
          </button>
        </div>
      </div>

      {/* Footer Bottom Spacer */}
      <div className="text-[11px] text-slate-500/80 text-center py-1">
        © 2026 Veloce Systems Inc.
      </div>
    </div>
  );
};
