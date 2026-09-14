import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Save, 
  FileText, 
  Calculator,
  MessageSquare,
  Award,
  Users,
  Target,
  Sparkles,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';

const rubrik = [
  { id: 'id_masalah', label: 'Identifikasi Masalah', weight: 10 },
  { id: 'kreativitas', label: 'Kreativitas Solusi', weight: 15 },
  { id: 'integrasi', label: 'Integrasi STEM', weight: 20 },
  { id: 'lokal', label: 'Pemanfaatan Kearifan Lokal', weight: 15 },
  { id: 'p5m', label: 'Penerapan Konsep 5M', weight: 10 },
  { id: 'kolaborasi', label: 'Kolaborasi Tim', weight: 10 },
  { id: 'solving', label: 'Problem Solving', weight: 10 },
  { id: 'produk', label: 'Kualitas Produk', weight: 10 },
];

export default function Evaluasi() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [activeProject, setActiveProject] = useState('Fermentasi Tempe');
  const [evaluatorName, setEvaluatorName] = useState('Dr. Eni Kuswati');
  const [reflection, setReflection] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const totalScore = rubrik.reduce((acc, curr) => {
    return acc + ((scores[curr.id] || 0) * curr.weight) / 100;
  }, 0);

  const cleanMarkdown = (text: string) => {
    return text
      .replace(/[#*]/g, '') // Remove # and *
      .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
      .trim();
  };

  const handleAutoAI = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proyek: activeProject,
          skor: totalScore.toFixed(1),
          rubrik: rubrik.map(r => ({ label: r.label, skor: scores[r.id] || 0 }))
        })
      });
      const data = await response.json();
      if (data.reflection) {
        setReflection(cleanMarkdown(data.reflection));
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Evaluasi & Rubrik Proyek</h2>
          <p className="text-slate-500">Instrumen penilaian proyek STEM oleh Pengawas/Penilai.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-3">
            <span className="text-sm text-slate-500 font-medium">Penilai:</span>
            <input 
              type="text"
              value={evaluatorName}
              onChange={(e) => setEvaluatorName(e.target.value)}
              className="bg-transparent font-bold text-slate-800 outline-none text-sm w-32"
            />
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-3">
            <span className="text-sm text-slate-500 font-medium">Proyek:</span>
            <select 
              value={activeProject}
              onChange={(e) => setActiveProject(e.target.value)}
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer text-sm"
            >
              <option>Fermentasi Tempe</option>
              <option>Miniatur Pinisi</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Target size={20} className="text-indigo-600" />
                Instrumen Penilaian
              </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {rubrik.map((item) => (
                <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400 font-medium italic">Bobot: {item.weight}%</p>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => setScores({ ...scores, [item.id]: val })}
                        className={`w-10 h-10 rounded-xl font-bold transition-all ${
                          scores[item.id] === val 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-110' 
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 text-center">
              <div className="inline-flex p-3 bg-white/10 rounded-2xl mb-4">
                <Calculator size={32} className="text-indigo-300" />
              </div>
              <p className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-2">Nilai Akhir</p>
              <h3 className="text-6xl font-black mb-4">{(totalScore * 20).toFixed(1)}</h3>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 inline-block">
                <p className="text-sm font-bold">
                  Kategori: {totalScore * 20 >= 80 ? 'Sangat Baik' : totalScore * 20 >= 60 ? 'Baik' : 'Perlu Bimbingan'}
                </p>
              </div>
            </div>
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare size={18} className="text-indigo-600" />
                Refleksi Penilai
              </h4>
              <button 
                onClick={handleAutoAI}
                disabled={isGenerating || Object.keys(scores).length === 0}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  isGenerating || Object.keys(scores).length === 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                Auto AI
              </button>
            </div>
            <textarea 
              rows={4}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Berikan saran perbaikan atau klik Auto AI..."
              className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
            />
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              <Save size={20} />
              Simpan Penilaian
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
