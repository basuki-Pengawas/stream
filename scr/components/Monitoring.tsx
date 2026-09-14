import React, { useState } from 'react';
import { 
  BarChart3, 
  Search, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Layout,
  ClipboardCheck,
  Building2,
  UserCheck,
  ShieldCheck,
  Save,
  Sparkles,
  Loader2,
  User,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';

const initialMonitoringData: any[] = [];

const rubricCategories = [
  { id: 'perencanaan', label: 'Perencanaan', desc: 'Kesiapan modul ajar dan rancangan STREAM' },
  { id: 'pelaksanaan', label: 'Pelaksanaan', desc: 'Proses KBM dan keterlibatan siswa' },
  { id: 'produk5m', label: 'Produk 5M', desc: 'Kualitas hasil karya berbasis 5M' },
  { id: 'refleksi', label: 'Refleksi', desc: 'Kedalaman evaluasi diri dan umpan balik' },
  { id: 'tindakLanjut', label: 'Tindak Lanjut', desc: 'Rencana perbaikan dan pengembangan' },
];

export default function Monitoring() {
  const [schools, setSchools] = useState<any[]>(initialMonitoringData);
  const [showInstrument, setShowInstrument] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [scores, setScores] = useState<Record<string, number>>({
    perencanaan: 0,
    pelaksanaan: 0,
    produk5m: 0,
    refleksi: 0,
    tindakLanjut: 0
  });
  const [recommendation, setRecommendation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [schoolInfo, setSchoolInfo] = useState({
    namaSekolah: '',
    namaKS: '',
    namaPS: '',
    namaGuru: ''
  });

  const handleOpenInstrument = (school: any) => {
    setSelectedSchool(school);
    setSchoolInfo({
      namaSekolah: school.sekolah || '',
      namaKS: school.kepalaSekolah || '',
      namaPS: school.pengawas || '',
      namaGuru: school.guru || ''
    });
    setScores({
      perencanaan: 0,
      pelaksanaan: 0,
      produk5m: 0,
      refleksi: 0,
      tindakLanjut: 0
    });
    setRecommendation('');
    setShowInstrument(true);
  };

  const handleAddSchool = () => {
    const newSchool = {
      id: Date.now().toString(),
      sekolah: '',
      kepalaSekolah: '',
      pengawas: '',
      guru: '',
      proyek: '',
      status: 'Belum Dilaksanakan',
      progress: 0
    };
    setSchools(prev => [newSchool, ...prev]);
    handleOpenInstrument(newSchool);
  };

  const handleSaveMonitoring = () => {
    setSchools(prev => prev.map(s => {
      if (s.id === selectedSchool.id) {
        return {
          ...s,
          sekolah: schoolInfo.namaSekolah,
          kepalaSekolah: schoolInfo.namaKS,
          pengawas: schoolInfo.namaPS,
          guru: schoolInfo.namaGuru,
          status: 'Selesai'
        };
      }
      return s;
    }));
    setShowInstrument(false);
  };

  const handleScoreChange = (category: string, score: number) => {
    setScores(prev => ({ ...prev, [category]: score }));
  };

  const cleanMarkdown = (text: string) => {
    return text
      .replace(/[#*]/g, '') // Remove # and *
      .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
      .trim();
  };

  const generateAIRecommendation = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-monitoring-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolInfo, scores }),
      });
      const data = await response.json();
      if (data.recommendation) {
        setRecommendation(cleanMarkdown(data.recommendation));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-indigo-600 font-black text-xs tracking-widest uppercase mb-1">Instrumen Monitoring Terintegrasi</h4>
          <h2 className="text-3xl font-black text-slate-800">MONITORING PELATIHAN & IMPLEMENTASI STEM</h2>
          <p className="text-slate-500 text-sm mt-1">Memantau tahapan Perencanaan, Pelaksanaan, Produk Karya 5M, Refleksi, dan Tindak Lanjut.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
          <TrendingUp className="text-indigo-600" size={20} />
          <span className="text-sm font-bold text-indigo-900">Indeks Keterlaksanaan: 88%</span>
        </div>
      </div>

      {!showInstrument ? (
        <>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Layout size={20} className="text-indigo-600" />
                Daftar Satuan Pendidikan
              </h3>
              <button 
                onClick={handleAddSchool}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                <Plus size={20} />
                Tambah Sekolah
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Informasi Sekolah</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Pimpinan & Pengawas</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {schools.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                        Belum ada data sekolah. Silakan klik "Tambah Sekolah".
                      </td>
                    </tr>
                  ) : schools.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-800 text-sm">{row.sekolah || 'Belum Diisi'}</p>
                          <p className="text-xs text-slate-500">Proyek: {row.proyek || '-'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                            <UserCheck size={14} className="text-indigo-500" />
                            KS: {row.kepalaSekolah || '-'}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            PS: {row.pengawas || '-'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleOpenInstrument(row)}
                          className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
                        >
                          <ClipboardCheck size={14} />
                          Mulai Observasi
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden"
        >
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Instrumen Rubrik Monitoring STREAM</h3>
              <p className="text-indigo-300 text-xs">Informasi Observasi & Penilaian Capaian</p>
            </div>
            <button 
              onClick={() => setShowInstrument(false)}
              className="text-white/60 hover:text-white text-sm font-bold"
            >
              Kembali
            </button>
          </div>

          <div className="p-8 space-y-10">
            {/* School Info Section */}
            <div className="space-y-6">
              <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <Building2 size={16} />
                Informasi Sekolah
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Nama Sekolah</label>
                  <input 
                    type="text" 
                    value={schoolInfo.namaSekolah}
                    onChange={(e) => setSchoolInfo(prev => ({ ...prev, namaSekolah: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Nama Lengkap KS</label>
                  <input 
                    type="text" 
                    value={schoolInfo.namaKS}
                    onChange={(e) => setSchoolInfo(prev => ({ ...prev, namaKS: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Nama Lengkap PS</label>
                  <input 
                    type="text" 
                    value={schoolInfo.namaPS}
                    onChange={(e) => setSchoolInfo(prev => ({ ...prev, namaPS: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Nama Guru Observasi</label>
                  <input 
                    type="text" 
                    value={schoolInfo.namaGuru}
                    onChange={(e) => setSchoolInfo(prev => ({ ...prev, namaGuru: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20" 
                  />
                </div>
              </div>
            </div>

            {/* Rubric Section */}
            <div className="space-y-6">
              <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <ClipboardCheck size={16} />
                Instrumen Rubrik Penilaian
              </h4>
              <div className="space-y-1">
                {rubricCategories.map((cat) => (
                  <div key={cat.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 gap-4 mb-3">
                    <div className="flex-1">
                      <p className="text-sm font-black text-slate-800 uppercase">{cat.label}</p>
                      <p className="text-xs text-slate-500 italic">{cat.desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4].map((score) => (
                        <button
                          key={score}
                          onClick={() => handleScoreChange(cat.id, score)}
                          className={`w-10 h-10 rounded-xl font-black text-sm transition-all border ${
                            scores[cat.id] === score
                            ? 'bg-indigo-600 text-white border-indigo-600 scale-110 shadow-lg shadow-indigo-100'
                            : 'bg-white text-slate-400 border-slate-200 hover:border-indigo-200 hover:text-indigo-500'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle size={16} />
                  Catatan Rekomendasi Tindak Lanjut
                </h4>
                <button 
                  onClick={generateAIRecommendation}
                  disabled={isGenerating || Object.values(scores).some(s => s === 0)}
                  className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border transition-all ${
                    Object.values(scores).some(s => s === 0)
                    ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                    : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  Isi Otomatis (AI)
                </button>
              </div>
              <textarea 
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                placeholder="Rekomendasi tindak lanjut hasil observasi..."
                className="w-full min-h-[120px] bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={handleSaveMonitoring}
                className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Simpan Laporan Monitoring
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

