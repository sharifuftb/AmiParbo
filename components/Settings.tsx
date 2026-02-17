
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Save, Bell, Shield, Info, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface Props {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const Settings: React.FC<Props> = ({ profile, onUpdate }) => {
  const [name, setName] = useState(profile.name);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdate({ ...profile, name, avatarUrl });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold">সেটিংস</h2>
      
      <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="h-28 w-28 rounded-3xl overflow-hidden border-4 border-indigo-600 shadow-2xl shadow-indigo-500/20">
            <img 
              src={avatarUrl} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=User&background=334155&color=fff";
              }}
            />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-xl">{name}</h3>
            <p className="text-xs text-slate-500">মেম্বার আইডি: #AP-{new Date(profile.joinedDate).getTime().toString().slice(-4)}</p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">আপনার নাম</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-indigo-500 transition-all"
                placeholder="আপনার নাম লিখুন"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">আপনার ছবির লিংক (Logo URL)</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-indigo-500 transition-all"
                placeholder="ছবির সরাসরি লিংকটি এখানে দিন"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-2 ml-1 italic">* আপনার পাঠানো ছবির লিংকটি এখানে পেস্ট করলে সব জায়গায় লোগো আপডেট হবে।</p>
          </div>

          <button 
            onClick={handleSave}
            className={`w-full font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg ${saved ? 'bg-green-600 shadow-green-600/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'}`}
          >
            {saved ? <CheckCircle size={20} /> : <Save size={20} />}
            {saved ? 'সেভ হয়েছে!' : 'প্রোফাইল সেভ করুন'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <SettingsItem icon={<Bell size={18} />} label="নোটিফিকেশন" value="চালু" />
        <SettingsItem icon={<Shield size={18} />} label="প্রাইভেসি ও সিকিউরিটি" />
        <SettingsItem icon={<Info size={18} />} label="অ্যাপ সম্পর্কে" value="v1.0.2" />
      </div>
    </div>
  );
};

const SettingsItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => (
  <div className="bg-slate-900 border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer">
    <div className="flex items-center gap-3 text-slate-300">
      <div className="text-indigo-400">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
    {value && <span className="text-xs font-bold text-slate-500">{value}</span>}
  </div>
);

export default Settings;
