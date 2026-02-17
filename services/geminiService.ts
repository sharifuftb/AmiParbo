
import { GoogleGenAI } from "@google/genai";
import { Habit } from "../types";

export const getAIMotivation = async (habits: Habit[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const habitsSummary = habits.map(h => `${h.name}: ${h.streak} দিন স্ট্রোক`).join(", ");
  const prompt = `
    তুমি একজন 'Ami Parbo' হ্যাবিট ট্র্যাকার অ্যাপের AI কোচ। 
    ব্যবহারকারীর বর্তমান অভ্যাসগুলো হলো: ${habitsSummary || "কোন অভ্যাস এখনো শুরু হয়নি"}।
    
    ১. ব্যবহারকারীকে উৎসাহ দিয়ে একটি সংক্ষিপ্ত মোটিভেশনাল মেসেজ দাও (বাংলায়)।
    ২. তাদের প্রগ্রেস অনুযায়ী একটি স্মার্ট পরামর্শ (Suggestion) দাও।
    ৩. কথাগুলো হবে গম্ভীর কিন্তু অনুপ্রেরণামূলক (Stoic tone)।
    
    শুধুমাত্র মেসেজটি দাও, বাড়তি কথা বলবে না।
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });
    return response.text || "আপনার লক্ষ্যের দিকে এগিয়ে যান। প্রতিটি ছোট পদক্ষেপই সাফল্যের চাবিকাঠি।";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "লোহার মতো সংকল্প নিয়ে এগিয়ে চলুন। আপনার পরিশ্রম বৃথা যাবে না।";
  }
};
