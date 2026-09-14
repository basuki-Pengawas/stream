import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Award, 
  ArrowRight,
  ClipboardList,
  CheckCircle2,
  Clock,
  Zap,
  Compass,
  Camera,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Welcome Hero */}
      <section className="relative overflow-hidden bg-indigo-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 text-white shadow-2xl">
        <div className="relative z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-500/30 backdrop-blur px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold border border-indigo-400/30 mb-3 sm:mb-6"
          >
            <Sparkles size={14} className="text-amber-300" />
            GERAKAN STEM INDONESIA
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black mb-3 sm:mb-5 leading-snug sm:leading-tight"
          >
            Gerakan STEM Indonesia Berbasis Kearifan Lokal & Konsep 5M dengan Pengembangan Religius dan Art (STREAM)
          </motion.h1>
          <div className="p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 mb-6 sm:mb-8">
            <p className="text-indigo-100 text-xs sm:text-sm md:text-base leading-relaxed italic">
              "Desain dan Konsep Aplikasi STREAM Oleh <span className="font-bold text-white">Dr. Eni Kuswati, S.Pd.,M.Pd.</span> Platform SINEMA, implementasi pembelajaran di sekolah, pelatihan guru Kepala Sekolah dan Pengawas Sekolah di daerah-daerah, serta monitoring dan evaluasi secara terintegrasi."
            </p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button 
              onClick={() => onNavigate('petualangan')}
              className="bg-white text-indigo-900 px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-bold hover:bg-indigo-50 transition-all flex items-center gap-2 sm:gap-3 group shadow-xl shadow-indigo-950/20"
            >
              Mulai Petualangan
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button 
              onClick={() => onNavigate('ai')}
              className="bg-indigo-800/50 backdrop-blur-md text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-bold hover:bg-indigo-800 transition-all border border-indigo-700/50"
            >
              Coba STEM AI
            </button>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute right-[-10%] top-[-20%] w-2/3 h-[150%] opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#FFFFFF" d="M44.7,-76.4C58.3,-69.2,70,-57.9,78.7,-44.7C87.4,-31.5,93.1,-15.7,91.8,-0.7C90.5,14.3,82.3,28.6,72.6,41.2C62.9,53.8,51.8,64.7,38.7,72.4C25.6,80.1,10.6,84.6,-4.2,81.9C-19,79.2,-33.5,69.4,-46.8,59C-60.1,48.6,-72.1,37.6,-78.9,23.7C-85.7,9.8,-87.3,-7,-82.4,-21.8C-77.5,-36.6,-66,-49.4,-52.4,-56.6C-38.8,-63.8,-23.1,-65.4,-7.8,-74.1C7.5,-82.8,22.5,-98.6,37.1,-95.6C40.6,-94.9,43.2,-87.1,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center max-w-3xl mx-auto px-2">
          <h2 className="text-xs sm:text-sm font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 sm:mb-3">Prinsip Utama Pembelajaran</h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800">Filosofi 5M</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
          {[
            { id: '1', title: 'MURAH', desc: 'Memanfaatkan bahan terjangkau & barang bekas sekitar sekolah.', icon: '♻️' },
            { id: '2', title: 'MUDAH', desc: 'Praktis diterapkan di berbagai kondisi geografis daerah.', icon: '🛠️' },
            { id: '3', title: 'MENGGEMBIRAKAN', desc: 'Suasana belajar kolaboratif & berbasis permainan.', icon: '🎉' },
            { id: '4', title: 'MINDFUL', desc: 'Berkesadaran penuh pada isu lingkungan & sosial sekitar.', icon: '🧘' },
            { id: '5', title: 'MEANINGFUL', desc: 'Memberi dampak langsung bagi kehidupan nyata murid.', icon: '🎯' },
          ].map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm text-center space-y-3 sm:space-y-4 hover:shadow-xl transition-all"
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-4">{item.icon}</div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black mx-auto text-xs sm:text-sm">
                {item.id}
              </div>
              <h4 className="font-black text-slate-800 text-sm sm:text-base">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
