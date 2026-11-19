export const DEMO_USER = {
  id: 'user_ulu_01',
  firstName: 'Ahmet',
  lastName: 'Ulu',
  username: 'ahmetulu',
  email: 'ahmet@ulukontrol.com',
  phone: '+90 (532) 555 61 61',
  avatarText: 'AU',
  isVerifiedDriver: true,
  createdAt: '2025-01-15',
  notifications: {
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    maintenanceAlerts: true,
    inspectionAlerts: true
  }
};

export const DEMO_VEHICLES = [
  {
    id: 'veh-34-ulu-61',
    plate: '34 ULU 61',
    brand: 'Renault',
    model: 'Megane Sedan',
    year: 2021,
    bodyType: 'otomobil',
    enginePackage: '1.5 Blue dCi Icon EDC',
    fuel: 'Dizel',
    transmission: 'Otomatik',
    currentKm: 78450,
    monthlyAvgKm: 1400,
    lastServiceKm: 70000,
    lastServiceDate: '2026-05-14',
    serviceIntervalKm: 15000,
    marketValue: 1185000,
    marketTrend: '+2.4%',
    marketTrendAmount: 28000,
    tires: {
      brand: 'Continental ContiEcoContact 6',
      size: '205/55 R16',
      season: 'Yazlık',
      treadDepthMm: 6.4,
      lifePercentage: 80,
      pressures: { fl: 33, fr: 33, rl: 32, rr: 31 }, // RR 31 PSI (1 psi warning)
      targetPressures: { fl: 33, fr: 33, rl: 32, rr: 32 }
    },
    inspectionDate: '2027-03-15',
    insuranceDate: '2026-12-05',
    kaskoDate: '2027-01-20',
    damageStatus: 'hatasiz',
    damageNote: 'Tramer kaydı yoktur. Kapalı garajda muhafaza edilmiştir.',
    tramerAmount: 0,
    chronicNote: 'EDC çift kavrama ısınma uyarısı için şanzıman yazılımı ve 80.000 KM debriyaj kalibrasyonu kontrolü tavsiye edilir.',
    chronicLevel: 'Orta',
    kmHistory: [
      { date: '2026-11-10', km: 78120, note: 'Haftalık otomatik senkronizasyon' },
      { date: '2026-11-18', km: 78450, note: 'Kullanıcı güncellemesi' }
    ]
  },
  {
    id: 'veh-06-uk-1923',
    plate: '06 UK 1923',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2023,
    bodyType: 'otomobil',
    enginePackage: '1.5 eTSI R-Line DSG',
    fuel: 'Hibrit',
    transmission: 'Otomatik',
    currentKm: 28600,
    monthlyAvgKm: 1100,
    lastServiceKm: 15000,
    lastServiceDate: '2026-01-10',
    serviceIntervalKm: 15000,
    marketValue: 1840000,
    marketTrend: '+1.8%',
    marketTrendAmount: 32000,
    tires: {
      brand: 'Michelin Pilot Sport 4',
      size: '225/45 R17',
      season: '4 Mevsim',
      treadDepthMm: 7.2,
      lifePercentage: 90,
      pressures: { fl: 34, fr: 34, rl: 33, rr: 33 },
      targetPressures: { fl: 34, fr: 34, rl: 33, rr: 33 }
    },
    inspectionDate: '2026-08-22',
    insuranceDate: '2026-11-28',
    kaskoDate: '2026-11-28',
    damageStatus: 'lokal',
    damageNote: 'Sağ arka çamurluk otopark sürtmesi kaynaklı lokal boyalıdır.',
    tramerAmount: 8500,
    chronicNote: '48V mHEV akü şarj yazılımı güncellemesi ve kuru kavrama DQ200 DSG mekatronik basınç testi önerilir.',
    chronicLevel: 'Orta',
    kmHistory: [
      { date: '2026-10-15', km: 27500, note: 'Aylık kontrol' },
      { date: '2026-11-18', km: 28600, note: 'Kullanıcı güncellemesi' }
    ]
  }
];
