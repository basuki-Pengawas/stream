/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StemProject {
  id: string;
  judul: string;
  jenjang: string;
  mataPelajaran: string;
  masalah: string;
  kearifanLokal: string;
  science: string;
  technology: string;
  engineering: string;
  mathematics: string;
  bahan: string[];
  alat: string[];
  langkahKerja: string[];
  estimasiBiaya: string;
  konsep5M: string;
  hasil: string;
  refleksi: string;
  status: 'Selesai' | 'Berjalan' | 'Belum Dilaksanakan';
}

export interface Mission {
  id: number;
  title: string;
  description: string;
  tasks: string[];
  isLocked: boolean;
  isCompleted: boolean;
}

export interface EvaluationInstrument {
  id: string;
  perencanaan: number;
  pelaksanaan: number;
  produk: number;
  refleksi: number;
  tindakLanjut: number;
  status: 'Selesai' | 'Berjalan' | 'Belum Dilaksanakan';
}
