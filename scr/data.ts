import { StemProject, Mission } from './types';

export const INITIAL_PROJECTS: StemProject[] = [
  {
    id: '1',
    judul: 'Ecoprint Sederhana: Jejak Daun di Kain',
    jenjang: 'PAUD/TK',
    mataPelajaran: 'Seni & Alam',
    masalah: 'Kurangnya kegiatan motorik halus yang terhubung dengan alam.',
    kearifanLokal: 'Pemanfaatan tanaman pekarangan.',
    science: 'Mengenal warna alami dari tumbuhan.',
    technology: 'Alat penumbuk sederhana (palu kayu).',
    engineering: 'Teknik menata komposisi daun di atas kain.',
    mathematics: 'Menghitung jumlah daun dan membandingkan ukuran.',
    bahan: ['Kain katun', 'Daun segar', 'Tawas'],
    alat: ['Palu kayu', 'Plastik'],
    langkahKerja: ['Pilih daun', 'Tata di kain', 'Pukul perlahan', 'Fiksasi tawas', 'Jemur'],
    estimasiBiaya: 'Rp 10.000',
    konsep5M: 'Murah (daun sekitar), Menyenangkan (memukul)',
    hasil: 'Kain motif alam karya siswa.',
    refleksi: 'Anak-anak sangat senang mengeksplorasi warna daun.',
    status: 'Selesai'
  },
  {
    id: '2',
    judul: 'Filtrasi Air Sungai dengan Bahan Alami',
    jenjang: 'SD',
    mataPelajaran: 'IPA',
    masalah: 'Air sungai yang keruh di sekitar pemukiman.',
    kearifanLokal: 'Kebiasaan menggunakan air sungai.',
    science: 'Konsep penjernihan air secara mekanis.',
    technology: 'Susunan filter bertingkat.',
    engineering: 'Merancang wadah filtrasi dari bambu atau botol.',
    mathematics: 'Mengukur debit air dan ketebalan lapisan filter.',
    bahan: ['Pasir', 'Kerikil', 'Ijuk', 'Arang', 'Batu'],
    alat: ['Botol bekas', 'Gunting', 'Gelas ukur'],
    langkahKerja: ['Siapkan botol', 'Susun bahan filter', 'Tuangkan air keruh', 'Amati hasil', 'Uji kejernihan'],
    estimasiBiaya: 'Rp 5.000',
    konsep5M: 'Mudah (bahan alam), Bermakna (solusi air bersih)',
    hasil: 'Air yang lebih jernih dan layak guna.',
    refleksi: 'Siswa belajar pentingnya menjaga kelestarian air sungai.',
    status: 'Selesai'
  },
  {
    id: '3',
    judul: 'Fermentasi Tempe dengan Alat Bekas',
    jenjang: 'SMP',
    mataPelajaran: 'IPA',
    masalah: 'Limbah plastik dan kebutuhan pangan bergizi murah.',
    kearifanLokal: 'Pembuatan tempe tradisional.',
    science: 'Proses fermentasi Rhizopus oligosporus.',
    technology: 'Pemanfaatan alat pengukur suhu digital sederhana.',
    engineering: 'Desain wadah inkubasi dari botol plastik bekas.',
    mathematics: 'Penghitungan perbandingan ragi dan kedelai.',
    bahan: ['Kedelai', 'Ragi Tempe', 'Botol Plastik Bekas'],
    alat: ['Dandang', 'Saringan', 'Termometer'],
    langkahKerja: ['Cuci kedelai', 'Rebus', 'Campur ragi', 'Masukkan botol', 'Inkubasi'],
    estimasiBiaya: 'Rp 20.000',
    konsep5M: 'Murah (bahan lokal), Bermakna (pangan)',
    hasil: 'Tempe berkualitas tinggi dengan wadah daur ulang.',
    refleksi: 'Murid sangat antusias mengamati pertumbuhan jamur.',
    status: 'Selesai'
  },
  {
    id: '4',
    judul: 'Miniatur Kapal Pinisi dari Bambu',
    jenjang: 'SMA',
    mataPelajaran: 'Fisika & Prakarya',
    masalah: 'Kurangnya pemahaman mekanika fluida dan pelestarian budaya.',
    kearifanLokal: 'Budaya maritim pembuatan Kapal Pinisi.',
    science: 'Hukum Archimedes dan kesetimbangan benda tegar.',
    technology: 'Penggunaan software CAD untuk desain layar.',
    engineering: 'Konstruksi lambung kapal menggunakan teknik pasak kayu.',
    mathematics: 'Perhitungan luas layar dan volume lambung.',
    bahan: ['Bambu', 'Tali nilon', 'Kain perca'],
    alat: ['Pisau raut', 'Amplas', 'Lem kayu'],
    langkahKerja: ['Desain kerangka', 'Potong bambu', 'Rakit lambung', 'Pasang layar', 'Uji apung'],
    estimasiBiaya: 'Rp 50.000',
    konsep5M: 'Mindful (budaya), Menyenangkan (membuat karya)',
    hasil: 'Model kapal yang mampu terapung stabil.',
    refleksi: 'Perlu ketelitian dalam penyambungan bambu agar tidak bocor.',
    status: 'Selesai'
  },
  {
    id: '5',
    judul: 'Otomasi Penyiraman Tanaman Hidroponik',
    jenjang: 'SMK',
    mataPelajaran: 'Produktif Pertanian & Elektronika',
    masalah: 'Efisiensi tenaga kerja dan penggunaan air di lahan sempit.',
    kearifanLokal: 'Budidaya sayur mayur lokal.',
    science: 'Nutrisi tanaman (AB Mix) dan pH air.',
    technology: 'Sensor kelembaban tanah dan Arduino Uno.',
    engineering: 'Sistem irigasi tetes otomatis.',
    mathematics: 'Perhitungan konsentrasi nutrisi dan debit pompa.',
    bahan: ['Bibit sayur', 'Pipa PVC', 'Pompa air', 'Sensor'],
    alat: ['Solder', 'Laptop', 'Bor'],
    langkahKerja: ['Rakit pipa', 'Program Arduino', 'Pasang sensor', 'Uji coba sistem', 'Tanam bibit'],
    estimasiBiaya: 'Rp 150.000',
    konsep5M: 'Mudah (sistem otomatis), Bermakna (pangan modern)',
    hasil: 'Sistem hidroponik pintar siap pakai.',
    refleksi: 'Siswa SMK siap menghadapi era pertanian 4.0.',
    status: 'Selesai'
  }
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 1,
    title: 'MISI 1: Kenali STREAM',
    description: 'Mempelajari filosofi dasar STREAM (STEM + Religious & Art), keterkaitannya dengan Kearifan Lokal Indonesia, dan kerangka 5M.',
    tasks: ['Pahami filosofi STREAM', 'Integrasi 5M'],
    isLocked: false,
    isCompleted: false
  },
  {
    id: 2,
    title: 'MISI 2: Temukan Masalah',
    description: 'Mengidentifikasi masalah otentik dan nyata di lingkungan sekitar sekolah atau tempat tinggal Anda.',
    tasks: ['Observasi lingkungan', 'Identifikasi masalah nyata'],
    isLocked: true,
    isCompleted: false
  },
  {
    id: 3,
    title: 'MISI 3: Temukan Kearifan Lokal',
    description: 'Mengidentifikasi potensi, budaya, atau kebiasaan lokal setempat yang dapat dijadikan sumber daya proyek STEM.',
    tasks: ['Survey budaya lokal', 'Potensi sumber daya'],
    isLocked: true,
    isCompleted: false
  },
  {
    id: 4,
    title: 'MISI 4: Terapkan 5M',
    description: 'Mendesain rancangan pembelajaran STEM yang memenuhi kelima prinsip 5M (Murah, Mudah, Menggembirakan, Mindful, Meaningful).',
    tasks: ['Rancang prinsip 5M', 'Validasi kelayakan'],
    isLocked: true,
    isCompleted: false
  },
  {
    id: 5,
    title: 'MISI 5: Rancang Solusi STREAM',
    description: 'Membuat dokumen Rencana Pembelajaran STREAM (RPP / Modul Ajar) dan Lembar Kerja Murid (LKM).',
    tasks: ['Susun RPP STREAM', 'Buat LKM'],
    isLocked: true,
    isCompleted: false
  },
  {
    id: 6,
    title: 'MISI 6: Uji Coba STREAM',
    description: 'Melaksanakan proyek STREAM bersama peserta didik atau rekan sejawat guru.',
    tasks: ['Implementasi kelas', 'Observasi proses'],
    isLocked: true,
    isCompleted: false
  },
  {
    id: 7,
    title: 'MISI 7: Refleksi',
    description: 'Mengevaluasi hasil pembelajaran, keberhasilan, kendala, dan respon siswa.',
    tasks: ['Evaluasi hasil', 'Umpan balik siswa'],
    isLocked: true,
    isCompleted: false
  }
];
