import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Plus, 
  ExternalLink, 
  BookOpen,
  Info,
  ChevronDown,
  BarChart,
  Code,
  Wrench,
  Variable,
  Loader2,
  FileDown,
  Church,
  Calculator,
  Compass,
  Palette,
  Atom,
  Cpu,
  List,
  CheckCircle2
} from 'lucide-react';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { INITIAL_PROJECTS } from '../data';
import { StemProject } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function ProjectBank() {
  const [projects, setProjects] = useState<StemProject[]>(INITIAL_PROJECTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<StemProject | null>(null);
  
  // New Project Form State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    lokasi: 'Dawe Kudus Jawa Tengah',
    kearifanLokal: ''
  });
  const [generatedProject, setGeneratedProject] = useState<any>(null);

  const handleGenerate = async () => {
    if (!formData.judul || !formData.kearifanLokal) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-stream-innovation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setGeneratedProject(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadWord = async () => {
    if (!generatedProject) return;

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "LEMBAR KEGIATAN STREAM MURID",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({ text: `Judul Proyek: `, bold: true }),
              new TextRun({ text: formData.judul }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Lokasi: `, bold: true }),
              new TextRun({ text: formData.lokasi }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Kearifan Lokal: `, bold: true }),
              new TextRun({ text: formData.kearifanLokal }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "TUJUAN PEMBELAJARAN", heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: generatedProject.tujuanPembelajaran }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "MASALAH UTAMA", heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: generatedProject.masalah }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "KONSEP STREAM", heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ children: [new TextRun({ text: "Science: ", bold: true }), new TextRun(generatedProject.stream.science)] }),
          new Paragraph({ children: [new TextRun({ text: "Technology: ", bold: true }), new TextRun(generatedProject.stream.technology)] }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "PENGEMBANGAN RELIGIUS DAN ART", heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ children: [new TextRun({ text: "Religion/Character: ", bold: true }), new TextRun(generatedProject.stream.religion)] }),
          new Paragraph({ children: [new TextRun({ text: "Art/Seni: ", bold: true }), new TextRun(generatedProject.stream.art)] }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "ENGINEERING DAN MATHEMATICS", heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ children: [new TextRun({ text: "Engineering: ", bold: true }), new TextRun(generatedProject.stream.engineering)] }),
          new Paragraph({ children: [new TextRun({ text: "Mathematics: ", bold: true }), new TextRun(generatedProject.stream.mathematics)] }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "ALAT DAN BAHAN", heading: HeadingLevel.HEADING_2 }),
          ...generatedProject.alatBahan.map((item: string) => new Paragraph({ text: `• ${item}`, bullet: { level: 0 } })),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "LANGKAH-LANGKAH 5M", heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ children: [new TextRun({ text: "1. Murah: ", bold: true }), new TextRun(generatedProject.langkah5M.murah)] }),
          new Paragraph({ children: [new TextRun({ text: "2. Mudah: ", bold: true }), new TextRun(generatedProject.langkah5M.mudah)] }),
          new Paragraph({ children: [new TextRun({ text: "3. Menggembirakan: ", bold: true }), new TextRun(generatedProject.langkah5M.menggembirakan)] }),
          new Paragraph({ children: [new TextRun({ text: "4. Mindful: ", bold: true }), new TextRun(generatedProject.langkah5M.mindful)] }),
          new Paragraph({ children: [new TextRun({ text: "5. Meaningful: ", bold: true }), new TextRun(generatedProject.langkah5M.meaningful)] }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "CARA PEMBUATAN", heading: HeadingLevel.HEADING_2 }),
          ...generatedProject.caraPembuatan.map((step: string, i: number) => new Paragraph({ text: `${i + 1}. ${step}` })),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "RUBRIK ASESMEN STREAM", heading: HeadingLevel.HEADING_2 }),
          ...generatedProject.rubrikAsesmen.map((item: any) => new Paragraph({ 
            children: [
              new TextRun({ text: `• ${item.aspek}: `, bold: true }),
              new TextRun({ text: item.kriteria }),
            ]
          })),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Lembar_Kegiatan_STREAM_${formData.judul.replace(/\s+/g, '_')}.docx`);
  };

  const filteredProjects = projects;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Bank Proyek STEM</h2>
          <p className="text-slate-500">Koleksi praktik baik STEM berbasis kearifan lokal di Indonesia.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={20} />
          Buat Proyek Baru
        </button>
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
                <div>
                  <h3 className="text-2xl font-black">Daftarkan Inovasi STEM Baru</h3>
                  <p className="text-indigo-100 text-sm mt-1">Lengkapi formulir di bawah ini untuk membagikan rancangan proyek Anda ke seluruh Indonesia.</p>
                </div>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Judul Proyek STEAM</label>
                      <input 
                        type="text" 
                        placeholder="Masukan Judul Proyek"
                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-800 font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                        value={formData.judul}
                        onChange={e => setFormData({...formData, judul: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Kecamatan/Kabupaten/Kota/Propinsi</label>
                      <input 
                        type="text" 
                        placeholder="Dawe Kudus Jawa Tengah"
                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-800 font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                        value={formData.lokasi}
                        onChange={e => setFormData({...formData, lokasi: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Kearifan Lokal Daerah</label>
                      <textarea 
                        placeholder="misal teknik tenun, Kuliner lokal atau alat tradisional dan seni lainnya."
                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-800 font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 h-32 resize-none"
                        value={formData.kearifanLokal}
                        onChange={e => setFormData({...formData, kearifanLokal: e.target.value})}
                      />
                    </div>
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating || !formData.judul || !formData.kearifanLokal}
                      className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 flex items-center justify-center gap-3 hover:bg-indigo-700 disabled:opacity-50 transition-all"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Membangun Konsep STREAM...
                        </>
                      ) : (
                        <>
                          <Sparkles size={20} />
                          Generate Proyek dengan AI
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 flex flex-col items-center justify-center text-center">
                    {!generatedProject && !isGenerating ? (
                      <div className="space-y-4">
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto text-slate-300">
                          <BookOpen size={40} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">Pratinjau Hasil AI</h4>
                          <p className="text-sm text-slate-500 mt-2">Isi formulir dan klik tombol Generate untuk melihat rencana STREAM otomatis.</p>
                        </div>
                      </div>
                    ) : isGenerating ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                        <p className="text-sm font-bold text-slate-500">AI sedang menyusun rencana terbaik...</p>
                      </div>
                    ) : (
                      <div className="w-full space-y-6 text-left overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                          <h5 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Masalah Utama</h5>
                          <p className="text-sm text-slate-700 leading-relaxed font-medium">{generatedProject.masalah}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Science', val: generatedProject.stream.science, icon: Atom, color: 'indigo' },
                            { label: 'Technology', val: generatedProject.stream.technology, icon: Cpu, color: 'blue' },
                            { label: 'Pengembangan Religius', val: generatedProject.stream.religion, icon: Church, color: 'emerald' },
                            { label: 'Engineering', val: generatedProject.stream.engineering, icon: Wrench, color: 'amber' },
                            { label: 'Pengembangan Art', val: generatedProject.stream.art, icon: Palette, color: 'rose' },
                            { label: 'Mathematics', val: generatedProject.stream.mathematics, icon: Calculator, color: 'violet' },
                          ].map((item, idx) => (
                            <div key={idx} className={`p-4 rounded-xl bg-${item.color}-50 border border-${item.color}-100`}>
                              <div className="flex items-center gap-2 mb-1">
                                <item.icon size={12} className={`text-${item.color}-600`} />
                                <span className={`text-[10px] font-black text-${item.color}-600 uppercase`}>{item.label}</span>
                              </div>
                              <p className={`text-[10px] text-${item.color}-900 font-bold leading-tight`}>{item.val}</p>
                            </div>
                          ))}
                        </div>

                        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                          <h5 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Tujuan Pembelajaran</h5>
                          <p className="text-xs text-emerald-900 font-bold leading-relaxed">{generatedProject.tujuanPembelajaran}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2 px-1">
                            <List size={14} className="text-indigo-600" />
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cara Pembuatan</h5>
                          </div>
                          <div className="space-y-2">
                            {generatedProject.caraPembuatan.map((step: string, i: number) => (
                              <div key={i} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                                <p className="text-[10px] text-slate-700 font-medium leading-relaxed">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2 px-1">
                            <CheckCircle2 size={14} className="text-emerald-600" />
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rubrik Asesmen STREAM</h5>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {generatedProject.rubrikAsesmen.map((item: any, i: number) => (
                              <div key={i} className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex flex-col gap-1">
                                <span className="text-[10px] font-black text-emerald-700 uppercase">{item.aspek}</span>
                                <p className="text-[10px] text-emerald-900 font-bold leading-tight">{item.kriteria}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button 
                          onClick={handleDownloadWord}
                          className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                        >
                          <FileDown size={20} />
                          Unduh Lembar Kegiatan (Word)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="h-48 bg-slate-200 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-300 transition-colors">
                  {project.judul}
                </h3>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                {project.jenjang}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-indigo-600 font-bold text-xs">S</div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 font-bold text-xs">T</div>
                  <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-amber-600 font-bold text-xs">E</div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-emerald-600 font-bold text-xs">M</div>
                </div>
                <span className="text-xs text-slate-400 font-medium">{project.mataPelajaran}</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                {project.masalah}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                  project.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {project.status}
                </span>
                <span className="text-indigo-600 text-xs font-bold flex items-center gap-1">
                  Lihat Detail
                  <ChevronDown size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-800">{selectedProject.judul}</h3>
              <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Info size={16} /> Latar Belakang
                    </h4>
                    <p className="text-slate-700 leading-relaxed">{selectedProject.masalah}</p>
                  </section>

                  <section>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <BarChart size={16} /> Unsur STEM
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                        <span className="text-[10px] font-black text-indigo-600 uppercase">Science</span>
                        <p className="text-sm text-indigo-900 mt-1">{selectedProject.science}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                        <span className="text-[10px] font-black text-blue-600 uppercase">Technology</span>
                        <p className="text-sm text-blue-900 mt-1">{selectedProject.technology}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                        <span className="text-[10px] font-black text-amber-600 uppercase">Engineering</span>
                        <p className="text-sm text-amber-900 mt-1">{selectedProject.engineering}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                        <span className="text-[10px] font-black text-emerald-600 uppercase">Mathematics</span>
                        <p className="text-sm text-emerald-900 mt-1">{selectedProject.mathematics}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <BookOpen size={16} /> Langkah Kerja
                    </h4>
                    <ol className="space-y-3">
                      {selectedProject.langkahKerja.map((step, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                          <span className="text-slate-700 text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-4">Informasi Proyek</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-xs text-slate-500">Estimasi Biaya</span>
                        <span className="text-xs font-bold text-slate-900">{selectedProject.estimasiBiaya}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-xs text-slate-500">Kearifan Lokal</span>
                        <span className="text-xs font-bold text-indigo-600">{selectedProject.kearifanLokal}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-xs text-slate-500">Mata Pelajaran</span>
                        <span className="text-xs font-bold text-slate-900">{selectedProject.mataPelajaran}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
                    <h4 className="font-bold mb-2">Refleksi Pendidik</h4>
                    <p className="text-xs text-indigo-100 leading-relaxed italic">
                      "{selectedProject.refleksi}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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

function Sparkles({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

function UserCheck({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}
