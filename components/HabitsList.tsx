
import React, { useState } from 'react';
import { Habit } from '../types';
import { Plus, Check, Trash2, Flame, Clock, Timer } from 'lucide-react';

interface Props {
  habits: Habit[];
  onUpdate: (habits: Habit[]) => void;
}

const HabitsList: React.FC<Props> = ({ habits, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [duration, setDuration] = useState('0');

  const addHabit = () => {
    if (!newName.trim()) return;
    const mins = parseInt(duration) || 0;
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newName,
      streak: 0,
      lastCompleted: null,
      createdAt: new Date().toISOString(),
      category: 'General',
      targetDays: 21,
      durationMinutes: mins > 0 ? mins : undefined,
      remainingSeconds: mins > 0 ? mins * 60 : undefined,
      isTimerRunning: false
    };
    onUpdate([...habits, newHabit]);
    setNewName('');
    setDuration('0');
    setIsAdding(false);
  };

  const completeHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = habits.map(h => {
      if (h.id === id) {
        if (h.lastCompleted === today) return h;
        return {
          ...h,
          streak: h.streak + 1,
          lastCompleted: today,
          remainingSeconds: h.durationMinutes ? h.durationMinutes * 60 : undefined,
          isTimerRunning: false
        };
      }
      return h;
    });
    onUpdate(updated);
  };

  const deleteHabit = (id: string) => {
    onUpdate(habits.filter(h => h.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">অভ্যাস ট্র্যাকার</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20"
        >
          <Plus size={20} />
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-900 border border-indigo-500/30 p-4 rounded-2xl space-y-3">
          <input 
            autoFocus
            type="text"
            placeholder="অভ্যাসের নাম (যেমন: ২০ মিনিট পড়বো)"
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="flex items-center gap-3">
             <div className="flex-1">
                <label className="text-[10px] text-slate-500 ml-1">সময় (মিনিট - ঐচ্ছিক)</label>
                <input 
                  type="number"
                  placeholder="মিনিট"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
             </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={addHabit}
              className="flex-1 bg-indigo-600 py-2 rounded-xl font-bold"
            >
              যোগ করুন
            </button>
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 bg-slate-800 py-2 rounded-xl font-bold text-slate-400"
            >
              বাতিল
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {habits.map(habit => {
          const isDoneToday = habit.lastCompleted === new Date().toISOString().split('T')[0];
          
          return (
            <div key={habit.id} className={`bg-slate-900 border ${isDoneToday ? 'border-green-500/30' : 'border-white/5'} rounded-2xl p-4 flex items-center justify-between transition-all`}>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => completeHabit(habit.id)}
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${isDoneToday ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 border border-white/5 hover:border-indigo-500'}`}
                >
                  {isDoneToday ? <Check size={24} /> : <div className="h-5 w-5 border-2 border-current rounded-full" />}
                </button>
                <div>
                  <h4 className={`font-bold ${isDoneToday ? 'text-slate-400 line-through' : ''}`}>{habit.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <Flame size={10} /> {habit.streak} দিন
                    </span>
                    {habit.durationMinutes && (
                      <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Timer size={10} /> {habit.durationMinutes} মি.
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteHabit(habit.id)}
                className="p-2 text-slate-600 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitsList;
