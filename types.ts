
export interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted: string | null; // ISO Date
  createdAt: string;
  category: string;
  targetDays: number;
  durationMinutes?: number; 
  remainingSeconds?: number; 
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
  avatarUrl: string;
  ironWillStartDate: string; // The timestamp for the main streak
}

export type Theme = 'light' | 'dark';
