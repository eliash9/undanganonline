Undangan Pernikahan — Single Page

Ringan, elegan, responsif. Termasuk cover, countdown, profil mempelai, love story, detail acara, peta, galeri, RSVP + WhatsApp share, buku tamu (localStorage), live streaming (opsional), tombol share, copy link, kalender (Google/ICS), musik latar (opsional), serta banner protokol kesehatan.

Struktur
- `index.html` — Halaman utama
- `assets/css/style.css` — Tema warna, layout responsif
- `assets/js/main.js` — Interaksi (countdown, RSVP, guestbook, share, lightbox, musik, kalender)
- `assets/config.js` — Konfigurasi terpusat (nama, tanggal, lokasi, foto, warna, integrasi)
- `assets/img/` — Monogram dan gambar
- `assets/media/` — Media opsional (musik)

Cara Pakai Cepat
1) Buka `index.html` di browser (pratinjau lokal).
2) Edit semua detil di `assets/config.js` (nama, tanggal, lokasi, warna, map, foto, musik, galeri, share text, kontak, integrasi).
3) (Opsional) Ganti gambar/foto Anda sendiri.
4) Deploy ke Netlify/Vercel/GitHub Pages; gunakan domain kustom.

Konfigurasi Terpusat (tanpa edit HTML)
- `assets/config.js`
  - `theme.primary`, `theme.accent`: ubah warna utama/aksen (otomatis diterapkan ke UI).
  - `seo`, `share`: judul, deskripsi, teks share.
  - `couple`: data mempelai + foto.
  - `event`: tanggal tampil, target countdown, detail akad/resepsi, alamat venue, kalender (Google/ICS di JS).
  - `map`: `embedSrc` (iframe) dan `mapLink`.
  - `media`: cover, og image, musik, galeri, video/live.
  - `loveStory`: array timeline.
  - `contact`: footer contact/credit.
  - `integrations.whatsapp.phone`: nomor WA tujuan (opsional, internasional tanpa +, contoh `62812xxxxxx`).
  - `integrations.googleSheets.{rsvpEndpoint,wishesEndpoint}`: URL Web App (Apps Script) untuk menyimpan ke Google Sheets.

Open Invitation
- Tombol “Buka Undangan” sekarang menggulir halus ke bagian Countdown dan memulai musik (setelah interaksi pengguna), bukan diam di cover.

Kustomisasi Penting
- Countdown: atur di `config.js > event.countdownTarget`.
- Google Calendar & ICS: atur di `config.js > event.calendar`.
- Peta & link: `config.js > map`.
- Video & Live: `config.js > media.videoUrl` dan `media.liveUrl`.
- Share: gunakan tombol `Bagikan` (Web Share API), `Share WhatsApp`, dan `Salin Link`.
- Banner protokol: dapat dihapus dari `index.html` jika tak diperlukan.

Integrasi WhatsApp
- Set `integrations.whatsapp.phone` di `assets/config.js` agar tombol “Kirim via WhatsApp” (RSVP & Ucapan) mengirim ke nomor tertentu.
- Jika dikosongkan, akan menggunakan share generic (user memilih kontak secara manual).

Integrasi Google Sheets (Apps Script)
1) Buat Google Sheet baru, header kolom: `type, name, contact, guests, attendance, note, from, message, ts`.
2) Extensions → Apps Script → buat script:

```
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheets()[0];
  const data = JSON.parse(e.postData.contents || '{}');
  const row = [
    data.type || '', data.name || '', data.contact || '', data.guests || '',
    data.attendance || '', data.note || '', data.from || '', data.message || '', data.ts || Date.now()
  ];
  sh.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3) Deploy → New deployment → Web app
   - Execute as: Me
   - Who has access: Anyone with the link
   - Copy URL Web App (akhiran `/exec`).
4) Tempel URL ke `assets/config.js`:
   - `integrations.googleSheets.rsvpEndpoint` untuk RSVP
   - `integrations.googleSheets.wishesEndpoint` untuk Ucapan

Catatan keamanan: URL Web App terbuka (siapa pun dengan link bisa kirim). Jangan simpan data sensitif. Tambahkan validasi (mis. secret token) bila perlu.

Performa
- Gunakan gambar terkompresi; lazy loading sudah aktif.
- CSS/JS ringan. Font Google opsional; bisa ganti font sistem untuk menghemat request.

Catatan
- Instagram belum mendukung share langsung ke feed/story via web. Gunakan `Bagikan` (mobile), `Salin Link`, atau buka Instagram manual.
- Musik tidak autoplay tanpa interaksi pengguna.
