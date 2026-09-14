import React, { useState } from 'react';
import { 
  Lock, 
  CheckCircle2, 
  PlayCircle,
  Trophy,
  Map as MapIcon,
  ChevronRight,
  Sparkles,
  Download,
  Loader2,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_MISSIONS } from '../data';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export default function Petualangan() {
  const [activeMissions, setActiveMissions] = useState(INITIAL_MISSIONS);
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [missionContents, setMissionContents] = useState<Record<number, string>>({});

  const completeMission = (id: number) => {
    setActiveMissions(prev => prev.map(m => {
      if (m.id === id) return { ...m, isCompleted: true };
      if (m.id === id + 1) return { ...m, isLocked: false };
      return m;
    }));
  };

  const cleanMarkdown = (text: string) => {
    return text
      .replace(/[#*]/g, '') // Remove # and *
      .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
      .trim();
  };

  const handleAutoAI = async (id: number, title: string) => {
    setGeneratingId(id);
    try {
      const response = await fetch('/api/generate-mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missionId: id, missionTitle: title }),
      });
      const data = await response.json();
      if (data.content) {
        setMissionContents(prev => ({ ...prev, [id]: cleanMarkdown(data.content) }));
        completeMission(id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setGeneratingId(null);
    }
  };

  const handleDownloadWord = async (id: number, title: string, description: string, tasks: string[]) => {
    const content = missionContents[id];
    if (!content) return;
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "LAPORAN MISI PETUALANGAN SINEMA",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: `Misi: ${title}`, bold: true, size: 24 })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "\n" })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "DESKRIPSI MISI", bold: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: description })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "\n" })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "INSTRUKSI TUGAS", bold: true })],
          }),
          ...tasks.map(task => new Paragraph({
            children: [new TextRun({ text: `- ${task}` })],
          })),
          new Paragraph({
            children: [new TextRun({ text: "\n" })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "HASIL PENGERJAAN MISI", bold: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: content })],
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Misi_${id}_${title.replace(/ /g, '_')}.docx`);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-indigo-900 p-10 rounded-[2.5rem] border border-indigo-700 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-8">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl rotate-12 flex items-center justify-center text-white border border-white/20 shadow-xl">
            <Trophy size={48} />
          </div>
          <div className="space-y-2">
            <h4 className="text-amber-300 font-black text-xs tracking-widest uppercase">SINAR EDUKASI MANDIRI</h4>
            <h2 className="text-4xl font-black text-white leading-none">PETUALANGAN SINEMA</h2>
            <p className="text-indigo-200 font-medium text-lg">Selesaikan Misi Strategis untuk menguasai konsep STEM 5M & Strategi Implementasi secara Kontekstual.</p>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-4 bg-white/5 backdrop-blur-lg px-8 py-6 rounded-3xl border border-white/10">
          <div className="text-right">
            <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.3em] mb-1">Level Pendidik</p>
            <p className="text-2xl font-black text-white">INOVATOR LOKAL</p>
          </div>
          <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg border border-indigo-400">
            4
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-10%] w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <div className="absolute left-10 top-0 bottom-0 w-1 bg-slate-200 -z-10 hidden md:block"></div>

        <div className="grid grid-cols-1 gap-8">
          {activeMissions.map((mission, index) => (
            <motion.div 
              key={mission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-8 group"
            >
              <div className={`mt-4 flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-xl transition-transform group-hover:scale-110 z-10 ${
                mission.isCompleted ? 'bg-emerald-500 text-white' : 
                mission.isLocked ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white ring-8 ring-indigo-50'
              }`}>
                {mission.isCompleted ? <CheckCircle2 size={32} /> : 
                 mission.isLocked ? <Lock size={32} /> : <span className="text-2xl font-black">{mission.id}</span>}
              </div>

              <div className={`flex-1 bg-white p-8 rounded-[2rem] border-2 shadow-sm transition-all ${
                mission.isLocked ? 'opacity-70 grayscale bg-slate-50 border-slate-100' : 'hover:shadow-xl hover:border-indigo-100 border-slate-50'
              } ${!mission.isLocked && !mission.isCompleted ? 'ring-2 ring-indigo-500/20 bg-indigo-50/10' : ''}`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-1">Deskripsi Misi</h4>
                        <h3 className="text-2xl font-black text-slate-800">{mission.title}</h3>
                        <p className="text-slate-500 leading-relaxed font-medium mt-2">{mission.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">Instruksi Tugas</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {mission.tasks.map((task, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                              <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${mission.isCompleted ? 'bg-emerald-400' : 'bg-indigo-400'}`}></div>
                              <span className="text-xs font-bold text-slate-600">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-start">
                      {!mission.isLocked && !mission.isCompleted && (
                        <button 
                          onClick={() => handleAutoAI(mission.id, mission.title)}
                          disabled={generatingId === mission.id}
                          className="bg-amber-50 text-amber-700 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-amber-100 transition-all flex items-center gap-2 border border-amber-200"
                        >
                          {generatingId === mission.id ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                          Isi Otomatis (AI)
                        </button>
                      )}
                      {!mission.isLocked && (
                        <button 
                          onClick={() => handleDownloadWord(mission.id, mission.title, mission.description, mission.tasks)}
                          disabled={!missionContents[mission.id]}
                          className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${
                            missionContents[mission.id] 
                            ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800' 
                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          }`}
                        >
                          <FileText size={16} />
                          Download Word
                        </button>
                      )}
                    </div>
                  </div>

                  {!mission.isLocked && (
                    <div className="mt-8 pt-8 border-t border-slate-100">
                      <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                        Hasil Pengerjaan Misi
                        <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded text-[10px] font-bold lowercase italic">Bisa diedit manual</span>
                      </h4>
                      <textarea
                        value={missionContents[mission.id] || ''}
                        onChange={(e) => setMissionContents(prev => ({ ...prev, [mission.id]: e.target.value }))}
                        placeholder="Hasil pengerjaan misi akan tampil di sini..."
                        className="w-full min-h-[200px] p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 text-sm text-slate-700 leading-relaxed font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all outline-none"
                      />
                    </div>
                  )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
