
import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Quote } from 'lucide-react';
import { getAIMotivation } from '../services/geminiService';
import { Habit, UserProfile } from '../types';

interface Props {
  habits: Habit[];
  profile: UserProfile;
}

const AIInsights: React.FC<Props> = ({ habits, profile }) => {
  const [motivation, setMotivation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchAIHelp = async () => {
    setLoading(true);
    const msg = await getAIMotivation(habits);
    setMotivation(msg);
    setLoading(false);
  };

  useEffect(() => {
    fetchAIHelp();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          AI কোচ <Sparkles className="text-indigo-400" />
        </h2>
        <button 
          onClick={fetchAIHelp}
          disabled={loading}
          className={`p-2 bg-slate-900 rounded-xl text-indigo-400 hover:text-white transition-all ${loading ? 'animate-spin opacity-50' : ''}`}
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="relative">
        <div className="absolute -top-3 -left-3 text-indigo-500 opacity-20">
          <Quote size={80} />
        </div>
        
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-600/20 transition-all"></div>
          
          {loading ? (
            <div className="space-y-3">
              <div className="h-4 bg-slate-800 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-800 rounded-full w-full animate-pulse"></div>
              <div className="h-4 bg-slate-800 rounded-full w-2/3 animate-pulse"></div>
            </div>
          ) : (
            <p className="text-lg leading-relaxed italic text-slate-200 whitespace-pre-wrap">
              "{motivation}"
            </p>
          )}

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Sparkles size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Ami Parbo Assistant</p>
              <p className="text-[10px] text-slate-500">আপনার ব্যক্তিগত এআই মেন্টর</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-4">
        <h4 className="text-sm font-bold text-indigo-300 mb-1 flex items-center gap-2">
          <Sparkles size={14} /> টিপস
        </h4>
        <p className="text-xs text-indigo-200/70 leading-relaxed">
          এআই আপনার প্রগ্রেস ট্র্যাক করছে। প্রতিদিন একই সময়ে অভ্যাস পালনের চেষ্টা করুন, এটি আপনার সংকল্পকে আরও দৃঢ় করবে।
        </p>
      </div>
    </div>
  );
};

export default AIInsights;
