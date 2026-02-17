
import React, { useState } from 'react';
import { Goal } from '../types';
import { Plus, Target, CheckCircle2, Circle, Trash2, Calendar } from 'lucide-react';

interface Props {
  goals: Goal[];
  onUpdate: (goals: Goal[]) => void;
}

const GoalsList: React.FC<Props> = ({ goals, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const addGoal = () => {
    if (!title.trim()) return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      title,
      completed: false,
      dueDate: date || new Date().toISOString().split('T')[0]
    };
    onUpdate([...goals, newGoal]);
    setTitle('');
    setDate('');
    setIsAdding(false);
  };

  const toggleGoal = (id: string) => {
    onUpdate(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id: string) => {
    onUpdate(goals.filter(g => g.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">লক্ষ্য নির্ধারণ</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-violet-600 p-2 rounded-xl text-white"
        >
          <Plus size={20} />
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-900 border border-violet-500/30 p-4 rounded-2xl space-y-3">
          <input 
            type="text"
            placeholder="আপনার লক্ষ্য কি?"
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            type="date"
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 focus:outline-none text-slate-400"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={addGoal} className="flex-1 bg-violet-600 py-2 rounded-xl font-bold">সেভ করুন</button>
            <button onClick={() => setIsAdding(false)} className="px-4 bg-slate-800 py-2 rounded-xl font-bold">বাতিল</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {goals.map(goal => (
          <div key={goal.id} className={`bg-slate-900 border ${goal.completed ? 'border-green-500/30' : 'border-white/5'} rounded-2xl p-4 flex items-center justify-between`}>
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => toggleGoal(goal.id)}
                className={`transition-colors ${goal.completed ? 'text-green-500' : 'text-slate-600'}`}
              >
                {goal.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>
              <div className="flex-1">
                <h4 className={`font-bold ${goal.completed ? 'text-slate-500 line-through' : ''}`}>{goal.title}</h4>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                  <Calendar size={10} /> {new Date(goal.dueDate).toLocaleDateString('bn-BD')}
                </div>
              </div>
            </div>
            <button onClick={() => deleteGoal(goal.id)} className="p-2 text-slate-700 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsList;
