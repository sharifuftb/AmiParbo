
import React, { useState, useEffect } from 'react';
import { Habit, Goal, UserProfile } from '../types.ts';
import { Flame, Target, Trophy, TrendingUp, Play, Pause, RotateCcw, User } from 'lucide-react';
import { storage } from '../services/storageService.ts';

interface Props {
  habits: Habit[];
  goals: Goal[];
  profile: UserProfile;
}

const Dashboard: React.FC<Props> = ({ habits: initialHabits, goals, profile }) => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  useEffect(() => {
    setHabits(initialHabits);
  }, [initialHabits]);

  // Global timer interval
  useEffect(() => {
    const interval = setInterval(() => {
      setHabits(currentHabits => {
        let changed = false;
        const nextHabits = currentHabits.map(h => {
          if (h.isTimerRunning && h.remainingSeconds && h.remainingSeconds > 0) {
            changed = true;
            return { ...h, remainingSeconds: h.remainingSeconds - 1 };
          }
          if (h.isTimerRunning && h.remainingSeconds === 0) {
            changed = true;
            return { ...h, isTimerRunning: false };
          }
          return h;
        });
        
        if (changed) {
          storage.saveHabits(nextHabits);
          return nextHabits;
        }
        return currentHabits;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalStreak = habits.reduce((acc, h) => acc + h.streak, 0);
  const activeHabits = habits.length;
  const completedGoals = goals.filter(g => g.completed).length;

  const toggleTimer = (id: string) => {
    const updated = habits.map(h => h.id === id ? { ...h, isTimerRunning: !h.isTimerRunning } : h);
    setHabits(updated);
    storage.saveHabits(updated);
  };

  const resetTimer = (id: string) => {
    const updated = habits.map(h => h.id === id ? { ...h, remainingSeconds: h.durationMinutes ? h.durationMinutes * 60 : 0, isTimerRunning: false } : h);
    setHabits(updated);
    storage.saveHabits(updated);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* User Greeting */}
      <div className="flex items-center gap-3 mb-2">
        <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
          <User size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">স্বাগতম, {profile.name}!</h2>
          <p className="text-xs text-slate-500">আপনার সংকল্প আজ আরও দৃঢ় হোক।</p>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <p className="text-indigo-100 text-sm font-medium">মোট সংকল্প স্কোর</p>
            <h2 className="text-4xl font-bold mt-1">{totalStreak} <span className="text-lg font-normal opacity-80">পয়েন্ট</span></h2>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
            <Trophy className="h-6 w-6" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <p className="text-xs text-indigo-100 opacity-70">চলমান অভ্যাস</p>
            <p className="text-xl font-bold">{activeHabits}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <p className="text-xs text-indigo-100 opacity-70">পূরণকৃত লক্ষ্য</p>
            <p className="text-xl font-bold">{completedGoals}</p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <section>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="text-indigo-500 h-5 w-5" />
          আজকের সারাংশ
        </h3>
        <div className="space-y-4">
          {habits.slice(0, 3).map(habit => {
            const hasTimer = habit.durationMinutes && habit.remainingSeconds !== undefined;
            const progress = hasTimer ? ((habit.durationMinutes! * 60 - habit.remainingSeconds!) / (habit.durationMinutes! * 60)) * 100 : 0;

            return (
              <div key={habit.id} className="bg-slate-900 border border-white/5 rounded-3xl p-5 hover:bg-slate-800/50 transition-all overflow-hidden relative group">
                {/* Background Progress fill */}
                {hasTimer && (
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-indigo-500/30 transition-all duration-1000" 
                    style={{ width: `${progress}%` }} 
                  />
                )}
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl transition-colors ${habit.isTimerRunning ? 'bg-orange-500 text-white animate-pulse' : 'bg-orange-500/10 text-orange-500'}`}>
                      <Flame className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{habit.name}</p>
                      <p className="text-xs text-slate-400">{habit.streak} দিনের স্ট্রোক</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasTimer ? (
                      <div className="flex items-center gap-2">
                         <div className="text-right mr-2">
                            <p className={`text-xl font-mono font-bold ${habit.isTimerRunning ? 'text-indigo-400' : 'text-slate-500'}`}>
                              {formatTime(habit.remainingSeconds!)}
                            </p>
                         </div>
                         <button 
                            onClick={() => toggleTimer(habit.id)}
                            className={`p-3 rounded-xl transition-all ${habit.isTimerRunning ? 'bg-red-500/20 text-red-500' : 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'}`}
                         >
                            {habit.isTimerRunning ? <Pause size={20} /> : <Play size={20} />}
                         </button>
                         <button 
                            onClick={() => resetTimer(habit.id)}
                            className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                         >
                            <RotateCcw size={18} />
                         </button>
                      </div>
                    ) : (
                      <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full">
                        চলছে
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {habits.length === 0 && (
            <div className="text-center py-12 text-slate-500 bg-slate-900/50 rounded-3xl border border-dashed border-white/10">
              <div className="mb-3 opacity-20 flex justify-center"><Target size={48} /></div>
              কোন অভ্যাস যোগ করা হয়নি। শুরু করুন আজই!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;