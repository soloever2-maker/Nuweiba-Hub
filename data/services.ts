export interface Service {
  id: string;
  nameEn: string;
  nameAr: string;
  type: 'hospital' | 'pharmacy' | 'atm' | 'market' | 'gas';
  area: string;
  areaAr: string;
  phone: string;
  mapsLink: string;
  openHours: string;
  isOpen24h: boolean;
}

export const SERVICES: Service[] = [
  // Hospitals
  {
    id: 's1',
    nameEn: 'Nuweiba General Hospital',
    nameAr: 'مستشفى نويبع العام',
    type: 'hospital',
    area: 'Nuweiba City',
    areaAr: 'مدينة نويبع',
    phone: '069-3500-555',
    mapsLink: 'https://maps.google.com/?q=Nuweiba+Hospital',
    openHours: '24/7 Emergency',
    isOpen24h: true,
  },
  {
    id: 's2',
    nameEn: 'Tarabin Medical Clinic',
    nameAr: 'عيادة طرابين الطبية',
    type: 'hospital',
    area: 'Tarabin',
    areaAr: 'طرابين',
    phone: '069-3500-777',
    mapsLink: 'https://maps.google.com/?q=Tarabin+Clinic',
    openHours: '08:00 – 22:00',
    isOpen24h: false,
  },
  // Pharmacies
  {
    id: 's3',
    nameEn: 'Al-Rashid Pharmacy',
    nameAr: 'صيدلية الراشد',
    type: 'pharmacy',
    area: 'Nuweiba City',
    areaAr: 'مدينة نويبع',
    phone: '069-3500-333',
    mapsLink: 'https://maps.google.com/?q=Nuweiba+Pharmacy',
    openHours: '08:00 – 24:00',
    isOpen24h: false,
  },
  {
    id: 's4',
    nameEn: 'Nour Pharmacy',
    nameAr: 'صيدلية النور',
    type: 'pharmacy',
    area: 'Tarabin',
    areaAr: 'طرابين',
    phone: '069-3500-444',
    mapsLink: 'https://maps.google.com/?q=Tarabin+Pharmacy',
    openHours: '24/7',
    isOpen24h: true,
  },
  // ATMs
  {
    id: 's5',
    nameEn: 'Banque Misr ATM',
    nameAr: 'صراف بنك مصر',
    type: 'atm',
    area: 'Nuweiba Port',
    areaAr: 'ميناء نويبع',
    phone: '',
    mapsLink: 'https://maps.google.com/?q=Nuweiba+Port+ATM',
    openHours: '24/7',
    isOpen24h: true,
  },
  {
    id: 's6',
    nameEn: 'National Bank ATM',
    nameAr: 'صراف البنك الأهلي',
    type: 'atm',
    area: 'Nuweiba City',
    areaAr: 'مدينة نويبع',
    phone: '',
    mapsLink: 'https://maps.google.com/?q=NBE+Nuweiba',
    openHours: '24/7',
    isOpen24h: true,
  },
  // Markets
  {
    id: 's7',
    nameEn: 'Tarabin Bazaar',
    nameAr: 'بازار طرابين',
    type: 'market',
    area: 'Tarabin',
    areaAr: 'طرابين',
    phone: '069-3500-100',
    mapsLink: 'https://maps.google.com/?q=Tarabin+Market',
    openHours: '07:00 – 23:00',
    isOpen24h: false,
  },
  {
    id: 's8',
    nameEn: 'Nuweiba Supermarket',
    nameAr: 'سوبر ماركت نويبع',
    type: 'market',
    area: 'Nuweiba City',
    areaAr: 'مدينة نويبع',
    phone: '069-3500-200',
    mapsLink: 'https://maps.google.com/?q=Nuweiba+Supermarket',
    openHours: '07:00 – 22:00',
    isOpen24h: false,
  },
  // Gas
  {
    id: 's9',
    nameEn: 'Misr Petroleum Station',
    nameAr: 'محطة مصر للبترول',
    type: 'gas',
    area: 'Nuweiba City',
    areaAr: 'مدينة نويبع',
    phone: '',
    mapsLink: 'https://maps.google.com/?q=Nuweiba+Gas+Station',
    openHours: '24/7',
    isOpen24h: true,
  },
];
