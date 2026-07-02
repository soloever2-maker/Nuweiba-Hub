export interface Camp {
  id: string;
  nameEn: string;
  nameAr: string;
  area: 'north' | 'tarabin' | 'rasshitan' | 'south';
  priceMin: number;
  priceMax: number;
  tags: CampTag[];
  images: string[];
  descriptionEn: string;
  descriptionAr: string;
  whatsapp: string;
  bookingLink?: string;
  mapsLink: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  amenities: CampAmenity[];
  createdAt: string;
}

export type CampTag = 'budget' | 'chill' | 'premium' | 'party' | 'family' | 'beachfront';
export type CampAmenity = 'wifi' | 'electricity' | 'shower' | 'snorkeling' | 'parking' | 'beachAccess' | 'restaurant' | 'ac';

export const CAMPS: Camp[] = [
  {
    id: '1',
    nameEn: 'Lala Land Camp',
    nameAr: 'مخيم لالا لاند',
    area: 'rasshitan',
    priceMin: 200,
    priceMax: 350,
    tags: ['chill', 'beachfront'],
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800',
      'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800',
    ],
    descriptionEn: 'A serene beachfront camp at the legendary Ras Shitan, known for its crystal-clear waters and vibrant coral reefs. Perfect for those seeking peace, snorkeling, and stargazing under the Sinai sky. The camp offers comfortable huts directly on the beach with a relaxed, bohemian vibe.',
    descriptionAr: 'مخيم هادئ على شاطئ رأس شيطان الأسطوري، مشهور بمياهه الصافية وشعابه المرجانية النابضة بالحياة. مثالي لمن يبحث عن الهدوء والغطس ومراقبة النجوم تحت سماء سيناء. يقدم المخيم أكواخاً مريحة مباشرة على الشاطئ بأجواء بوهيمية منفصلة.',
    whatsapp: '+201012345678',
    bookingLink: 'https://booking.com',
    mapsLink: 'https://maps.google.com/?q=Ras+Shitan+Nuweiba',
    rating: 4.7,
    reviewCount: 312,
    isFeatured: true,
    amenities: ['wifi', 'electricity', 'shower', 'snorkeling', 'beachAccess'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    nameEn: 'Cinderella Camp',
    nameAr: 'مخيم سندريلا',
    area: 'tarabin',
    priceMin: 150,
    priceMax: 280,
    tags: ['budget', 'family'],
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
      'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800',
      'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800',
    ],
    descriptionEn: 'A family-friendly budget camp in the heart of Tarabin, offering affordable accommodation with warm hospitality. The camp is close to local restaurants, markets, and beach activities, making it ideal for families and backpackers exploring Nuweiba on a budget.',
    descriptionAr: 'مخيم اقتصادي عائلي في قلب طرابين، يقدم إقامة ميسورة التكلفة مع ضيافة دافئة. يقع المخيم بالقرب من المطاعم المحلية والأسواق وأنشطة الشاطئ، مما يجعله مثالياً للعائلات والمسافرين باكباك الذين يستكشفون نويبع باقتصادية.',
    whatsapp: '+201023456789',
    mapsLink: 'https://maps.google.com/?q=Tarabin+Nuweiba',
    rating: 4.2,
    reviewCount: 187,
    isFeatured: false,
    amenities: ['electricity', 'shower', 'beachAccess', 'parking'],
    createdAt: '2024-02-01',
  },
  {
    id: '3',
    nameEn: 'Paradise Sweir',
    nameAr: 'بارادايس سوير',
    area: 'south',
    priceMin: 300,
    priceMax: 500,
    tags: ['premium', 'chill'],
    images: [
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    ],
    descriptionEn: 'The crown jewel of South Nuweiba, Paradise Sweir offers an unparalleled luxury camping experience with breathtaking views of the Gulf of Aqaba. Premium bamboo chalets, gourmet meals, and world-class snorkeling await you in one of the most pristine locations in Sinai.',
    descriptionAr: 'درة جنوب نويبع، يقدم بارادايس سوير تجربة تخييم فاخرة لا مثيل لها مع إطلالات خلابة على خليج العقبة. شاليهات من الخيزران الفاخرة ووجبات شهية وغطس عالمي المستوى ينتظركم في أحد أجمل مواقع سيناء.',
    whatsapp: '+201034567890',
    bookingLink: 'https://booking.com',
    mapsLink: 'https://maps.google.com/?q=South+Nuweiba',
    rating: 4.9,
    reviewCount: 524,
    isFeatured: true,
    amenities: ['wifi', 'electricity', 'shower', 'snorkeling', 'beachAccess', 'restaurant', 'ac'],
    createdAt: '2024-01-01',
  },
  {
    id: '4',
    nameEn: 'Beit Tolba',
    nameAr: 'بيت طلبة',
    area: 'north',
    priceMin: 180,
    priceMax: 300,
    tags: ['family', 'budget'],
    images: [
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
      'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800',
      'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800',
    ],
    descriptionEn: 'A charming local camp in North Nuweiba run by the welcoming Tolba family for over 20 years. Known for its authentic Bedouin hospitality, delicious home-cooked meals, and a genuine Sinai cultural experience. Great value for families and solo travelers.',
    descriptionAr: 'مخيم محلي ساحر في شمال نويبع تديره عائلة طلبة الكريمة منذ أكثر من 20 عاماً. مشهور بضيافته البدوية الأصيلة ووجباته المنزلية اللذيذة وتجربته الثقافية السيناوية الحقيقية. قيمة ممتازة للعائلات والمسافرين المنفردين.',
    whatsapp: '+201045678901',
    mapsLink: 'https://maps.google.com/?q=North+Nuweiba',
    rating: 4.4,
    reviewCount: 203,
    isFeatured: false,
    amenities: ['electricity', 'shower', 'beachAccess', 'parking', 'restaurant'],
    createdAt: '2024-02-15',
  },
  {
    id: '5',
    nameEn: 'Soft Beach Camp',
    nameAr: 'مخيم الشاطئ الناعم',
    area: 'tarabin',
    priceMin: 250,
    priceMax: 400,
    tags: ['party', 'beachfront'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
      'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=800',
    ],
    descriptionEn: 'Tarabin\'s most vibrant beachfront camp, famous for its nightly bonfires, music sessions, and lively atmosphere. Soft Beach attracts a young, international crowd and is the go-to spot for those who want to meet fellow travelers, dance under the stars, and enjoy the best of Nuweiba nightlife.',
    descriptionAr: 'أكثر مخيمات طرابين حيوية على الشاطئ، مشهور بنيرانه الليلية وجلسات الموسيقى وأجوائه الصاخبة. يستقطب مخيم الشاطئ الناعم شباباً من مختلف أنحاء العالم وهو الوجهة المفضلة لمن يريد مقابلة المسافرين والرقص تحت النجوم.',
    whatsapp: '+201056789012',
    mapsLink: 'https://maps.google.com/?q=Tarabin+Beach+Nuweiba',
    rating: 4.6,
    reviewCount: 389,
    isFeatured: true,
    amenities: ['wifi', 'electricity', 'shower', 'beachAccess', 'restaurant'],
    createdAt: '2024-01-20',
  },
  {
    id: '6',
    nameEn: 'Moon Valley Retreat',
    nameAr: 'منتجع وادي القمر',
    area: 'rasshitan',
    priceMin: 350,
    priceMax: 600,
    tags: ['premium', 'chill'],
    images: [
      'https://images.unsplash.com/photo-1540541338537-71cf23f4ea87?w=800',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    ],
    descriptionEn: 'An exclusive eco-retreat nestled between towering mountains and the turquoise Red Sea at Ras Shitan. Moon Valley offers sustainable luxury with private chalets, yoga sessions, world-class diving, and the most spectacular stargazing spots in Egypt. A true escape from the modern world.',
    descriptionAr: 'ملاذ إيكولوجي حصري متداخل بين الجبال الشاهقة والبحر الأحمر الفيروزي في رأس شيطان. يقدم وادي القمر فخامة مستدامة مع شاليهات خاصة وجلسات يوغا وغطس عالمي المستوى وأفضل أماكن مراقبة النجوم في مصر. هروب حقيقي من العالم الحديث.',
    whatsapp: '+201067890123',
    bookingLink: 'https://booking.com',
    mapsLink: 'https://maps.google.com/?q=Ras+Shitan+Nuweiba',
    rating: 4.8,
    reviewCount: 276,
    isFeatured: true,
    amenities: ['wifi', 'electricity', 'shower', 'snorkeling', 'beachAccess', 'restaurant'],
    createdAt: '2024-01-10',
  },
];
