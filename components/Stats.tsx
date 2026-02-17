
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Habit } from '../types';

interface Props {
  habits: Habit[];
}

const Stats: React.FC<Props> = ({ habits }) => {
  const data = habits.map(h => ({
    name: h.name,
    days: h.streak
  }));

  const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">প্রগ্রেস চার্ট</h2>
      
      <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl min-h-[400px]">
        <h3 className="text-sm font-semibold text-slate-400 mb-6">অভ্যাস অনুযায়ী স্ট্রোক</h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 10 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 10 }}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="days" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">শীর্ষ অভ্যাস</h4>
          {habits.sort((a,b) => b.streak - a.streak).slice(0, 3).map((habit, i) => (
            <div key={habit.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-indigo-400 font-bold">#0{i+1}</span>
                <span className="font-medium">{habit.name}</span>
              </div>
              <span className="text-slate-400 text-sm">{habit.streak} দিন</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
