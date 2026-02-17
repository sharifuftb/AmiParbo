
export interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted: string | null; // ISO Date
  createdAt: string;
  category: string;
  targetDays: number;
  durationMinutes?: number; // Total duration in minutes
  remainingSeconds?: number; // Current countdown state
  isTimerRunning?: boolean;
}

export interface Goal {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface UserProfile {
  name: string;
  joinedDate: string;
  avatarUrl: string; // URL or base64 of the logo/user pic
}

export type Theme = 'light' | 'dark';
