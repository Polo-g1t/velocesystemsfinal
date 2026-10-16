export type UserRole = 'employee' | 'manager';

export interface UserProfile {
  id: string;
  employeeNumber: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  avatarUrl: string;
  address: string;
  joinDate: string;
  isActivated: boolean;
  defaultPasswordChanged: boolean;
  leaveBalances: {
    vacation: number;
    sick: number;
    emergency: number;
  };
}

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assignedBy: string;
  assignedTo: string[]; // Employee IDs
  status: TaskStatus;
  submissionNotes?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt?: string;
}

export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'On Leave';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  shift: string;
  timeIn: string;
  timeOut: string;
  status: AttendanceStatus;
  remarks?: string;
}

export type LeaveType = 'Vacation' | 'Sick' | 'Maternity/Paternity' | 'Bereavement' | 'Emergency';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeePosition: string;
  employeeEmail: string;
  type: LeaveType;
  dateFiled: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export type AnnouncementType = 'System' | 'Meeting' | 'Advisory' | 'Update' | 'Reminder';
export type AnnouncementStatus = 'Active' | 'Scheduled' | 'Archived';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  postedBy: string;
  department: string;
  datePosted: string;
  status: AnnouncementStatus;
  scheduledDate?: string;
  isBookmarkedBy: string[];
  readBy: string[];
  attachments?: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'task' | 'leave' | 'announcement' | 'system';
  targetTab?: string;
}
