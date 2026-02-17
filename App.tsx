
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Flame, 
  Target, 
  BarChart3, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Trophy,
  Moon,
  Sun,
  LayoutDashboard,
  Settings as SettingsIcon,
  User
} from 'lucide-react';
import { Habit, Goal, Theme, UserProfile } from './types';
import { storage } from './services/storageService';
import Dashboard from './components/Dashboard';
import HabitsList from './components/HabitsList';
import GoalsList from './components/GoalsList';
import Stats from './components/Stats';
import AIInsights from './components/AIInsights';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [profile, setProfile] = useState<UserProfile>(storage.getProfile());
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setHabits(storage.getHabits());
    setGoals(storage.getGoals());
    const savedTheme = storage.getTheme() as Theme;
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    storage.saveTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const updateHabits = (newHabits: Habit[]) => {
    setHabits(newHabits);
    storage.saveHabits(newHabits);
  };

  const updateGoals = (newGoals: Goal[]) => {
    setGoals(newGoals);
    storage.saveGoals(newGoals);
  };

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    storage.saveProfile(newProfile);
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        
        {/* Header */}
        <header className="sticky top-0 z-50 glass-morphism border-b border-white/10 px-4 py-4 flex justify-between items-center bg-slate-950/80">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <Flame size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Ami Parbo</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/settings" className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <SettingsIcon className="h-5 w-5 text-slate-400" />
            </Link>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pb-28 max-w-md mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard habits={habits} goals={goals} profile={profile} />} />
            <Route path="/habits" element={<HabitsList habits={habits} onUpdate={updateHabits} />} />
            <Route path="/goals" element={<GoalsList goals={goals} onUpdate={updateGoals} />} />
            <Route path="/stats" element={<Stats habits={habits} />} />
            <Route path="/ai" element={<AIInsights habits={habits} profile={profile} />} />
            <Route path="/settings" element={<Settings profile={profile} onUpdate={updateProfile} />} />
          </Routes>
        </main>

        {/* Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-white/10 px-4 py-3 flex justify-between items-center max-w-md mx-auto backdrop-blur-md rounded-t-3xl shadow-2xl z-50">
          <NavItem to="/" icon={<LayoutDashboard />} label="হোম" />
          <NavItem to="/habits" icon={<CheckCircle2 />} label="অভ্যাস" />
          <NavItem to="/goals" icon={<Target />} label="লক্ষ্য" />
          <NavItem to="/stats" icon={<BarChart3 />} label="চার্ট" />
          <NavItem to="/ai" icon={<Sparkles />} label="AI কোচ" />
        </nav>
      </div>
    </Router>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className="flex flex-col items-center gap-1 min-w-[60px]">
      <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
      </div>
      <span className={`text-[10px] font-medium ${isActive ? 'text-white' : 'text-slate-500'}`}>{label}</span>
    </Link>
  );
};

export default App;
