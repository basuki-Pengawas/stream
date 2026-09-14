import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/generate-mission", async (req, res) => {
  const { missionId, missionTitle } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Gemini API Key not configured" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Anda adalah seorang ahli pendidikan STEM. Buatkan draf pengerjaan untuk misi pelatihan guru berikut:
      - Judul Misi: ${missionTitle} (ID: ${missionId})

      Berikan panduan langkah-demi-langkah yang praktis, konkret, dan inspiratif sesuai dengan prinsip 5M (Murah, Mudah, Menggembirakan, Mindful, Meaningful).
      Output harus dalam Bahasa Indonesia yang profesional. JANGAN gunakan format markdown seperti tanda pagar (#) atau bintang (*) untuk penekanan atau judul. Gunakan teks biasa yang bersih.`,
    });

    res.json({ content: response.text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate mission content" });
  }
});

app.post("/api/generate-reflection", async (req, res) => {
  const { proyek, skor, rubrik } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Gemini API Key not configured" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Anda adalah seorang Pengawas Sekolah yang ahli dalam pendidikan STEM. 
      Berikan saran perbaikan (refleksi penilai) yang profesional, edukatif, dan membangun untuk proyek STEM berikut:
      - Nama Proyek: ${proyek}
      - Rata-rata Skor: ${skor}/5
      - Detail Rubrik: ${JSON.stringify(rubrik)}

      Berikan saran yang spesifik berdasarkan prinsip 5M (Murah, Mudah, Menggembirakan, Mindful, Meaningful) dan kearifan lokal.
      Gunakan Bahasa Indonesia yang formal and santun. Maksimal 3-4 kalimat. JANGAN gunakan format markdown seperti tanda pagar (#) atau bintang (*).`,
    });

    res.json({ reflection: response.text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate reflection" });
  }
});

app.post("/api/generate-project", async (req, res) => {
  const { jenjang, kelas, subjek, masalah, kearifan, bahan, anggaran, waktu } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Gemini API Key not configured" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Buatkan rancangan proyek STEM lengkap berdasarkan data berikut:
      - Jenjang: ${jenjang}
      - Kelas: ${kelas}
      - Mata Pelajaran: ${subjek}
      - Masalah Lokal: ${masalah}
      - Kearifan Lokal: ${kearifan}
      - Bahan Tersedia: ${bahan}
      - Anggaran: ${anggaran}
      - Waktu: ${waktu}

      Berikan output dalam format JSON dengan struktur:
      {
        "judul": "...",
        "latarBelakang": "...",
        "masalah": "...",
        "tujuan": "...",
        "pemantik": "...",
        "konsepSTEM": { "science": "...", "technology": "...", "engineering": "...", "math": "..." },
        "integrasi5M": "...",
        "alatBahan": ["...", "..."],
        "langkahKegiatan": ["...", "..."],
        "produk": "...",
        "asesmen": "...",
        "rubrik": "...",
        "refleksi": "...",
        "dokumentasi": "..."
      }
      Pastikan bahasa Indonesia yang digunakan profesional dan edukatif.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const projectData = JSON.parse(text);

    res.json(projectData);
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate project" });
  }
});

app.post("/api/generate-monitoring-recommendation", async (req, res) => {
  const { schoolInfo, scores } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Gemini API Key not configured" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Anda adalah seorang Pengawas Sekolah yang sangat ahli dalam implementasi STEM SINEMA. 
      Berdasarkan hasil observasi berikut:
      - Sekolah: ${schoolInfo.namaSekolah}
      - Guru: ${schoolInfo.namaGuru}
      - Skor Rubrik (1-4):
        * Perencanaan: ${scores.perencanaan}
        * Pelaksanaan: ${scores.pelaksanaan}
        * Produk 5M: ${scores.produk5m}
        * Refleksi: ${scores.refleksi}
        * Tindak Lanjut: ${scores.tindakLanjut}

      Berikan catatan rekomendasi tindak lanjut yang profesional, taktis, dan inspiratif. 
      Pastikan rekomendasi spesifik terhadap skor yang rendah dan berikan apresiasi untuk skor yang tinggi.
      Gunakan Bahasa Indonesia yang formal dan edukatif. Maksimal 4-5 kalimat. JANGAN gunakan format markdown seperti tanda pagar (#) atau bintang (*).`,
    });

    res.json({ recommendation: response.text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate recommendation" });
  }
});

app.post("/api/generate-stream-innovation", async (req, res) => {
  const { judul, lokasi, kearifanLokal } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Gemini API Key not configured" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Buatkan rancangan inovasi proyek STREAM (Science, Technology, Religion, Engineering, Art, Mathematics) lengkap berdasarkan data berikut:
      - Judul Proyek: ${judul}
      - Lokasi (Kec/Kab/Kota/Prov): ${lokasi}
      - Kearifan Lokal: ${kearifanLokal}

      Berikan output dalam format JSON dengan struktur:
      {
        "masalah": "Tuliskan masalah nyata yang harus diselesaikan...",
        "stream": {
          "science": "Penjelasan sains...",
          "technology": "Penjelasan teknologi...",
          "religion": "Penjelasan rinci Pengembangan Religius dan Karakter...",
          "engineering": "Penjelasan rekayasa/teknik...",
          "art": "Penjelasan rinci Pengembangan Art/Seni dan Budaya...",
          "mathematics": "Penjelasan matematika..."
        },
        "tujuanPembelajaran": "...",
        "alatBahan": ["...", "..."],
        "caraPembuatan": ["Langkah 1...", "Langkah 2..."],
        "langkah5M": {
          "murah": "...",
          "mudah": "...",
          "menggembirakan": "...",
          "mindful": "...",
          "meaningful": "..."
        },
        "rubrikAsesmen": [
          { "aspek": "Aspek Religius & Karakter", "kriteria": "..." },
          { "aspek": "Kreativitas Seni (Art)", "kriteria": "..." },
          { "aspek": "Fungsionalitas STEM", "kriteria": "..." },
          { "aspek": "Penerapan 5M", "kriteria": "..." }
        ]
      }
      Pastikan bahasa Indonesia yang digunakan profesional, edukatif, dan inspiratif. Khusus bagian Religius dan Art harus menonjolkan nilai-nilai karakter luhur dan kearifan lokal seni.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text));
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate STREAM innovation" });
  }
});

// Vite middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
