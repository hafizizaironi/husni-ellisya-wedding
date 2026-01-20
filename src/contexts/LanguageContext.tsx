import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'ms';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.details': 'Details',
    'nav.gallery': 'Gallery',
    'nav.video': 'Video',
    'nav.rsvp': 'RSVP',
    'nav.home.mobile': 'Home',
    'nav.details.mobile': 'Info',
    'nav.gallery.mobile': 'Photos',
    'nav.video.mobile': 'Video',
    'nav.rsvp.mobile': 'RSVP',

    // Hero Section
    'hero.getting_married': "When a man marries, he has completed half of his religion.",
    'hero.hadith_source': "(Narrated by Al-Bayhaqi)",
    'hero.date': 'November 9, 2025',
    'hero.venue': 'Dar Al Fatiah Homestay',
    'hero.rsvp_now': 'RSVP Now',
    'hero.add_google_calendar': 'Add to Google Calendar',
    'hero.add_iphone_calendar': 'Add to iPhone Calendar',
    'hero.google_calendar': 'Google Calendar',
    'hero.iphone_calendar': 'iPhone Calendar',
    'hero.save_date': '📅 Save the date!',
    'hero.countdown.days': 'Days',
    'hero.countdown.hours': 'Hours',
    'hero.countdown.minutes': 'Minutes',
    'hero.countdown.seconds': 'Seconds',

    // Details Section
    'details.title': 'Wedding Details',
    'details.subtitle': 'All the essential information to help you plan your visit and celebrate with us.',
    'details.ceremony.title': 'Wedding Ceremony',
    'details.ceremony.description': 'Join us as we celebrate our special day in a beautiful, intimate setting.',
    'details.ceremony.time': '11:00 AM - 4:00 PM',
    'details.ceremony.location': 'Dar Al Fatiah Homestay',
    'details.ceremony.address': 'Bandar Bukit Beruntung, Rawang, Selangor',
    'details.reception.title': 'Bride and Groom Arrival',
    'details.reception.description': 'Join us as the bride and groom make their grand entrance to begin the celebration.',
    'details.reception.time': '12:00 PM',
    'details.reception.location': 'Dar Al Fatiah Homestay',
    'details.reception.address': 'Bandar Bukit Beruntung, Rawang, Selangor',
    'details.schedule.title': "Our Day's Schedule",
    'details.schedule.subtitle': 'A brief overview of the events planned for our special day.',
    'details.schedule.10_30': 'Guest Arrival & Welcome',
    'details.schedule.11_00': 'Wedding Ceremony Begins',
    'details.schedule.12_00': 'Bride & Groom Arrival',
    'details.schedule.12_30': 'Photography Session',
    'details.schedule.13_00': 'Lunch & Celebration',
    'details.schedule.16_00': 'Celebration Ends & Farewell',
    'details.location.title': 'Wedding Location',
    'details.location.subtitle': 'Find us at Dar Al Fatiah Homestay in the beautiful area of Bandar Bukit Beruntung, Rawang, Selangor.',
    'details.location.google_maps': 'Google Maps',
    'details.location.apple_maps': 'Apple Maps',
    'details.location.waze': 'Waze',
    'details.quran.title': 'Blessed Union',
    'details.quran.arabic': 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    'details.quran.reference': 'Surah Ar-Rum (30:21)',
    'details.quran.translation': 'And among His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought.',

    // Gallery Section
    'gallery.title': 'Our Gallery',
    'gallery.subtitle': 'A collection of our cherished moments.',
    'gallery.placeholder.title': 'Be Part of Our Important Memory',
    'gallery.placeholder.description': "We're excited to share our special day with you! Our gallery will be filled with beautiful moments from our wedding.",

    // RSVP Section
    'rsvp.title': 'RSVP',
    'rsvp.subtitle': "We can't wait to celebrate with you! Please let us know if you'll be joining us for our special day by filling out the form below.",
    'rsvp.name.label': 'Name',
    'rsvp.name.placeholder': 'Your name',
    'rsvp.attendance.label': 'Will you be attending?',
    'rsvp.attendance.yes': "Yes, I'll be there!",
    'rsvp.attendance.yes.description': "Can't wait to celebrate with you.",
    'rsvp.attendance.no': "No, I can't make it.",
    'rsvp.attendance.no.description': 'Will be there in spirit!',
    'rsvp.guests.label': 'Number of Guests (including yourself)',
    'rsvp.dietary.label': 'Dietary Restrictions (Optional)',
    'rsvp.dietary.placeholder': 'e.g., Vegetarian, Gluten-free, Allergies...',
    'rsvp.message.label': 'Message for the Couple (Optional)',
    'rsvp.message.placeholder': 'Share your well wishes or a special memory...',
    'rsvp.submit': 'Send RSVP',
    'rsvp.submitting': 'Submitting...',
    'rsvp.success.title': 'Thank You for Your RSVP!',
    'rsvp.success.message': "We've received your response and look forward to celebrating with you.",
    'rsvp.success.another': 'Submit Another RSVP',
    'rsvp.contact': 'Questions? Contact us at',

    // Messages Section
    'messages.title': 'Messages from Our Loved Ones',
    'messages.subtitle': 'Your heartfelt wishes and messages mean the world to us',
    'messages.loading': 'Loading messages...',
    'messages.error': 'Oops!',
    'messages.no_messages.title': 'Your Love & Wishes Await',
    'messages.no_messages.description': 'Be the first to share your beautiful wishes and blessings for Husni & Ellisya!',
    'messages.swipe_hint': 'Swipe left or right to see more messages',
    'messages.cta.title': 'Leave Your Well Wishes!',
    'messages.cta.description': 'Share your love and support for Husni & Ellisya by leaving a message in our RSVP form. Your messages will appear here for everyone to see!',

    // Footer
    'footer.date': 'November 9, 2025',
    'footer.couple': 'Husni & Ellisya',
    'footer.tagline': 'Two hearts, one love, forever together',

    // Common
    'common.required': 'Required',
    'common.optional': 'Optional',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.close': 'Close',
  },
  ms: {
    // Navigation
    'nav.home': 'Utama',
    'nav.details': 'Butiran',
    'nav.gallery': 'Galeri',
    'nav.video': 'Video',
    'nav.rsvp': 'RSVP',
    'nav.home.mobile': 'Utama',
    'nav.details.mobile': 'Info',
    'nav.gallery.mobile': 'Foto',
    'nav.video.mobile': 'Video',
    'nav.rsvp.mobile': 'RSVP',

    // Hero Section
    'hero.getting_married': 'Apabila seseorang lelaki berkahwin, dia telah menyempurnakan separuh daripada agamanya.',
    'hero.hadith_source': '(Diriwayatkan oleh Al-Bayhaqi)',
    'hero.date': '9 November 2025',
    'hero.venue': 'Dar Al Fatiah Homestay',
    'hero.rsvp_now': 'RSVP Sekarang',
    'hero.add_google_calendar': 'Tambah ke Google Calendar',
    'hero.add_iphone_calendar': 'Tambah ke iPhone Calendar',
    'hero.google_calendar': 'Google Calendar',
    'hero.iphone_calendar': 'iPhone Calendar',
    'hero.save_date': '📅 Simpan tarikh ini!',
    'hero.countdown.days': 'Hari',
    'hero.countdown.hours': 'Jam',
    'hero.countdown.minutes': 'Minit',
    'hero.countdown.seconds': 'Saat',

    // Details Section
    'details.title': 'Butiran Perkahwinan',
    'details.subtitle': 'Semua maklumat penting untuk membantu anda merancang kunjungan dan meraikan bersama kami.',
    'details.ceremony.title': 'Majlis Perkahwinan',
    'details.ceremony.description': 'Sertai kami meraikan hari istimewa kami dalam suasana yang indah dan intim.',
    'details.ceremony.time': '11:00 PAGI - 4:00 PETANG',
    'details.ceremony.location': 'Dar Al Fatiah Homestay',
    'details.ceremony.address': 'Bandar Bukit Beruntung, Rawang, Selangor',
    'details.reception.title': 'Ketibaan Pengantin',
    'details.reception.description': 'Sertai kami ketika pengantin lelaki dan perempuan tiba untuk memulakan majlis perayaan.',
    'details.reception.time': '12:00 TENGAH HARI',
    'details.reception.location': 'Dar Al Fatiah Homestay',
    'details.reception.address': 'Bandar Bukit Beruntung, Rawang, Selangor',
    'details.schedule.title': 'Jadual Hari Kami',
    'details.schedule.subtitle': 'Gambaran ringkas acara yang dirancang untuk hari istimewa kami.',
    'details.schedule.10_30': 'Ketibaan Tetamu & Sambutan',
    'details.schedule.11_00': 'Majlis Perkahwinan Bermula',
    'details.schedule.12_00': 'Ketibaan Pengantin',
    'details.schedule.12_30': 'Sesi Fotografi',
    'details.schedule.13_00': 'Makan Tengah Hari & Perayaan',
    'details.schedule.16_00': 'Majlis Berakhir & Bersurai',
    'details.location.title': 'Lokasi Perkahwinan',
    'details.location.subtitle': 'Temui kami di Dar Al Fatiah Homestay di kawasan yang indah di Bandar Bukit Beruntung, Rawang, Selangor.',
    'details.location.google_maps': 'Google Maps',
    'details.location.apple_maps': 'Apple Maps',
    'details.location.waze': 'Waze',
    'details.quran.title': 'Ikatan Yang Diberkati',
    'details.quran.arabic': 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    'details.quran.reference': 'Surah Ar-Rum (30:21)',
    'details.quran.translation': 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.',

    // Gallery Section
    'gallery.title': 'Galeri Kami',
    'gallery.subtitle': 'Koleksi detik-detik berharga kami.',
    'gallery.placeholder.title': 'Jadilah Sebahagian Daripada Kenangan Penting Kami',
    'gallery.placeholder.description': 'Kami teruja untuk berkongsi hari istimewa kami dengan anda! Galeri kami akan dipenuhi dengan detik-detik indah dari perkahwinan kami.',

    // RSVP Section
    'rsvp.title': 'RSVP',
    'rsvp.subtitle': 'Kami tidak sabar untuk meraikan bersama anda! Sila beritahu kami jika anda akan menyertai kami untuk hari istimewa kami dengan mengisi borang di bawah.',
    'rsvp.name.label': 'Nama',
    'rsvp.name.placeholder': 'Nama anda',
    'rsvp.attendance.label': 'Adakah anda akan hadir?',
    'rsvp.attendance.yes': 'Ya, saya akan hadir!',
    'rsvp.attendance.yes.description': 'Tidak sabar untuk meraikan bersama anda.',
    'rsvp.attendance.no': 'Tidak, saya tidak dapat hadir.',
    'rsvp.attendance.no.description': 'Akan hadir dalam jiwa!',
    'rsvp.guests.label': 'Bilangan Tetamu (termasuk diri anda)',
    'rsvp.dietary.label': 'Sekatan Pemakanan (Pilihan)',
    'rsvp.dietary.placeholder': 'cth., Vegetarian, Bebas gluten, Alahan...',
    'rsvp.message.label': 'Mesej untuk Pasangan (Pilihan)',
    'rsvp.message.placeholder': 'Kongsi ucapan baik atau kenangan istimewa...',
    'rsvp.submit': 'Hantar RSVP',
    'rsvp.submitting': 'Menghantar...',
    'rsvp.success.title': 'Terima Kasih atas RSVP Anda!',
    'rsvp.success.message': 'Kami telah menerima respons anda dan tidak sabar untuk meraikan bersama anda.',
    'rsvp.success.another': 'Hantar RSVP Lain',
    'rsvp.contact': 'Soalan? Hubungi kami di',

    // Messages Section
    'messages.title': 'Mesej Daripada Orang Tersayang',
    'messages.subtitle': 'Ucapan ikhlas dan mesej anda sangat bermakna bagi kami',
    'messages.loading': 'Memuatkan mesej...',
    'messages.error': 'Ops!',
    'messages.no_messages.title': 'Kasih Sayang & Doa Anda Dinanti',
    'messages.no_messages.description': 'Jadilah yang pertama berkongsi ucapan indah dan doa restu untuk Husni & Ellisya!',
    'messages.swipe_hint': 'Leret ke kiri atau kanan untuk melihat lebih banyak mesej',
    'messages.cta.title': 'Tinggalkan Ucapan Baik Anda!',
    'messages.cta.description': 'Kongsi kasih sayang dan sokongan anda untuk Husni & Ellisya dengan meninggalkan mesej dalam borang RSVP kami. Mesej anda akan muncul di sini untuk semua orang lihat!',

    // Footer
    'footer.date': '9 November 2025',
    'footer.couple': 'Husni & Ellisya',
    'footer.tagline': 'Dua hati, satu cinta, bersama selamanya',

    // Common
    'common.required': 'Diperlukan',
    'common.optional': 'Pilihan',
    'common.loading': 'Memuatkan...',
    'common.error': 'Ralat',
    'common.close': 'Tutup',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ms');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
