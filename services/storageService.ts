
import { Habit, Goal, UserProfile } from '../types.ts';

const HABITS_KEY = 'iron_will_habits';
const GOALS_KEY = 'iron_will_goals';
const THEME_KEY = 'iron_will_theme';
const PROFILE_KEY = 'iron_will_profile';

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=Ami+Parbo&background=6366f1&color=fff&size=128"; 

export const storage = {
  getHabits: (): Habit[] => {
    const data = localStorage.getItem(HABITS_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveHabits: (habits: Habit[]) => {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  },
  getGoals: (): Goal[] => {
    const data = localStorage.getItem(GOALS_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveGoals: (goals: Goal[]) => {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  },
  getTheme: (): string => {
    return localStorage.getItem(THEME_KEY) || 'dark';
  },
  saveTheme: (theme: string) => {
    localStorage.setItem(THEME_KEY, theme);
  },
  getProfile: (): UserProfile => {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : { 
      name: 'যোদ্ধা', 
      joinedDate: new Date().toISOString(),
      avatarUrl: DEFAULT_AVATAR,
      ironWillStartDate: new Date().toISOString()
    };
  },
  saveProfile: (profile: UserProfile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },
  resetIronWill: () => {
    const profile = storage.getProfile();
    profile.ironWillStartDate = new Date().toISOString();
    storage.saveProfile(profile);
    return profile.ironWillStartDate;
  }
};
