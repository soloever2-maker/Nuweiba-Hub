export interface TransportOption {
  id: string;
  companyName: string;
  companyNameAr: string;
  type: 'bus' | 'taxi' | 'boat';
  routeFrom: string;
  routeFromAr: string;
  routeTo: string;
  routeToAr: string;
  times: string[];
  priceMin: number;
  priceMax: number;
  duration: string;
  durationAr: string;
  whatsapp: string;
  bookingLink?: string;
  logo?: string;
  notes?: string;
  notesAr?: string;
}

export const TRANSPORT: TransportOption[] = [
  // Buses
  {
    id: 'b1',
    companyName: 'East Delta Bus',
    companyNameAr: 'شركة دلتا الشرقية',
    type: 'bus',
    routeFrom: 'Cairo (Turgoman)',
    routeFromAr: 'القاهرة (الترجمان)',
    routeTo: 'Nuweiba',
    routeToAr: 'نويبع',
    times: ['07:00', '10:00', '22:00'],
    priceMin: 200,
    priceMax: 280,
    duration: '6–7 hours',
    durationAr: '٦–٧ ساعات',
    whatsapp: '+201200000001',
    notes: 'Most frequent service. AC buses. Stops at Taba border.',
    notesAr: 'الخدمة الأكثر تكراراً. أتوبيسات مكيفة. تتوقف عند حدود طابا.',
  },
  {
    id: 'b2',
    companyName: 'Go Bus',
    companyNameAr: 'جو باص',
    type: 'bus',
    routeFrom: 'Cairo (Heliopolis)',
    routeFromAr: 'القاهرة (مصر الجديدة)',
    routeTo: 'Nuweiba',
    routeToAr: 'نويبع',
    times: ['16:00', '23:00'],
    priceMin: 250,
    priceMax: 320,
    duration: '6.5 hours',
    durationAr: '٦.٥ ساعة',
    whatsapp: '+201200000002',
    bookingLink: 'https://gobus.com.eg',
    notes: 'Premium comfort. Reclining seats. Onboard entertainment.',
    notesAr: 'راحة فاخرة. مقاعد قابلة للرجوع. ترفيه على متن الحافلة.',
  },
  {
    id: 'b3',
    companyName: 'Sinai Star',
    companyNameAr: 'نجم سيناء',
    type: 'bus',
    routeFrom: 'Sharm El-Sheikh',
    routeFromAr: 'شرم الشيخ',
    routeTo: 'Nuweiba',
    routeToAr: 'نويبع',
    times: ['09:00', '13:00', '17:00'],
    priceMin: 80,
    priceMax: 120,
    duration: '2–2.5 hours',
    durationAr: '٢–٢.٥ ساعة',
    whatsapp: '+201200000003',
    notes: 'Local Sinai bus. Passes through Dahab.',
    notesAr: 'أتوبيس سيناوي محلي. يمر بالضهب.',
  },
  // Shared Taxis
  {
    id: 't1',
    companyName: 'Cairo → Nuweiba Shared Taxi',
    companyNameAr: 'تاكسي مشترك القاهرة ← نويبع',
    type: 'taxi',
    routeFrom: 'Cairo (Abbassiya)',
    routeFromAr: 'القاهرة (عباسية)',
    routeTo: 'Nuweiba Center',
    routeToAr: 'مركز نويبع',
    times: ['05:00', '07:00', '09:00'],
    priceMin: 250,
    priceMax: 350,
    duration: '5–6 hours',
    durationAr: '٥–٦ ساعات',
    whatsapp: '+201200000004',
    notes: 'Door-to-door service. Fill up fast — book the night before.',
    notesAr: 'خدمة من الباب للباب. تمتلئ سريعاً — احجز الليلة السابقة.',
  },
  {
    id: 't2',
    companyName: 'Dahab → Nuweiba Taxi',
    companyNameAr: 'تاكسي الضهب ← نويبع',
    type: 'taxi',
    routeFrom: 'Dahab',
    routeFromAr: 'الضهب',
    routeTo: 'Nuweiba',
    routeToAr: 'نويبع',
    times: ['08:00', '11:00', '15:00'],
    priceMin: 60,
    priceMax: 100,
    duration: '45 min',
    durationAr: '٤٥ دقيقة',
    whatsapp: '+201200000005',
    notes: 'Quick and affordable connection between Dahab and Nuweiba.',
    notesAr: 'رابط سريع وميسور بين الضهب ونويبع.',
  },
  // Boat
  {
    id: 'bo1',
    companyName: 'AB Maritime Ferry',
    companyNameAr: 'عبّارة AB البحرية',
    type: 'boat',
    routeFrom: 'Nuweiba Port',
    routeFromAr: 'ميناء نويبع',
    routeTo: 'Aqaba, Jordan',
    routeToAr: 'العقبة، الأردن',
    times: ['12:00', '15:00'],
    priceMin: 550,
    priceMax: 800,
    duration: '1–3.5 hours',
    durationAr: '١–٣.٥ ساعات',
    whatsapp: '+201200000006',
    bookingLink: 'https://abmaritime.com.jo',
    notes: 'Fast ferry (1hr) and slow ferry (3.5hr). Book in advance. Bring passport.',
    notesAr: 'عبّارة سريعة (١ ساعة) وبطيئة (٣.٥ ساعة). احجز مسبقاً. أحضر جواز السفر.',
  },
];
