Undangan Pernikahan — Single Page

Ringan, elegan, responsif. Termasuk cover, countdown, profil mempelai, love story, detail acara, peta, galeri, RSVP + WhatsApp share, buku tamu (localStorage), live streaming (opsional), tombol share, copy link, kalender (Google/ICS), musik latar (opsional), serta banner protokol kesehatan.

Struktur
- `index.html` — Halaman utama (edit teks, tanggal, link map/video)
- `assets/css/style.css` — Tema warna, layout responsif
- `assets/js/main.js` — Interaksi (countdown, RSVP, guestbook, share, lightbox, musik, kalender)
- `assets/img/` — Monogram dan placeholder gambar (ganti dengan foto Anda)
- `assets/media/background-music.mp3` — Musik latar (opsional, tambahkan file sendiri)

Cara Pakai
1) Buka `index.html` di browser untuk pratinjau lokal.
2) Edit nama, tanggal, lokasi, dan konten lain langsung di `index.html`.
3) Ganti gambar di bagian galeri dan profil (letakkan di `assets/img/`).
4) (Opsional) Tambahkan musik ke `assets/media/background-music.mp3`.
5) Deploy ke hosting statis (Netlify, Vercel, GitHub Pages) dan pakai domain kustom.

Kustomisasi Penting
- Countdown: ubah atribut `data-target-date` di `#countdown .countdown-grid`.
- Google Calendar & ICS: ubah variabel `title`, `details`, `location`, `start`, `end` di `assets/js/main.js` bagian `initCalendar()`.
- Map: ganti `src` iframe Google Maps di bagian Peta.
- Video: ganti `src` iframe YouTube/Vimeo di Galeri / Live.
- RSVP/Guestbook: saat ini simpan lokal via `localStorage` (tidak ada backend). Integrasi layanan formulir (mis. Formspree, Supabase) bisa ditambahkan.
- Share: gunakan tombol `Bagikan` (Web Share API), `Share WhatsApp`, dan `Salin Link`.
- Banner protokol: aktif secara default (sekali tutup per perangkat). Hapus elemen `#health-banner` jika tidak diperlukan.

Performa
- Gambar: kompres dan gunakan dimensi sesuai tampilan (lazy loading aktif).
- CSS/JS minim, tanpa library berat. Font Google (opsional); bisa diganti dengan font sistem.

Catatan
- Instagram tidak menyediakan share via web ke feed/story secara langsung. Gunakan `Bagikan` (Web Share API) di mobile, `Salin Link`, atau tombol buka Instagram untuk melanjutkan manual.
- Audio tidak autoplay tanpa interaksi pengguna (kebijakan browser). Tombol “Buka Undangan” menyalakan musik.

