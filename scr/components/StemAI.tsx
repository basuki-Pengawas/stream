import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Download, 
  ChevronRight,
  Lightbulb,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Variable
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function StemAI() {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    jenjang: 'SMP',
    kelas: '7',
    subjek: 'IPA',
    masalah: 'Pencemaran air sungai dekat sekolah',
    kearifan: 'Penggunaan sabut kelapa untuk alat kebersihan',
    bahan: 'Sabut kelapa, botol bekas, pasir, kerikil',
    anggaran: 'Di bawah Rp 50.000',
    waktu: '2 minggu'
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <Sparkles size={24} className="text-amber-300" />
            </div>
            <h2 className="text-3xl font-black">AI STEM PROJECT GENERATOR</h2>
          </div>
          <p className="text-indigo-100 max-w-2xl leading-relaxed">
            Gunakan kecerdasan buatan untuk merancang modul ajar STEM yang kreatif, 
            berbasis kearifan lokal, dan sesuai dengan kondisi sekolah Anda secara instan.
          </p>
        </div>
        <div className="absolute right-[-5%] top-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Lightbulb className="text-amber-500" /> Input Data
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase">Jenjang</label>
                  <select 
                    value={formData.jenjang}
                    onChange={(e) => setFormData({...formData, jenjang: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-sm"
                  >
                    <option>PAUD</option>
                    <option>SD</option>
                    <option>SMP</option>
                    <option>SMA</option>
                    <option>SMK</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase">Kelas</label>
                  <input 
                    type="text" 
                    value={formData.kelas}
                    onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase">Masalah Lokal</label>
                <textarea 
                  rows={2}
                  value={formData.masalah}
                  onChange={(e) => setFormData({...formData, masalah: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase">Kearifan Lokal</label>
                <input 
                  type="text" 
                  value={formData.kearifan}
                  onChange={(e) => setFormData({...formData, kearifan: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase">Bahan Tersedia</label>
                <input 
                  type="text" 
                  value={formData.bahan}
                  onChange={(e) => setFormData({...formData, bahan: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:bg-slate-400"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Menyusun Modul...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Buat Proyek STEM
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!project ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                  <Sparkles size={32} className="text-indigo-600 opacity-20" />
                </div>
                <h3 className="text-xl font-bold text-slate-400">Belum Ada Proyek</h3>
                <p className="text-slate-400 max-w-sm mt-2">
                  Lengkapi form di samping dan klik "Buat Proyek STEM" untuk melihat keajaiban AI.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl space-y-10"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block">HASIL GENERASI AI</div>
                    <h3 className="text-3xl font-black text-slate-900">{project.judul}</h3>
                  </div>
                  <button className="p-3 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-colors text-slate-600">
                    <Download size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle size={16} /> Masalah & Tujuan
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed">{project.latarBelakang}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 size={16} /> Integrasi 5M
                      </h4>
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900 text-sm italic">
                        "{project.integrasi5M}"
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <FileText size={16} /> Alat & Bahan
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.alatBahan.map((item: string, i: number) => (
                          <span key={i} className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600">{item}</span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <h4 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                        <Variable size={18} /> Konsep STEM
                      </h4>
                      <div className="space-y-2 text-xs">
                        <p><span className="font-bold">S:</span> {project.konsepSTEM.science}</p>
                        <p><span className="font-bold">T:</span> {project.konsepSTEM.technology}</p>
                        <p><span className="font-bold">E:</span> {project.konsepSTEM.engineering}</p>
                        <p><span className="font-bold">M:</span> {project.konsepSTEM.math}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Langkah Kegiatan</h4>
                  <div className="space-y-3">
                    {project.langkahKegiatan.map((step: string, i: number) => (
                      <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                        <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex-shrink-0 flex items-center justify-center font-bold text-sm">{i + 1}</span>
                        <p className="text-slate-700 text-sm pt-1.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
