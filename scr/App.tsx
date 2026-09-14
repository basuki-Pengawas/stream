import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Beaker, 
  Compass, 
  ClipboardList, 
  Camera, 
  BarChart3, 
  FileText, 
  Sparkles,
  Search,
  Plus,
  ArrowRight,
  CheckCircle2,
  Lock,
  Download,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_PROJECTS, INITIAL_MISSIONS } from './data';
import { StemProject, Mission } from './types';

// Components for different views
import Dashboard from './components/Dashboard';
import Materi from './components/Materi';
import Lab5M from './components/Lab5M';
import Petualangan from './components/Petualangan';
import ProjectBank from './components/ProjectBank';
import Monitoring from './components/Monitoring';
import Evaluasi from './components/Evaluasi';
import Laporan from './components/Laporan';
import StemAI from './components/StemAI';
import PraktikBaik from './components/PraktikBaik';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'materi', label: 'Materi', icon: BookOpen },
  { id: '5m', label: 'Laboratorium 5M', icon: Beaker },
  { id: 'petualangan', label: 'Petualangan', icon: Compass },
  { id: 'proyek', label: 'Proyek STEM', icon: ClipboardList },
  { id: 'praktik', label: 'Praktik Baik', icon: Camera },
  { id: 'monitoring', label: 'Monitoring', icon: BarChart3 },
  { id: 'evaluasi', label: 'Evaluasi', icon: BarChart3 },
  { id: 'laporan', label: 'Laporan', icon: FileText },
  { id: 'ai', label: 'STEM AI', icon: Sparkles },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
      case 'materi': return <Materi />;
      case '5m': return <Lab5M onNavigate={setActiveTab} />;
      case 'petualangan': return <Petualangan />;
      case 'proyek': return <ProjectBank />;
      case 'praktik': return <PraktikBaik />;
      case 'monitoring': return <Monitoring />;
      case 'evaluasi': return <Evaluasi />;
      case 'laporan': return <Laporan />;
      case 'ai': return <StemAI />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Mobile Backdrop Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isMobile ? (isSidebarOpen ? 260 : 0) : (isSidebarOpen ? 280 : 80),
          x: isMobile && !isSidebarOpen ? -260 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-50 flex flex-col shadow-lg md:shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between overflow-hidden">
          {(isSidebarOpen || isMobile) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 font-bold text-indigo-700 whitespace-nowrap"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shrink-0">
                <Sparkles size={18} />
              </div>
              <span className="text-lg sm:text-xl tracking-tight">STEM SINEMA <p>Pengawas Digital</p></span>
            </motion.div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors shrink-0"
            aria-label="Toggle Menu"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (isMobile) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200/50' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
              {(isSidebarOpen || isMobile) && <span className="font-medium whitespace-nowrap text-sm sm:text-base">{item.label}</span>}
              {activeTab === item.id && (isSidebarOpen || isMobile) && (
                <motion.div 
                  layoutId="activeTab"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className={`flex items-center gap-3 ${(isSidebarOpen || isMobile) ? 'bg-slate-50 p-2 rounded-xl' : 'justify-center'}`}>
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs sm:text-sm shrink-0">
              BF
            </div>
            {(isSidebarOpen || isMobile) && (
              <div className="overflow-hidden">
                <p className="text-xs sm:text-sm font-semibold truncate">Basoeky, S.Kom.</p>
                <p className="text-[10px] sm:text-xs text-slate-500 truncate">Pengawas TK/SD</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className="flex-1 transition-all duration-300 min-w-0"
        style={{ marginLeft: isMobile ? 0 : (isSidebarOpen ? 280 : 80) }}
      >
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {isMobile && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors md:hidden"
                aria-label="Open Menu"
              >
                <Menu size={22} />
              </button>
            )}
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 capitalize truncate">
              {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button 
              onClick={() => setActiveTab('proyek')}
              className="bg-indigo-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1.5 sm:gap-2 shadow-md shadow-indigo-200"
            >
              <Plus size={16} />
              <span className="hidden xs:inline">Proyek Baru</span>
              <span className="xs:hidden">Proyek</span>
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
