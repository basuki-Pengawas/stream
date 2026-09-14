import React from 'react';
import { 
  Camera, 
  Play, 
  Heart, 
  MessageCircle, 
  Share2, 
  User,
  Plus,
  Search,
  Tag
} from 'lucide-react';
import { motion } from 'motion/react';

const galleryItems = [
  { 
    id: 1, 
    title: 'Produksi Bio-Baterai dari Kulit Pisang', 
    author: 'Dr. Eni Kuswati', 
    likes: 124, 
    comments: 12,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400',
    tags: ['Science', 'SD', 'Jawa Tengah']
  },
  { 
    id: 2, 
    title: 'Purifikasi Air Tenaga Surya Pesisir', 
    author: 'Dr. Eni Kuswati', 
    likes: 89, 
    comments: 5,
    image: 'https://images.unsplash.com/photo-1544333346-60832bb5906e?auto=format&fit=crop&q=80&w=400',
    tags: ['Tech', 'SMP', 'Pesisir']
  },
  { 
    id: 3, 
    title: 'Robotik Bambu Pengusir Burung', 
    author: 'Dr. Eni Kuswati', 
    likes: 210, 
    comments: 45,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400',
    tags: ['Engineering', 'SMA', 'Agrikultur']
  },
  { 
    id: 4, 
    title: 'Bioplastik dari Pati Singkong Lokal', 
    author: 'Dr. Eni Kuswati', 
    likes: 156, 
    comments: 28,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d397195a?auto=format&fit=crop&q=80&w=400',
    tags: ['Chemistry', 'SMP', 'Lingkungan']
  },
  { 
    id: 5, 
    title: 'Pembangkit Listrik Mikro-Hidro Saluran Irigasi', 
    author: 'Dr. Eni Kuswati', 
    likes: 342, 
    comments: 89,
    image: 'https://images.unsplash.com/photo-1509391366360-fe5bb6521e8c?auto=format&fit=crop&q=80&w=400',
    tags: ['Energy', 'SMK', 'Engineering']
  },
  { 
    id: 6, 
    title: 'Eco-Enzyme dari Limbah Pasar Tradisional', 
    author: 'Dr. Eni Kuswati', 
    likes: 275, 
    comments: 64,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
    tags: ['Biology', 'SD', 'Sustainability']
  },
];

export default function PraktikBaik() {
  const [items, setItems] = React.useState(galleryItems);
  const [showUploadForm, setShowUploadForm] = React.useState(false);
  const [newItem, setNewItem] = React.useState({
    title: '',
    author: 'Guru Inovatif',
    tags: ['STEM']
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title) return;

    const addedItem = {
      id: Date.now(),
      title: newItem.title,
      author: newItem.author,
      likes: 0,
      comments: 0,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400',
      tags: newItem.tags
    };

    setItems([addedItem, ...items]);
    setShowUploadForm(false);
    setNewItem({ title: '', author: 'Guru Inovatif', tags: ['STEM'] });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Galeri Praktik Baik</h2>
          <p className="text-slate-500">Inspirasi implementasi STEM nyata dari rekan-rekan pendidik.</p>
        </div>
        <button 
          onClick={() => setShowUploadForm(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Camera size={20} />
          Unggah Praktik Baik
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex gap-2 p-1">
          {['Semua', 'Terpopuler', 'Video', 'Terbaru'].map((cat) => (
            <button key={cat} className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              cat === 'Semua' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {showUploadForm && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6"
        >
          <h3 className="text-xl font-bold text-slate-800">Unggah Praktik Baik Baru</h3>
          <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Judul Proyek</label>
              <input 
                type="text" 
                required
                placeholder="Contoh: Robotik Bambu Pintar"
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={newItem.title}
                onChange={e => setNewItem({...newItem, title: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button 
                type="submit"
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
              >
                Publikasikan
              </button>
              <button 
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="bg-slate-100 text-slate-500 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
              >
                Batal
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl transition-all"
          >
            <div className="relative aspect-video bg-slate-200 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute top-4 left-4 flex gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/20 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-4 right-4 bg-indigo-600 p-2 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                <Play size={20} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-slate-800 text-lg leading-tight mb-4">{item.title}</h3>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{item.author}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 pt-4 border-t border-slate-50 text-slate-400">
                <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                  <Heart size={18} />
                  <span className="text-xs font-bold">{item.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors">
                  <MessageCircle size={18} />
                  <span className="text-xs font-bold">{item.comments}</span>
                </button>
                <button className="ml-auto hover:text-slate-600 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
