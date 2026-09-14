import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  PlayCircle, 
  ChevronRight,
  ChevronLeft,
  Globe,
  Maximize2,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const resources = [
  { 
    id: 1,
    title: 'Panduan Pembelajaran STEM (Puskurjar Kemendikdasmen)', 
    type: 'Slide PPT', 
    description: 'Rujukan resmi bagi guru dan satuan pendidikan untuk memahami filosofi, kerangka kerja, dan strategi implementasi STEM dalam Kurikulum Nasional.',
    category: 'Kurikulum',
    slides: [
      { title: 'Filosofi STEM', content: 'STEM bukan sekadar singkatan, melainkan pendekatan integratif untuk memecahkan masalah nyata.', points: ['Integrasi Sains, Teknologi, Engineering, Matematika', 'Berbasis Masalah Nyata', 'Mendorong Berpikir Kritis'] },
      { title: 'Kerangka Kerja Kurikulum', content: 'Bagaimana STEM masuk dalam kurikulum nasional dan mendukung Profil Lulusan.', points: ['Kokurikuler', 'Intrakurikuler', 'Ekstrakurikuler'] },
      { title: 'Strategi Implementasi', content: 'Langkah taktis bagi sekolah untuk memulai transformasi pendidikan berbasis STEM.', points: ['Pelatihan Guru', 'Penyediaan Sarpras Sederhana', 'Kolaborasi Antar Mapel'] }
    ]
  },
  { 
    id: 2,
    title: 'Kerangka Penerapan STEM dalam Berbagai Konteks Pendidikan', 
    type: 'Slide PPT', 
    description: 'Adaptasi pendekatan STEM untuk berbagai jenjang (PAUD, SD, SMP, SMA/SMK) sesuai dengan kebutuhan dan potensi satuan pendidikan.',
    category: 'Kurikulum',
    slides: [
      { title: 'STEM di PAUD', content: 'Fokus pada eksplorasi sensori dan keingintahuan alami anak.', points: ['Bermain Seraya Belajar', 'Eksplorasi Alam Sekitar', 'Membangun Imajinasi'] },
      { title: 'STEM di SD/SMP', content: 'Penguatan konsep dasar dan aplikasi dalam kehidupan sehari-hari.', points: ['Proyek Kelompok', 'Pemanfaatan Bahan Bekas', 'Solusi Masalah Lingkungan'] },
      { title: 'STEM di SMA/SMK', content: 'Penyelesaian masalah kompleks dan kesiapan dunia kerja.', points: ['Inovasi Teknologi', 'Kewirausahaan Berbasis STEM', 'Riset Sederhana'] }
    ]
  },
  { 
    id: 3,
    title: 'Kumpulan Contoh Pembelajaran STEM Berbasis Masalah Nyata', 
    type: 'Slide PPT', 
    description: 'Inspirasi proyek STEM yang telah teruji, memanfaatkan kearifan lokal dan solusi atas permasalahan lingkungan sekitar.',
    category: 'Praktik',
    slides: [
      { title: 'Proyek Penjernihan Air', content: 'Contoh nyata pemecahan masalah sanitasi di daerah aliran sungai.', points: ['Analisis Kimia Air', 'Rancang Bangun Filter', 'Uji Coba & Iterasi'] },
      { title: 'Ecoprint & Seni Budaya', content: 'Integrasi kearifan lokal dengan konsep sains pewarnaan alami.', points: ['Botani Lokal', 'Teknik Ecoprint', 'Nilai Ekonomis Karya'] },
      { title: 'Hidroponik Cerdas', content: 'Automasi pertanian lahan sempit untuk ketahanan pangan keluarga.', points: ['Fisika Fluida', 'Elektronika Dasar', 'Biologi Tumbuhan'] }
    ]
  },
];

export default function Materi() {
  const [selectedResource, setSelectedResource] = useState(resources[0]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < selectedResource.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const changeResource = (res: typeof resources[0]) => {
    setSelectedResource(res);
    setCurrentSlide(0);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Materi & Rujukan</h2>
          <p className="text-slate-500">Visualisasi materi pembelajaran slide demi slide.</p>
        </div>
        <a 
          href="https://kurikulum.kemendikdasmen.go.id/rujukan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Globe size={20} />
          Portal Rujukan Pusat
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Slide Viewer Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border-4 border-slate-800 relative aspect-video flex flex-col">
            <div className="absolute top-6 left-8 right-8 flex justify-between items-center z-10">
              <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                <Monitor size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  Slide {currentSlide + 1} / {selectedResource.slides.length}
                </span>
              </div>
              <button className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10 text-white/60 hover:text-white transition-colors">
                <Maximize2 size={16} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-12 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedResource.id}-${currentSlide}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="max-w-2xl w-full text-center space-y-8"
                >
                  <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                    {selectedResource.slides[currentSlide].title}
                  </h3>
                  <div className="h-1 w-24 bg-indigo-500 mx-auto rounded-full"></div>
                  <p className="text-xl text-indigo-100/80 leading-relaxed font-medium">
                    {selectedResource.slides[currentSlide].content}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {selectedResource.slides[currentSlide].points.map((point, idx) => (
                      <span key={idx} className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold text-indigo-300">
                        {point}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative circles */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="p-6 bg-slate-800/50 backdrop-blur-xl flex items-center justify-between border-t border-white/5">
              <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                  currentSlide === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-white hover:bg-white/10'
                }`}
              >
                <ChevronLeft size={20} />
                Sebelumnya
              </button>
              
              <div className="flex gap-2">
                {selectedResource.slides.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextSlide}
                disabled={currentSlide === selectedResource.slides.length - 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                  currentSlide === selectedResource.slides.length - 1 ? 'text-slate-600 cursor-not-allowed' : 'text-white hover:bg-white/10'
                }`}
              >
                Selanjutnya
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <BookOpen size={32} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mb-1 block">Detail Materi Aktif</span>
                <h3 className="text-2xl font-black text-slate-800 mb-2">{selectedResource.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{selectedResource.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resource List Area */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-widest">
                <FileText size={18} className="text-indigo-600" />
                Pilih Modul Materi
              </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {resources.map((res) => (
                <button 
                  key={res.id} 
                  onClick={() => changeResource(res)}
                  className={`w-full p-6 text-left hover:bg-slate-50/50 transition-all group ${
                    selectedResource.id === res.id ? 'bg-indigo-50/50' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      selectedResource.id === res.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                    }`}>
                      {res.type === 'PDF' ? <FileText size={18} /> : 
                       res.type === 'Video' ? <PlayCircle size={18} /> : <BookOpen size={18} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase text-indigo-600">{res.type}</span>
                        {selectedResource.id === res.id && (
                          <span className="bg-emerald-500 w-1.5 h-1.5 rounded-full animate-pulse"></span>
                        )}
                      </div>
                      <h4 className={`text-sm font-bold leading-tight transition-colors ${
                        selectedResource.id === res.id ? 'text-indigo-600' : 'text-slate-700'
                      }`}>
                        {res.title}
                      </h4>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-4">Butuh Bantuan?</h4>
              <p className="text-sm text-indigo-100 leading-relaxed mb-6">
                Tim fasilitator kami siap membimbing Anda dalam memahami slide materi ini secara mendalam.
              </p>
              <button className="w-full py-4 rounded-2xl bg-white text-indigo-900 font-black text-xs hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                HUBUNGI FASILITATOR
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12">
              <Monitor size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

