import React, { useState } from 'react';
import { 
  Leaf, 
  Settings, 
  Smile, 
  Eye, 
  Target,
  Plus,
  ArrowRight,
  Info,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const principles = [
  {
    id: 'murah',
    title: 'MURAH',
    icon: Leaf,
    color: 'emerald',
    description: 'Memanfaatkan bahan terjangkau dan limbah yang tersedia di sekitar.',
    examples: ['Botol bekas', 'Kardus', 'Bambu', 'Kertas', 'Bahan lokal'],
  },
  {
    id: 'mudah',
    title: 'MUDAH',
    icon: Settings,
    color: 'blue',
    description: 'Praktis diterapkan di berbagai kondisi tanpa peralatan laboratorium yang mahal.',
    examples: ['Alat masak dapur', 'Tali nilon', 'Paku & Palu', 'Penggaris'],
  },
  {
    id: 'menggembirakan',
    title: 'MENGGEMBIRAKAN',
    icon: Smile,
    color: 'amber',
    description: 'Menciptakan suasana belajar yang menyenangkan berbasis kolaborasi dan permainan.',
    examples: ['Kerja kelompok', 'Kompetisi sehat', 'Uji coba outdoor'],
  },
  {
    id: 'mindful',
    title: 'MINDFUL',
    icon: Eye,
    color: 'indigo',
    description: 'Berkesadaran pada lingkungan sekitar dan peka terhadap isu lokal.',
    examples: ['Observasi pasar', 'Audit energi sekolah', 'Kebersihan sungai'],
  },
  {
    id: 'meaningful',
    title: 'MEANINGFUL',
    icon: Target,
    color: 'purple',
    description: 'Bermakna langsung bagi kehidupan murid dan memberikan solusi nyata.',
    examples: ['Solusi sanitasi', 'Pupuk organik', 'Alat bantu disabilitas'],
  },
];

interface Lab5MProps {
  onNavigate: (tab: string) => void;
}

export default function Lab5M({ onNavigate }: Lab5MProps) {
  const [selected, setSelected] = useState(principles[0]);
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-indigo-600 font-black text-xs tracking-widest uppercase mb-1">Laboratorium Konsep Utama</h4>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 uppercase leading-none">LABORATORIUM 5M SINEMA</h2>
          <p className="text-slate-500 mt-2">Sistem pembelajaran STEM berbasis lima pilar utama: Murah, Mudah, Menggembirakan, Mindful, dan Meaningful.</p>
        </div>
        <button 
          onClick={() => setShowGenerator(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={20} />
          Buat Ide Proyek 5M
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {principles.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className={`p-6 rounded-2xl border transition-all flex flex-col items-center text-center gap-3 ${
              selected.id === p.id 
              ? `bg-${p.color}-50 border-${p.color}-200 ring-2 ring-${p.color}-500/20 shadow-sm` 
              : 'bg-white border-slate-100 hover:border-slate-300'
            }`}
          >
            <div className={`p-3 rounded-xl bg-${p.color}-100 text-${p.color}-600`}>
              <p.icon size={24} />
            </div>
            <span className="font-bold text-sm tracking-wide">{p.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className={`p-10 bg-${selected.color}-50/50`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${selected.color}-100 text-${selected.color}-700 text-xs font-bold mb-4`}>
                <selected.icon size={14} />
                PRINSIP UTAMA
              </div>
              <h3 className={`text-4xl font-black text-${selected.color}-900 mb-6`}>{selected.title}</h3>
              <p className="text-slate-700 text-lg leading-relaxed mb-8">
                {selected.description}
              </p>
              
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Info size={18} className="text-indigo-600" />
                  Contoh Implementasi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.examples.map((ex, i) => (
                    <span key={i} className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 shadow-sm">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-10 flex flex-col justify-center bg-slate-50/30">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-xl font-bold text-slate-800 mb-4">Inspirasi Cepat</h4>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-dashed border-slate-300">
                    <p className="text-sm text-slate-600 italic">
                      "Gunakan {selected.examples[0]} untuk membuat prototipe penyaring udara sederhana."
                    </p>
                  </div>
                  <button 
                    onClick={() => onNavigate('proyek')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all"
                  >
                    Lihat Proyek Terkait
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Generator Modal */}
      <AnimatePresence>
        {showGenerator && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-800">Buat Ide Proyek 5M</h3>
                <button onClick={() => setShowGenerator(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Masalah</label>
                    <input type="text" placeholder="Misal: Limbah pasar" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Bahan Tersedia</label>
                    <input type="text" placeholder="Misal: Botol plasti" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Kondisi Lingkungan</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                    <option>Perkotaan Padat</option>
                    <option>Pedesaan Agrobisnis</option>
                    <option>Pesisir Pantai</option>
                    <option>Pegunungan</option>
                  </select>
                </div>
                <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  Generate Ide Proyek
                  <Sparkles size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
