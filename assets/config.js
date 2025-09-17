// Centralized configuration for the invitation
// Edit only this file to update names, dates, locations, photos, links, and integrations
window.INVITATION_CONFIG = {
  theme: {
    // Palet 3 warna (maroon, apricot, sage)
    primary: '#8e1f49',   // maroon / wine
    accent: '#f4ad52',    // apricot / peach
    secondary: '#c5d9a7'  // sage green (opsional)
  },
  ui: {
    showHealthBanner: false,
    usePatternDecor: true,
    hideFloatingUntilOpen: false
  },
  seo: {
    title: 'Undangan Pernikahan | Pinanti & Bayu',
    description: 'Mohon doa restu dan kehadiran Anda di hari istimewa kami.'
  },
  share: {
    title: 'Undangan Pernikahan Pinanti & Bayu',
    text: 'Undangan pernikahan kami. Mohon doa restunya.'
  },
  couple: {
    bride: {
      shortName: 'Pinanti',
      fullName: 'Retno Pinanti Khairunnisa',
      parents: 'Putri dari Bapak Karyono dan Ibu Rosyidah',
      origin: 'Jl. Puntodewo No.1 Panjunan RT 01 RW 01, Pati, Pati',
      photoUrl: 'assets/img/bride.png'
    },
    groom: {
      shortName: 'Bayu',
      fullName: 'Bayu Sidiq Munandar',
      parents: 'Putra dari Bapak Kirman & Ibu Narti',
      origin: 'Randulawang RT 00 RW 02, Butuh, Mojosongo, Boyolali',
      photoUrl: 'assets/img/groom.png'
    }
  },
  event: {
    dateText: 'Sabtu, 11 Oktober 2025',
    countdownTarget: '2025-10-11T10:00:00+07:00',
    akad: {
      dateText: 'Sabtu, 11 Oktober 2025',
      timeText: '10.00-11.00 WIB',
      place: 'Hotel New Merdeka Pati',
      note: 'Jl. Diponehoro No. 69 Pati'
    },
    resepsi: {
      dateText: 'Sabtu, 11 Oktober 2025',
      timeText: '11.00 - 13.00 WIB',
      place: 'Hotel New Merdeka Pati',
      note: 'Jl. Diponehoro No. 69 Pati'
    },
    venueAddress: 'Jl. Diponehoro No. 69 Pati',
    calendar: {
      title: 'Akad & Resepsi Pinanti & Bayu',
      details: 'Mohon doa restu. Lokasi: Hotel New Merdeka Pati.',
      location: 'Hotel New Merdeka Pati, Jl. Diponehoro No. 69 Pati',
      startISO: '2025-10-11T10:00:00+07:00',
      endISO: '2025-10-11T13:00:00+07:00'
    }
  },
  map: {
    embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1217.481430867941!2d111.03372765772274!3d-6.74792369220553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70d24d7f5b7a67%3A0xf5baa719f9d8810b!2sNew%20Merdeka%20Hotel%20Pati!5e1!3m2!1sid!2sid!4v1758091390758!5m2!1sid!2sid',
    mapLink: 'https://maps.app.goo.gl/ZLQWopLDXZnLTbQQ8'
  },
  media: {
    coverImage: 'assets/img/bg-cover.png',
    ogImage: 'assets/img/bg-cover.png',
    musicUrl: 'assets/media/arabic-islamic-islam-music-360770.mp3',
    patternImage: 'assets/img/Tropis 8.png',
    gallery: [
      { src: 'assets/img/bg-cover.png', thumb: 'assets/img/bg-cover.png', alt: 'Cincin' },
      { src: 'assets/img/gallery1.png', thumb: 'assets/img/gallery1.png', alt: 'Buket' },
      { src: 'assets/img/gallery2.png', thumb: 'assets/img/gallery2.png', alt: 'Tangan pasangan' },
     
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveUrl: 'https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID'
  },
  loveStory: [
    { title: 'Pertemuan Pertama', time: '2019', text: 'Bertemu di sebuah acara komunitas dan saling bertukar cerita.' },
    { title: 'Komitmen', time: '2022', text: 'Memutuskan untuk melangkah bersama ke jenjang yang lebih serius.' },
    { title: 'Lamaran', time: '2024', text: 'Prosesi lamaran sederhana bersama keluarga terdekat.' }
  ],
  contact: {
    footerText: 'Kontak keluarga: 0812-0000-XXXX | IG: @pinanti.bayu',
    credit: 'Foto: Unsplash · Musik: Pixabay (royalty‑free)'
  },
  integrations: {
    whatsapp: { phone: '6281234567890' },
    googleSheets: {
      rsvpEndpoint: 'https://script.google.com/macros/s/AKfycbwbRaTUQxR78zD3V_7QKaH7BFHUX_UKq6cbArivGwVS3O7ZiF9PIYUqdDWkzDJ_4pHA/exec',
      wishesEndpoint: 'https://script.google.com/macros/s/AKfycbwbRaTUQxR78zD3V_7QKaH7BFHUX_UKq6cbArivGwVS3O7ZiF9PIYUqdDWkzDJ_4pHA/exec'
    }
  }
};
