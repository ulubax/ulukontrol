// Türkiye Araç Veritabanı ve Teknik Özellikler
export const BODY_TYPES = [
  { id: 'otomobil', label: 'Otomobil (Sedan / HB)', icon: 'car' },
  { id: 'suv', label: 'SUV / Crossover', icon: 'shield' },
  { id: 'ticari', label: 'Hafif Ticari (Van / Kamyonet)', icon: 'truck' }
];

export const BRANDS = [
  { id: 'renault', name: 'Renault', logo: '🚗', origin: 'Fransa', popular: true },
  { id: 'volkswagen', name: 'Volkswagen', logo: '🚙', origin: 'Almanya', popular: true },
  { id: 'fiat', name: 'Fiat', logo: '🚗', origin: 'İtalya', popular: true },
  { id: 'ford', name: 'Ford', logo: '🚙', origin: 'ABD/Almanya', popular: true },
  { id: 'toyota', name: 'Toyota', logo: '🚗', origin: 'Japonya', popular: true },
  { id: 'hyundai', name: 'Hyundai', logo: '🚙', origin: 'G.Kore', popular: true },
  { id: 'peugeot', name: 'Peugeot', logo: '🦁', origin: 'Fransa', popular: true },
  { id: 'dacia', name: 'Dacia', logo: '🏔️', origin: 'Romanya/Fransa', popular: true },
  { id: 'bmw', name: 'BMW', logo: '⚡', origin: 'Almanya', popular: true },
  { id: 'mercedes', name: 'Mercedes-Benz', logo: '⭐', origin: 'Almanya', popular: true },
  { id: 'opel', name: 'Opel', logo: '⚡', origin: 'Almanya', popular: true },
  { id: 'skoda', name: 'Skoda', logo: '🏹', origin: 'Çekya', popular: true },
  { id: 'honda', name: 'Honda', logo: '🔴', origin: 'Japonya', popular: false },
  { id: 'citroen', name: 'Citroën', logo: '🔺', origin: 'Fransa', popular: false },
  { id: 'seat', name: 'Seat', logo: '🇪🇸', origin: 'İspanya', popular: false },
  { id: 'togg', name: 'Togg', logo: '🇹🇷', origin: 'Türkiye', popular: true },
  { id: 'chery', name: 'Chery', logo: '🐉', origin: 'Çin', popular: false }
];

export const VEHICLE_MODELS = {
  renault: [
    {
      id: 'megane_sedan',
      name: 'Megane Sedan',
      bodyType: 'otomobil',
      engines: [
        { code: '1.5 Blue dCi Icon EDC', fuel: 'Dizel', transmission: 'Otomatik', hp: 115, intervalKm: 15000, marketMin: 1120000, marketMax: 1250000 },
        { code: '1.3 TCe Touch EDC', fuel: 'Benzin', transmission: 'Otomatik', hp: 140, intervalKm: 20000, marketMin: 1050000, marketMax: 1180000 },
        { code: '1.5 dCi Joy', fuel: 'Dizel', transmission: 'Manuel', hp: 110, intervalKm: 15000, marketMin: 850000, marketMax: 960000 },
        { code: '1.3 TCe Icon EDC', fuel: 'Benzin', transmission: 'Otomatik', hp: 140, intervalKm: 20000, marketMin: 1160000, marketMax: 1290000 }
      ],
      chronicNote: 'EDC çift kavrama ısınma uyarısı için şanzıman yazılımı ve 80.000 KM debriyaj kalibrasyonu kontrolü tavsiye edilir.',
      chronicLevel: 'Orta',
      tirePsi: { fl: 33, fr: 33, rl: 32, rr: 32 }
    },
    {
      id: 'clio',
      name: 'Clio',
      bodyType: 'otomobil',
      engines: [
        { code: '1.0 TCe Touch X-Tronic', fuel: 'Benzin', transmission: 'Otomatik', hp: 90, intervalKm: 20000, marketMin: 820000, marketMax: 920000 },
        { code: '1.0 TCe Icon X-Tronic', fuel: 'Benzin', transmission: 'Otomatik', hp: 90, intervalKm: 20000, marketMin: 900000, marketMax: 1010000 },
        { code: '1.5 Blue dCi Touch', fuel: 'Dizel', transmission: 'Manuel', hp: 115, intervalKm: 15000, marketMin: 840000, marketMax: 940000 },
        { code: '1.0 SCe Joy', fuel: 'Benzin', transmission: 'Manuel', hp: 65, intervalKm: 20000, marketMin: 680000, marketMax: 760000 }
      ],
      chronicNote: 'X-Tronic CVT şanzımanda 60.000 km yağ değişimi aksatılmamalı. R-Link ekran güncellemesi önerilir.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 32, fr: 32, rl: 30, rr: 30 }
    },
    {
      id: 'austral',
      name: 'Austral',
      bodyType: 'suv',
      engines: [
        { code: '1.3 Mild Hybrid Techno Esprit Alpine', fuel: 'Hibrit', transmission: 'Otomatik', hp: 160, intervalKm: 15000, marketMin: 1850000, marketMax: 2050000 },
        { code: '1.2 E-Tech Full Hybrid Iconic', fuel: 'Hibrit', transmission: 'Otomatik', hp: 200, intervalKm: 15000, marketMin: 2150000, marketMax: 2350000 }
      ],
      chronicNote: '12V akü yönetim yazılımı servis bülteni kontrol edilmeli. OpenR Link sistemi güncel tutulmalıdır.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 35, fr: 35, rl: 33, rr: 33 }
    },
    {
      id: 'captur',
      name: 'Captur',
      bodyType: 'suv',
      engines: [
        { code: '1.3 TCe Touch EDC', fuel: 'Benzin', transmission: 'Otomatik', hp: 140, intervalKm: 20000, marketMin: 1100000, marketMax: 1220000 },
        { code: '1.5 Blue dCi Icon EDC', fuel: 'Dizel', transmission: 'Otomatik', hp: 115, intervalKm: 15000, marketMin: 1180000, marketMax: 1300000 }
      ],
      chronicNote: 'Ön süspansiyon takozları 50.000 km sonrası ses yapabilir, periyodik kontrolde yağlama önerilir.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 34, fr: 34, rl: 32, rr: 32 }
    },
    {
      id: 'kangoo',
      name: 'Kangoo Combi',
      bodyType: 'ticari',
      engines: [
        { code: '1.5 Blue dCi Touch', fuel: 'Dizel', transmission: 'Manuel', hp: 95, intervalKm: 15000, marketMin: 780000, marketMax: 890000 },
        { code: '1.5 Blue dCi Icon EDC', fuel: 'Dizel', transmission: 'Otomatik', hp: 115, intervalKm: 15000, marketMin: 980000, marketMax: 1090000 }
      ],
      chronicNote: 'AdBlue enjektörü kristalleşmesine karşı kaliteli yakıt ve AdBlue katkısı kullanımı faydalıdır.',
      chronicLevel: 'Orta',
      tirePsi: { fl: 36, fr: 36, rl: 40, rr: 40 }
    }
  ],

  volkswagen: [
    {
      id: 'golf',
      name: 'Golf',
      bodyType: 'otomobil',
      engines: [
        { code: '1.5 eTSI R-Line DSG', fuel: 'Hibrit', transmission: 'Otomatik', hp: 150, intervalKm: 15000, marketMin: 1780000, marketMax: 1950000 },
        { code: '1.5 eTSI Style DSG', fuel: 'Hibrit', transmission: 'Otomatik', hp: 150, intervalKm: 15000, marketMin: 1650000, marketMax: 1800000 },
        { code: '1.0 eTSI Life DSG', fuel: 'Hibrit', transmission: 'Otomatik', hp: 110, intervalKm: 15000, marketMin: 1350000, marketMax: 1480000 },
        { code: '1.6 TDI Comfortline DSG', fuel: 'Dizel', transmission: 'Otomatik', hp: 115, intervalKm: 15000, marketMin: 1050000, marketMax: 1180000 }
      ],
      chronicNote: '48V mHEV akü şarj yazılımı güncellemesi ve kuru kavrama DQ200 DSG mekatronik basınç testi önerilir.',
      chronicLevel: 'Orta',
      tirePsi: { fl: 34, fr: 34, rl: 33, rr: 33 }
    },
    {
      id: 'passat',
      name: 'Passat',
      bodyType: 'otomobil',
      engines: [
        { code: '1.5 TSI ACT Elegance DSG', fuel: 'Benzin', transmission: 'Otomatik', hp: 150, intervalKm: 15000, marketMin: 1850000, marketMax: 2100000 },
        { code: '1.6 TDI Business DSG', fuel: 'Dizel', transmission: 'Otomatik', hp: 120, intervalKm: 15000, marketMin: 1380000, marketMax: 1550000 },
        { code: '2.0 TDI Elegance DSG 4Motion', fuel: 'Dizel', transmission: 'Otomatik', hp: 190, intervalKm: 15000, marketMin: 2200000, marketMax: 2480000 }
      ],
      chronicNote: '1.5 TSI ACT motorlarda su pompası (termostat gövdesi) sızıntısı 70.000 KM sonrası kontrol edilmelidir.',
      chronicLevel: 'Orta',
      tirePsi: { fl: 35, fr: 35, rl: 34, rr: 34 }
    },
    {
      id: 'tiguan',
      name: 'Tiguan',
      bodyType: 'suv',
      engines: [
        { code: '1.5 eTSI Elegance DSG', fuel: 'Hibrit', transmission: 'Otomatik', hp: 150, intervalKm: 15000, marketMin: 2100000, marketMax: 2350000 },
        { code: '1.5 TSI ACT R-Line DSG', fuel: 'Benzin', transmission: 'Otomatik', hp: 150, intervalKm: 15000, marketMin: 1920000, marketMax: 2150000 }
      ],
      chronicNote: 'Panoramik cam tavan su tahliye kanalları her sonbahar temizlenmelidir.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 36, fr: 36, rl: 34, rr: 34 }
    },
    {
      id: 'caddy',
      name: 'Caddy Maxi',
      bodyType: 'ticari',
      engines: [
        { code: '2.0 TDI Style DSG', fuel: 'Dizel', transmission: 'Otomatik', hp: 122, intervalKm: 15000, marketMin: 1250000, marketMax: 1400000 },
        { code: '2.0 TDI Life Manuel', fuel: 'Dizel', transmission: 'Manuel', hp: 102, intervalKm: 15000, marketMin: 1050000, marketMax: 1180000 }
      ],
      chronicNote: 'Arka helezon takozları ve DPF doluluk oranı şehir içi yoğun kullanımda takip edilmelidir.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 38, fr: 38, rl: 42, rr: 42 }
    }
  ],

  fiat: [
    {
      id: 'egea_sedan',
      name: 'Egea Sedan',
      bodyType: 'otomobil',
      engines: [
        { code: '1.4 Fire Easy', fuel: 'Benzin', transmission: 'Manuel', hp: 95, intervalKm: 10000, marketMin: 680000, marketMax: 780000 },
        { code: '1.4 Fire Urban', fuel: 'Benzin', transmission: 'Manuel', hp: 95, intervalKm: 10000, marketMin: 750000, marketMax: 850000 },
        { code: '1.3 MultiJet Lounge', fuel: 'Dizel', transmission: 'Manuel', hp: 95, intervalKm: 15000, marketMin: 850000, marketMax: 960000 },
        { code: '1.6 MultiJet Lounge DCT', fuel: 'Dizel', transmission: 'Otomatik', hp: 130, intervalKm: 15000, marketMin: 1050000, marketMax: 1180000 },
        { code: '1.5 T4 Hibrit Lounge AT', fuel: 'Hibrit', transmission: 'Otomatik', hp: 130, intervalKm: 15000, marketMin: 1150000, marketMax: 1280000 }
      ],
      chronicNote: '1.4 Fire atmosferik motorlarda her 3.000 - 5.000 KM aralığında motor yağı seviyesi çubuktan kontrol edilmelidir.',
      chronicLevel: 'Yüksek',
      tirePsi: { fl: 33, fr: 33, rl: 31, rr: 31 }
    },
    {
      id: 'egea_cross',
      name: 'Egea Cross',
      bodyType: 'suv',
      engines: [
        { code: '1.4 Fire Urban', fuel: 'Benzin', transmission: 'Manuel', hp: 95, intervalKm: 10000, marketMin: 820000, marketMax: 920000 },
        { code: '1.5 T4 Hibrit Lounge AT', fuel: 'Hibrit', transmission: 'Otomatik', hp: 130, intervalKm: 15000, marketMin: 1220000, marketMax: 1350000 },
        { code: '1.6 MultiJet Lounge DCT', fuel: 'Dizel', transmission: 'Otomatik', hp: 130, intervalKm: 15000, marketMin: 1120000, marketMax: 1260000 }
      ],
      chronicNote: 'Cross yükseltilmiş süspansiyonda viraj demir lastikleri 60.000 km sonrasında tıkırtı yapabilir.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 34, fr: 34, rl: 32, rr: 32 }
    },
    {
      id: 'fiorino',
      name: 'Fiorino Combi',
      bodyType: 'ticari',
      engines: [
        { code: '1.3 MultiJet Pop', fuel: 'Dizel', transmission: 'Manuel', hp: 95, intervalKm: 15000, marketMin: 550000, marketMax: 650000 },
        { code: '1.4 Eko Safeline (LPG)', fuel: 'LPG', transmission: 'Manuel', hp: 77, intervalKm: 10000, marketMin: 580000, marketMax: 680000 }
      ],
      chronicNote: 'EGR valfi ve karter havalandırma hortumu şehir içi kullanımda kontrol edilmelidir.',
      chronicLevel: 'Orta',
      tirePsi: { fl: 36, fr: 36, rl: 38, rr: 38 }
    }
  ],

  ford: [
    {
      id: 'focus',
      name: 'Focus',
      bodyType: 'otomobil',
      engines: [
        { code: '1.5 EcoBlue Titanium AT', fuel: 'Dizel', transmission: 'Otomatik', hp: 120, intervalKm: 15000, marketMin: 1280000, marketMax: 1420000 },
        { code: '1.0 EcoBoost mHEV ST-Line AT', fuel: 'Hibrit', transmission: 'Otomatik', hp: 125, intervalKm: 15000, marketMin: 1350000, marketMax: 1490000 },
        { code: '1.5 Ti-VCT Trend X Manuel', fuel: 'Benzin', transmission: 'Manuel', hp: 123, intervalKm: 15000, marketMin: 950000, marketMax: 1080000 }
      ],
      chronicNote: '1.5 EcoBlue motorlarda 7mm eksantrik zinciri servis bülteni kontrol edilmeli, 8mm revizyonu önerilir.',
      chronicLevel: 'Yüksek',
      tirePsi: { fl: 34, fr: 34, rl: 32, rr: 32 }
    },
    {
      id: 'kuga',
      name: 'Kuga',
      bodyType: 'suv',
      engines: [
        { code: '1.5 EcoBoost ST-Line AT', fuel: 'Benzin', transmission: 'Otomatik', hp: 150, intervalKm: 15000, marketMin: 1680000, marketMax: 1890000 },
        { code: '1.5 EcoBlue Titanium AT', fuel: 'Dizel', transmission: 'Otomatik', hp: 120, intervalKm: 15000, marketMin: 1600000, marketMax: 1780000 }
      ],
      chronicNote: 'Akü voltaj sensörü ve SYNC 3/4 multimedya sistemi güncellemeleri kontrol edilmelidir.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 35, fr: 35, rl: 33, rr: 33 }
    },
    {
      id: 'courier',
      name: 'Tourneo Courier',
      bodyType: 'ticari',
      engines: [
        { code: '1.5 TDCi Titanium Plus', fuel: 'Dizel', transmission: 'Manuel', hp: 100, intervalKm: 15000, marketMin: 780000, marketMax: 890000 },
        { code: '1.0 EcoBoost Titanium AT', fuel: 'Benzin', transmission: 'Otomatik', hp: 125, intervalKm: 15000, marketMin: 1080000, marketMax: 1210000 }
      ],
      chronicNote: 'Triger seti ve ıslak kayış/zincir değişimi km/yıl sınırına riayet edilerek yapılmalıdır.',
      chronicLevel: 'Orta',
      tirePsi: { fl: 36, fr: 36, rl: 40, rr: 40 }
    }
  ],

  toyota: [
    {
      id: 'corolla',
      name: 'Corolla',
      bodyType: 'otomobil',
      engines: [
        { code: '1.8 Hybrid Passion X-Pack e-CVT', fuel: 'Hibrit', transmission: 'Otomatik', hp: 140, intervalKm: 10000, marketMin: 1480000, marketMax: 1650000 },
        { code: '1.8 Hybrid Dream e-CVT', fuel: 'Hibrit', transmission: 'Otomatik', hp: 140, intervalKm: 10000, marketMin: 1320000, marketMax: 1460000 },
        { code: '1.5 Vision Multidrive S', fuel: 'Benzin', transmission: 'Otomatik', hp: 125, intervalKm: 10000, marketMin: 1050000, marketMax: 1180000 },
        { code: '1.6 Flame X-Pack MDS', fuel: 'Benzin', transmission: 'Otomatik', hp: 132, intervalKm: 10000, marketMin: 1150000, marketMax: 1270000 }
      ],
      chronicNote: 'Hibrit batarya soğutma fanı filtresi (arka koltuk altı) her 20.000 KM’de toz temizliği yapılmalıdır.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 33, fr: 33, rl: 32, rr: 32 }
    },
    {
      id: 'chr',
      name: 'C-HR',
      bodyType: 'suv',
      engines: [
        { code: '1.8 Hybrid Passion e-CVT', fuel: 'Hibrit', transmission: 'Otomatik', hp: 140, intervalKm: 10000, marketMin: 1550000, marketMax: 1720000 }
      ],
      chronicNote: 'Kör nokta uyarı sensörleri arka tampon yıkama sonrası kalibrasyon hassasiyeti gösterebilir.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 34, fr: 34, rl: 32, rr: 32 }
    }
  ],

  togg: [
    {
      id: 't10x',
      name: 'T10X',
      bodyType: 'suv',
      engines: [
        { code: 'V2 RWD Uzun Menzil (88.5 kWh)', fuel: 'Elektrik', transmission: 'Otomatik', hp: 218, intervalKm: 20000, marketMin: 1720000, marketMax: 1920000 },
        { code: 'V1 RWD Standart Menzil (52.4 kWh)', fuel: 'Elektrik', transmission: 'Otomatik', hp: 218, intervalKm: 20000, marketMin: 1430000, marketMax: 1580000 }
      ],
      chronicNote: 'Trumore OTA yazılım güncellemeleri ve 12V yardımcı akü voltaj kontrolü düzenli yapılmalıdır.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 38, fr: 38, rl: 38, rr: 38 }
    }
  ],

  hyundai: [
    {
      id: 'i20',
      name: 'i20',
      bodyType: 'otomobil',
      engines: [
        { code: '1.4 MPI Elite Otomatik', fuel: 'Benzin', transmission: 'Otomatik', hp: 100, intervalKm: 15000, marketMin: 920000, marketMax: 1030000 },
        { code: '1.0 T-GDI Style DCT', fuel: 'Benzin', transmission: 'Otomatik', hp: 100, intervalKm: 15000, marketMin: 960000, marketMax: 1080000 }
      ],
      chronicNote: 'Tork konvertörlü 1.4 motor sorunsuzdur; 1.0 T-GDI DCT şanzımanda yoğun trafikte ısınma uyarısı takip edilmelidir.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 33, fr: 33, rl: 31, rr: 31 }
    },
    {
      id: 'tucson',
      name: 'Tucson',
      bodyType: 'suv',
      engines: [
        { code: '1.6 CRDi Elite Plus 4x4 DCT', fuel: 'Dizel', transmission: 'Otomatik', hp: 136, intervalKm: 15000, marketMin: 1850000, marketMax: 2050000 },
        { code: '1.6 T-GDI Prime Plus DCT', fuel: 'Benzin', transmission: 'Otomatik', hp: 180, intervalKm: 15000, marketMin: 1680000, marketMax: 1880000 }
      ],
      chronicNote: 'DPF rejenerasyonu ve 4x4 diferansiyel yağı 60.000 km kontrolü aksatılmamalıdır.',
      chronicLevel: 'Düşük',
      tirePsi: { fl: 35, fr: 35, rl: 35, rr: 35 }
    }
  ]
};

// Yıl aralığı 2010 - 2026
export const YEARS = Array.from({ length: 17 }, (_, i) => 2026 - i);

// Ekspertiz ve Hasar Seçenekleri
export const DAMAGE_STATUSES = [
  { id: 'hatasiz', label: 'Hatasız / Boyasız (Tramer Yok)', badge: 'success' },
  { id: 'lokal', label: 'Lokal Boyalı (1-2 Parça Çizik Boyası)', badge: 'info' },
  { id: 'boyali', label: '2-4 Parça Boyalı', badge: 'warning' },
  { id: 'degisen', label: 'Değişenli (1-2 Parça Değişen)', badge: 'warning' },
  { id: 'agir_hasar', label: 'Ağır Hasar / Pert Kayıtlı', badge: 'danger' }
];
