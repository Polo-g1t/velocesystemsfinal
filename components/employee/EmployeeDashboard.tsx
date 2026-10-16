'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import { VeloceLogo } from '../auth/LoginPage';
import {
  ClipboardList,
  Megaphone,
  Calendar,
  FileText,
  ChevronRight,
  CheckCircle2,
  Circle,
  Search,
} from 'lucide-react';

interface EmployeeDashboardProps {
  onNavigateTab?: (tab: string) => void;
  onOpenTaskDetails?: (taskId: string) => void;
  onOpenAnnouncement?: (annId: string) => void;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  onNavigateTab,
  onOpenTaskDetails,
  onOpenAnnouncement,
}) => {
  const {
    currentUser,
    currentRole,
    logout,
    setAuthView,
  } = useEMS();

  // Active navigation tab
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Attendance check-in state
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleToggleCheckIn = () => {
    if (!isCheckedIn) {
      setIsCheckedIn(true);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCheckInTime(`${timeStr} - July 6, 2026`);
    } else {
      setIsCheckedIn(false);
      setCheckInTime(null);
    }
  };

  // Screen 8 Mock Tasks matching exact screenshot
  const tasks = [
    {
      id: 'tsk-1',
      title: 'Improve website accessibility',
      dueDate: 'Due July 10, 2025',
      priority: 'High',
      priorityBg: 'bg-[#EF4444] text-white',
    },
    {
      id: 'tsk-2',
      title: 'Design landing page for client website',
      dueDate: 'Due July 10, 2025',
      priority: 'Medium',
      priorityBg: 'bg-[#FACC15] text-[#1F242D] font-semibold',
    },
    {
      id: 'tsk-3',
      title: 'Estimate development tasks',
      dueDate: 'Due July 10, 2025',
      priority: 'Medium',
      priorityBg: 'bg-[#FACC15] text-[#1F242D] font-semibold',
    },
    {
      id: 'tsk-4',
      title: 'Implement dark mode feature',
      dueDate: 'Due July 8, 2025',
      priority: 'Low',
      priorityBg: 'bg-[#4ADE80] text-[#1F242D] font-semibold',
    },
  ];

  // Screen 8 Mock Announcements matching exact screenshot
  const announcements = [
    {
      id: 'ann-1',
      title: 'Updated Remote Work & Flexible Hours Policy',
      date: 'July 10, 2026',
    },
    {
      id: 'ann-2',
      title: 'Updated Remote Work & Flexible Hours Policy',
      date: 'July 10, 2026',
    },
    {
      id: 'ann-3',
      title: 'Updated Remote Work & Flexible Hours Policy',
      date: 'July 10, 2026',
    },
  ];

  // Screen 8 Mock Leave Requests matching exact screenshot
  const leaveRequests = [
    {
      id: 'lr-1',
      title: 'Sick Leave',
      dateRange: 'July 14 - July 16, 2026 (3 days)',
      status: 'Pending',
      statusBg: 'bg-[#FACC15] text-[#1F242D] font-semibold',
    },
    {
      id: 'lr-2',
      title: 'Sick Leave',
      dateRange: 'July 14 - July 16, 2026 (3 days)',
      status: 'Approved',
      statusBg: 'bg-[#22C55E] text-white font-semibold',
    },
    {
      id: 'lr-3',
      title: 'Sick Leave',
      dateRange: 'July 14 - July 16, 2026 (3 days)',
      status: 'Rejected',
      statusBg: 'bg-[#EF4444] text-white font-semibold',
    },
  ];

  const navItems = [
    'Dashboard',
    'Announcements',
    'Tasks',
    'Attendance',
    'Leave Requests',
    'Setting',
  ];

  return (
    <div className="min-h-screen w-full bg-[#262B34] text-white flex flex-col font-sans select-none">
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 gap-8 lg:gap-10">
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-64 shrink-0 flex flex-col justify-between pt-2 pb-4">
          <div className="space-y-7">
            {/* Logo */}
            <div className="flex items-center gap-3.5">
              <VeloceLogo className="w-9 h-9" />
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                Veloce Systems
              </span>
            </div>

            {/* Search Input Box */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything"
                className="w-full bg-[#3B4250] text-slate-100 placeholder-[#9CA3AF] px-4 py-2.5 rounded-md text-sm font-normal focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-4 pt-1">
              {navItems.map((item) => {
                const isActive = activeNav === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setActiveNav(item);
                      if (onNavigateTab) onNavigateTab(item.toLowerCase());
                    }}
                    className={`block w-full text-left text-[15px] transition-colors cursor-pointer ${
                      isActive
                        ? 'font-bold text-white'
                        : 'font-normal text-[#D1D5DB] hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar: Divider & User Profile Card */}
          <div className="space-y-6 pt-8 border-t border-white/20">
            <div className="flex items-center gap-3.5 p-3 rounded-2xl border border-white/20 bg-white/[0.02]">
              {/* Profile Avatar */}
              <img
                src={currentUser?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"}
                alt={currentUser?.name || "User"}
                className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-white/20"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {currentUser?.name || 'Polo Gonzalez'}
                </p>
                <p className="text-xs text-[#9CA3AF] truncate">
                  {currentRole === 'manager' ? 'IT Department Manager' : (currentUser?.position || 'Frontend Software Engineer')}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT (2x2 GRID) ================= */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* 1. TOP-LEFT CARD: MY TASKS */}
          <div className="bg-[#20242B] rounded-[28px] p-6 sm:p-7 border border-white/5 shadow-xl space-y-5">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ClipboardList className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold tracking-tight text-white">
                  My Tasks
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab('tasks')}
                className="text-xs text-[#D1D5DB] hover:text-white transition-colors cursor-pointer"
              >
                View All Tasks →
              </button>
            </div>

            {/* Task Items List */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onOpenTaskDetails && onOpenTaskDetails(task.id)}
                  className="flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <Circle className="w-5 h-5 text-white/80 shrink-0 mt-0.5 group-hover:text-white" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-slate-200">
                        {task.title}
                      </p>
                      <p className="text-xs text-[#9CA3AF]">
                        {task.dueDate}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-md text-xs font-medium tracking-wide shrink-0 ${task.priorityBg}`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. TOP-RIGHT CARD: ANNOUNCEMENTS */}
          <div className="bg-[#20242B] rounded-[28px] p-6 sm:p-7 border border-white/5 shadow-xl space-y-5">
            {/* Card Header */}
            <div className="flex items-center gap-3 pb-1">
              <Megaphone className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold tracking-tight text-white">
                Announcements
              </h2>
            </div>

            {/* Announcement Items List */}
            <div className="space-y-5">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  onClick={() => onOpenAnnouncement && onOpenAnnouncement(ann.id)}
                  className="space-y-1 cursor-pointer group"
                >
                  <p className="text-sm font-medium text-white group-hover:text-slate-200 leading-snug">
                    {ann.title}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    {ann.date}
                  </p>
                </div>
              ))}
            </div>

            {/* View All Announcements Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab('announcements')}
                className="w-full py-2.5 rounded-lg border border-white/20 hover:border-white/40 bg-transparent text-sm font-medium text-white transition-colors cursor-pointer text-center"
              >
                View All Announcements
              </button>
            </div>
          </div>

          {/* 3. BOTTOM-LEFT CARD: ATTENDANCE */}
          <div className="bg-[#20242B] rounded-[28px] p-6 sm:p-7 border border-white/5 shadow-xl space-y-6">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold tracking-tight text-white">
                Attendance
              </h2>
            </div>

            {/* Inner Attendance Check-in Widget Box */}
            <div className="bg-transparent rounded-2xl border border-white/20 p-5 space-y-6">
              {/* Status Header */}
              <div className="flex items-center gap-4">
                <span
                  className={`w-5 h-5 rounded-full shrink-0 ${
                    isCheckedIn ? 'bg-[#22C55E]' : 'bg-[#EF4444]'
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    {isCheckedIn ? 'Checked In' : 'Not checked in'}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    {checkInTime || '6:00 AM - July 6,2026'}
                  </p>
                </div>
              </div>

              {/* Action Pill Button */}
              <button
                type="button"
                onClick={handleToggleCheckIn}
                className="w-full bg-[#363C47] hover:bg-[#3D4450] active:bg-[#323742] rounded-lg px-5 py-3 flex items-center justify-between text-sm transition-colors cursor-pointer"
              >
                <span
                  className={`font-medium ${
                    isCheckedIn ? 'text-amber-300' : 'text-[#4ADE80]'
                  }`}
                >
                  {isCheckedIn ? 'Check Out' : 'Check In'}
                </span>
                <CheckCircle2
                  className={`w-5 h-5 ${
                    isCheckedIn ? 'text-amber-300' : 'text-[#4ADE80]'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 4. BOTTOM-RIGHT CARD: MY LEAVE REQUESTS */}
          <div className="bg-[#20242B] rounded-[28px] p-6 sm:p-7 border border-white/5 shadow-xl space-y-5">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold tracking-tight text-white">
                My Leave Requests
              </h2>
            </div>

            {/* Leave Request Items List */}
            <div className="space-y-3">
              {leaveRequests.map((leave) => (
                <div
                  key={leave.id}
                  className="flex items-center justify-between p-3.5 rounded-lg border border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`px-3 py-1 rounded text-xs shrink-0 ${leave.statusBg}`}
                    >
                      {leave.status}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {leave.title}
                      </p>
                      <p className="text-xs text-[#9CA3AF] truncate">
                        {leave.dateRange}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-white/60 shrink-0" />
                </div>
              ))}
            </div>

            {/* Request Leave Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab('leaves')}
                className="w-full py-2.5 rounded-lg border border-white/20 hover:border-white/40 bg-transparent text-sm font-medium text-white transition-colors cursor-pointer text-center"
              >
                Request Leave
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
