// UluKontrol - Kapsamlı Türkiye Araç Kataloğu (Tüm Markalar, Modeller ve Gerçek Donanım Paketleri)
// Temiz Garaj Başlangıcı + Gerçek Motor & Paket Seçimi + Doğru Bakım/Piyasa Hesaplayıcı
(function() {
  'use strict';

  // --- 1. KAPSAMLI TÜRKİYE ARAÇ VE DONANIM PAKETİ KATALOĞU (TÜM MARKALAR) ---
  const BODY_TYPES = [
    { id: 'otomobil', label: 'Otomobil (Sedan / HB / SW)', icon: 'car' },
    { id: 'suv', label: 'SUV / Crossover / 4x4', icon: 'shield' },
    { id: 'ticari', label: 'Hafif Ticari (Van / Kamyonet)', icon: 'truck' }
  ];

  // --- ARAÇ MARKA LOGOLARI (GERÇEK VE ÖZGÜN VEKTÖREL SVG'LER) ---
  function getBrandLogoSvg(brandId, className = 'w-6 h-6') {
    const b = (brandId || '').toLowerCase().trim();

    // 1. RENAULT - İkonik Eşkenar Elmas (Lozenge)
    if (b.includes('renault')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <path d="M12 2L4.5 12L12 22L19.5 12L12 2Z" stroke="#0F172A" stroke-width="2.2" stroke-linejoin="round" fill="none"/>
          <path d="M12 6.5L8 12L12 17.5L16 12L12 6.5Z" fill="#0F172A"/>
        </svg>
      `;
    }

    // 2. VOLKSWAGEN - Orijinal Yuvarlak VW Çemberi
    if (b.includes('volkswagen') || b === 'vw') {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <circle cx="12" cy="12" r="10" fill="#001E50"/>
          <circle cx="12" cy="12" r="8.8" stroke="#FFFFFF" stroke-width="1.2" fill="none"/>
          <path d="M7.5 7.5L10 15L12 9.2L14 15L16.5 7.5" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M8.8 7.5L12 16.5L15.2 7.5" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      `;
    }

    // 3. FIAT - Orijinal Kırmızı Rozet ve Beyaz FIAT Tipografisi
    if (b.includes('fiat')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <rect x="2" y="5.5" width="20" height="13" rx="3.5" fill="#990000"/>
          <text x="12" y="15" fill="#FFFFFF" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="8" text-anchor="middle" letter-spacing="1">FIAT</text>
        </svg>
      `;
    }

    // 4. FORD - Efsanevi Ford Mavi Ovali
    if (b.includes('ford')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <ellipse cx="12" cy="12" rx="10.5" ry="6.5" fill="#003478" stroke="#FFFFFF" stroke-width="1"/>
          <text x="12" y="14.5" fill="#FFFFFF" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-weight="bold" font-size="7.5" text-anchor="middle" letter-spacing="0.5">Ford</text>
        </svg>
      `;
    }

    // 5. TOYOTA - Üç Kesişen İç İçe Elips
    if (b.includes('toyota')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <ellipse cx="12" cy="12" rx="10.5" ry="7.5" stroke="#EB0A1E" stroke-width="1.8"/>
          <ellipse cx="12" cy="9.8" rx="6" ry="3.2" stroke="#EB0A1E" stroke-width="1.6"/>
          <path d="M12 9.8V19.2" stroke="#EB0A1E" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `;
    }

    // 6. HYUNDAI - Eğik Geometrik H ve Elips
    if (b.includes('hyundai')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <ellipse cx="12" cy="12" rx="10.5" ry="7" stroke="#002C6C" stroke-width="1.8"/>
          <path d="M8.5 7.5L8 16.5M15.5 7.5L16 16.5M8 12.5C10 11.5 14 11.5 16 12.5" stroke="#002C6C" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `;
    }

    // 7. PEUGEOT - Yeni Orijinal Kükreyen Aslan Siyah Rozeti
    if (b.includes('peugeot')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <path d="M4 3.5H20V14C20 18.5 12 22 12 22C12 22 4 18.5 4 14V3.5Z" fill="#111827"/>
          <path d="M12 7C9.5 7 8 8.8 8 11C8 13.5 10.5 14 11 15C11.5 16 10.5 17 9 17M12 7C14.5 7 16 8.5 16 10.5C16 12 14.5 13 13 13.5M13 10H16" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" fill="none"/>
          <text x="12" y="6" fill="#FFFFFF" font-size="2.6" font-weight="900" text-anchor="middle" letter-spacing="0.4">PEUGEOT</text>
        </svg>
      `;
    }

    // 8. DACIA - Yeni Geometrik Dacia Link (D ve C Bağı)
    if (b.includes('dacia')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <rect x="2" y="6" width="20" height="12" rx="3.5" fill="#2E4A3D"/>
          <path d="M6 9.5H9L11.5 12L9 14.5H6L8.2 12L6 9.5Z" fill="#FFFFFF"/>
          <path d="M18 9.5H15L12.5 12L15 14.5H18L15.8 12L18 9.5Z" fill="#FFFFFF"/>
        </svg>
      `;
    }

    // 9. OPEL - Sarı Çember İçinde Şimşek (Blitz)
    if (b.includes('opel')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <circle cx="12" cy="12" r="9.2" stroke="#E5A100" stroke-width="2"/>
          <path d="M5.5 11.5H12.5L9 17L18.5 12.5H11.5L15 7L5.5 11.5Z" fill="#E5A100"/>
        </svg>
      `;
    }

    // 10. SKODA - Zümrüt Yeşili Kanatlı Ok (Winged Arrow)
    if (b.includes('skoda')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <circle cx="12" cy="12" r="9.5" fill="#4BA82E" stroke="#2B7418" stroke-width="1"/>
          <path d="M7 13.5C9 13.5 10.5 12 12 10C13 8.5 14.5 7 17 7L14.5 10C16 10.5 17.5 11 18 12L14.5 12.5C15.5 13.5 16.5 14 17 15L13.5 14C11.5 15.5 9.5 16 7 13.5Z" fill="#FFFFFF"/>
          <circle cx="10" cy="11.5" r="1.1" fill="#4BA82E"/>
        </svg>
      `;
    }

    // 11. HONDA - Kırmızı Trapez Rozet İçinde H Harfi
    if (b.includes('honda')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <path d="M4 5C4 4.5 4.5 4 5 4H19C19.5 4 20 4.5 20 5L18.5 19C18.5 19.5 18 20 17.5 20H6.5C6 20 5.5 19.5 5.5 19L4 5Z" stroke="#CC0000" stroke-width="1.8"/>
          <path d="M7.8 6L8.8 18M16.2 6L15.2 18M8.5 12H15.5" stroke="#CC0000" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `;
    }

    // 12. CITROEN - İkili Çift Açılı Çavuş Şeridi
    if (b.includes('citroen')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <path d="M5.5 9.5L12 4L18.5 9.5" stroke="#9E0000" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.5 16.5L12 11L18.5 16.5" stroke="#9E0000" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }

    // 13. BMW - Bavyera Mavi-Beyaz Rozeti
    if (b.includes('bmw')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <circle cx="12" cy="12" r="10" fill="#000000"/>
          <circle cx="12" cy="12" r="7" fill="#FFFFFF"/>
          <path d="M12 5A7 7 0 0 1 19 12H12V5Z" fill="#0066B1"/>
          <path d="M12 12H5A7 7 0 0 1 12 5V12Z" fill="#FFFFFF"/>
          <path d="M12 12V19A7 7 0 0 1 5 12H12Z" fill="#0066B1"/>
          <path d="M12 12H19A7 7 0 0 1 12 19V12Z" fill="#FFFFFF"/>
          <circle cx="12" cy="12" r="10" stroke="#CBD5E1" stroke-width="0.8" fill="none"/>
        </svg>
      `;
    }

    // 14. MERCEDES-BENZ - Üç Kollu Yıldız ve Çember
    if (b.includes('mercedes')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <circle cx="12" cy="12" r="9.5" stroke="#334155" stroke-width="1.8"/>
          <path d="M12 2.5L12 12M12 12L4 16.5M12 12L20 16.5" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 2.5L13.2 12L20 16.5L12 13.8L4 16.5L10.8 12Z" fill="#94A3B8" opacity="0.6"/>
        </svg>
      `;
    }

    // 15. AUDI - Dört Halka
    if (b.includes('audi')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <circle cx="6.5" cy="12" r="3.8" stroke="#0F172A" stroke-width="1.5"/>
          <circle cx="10" cy="12" r="3.8" stroke="#0F172A" stroke-width="1.5"/>
          <circle cx="14" cy="12" r="3.8" stroke="#0F172A" stroke-width="1.5"/>
          <circle cx="17.5" cy="12" r="3.8" stroke="#0F172A" stroke-width="1.5"/>
        </svg>
      `;
    }

    // 16. SEAT / CUPRA - Geometrik Rozet
    if (b.includes('seat') || b.includes('cupra')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#1C1917"/>
          <path d="M16 7H9L6 11.5H14L8 17H15" stroke="#EA580C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      `;
    }

    // 17. KIA - Yeni Birleşik KIA Logosu
    if (b.includes('kia')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <rect x="2" y="6" width="20" height="12" rx="3.5" fill="#05141F"/>
          <text x="12" y="15" fill="#FFFFFF" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="8.5" text-anchor="middle" letter-spacing="1.2">KIA</text>
        </svg>
      `;
    }

    // 18. NISSAN - Orijinal Çember Rozet
    if (b.includes('nissan')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#64748B" stroke-width="1.8"/>
          <rect x="3" y="10" width="18" height="4" fill="#334155" rx="0.5"/>
          <text x="12" y="13" fill="#FFFFFF" font-size="2.8" font-weight="900" text-anchor="middle" letter-spacing="0.6">NISSAN</text>
        </svg>
      `;
    }

    // 19. VOLVO - Demir İmi ve Çapraz Ok
    if (b.includes('volvo')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <circle cx="11.5" cy="12.5" r="7.5" stroke="#003057" stroke-width="1.8"/>
          <path d="M16.5 7.5L20 4M20 4H16M20 4V8" stroke="#003057" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="4" y="10.5" width="15" height="4" fill="#003057" rx="0.8"/>
          <text x="11.5" y="13.5" fill="#FFFFFF" font-size="2.8" font-weight="900" text-anchor="middle" letter-spacing="0.5">VOLVO</text>
        </svg>
      `;
    }

    // 20. TOGG - Resmi Turkuaz Çift Ok Doğu-Batı Elması
    if (b.includes('togg')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <path d="M3.5 12L10.5 5L12 6.5L6.5 12L12 17.5L10.5 19L3.5 12Z" fill="#00B2A9"/>
          <path d="M20.5 12L13.5 5L12 6.5L17.5 12L12 17.5L13.5 19L20.5 12Z" fill="#00B2A9"/>
        </svg>
      `;
    }

    // 21. TESLA - İkonik Kırmızı Motor Kesiti 'T' Harfi
    if (b.includes('tesla')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <path d="M4 5C8 6 16 6 20 5C19 7 15 8 13.5 8V19H10.5V8C9 8 5 7 4 5Z" fill="#E82127"/>
          <path d="M5 3.5C8 4.2 16 4.2 19 3.5C18.5 4.5 15.5 5 12 5C8.5 5 5.5 4.5 5 3.5Z" fill="#E82127"/>
        </svg>
      `;
    }

    // 22. BYD - Build Your Dreams Elips
    if (b.includes('byd')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <ellipse cx="12" cy="12" rx="10" ry="6.5" fill="#0F172A"/>
          <ellipse cx="12" cy="12" rx="9.2" ry="5.7" fill="none" stroke="#FFFFFF" stroke-width="0.8"/>
          <text x="12" y="14.5" fill="#FFFFFF" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="6.5" text-anchor="middle" letter-spacing="0.8">BYD</text>
        </svg>
      `;
    }

    // 23. CHERY - Kırmızı Elips ve Kanatlı Rozet
    if (b.includes('chery')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="6.5" stroke="#990000" stroke-width="1.6"/>
          <path d="M8 15L12 7.5L16 15" stroke="#990000" stroke-width="1.6" stroke-linecap="round"/>
          <path d="M7 12H17" stroke="#990000" stroke-width="1.4"/>
        </svg>
      `;
    }

    // 24. MG - Sekizgen Morris Garages Rozeti
    if (b.includes('mg')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <path d="M8 3.5H16L21 8.5V15.5L16 20.5H8L3 15.5V8.5L8 3.5Z" stroke="#B91C1C" stroke-width="1.8" fill="#FEF2F2"/>
          <text x="12" y="15" fill="#B91C1C" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="8" text-anchor="middle" letter-spacing="0.5">MG</text>
        </svg>
      `;
    }

    // 25. SUZUKI - Keskin Kırmızı 'S' Harfi
    if (b.includes('suzuki')) {
      return `
        <svg viewBox="0 0 24 24" class="${className}">
          <path d="M17 4H8L6 7H14L7 13H16L18 10H10L17 4Z" fill="#DC2626"/>
          <path d="M7 20H16L18 17H10L17 11H8L6 14H14L7 20Z" fill="#DC2626"/>
        </svg>
      `;
    }

    // 26. DİĞER / ÖZEL MODEL - Şık Otomobil Direksiyon Simgesi
    return `
      <svg viewBox="0 0 24 24" class="${className}" fill="none">
        <circle cx="12" cy="12" r="9.2" stroke="#10B981" stroke-width="1.8"/>
        <circle cx="12" cy="12" r="3" fill="#10B981"/>
        <path d="M12 2.8V9M2.8 12H9M15 12H21.2M12 15V21.2" stroke="#10B981" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `;
  }

  const BRANDS = [
    { id: 'renault', name: 'Renault', logo: getBrandLogoSvg('renault') },
    { id: 'volkswagen', name: 'Volkswagen', logo: getBrandLogoSvg('volkswagen') },
    { id: 'fiat', name: 'Fiat', logo: getBrandLogoSvg('fiat') },
    { id: 'ford', name: 'Ford', logo: getBrandLogoSvg('ford') },
    { id: 'toyota', name: 'Toyota', logo: getBrandLogoSvg('toyota') },
    { id: 'hyundai', name: 'Hyundai', logo: getBrandLogoSvg('hyundai') },
    { id: 'peugeot', name: 'Peugeot', logo: getBrandLogoSvg('peugeot') },
    { id: 'dacia', name: 'Dacia', logo: getBrandLogoSvg('dacia') },
    { id: 'opel', name: 'Opel', logo: getBrandLogoSvg('opel') },
    { id: 'skoda', name: 'Skoda', logo: getBrandLogoSvg('skoda') },
    { id: 'honda', name: 'Honda', logo: getBrandLogoSvg('honda') },
    { id: 'citroen', name: 'Citroën', logo: getBrandLogoSvg('citroen') },
    { id: 'bmw', name: 'BMW', logo: getBrandLogoSvg('bmw') },
    { id: 'mercedes', name: 'Mercedes-Benz', logo: getBrandLogoSvg('mercedes') },
    { id: 'audi', name: 'Audi', logo: getBrandLogoSvg('audi') },
    { id: 'seat', name: 'Seat / Cupra', logo: getBrandLogoSvg('seat') },
    { id: 'kia', name: 'Kia', logo: getBrandLogoSvg('kia') },
    { id: 'nissan', name: 'Nissan', logo: getBrandLogoSvg('nissan') },
    { id: 'volvo', name: 'Volvo', logo: getBrandLogoSvg('volvo') },
    { id: 'togg', name: 'Togg', logo: getBrandLogoSvg('togg') },
    { id: 'tesla', name: 'Tesla', logo: getBrandLogoSvg('tesla') },
    { id: 'byd', name: 'BYD', logo: getBrandLogoSvg('byd') },
    { id: 'chery', name: 'Chery', logo: getBrandLogoSvg('chery') },
    { id: 'mg', name: 'MG', logo: getBrandLogoSvg('mg') },
    { id: 'suzuki', name: 'Suzuki', logo: getBrandLogoSvg('suzuki') }
  ];

  const VEHICLE_MODELS = {
    renault: [
      {
        name: 'Clio',
        interval: 20000,
        baseVal: 890000,
        engines: [
          '1.5 dCi Joy (Dizel Manuel, 75 HP)',
          '1.5 dCi Joy (Dizel Manuel, 90 HP)',
          '1.5 dCi Touch (Dizel Manuel, 90 HP)',
          '1.5 dCi Icon EDC (Dizel Otomatik, 90 HP)',
          '1.5 Blue dCi Touch (Dizel Manuel, 115 HP)',
          '1.5 Blue dCi Icon (Dizel Manuel, 115 HP)',
          '0.9 TCe Joy (Benzin Manuel, 90 HP)',
          '0.9 TCe Touch (Benzin Manuel, 90 HP)',
          '0.9 TCe Icon (Benzin Manuel, 90 HP)',
          '1.2 16V Joy (Benzin Manuel, 75 HP)',
          '1.2 16V Touch (Benzin Manuel, 75 HP)',
          '1.2 Turbo EDC Icon (Benzin Otomatik, 120 HP)',
          '1.0 SCe Joy (Benzin Manuel, 65 HP)',
          '1.0 TCe Joy (Benzin Manuel, 100 HP)',
          '1.0 TCe Touch (Benzin Manuel, 90 HP)',
          '1.0 TCe Touch X-Tronic (Benzin Otomatik CVT, 90 HP)',
          '1.0 TCe Icon X-Tronic (Benzin Otomatik CVT, 90 HP)',
          '1.0 TCe Evolution X-Tronic (Benzin Otomatik CVT, 90 HP)',
          '1.0 TCe Techno Esprit Alpine X-Tronic (Benzin Otomatik CVT, 90 HP)',
          '1.0 TCe ECO-G Joy/Touch (Benzin & Fabrikasyon LPG, 100 HP)',
          '1.3 TCe Icon EDC (Benzin Otomatik, 130 HP)',
          '1.6 E-Tech Full Hybrid Esprit Alpine (Tam Hibrit Otomatik, 145 HP)'
        ],
        chronic: '1.5 dCi motorlarda mazot filtresi orijinal Mais/Delphi tercih edilmeli ve 20.000 km’de değişmelidir. EDC çift kavrama modellerde 60.000 km debriyaj kalibrasyonu, 1.0 TCe X-Tronic modellerde ise CVT şanzıman yağı 60.000 km’de yenilenmelidir.'
      },
      {
        name: 'Megane Sedan',
        interval: 20000,
        baseVal: 1220000,
        engines: [
          '1.5 dCi Joy (Dizel Manuel, 90/110 HP)',
          '1.5 dCi Touch (Dizel Manuel, 110 HP)',
          '1.5 dCi Touch EDC (Dizel Otomatik, 110 HP)',
          '1.5 dCi Icon EDC (Dizel Otomatik, 110 HP)',
          '1.5 Blue dCi Joy EDC (Dizel Otomatik, 115 HP)',
          '1.5 Blue dCi Touch EDC (Dizel Otomatik, 115 HP)',
          '1.5 Blue dCi Icon EDC (Dizel Otomatik, 115 HP)',
          '1.3 TCe Joy (Benzin Manuel, 140 HP)',
          '1.3 TCe Touch EDC (Benzin Otomatik, 140 HP)',
          '1.3 TCe Icon EDC (Benzin Otomatik, 140 HP)',
          '1.6 16V Joy (Benzin Atmosferik, 115 HP)'
        ],
        chronic: 'EDC çift kavrama yazılımı ve şanzıman beyni voltaj kararlılığı kontrol edilmelidir. 1.5 Blue dCi AdBlue enjektör kristalleşmesine karşı uzun yolda düzenli rejenerasyon tavsiye edilir.'
      },
      {
        name: 'Austral',
        interval: 15000,
        baseVal: 1950000,
        engines: [
          '1.3 Mild Hybrid 160 HP Techno Esprit Alpine EDC',
          '1.2 E-Tech Full Hybrid 200 HP Iconic Esprit Alpine',
          '1.3 Mild Hybrid 160 HP Evolution EDC'
        ],
        chronic: '12V akü yönetim yazılımı servis güncelliği ve 4Control yönlendirme sistemi periyodik kontrol edilmelidir.'
      },
      {
        name: 'Captur',
        interval: 20000,
        baseVal: 1180000,
        engines: [
          '1.3 TCe 140 HP Touch EDC',
          '1.3 TCe 155 HP Icon EDC',
          '1.5 Blue dCi 115 HP Icon EDC',
          '1.0 TCe 90 HP Touch Manuel'
        ],
        chronic: 'Ön amortisör takozları ve EDC kavrama balata boşluğu kontrol edilmelidir.'
      },
      {
        name: 'Duster (Yeni Renault)',
        interval: 20000,
        baseVal: 1350000,
        engines: [
          '1.2 TCe Mild Hybrid 130 HP 4x4 Techno',
          '1.6 E-Tech Full Hybrid 145 HP Evolution',
          '1.0 TCe ECO-G 100 HP Evolution (LPG)'
        ],
        chronic: '4x4 diferansiyel yağı 60.000 km kontrolü ve fabrika çıkışlı LPG filtresi bakımı aksatılmamalıdır.'
      },
      {
        name: 'Fluence',
        interval: 15000,
        baseVal: 620000,
        engines: [
          '1.5 dCi Touch EDC (110 HP)',
          '1.5 dCi Icon EDC (110 HP)',
          '1.5 dCi Joy (90/110 HP Manuel)',
          '1.6 16V Touch / Extreme (115 HP)'
        ],
        chronic: 'EDC beyni (TCU) soket ve akü voltajı kontrol edilmeli; triger seti 4 yıl/80.000 km sınırına riayet edilmelidir.'
      },
      {
        name: 'Symbol',
        interval: 15000,
        baseVal: 520000,
        engines: [
          '1.5 dCi Joy (75/90 HP)',
          '0.9 TCe Touch (90 HP)',
          '1.2 16V Joy (75 HP)'
        ],
        chronic: 'Triger seti ve mazot filtresi zamanında yenilenmelidir.'
      },
      {
        name: 'Talisman',
        interval: 20000,
        baseVal: 1380000,
        engines: [
          '1.6 dCi Icon EDC (130/160 HP Bi-Turbo)',
          '2.0 Blue dCi Initiale Paris EDC (200 HP)',
          '1.3 TCe Icon EDC (160 HP)'
        ],
        chronic: 'Bi-Turbo hortum kelepçeleri ve 4Control arka rot başları kontrol edilmelidir.'
      },
      {
        name: 'Kangoo',
        interval: 20000,
        baseVal: 890000,
        engines: [
          '1.5 Blue dCi Touch (95/115 HP)',
          '1.5 dCi Joy (75/90 HP)',
          '1.3 TCe Icon (130 HP)'
        ],
        chronic: 'AdBlue enjektörü temizliği ve arka torsiyon burçları kontrol edilmelidir.'
      }
    ],

    volkswagen: [
      {
        name: 'Golf',
        interval: 15000,
        baseVal: 1850000,
        engines: [
          '1.0 eTSI Life DSG (110 HP)',
          '1.0 eTSI Style DSG (110 HP)',
          '1.5 eTSI Style DSG (150 HP)',
          '1.5 eTSI R-Line DSG (150 HP)',
          '1.6 TDI Comfortline DSG (115 HP)',
          '1.6 TDI Highline DSG (115 HP)',
          '1.0 TSI Midline Plus Manuel (110 HP)',
          '1.4 TSI Highline DSG (125/150 HP)',
          '2.0 TSI GTI DSG (245 HP)',
          '2.0 TSI R 4Motion DSG (320 HP)'
        ],
        chronic: 'DQ200 kuru kavrama DSG şanzıman mekatronik basınç tüpü ve 48V mHEV akü yazılım güncellemesi kontrol edilmelidir.'
      },
      {
        name: 'Passat',
        interval: 15000,
        baseVal: 1980000,
        engines: [
          '1.5 TSI Business DSG (150 HP)',
          '1.5 TSI Elegance DSG (150 HP)',
          '1.6 TDI Impression DSG (120 HP)',
          '1.6 TDI Business DSG (120 HP)',
          '1.6 TDI Elegance DSG (120 HP)',
          '2.0 TDI Elegance 4Motion DSG (190/240 HP)',
          '1.4 TSI Comfortline DSG (125/150 HP)',
          '1.4 TSI Highline DSG (150 HP)'
        ],
        chronic: '1.5 TSI ACT motorlarda devirdaim su pompası ve termostat gövdesi 70.000 KM sonrası sızıntı açısından gözlenmelidir.'
      },
      {
        name: 'Polo',
        interval: 15000,
        baseVal: 1080000,
        engines: [
          '1.0 TSI Life DSG (95 HP)',
          '1.0 TSI Style DSG (95/110 HP)',
          '1.0 TSI Life Manuel (95 HP)',
          '1.0 MPI Impression Manuel (80 HP)',
          '1.6 TDI Comfortline DSG (95 HP)',
          '1.4 TDI Comfortline DSG (90 HP)',
          '1.2 TSI Comfortline (90 HP)'
        ],
        chronic: 'DSG kalkış titreşimi ve kavrama adaptasyonu yetkili/uzman serviste kontrol edilmelidir.'
      },
      {
        name: 'Tiguan',
        interval: 15000,
        baseVal: 2250000,
        engines: [
          '1.5 eTSI Elegance DSG (150 HP)',
          '1.5 eTSI R-Line DSG (150 HP)',
          '1.5 TSI Life DSG (150 HP)',
          '1.5 TSI ACT Comfortline DSG (150 HP)',
          '1.5 TSI ACT Highline DSG (150 HP)',
          '2.0 TDI Elegance 4Motion DSG (150/200 HP)',
          '1.6 TDI Comfortline Manuel (115 HP)'
        ],
        chronic: 'Panoramik cam tavan su tahliye kanalları düzenli olarak temizlenmelidir.'
      },
      {
        name: 'T-Roc',
        interval: 15000,
        baseVal: 1680000,
        engines: [
          '1.5 TSI Life DSG (150 HP)',
          '1.5 TSI Style DSG (150 HP)',
          '1.5 TSI R-Line DSG (150 HP)',
          '1.0 TSI Life Manuel (110 HP)'
        ],
        chronic: 'Ön süspansiyon salıncak burçları ve DSG yazılım bülteni takip edilmelidir.'
      },
      {
        name: 'Taigo',
        interval: 15000,
        baseVal: 1380000,
        engines: [
          '1.0 TSI Life DSG (110 HP)',
          '1.0 TSI Style DSG (110 HP)',
          '1.5 TSI R-Line DSG (150 HP)'
        ],
        chronic: 'Infotainment ekran yazılımı ve akü voltaj durumu düzenli teyit edilmelidir.'
      },
      {
        name: 'Caddy',
        interval: 15000,
        baseVal: 1280000,
        engines: [
          '2.0 TDI Life DSG (122 HP)',
          '2.0 TDI Style DSG (122 HP)',
          '2.0 TDI Life Manuel (122 HP)',
          '2.0 TDI Maxi Style DSG (122 HP)'
        ],
        chronic: 'DPF rejenerasyonu ve arka helezon yay takozları periyodik kontrol edilmelidir.'
      },
      {
        name: 'Transporter',
        interval: 15000,
        baseVal: 1480000,
        engines: [
          '2.0 TDI 150 HP DSG',
          '2.0 TDI 150 HP Manuel',
          '2.0 TDI 204 HP 4Motion DSG',
          '2.0 TDI 110 HP Manuel'
        ],
        chronic: 'EGR soğutucusu ve turbo basınç hortumları km sınırına göre incelenmelidir.'
      }
    ],

    fiat: [
      {
        name: 'Egea Sedan',
        interval: 10000,
        baseVal: 790000,
        engines: [
          '1.4 Fire Easy Manuel (95 HP)',
          '1.4 Fire Urban Manuel (95 HP)',
          '1.4 Fire Lounge Manuel (95 HP)',
          '1.4 Fire Plus Manuel (95 HP)',
          '1.3 MultiJet Easy Manuel (95 HP)',
          '1.3 MultiJet Urban Manuel (95 HP)',
          '1.3 MultiJet Lounge Manuel (95 HP)',
          '1.6 MultiJet Urban DCT (Dizel Otomatik, 130 HP)',
          '1.6 MultiJet Lounge DCT (Dizel Otomatik, 120/130 HP)',
          '1.5 T4 Hibrit Lounge AT (Benzin-Elektrik Otomatik, 130 HP)'
        ],
        chronic: '1.4 Fire atmosferik motorlarda her 3.000-5.000 km’de yağ çubuğundan seviye kontrolü önerilir. 1.3 MultiJet zincir seti 120.000 km kontrolü tavsiye edilir.'
      },
      {
        name: 'Egea Cross',
        interval: 10000,
        baseVal: 890000,
        engines: [
          '1.4 Fire Street Manuel (95 HP)',
          '1.4 Fire Urban Manuel (95 HP)',
          '1.4 Fire Lounge Manuel (95 HP)',
          '1.6 MultiJet Urban DCT (Dizel Otomatik, 130 HP)',
          '1.6 MultiJet Lounge DCT (Dizel Otomatik, 130 HP)',
          '1.5 T4 Hibrit Lounge AT (Hibrit Otomatik, 130 HP)',
          '1.0 FireFly Cross Lounge (Benzin Turbo, 100 HP)'
        ],
        chronic: 'Yükseltilmiş süspansiyonda viraj demir lastikleri ve z-rotlar periyodik gözden geçirilmelidir.'
      },
      {
        name: 'Fiorino',
        interval: 15000,
        baseVal: 620000,
        engines: [
          '1.3 MultiJet Pop Manuel (95 HP)',
          '1.3 MultiJet Safeline Manuel (95 HP)',
          '1.3 MultiJet Premio Manuel (95 HP)',
          '1.4 Fire Eko LPG Pop (Fabrikasyon LPG, 77 HP)',
          '1.4 Fire Eko LPG Premio (Fabrikasyon LPG, 77 HP)'
        ],
        chronic: 'LPG gaz kesici filtresi ve enjektör kalibrasyonu yılda bir kontrol edilmelidir.'
      },
      {
        name: 'Doblo',
        interval: 15000,
        baseVal: 1050000,
        engines: [
          '1.5 BlueHDi Premio EAT8 (Dizel Otomatik, 130 HP)',
          '1.5 BlueHDi Elegance EAT8 (Dizel Otomatik, 130 HP)',
          '1.6 MultiJet Premio Plus (Dizel, 120 HP)',
          '1.6 MultiJet Maxi (105/120 HP)',
          '1.3 MultiJet Easy (Dizel, 95 HP)',
          '1.3 MultiJet Safeline (Dizel, 95 HP)'
        ],
        chronic: 'Arka makas burçları ve AdBlue SCR sistemi takip edilmelidir.'
      }
    ],

    toyota: [
      {
        name: 'Corolla',
        interval: 10000,
        baseVal: 1480000,
        engines: [
          '1.5 Vision Multidrive S (Benzin Otomatik, 123 HP)',
          '1.5 Dream Multidrive S (Benzin Otomatik, 123 HP)',
          '1.5 Flame X-Pack Multidrive S (Benzin Otomatik, 123 HP)',
          '1.5 Passion X-Pack Multidrive S (Benzin Otomatik, 123 HP)',
          '1.8 Hybrid Dream e-CVT (Tam Hibrit Otomatik, 140 HP)',
          '1.8 Hybrid Flame X-Pack e-CVT (Tam Hibrit Otomatik, 140 HP)',
          '1.8 Hybrid Passion X-Pack e-CVT (Tam Hibrit Otomatik, 140 HP)',
          '1.6 Valvematic Touch Multidrive S (Benzin, 132 HP)',
          '1.4 D-4D Touch M/M (Dizel Otomatik, 90 HP)'
        ],
        chronic: 'Hibrit modellerde arka koltuk yanındaki batarya soğutma fanı filtresi her 20.000 KM’de tozdan arındırılmalıdır. 1.5 3 silindir motorda orijinal motor yağı vizkozitesi (0W-16/0W-20) korunmalıdır.'
      },
      {
        name: 'C-HR',
        interval: 10000,
        baseVal: 1680000,
        engines: [
          '1.8 Hybrid Flame e-CVT (140 HP)',
          '1.8 Hybrid Passion e-CVT (140 HP)',
          '1.8 Hybrid Passion X-Pack e-CVT (140 HP)',
          '1.2 Turbo Dynamic Multidrive S (116 HP)',
          '2.0 Plug-in Hybrid GR Sport (223 HP)'
        ],
        chronic: 'Kör nokta ve ön radar sensör kalibrasyonu cam değişimlerinde kontrol edilmelidir.'
      },
      {
        name: 'Yaris',
        interval: 10000,
        baseVal: 1120000,
        engines: [
          '1.5 Vision Multidrive S (125 HP)',
          '1.5 Dream Multidrive S (125 HP)',
          '1.5 Flame Multidrive S (125 HP)',
          '1.5 Hybrid Dream e-CVT (116 HP)',
          '1.5 Hybrid Flame e-CVT (116 HP)',
          '1.5 Hybrid Style e-CVT (130 HP)',
          '1.0 Vision Manuel (72 HP)'
        ],
        chronic: '12V akü şarj seviyesi hibrit sistem verimliliği için düzenli teyit edilmelidir.'
      },
      {
        name: 'Corolla Cross',
        interval: 10000,
        baseVal: 1880000,
        engines: [
          '1.8 Hybrid Flame X-Pack e-CVT (140 HP)',
          '1.8 Hybrid Passion X-Pack e-CVT (140 HP)',
          '2.0 Hybrid Passion AWD e-CVT (197 HP)'
        ],
        chronic: '5. nesil hibrit sistem şanzıman sıvısı 60.000 km kontrolü önerilir.'
      },
      {
        name: 'Hilux',
        interval: 10000,
        baseVal: 1780000,
        engines: [
          '2.4 D-4D Invincible 4x4 AT (150 HP)',
          '2.4 D-4D Adventure 4x2 AT (150 HP)',
          '2.8 D-4D Invincible 4x4 AT (204 HP)'
        ],
        chronic: '4x4 şaft istavroz yağlaması ve diferansiyel yağı her bakımda gözden geçirilmelidir.'
      }
    ],

    ford: [
      {
        name: 'Focus',
        interval: 15000,
        baseVal: 1450000,
        engines: [
          '1.5 EcoBlue Titanium 8AT (Dizel Otomatik, 120 HP)',
          '1.5 EcoBlue ST-Line 8AT (Dizel Otomatik, 120 HP)',
          '1.5 EcoBlue Trend X Manuel (120 HP)',
          '1.0 EcoBoost Hybrid Titanium 7AT (Hafif Hibrit, 125/155 HP)',
          '1.5 Ti-VCT Trend X Manuel (Benzin, 123 HP)',
          '1.6 TDCi Titanium Manuel (Dizel, 115 HP)',
          '1.6 TDCi Trend X Manuel (Dizel, 115 HP)'
        ],
        chronic: '8 ileri tork konvertörlü otomatik şanzıman yazılımı ve EcoBlue eksantrik zincir gergi bülteni kontrol edilmelidir.'
      },
      {
        name: 'Puma',
        interval: 15000,
        baseVal: 1290000,
        engines: [
          '1.0 EcoBoost mHEV Style AT (125 HP)',
          '1.0 EcoBoost mHEV ST-Line AT (155 HP)',
          '1.0 EcoBoost Titanium AT (125 HP)',
          '1.0 EcoBoost Style Manuel (125 HP)'
        ],
        chronic: '48V batarya bağlantıları ve yakıt geri dönüş borusu kontrol edilmelidir.'
      },
      {
        name: 'Kuga',
        interval: 15000,
        baseVal: 1790000,
        engines: [
          '1.5 EcoBoost Titanium AT (150 HP)',
          '1.5 EcoBoost ST-Line AT (150 HP)',
          '1.5 EcoBlue Titanium 8AT (120 HP)',
          '1.5 EcoBlue ST-Line 8AT (120 HP)',
          '2.0 TDCi Titanium 4x4 PowerShift (180 HP)',
          '2.5 PHEV ST-Line e-CVT (225 HP)'
        ],
        chronic: 'Akü sensörü voltaj kalibrasyonu ve SYNC multimedya yazılımı güncel tutulmalıdır.'
      },
      {
        name: 'Tourneo Courier',
        interval: 15000,
        baseVal: 990000,
        engines: [
          '1.5 EcoBlue Titanium (Dizel, 100 HP)',
          '1.5 EcoBlue Trend (Dizel, 100 HP)',
          '1.5 EcoBlue Deluxe (Dizel, 100 HP)',
          '1.0 EcoBoost Titanium 7AT (Benzin Otomatik, 125 HP)',
          '1.6 TDCi Titanium (95 HP)'
        ],
        chronic: 'Triger kayışı km ve yıl limitine (4 yıl/100.000 km) titizlikle uyulmalıdır.'
      }
    ],

    hyundai: [
      {
        name: 'i20',
        interval: 15000,
        baseVal: 960000,
        engines: [
          '1.4 MPI Jump Otomatik (Benzin, 100 HP)',
          '1.4 MPI Style Otomatik (Benzin, 100 HP)',
          '1.4 MPI Elite Otomatik (Benzin, 100 HP)',
          '1.0 T-GDI Style DCT (Benzin Turbo Otomatik, 100 HP)',
          '1.0 T-GDI Elite DCT (Benzin Turbo Otomatik, 100 HP)',
          '1.2 MPI Jump Manuel (Benzin, 84 HP)',
          '1.0 T-GDI 48V MHEV DCT (100 HP)'
        ],
        chronic: '1.4 MPI tork konvertörlü şanzıman son derece dayanıklıdır; 1.0 T-GDI kuru çift kavramada yoğun dur-kalk trafiğinde ısınma uyarısına dikkat edilmelidir.'
      },
      {
        name: 'Tucson',
        interval: 15000,
        baseVal: 1980000,
        engines: [
          '1.6 CRDi Comfort DCT (136 HP)',
          '1.6 CRDi Prime Plus DCT (136 HP)',
          '1.6 CRDi Elite 4x2 DCT (Dizel Otomatik, 136 HP)',
          '1.6 CRDi Elite Plus 4x4 DCT (Dizel 4x4, 136 HP)',
          '1.6 T-GDI Prime Plus DCT (Benzin Turbo, 180 HP)',
          '1.6 T-GDI Elite Plus 4x4 DCT (180 HP)',
          '1.6 T-GDI Hybrid 4x4 AT (230 HP)'
        ],
        chronic: '4WD diferansiyel yağı 60.000 km kontrolü ve DPF doluluk sensörü kontrol edilmelidir.'
      },
      {
        name: 'Bayon',
        interval: 15000,
        baseVal: 1090000,
        engines: [
          '1.4 MPI Jump Manuel (100 HP)',
          '1.4 MPI Style Otomatik (100 HP)',
          '1.4 MPI Elite Otomatik (100 HP)',
          '1.0 T-GDI Style DCT (100 HP)',
          '1.0 T-GDI Elite DCT (100 HP)'
        ],
        chronic: 'Sorunsuz motor mekaniği; şanzıman sıvısı periyodik kontrolü kafidir.'
      },
      {
        name: 'Elantra',
        interval: 15000,
        baseVal: 1420000,
        engines: [
          '1.6 MPI Prime CVT (123 HP)',
          '1.6 MPI Elite CVT (123 HP)',
          '1.6 CRDi Style DCT (136 HP)',
          '1.6 CRDi Elite Plus DCT (136 HP)'
        ],
        chronic: 'IVT / CVT şanzıman sıvısı 60.000 km’de yetkili serviste kontrol edilmelidir.'
      },
      {
        name: 'Ioniq 5',
        interval: 20000,
        baseVal: 2450000,
        engines: [
          '77.4 kWh Progress AWD 325 HP',
          '58 kWh Advance RWD 170 HP'
        ],
        chronic: 'ICCU şarj kontrol ünitesi servis güncellemesi kontrol edilmelidir.'
      }
    ],

    peugeot: [
      {
        name: '208',
        interval: 15000,
        baseVal: 1120000,
        engines: [
          '1.2 PureTech Active Manuel (75 HP)',
          '1.2 PureTech Allure EAT8 (Benzin Otomatik, 100 HP)',
          '1.2 PureTech GT EAT8 (Benzin Otomatik, 130 HP)',
          '1.5 BlueHDi Allure EAT8 (Dizel Otomatik, 130 HP)',
          '1.5 BlueHDi Active Manuel (100 HP)',
          '1.2 Hybrid 136 e-DCS6 (Hafif Hibrit, 136 HP)',
          'e-208 GT Tam Elektrikli (136 HP)'
        ],
        chronic: '1.2 PureTech ıslak triger kayışı genişliği ve karter yağ süzgeci her bakımda kontrol edilmelidir.'
      },
      {
        name: '3008',
        interval: 15000,
        baseVal: 1880000,
        engines: [
          '1.5 BlueHDi Active Prime EAT8 (130 HP)',
          '1.5 BlueHDi Allure EAT8 (Dizel Otomatik, 130 HP)',
          '1.5 BlueHDi GT EAT8 (Dizel Otomatik, 130 HP)',
          '1.2 PureTech Allure EAT8 (130 HP)',
          '1.2 PureTech GT EAT8 (Benzin, 130 HP)',
          '1.6 PureTech GT EAT8 (Benzin, 180 HP)',
          '1.2 Hybrid 136 e-DCS6 (Hafif Hibrit, 136 HP)'
        ],
        chronic: 'AdBlue deposu havalandırma kapağı ve SCR enjektör kristalleşmesi kontrol edilmelidir.'
      },
      {
        name: '2008',
        interval: 15000,
        baseVal: 1480000,
        engines: [
          '1.2 PureTech Active EAT8 (130 HP)',
          '1.2 PureTech Allure EAT8 (130 HP)',
          '1.2 PureTech GT EAT8 (130 HP)',
          '1.5 BlueHDi Allure EAT8 (130 HP)',
          '1.5 BlueHDi GT EAT8 (130 HP)',
          'e-2008 GT Elektrikli (136/156 HP)'
        ],
        chronic: 'EAT8 tork konvertörlü şanzıman oldukça sorunsuzdur; yazılım güncellemesi önerilir.'
      },
      {
        name: '408',
        interval: 15000,
        baseVal: 1780000,
        engines: [
          '1.2 PureTech Allure EAT8 (130 HP)',
          '1.2 PureTech GT EAT8 (130 HP)',
          '1.2 Hybrid 136 e-DCS6 (136 HP)'
        ],
        chronic: 'i-Cockpit gösterge paneli ve kameraların yazılım bültenleri kontrol edilmelidir.'
      },
      {
        name: 'Rifter',
        interval: 15000,
        baseVal: 1180000,
        engines: [
          '1.5 BlueHDi GT EAT8 (130 HP)',
          '1.5 BlueHDi Allure EAT8 (130 HP)',
          '1.5 BlueHDi Allure Manuel (100 HP)'
        ],
        chronic: 'Arka torsiyon ve süspansiyon burçları kontrol edilmelidir.'
      }
    ],

    dacia: [
      {
        name: 'Duster',
        interval: 15000,
        baseVal: 1180000,
        engines: [
          '1.5 dCi Laureate 4x4 (Dizel Manuel, 110 HP)',
          '1.5 Blue dCi Prestige 4x4 (Dizel Manuel, 115 HP)',
          '1.5 dCi Prestige EDC (Dizel Otomatik, 110 HP)',
          '1.0 TCe ECO-G Comfort (LPG & Benzin, 100 HP)',
          '1.0 TCe ECO-G Prestige (LPG & Benzin, 100 HP)',
          '1.3 TCe Prestige EDC (Benzin Otomatik, 150 HP)',
          '1.2 TCe Mild Hybrid Extreme 4x4 (130 HP)',
          '1.6 E-Tech Full Hybrid Extreme (145 HP)'
        ],
        chronic: '4x4 modellerde arka diferansiyel ve şaft askı bilyası kontrol edilmelidir. ECO-G modellerde LPG filtresi değişimi aksatılmamalıdır.'
      },
      {
        name: 'Sandero Stepway',
        interval: 20000,
        baseVal: 870000,
        engines: [
          '1.0 TCe Expression X-Tronic (Benzin Otomatik CVT, 90 HP)',
          '1.0 TCe Prestige X-Tronic (90 HP)',
          '1.0 TCe ECO-G Expression (Fabrikasyon LPG, 100 HP)'
        ],
        chronic: 'X-Tronic CVT şanzımanda sakin kalkışlar ve 60.000 km sıvı değişimi ömrü uzatır.'
      },
      {
        name: 'Jogger',
        interval: 15000,
        baseVal: 1190000,
        engines: [
          '1.0 TCe Extreme ECO-G (LPG, 100 HP)',
          '1.0 TCe Expression ECO-G (LPG, 100 HP)',
          '1.6 Hybrid Extreme (140 HP)'
        ],
        chronic: '7 koltuklu modellerde arka süspansiyon yük ayarı takip edilmelidir.'
      }
    ],

    opel: [
      {
        name: 'Corsa',
        interval: 15000,
        baseVal: 1080000,
        engines: [
          '1.2 PureTech Edition Manuel (75 HP)',
          '1.2 Turbo Elegance AT8 (100 HP)',
          '1.2 Turbo GS AT8 (130 HP)',
          '1.2 Turbo Ultimate AT8 (130 HP)',
          '1.5 Dizel Edition Manuel (102 HP)',
          'Corsa-e Tam Elektrikli (136 HP)'
        ],
        chronic: '1.2 Turbo ıslak triger kayış aşınması her yağ değişiminde karterden kontrol edilmelidir.'
      },
      {
        name: 'Astra',
        interval: 15000,
        baseVal: 1580000,
        engines: [
          '1.2 Turbo Edition Manuel (130 HP)',
          '1.2 Turbo Elegance AT8 (130 HP)',
          '1.2 Turbo GS AT8 (Benzin Otomatik, 130 HP)',
          '1.5 CRDi GS AT8 (Dizel Otomatik, 130 HP)',
          '1.4 Turbo Dynamic Otomatik (150 HP)',
          '1.6 CDTI Design / Elite AT6 (136 HP)'
        ],
        chronic: 'Pure Panel çift ekran yazılımı yetkili serviste güncel tutulmalıdır.'
      },
      {
        name: 'Mokka',
        interval: 15000,
        baseVal: 1420000,
        engines: [
          '1.2 Turbo Elegance AT8 (130 HP)',
          '1.2 Turbo GS AT8 (130 HP)',
          '1.2 Turbo Ultimate AT8 (130 HP)',
          'Mokka-e Elektrik (136 HP)'
        ],
        chronic: 'Ön radar sensörü temiz tutulmalı, kamera kalibrasyonu kontrol edilmelidir.'
      },
      {
        name: 'Grandland',
        interval: 15000,
        baseVal: 1780000,
        engines: [
          '1.2 Turbo GS AT8 (130 HP)',
          '1.2 Turbo Ultimate AT8 (130 HP)',
          '1.5 Dizel GS AT8 (130 HP)',
          '1.5 Dizel Ultimate AT8 (130 HP)'
        ],
        chronic: 'AdBlue ısıtıcı modülü kış aylarında kontrol edilmelidir.'
      }
    ],

    skoda: [
      {
        name: 'Octavia',
        interval: 15000,
        baseVal: 1780000,
        engines: [
          '1.0 e-TEC Style DSG (110 HP)',
          '1.5 e-TEC Elite DSG (150 HP)',
          '1.5 e-TEC Premium DSG (150 HP)',
          '1.5 e-TEC Sportline DSG (150 HP)',
          '1.6 TDI Style DSG (115 HP)',
          '2.0 TDI RS DSG (200 HP)'
        ],
        chronic: 'Infotainment ekranı ses ve menü yazılımı yetkili serviste güncellenmelidir.'
      },
      {
        name: 'Superb',
        interval: 15000,
        baseVal: 2280000,
        engines: [
          '1.5 e-TEC Elite DSG (150 HP)',
          '1.5 e-TEC Premium DSG (150 HP)',
          '1.5 e-TEC Prestige DSG (150 HP)',
          '1.5 e-TEC L&K Crystal DSG (150 HP)',
          '2.0 TDI Prestige 4x4 DSG (200 HP)',
          '1.6 TDI Prestige DSG (120 HP)',
          '1.4 TSI Style / Prestige DSG (150 HP)'
        ],
        chronic: 'DCC adaptif süspansiyon kalibrasyonu ve DSG mekatronik kontrol edilmelidir.'
      },
      {
        name: 'Kamiq',
        interval: 15000,
        baseVal: 1480000,
        engines: [
          '1.0 TSI Elite DSG (110 HP)',
          '1.0 TSI Premium DSG (110 HP)',
          '1.5 TSI Monte Carlo DSG (150 HP)',
          '1.6 TDI Premium DSG (115 HP)'
        ],
        chronic: 'DQ200 kuru kavrama DSG kalkış titreşimi takip edilmelidir.'
      },
      {
        name: 'Karoq',
        interval: 15000,
        baseVal: 1880000,
        engines: [
          '1.5 TSI Premium DSG (150 HP)',
          '1.5 TSI Prestige DSG (150 HP)',
          '1.5 TSI Sportline DSG (150 HP)',
          '1.6 TDI Prestige DSG (115 HP)'
        ],
        chronic: 'Elektronik el freni motorları ve arka fren balataları kontrol edilmelidir.'
      }
    ],

    honda: [
      {
        name: 'Civic',
        interval: 10000,
        baseVal: 1680000,
        engines: [
          '1.6 i-VTEC Eco Elegance (Fabrikasyon LPG/Benzin, 125 HP)',
          '1.6 i-VTEC Eco Executive (Fabrikasyon LPG/Benzin, 125 HP)',
          '1.5 VTEC Turbo Elegance CVT (182 HP)',
          '1.5 VTEC Turbo Executive+ CVT (182 HP)',
          '1.6 i-DTEC Executive 9AT (Dizel 9 İleri, 120 HP)',
          '2.0 e:HEV Advance e-CVT (Hibrit, 184 HP)'
        ],
        chronic: 'Direksiyon kutusu tıkırtısı için yetkili servis garanti bülteni mevcuttur. Eco modellerde LPG filtre değişimi aksatılmamalıdır.'
      },
      {
        name: 'City',
        interval: 10000,
        baseVal: 990000,
        engines: [
          '1.5 i-VTEC Elegance CVT (121 HP)',
          '1.5 i-VTEC Executive CVT (121 HP)'
        ],
        chronic: 'Son derece sorunsuz atmosferik motor; 40.000 km CVT sıvı değişimi tavsiye edilir.'
      },
      {
        name: 'CR-V',
        interval: 10000,
        baseVal: 2650000,
        engines: [
          '1.5 VTEC Turbo Elegance CVT (193 HP)',
          '1.5 VTEC Turbo Executive+ CVT (193 HP)',
          '2.0 e:HEV Advance AWD (Hibrit, 184 HP)'
        ],
        chronic: 'Hibrit çift elektrik motoru invertör sıvısı kontrol edilmelidir.'
      }
    ],

    citroen: [
      {
        name: 'C4 / C4 X',
        interval: 15000,
        baseVal: 1380000,
        engines: [
          '1.2 PureTech Feel Bold EAT8 (130 HP)',
          '1.2 PureTech Shine Bold EAT8 (130 HP)',
          '1.5 BlueHDi Shine EAT8 (130 HP)',
          'e-C4 Tam Elektrikli (136/156 HP)'
        ],
        chronic: 'Kademeli Hidrolik Destekli Süspansiyon (Progressive Hydraulic) kontrol edilmelidir.'
      },
      {
        name: 'C5 Aircross',
        interval: 15000,
        baseVal: 1880000,
        engines: [
          '1.5 BlueHDi Feel Bold EAT8 (130 HP)',
          '1.5 BlueHDi Shine EAT8 (130 HP)',
          '1.2 Hybrid 136 e-DCS6',
          '1.6 PureTech Shine Bold EAT8 (180 HP)'
        ],
        chronic: 'AdBlue seviye sensörü ve partikül filtresi kontrol edilmelidir.'
      },
      {
        name: 'Berlingo',
        interval: 15000,
        baseVal: 1120000,
        engines: [
          '1.5 BlueHDi Shine EAT8 (130 HP)',
          '1.5 BlueHDi Feel Bold Manuel (100 HP)',
          '1.5 BlueHDi Feel Bold EAT8 (130 HP)'
        ],
        chronic: 'Arka amortisör toz körükleri kontrol edilmelidir.'
      }
    ],

    bmw: [
      {
        name: '3 Serisi (G20)',
        interval: 15000,
        baseVal: 2890000,
        engines: [
          '320i Sedan First Edition M Sport (170 HP)',
          '320i Sedan Edition M Sport (170 HP)',
          '320i Sport Line (170 HP)',
          '320d xDrive M Sport (190 HP)',
          '330i M Sport (258 HP)',
          '320d Luxury Line (190 HP)'
        ],
        chronic: 'B48 motorda genleşme kabı dönüş hortumu ve soğutma sıvısı seviyesi periyodik kontrol edilmelidir.'
      },
      {
        name: '1 Serisi (F40)',
        interval: 15000,
        baseVal: 1980000,
        engines: [
          '118i First Edition M Sport (140 HP)',
          '118i Sport Line (140 HP)',
          '116d M Sport (116 HP)',
          '116d Sport Line (116 HP)'
        ],
        chronic: 'Motor üst kulak takozu 50.000 km civarında ses yapabilir.'
      },
      {
        name: '5 Serisi (G30/G60)',
        interval: 15000,
        baseVal: 3890000,
        engines: [
          '520i Sedan Special Edition M Sport (170 HP)',
          '520i Luxury Line (170 HP)',
          '520d xDrive M Sport (190 HP)',
          '530i xDrive M Sport (252 HP)'
        ],
        chronic: 'ZF 8HP otomatik şanzıman yağı ve karter filtresi 80.000 km’de değişmelidir.'
      },
      {
        name: 'X1 / iX1',
        interval: 15000,
        baseVal: 2480000,
        engines: [
          'sDrive18i xLine (136 HP)',
          'sDrive20i M Sport (170 HP Mild Hybrid)',
          'iX1 xDrive30 M Sport (313 HP Elektrik)'
        ],
        chronic: 'Çift kavramalı 7 ileri şanzımanda kalkış kalibrasyonu tavsiye edilir.'
      }
    ],

    mercedes: [
      {
        name: 'C-Serisi (W205/W206)',
        interval: 15000,
        baseVal: 3180000,
        engines: [
          'C200 4MATIC AMG (204 HP Mild Hybrid)',
          'C200 4MATIC Edition 1 AMG (204 HP)',
          'C200d AMG (160 HP)',
          'C180 AMG (156 HP - W205)',
          'C200d Exclusive (160 HP)'
        ],
        chronic: 'ISG 48V entegre marş jeneratörü yazılım güncelliği yetkili serviste kontrol edilmelidir.'
      },
      {
        name: 'A-Serisi (W177)',
        interval: 15000,
        baseVal: 1980000,
        engines: [
          'A200 AMG (163 HP)',
          'A200 Progressive (163 HP)',
          'A180d AMG (116 HP)',
          'A180d Style (116 HP)'
        ],
        chronic: 'M282 1.33 motorda termostat gövdesi kontrol edilmelidir.'
      },
      {
        name: 'E-Serisi (W213/W214)',
        interval: 15000,
        baseVal: 4250000,
        engines: [
          'E200 Exclusive 9G-Tronic (197 HP)',
          'E200 AMG 9G-Tronic (197 HP)',
          'E220d 4MATIC AMG (197 HP)',
          'E180 Exclusive (156 HP)',
          'E300d 4MATIC AMG (265 HP)'
        ],
        chronic: '9G-Tronic şanzıman yağı ve filtresi 80.000 km değişimi aksatılmamalıdır.'
      },
      {
        name: 'GLA / GLB',
        interval: 15000,
        baseVal: 2380000,
        engines: [
          'GLA 200 AMG (163 HP)',
          'GLA 200 Progressive (163 HP)',
          'GLB 200 Progressive 7 Kişilik (163 HP)',
          'GLB 200 AMG 7 Kişilik (163 HP)'
        ],
        chronic: 'Arka teker porya bilyaları kontrol edilmelidir.'
      }
    ],

    audi: [
      {
        name: 'A3 Sedan / Sportback',
        interval: 15000,
        baseVal: 1890000,
        engines: [
          '35 TFSI S line S tronic (150 HP Mild Hybrid)',
          '35 TFSI Advanced S tronic (150 HP)',
          '30 TFSI Advanced S tronic (110 HP)',
          '30 TDI Advanced S tronic (116 HP)'
        ],
        chronic: '48V mHEV akü şarj kontrol ünitesi bülteni ve S tronic yazılımı kontrol edilmelidir.'
      },
      {
        name: 'A4 Sedan',
        interval: 15000,
        baseVal: 2650000,
        engines: [
          '40 TDI quattro S line S tronic (204 HP)',
          '40 TDI Advanced S tronic (190 HP)',
          '45 TFSI quattro S line (265 HP)',
          '35 TFSI Advanced S tronic (150 HP)'
        ],
        chronic: 'S tronic 7 ileri ıslak kavrama şanzıman yağı 60.000 km’de değişmelidir.'
      },
      {
        name: 'Q3 / Q3 Sportback',
        interval: 15000,
        baseVal: 2380000,
        engines: [
          '35 TFSI Advanced S tronic (150 HP)',
          '35 TFSI S line S tronic (150 HP)',
          '35 TFSI Sportback S line (150 HP)'
        ],
        chronic: 'Ön süspansiyon salıncak burçları kontrol edilmelidir.'
      }
    ],

    seat: [
      {
        name: 'Leon',
        interval: 15000,
        baseVal: 1480000,
        engines: [
          '1.5 eTSI FR DSG (150 HP)',
          '1.0 eTSI Style Plus DSG (110 HP)',
          '1.6 TDI Style DSG (115 HP)',
          '1.4 TSI FR Manuel/DSG (150 HP)'
        ],
        chronic: 'DSG mekatronik basınç seviyesi ve multimedya ekran yazılımı kontrol edilmelidir.'
      },
      {
        name: 'Ibiza',
        interval: 15000,
        baseVal: 990000,
        engines: [
          '1.0 TSI Style DSG (110 HP)',
          '1.0 EcoTSI FR DSG (115 HP)',
          '1.0 MPI Style Manuel (80 HP)'
        ],
        chronic: 'Kavrama adaptasyonu ve ön amortisör takozları kontrol edilmelidir.'
      },
      {
        name: 'Arona',
        interval: 15000,
        baseVal: 1250000,
        engines: [
          '1.0 TSI Style DSG (110 HP)',
          '1.0 TSI FR DSG (110 HP)',
          '1.5 TSI FR DSG (150 HP)'
        ],
        chronic: 'DSG şanzıman adaptasyonu takip edilmelidir.'
      },
      {
        name: 'Cupra Formentor',
        interval: 15000,
        baseVal: 2050000,
        engines: [
          '1.5 TSI DSG (150 HP)',
          '2.0 TSI VZ 4Drive DSG (310 HP)',
          '1.4 e-Hybrid VZ DSG (245 HP)'
        ],
        chronic: 'Direksiyon dokunmatik buton yazılımı ve DCC adaptif süspansiyon kalibrasyonu kontrol edilmelidir.'
      }
    ],

    kia: [
      {
        name: 'Sportage',
        interval: 15000,
        baseVal: 1950000,
        engines: [
          '1.6 CRDi Mild Hybrid Elegance DCT (136 HP)',
          '1.6 CRDi Mild Hybrid Prestige 4x4 DCT (136 HP)',
          '1.6 TGDI Elegance DCT (150/180 HP)',
          '1.6 T-GDI Hybrid 4x4 (230 HP)'
        ],
        chronic: 'DCT çift kavrama ve 4WD diferansiyel yağı 60.000 km kontrolü önerilir.'
      },
      {
        name: 'Stonic',
        interval: 15000,
        baseVal: 1050000,
        engines: [
          '1.4 MPI Cool Otomatik (100 HP)',
          '1.4 MPI Elegance Otomatik (100 HP)',
          '1.0 T-GDI Elegance DCT (100 HP)'
        ],
        chronic: '1.4 MPI sorunsuz tork konvertörlü otomatik şanzıman sıvısı kontrol edilmelidir.'
      },
      {
        name: 'Ceed',
        interval: 15000,
        baseVal: 1350000,
        engines: [
          '1.5 T-GDI Cool DCT (160 HP)',
          '1.5 T-GDI Prestige DCT (160 HP)',
          '1.6 CRDi Mild Hybrid DCT (136 HP)'
        ],
        chronic: 'DCT kavrama balatası kontrol edilmelidir.'
      }
    ],

    nissan: [
      {
        name: 'Qashqai',
        interval: 15000,
        baseVal: 1750000,
        engines: [
          '1.3 DIG-T Tekna X-Tronic (158 HP)',
          '1.3 DIG-T Designpack X-Tronic (158 HP)',
          '1.3 DIG-T Skypack X-Tronic (158 HP)',
          '1.3 DIG-T Platinum Premium X-Tronic (158 HP)',
          '1.5 e-POWER Designpack (190 HP Hibrit)',
          '1.5 e-POWER Skypack (190 HP Hibrit)',
          '1.5 dCi Tekna Manuel (115 HP)',
          '1.5 dCi Skypack (115 HP)'
        ],
        chronic: 'X-Tronic CVT şanzımanda 60.000 km sıvı değişimi aksatılmamalıdır.'
      },
      {
        name: 'Juke',
        interval: 15000,
        baseVal: 1250000,
        engines: [
          '1.0 DIG-T Tekna DCT (115 HP)',
          '1.0 DIG-T Platinum DCT (115 HP)',
          '1.0 DIG-T N-Design DCT (115 HP)'
        ],
        chronic: '7 ileri DCT şanzıman yazılımı yetkili serviste güncel tutulmalıdır.'
      },
      {
        name: 'X-Trail',
        interval: 15000,
        baseVal: 2750000,
        engines: [
          '1.5 e-POWER e-4ORCE Skypack 4x4 (213 HP)',
          '1.5 e-POWER e-4ORCE Platinum 4x4 (213 HP)',
          '1.3 DIG-T Designpack DCT (158 HP)'
        ],
        chronic: 'e-POWER jeneratör motoru ve batarya soğutma sıvısı kontrol edilmelidir.'
      }
    ],

    volvo: [
      {
        name: 'XC40',
        interval: 15000,
        baseVal: 2450000,
        engines: [
          'B4 AWD Plus Dark Geartronic (197 HP Mild Hybrid)',
          'T2 FWD Plus Dark Geartronic (129 HP)',
          'Recharge Tam Elektrikli Twin AWD (408 HP)'
        ],
        chronic: 'Android Automotive multimedya OTA güncellemeleri kontrol edilmelidir.'
      },
      {
        name: 'XC60',
        interval: 15000,
        baseVal: 3850000,
        engines: [
          'B5 AWD Plus Geartronic (250 HP)',
          'B5 AWD Ultimate Geartronic (250 HP)',
          'T8 Recharge Plug-in Hybrid AWD (455 HP)'
        ],
        chronic: 'Hava süspansiyon kompresörü ve 48V akü durumu periyodik teyit edilmelidir.'
      },
      {
        name: 'S60 / S90',
        interval: 15000,
        baseVal: 3250000,
        engines: [
          'B4 AWD Plus Geartronic (197 HP)',
          'B5 AWD Ultimate Geartronic (250 HP)'
        ],
        chronic: 'Pilot Assist radar sensörü ön ızgara temizliği takip edilmelidir.'
      }
    ],

    togg: [
      {
        name: 'T10X',
        interval: 20000,
        baseVal: 1820000,
        engines: [
          'V1 RWD Standart Menzil (52.4 kWh, 314 km, 218 HP)',
          'V2 RWD Standart Menzil (52.4 kWh, 314 km, 218 HP)',
          'V2 RWD Uzun Menzil (88.5 kWh, 523 km, 218 HP)',
          'V2 AWD Çift Motor (88.5 kWh, 435 HP)'
        ],
        chronic: 'Trumore OTA uzaktan yazılım güncellemeleri ve 12V akü kutup başı voltajı düzenli kontrol edilmelidir.'
      },
      {
        name: 'T10F',
        interval: 20000,
        baseVal: 1950000,
        engines: [
          'Fastback RWD Uzun Menzil (88.5 kWh, 218 HP)',
          'Fastback AWD Çift Motor (88.5 kWh, 435 HP)'
        ],
        chronic: 'Batarya termal yönetim soğutma sıvısı seviyesi periyodik kontrol edilmelidir.'
      }
    ],

    tesla: [
      {
        name: 'Model Y',
        interval: 20000,
        baseVal: 2200000,
        engines: [
          'Arkadan İtiş RWD (LFP 60 kWh, 455 km, 299 HP)',
          'Long Range AWD Çift Motor (78.1 kWh, 533 km, 514 HP)',
          'Performance AWD Çift Motor (78.1 kWh, 514 km, 534 HP)'
        ],
        chronic: 'HEPA kabin biyolojik filtreleri ve fren hidrolik nem oranı 2 yılda bir yetkili serviste test edilmelidir.'
      },
      {
        name: 'Model 3',
        interval: 20000,
        baseVal: 2050000,
        engines: [
          'Arkadan İtiş RWD (LFP 60 kWh, 513 km, 283 HP)',
          'Long Range AWD Çift Motor (78.1 kWh, 629 km, 498 HP)',
          'Performance AWD Çift Motor (78.1 kWh, 528 km, 510 HP)'
        ],
        chronic: 'Ön süspansiyon salıncak burçları ve lastik içi akustik köpük izolasyonu periyodik kontrol edilmelidir.'
      }
    ],

    byd: [
      {
        name: 'Atto 3',
        interval: 20000,
        baseVal: 1650000,
        engines: [
          'Design 150 kW (Blade Batarya 60.48 kWh, 420 km, 204 HP)'
        ],
        chronic: 'Blade batarya hücre dengelemesi ve şarj portu aktüatör kilidi periyodik incelenmelidir.'
      },
      {
        name: 'Seal',
        interval: 20000,
        baseVal: 2150000,
        engines: [
          'Design RWD (Blade Batarya 82.5 kWh, 570 km, 313 HP)',
          'Excellence AWD Çift Motor (Blade Batarya 82.5 kWh, 520 km, 530 HP)'
        ],
        chronic: 'iTAC akıllı tork adaptasyon sistemi ve e-Platform 3.0 termal ısı pompası yazılımı güncel tutulmalıdır.'
      },
      {
        name: 'Seal U',
        interval: 15000,
        baseVal: 2090000,
        engines: [
          'DM-i Hibrit 1.5 Benzinli + Elektrikli E-CVT (218 HP)',
          'EV Tam Elektrikli Design (87 kWh, 500 km, 218 HP)'
        ],
        chronic: 'DM-i şarj edilebilir hibrit sistemde benzin-elektrik geçiş kontrol yazılımı incelenmelidir.'
      },
      {
        name: 'Dolphin',
        interval: 20000,
        baseVal: 1390000,
        engines: [
          'Design 150 kW (Blade Batarya 60.48 kWh, 427 km, 204 HP)',
          'Comfort 44.9 kWh (310 km, 95 HP)'
        ],
        chronic: 'Di-Link multimedya OTA sürümü ve yüksek voltaj batarya alt koruma sacı kontrol edilmelidir.'
      }
    ],

    chery: [
      {
        name: 'Tiggo 7 Pro',
        interval: 15000,
        baseVal: 1350000,
        engines: [
          '1.6 TGDI Comfort 7DCT (183 HP)',
          '1.6 TGDI Luxury 7DCT (183 HP)',
          '1.6 TGDI Excellent 7DCT (183 HP)'
        ],
        chronic: '7DCT ıslak çift kavrama şanzımanda yetkili servis şanzıman yazılımı güncel tutulmalıdır.'
      },
      {
        name: 'Tiggo 8 Pro',
        interval: 15000,
        baseVal: 1650000,
        engines: [
          '1.6 TGDI Luxury 7 Kişilik 7DCT (183 HP)',
          '1.6 TGDI Excellent 7 Kişilik 7DCT (183 HP)'
        ],
        chronic: 'Şerit takip kamerası ön cam kalibrasyonu kontrol edilmelidir.'
      },
      {
        name: 'Omoda 5',
        interval: 15000,
        baseVal: 1320000,
        engines: [
          '1.6 TGDI Comfort 7DCT (183 HP)',
          '1.6 TGDI Luxury 7DCT (183 HP)',
          '1.6 TGDI Excellent 7DCT (183 HP)'
        ],
        chronic: 'Multimedya ekranı Türkçe dil paketi ve Apple CarPlay güncellemeleri kontrol edilmelidir.'
      }
    ],

    mg: [
      {
        name: 'HS',
        interval: 15000,
        baseVal: 1450000,
        engines: [
          '1.5 T-GDI Comfort DCT (162 HP)',
          '1.5 T-GDI Luxury DCT (162 HP)',
          'PHEV Hibrit E-HS (258 HP)'
        ],
        chronic: 'DCT şanzıman vites geçiş yazılımı yetkili serviste güncellenmelidir.'
      },
      {
        name: 'ZS',
        interval: 15000,
        baseVal: 1050000,
        engines: [
          '1.5 VTi-tech Comfort Manuel (106 HP)',
          '1.0 T-GDI Luxury Plus Otomatik (111 HP)',
          'ZS EV Tam Elektrikli (72.6 kWh, 156 HP)'
        ],
        chronic: 'Ön süspansiyon z-rotları kontrol edilmelidir.'
      },
      {
        name: 'MG4',
        interval: 20000,
        baseVal: 1390000,
        engines: [
          'Comfort 51 kWh (170 HP Elektrik)',
          'Luxury 64 kWh (204 HP Elektrik)',
          'XPOWER 4WD (435 HP Elektrik)'
        ],
        chronic: 'Batarya şarj soketi kilitleme pimi kontrol edilmelidir.'
      }
    ],

    suzuki: [
      {
        name: 'Vitara',
        interval: 15000,
        baseVal: 1420000,
        engines: [
          '1.4 Boosterjet 4x2 GL Elegance (129 HP Hybrid)',
          '1.4 Boosterjet AllGrip 4x4 GLX Premium (129 HP Hybrid)'
        ],
        chronic: 'AllGrip 4x4 diferansiyel yağı 60.000 km kontrolü tavsiye edilir.'
      },
      {
        name: 'Swift',
        interval: 15000,
        baseVal: 1080000,
        engines: [
          '1.2 Dualjet 12V Hybrid GL Techno CVT (83 HP)',
          '1.2 MHEV GLX Premium CVT (83 HP)'
        ],
        chronic: 'CVT şanzıman sıvısı 40.000 km kontrolü önerilir.'
      },
      {
        name: 'Jimny',
        interval: 10000,
        baseVal: 1650000,
        engines: [
          '1.5 AllGrip 4x4 GLX Otomatik (102 HP)',
          '1.5 AllGrip 4x4 GLX Manuel (102 HP)'
        ],
        chronic: 'Ağır arazi şartları sonrası şaft gresleme ve alt takım kontrolü şarttır.'
      }
    ]
  };

  // --- MODEL FABRİKA ÇIKIŞ VE ÜRETİM YILLARI ARALIĞI ---
  const MODEL_YEAR_RANGES = {
    // TOGG
    't10x': { start: 2023, end: 2026 },
    't10f': { start: 2025, end: 2026 },

    // Chery
    'omoda 5': { start: 2022, end: 2026 },
    'tiggo 7 pro': { start: 2020, end: 2026 },
    'tiggo 8 pro': { start: 2020, end: 2026 },
    'tiggo 4 pro': { start: 2022, end: 2026 },

    // Tesla
    'model y': { start: 2020, end: 2026 },
    'model 3': { start: 2017, end: 2026 },
    'model s': { start: 2012, end: 2026 },
    'model x': { start: 2015, end: 2026 },
    'cybertruck': { start: 2023, end: 2026 },

    // BYD
    'atto 3': { start: 2022, end: 2026 },
    'seal': { start: 2022, end: 2026 },
    'seal u': { start: 2023, end: 2026 },
    'dolphin': { start: 2022, end: 2026 },
    'han': { start: 2021, end: 2026 },
    'tang': { start: 2021, end: 2026 },

    // MG
    'zs': { start: 2018, end: 2026 },
    'zs ev': { start: 2019, end: 2026 },
    'hs': { start: 2020, end: 2026 },
    'e-hs': { start: 2020, end: 2026 },
    'mg4': { start: 2022, end: 2026 },
    'mg4 electric': { start: 2022, end: 2026 },
    'mg7': { start: 2023, end: 2026 },
    'cyberster': { start: 2024, end: 2026 },

    // Renault
    'austral': { start: 2022, end: 2026 },
    'rafale': { start: 2024, end: 2026 },
    'symbioz': { start: 2024, end: 2026 },
    'duster (yeni renault)': { start: 2024, end: 2026 },
    'yeni duster': { start: 2024, end: 2026 },
    'megane e-tech': { start: 2022, end: 2026 },
    'scenic e-tech': { start: 2024, end: 2026 },
    'clio': { start: 2005, end: 2026 },
    'megane sedan': { start: 2016, end: 2026 },
    'megane': { start: 2003, end: 2026 },
    'captur': { start: 2013, end: 2026 },
    'kadjar': { start: 2015, end: 2022 },
    'talisman': { start: 2015, end: 2022 },
    'fluence': { start: 2009, end: 2016 },
    'symbol': { start: 2008, end: 2021 },
    'koleos': { start: 2017, end: 2023 },
    'kangoo': { start: 2003, end: 2026 },
    'zoe': { start: 2013, end: 2024 },

    // Fiat
    'egea': { start: 2015, end: 2026 },
    'egea sedan': { start: 2015, end: 2026 },
    'egea cross': { start: 2021, end: 2026 },
    'egea hatchback': { start: 2016, end: 2026 },
    'egea station wagon': { start: 2016, end: 2024 },
    'topolino': { start: 2023, end: 2026 },
    '600': { start: 2023, end: 2026 },
    '500': { start: 2008, end: 2026 },
    '500e': { start: 2020, end: 2026 },
    '500x': { start: 2015, end: 2024 },
    '500l': { start: 2012, end: 2021 },
    'linea': { start: 2007, end: 2017 },
    'punto': { start: 2005, end: 2018 },
    'grande punto': { start: 2005, end: 2014 },
    'bravo': { start: 2007, end: 2014 },
    'doblo': { start: 2005, end: 2026 },
    'fiorino': { start: 2007, end: 2026 },

    // Volkswagen
    'taigo': { start: 2021, end: 2026 },
    't-roc': { start: 2017, end: 2026 },
    't-cross': { start: 2019, end: 2026 },
    'id.4': { start: 2021, end: 2026 },
    'id.3': { start: 2020, end: 2026 },
    'id.7': { start: 2023, end: 2026 },
    'golf': { start: 2004, end: 2026 },
    'polo': { start: 2005, end: 2026 },
    'passat': { start: 2005, end: 2024 },
    'passat variant': { start: 2005, end: 2026 },
    'tiguan': { start: 2008, end: 2026 },
    'arteon': { start: 2017, end: 2024 },
    'jetta': { start: 2005, end: 2018 },
    'scirocco': { start: 2008, end: 2017 },
    'cc': { start: 2008, end: 2016 },
    'caddy': { start: 2004, end: 2026 },
    'transporter': { start: 2004, end: 2026 },
    'amarok': { start: 2010, end: 2026 },
    'touareg': { start: 2004, end: 2026 },

    // Toyota
    'corolla cross': { start: 2022, end: 2026 },
    'yaris cross': { start: 2021, end: 2026 },
    'c-hr': { start: 2016, end: 2026 },
    'corolla': { start: 2005, end: 2026 },
    'yaris': { start: 2005, end: 2026 },
    'rav4': { start: 2006, end: 2026 },
    'auris': { start: 2007, end: 2018 },
    'avensis': { start: 2005, end: 2018 },
    'camry': { start: 2018, end: 2026 },
    'proace city': { start: 2020, end: 2026 },
    'hilux': { start: 2005, end: 2026 },

    // Ford
    'puma': { start: 2020, end: 2026 },
    'kuga': { start: 2012, end: 2026 },
    'focus': { start: 2005, end: 2026 },
    'fiesta': { start: 2006, end: 2023 },
    'mondeo': { start: 2007, end: 2022 },
    'tourneo courier': { start: 2014, end: 2026 },
    'transit courier': { start: 2014, end: 2026 },
    'tourneo connect': { start: 2006, end: 2026 },
    'ecosport': { start: 2017, end: 2022 },
    'ranger': { start: 2007, end: 2026 },

    // Dacia
    'jogger': { start: 2022, end: 2026 },
    'spring': { start: 2021, end: 2026 },
    'duster': { start: 2010, end: 2024 },
    'sandero': { start: 2008, end: 2026 },
    'sandero stepway': { start: 2009, end: 2026 },
    'lodgy': { start: 2012, end: 2022 },
    'dokker': { start: 2012, end: 2021 },

    // Peugeot
    '408': { start: 2022, end: 2026 },
    '2008': { start: 2013, end: 2026 },
    '3008': { start: 2009, end: 2026 },
    '5008': { start: 2010, end: 2026 },
    '208': { start: 2012, end: 2026 },
    '308': { start: 2008, end: 2026 },
    '508': { start: 2011, end: 2026 },
    'rifter': { start: 2018, end: 2026 },
    '301': { start: 2012, end: 2021 },
    'partner': { start: 2005, end: 2018 },

    // Opel
    'mokka': { start: 2013, end: 2026 },
    'crossland': { start: 2017, end: 2024 },
    'grandland': { start: 2017, end: 2026 },
    'corsa': { start: 2006, end: 2026 },
    'astra': { start: 2005, end: 2026 },
    'insignia': { start: 2008, end: 2022 },
    'combo': { start: 2012, end: 2026 },

    // Hyundai
    'bayon': { start: 2021, end: 2026 },
    'kona': { start: 2017, end: 2026 },
    'ioniq 5': { start: 2021, end: 2026 },
    'ioniq 6': { start: 2022, end: 2026 },
    'staria': { start: 2021, end: 2026 },
    'i10': { start: 2008, end: 2026 },
    'i20': { start: 2009, end: 2026 },
    'tucson': { start: 2005, end: 2026 },
    'elantra': { start: 2006, end: 2026 },
    'accent blue': { start: 2011, end: 2019 },
    'accent era': { start: 2006, end: 2012 },

    // Kia
    'stonic': { start: 2017, end: 2026 },
    'xceed': { start: 2019, end: 2026 },
    'ev6': { start: 2021, end: 2026 },
    'ev9': { start: 2023, end: 2026 },
    'niro': { start: 2016, end: 2026 },
    'sportage': { start: 2005, end: 2026 },
    'picanto': { start: 2006, end: 2026 },
    'rio': { start: 2006, end: 2023 },
    'ceed': { start: 2007, end: 2026 },
    'cerato': { start: 2006, end: 2023 },

    // Citroën
    'ami': { start: 2021, end: 2026 },
    'c4 x': { start: 2022, end: 2026 },
    'c5 aircross': { start: 2018, end: 2026 },
    'c3 aircross': { start: 2017, end: 2026 },
    'c3': { start: 2005, end: 2026 },
    'c4': { start: 2005, end: 2026 },
    'c-elysee': { start: 2012, end: 2021 },
    'berlingo': { start: 2005, end: 2026 },

    // Skoda
    'kamiq': { start: 2019, end: 2026 },
    'karoq': { start: 2017, end: 2026 },
    'kodiaq': { start: 2016, end: 2026 },
    'scala': { start: 2019, end: 2026 },
    'fabia': { start: 2005, end: 2026 },
    'octavia': { start: 2005, end: 2026 },
    'superb': { start: 2005, end: 2026 },
    'rapid': { start: 2012, end: 2019 },
    'yeti': { start: 2009, end: 2017 },

    // Seat & Cupra
    'arona': { start: 2017, end: 2026 },
    'ateca': { start: 2016, end: 2026 },
    'tarraco': { start: 2018, end: 2024 },
    'ibiza': { start: 2005, end: 2026 },
    'leon': { start: 2005, end: 2026 },
    'toledo': { start: 2005, end: 2019 },
    'formentor': { start: 2020, end: 2026 },
    'born': { start: 2021, end: 2026 },

    // Honda
    'zr-v': { start: 2023, end: 2026 },
    'e:ny1': { start: 2023, end: 2026 },
    'hr-v': { start: 2015, end: 2026 },
    'civic': { start: 2005, end: 2026 },
    'cr-v': { start: 2005, end: 2026 },
    'city': { start: 2006, end: 2026 },
    'jazz': { start: 2005, end: 2026 },
    'accord': { start: 2005, end: 2024 },

    // Nissan
    'qashqai': { start: 2007, end: 2026 },
    'juke': { start: 2010, end: 2026 },
    'x-trail': { start: 2005, end: 2026 },
    'micra': { start: 2005, end: 2023 },
    'navara': { start: 2006, end: 2021 },

    // BMW
    'ix': { start: 2021, end: 2026 },
    'i4': { start: 2021, end: 2026 },
    'ix1': { start: 2022, end: 2026 },
    'ix3': { start: 2020, end: 2026 },
    '1 serisi': { start: 2005, end: 2026 },
    '2 serisi gran coupe': { start: 2020, end: 2026 },
    '2 serisi': { start: 2014, end: 2026 },
    '3 serisi': { start: 2005, end: 2026 },
    '4 serisi': { start: 2014, end: 2026 },
    '5 serisi': { start: 2005, end: 2026 },
    'x1': { start: 2009, end: 2026 },
    'x2': { start: 2018, end: 2026 },
    'x3': { start: 2005, end: 2026 },
    'x5': { start: 2005, end: 2026 },

    // Mercedes
    'eqa': { start: 2021, end: 2026 },
    'eqb': { start: 2021, end: 2026 },
    'eqc': { start: 2019, end: 2024 },
    'eqe': { start: 2022, end: 2026 },
    'eqs': { start: 2021, end: 2026 },
    'a-serisi': { start: 2005, end: 2026 },
    'b-serisi': { start: 2005, end: 2026 },
    'c-serisi': { start: 2005, end: 2026 },
    'cla': { start: 2013, end: 2026 },
    'e-serisi': { start: 2005, end: 2026 },
    'gla': { start: 2014, end: 2026 },
    'glb': { start: 2019, end: 2026 },
    'glc': { start: 2015, end: 2026 },

    // Audi
    'q4 e-tron': { start: 2021, end: 2026 },
    'q8 e-tron': { start: 2019, end: 2026 },
    'a3': { start: 2005, end: 2026 },
    'a4': { start: 2005, end: 2026 },
    'a5': { start: 2007, end: 2026 },
    'a6': { start: 2005, end: 2026 },
    'q2': { start: 2016, end: 2026 },
    'q3': { start: 2011, end: 2026 },
    'q5': { start: 2008, end: 2026 },

    // Volvo
    'ex30': { start: 2023, end: 2026 },
    'ex90': { start: 2024, end: 2026 },
    'xc40': { start: 2018, end: 2026 },
    'ex40': { start: 2024, end: 2026 },
    'xc60': { start: 2008, end: 2026 },
    'xc90': { start: 2005, end: 2026 },
    's60': { start: 2005, end: 2024 },
    's90': { start: 2016, end: 2026 },
    'v40': { start: 2012, end: 2019 }
  };

  function getModelYearRange(brandId, modelName) {
    const b = (brandId || '').toLowerCase().trim();
    const m = (modelName || '').toLowerCase().trim();

    // 1. Özel marka kontrolleri (örn. TOGG)
    if (b === 'togg') {
      if (m.includes('t10f')) return [2026, 2025];
      return [2026, 2025, 2024, 2023]; // T10X ve genel TOGG modelleri 2023'ten başlar!
    }

    if (b === 'tesla') {
      if (m.includes('model y')) return [2026, 2025, 2024, 2023, 2022, 2021, 2020];
      if (m.includes('model 3')) return [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];
      if (m.includes('cybertruck')) return [2026, 2025, 2024, 2023];
    }

    if (b === 'chery') {
      return [2026, 2025, 2024, 2023, 2022];
    }

    if (b === 'byd') {
      return [2026, 2025, 2024, 2023, 2022];
    }

    // 2. Sözlükten tam eşleşme veya anahtar kontrolü
    for (const [key, range] of Object.entries(MODEL_YEAR_RANGES)) {
      if (m === key || m.includes(key) || key.includes(m)) {
        const start = Math.max(1995, range.start);
        const end = Math.min(2026, range.end);
        const years = [];
        for (let y = end; y >= start; y--) {
          years.push(y);
        }
        return years;
      }
    }

    // 3. Genel elektrikli / modern modeller
    if (m.includes('electric') || m.includes('e-tech') || m.includes('e-tron') || m.includes('ioniq') || m.includes('ev') || m.includes('hibrit') || m.includes('hybrid')) {
      const years = [];
      for (let y = 2026; y >= 2020; y--) years.push(y);
      return years;
    }

    // 4. Genel standart üretim aralığı (2005-2026)
    const fallbackYears = [];
    for (let y = 2026; y >= 2005; y--) fallbackYears.push(y);
    return fallbackYears;
  }

  const YEARS = Array.from({ length: 22 }, (_, i) => 2026 - i);

  // --- MOTOR VE PAKET AYRIŞTIRICI YARDIMCISI ---
  function parseEngineSpecs(pkg, brandId, modelName) {
    if (!pkg && !brandId) {
      return { fuel: '-', transmission: '-', interval: 15000 };
    }
    const p = (pkg || '').toLowerCase();
    let fuel = 'Benzin';
    if (p.includes('dci') || p.includes('tdi') || p.includes('multijet') || p.includes('bluehdi') || p.includes('crdi') || p.includes('dizel') || p.includes('d-4d') || p.includes('tdci') || p.includes('ecoblue') || p.includes('hdi')) {
      fuel = 'Dizel';
    } else if (p.includes('lpg') || p.includes('eco-g') || p.includes('eko')) {
      fuel = 'Benzin & LPG';
    } else if (p.includes('hybrid') || p.includes('hibrit') || p.includes('e-tec') || p.includes('etsi') || p.includes('e:hev') || p.includes('phev') || p.includes('mhev') || p.includes('e-tech')) {
      fuel = 'Hibrit';
    } else if (p.includes('kwh') || p.includes('elektrik') || p.includes('ev') || p.includes('rwd') || p.includes('awd') || brandId === 'togg' || brandId === 'tesla' || brandId === 'byd') {
      fuel = 'Elektrik';
    }

    let transmission = 'Manuel';
    if (p.includes('edc') || p.includes('dsg') || p.includes('dct') || p.includes('x-tronic') || p.includes('cvt') || p.includes('eat8') || p.includes('at8') || p.includes('otomatik') || p.includes('e-cvt') || p.includes('multidrive') || p.includes('9at') || p.includes('9g-tronic') || p.includes('s tronic') || p.includes('geartronic') || p.includes('amt') || p.includes('at')) {
      transmission = 'Otomatik';
    }

    let interval = 15000;
    if (brandId === 'toyota' || brandId === 'honda' || p.includes('1.4 fire')) {
      interval = 10000;
    } else if ((modelName || '').toLowerCase().includes('clio') || brandId === 'renault' || brandId === 'dacia' || brandId === 'togg') {
      interval = 20000;
    }

    return { fuel, transmission, interval };
  }

  // --- 2. KULLANICI PROFİLİ ---
  const INITIAL_USER = {
    id: 'user_me',
    firstName: 'Araç',
    lastName: 'Sahibi',
    username: 'surucu',
    email: 'kullanici@ulukontrol.com',
    phone: '+90 (5XX) XXX XX XX',
    avatarText: 'AS',
    isVerifiedDriver: true,
    notifications: { pushEnabled: true, emailEnabled: true, smsEnabled: false }
  };
  // --- 2.5 GERÇEKÇİ PİYASA DEĞERLEME & TARİH HESAPLAMA MOTORU ---
  function calculateAuthenticMarketValue(brandId, modelName, year, km, enginePackage) {
    const y = parseInt(year, 10) || 2022;
    const k = parseInt(km, 10) || 45000;
    const currentYear = 2026;
    const age = Math.max(0, currentYear - y);

    // Segment & Model Baz Fiyatı (2024-2026 Sıfır / Yeni Referansı)
    let baseRef2026 = 1450000; // Varsayılan C segment

    const modelLower = (modelName || '').toLowerCase();
    
    // B Segment Küçük / Şehir Araçları
    if (['clio', 'i20', 'corsa', 'polo', 'fiesta', 'yaris', '208', 'c3', 'micra', 'rio', 'ibiza', 'swift', 'sandero', 'symbol'].some(m => modelLower.includes(m))) {
      baseRef2026 = 1250000;
    }
    // C Segment Sedan / Hatchback
    else if (['egea', 'megane', 'corolla', 'focus', 'golf', 'astra', 'octavia', 'civic', 'scala', 'c4', 'ceed', 'cerato', 'leon', 'fluence'].some(m => modelLower.includes(m))) {
      baseRef2026 = 1600000;
    }
    // B & C SUV / Crossover
    else if (['duster', 'captur', 't-roc', 'taigo', 'puma', 'bayon', 'kona', '2008', 'mokka', 'kamiq', 'arona', 'stonic', 'juke', 'crossland', 'egea cross'].some(m => modelLower.includes(m))) {
      baseRef2026 = 1650000;
    }
    else if (['austral', 'tiguan', 'kuga', 'tucson', 'sportage', '3008', '408', 'corolla cross', 'c-hr', 'karoq', 'ateca', 'qashqai', 'c5 aircross', 'grandland', 'omoda 5', 'tiggo 7 pro', 'hs', 'zs'].some(m => modelLower.includes(m))) {
      baseRef2026 = 2250000;
    }
    // D & E Segment / Büyük SUV
    else if (['passat', 'superb', 'insignia', 'mondeo', '508', 'talisman', 'accord', 'camry', 'kodiaq', '5008', 'x-trail', 'cr-v', 'rav4', 'tiggo 8 pro', 't10x', 'xc40', 'model y', 'atto 3', 'seal u'].some(m => modelLower.includes(m))) {
      baseRef2026 = 2600000;
    }
    // Premium Segment (BMW, Mercedes, Audi, Volvo)
    else if (['3 serisi', 'c-serisi', 'a4', 's60', 'x1', 'gla', 'q3', '1 serisi', 'a-serisi', 'a3'].some(m => modelLower.includes(m))) {
      baseRef2026 = 3300000;
    }
    else if (['5 serisi', 'e-serisi', 'a6', 's90', 'x3', 'glc', 'q5', 'xc60'].some(m => modelLower.includes(m))) {
      baseRef2026 = 4400000;
    }
    // Hafif Ticari
    else if (['doblo', 'fiorino', 'kangoo', 'caddy', 'courier', 'rifter', 'berlingo', 'custom', 'transporter', 'vito'].some(m => modelLower.includes(m))) {
      baseRef2026 = 1300000;
    }

    // Türkiye İkinci El Pazar Değer Koruma Oranları (2026 TSB Kasko & Pazar Endeksi)
    let ageRetention = 1.0;
    if (age <= 1) ageRetention = 0.94;
    else if (age <= 2) ageRetention = 0.88;
    else if (age <= 3) ageRetention = 0.83;
    else if (age <= 4) ageRetention = 0.78;
    else if (age <= 5) ageRetention = 0.73;
    else if (age <= 6) ageRetention = 0.68;
    else if (age <= 7) ageRetention = 0.64;
    else if (age <= 8) ageRetention = 0.60;
    else if (age <= 9) ageRetention = 0.56;
    else if (age <= 10) ageRetention = 0.52; // 2016 model (10 yaş): %52 pazar koruması
    else if (age <= 12) ageRetention = 0.46;
    else if (age <= 15) ageRetention = 0.40;
    else if (age <= 18) ageRetention = 0.34;
    else ageRetention = Math.max(0.24, 0.34 - (age - 18) * 0.015);

    let estimatedVal = baseRef2026 * ageRetention;

    // KM Düzeltmesi (Ortalama 18.000 km/yıl baz alınır)
    const expectedKm = Math.max(20000, age * 18000);
    const kmDelta = k - expectedKm;
    const kmAdjustmentRatio = Math.max(-0.12, Math.min(0.12, -(kmDelta / 25000) * 0.025));
    estimatedVal = estimatedVal * (1 + kmAdjustmentRatio);

    // Donanım & Şanzıman Primi
    const engLower = (enginePackage || '').toLowerCase();
    if (engLower.includes('otomatik') || engLower.includes('edc') || engLower.includes('dsg') || engLower.includes('x-tronic') || engLower.includes('eat8')) {
      estimatedVal *= 1.05;
    }
    if (engLower.includes('hibrit') || engLower.includes('hybrid') || engLower.includes('e-tech')) {
      estimatedVal *= 1.06;
    }

    const finalAverage = Math.round(estimatedVal / 5000) * 5000;
    const minRange = Math.round((finalAverage * 0.94) / 5000) * 5000;
    const maxRange = Math.round((finalAverage * 1.06) / 5000) * 5000;

    return {
      average: finalAverage,
      min: minRange,
      max: maxRange,
      trend: '+2.4%',
      dataSource: 'TSB Kasko Değer Endeksi & 2026 İkinci El Pazar Verileri'
    };
  }

  // --- 2.6 EKSPERTİZ, BOYA, DEĞİŞEN & HASAR ANALİZ MOTORU ---
  const EXPERTISE_PARTS = [
    { id: 'kaput', label: 'Motor Kaputu', group: 'Gövde Üst / Ön' },
    { id: 'tavan', label: 'Tavan', group: 'Gövde Üst / Ön' },
    { id: 'bagaj', label: 'Bagaj Kapağı', group: 'Gövde Üst / Ön' },
    { id: 'solOnCamurluk', label: 'Sol Ön Çamurluk', group: 'Sol Yan' },
    { id: 'solOnKapi', label: 'Sol Ön Kapı', group: 'Sol Yan' },
    { id: 'solArkaKapi', label: 'Sol Arka Kapı', group: 'Sol Yan' },
    { id: 'solArkaCamurluk', label: 'Sol Arka Çamurluk', group: 'Sol Yan' },
    { id: 'sagOnCamurluk', label: 'Sağ Ön Çamurluk', group: 'Sağ Yan' },
    { id: 'sagOnKapi', label: 'Sağ Ön Kapı', group: 'Sağ Yan' },
    { id: 'sagArkaKapi', label: 'Sağ Arka Kapı', group: 'Sağ Yan' },
    { id: 'sagArkaCamurluk', label: 'Sağ Arka Çamurluk', group: 'Sağ Yan' }
  ];

  function getVehicleExpertise(v) {
    if (!v) return null;
    if (!v.expertise) {
      v.expertise = {
        heavyDamage: false,
        tramerAmount: 0,
        sasiPodyeAirbag: 'orijinal',
        parts: {
          kaput: 'orijinal',
          tavan: 'orijinal',
          bagaj: 'orijinal',
          solOnCamurluk: 'orijinal',
          solOnKapi: 'orijinal',
          solArkaKapi: 'orijinal',
          solArkaCamurluk: 'orijinal',
          sagOnCamurluk: 'orijinal',
          sagOnKapi: 'orijinal',
          sagArkaKapi: 'orijinal',
          sagArkaCamurluk: 'orijinal'
        }
      };
    }
    if (!v.expertise.parts) v.expertise.parts = {};
    EXPERTISE_PARTS.forEach(p => {
      if (!v.expertise.parts[p.id]) v.expertise.parts[p.id] = 'orijinal';
    });
    if (v.expertise.heavyDamage === undefined) v.expertise.heavyDamage = false;
    if (v.expertise.tramerAmount === undefined) v.expertise.tramerAmount = 0;
    if (!v.expertise.sasiPodyeAirbag) v.expertise.sasiPodyeAirbag = 'orijinal';

    return v.expertise;
  }

  function calculateExpertiseSummary(expertise) {
    let paintCount = 0;
    let localCount = 0;
    let changedCount = 0;
    let originalCount = 0;

    const parts = (expertise && expertise.parts) ? expertise.parts : {};
    EXPERTISE_PARTS.forEach(p => {
      const st = parts[p.id] || 'orijinal';
      if (st === 'degisen') changedCount++;
      else if (st === 'boyali') paintCount++;
      else if (st === 'lokal') localCount++;
      else originalCount++;
    });

    let penaltyRate = 0;
    if (expertise && expertise.heavyDamage) {
      penaltyRate += 0.28; // %28 ağır hasar düşüşü
    }
    if (expertise && expertise.sasiPodyeAirbag === 'islemli') {
      penaltyRate += 0.09; // %9 şasi/airbag düşüşü
    }

    const PART_PENALTIES = {
      tavan: { lokal: 0.03, boyali: 0.06, degisen: 0.14 },
      kaput: { lokal: 0.015, boyali: 0.03, degisen: 0.06 },
      bagaj: { lokal: 0.012, boyali: 0.025, degisen: 0.045 },
      solOnCamurluk: { lokal: 0.007, boyali: 0.015, degisen: 0.03 },
      solOnKapi: { lokal: 0.009, boyali: 0.018, degisen: 0.035 },
      solArkaKapi: { lokal: 0.009, boyali: 0.018, degisen: 0.035 },
      solArkaCamurluk: { lokal: 0.007, boyali: 0.015, degisen: 0.03 },
      sagOnCamurluk: { lokal: 0.007, boyali: 0.015, degisen: 0.03 },
      sagOnKapi: { lokal: 0.009, boyali: 0.018, degisen: 0.035 },
      sagArkaKapi: { lokal: 0.009, boyali: 0.018, degisen: 0.035 },
      sagArkaCamurluk: { lokal: 0.007, boyali: 0.015, degisen: 0.03 }
    };

    EXPERTISE_PARTS.forEach(p => {
      const st = parts[p.id] || 'orijinal';
      const pen = PART_PENALTIES[p.id]?.[st] || 0;
      penaltyRate += pen;
    });

    penaltyRate = Math.min(0.52, penaltyRate);

    const isHatasiz = !(expertise && expertise.heavyDamage) &&
                      !(expertise && expertise.sasiPodyeAirbag === 'islemli') &&
                      (!expertise || (expertise.tramerAmount || 0) === 0) &&
                      paintCount === 0 && localCount === 0 && changedCount === 0;

    return {
      paintCount,
      localCount,
      changedCount,
      originalCount,
      penaltyRate,
      isHatasiz
    };
  }

  // --- 2.7 2026 RESMİ MTV (MOTORLU TAŞITLAR VERGİSİ) MOTORU ---
  function calculate2026MTV(brandId, model, enginePackage, year) {
    const y = parseInt(year, 10) || 2020;
    const age = Math.max(1, 2026 - y + 1);
    const pkg = (enginePackage || '').toLowerCase();
    const mdl = (model || '').toLowerCase();

    // Motor silindir hacmi bandı
    let ccBand = '1301-1600';
    if (pkg.includes('1.0') || pkg.includes('1.2') || pkg.includes('0.9') || pkg.includes('1.3 tce') || pkg.includes('1.3 multijet') || pkg.includes('1.3 cdti')) {
      ccBand = '1-1300';
    } else if (pkg.includes('1.4') || pkg.includes('1.5') || pkg.includes('1.6')) {
      ccBand = '1301-1600';
    } else if (pkg.includes('1.8') || pkg.includes('1.7')) {
      ccBand = '1601-1800';
    } else if (pkg.includes('2.0')) {
      ccBand = '1801-2000';
    } else if (pkg.includes('elektrik') || pkg.includes('ev') || mdl.includes('t10x') || pkg.includes('kwh')) {
      ccBand = 'elektrik';
    }

    // 2026 Güncel Yıllık MTV Tarifesi
    let yearly = 5850;
    if (ccBand === '1-1300') {
      if (age <= 3) yearly = 5850;
      else if (age <= 6) yearly = 4080;
      else if (age <= 11) yearly = 2280;
      else if (age <= 15) yearly = 1730;
      else yearly = 620;
    } else if (ccBand === '1301-1600') {
      if (age <= 3) yearly = 10180;
      else if (age <= 6) yearly = 7640;
      else if (age <= 11) yearly = 4440;
      else if (age <= 15) yearly = 3130;
      else yearly = 1200;
    } else if (ccBand === '1601-1800') {
      if (age <= 3) yearly = 17980;
      else if (age <= 6) yearly = 14040;
      else if (age <= 11) yearly = 8270;
      else yearly = 5020;
    } else if (ccBand === '1801-2000') {
      if (age <= 3) yearly = 28350;
      else if (age <= 6) yearly = 21850;
      else if (age <= 11) yearly = 12850;
      else yearly = 7600;
    } else if (ccBand === 'elektrik') {
      yearly = 2540; // Teşvikli elektrikli MTV
    }

    const installment = Math.round(yearly / 2);
    return {
      yearlyTotal: yearly,
      installment1: installment,
      installment2: installment,
      ccBand: ccBand === 'elektrik' ? 'Elektrikli Teşvikli' : `${ccBand} cc`,
      age: age
    };
  }

  // --- 2.8 YAKIT & TÜKETİM MOTORU ---
  function getVehicleFuelStats(v) {
    if (!v) return null;
    const logs = v.fuelLogs || [];
    if (logs.length > 0) {
      const totalLiters = logs.reduce((sum, item) => sum + (parseFloat(item.liters) || 0), 0);
      const totalCost = logs.reduce((sum, item) => sum + (parseFloat(item.totalCost) || 0), 0);
      
      const kmValues = logs.map(l => l.km);
      const minKm = Math.min(...kmValues);
      const maxKm = Math.max(...kmValues);
      const kmDiff = maxKm - minKm;

      let lPer100 = 0;
      let costPerKm = 0;
      if (kmDiff > 0 && totalLiters > 0) {
        lPer100 = (totalLiters / kmDiff) * 100;
        costPerKm = totalCost / kmDiff;
      } else {
        lPer100 = (v.fuel === 'Dizel') ? 5.2 : 6.8;
        costPerKm = (lPer100 * (totalCost / Math.max(1, totalLiters))) / 100;
      }

      return {
        hasLogs: true,
        logCount: logs.length,
        avgLitersPer100: parseFloat(lPer100.toFixed(1)),
        unitLabel: 'L / 100 KM',
        costPerKm: parseFloat(costPerKm.toFixed(2)),
        totalSpent: Math.round(totalCost),
        totalLiters: parseFloat(totalLiters.toFixed(1)),
        lastLog: logs[0]
      };
    }

    // Fiş girilmemişse motor ve yakıta göre gerçekçi fabrika tahmini
    const f = (v.fuel || '').toLowerCase();
    let defaultL100 = 6.2;
    let avgLiterPrice = 45.5;
    if (f.includes('dizel')) {
      defaultL100 = 4.8;
      avgLiterPrice = 46.0;
    } else if (f.includes('lpg')) {
      defaultL100 = 8.6;
      avgLiterPrice = 25.0;
    } else if (f.includes('elektrik')) {
      return {
        hasLogs: false,
        logCount: 0,
        avgLitersPer100: 16.5,
        unitLabel: 'kWh / 100 KM',
        costPerKm: 0.95,
        totalSpent: 0,
        totalLiters: 0,
        lastLog: null
      };
    }

    const estCostPerKm = (defaultL100 * avgLiterPrice) / 100;
    return {
      hasLogs: false,
      logCount: 0,
      avgLitersPer100: parseFloat(defaultL100.toFixed(1)),
      unitLabel: 'L / 100 KM',
      costPerKm: parseFloat(estCostPerKm.toFixed(2)),
      totalSpent: 0,
      totalLiters: 0,
      lastLog: null
    };
  }

  // --- 2.9 GÖSTERGE PANELİ ARIZA & İKAZ LAMBALARI KATALOĞU (ORİJİNAL KADRAN SİMGELERİ) ---
  const DASHBOARD_ICONS = {
    'check-engine': (cls = 'w-9 h-9') => `
      <svg class="${cls}" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 13h-2v-3c0-.6-.4-1-1-1h-3V7c0-.6-.4-1-1-1h-2V4c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v2H9c-.6 0-1 .4-1 1v2H5c-.6 0-1 .4-1 1v3H2c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2v2c0 .6.4 1 1 1h3c.6 0 1-.4 1-1v-1h8v1c0 .6.4 1 1 1h3c.6 0 1-.4 1-1v-2h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1zm-4 4H6v-6h12v6z"/>
        <circle cx="9" cy="14" r="1.2"/>
        <circle cx="15" cy="14" r="1.2"/>
      </svg>
    `,
    'oil-pressure': (cls = 'w-9 h-9') => `
      <svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 13.5c0-2.2 1.8-3.5 4.5-3.5h7c2.5 0 4 1.5 4 3.5v2.5c0 2-2 3-4 3H9c-2.5 0-4-1-4-3v-2.5z" fill="currentColor" fill-opacity="0.2"/>
        <path d="M5 14L2 12l-.5 1.5L4 15.5V17"/>
        <path d="M20.5 13.5h2c.8 0 1.5.7 1.5 1.5v1c0 1-.8 1.8-1.8 1.8H20.5"/>
        <path d="M9 10V7.5h6V10"/>
        <path d="M12 4v3.5"/>
        <path d="M2 19c0-1 1.5-2.2 1.5-2.2S5 18 5 19a1.5 1.5 0 0 1-3 0z" fill="currentColor"/>
      </svg>
    `,
    'coolant-temp': (cls = 'w-9 h-9') => `
      <svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 13.8V5a2 2 0 1 0-4 0v8.8a3.5 3.5 0 1 0 4 0z" fill="currentColor" fill-opacity="0.2"/>
        <path d="M12 8v5"/>
        <circle cx="12" cy="16.5" r="1.8" fill="currentColor"/>
        <line x1="16" y1="5" x2="18.5" y2="5"/>
        <line x1="16" y1="8" x2="18.5" y2="8"/>
        <path d="M3 20c1.5-.8 3.2-.8 4.7 0 1.5.8 3.2.8 4.7 0 1.5-.8 3.2-.8 4.7 0 1.5.8 3.2.8 4.7 0"/>
        <path d="M3 17c1.5-.8 3.2-.8 4.7 0 1.5.8 3.2.8 4.7 0"/>
      </svg>
    `,
    'battery-charge': (cls = 'w-9 h-9') => `
      <svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="7" width="20" height="13" rx="2" fill="currentColor" fill-opacity="0.15"/>
        <rect x="5" y="3" width="3" height="4" rx="0.5" fill="currentColor"/>
        <rect x="16" y="3" width="3" height="4" rx="0.5" fill="currentColor"/>
        <line x1="5.5" y1="13.5" x2="9" y2="13.5" stroke-width="2.5"/>
        <line x1="16.5" y1="11.5" x2="16.5" y2="15.5" stroke-width="2.5"/>
        <line x1="14.5" y1="13.5" x2="18.5" y2="13.5" stroke-width="2.5"/>
      </svg>
    `,
    'dpf-filter': (cls = 'w-9 h-9') => `
      <svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="6" width="14" height="12" rx="3" fill="currentColor" fill-opacity="0.15"/>
        <line x1="1" y1="12" x2="5" y2="12" stroke-width="2.5"/>
        <line x1="19" y1="12" x2="23" y2="12" stroke-width="2.5"/>
        <circle cx="8.5" cy="9.5" r="1.1" fill="currentColor"/>
        <circle cx="12" cy="9.5" r="1.1" fill="currentColor"/>
        <circle cx="15.5" cy="9.5" r="1.1" fill="currentColor"/>
        <circle cx="8.5" cy="12" r="1.1" fill="currentColor"/>
        <circle cx="12" cy="12" r="1.1" fill="currentColor"/>
        <circle cx="15.5" cy="12" r="1.1" fill="currentColor"/>
        <circle cx="8.5" cy="14.5" r="1.1" fill="currentColor"/>
        <circle cx="12" cy="14.5" r="1.1" fill="currentColor"/>
        <circle cx="15.5" cy="14.5" r="1.1" fill="currentColor"/>
      </svg>
    `,
    'tpms-tire': (cls = 'w-9 h-9') => `
      <svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 14C3.5 8 5.5 4 12 4s8.5 4 8 10c-.3 2.5-1.5 4.5-3 5.5" fill="currentColor" fill-opacity="0.15"/>
        <path d="M4 14C3.5 8 5.5 4 12 4s8.5 4 8 10"/>
        <path d="M4 17h16"/>
        <line x1="5.5" y1="17" x2="5.5" y2="20" stroke-width="2"/>
        <line x1="8.5" y1="17" x2="8.5" y2="20" stroke-width="2"/>
        <line x1="12" y1="17" x2="12" y2="20" stroke-width="2"/>
        <line x1="15.5" y1="17" x2="15.5" y2="20" stroke-width="2"/>
        <line x1="18.5" y1="17" x2="18.5" y2="20" stroke-width="2"/>
        <line x1="12" y1="7" x2="12" y2="12" stroke-width="2.5"/>
        <circle cx="12" cy="14.5" r="1.1" fill="currentColor"/>
      </svg>
    `,
    'brake-system': (cls = 'w-9 h-9') => `
      <svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="6.8" fill="currentColor" fill-opacity="0.15"/>
        <line x1="12" y1="8" x2="12" y2="12.5" stroke-width="2.5"/>
        <circle cx="12" cy="15.5" r="1.1" fill="currentColor"/>
        <path d="M3.5 8a10.5 10.5 0 0 0 0 8" stroke-width="2.5"/>
        <path d="M20.5 8a10.5 10.5 0 0 1 0 8" stroke-width="2.5"/>
      </svg>
    `,
    'abs-esp': (cls = 'w-9 h-9') => `
      <svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 6l2-2h6l2 2 2 3v5h-2v-1H7v1H5v-5l2-3z" fill="currentColor" fill-opacity="0.2"/>
        <circle cx="8" cy="13.5" r="1.5" fill="currentColor"/>
        <circle cx="16" cy="13.5" r="1.5" fill="currentColor"/>
        <path d="M7 16.5c-1.5 1-1.5 2 .5 3s2.5 2 .5 3" stroke-width="1.8"/>
        <path d="M17 16.5c-1.5 1-1.5 2 .5 3s2.5 2 .5 3" stroke-width="1.8"/>
      </svg>
    `,
    'glow-plug': (cls = 'w-9 h-9') => `
      <svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 16c0-3.5 2-6.5 5-6.5 2.2 0 4 1.5 4.5 4 .5-2.5 2.3-4 4.5-4 3 0 5 3 5 6.5"/>
        <path d="M3 16c0 1.5 1 2.5 2.5 2.5S8 17 8 15.5c0-3 2-5 4-5s4 2 4 5c0 1.5 1 2.5 2.5 2.5S21 17.5 21 16"/>
      </svg>
    `,
    'airbag-srs': (cls = 'w-9 h-9') => `
      <svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="7" cy="6" r="2.5" fill="currentColor" fill-opacity="0.2"/>
        <path d="M4 20v-4c0-2 1.5-3.5 3.5-3.5h1.5l2 3.5-1.5 4"/>
        <path d="M2.5 11v9h6.5"/>
        <circle cx="16" cy="11.5" r="4.8" fill="currentColor" fill-opacity="0.25" stroke-width="2"/>
        <line x1="13.5" y1="11.5" x2="18.5" y2="11.5" stroke-width="1.8"/>
        <line x1="16" y1="9" x2="16" y2="14" stroke-width="1.8"/>
      </svg>
    `
  };

  const DASHBOARD_LIGHTS = [
    {
      id: 'check-engine',
      title: 'Motor Arıza Lambası (Check Engine)',
      visualDesc: 'Sarı Motor Silüeti / Musluk Şeklinde Motor Bloğu',
      color: 'amber',
      severity: 'Sarı Uyarı (Servis Kontrolü)',
      canDrive: 'Düşük hızla en yakın servise gidilebilir. Yanıp sönüyorsa durdurun.',
      causes: 'Oksijen sensörü, ateşleme bobini, katalitik konvertör veya yakıt basıncı.',
      action: 'Araç tekliyor veya gaz yemiyorsa zorlamayın, en yakın yetkili servise gidin.'
    },
    {
      id: 'oil-pressure',
      title: 'Düşük Yağ Basıncı İkazı',
      visualDesc: 'Kırmızı Damlayan Yağdanlık / Lamba Simgesi',
      color: 'red',
      severity: 'Kırmızı Acil (Motor Hasarı Riski)',
      canDrive: 'KESİNLİKLE HAYIR! Motoru anında stop edin.',
      causes: 'Düşük motor yağı seviyesi, arızalı yağ pompası veya tıkalı yağ filtresi.',
      action: 'Güvenli yerde motoru durdurun, yağ çubuğundan seviyeyi kontrol edin. Yağ eklemeden çalıştırmayın.'
    },
    {
      id: 'coolant-temp',
      title: 'Hararet & Soğutma Suyu Sıcaklığı',
      visualDesc: 'Kırmızı Dalgalı Su ve Sıvı İçinde Termometre',
      color: 'red',
      severity: 'Kırmızı Acil (Conta Yakma Riski)',
      canDrive: 'HAYIR! Motor aşırı ısındı, silindir kapağı eğilebilir.',
      causes: 'Termostat kilitlenmesi, radyatör su kaçağı veya fan arızası.',
      action: 'Aracı sağa çekip kaloriferi en sıcağa getirin. Motor soğumadan radyatör kapağını asla açmayın!'
    },
    {
      id: 'battery-charge',
      title: 'Akü / Şarj Sistemi İkazı',
      visualDesc: 'Kırmızı (+) ve (-) Kutuplu Dikdörtgen Akü',
      color: 'red',
      severity: 'Kırmızı Acil (Alternatör)',
      canDrive: 'Araç aküdeki son elektrikle çalışıyor, kısa sürede stop eder.',
      causes: 'Şarj dinamosu (alternatör) arızası, kopuk V kayışı veya ömrü bitmiş akü.',
      action: 'Klima, radyo ve gereksiz ışıkları kapatıp hemen en yakın oto elektrikçiye sürün.'
    },
    {
      id: 'dpf-filter',
      title: 'Dizel Partikül Filtresi (DPF)',
      visualDesc: 'Sarı Noktalı Egzoz Filtresi Kutusu & Borular',
      color: 'amber',
      severity: 'Sarı Uyarı (Rejenerasyon)',
      canDrive: 'Evet, rejenerasyon sürüşü yapılması gerekiyor.',
      causes: 'Sürekli şehir içi kısa mesafe kullanımda kurum birikmesi.',
      action: 'Çevre yoluna çıkıp 2.500 - 3.000 devir bandında kesintisiz 20-25 dakika sürün.'
    },
    {
      id: 'tpms-tire',
      title: 'Lastik Basınç Uyarısı (TPMS)',
      visualDesc: 'Sarı At Nalı / Lastik Kesiti İçinde Ünlem (!)',
      color: 'amber',
      severity: 'Sarı Uyarı (Hava Kaybı)',
      canDrive: 'Düşük hızda en yakın benzinliğe kadar.',
      causes: 'Bir veya birden fazla tekerlekte basınç düşüşü veya çivi girmesi.',
      action: 'UluKontrol Bakım sekmesindeki fabrika kapı içi basınçlarına göre tekerlekleri şişirin ve TPMS sıfırlayın.'
    },
    {
      id: 'brake-system',
      title: 'Fren Sistemi / Hidrolik Seviyesi',
      visualDesc: 'Kırmızı Çember ve Yaylar Arasında Ünlem ( ! )',
      color: 'red',
      severity: 'Kırmızı Acil (Fren Kaybı Riski)',
      canDrive: 'El freni inikse KESİNLİKLE HAYIR! Fren hidroliği bitmiş olabilir.',
      causes: 'Fren hidroliği kritik seviyede azaldı, hortum patladı veya balata tamamen bitti.',
      action: 'Fren pedalının yumuşayıp batmadığını kontrol edin. Hidrolik haznesini kontrol edin, gerekirse çekici çağırın.'
    },
    {
      id: 'abs-esp',
      title: 'ABS & ESP Kayma Kontrolü',
      visualDesc: 'Sarı Kayan Araba ve Zikzak Tekerlek İzleri',
      color: 'amber',
      severity: 'Sarı Uyarı (Güvenlik Desteği)',
      canDrive: 'Evet, standart frenler tutar ancak ani frende tekerlek kilitlenebilir.',
      causes: 'Tekerlek devir sensörü kirlenmesi, ABS beyni veya sigortası.',
      action: 'Sert frenlerden ve ani manevralardan kaçınarak servise gösterin.'
    },
    {
      id: 'glow-plug',
      title: 'Kızdırma Bujisi (Dizel Isıtma)',
      visualDesc: 'Sarı Sarmal Yay / Helezon Rezistans Bobini',
      color: 'amber',
      severity: 'Sarı Uyarı (Ateşleme & Enjektör)',
      canDrive: 'Yanıp sönüyorsa motor koruma moduna geçebilir.',
      causes: 'Isıtma bujisi arızası veya enjektör / yakıt basınç sorunu.',
      action: 'Kontağı ilk açtığınızda sönmesini bekleyip marşa basın. Sürüşte sönmüyorsa servise başvurun.'
    },
    {
      id: 'airbag-srs',
      title: 'Hava Yastığı (Airbag / SRS)',
      visualDesc: 'Kırmızı Emniyet Kemerli Yolcu ve Önünde Şişen Balon',
      color: 'red',
      severity: 'Kırmızı Güvenlik Uyarısı',
      canDrive: 'Araç yürür ancak kaza anında hava yastıkları AÇILMAYABİLİR.',
      causes: 'Koltuk altı soket gevşemesi, direksiyon zembereği veya emniyet kemeri fişeği.',
      action: 'Özellikle koltuk altındaki sarı soketleri kontrol ettirin.'
    }
  ];

  // --- 2.10 SAHİBİNDEN İLAN METNİ OLUŞTURUCU ---
  function generateSahibindenAdText(v) {
    if (!v) return '';
    const exp = getVehicleExpertise(v);
    const summary = calculateExpertiseSummary(exp);
    const nextKm = v.lastServiceKm + v.serviceIntervalKm;

    let ekspertizText = '';
    if (summary.isHatasiz) {
      ekspertizText = `✅ EKSPERTİZ DURUMU:
• ARACIMIZ HATASIZ, BOYASIZ VE DEĞİŞENSİZDİR.
• ŞASİ, PODYE, DİREKLER VE AIRBAGLER FABRİKASYON ORİJİNALDİR.
• TRAMER HASAR KAYDI KESİNLİKLE YOKTUR (0 ₺).
• AĞIR HASAR / PERT KAYDI KESİNLİKLE YOKTUR.`;
    } else {
      const parts = exp.parts || {};
      const degisenler = [];
      const boyalilar = [];
      const lokaller = [];

      EXPERTISE_PARTS.forEach(p => {
        const s = parts[p.id];
        if (s === 'degisen') degisenler.push(p.label);
        else if (s === 'boyali') boyalilar.push(p.label);
        else if (s === 'lokal') lokaller.push(p.label);
      });

      ekspertizText = `🔍 EKSPERTİZ VE KAPORTA DURUMU:
• Değişen Parçalar: ${degisenler.length > 0 ? degisenler.join(', ') : 'YOK'}
• Boyalı Parçalar: ${boyalilar.length > 0 ? boyalilar.join(', ') : 'YOK'}
• Lokal Boyalı: ${lokaller.length > 0 ? lokaller.join(', ') : 'YOK'}
• Şasi / Podye / Direk / Airbag: ${exp.sasiPodyeAirbag === 'islemli' ? 'İşlemli' : 'ORİJİNAL (Kazasız, Fabrikasyon)'}
• Tramer Hasar Kaydı: ${exp.tramerAmount > 0 ? `${exp.tramerAmount.toLocaleString('tr-TR')} ₺` : 'YOK (0 ₺)'}
• Ağır Hasar / Pert Kaydı: ${exp.heavyDamage ? 'AĞIR HASAR KAYITLIDIR' : 'KESİNLİKLE YOKTUR'}`;
    }

    return `Sahibinden ${v.year} Model ${v.brand} ${v.model} ${v.enginePackage}

🚗 GENEL ARAÇ BİLGİLERİ:
• Model Yılı: ${v.year}
• Güncel Kilometre: ${v.currentKm.toLocaleString('tr-TR')} KM (Orijinal)
• Yakıt Tipi: ${v.fuel}
• Vites Tipi: ${v.transmission}
• Plaka: ${v.plate}

🛠️ BAKIM VE TEKNİK DURUM:
• Tüm periyodik bakımları zamanında eksiksiz yapılmıştır.
• Son bakım ${v.lastServiceKm.toLocaleString('tr-TR')} KM'de yapılmış olup sonraki bakıma ${Math.max(0, nextKm - v.currentKm).toLocaleString('tr-TR')} KM vardır.
• Motoru, şanzımanı, yürüyen aksamı kusursuz durumdadır; yağ yakma, duman atma veya üfleme yoktur.
• Lastikler: ${v.tires?.season || '4 Mevsim'} (${v.tires?.size || 'Orijinal Ebat'}), diş derinliği %${v.tires?.lifePercentage || 85} seviyesindedir.
${v.inspectionDate ? `• TÜVTÜRK Muayene Geçerlilik Tarihi: ${v.inspectionDate}` : ''}

${ekspertizText}

💡 EKSTRA AÇIKLAMA:
• Aracın yedek anahtarı ve kitapçıkları mevcuttur.
• İç döşemelerinde yanık, yırtık veya deformasyon bulunmamaktadır.
• Dilediğiniz yetkili servise veya kurumsal ekspertiz merkezine gösterebilirsiniz.
• Ciddi alıcılarla araç başında cüzi miktarda pazarlık payı vardır. Alıcısına şimdiden hayırlı olsun.`;
  }

  function formatRemainingDays(dateStr) {
    if (!dateStr) return { text: 'Tarih Belirtilmedi', status: 'empty', days: null, dateFormatted: '' };
    try {
      const parts = dateStr.split('-');
      if (parts.length !== 3) return { text: dateStr, status: 'unknown', days: null, dateFormatted: dateStr };
      const target = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const diffTime = target - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const formattedDate = target.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

      if (diffDays < 0) {
        return { text: `Süresi ${Math.abs(diffDays)} gün önce bitti! (${formattedDate})`, status: 'expired', days: diffDays, dateFormatted: formattedDate };
      } else if (diffDays === 0) {
        return { text: `Bugün son gün! (${formattedDate})`, status: 'warning', days: 0, dateFormatted: formattedDate };
      } else if (diffDays <= 30) {
        return { text: `${diffDays} gün kaldı (${formattedDate})`, status: 'warning', days: diffDays, dateFormatted: formattedDate };
      } else {
        return { text: `${diffDays} gün kaldı (${formattedDate})`, status: 'good', days: diffDays, dateFormatted: formattedDate };
      }
    } catch (e) {
      return { text: dateStr, status: 'unknown', days: null, dateFormatted: dateStr };
    }
  }

  // --- 2.8 FABRİKA ORİJİNAL LASTİK EBATLARI VE ETİKET BASINÇ VERİTABANI ---
  function getVehicleTireSpecs(brandId, modelName, enginePackage) {
    const brand = (brandId || '').toLowerCase();
    const model = (modelName || '').toLowerCase();
    const engine = (enginePackage || '').toLowerCase();

    // 1. RENAULT
    if (brand.includes('renault')) {
      if (model.includes('clio')) {
        const isIconOrHigh = engine.includes('icon') || engine.includes('rs line') || engine.includes('esprit alpine') || engine.includes('edc');
        return {
          defaultSize: isIconOrHigh ? '195/55 R16 87H' : '185/65 R15 88H',
          normalPressures: { fl: 32, fr: 32, rl: 29, rr: 29 },
          loadedPressures: { fl: 35, fr: 35, rl: 32, rr: 32 },
          pressureBasis: 'Sürücü kapısı iç B-sütunundaki Renault orijinal fabrika etiketine göredir.',
          approvedSizes: [
            {
              size: '185/65 R15 88H',
              trim: '15" Joy / Touch Standart',
              normalFront: 32,
              normalRear: 29,
              loadedFront: 35,
              loadedRear: 32,
              barNormal: '2.2 / 2.0 Bar',
              recommended: !isIconOrHigh
            },
            {
              size: '195/55 R16 87H',
              trim: '16" Icon / Touch Opsiyon',
              normalFront: 32,
              normalRear: 29,
              loadedFront: 35,
              loadedRear: 32,
              barNormal: '2.2 / 2.0 Bar',
              recommended: isIconOrHigh
            },
            {
              size: '205/45 R17 88V',
              trim: '17" RS Line / GT Line',
              normalFront: 33,
              normalRear: 30,
              loadedFront: 36,
              loadedRear: 33,
              barNormal: '2.3 / 2.1 Bar',
              recommended: false
            }
          ]
        };
      }
      if (model.includes('megane') || model.includes('fluence')) {
        return {
          defaultSize: '205/55 R16 91V',
          normalPressures: { fl: 34, fr: 34, rl: 30, rr: 30 },
          loadedPressures: { fl: 36, fr: 36, rl: 33, rr: 33 },
          pressureBasis: 'Sürücü kapı içi B-sütunundaki Renault fabrika etiketine göredir.',
          approvedSizes: [
            { size: '205/55 R16 91V', trim: '16" Joy / Touch Standart', normalFront: 34, normalRear: 30, loadedFront: 36, loadedRear: 33, barNormal: '2.3 / 2.1 Bar', recommended: true },
            { size: '205/50 R17 93V', trim: '17" Icon / EDC', normalFront: 34, normalRear: 31, loadedFront: 36, loadedRear: 34, barNormal: '2.3 / 2.1 Bar', recommended: false },
            { size: '225/40 R18 92W', trim: '18" GT Line Sport', normalFront: 35, normalRear: 32, loadedFront: 38, loadedRear: 35, barNormal: '2.4 / 2.2 Bar', recommended: false }
          ]
        };
      }
      if (model.includes('captur') || model.includes('austral') || model.includes('kadjar')) {
        return {
          defaultSize: '215/60 R17 96H',
          normalPressures: { fl: 33, fr: 33, rl: 30, rr: 30 },
          loadedPressures: { fl: 36, fr: 36, rl: 33, rr: 33 },
          pressureBasis: 'Sürücü kapı eşiğindeki Renault fabrika etiketine göredir.',
          approvedSizes: [
            { size: '215/60 R17 96H', trim: '17" Touch / Techno Standart', normalFront: 33, normalRear: 30, loadedFront: 36, loadedRear: 33, barNormal: '2.3 / 2.1 Bar', recommended: true },
            { size: '215/55 R18 95V', trim: '18" Icon / Esprit Alpine', normalFront: 34, normalRear: 31, loadedFront: 36, loadedRear: 34, barNormal: '2.3 / 2.1 Bar', recommended: false }
          ]
        };
      }
      if (model.includes('kangoo')) {
        return {
          defaultSize: '195/65 R15 95T XL',
          normalPressures: { fl: 36, fr: 36, rl: 39, rr: 39 },
          loadedPressures: { fl: 38, fr: 38, rl: 44, rr: 44 },
          pressureBasis: 'Sürücü kapısı iç direğindeki Renault hafif ticari yük etiketine göredir.',
          approvedSizes: [
            { size: '195/65 R15 95T XL', trim: '15" Güçlendirilmiş (XL) Standart', normalFront: 36, normalRear: 39, loadedFront: 38, loadedRear: 44, barNormal: '2.5 / 2.7 Bar', recommended: true },
            { size: '205/60 R16 96H XL', trim: '16" Touch / Maxi Combi', normalFront: 36, normalRear: 39, loadedFront: 38, loadedRear: 44, barNormal: '2.5 / 2.7 Bar', recommended: false }
          ]
        };
      }
    }

    // 2. FIAT
    if (brand.includes('fiat')) {
      if (model.includes('egea')) {
        const isCross = model.includes('cross') || engine.includes('cross');
        return {
          defaultSize: isCross ? '215/55 R17 94V' : '205/55 R16 91V',
          normalPressures: { fl: 33, fr: 33, rl: 30, rr: 30 },
          loadedPressures: { fl: 36, fr: 36, rl: 33, rr: 33 },
          pressureBasis: 'Sürücü kapı içi B-sütunundaki Fiat üretici etiketine göredir.',
          approvedSizes: [
            { size: '195/65 R15 91H', trim: '15" Easy Standart', normalFront: 32, normalRear: 30, loadedFront: 35, loadedRear: 32, barNormal: '2.2 / 2.1 Bar', recommended: false },
            { size: '205/55 R16 91V', trim: '16" Urban / Lounge', normalFront: 33, normalRear: 30, loadedFront: 36, loadedRear: 33, barNormal: '2.3 / 2.1 Bar', recommended: !isCross },
            { size: '215/55 R17 94V', trim: '17" Lounge / Egea Cross', normalFront: 33, normalRear: 31, loadedFront: 36, loadedRear: 33, barNormal: '2.3 / 2.1 Bar', recommended: isCross }
          ]
        };
      }
      if (model.includes('doblo')) {
        return {
          defaultSize: '195/65 R15 95T XL',
          normalPressures: { fl: 36, fr: 36, rl: 41, rr: 41 },
          loadedPressures: { fl: 38, fr: 38, rl: 44, rr: 44 },
          pressureBasis: 'Sürücü kapı direğindeki Fiat Professional yük etiketine göredir.',
          approvedSizes: [
            { size: '195/65 R15 95T XL', trim: '15" Easy / Safeline XL', normalFront: 36, normalRear: 41, loadedFront: 38, loadedRear: 44, barNormal: '2.5 / 2.8 Bar', recommended: true },
            { size: '205/60 R16 96H XL', trim: '16" Premio / Trekking', normalFront: 36, normalRear: 41, loadedFront: 38, loadedRear: 44, barNormal: '2.5 / 2.8 Bar', recommended: false }
          ]
        };
      }
      if (model.includes('fiorino')) {
        return {
          defaultSize: '185/65 R15 88T',
          normalPressures: { fl: 32, fr: 32, rl: 34, rr: 34 },
          loadedPressures: { fl: 35, fr: 35, rl: 38, rr: 38 },
          pressureBasis: 'Sürücü kapı içi Fiat etiketine göredir.',
          approvedSizes: [
            { size: '185/65 R15 88T', trim: '15" Pop / Safeline', normalFront: 32, normalRear: 34, loadedFront: 35, loadedRear: 38, barNormal: '2.2 / 2.3 Bar', recommended: true },
            { size: '195/55 R16 87H', trim: '16" Premio', normalFront: 33, normalRear: 35, loadedFront: 36, loadedRear: 39, barNormal: '2.3 / 2.4 Bar', recommended: false }
          ]
        };
      }
    }

    // 3. VOLKSWAGEN
    if (brand.includes('volkswagen') || brand.includes('vw')) {
      if (model.includes('golf')) {
        return {
          defaultSize: '205/55 R16 91V',
          normalPressures: { fl: 33, fr: 33, rl: 30, rr: 30 },
          loadedPressures: { fl: 36, fr: 36, rl: 34, rr: 34 },
          pressureBasis: 'Sürücü kapı içi ve yakıt kapağındaki Volkswagen fabrika etiketine göredir.',
          approvedSizes: [
            { size: '205/55 R16 91V', trim: '16" Life Standart', normalFront: 33, normalRear: 30, loadedFront: 36, loadedRear: 34, barNormal: '2.3 / 2.1 Bar', recommended: true },
            { size: '225/45 R17 91W', trim: '17" Style', normalFront: 33, normalRear: 30, loadedFront: 36, loadedRear: 34, barNormal: '2.3 / 2.1 Bar', recommended: false },
            { size: '225/40 R18 92Y', trim: '18" R-Line', normalFront: 34, normalRear: 31, loadedFront: 38, loadedRear: 35, barNormal: '2.3 / 2.1 Bar', recommended: false }
          ]
        };
      }
      if (model.includes('polo')) {
        return {
          defaultSize: '185/65 R15 88H',
          normalPressures: { fl: 32, fr: 32, rl: 29, rr: 29 },
          loadedPressures: { fl: 35, fr: 35, rl: 32, rr: 32 },
          pressureBasis: 'Sürücü kapı içi B-sütunundaki VW fabrika etiketine göredir.',
          approvedSizes: [
            { size: '185/65 R15 88H', trim: '15" Impression / Life', normalFront: 32, normalRear: 29, loadedFront: 35, loadedRear: 32, barNormal: '2.2 / 2.0 Bar', recommended: true },
            { size: '195/55 R16 91V', trim: '16" Style', normalFront: 32, normalRear: 29, loadedFront: 35, loadedRear: 32, barNormal: '2.2 / 2.0 Bar', recommended: false }
          ]
        };
      }
      if (model.includes('passat')) {
        return {
          defaultSize: '215/55 R17 94W',
          normalPressures: { fl: 34, fr: 34, rl: 32, rr: 32 },
          loadedPressures: { fl: 37, fr: 37, rl: 36, rr: 36 },
          pressureBasis: 'Sürücü kapısı B-sütunu ve depo kapağı içi VW etiketine göredir.',
          approvedSizes: [
            { size: '215/55 R17 94W', trim: '17" Business / Elegance', normalFront: 34, normalRear: 32, loadedFront: 37, loadedRear: 36, barNormal: '2.3 / 2.2 Bar', recommended: true },
            { size: '235/45 R18 94W', trim: '18" R-Line', normalFront: 35, normalRear: 33, loadedFront: 38, loadedRear: 37, barNormal: '2.4 / 2.3 Bar', recommended: false }
          ]
        };
      }
      if (model.includes('caddy')) {
        return {
          defaultSize: '205/60 R16 96H XL',
          normalPressures: { fl: 36, fr: 36, rl: 39, rr: 39 },
          loadedPressures: { fl: 38, fr: 38, rl: 44, rr: 44 },
          pressureBasis: 'Sürücü kapısı iç direğindeki VW Ticari yük etiketine göredir.',
          approvedSizes: [
            { size: '205/60 R16 96H XL', trim: '16" Maxi / Combi Standart', normalFront: 36, normalRear: 39, loadedFront: 38, loadedRear: 44, barNormal: '2.5 / 2.7 Bar', recommended: true },
            { size: '215/55 R17 98H XL', trim: '17" Life / Style', normalFront: 36, normalRear: 39, loadedFront: 38, loadedRear: 44, barNormal: '2.5 / 2.7 Bar', recommended: false }
          ]
        };
      }
    }

    // 4. TOYOTA
    if (brand.includes('toyota')) {
      if (model.includes('corolla')) {
        return {
          defaultSize: '205/55 R16 91V',
          normalPressures: { fl: 33, fr: 33, rl: 30, rr: 30 },
          loadedPressures: { fl: 36, fr: 36, rl: 33, rr: 33 },
          pressureBasis: 'Sürücü kapı içi B-sütunundaki Toyota OEM etiketine göredir.',
          approvedSizes: [
            { size: '195/65 R15 91H', trim: '15" Vision Standart', normalFront: 32, normalRear: 30, loadedFront: 35, loadedRear: 32, barNormal: '2.2 / 2.1 Bar', recommended: false },
            { size: '205/55 R16 91V', trim: '16" Dream / Flame', normalFront: 33, normalRear: 30, loadedFront: 36, loadedRear: 33, barNormal: '2.3 / 2.1 Bar', recommended: true },
            { size: '225/45 R17 91W', trim: '17" Passion X-Pack', normalFront: 33, normalRear: 31, loadedFront: 36, loadedRear: 34, barNormal: '2.3 / 2.1 Bar', recommended: false }
          ]
        };
      }
      if (model.includes('yaris')) {
        return {
          defaultSize: '185/65 R15 88H',
          normalPressures: { fl: 32, fr: 32, rl: 29, rr: 29 },
          loadedPressures: { fl: 35, fr: 35, rl: 32, rr: 32 },
          pressureBasis: 'Sürücü kapı içi B-sütunundaki Toyota etiketine göredir.',
          approvedSizes: [
            { size: '185/65 R15 88H', trim: '15" Dream Standart', normalFront: 32, normalRear: 29, loadedFront: 35, loadedRear: 32, barNormal: '2.2 / 2.0 Bar', recommended: true },
            { size: '195/50 R16 88V', trim: '16" Flame / Passion', normalFront: 33, normalRear: 30, loadedFront: 36, loadedRear: 33, barNormal: '2.3 / 2.1 Bar', recommended: false }
          ]
        };
      }
    }

    // 5. FORD
    if (brand.includes('ford')) {
      if (model.includes('focus')) {
        return {
          defaultSize: '205/60 R16 92V',
          normalPressures: { fl: 33, fr: 33, rl: 31, rr: 31 },
          loadedPressures: { fl: 36, fr: 36, rl: 34, rr: 34 },
          pressureBasis: 'Sürücü kapı içi direğindeki Ford fabrika etiketine göredir.',
          approvedSizes: [
            { size: '205/60 R16 92V', trim: '16" Trend X / Titanium', normalFront: 33, normalRear: 31, loadedFront: 36, loadedRear: 34, barNormal: '2.3 / 2.1 Bar', recommended: true },
            { size: '215/50 R17 95W', trim: '17" ST-Line', normalFront: 34, normalRear: 32, loadedFront: 37, loadedRear: 35, barNormal: '2.3 / 2.2 Bar', recommended: false }
          ]
        };
      }
      if (model.includes('courier')) {
        return {
          defaultSize: '195/60 R15 88H',
          normalPressures: { fl: 35, fr: 35, rl: 38, rr: 38 },
          loadedPressures: { fl: 37, fr: 37, rl: 42, rr: 42 },
          pressureBasis: 'Sürücü kapı içi Ford ticari etiketine göredir.',
          approvedSizes: [
            { size: '195/60 R15 88H', trim: '15" Trend Standart', normalFront: 35, normalRear: 38, loadedFront: 37, loadedRear: 42, barNormal: '2.4 / 2.6 Bar', recommended: true },
            { size: '205/60 R16 92H', trim: '16" Titanium / Blackline', normalFront: 35, normalRear: 38, loadedFront: 37, loadedRear: 42, barNormal: '2.4 / 2.6 Bar', recommended: false }
          ]
        };
      }
    }

    // 6. DACIA
    if (brand.includes('dacia')) {
      if (model.includes('duster')) {
        return {
          defaultSize: '215/65 R16 98H',
          normalPressures: { fl: 32, fr: 32, rl: 32, rr: 32 },
          loadedPressures: { fl: 35, fr: 35, rl: 35, rr: 35 },
          pressureBasis: 'Sürücü kapı içi direğindeki Dacia fabrika etiketine göredir.',
          approvedSizes: [
            { size: '215/65 R16 98H', trim: '16" Comfort / Essential', normalFront: 32, normalRear: 32, loadedFront: 35, loadedRear: 35, barNormal: '2.2 / 2.2 Bar', recommended: true },
            { size: '215/60 R17 96H', trim: '17" Prestige / Journey', normalFront: 33, normalRear: 33, loadedFront: 36, loadedRear: 36, barNormal: '2.3 / 2.3 Bar', recommended: false }
          ]
        };
      }
      if (model.includes('sandero')) {
        return {
          defaultSize: '185/65 R15 88T',
          normalPressures: { fl: 32, fr: 32, rl: 29, rr: 29 },
          loadedPressures: { fl: 35, fr: 35, rl: 32, rr: 32 },
          pressureBasis: 'Sürücü kapı içi B-sütunu Dacia etiketine göredir.',
          approvedSizes: [
            { size: '185/65 R15 88T', trim: '15" Standart Hatchback', normalFront: 32, normalRear: 29, loadedFront: 35, loadedRear: 32, barNormal: '2.2 / 2.0 Bar', recommended: true },
            { size: '205/60 R16 92H', trim: '16" Stepway Crossover', normalFront: 32, normalRear: 30, loadedFront: 35, loadedRear: 33, barNormal: '2.2 / 2.1 Bar', recommended: false }
          ]
        };
      }
    }

    // 8. TOGG
    if (brand.includes('togg')) {
      return {
        defaultSize: '235/50 R19 99V',
        normalPressures: { fl: 38, fr: 38, rl: 38, rr: 38 },
        loadedPressures: { fl: 41, fr: 41, rl: 41, rr: 41 },
        pressureBasis: 'Sürücü kapı içi B-sütunundaki Togg orijinal fabrika etiketine göredir.',
        approvedSizes: [
          { size: '235/50 R19 99V', trim: '19" V1 / V2 Standart OEM', normalFront: 38, normalRear: 38, loadedFront: 41, loadedRear: 41, barNormal: '2.6 / 2.6 Bar', recommended: true },
          { size: '255/45 R20 101V', trim: '20" V2 Launch Elmas Kesim Opsiyon', normalFront: 39, normalRear: 39, loadedFront: 42, loadedRear: 42, barNormal: '2.7 / 2.7 Bar', recommended: false }
        ]
      };
    }

    // 9. TESLA
    if (brand.includes('tesla')) {
      const isModelY = model.includes('model y');
      return {
        defaultSize: isModelY ? '255/45 R19 104W' : '235/45 R18 98Y',
        normalPressures: { fl: 42, fr: 42, rl: 42, rr: 42 },
        loadedPressures: { fl: 42, fr: 42, rl: 42, rr: 42 },
        pressureBasis: 'Sürücü kapı içi Tesla orijinal soğuk lastik etiketine göredir (42 PSI).',
        approvedSizes: isModelY ? [
          { size: '255/45 R19 104W', trim: '19" Gemini Standart OEM', normalFront: 42, normalRear: 42, loadedFront: 42, loadedRear: 42, barNormal: '2.9 / 2.9 Bar', recommended: true },
          { size: '255/40 R20 101W', trim: '20" Induction Opsiyon', normalFront: 42, normalRear: 42, loadedFront: 42, loadedRear: 42, barNormal: '2.9 / 2.9 Bar', recommended: false },
          { size: '255/35 R21 98W', trim: '21" Überturbine Performance', normalFront: 42, normalRear: 42, loadedFront: 42, loadedRear: 42, barNormal: '2.9 / 2.9 Bar', recommended: false }
        ] : [
          { size: '235/45 R18 98Y', trim: '18" Photon Standart OEM', normalFront: 42, normalRear: 42, loadedFront: 42, loadedRear: 42, barNormal: '2.9 / 2.9 Bar', recommended: true },
          { size: '235/40 R19 96W', trim: '19" Nova Opsiyon', normalFront: 42, normalRear: 42, loadedFront: 42, loadedRear: 42, barNormal: '2.9 / 2.9 Bar', recommended: false }
        ]
      };
    }

    // 10. BYD
    if (brand.includes('byd')) {
      return {
        defaultSize: model.includes('seal') ? '235/45 R19 96W' : '235/50 R18 97V',
        normalPressures: { fl: 36, fr: 36, rl: 36, rr: 36 },
        loadedPressures: { fl: 38, fr: 38, rl: 38, rr: 38 },
        pressureBasis: 'Sürücü kapı içi BYD orijinal fabrika etiketine göredir.',
        approvedSizes: [
          { size: '235/50 R18 97V', trim: '18" Standart Blade OEM', normalFront: 36, normalRear: 36, loadedFront: 38, loadedRear: 38, barNormal: '2.5 / 2.5 Bar', recommended: true },
          { size: '235/45 R19 96W', trim: '19" Design Opsiyon', normalFront: 36, normalRear: 36, loadedFront: 38, loadedRear: 38, barNormal: '2.5 / 2.5 Bar', recommended: false }
        ]
      };
    }

    // Segment Bazlı Genel Standartlar
    const isB = ['clio', 'i20', 'corsa', 'polo', 'fiesta', 'yaris', '208', 'c3', 'micra', 'rio', 'ibiza', 'swift', 'sandero', 'symbol'].some(m => model.includes(m));
    if (isB) {
      return {
        defaultSize: '185/65 R15 88H',
        normalPressures: { fl: 32, fr: 32, rl: 29, rr: 29 },
        loadedPressures: { fl: 35, fr: 35, rl: 32, rr: 32 },
        pressureBasis: 'Sürücü kapı içi B-sütunu üretici etiketine göredir.',
        approvedSizes: [
          { size: '185/65 R15 88H', trim: '15" Standart Jant', normalFront: 32, normalRear: 29, loadedFront: 35, loadedRear: 32, barNormal: '2.2 / 2.0 Bar', recommended: true },
          { size: '195/55 R16 87H', trim: '16" Opsiyonel Jant', normalFront: 32, normalRear: 29, loadedFront: 35, loadedRear: 32, barNormal: '2.2 / 2.0 Bar', recommended: false }
        ]
      };
    }

    const isSUV = ['duster', 'captur', 't-roc', 'taigo', 'puma', 'bayon', 'kona', '2008', 'mokka', 'kamiq', 'arona', 'stonic', 'juke', 'crossland', 'egea cross', 'austral', 'tiguan', 'kuga', 'tucson', 'sportage', '3008', '408', 'corolla cross', 'c-hr', 'karoq', 'ateca', 'qashqai'].some(m => model.includes(m));
    if (isSUV) {
      return {
        defaultSize: '215/60 R17 96H',
        normalPressures: { fl: 33, fr: 33, rl: 31, rr: 31 },
        loadedPressures: { fl: 36, fr: 36, rl: 34, rr: 34 },
        pressureBasis: 'Sürücü kapı içi üretici etiketine göredir.',
        approvedSizes: [
          { size: '215/65 R16 98H', trim: '16" Taban Standart', normalFront: 33, normalRear: 31, loadedFront: 36, loadedRear: 34, barNormal: '2.3 / 2.1 Bar', recommended: false },
          { size: '215/60 R17 96H', trim: '17" Şehir SUV', normalFront: 33, normalRear: 31, loadedFront: 36, loadedRear: 34, barNormal: '2.3 / 2.1 Bar', recommended: true },
          { size: '225/55 R18 98V', trim: '18" Premium / Sport', normalFront: 34, normalRear: 32, loadedFront: 37, loadedRear: 35, barNormal: '2.3 / 2.2 Bar', recommended: false }
        ]
      };
    }

    // C Segment ve Diğerleri
    return {
      defaultSize: '205/55 R16 91V',
      normalPressures: { fl: 33, fr: 33, rl: 30, rr: 30 },
      loadedPressures: { fl: 36, fr: 36, rl: 33, rr: 33 },
      pressureBasis: 'Sürücü kapı içi B-sütunu üretici etiketine göredir.',
      approvedSizes: [
        { size: '195/65 R15 91H', trim: '15" Standart', normalFront: 32, normalRear: 30, loadedFront: 35, loadedRear: 32, barNormal: '2.2 / 2.1 Bar', recommended: false },
        { size: '205/55 R16 91V', trim: '16" Önerilen Fabrika Ebadı', normalFront: 33, normalRear: 30, loadedFront: 36, loadedRear: 33, barNormal: '2.3 / 2.1 Bar', recommended: true },
        { size: '225/45 R17 91W', trim: '17" Sport / Alaşım', normalFront: 33, normalRear: 31, loadedFront: 36, loadedRear: 34, barNormal: '2.3 / 2.1 Bar', recommended: false }
      ]
    };
  }

  // --- 3. STATE YÖNETİMİ & TEMA ---
  function applyTheme(t) {
    const isDark = (t === 'dark');
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }

  class Store {
    constructor() {
      this.listeners = new Set();
      this.state = this.loadInitialState();
      applyTheme(this.state.theme);
    }

    loadInitialState() {
      try {
        const savedUser = localStorage.getItem('ulukontrol_user_v3');
        const savedVehicles = localStorage.getItem('ulukontrol_vehicles_v3');
        const savedActive = localStorage.getItem('ulukontrol_active_vehicle_v3');
        const savedTab = localStorage.getItem('ulukontrol_active_tab_v3');
        const savedTheme = localStorage.getItem('ulukontrol_theme_v3') || 'light';

        const user = savedUser ? JSON.parse(savedUser) : INITIAL_USER;
        
        let vehicles = [];
        if (savedVehicles) {
          try {
            const parsed = JSON.parse(savedVehicles);
            if (Array.isArray(parsed)) {
              vehicles = parsed.filter(v => v.plate !== '34 ULU 61' && !v.enginePackage?.toLowerCase().includes('standart paket') && !v.enginePackage?.toLowerCase().includes('standart motor'));
              
              // Eski otomatik uydurulan tarihleri temizle, piyasa değerini gerçekçi 2026 pazar fiyatına güncelle ve lastik ebatlarını OEM standartlarına ata
              vehicles.forEach(v => {
                if (v.inspectionDate === '2028-06-15' || v.inspectionDate?.startsWith('2028-06')) {
                  v.inspectionDate = null;
                }
                if (v.insuranceDate === '2026-12-10') {
                  v.insuranceDate = null;
                }
                getVehicleExpertise(v);
                if (!v.isCustomMarketValue) {
                  const authentic = calculateAuthenticMarketValue(v.brandId, v.model, v.year, v.currentKm, v.enginePackage);
                  const expSummary = calculateExpertiseSummary(v.expertise);
                  const adjVal = Math.round(authentic.average * (1 - expSummary.penaltyRate) / 5000) * 5000;
                  v.marketValue = adjVal;
                  v.marketMin = Math.round(adjVal * 0.94 / 5000) * 5000;
                  v.marketMax = Math.round(adjVal * 1.06 / 5000) * 5000;
                  v.marketTrend = authentic.trend;
                }
                const tireSpecs = getVehicleTireSpecs(v.brandId, v.model, v.enginePackage);
                if (!v.tires || v.tires.size === 'Fabrika Ebadı' || !v.tires.size || v.tires.size.includes('Fabrika')) {
                  v.tires = {
                    brand: 'Michelin / Orijinal OEM',
                    size: tireSpecs.defaultSize,
                    season: v.tires?.season || '4 Mevsim',
                    treadDepthMm: v.tires?.treadDepthMm || 6.8,
                    lifePercentage: v.tires?.lifePercentage || 85,
                    pressures: { ...tireSpecs.normalPressures }
                  };
                }
              });
            }
          } catch (e) {
            vehicles = [];
          }
        }

        const activeVehicleId = savedActive || (vehicles.length > 0 ? vehicles[0].id : null);
        const activeTab = savedTab || 'garajim';

        return {
          user,
          isAuthenticated: true,
          vehicles,
          activeVehicleId,
          activeTab,
          theme: savedTheme,
          cloudConfig: { provider: 'supabase', isConnected: true, lastSyncTime: 'Canlı Eşitlendi' },
          isKmModalOpen: false,
          isAddVehicleModalOpen: false,
          isDatesModalOpen: false,
          isTireModalOpen: false,
          isExpertiseModalOpen: false,
          isFuelModalOpen: false,
          isAdModalOpen: false,
          isLightsModalOpen: false,
          isEmergencyModalOpen: false,
          isPwaModalOpen: false,
          toast: null
        };
      } catch (e) {
        return {
          user: INITIAL_USER,
          isAuthenticated: true,
          vehicles: [],
          activeVehicleId: null,
          activeTab: 'garajim',
          theme: 'light',
          cloudConfig: { provider: 'supabase', isConnected: true, lastSyncTime: 'Canlı Eşitlendi' },
          isKmModalOpen: false,
          isAddVehicleModalOpen: false,
          isDatesModalOpen: false,
          isTireModalOpen: false,
          isExpertiseModalOpen: false,
          isFuelModalOpen: false,
          isAdModalOpen: false,
          isLightsModalOpen: false,
          isEmergencyModalOpen: false,
          isPwaModalOpen: false,
          toast: null
        };
      }
    }

    saveState() {
      try {
        localStorage.setItem('ulukontrol_user_v3', JSON.stringify(this.state.user));
        localStorage.setItem('ulukontrol_vehicles_v3', JSON.stringify(this.state.vehicles));
        localStorage.setItem('ulukontrol_active_vehicle_v3', this.state.activeVehicleId || '');
        localStorage.setItem('ulukontrol_active_tab_v3', this.state.activeTab);
        localStorage.setItem('ulukontrol_theme_v3', this.state.theme || 'light');
      } catch (e) {}
    }

    setTheme(theme) {
      const validTheme = theme === 'dark' ? 'dark' : 'light';
      this.state.theme = validTheme;
      applyTheme(validTheme);
      this.saveState();
      this.showToast(validTheme === 'dark' ? 'Karanlık (Kokpit) moduna geçildi 🌙' : 'Aydınlık (Gündüz) moduna geçildi ☀️', 'info', 1800);
      this.notify();
    }

    toggleTheme() {
      const nextTheme = this.state.theme === 'dark' ? 'light' : 'dark';
      this.setTheme(nextTheme);
    }

    subscribe(listener) {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    }

    notify() {
      this.saveState();
      this.listeners.forEach(fn => fn(this.state));
    }

    getState() { return this.state; }

    getActiveVehicle() {
      const { vehicles, activeVehicleId } = this.state;
      if (!vehicles || vehicles.length === 0) return null;
      return vehicles.find(v => v.id === activeVehicleId) || vehicles[0];
    }

    showToast(message, type = 'info', duration = 3200) {
      this.state.toast = { message, type, id: Date.now() };
      this.notify();
      setTimeout(() => {
        if (this.state.toast && Date.now() - this.state.toast.id >= duration - 100) {
          this.state.toast = null;
          this.notify();
        }
      }, duration);
    }

    setActiveTab(tab) {
      this.state.activeTab = tab;
      this.notify();
    }

    setKmModalOpen(isOpen) {
      this.state.isKmModalOpen = isOpen;
      this.notify();
    }

    setAddVehicleModalOpen(isOpen) {
      this.state.isAddVehicleModalOpen = isOpen;
      if (isOpen && typeof resetWizardState === 'function') {
        resetWizardState();
      }
      this.notify();
    }

    setPwaModalOpen(isOpen) {
      this.state.isPwaModalOpen = isOpen;
      this.notify();
    }

    setActiveVehicle(id) {
      this.state.activeVehicleId = id;
      this.notify();
    }

    deleteVehicle(id) {
      this.state.vehicles = this.state.vehicles.filter(v => v.id !== id);
      if (this.state.activeVehicleId === id) {
        this.state.activeVehicleId = this.state.vehicles.length > 0 ? this.state.vehicles[0].id : null;
      }
      this.showToast('Araç garajınızdan kaldırıldı.', 'info');
      this.notify();
    }

    clearAllVehicles() {
      this.state.vehicles = [];
      this.state.activeVehicleId = null;
      localStorage.removeItem('ulukontrol_vehicles_v3');
      localStorage.removeItem('ulukontrol_active_vehicle_v3');
      this.showToast('Garaj tamamen temizlendi. Sıfırdan araç ekleyebilirsiniz.', 'success');
      this.notify();
    }

    setDatesModalOpen(isOpen) {
      this.state.isDatesModalOpen = isOpen;
      this.notify();
    }

    updateVehicleDatesAndValuation(vehicleId, data) {
      const v = this.state.vehicles.find(item => item.id === vehicleId);
      if (!v) return;

      if (data.inspectionDate !== undefined) v.inspectionDate = data.inspectionDate || null;
      if (data.insuranceDate !== undefined) v.insuranceDate = data.insuranceDate || null;
      if (data.marketValue !== undefined && !isNaN(data.marketValue)) {
        v.marketValue = data.marketValue;
        v.isCustomMarketValue = true;
      }
      this.saveState();
      this.state.isDatesModalOpen = false;
      this.showToast('Muayene, sigorta ve piyasa bilgileri güncellendi! ✅', 'success');
      this.notify();
    }

    setTireModalOpen(isOpen) {
      this.state.isTireModalOpen = isOpen;
      this.notify();
    }

    updateVehicleTires(vehicleId, data) {
      const v = this.state.vehicles.find(item => item.id === vehicleId);
      if (!v) return;
      if (!v.tires) v.tires = {};
      if (data.size) v.tires.size = data.size;
      if (data.season) v.tires.season = data.season;
      if (data.brand) v.tires.brand = data.brand;
      if (data.treadDepthMm !== undefined) v.tires.treadDepthMm = parseFloat(data.treadDepthMm) || 6.8;
      if (data.pressures) {
        v.tires.pressures = { ...v.tires.pressures, ...data.pressures };
      }
      this.saveState();
      this.state.isTireModalOpen = false;
      this.showToast(`Lastik ve basınç bilgileri güncellendi! ✅`, 'success');
      this.notify();
    }

    setExpertiseModalOpen(isOpen) {
      this.state.isExpertiseModalOpen = isOpen;
      this.notify();
    }

    updateVehicleExpertise(vehicleId, expertiseData) {
      const v = this.state.vehicles.find(item => item.id === vehicleId);
      if (!v) return;

      v.expertise = {
        heavyDamage: !!expertiseData.heavyDamage,
        tramerAmount: Math.max(0, parseInt(expertiseData.tramerAmount, 10) || 0),
        sasiPodyeAirbag: expertiseData.sasiPodyeAirbag || 'orijinal',
        parts: { ...expertiseData.parts }
      };

      const authentic = calculateAuthenticMarketValue(v.brandId, v.model, v.year, v.currentKm, v.enginePackage);
      const summary = calculateExpertiseSummary(v.expertise);
      const adjustedVal = Math.round(authentic.average * (1 - summary.penaltyRate) / 5000) * 5000;
      v.marketValue = adjustedVal;
      v.marketMin = Math.round(adjustedVal * 0.94 / 5000) * 5000;
      v.marketMax = Math.round(adjustedVal * 1.06 / 5000) * 5000;
      v.isCustomMarketValue = false;

      this.saveState();
      this.state.isExpertiseModalOpen = false;
      this.showToast('Kaporta ekspertiz ve hasar raporu güncellendi! ✅', 'success');
      this.notify();
    }

    setFuelModalOpen(isOpen) {
      this.state.isFuelModalOpen = isOpen;
      this.notify();
    }

    addFuelLog(vehicleId, logData) {
      const v = this.state.vehicles.find(item => item.id === vehicleId);
      if (!v) return;
      if (!v.fuelLogs) v.fuelLogs = [];
      const newKm = parseInt(logData.km, 10) || v.currentKm;
      v.fuelLogs.unshift({
        id: 'fuel-' + Date.now(),
        date: logData.date || new Date().toISOString().split('T')[0],
        km: newKm,
        liters: parseFloat(logData.liters) || 0,
        totalCost: parseFloat(logData.totalCost) || 0,
        station: logData.station || 'Akaryakıt İstasyonu'
      });
      if (newKm > v.currentKm) {
        v.currentKm = newKm;
      }
      this.saveState();
      this.state.isFuelModalOpen = false;
      this.showToast('Yakıt alımı başarıyla kaydedildi! ⛽', 'success');
      this.notify();
    }

    deleteFuelLog(vehicleId, logId) {
      const v = this.state.vehicles.find(item => item.id === vehicleId);
      if (!v || !v.fuelLogs) return;
      v.fuelLogs = v.fuelLogs.filter(l => l.id !== logId);
      this.saveState();
      this.showToast('Yakıt kaydı silindi.', 'info');
      this.notify();
    }

    setAdModalOpen(isOpen) {
      this.state.isAdModalOpen = isOpen;
      this.notify();
    }

    setLightsModalOpen(isOpen) {
      this.state.isLightsModalOpen = isOpen;
      this.notify();
    }

    setEmergencyModalOpen(isOpen) {
      this.state.isEmergencyModalOpen = isOpen;
      this.notify();
    }

    // --- GERÇEK VERİ HESAPLAMA MOTORU ---
    addVehicle(vehicleData) {
      const newId = 'veh-' + Date.now();
      const modelYear = parseInt(vehicleData.year, 10) || 2022;
      const km = parseInt(vehicleData.currentKm, 10) || 45000;

      // Gerçekçi 2026 Türkiye İkinci El Pazar & Kasko Değerlemesi
      const authentic = calculateAuthenticMarketValue(
        vehicleData.brandId,
        vehicleData.model,
        modelYear,
        km,
        vehicleData.enginePackage
      );

      const specs = parseEngineSpecs(vehicleData.enginePackage, vehicleData.brandId, vehicleData.model);
      const serviceIntervalKm = specs.interval;
      const lastServiceKm = Math.floor(km / serviceIntervalKm) * serviceIntervalKm;

      const brandData = VEHICLE_MODELS[vehicleData.brandId] || [];
      const modelData = brandData.find(m => m.name.toLowerCase() === (vehicleData.model || '').toLowerCase());
      const tireSpecs = getVehicleTireSpecs(vehicleData.brandId, vehicleData.model, vehicleData.enginePackage);

      const newVehicle = {
        id: newId,
        plate: vehicleData.plate.toUpperCase().trim(),
        brand: vehicleData.brand,
        brandId: vehicleData.brandId,
        model: vehicleData.model,
        year: modelYear,
        bodyType: vehicleData.bodyType || 'otomobil',
        enginePackage: vehicleData.enginePackage,
        fuel: specs.fuel,
        transmission: specs.transmission,
        currentKm: km,
        monthlyAvgKm: parseInt(vehicleData.monthlyAvgKm, 10) || 1200,
        lastServiceKm: lastServiceKm,
        lastServiceDate: '2026-03-10',
        serviceIntervalKm: serviceIntervalKm,
        marketValue: authentic.average,
        marketMin: authentic.min,
        marketMax: authentic.max,
        marketTrend: authentic.trend,
        marketTrendAmount: 24000,
        isCustomMarketValue: false,
        vinNumber: vehicleData.vinNumber || 'TR' + Math.random().toString(36).substring(2, 12).toUpperCase(),
        tires: {
          brand: 'Orijinal OEM Ekipmanı',
          size: tireSpecs.defaultSize,
          season: '4 Mevsim',
          treadDepthMm: 6.8,
          lifePercentage: 85,
          pressures: { ...tireSpecs.normalPressures }
        },
        // Kullanıcı tarih girmeden kesinlikle kafadan uydurma tarih kaydedilmez
        inspectionDate: vehicleData.inspectionDate || null,
        insuranceDate: vehicleData.insuranceDate || null,
        expertise: {
          heavyDamage: false,
          tramerAmount: 0,
          sasiPodyeAirbag: 'orijinal',
          parts: {
            kaput: 'orijinal',
            tavan: 'orijinal',
            bagaj: 'orijinal',
            solOnCamurluk: 'orijinal',
            solOnKapi: 'orijinal',
            solArkaKapi: 'orijinal',
            solArkaCamurluk: 'orijinal',
            sagOnCamurluk: 'orijinal',
            sagOnKapi: 'orijinal',
            sagArkaKapi: 'orijinal',
            sagArkaCamurluk: 'orijinal'
          }
        },
        damageStatus: 'hatasiz',
        damageNote: 'Kullanıcı beyanı ile kaydedildi.',
        fuelLogs: [],
        chronicNote: (modelData && modelData.chronic) ? modelData.chronic : 'Periyodik kontrollerin uzman serviste zamanında yapılması önerilir.',
        kmHistory: [
          { date: new Date().toISOString().split('T')[0], km: km, note: 'Garaja ilk kayıt' }
        ]
      };

      this.state.vehicles.push(newVehicle);
      this.state.activeVehicleId = newId;
      this.state.isAddVehicleModalOpen = false;
      if (typeof resetWizardState === 'function') {
        resetWizardState();
      }
      this.saveState();
      this.showToast(`${newVehicle.plate} plakalı ${newVehicle.brand} ${newVehicle.model} garajınıza eklendi! 🎉`, 'success');
      this.notify();
    }

    updateVehicleKm(newKm) {
      const activeVehicle = this.getActiveVehicle();
      if (!activeVehicle) return;
      const parsedKm = parseInt(newKm, 10);
      if (isNaN(parsedKm) || parsedKm < activeVehicle.currentKm) {
        this.showToast('Girilen KM mevcut KM değerinden küçük olamaz!', 'warning');
        return false;
      }
      const diff = parsedKm - activeVehicle.currentKm;
      activeVehicle.currentKm = parsedKm;
      if (!activeVehicle.kmHistory) activeVehicle.kmHistory = [];
      activeVehicle.kmHistory.unshift({
        date: new Date().toISOString().split('T')[0],
        km: parsedKm,
        note: diff > 0 ? `+${diff.toLocaleString('tr-TR')} km artış` : 'KM Doğrulandı'
      });
      this.saveState();
      this.state.isKmModalOpen = false;
      this.showToast(`Güncel KM ${parsedKm.toLocaleString('tr-TR')} olarak kaydedildi!`, 'success');
      this.notify();
      return true;
    }
  }

  const store = new Store();
  window.store = store;
  window.uluStore = store;

  // --- 4. İKON KÜTÜPHANESİ ---
  const Icons = {
    car: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,
    wrench: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    shield: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    trendingUp: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    alertTriangle: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    plus: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    user: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    close: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    check: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    refresh: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
    trash: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
    camera: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
    phone: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,
    fuel: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="15" y2="22"/><rect x="4" y="9" width="10" height="13" rx="1"/><path d="M14 9V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v5"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 13h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L19 6"/></svg>`,
    copy: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    phoneCall: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    share: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`,
    sun: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
    moon: (cls = 'w-5 h-5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`
  };

  // --- 5. TÜRK STANDARDI PLAKA ROZETİ ---
  function renderPlateBadge(plateNumber = '34 PLAKA 01', size = 'md') {
    const isSm = size === 'sm';
    return `
      <div class="inline-flex items-center font-mono font-black tracking-wider uppercase rounded-xl border border-slate-300 shadow-xs overflow-hidden select-none bg-white text-slate-900 ${isSm ? 'text-xs h-7' : 'text-sm sm:text-base h-9'}">
        <div class="bg-blue-600 text-white flex flex-col items-center justify-center font-bold px-1.5 h-full text-[9px] leading-tight">
          <span>TR</span>
        </div>
        <div class="px-2.5 py-0.5 tracking-widest font-black flex items-center justify-center">
          ${plateNumber}
        </div>
      </div>
    `;
  }

  // --- 6. TOAST BİLDİRİMİ ---
  function renderToast() {
    const toast = store.getState().toast;
    if (!toast) return '';
    const colors = {
      success: 'bg-emerald-600 text-white shadow-emerald-500/25',
      warning: 'bg-amber-600 text-white shadow-amber-500/25',
      danger: 'bg-rose-600 text-white shadow-rose-500/25',
      info: 'bg-slate-800 text-white shadow-slate-900/20'
    }[toast.type || 'info'];

    return `
      <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl text-xs font-bold animate-slide-up ${colors}">
        <span>${toast.message}</span>
      </div>
    `;
  }

  // --- 7. DUYARLI (RESPONSIVE) HEADER ---
  function renderHeader() {
    const state = store.getState();
    const activeTab = state.activeTab;
    const currentTheme = state.theme || 'light';

    const navTabs = [
      { id: 'garajim', label: 'Garajım', icon: 'car' },
      { id: 'bakim', label: 'Bakım & Lastik', icon: 'wrench' },
      { id: 'piyasa', label: 'Piyasa & Kronik', icon: 'trendingUp' },
      { id: 'profil', label: 'Profil', icon: 'user' }
    ];

    return `
      <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 sm:h-20">
            
            <!-- Logo ve Başlık (Ana Sayfaya / Garajıma Dönüş) -->
            <button type="button" class="btn-brand-home flex items-center gap-3 cursor-pointer text-left focus:outline-none transition-transform active:scale-95 group" onclick="if(window.store){store.setActiveTab('garajim');window.scrollTo({top:0,behavior:'smooth'});}">
              <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                ${Icons.car('w-5 h-5 sm:w-6 sm:h-6')}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">UluKontrol</span>
                </div>
                <p class="text-[11px] font-medium text-slate-500 hidden sm:block">Akıllı Araç & Garaj Yönetim Portalı</p>
              </div>
            </button>

            <!-- Masaüstü Navigasyon Sekmeleri (Desktop Tabs) -->
            <nav class="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
              ${navTabs.map(t => {
                const isActive = activeTab === t.id;
                return `
                  <button type="button" class="btn-desktop-nav px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${isActive ? 'bg-white text-emerald-900 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900'}" data-tab="${t.id}">
                    ${Icons[t.icon](isActive ? 'w-4 h-4 text-emerald-600' : 'w-4 h-4 text-slate-400')}
                    <span>${t.label}</span>
                  </button>
                `;
              }).join('')}
            </nav>

            <!-- Sağ Butonlar -->
            <div class="flex items-center gap-1.5 sm:gap-2.5">
              <!-- Tema Seçimi (Gündüz / Gece Kokpit Modu Butonu) -->
              <button id="btn-toggle-theme" class="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 sm:px-3 py-2 rounded-xl border border-slate-200 transition active:scale-95 cursor-pointer" title="${currentTheme === 'dark' ? 'Açık Temaya (Gündüz Modu) Geç' : 'Koyu Temaya (Gece / Kokpit Modu) Geç'}">
                ${currentTheme === 'dark' ? `${Icons.sun('w-4 h-4 text-amber-500')} <span class="hidden xl:inline text-[11px]">Açık Tema</span>` : `${Icons.moon('w-4 h-4 text-indigo-600')} <span class="hidden xl:inline text-[11px]">Koyu Tema</span>`}
              </button>

              <!-- İkaz Lambaları Rehberi -->
              <button id="btn-open-lights-modal" class="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 px-2.5 sm:px-3 py-2 rounded-xl border border-slate-200 transition active:scale-95 cursor-pointer" title="Gösterge İkaz Lambaları">
                <span class="text-sm">⚠️</span>
                <span class="hidden lg:inline">İkaz Rehberi</span>
              </button>

              <!-- Acil Yardım & Kaza Asistanı -->
              <button id="btn-open-emergency-modal" class="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 sm:px-3 py-2 rounded-xl border border-rose-200 transition active:scale-95 cursor-pointer shadow-2xs" title="Acil Yardım & Kaza Rehberi">
                <span class="text-sm">🆘</span>
                <span class="hidden sm:inline">Acil Asistan</span>
              </button>

              <!-- Telefona Yükle / Mobil Uygulama Butonu -->
              <button id="btn-open-pwa-guide" class="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 px-3 py-2 rounded-xl border border-slate-200 transition active:scale-95 cursor-pointer" title="Telefona Uygulama Olarak Ekle">
                <span class="text-sm">📲</span>
                <span class="hidden sm:inline">Telefona Yükle</span>
              </button>

              <!-- Yeni Araç Ekle Butonu -->
              <button id="btn-top-add-vehicle" class="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 rounded-xl shadow-sm shadow-emerald-600/25 active:scale-95 transition">
                ${Icons.plus('w-4 h-4')}
                <span class="hidden sm:inline">Yeni Araç</span>
              </button>
            </div>

          </div>
        </div>
      </header>
    `;
  }

  function attachHeaderEvents() {
    const btnTheme = document.getElementById('btn-toggle-theme');
    if (btnTheme) btnTheme.onclick = () => store.toggleTheme();

    const btnAdd = document.getElementById('btn-top-add-vehicle');
    if (btnAdd) btnAdd.onclick = () => store.setAddVehicleModalOpen(true);

    const btnPwa = document.getElementById('btn-open-pwa-guide');
    if (btnPwa) btnPwa.onclick = () => store.setPwaModalOpen(true);

    const btnLights = document.getElementById('btn-open-lights-modal');
    if (btnLights) btnLights.onclick = () => store.setLightsModalOpen(true);

    const btnEmerg = document.getElementById('btn-open-emergency-modal');
    if (btnEmerg) btnEmerg.onclick = () => store.setEmergencyModalOpen(true);

    document.querySelectorAll('.btn-desktop-nav').forEach(btn => {
      btn.onclick = () => {
        store.setActiveTab(btn.getAttribute('data-tab'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });

    document.querySelectorAll('.btn-brand-home').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        store.setActiveTab('garajim');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });
  }

  // --- 8. MOBİL ALT MENÜ (SADECE TELEFONDA GÖRÜNÜR) ---
  function renderBottomNav() {
    const activeTab = store.getState().activeTab;
    const tabs = [
      { id: 'garajim', label: 'Garajım', icon: 'car' },
      { id: 'bakim', label: 'Bakım', icon: 'wrench' },
      { id: 'piyasa', label: 'Piyasa', icon: 'trendingUp' },
      { id: 'profil', label: 'Profil', icon: 'user' }
    ];

    return `
      <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 shadow-[0_-4px_25px_rgba(0,0,0,0.06)]">
        <div class="grid grid-cols-4 gap-1">
          ${tabs.map(t => {
            const isActive = activeTab === t.id;
            return `
              <button type="button" class="btn-nav-tab flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition active:scale-95 ${isActive ? 'text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-800'}" data-tab="${t.id}">
                ${isActive ? `<span class="absolute top-0 w-8 h-1 bg-emerald-500 rounded-full"></span>` : ''}
                <div class="p-1 rounded-xl ${isActive ? 'bg-emerald-50' : ''}">
                  ${Icons[t.icon](isActive ? 'w-5 h-5 text-emerald-700' : 'w-5 h-5')}
                </div>
                <span class="text-[10px] tracking-tight leading-none mt-1 truncate w-full text-center">${t.label}</span>
              </button>
            `;
          }).join('')}
        </div>
      </nav>
    `;
  }

  function attachBottomNavEvents() {
    document.querySelectorAll('.btn-nav-tab').forEach(b => {
      b.onclick = () => {
        store.setActiveTab(b.getAttribute('data-tab'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });
  }

  // --- 9. MOBİL UYGULAMA REHBER BANNERI VE MODALI ---
  function renderPwaTipCard() {
    return `
      <div class="rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border border-emerald-200/90 p-5 card-shadow space-y-3">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-xs">
              📲
            </div>
            <div>
              <h4 class="text-sm font-black text-slate-900">Telefona Uygulama Olarak Yükleyin</h4>
              <p class="text-xs text-slate-500 mt-0.5">App Store veya Google Play gerekmeden ana ekrana kurulum.</p>
            </div>
          </div>
        </div>

        <p class="text-xs text-slate-600 leading-relaxed">
          UluKontrol'ü telefonunuza tıpkı bir mobil uygulama gibi kurabilir, internet tarayıcısı çubuğu olmadan tam ekran ve tek tıkla açabilirsiniz.
        </p>

        <div class="pt-1 flex items-center justify-between border-t border-emerald-100">
          <span class="text-[11px] font-semibold text-emerald-800">iPhone (Safari) & Android (Chrome) Destekli</span>
          <button id="btn-card-pwa-guide" class="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-white px-3.5 py-1.5 rounded-xl border border-emerald-200 shadow-2xs active:scale-95 transition cursor-pointer">
            Nasıl Yüklenir? →
          </button>
        </div>
      </div>
    `;
  }

  function renderPwaGuideModal() {
    const state = store.getState();
    if (!state.isPwaModalOpen) return '';

    return `
      <div id="pwa-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
        <div class="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl animate-modal-scale text-slate-900 relative">
          
          <button id="btn-close-pwa-modal" class="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer">
            ${Icons.close('w-5 h-5')}
          </button>

          <div class="flex items-center gap-3.5 mb-5">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-2xl">
              📲
            </div>
            <div>
              <h3 class="text-lg font-black text-slate-900">Telefona Uygulama Olarak Yükleme</h3>
              <p class="text-xs text-slate-500">App Store veya Google Play Store olmadan 10 saniyede ana ekrana ekleyin</p>
            </div>
          </div>

          <!-- Ne Anlama Geliyor Açıklama Kutusu -->
          <div class="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <strong class="text-slate-900 block font-black">💡 Bu Özellik Nedir?</strong>
            <p class="leading-relaxed">
              UluKontrol, modern <b>Web Uygulaması (PWA)</b> altyapısına sahiptir. Mağazalara para ödemeden ya da yer kaplayan ağır dosyalar indirmeden, telefonunuzun ana ekranına uygulama ikonu olarak eklenir ve her açtığınızda tam ekran mobil uygulama gibi çalışır.
            </p>
          </div>

          <div class="space-y-4 text-xs text-slate-600 mt-4">
            <!-- iPhone Bölümü -->
            <div class="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/90 space-y-2">
              <h4 class="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                <span>🍏</span> iPhone & iPad (iOS Safari)
              </h4>
              <ol class="list-decimal list-inside space-y-1.5 text-slate-700 font-medium leading-relaxed">
                <li>Bu web sitesini iPhone'unuzun <b>Safari</b> tarayıcısında açın.</li>
                <li>Ekranın en altındaki <b>"Paylaş"</b> simgesine (kare içinden yukarı ok) dokunun.</li>
                <li>Açılan menüde aşağı kaydırarak <b>"Ana Ekrana Ekle" (Add to Home Screen)</b> seçeneğine dokunun.</li>
                <li>Sağ üstteki <b>"Ekle"</b> butonuna basın.</li>
              </ol>
              <p class="text-[11px] text-emerald-800 font-semibold pt-1">
                ✓ Artık ana ekranınızda doğrudan tam ekran, reklamsız ve hızlı açılır!
              </p>
            </div>

            <!-- Android Bölümü -->
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 class="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <span>🤖</span> Android (Chrome)
              </h4>
              <p class="text-slate-600 leading-relaxed">
                Chrome tarayıcısında sağ üstteki <b>üç nokta (⋮)</b> menüsüne dokunun ve <b>"Uygulamayı Yükle"</b> veya <b>"Ana Ekrana Ekle"</b> seçeneğini onaylayın.
              </p>
            </div>
          </div>

          <button id="btn-pwa-modal-ok" class="mt-6 w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md active:scale-95 transition cursor-pointer">
            Harika, Anladım!
          </button>
        </div>
      </div>
    `;
  }

  function attachPwaModalEvents() {
    const state = store.getState();
    if (!state.isPwaModalOpen) return;

    const close = () => store.setPwaModalOpen(false);
    const bClose = document.getElementById('btn-close-pwa-modal');
    if (bClose) bClose.onclick = close;
    const bOk = document.getElementById('btn-pwa-modal-ok');
    if (bOk) bOk.onclick = close;

    const backdrop = document.getElementById('pwa-modal-backdrop');
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) close();
      };
    }
  }

  // --- 10. BOŞ GARAJ KARŞILAMA EKRANI (HERO EMPTY STATE) ---
  function renderEmptyGarageHero() {
    return `
      <div class="space-y-6 max-w-5xl mx-auto my-2 animate-fade-in">
        
        <!-- Ana Tanıtım Kartı (Hero Banner) -->
        <div class="rounded-3xl bg-gradient-to-br from-white via-emerald-50/25 to-teal-50/35 border border-slate-200/90 p-6 sm:p-10 card-shadow text-center space-y-5">
          
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Akıllı Araç & Garaj Portalı
          </div>

          <div class="space-y-3 max-w-3xl mx-auto">
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Aracınızın Tüm İhtiyaçları Tek Bir Ekranda
            </h1>
            <p class="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Bakım gününden kapı içi orijinal lastik basıncına, muayene tarihinden 2026 kasko/piyasa değerine kadar aracınızı ilgilendiren her şeyi tek bakışta öğrenin ve takip edin.
            </p>
          </div>

          <!-- Buton & Çağrı -->
          <div class="pt-2 max-w-md mx-auto space-y-2.5">
            <button id="btn-empty-add-vehicle" class="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-600/25 transition active:scale-95 flex items-center justify-center gap-2.5">
              ${Icons.plus('w-5 h-5')}
              <span>+ Aracınızı Ekleyin ve Hemen Başlayın</span>
            </button>
            <div class="flex items-center justify-center gap-4 text-[11px] font-semibold text-slate-500">
              <span class="flex items-center gap-1">✓ Üyelik Gerekmez</span>
              <span class="flex items-center gap-1">✓ 25 Marka Kataloğu</span>
              <span class="flex items-center gap-1">✓ Ücretsiz & Reklamsız</span>
            </div>
          </div>
        </div>

        <!-- 4 Temel Özellik (Neler Yapabilirsiniz?) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between px-1">
            <h3 class="text-xs font-black uppercase tracking-wider text-slate-700">UluKontrol İle Neler Yapabilirsiniz?</h3>
            <span class="text-[11px] text-slate-400 font-medium">4 Temel Güçlü Özellik</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- 1. Özellik: Periyodik Bakım -->
            <div class="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 card-shadow hover:border-emerald-300 transition space-y-3 flex flex-col justify-between">
              <div class="space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center">
                    ${Icons.wrench('w-6 h-6')}
                  </div>
                  <span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">1. Servis & Bakım</span>
                </div>
                <h4 class="text-base font-black text-slate-900">Periyodik Bakım Takvimi</h4>
                <p class="text-xs text-slate-600 leading-relaxed font-medium">
                  Aracınızın motoruna özel fabrika bakım aralığını (10.000 / 15.000 / 20.000 KM) otomatik bilir. Sonraki bakıma kaç KM kaldığını hesaplar; motor yağı, filtreler ve triger değişim zamanında sizi uyarır.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-800 font-bold">
                <span>✓ Motor & Şanzıman Ömrünü Korur</span>
                <span class="text-slate-400 font-normal">KM Takibi</span>
              </div>
            </div>

            <!-- 2. Özellik: Lastik & Basınç -->
            <div class="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 card-shadow hover:border-emerald-300 transition space-y-3 flex flex-col justify-between">
              <div class="space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center text-2xl">
                    🛞
                  </div>
                  <span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">2. Lastik Güvenliği</span>
                </div>
                <h4 class="text-base font-black text-slate-900">Fabrika Onaylı Lastik & Hava Basıncı</h4>
                <p class="text-xs text-slate-600 leading-relaxed font-medium">
                  Sürücü kapı içi B-sütunundaki üretici etiketine göre takılı jantınıza uygun orijinal ebadı ve önerilen ön/arka PSI hava basınçlarını gösterir. Yanlış basınç kaynaklı lastik aşınmasını ve fazla yakıt tüketimini önler.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-sky-800 font-bold">
                <span>✓ Kapı İçi Orijinal PSI Değerleri</span>
                <span class="text-slate-400 font-normal">Yakıt Tasarrufu</span>
              </div>
            </div>

            <!-- 3. Özellik: TÜVTÜRK & Sigorta -->
            <div class="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 card-shadow hover:border-emerald-300 transition space-y-3 flex flex-col justify-between">
              <div class="space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center">
                    ${Icons.shield('w-6 h-6')}
                  </div>
                  <span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">3. Yasal Hatırlatıcı</span>
                </div>
                <h4 class="text-base font-black text-slate-900">TÜVTÜRK Muayene & Zorunlu Sigorta</h4>
                <p class="text-xs text-slate-600 leading-relaxed font-medium">
                  Muayene ve zorunlu trafik sigortası bitiş tarihlerinizi güvenle saklar. Günü yaklaşınca sizi haberdar ederek gecikme cezası, muayene gecikme faizi veya trafikte bağlanma riskini ortadan kaldırır.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-amber-800 font-bold">
                <span>✓ Ceza ve Gecikme Faizini Önler</span>
                <span class="text-slate-400 font-normal">Tarih Hatırlatıcı</span>
              </div>
            </div>

            <!-- 4. Özellik: Piyasa & Kronik Bülten -->
            <div class="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 card-shadow hover:border-emerald-300 transition space-y-3 flex flex-col justify-between">
              <div class="space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-700 flex items-center justify-center">
                    ${Icons.trendingUp('w-6 h-6')}
                  </div>
                  <span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">4. Piyasa & Kronik</span>
                </div>
                <h4 class="text-base font-black text-slate-900">2026 Piyasa Değeri & Kronik Bültenler</h4>
                <p class="text-xs text-slate-600 leading-relaxed font-medium">
                  2026 Türkiye ikinci el ve kasko pazar endeksine göre aracınızın gerçekçi değer aralığını hesaplar. Ayrıca motor ve şanzımanınıza özel resmi yetkili servis bültenlerini ve dikkat edilmesi gereken noktaları sunar.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-purple-800 font-bold">
                <span>✓ Değer Kaybı & Arıza Önleme</span>
                <span class="text-slate-400 font-normal">Canlı Endeks</span>
              </div>
            </div>

          </div>
        </div>

        <!-- 3 Adımda Nasıl Çalışır? -->
        <div class="p-6 bg-white rounded-3xl border border-slate-200/90 card-shadow space-y-4">
          <h4 class="text-xs font-black uppercase tracking-wider text-slate-500">Nasıl Kullanılır? (3 Kolay Adım)</h4>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">1</div>
              <div>
                <h5 class="text-xs font-black text-slate-900">Aracınızı Seçin</h5>
                <p class="text-[11px] text-slate-500 mt-0.5 leading-relaxed">25 otomotiv markası ve yüzlerce gerçek donanım paketi arasından aracınızı belirleyin.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">2</div>
              <div>
                <h5 class="text-xs font-black text-slate-900">Güncel KM'yi Girin</h5>
                <p class="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Sayacınızdaki kilometreyi yazın; bakım aralıkları ve piyasa değeri anında hesaplansın.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">3</div>
              <div>
                <h5 class="text-xs font-black text-slate-900">Cebinizde Taşıyın</h5>
                <p class="text-[11px] text-slate-500 mt-0.5 leading-relaxed">İster bilgisayardan ister telefonunuzun ana ekranından uygulama gibi her an takip edin.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // --- 11. ARAÇ SEÇİM ŞERİDİ ---
  function renderVehicleSwitcherBar() {
    const state = store.getState();
    const vehicles = state.vehicles;
    const activeVehicle = store.getActiveVehicle();
    if (!activeVehicle || vehicles.length <= 1) return '';

    return `
      <div class="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 card-shadow">
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2 pr-1 hidden sm:inline">Araçlarım:</span>
          ${vehicles.map(v => {
            const isActive = v.id === activeVehicle.id;
            return `
              <button type="button" class="btn-switch-vehicle flex items-center gap-2 px-3 py-1.5 rounded-xl border transition whitespace-nowrap active:scale-95 ${isActive ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'}" data-id="${v.id}">
                <div class="w-5 h-5 rounded-md bg-white border border-slate-200/80 flex items-center justify-center p-0.5 shrink-0">
                  ${getBrandLogoSvg(v.brandId || v.brand, 'w-3.5 h-3.5')}
                </div>
                <span class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}"></span>
                <span class="text-xs font-bold font-mono">${v.plate}</span>
                <span class="text-[11px] text-slate-500 hidden md:inline">(${v.brand} ${v.model})</span>
              </button>
            `;
          }).join('')}
        </div>

        <button id="btn-open-add-vehicle" class="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs whitespace-nowrap active:scale-95 transition">
          ${Icons.plus('w-3.5 h-3.5')} <span class="hidden sm:inline">Yeni Araç</span>
        </button>
      </div>
    `;
  }

  // --- 12. GARAJ KARTI ---
  function renderGarageCard() {
    const state = store.getState();
    const activeVehicle = store.getActiveVehicle();
    if (!activeVehicle) return '';

    return `
      <div class="rounded-3xl bg-white border border-slate-200/90 p-6 card-shadow space-y-5">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-center p-2 shrink-0 shadow-2xs">
              ${getBrandLogoSvg(activeVehicle.brandId || activeVehicle.brand, 'w-8 h-8')}
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1.5">
                ${renderPlateBadge(activeVehicle.plate, 'md')}
                <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">${activeVehicle.year}</span>
              </div>
              <h2 class="text-xl font-black text-slate-900 leading-snug">${activeVehicle.brand} ${activeVehicle.model}</h2>
              <p class="text-xs font-bold text-emerald-800 mt-0.5">${activeVehicle.enginePackage}</p>
            </div>
          </div>
          
          <button id="btn-delete-active-vehicle" class="p-2.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition" title="Aracı Garajdan Sil">
            ${Icons.trash('w-4 h-4')}
          </button>
        </div>

        <!-- KM Sayacı ve Güncelleme Butonu -->
        <div class="bg-gradient-to-r from-slate-50 via-emerald-50/30 to-slate-50 p-4 rounded-2xl border border-slate-200/90 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Güncel Kilometre</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-2xl sm:text-3xl font-black font-mono text-slate-900">${activeVehicle.currentKm.toLocaleString('tr-TR')}</span>
              <span class="text-xs font-bold text-slate-500">KM</span>
            </div>
          </div>

          <button id="btn-open-km-modal" class="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm shadow-emerald-600/25 active:scale-95 transition flex items-center gap-1.5">
            ${Icons.refresh('w-3.5 h-3.5')} + KM Güncelle
          </button>
        </div>

        <!-- Canlı Araç Özellikleri -->
        <div class="grid grid-cols-3 gap-2.5 pt-1">
          <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
            <span class="text-[10px] font-semibold text-slate-500 block">Yakıt Türü</span>
            <span class="text-xs font-bold text-slate-800 mt-0.5 block">${activeVehicle.fuel}</span>
          </div>
          <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
            <span class="text-[10px] font-semibold text-slate-500 block">Şanzıman</span>
            <span class="text-xs font-bold text-slate-800 mt-0.5 block">${activeVehicle.transmission}</span>
          </div>
          <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
            <span class="text-[10px] font-semibold text-slate-500 block">Piyasa Değeri</span>
            <span class="text-xs font-bold text-emerald-700 mt-0.5 block">${(activeVehicle.marketValue / 1000).toLocaleString('tr-TR')} Bin ₺</span>
          </div>
        </div>
      </div>
    `;
  }

  function attachGarageCardEvents() {
    const btnEmptyAdd = document.getElementById('btn-empty-add-vehicle');
    if (btnEmptyAdd) btnEmptyAdd.onclick = () => store.setAddVehicleModalOpen(true);

    const btnOpenAdd = document.getElementById('btn-open-add-vehicle');
    if (btnOpenAdd) btnOpenAdd.onclick = () => store.setAddVehicleModalOpen(true);

    const btnCardPwa = document.getElementById('btn-card-pwa-guide');
    if (btnCardPwa) btnCardPwa.onclick = () => store.setPwaModalOpen(true);

    document.querySelectorAll('.btn-switch-vehicle').forEach(btn => {
      btn.onclick = () => store.setActiveVehicle(btn.getAttribute('data-id'));
    });

    const btnKm = document.getElementById('btn-open-km-modal');
    if (btnKm) btnKm.onclick = () => store.setKmModalOpen(true);

    const btnDel = document.getElementById('btn-delete-active-vehicle');
    if (btnDel) {
      btnDel.onclick = () => {
        const v = store.getActiveVehicle();
        if (v && confirm(`${v.plate} plakalı ${v.brand} ${v.model} aracını silmek istediğinize emin misiniz?`)) {
          store.deleteVehicle(v.id);
        }
      };
    }
  }

  // --- 13. KOKPİT DURUM KARTLARI VE HIZLI BAKIM TABLOSU ---
  function renderCockpitWidgets() {
    const activeVehicle = store.getActiveVehicle();
    if (!activeVehicle) return '';

    const nextServiceKm = activeVehicle.lastServiceKm + activeVehicle.serviceIntervalKm;
    const remainingKm = Math.max(0, nextServiceKm - activeVehicle.currentKm);
    const serviceProgress = Math.min(100, Math.round(((activeVehicle.serviceIntervalKm - remainingKm) / activeVehicle.serviceIntervalKm) * 100));
    const fuelStats = getVehicleFuelStats(activeVehicle);
    const mtv = calculate2026MTV(activeVehicle.brandId, activeVehicle.model, activeVehicle.enginePackage, activeVehicle.year);

    return `
      <div class="space-y-6">
        <!-- 6 Adet Durum Kartı (Grid) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <!-- Kart 1: Periyodik Bakım -->
          <div class="rounded-3xl bg-white border border-slate-200/90 p-5 card-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">${Icons.wrench('w-5 h-5')}</span>
                <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${remainingKm < 1500 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                  %${serviceProgress}
                </span>
              </div>
              <h4 class="text-sm font-black text-slate-900">Periyodik Bakım</h4>
              <p class="text-xs text-slate-500 mt-0.5">Sıradaki: ${nextServiceKm.toLocaleString('tr-TR')} KM</p>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <span class="text-xl font-black font-mono ${remainingKm < 1500 ? 'text-amber-600' : 'text-slate-900'}">${remainingKm.toLocaleString('tr-TR')}</span>
                <span class="text-xs font-semibold text-slate-500">KM Kaldı</span>
              </div>
              <button type="button" class="btn-goto-bakim text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer active:scale-95 transition" onclick="store.setActiveTab('bakim')">
                Bakım Detayı →
              </button>
            </div>
          </div>

          <!-- Kart 2: TÜVTÜRK Muayene -->
          <div class="rounded-3xl bg-white border border-slate-200/90 p-5 card-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="p-2.5 rounded-2xl bg-teal-50 text-teal-700 border border-teal-100">${Icons.shield('w-5 h-5')}</span>
                <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${activeVehicle.inspectionDate ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'}">
                  ${activeVehicle.inspectionDate ? 'TÜVTÜRK' : 'Girilmedi'}
                </span>
              </div>
              <h4 class="text-sm font-black text-slate-900">Araç Muayenesi</h4>
              <p class="text-xs ${activeVehicle.inspectionDate ? 'text-slate-600 font-semibold' : 'text-amber-700 font-bold'} mt-0.5">
                ${activeVehicle.inspectionDate ? `Son Gün: ${activeVehicle.inspectionDate}` : 'Ruhsattaki muayene tarihini girin'}
              </p>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span class="text-xs font-bold ${activeVehicle.inspectionDate ? 'text-emerald-700' : 'text-slate-500'}">
                ${activeVehicle.inspectionDate ? formatRemainingDays(activeVehicle.inspectionDate).text : 'TÜVTÜRK Takvimi'}
              </span>
              <button class="btn-open-dates-modal text-xs font-bold text-teal-700 hover:underline">
                ${activeVehicle.inspectionDate ? 'Düzenle →' : '+ Tarih Belirle →'}
              </button>
            </div>
          </div>

          <!-- Kart 3: Piyasa & Kasko Değeri -->
          <div class="rounded-3xl bg-white border border-slate-200/90 p-5 card-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="p-2.5 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100">${Icons.trendingUp('w-5 h-5')}</span>
                <span class="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">${activeVehicle.marketTrend || '+2.4%'}</span>
              </div>
              <h4 class="text-sm font-black text-slate-900">2026 Piyasa & Kasko</h4>
              <p class="text-xs text-slate-500 mt-0.5">Türkiye İkinci El Pazar Endeksi</p>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <span class="text-xl font-black font-mono text-slate-900">${activeVehicle.marketValue.toLocaleString('tr-TR')}</span>
                <span class="text-xs font-bold text-slate-500">₺</span>
              </div>
              <div class="flex items-center gap-2">
                <button class="btn-open-dates-modal text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer">
                  Düzenle
                </button>
                <button type="button" class="btn-goto-piyasa text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer active:scale-95 transition" onclick="store.setActiveTab('piyasa')">
                  Analiz →
                </button>
              </div>
            </div>
          </div>

          <!-- Kart 4: Kronik Arıza & Servis Notu -->
          <div class="rounded-3xl bg-white border border-slate-200/90 p-5 card-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-100">${Icons.alertTriangle('w-5 h-5')}</span>
                <span class="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">Servis Notu</span>
              </div>
              <h4 class="text-sm font-black text-slate-900">${activeVehicle.brand} ${activeVehicle.model}</h4>
              <p class="text-xs text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">${activeVehicle.chronicNote}</p>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100">
              <button type="button" class="btn-goto-kronik text-xs font-bold text-amber-800 hover:text-amber-900 hover:underline cursor-pointer active:scale-95 transition" onclick="store.setActiveTab('piyasa')">
                Tüm Kronik Bilgileri Oku →
              </button>
            </div>
          </div>

          <!-- Kart 5: Yakıt & KM Maliyet Takibi -->
          <div class="rounded-3xl bg-white border border-slate-200/90 p-5 card-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100">${Icons.fuel('w-5 h-5')}</span>
                <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${fuelStats.hasLogs ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'}">
                  ${fuelStats.hasLogs ? `${fuelStats.logCount} Fiş Kayıtlı` : 'Fabrika Tahmini'}
                </span>
              </div>
              <h4 class="text-sm font-black text-slate-900">Yakıt & KM Başı Maliyet</h4>
              <p class="text-xs text-slate-500 mt-0.5">Ortalama: <b>${fuelStats.avgLitersPer100} ${fuelStats.unitLabel}</b></p>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <span class="text-xl font-black font-mono text-slate-900">${fuelStats.costPerKm}</span>
                <span class="text-xs font-semibold text-slate-500">₺ / KM</span>
              </div>
              <button type="button" class="btn-open-fuel-modal text-xs font-bold text-indigo-700 hover:text-indigo-900 hover:underline cursor-pointer active:scale-95 transition">
                + Fiş Ekle →
              </button>
            </div>
          </div>

          <!-- Kart 6: 2026 MTV Takvimi -->
          <div class="rounded-3xl bg-white border border-slate-200/90 p-5 card-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="p-2.5 rounded-2xl bg-violet-50 text-violet-700 border border-violet-100">${Icons.shield('w-5 h-5')}</span>
                <span class="text-[10px] font-bold px-2.5 py-1 rounded-full bg-violet-100 text-violet-800">
                  ${mtv.ccBand}
                </span>
              </div>
              <h4 class="text-sm font-black text-slate-900">2026 Motorlu Taşıtlar Vergisi</h4>
              <p class="text-xs text-slate-500 mt-0.5">1. Taksit (Ocak) • 2. Taksit (Temmuz)</p>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <span class="text-xl font-black font-mono text-slate-900">${mtv.yearlyTotal.toLocaleString('tr-TR')}</span>
                <span class="text-xs font-bold text-slate-500">₺ / Yıl</span>
              </div>
              <span class="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
                Taksit: ${mtv.installment1.toLocaleString('tr-TR')} ₺
              </span>
            </div>
          </div>
          </div>

        </div>

        <!-- Sıradaki Bakımda Değişecek Parçalar Tablosu -->
        <div class="rounded-3xl bg-white border border-slate-200/90 p-6 card-shadow space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-black text-slate-900">Sıradaki Periyodik Bakım Parçaları</h3>
              <p class="text-xs text-slate-500">${nextServiceKm.toLocaleString('tr-TR')} KM'de değişmesi gereken parçalar</p>
            </div>
            <span class="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
              ${activeVehicle.serviceIntervalKm.toLocaleString('tr-TR')} KM Periyodu
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <span class="font-bold text-slate-800">Motor Yağı</span>
              <span class="text-[11px] text-emerald-700 font-semibold">Fabrika Onaylı Viskozite</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <span class="font-bold text-slate-800">Yağ Filtresi & Karter Pulu</span>
              <span class="text-[11px] text-slate-500">Orijinal / OEM</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <span class="font-bold text-slate-800">Hava Filtresi</span>
              <span class="text-[11px] text-slate-500">Periyodik Değişim</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <span class="font-bold text-slate-800">Karbonlu Polen Filtresi</span>
              <span class="text-[11px] text-slate-500">Klima & Kabin Hava</span>
            </div>
            ${activeVehicle.fuel === 'Dizel' ? `
              <div class="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex items-center justify-between col-span-1 sm:col-span-2">
                <span class="font-bold text-emerald-950">Mazot (Dizel) Yakıt Filtresi</span>
                <span class="text-[11px] text-emerald-800 font-semibold">Orijinal Mais/Delphi Tavsiye Edilir</span>
              </div>
            ` : ''}
            ${activeVehicle.fuel.includes('LPG') ? `
              <div class="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex items-center justify-between col-span-1 sm:col-span-2">
                <span class="font-bold text-emerald-950">LPG Gaz Kesici Filtresi & Kalibrasyon</span>
                <span class="text-[11px] text-emerald-800 font-semibold">Gaz Kaçak & Sızıntı Kontrolü</span>
              </div>
            ` : ''}
            ${activeVehicle.transmission === 'Otomatik' ? `
              <div class="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 flex items-center justify-between col-span-1 sm:col-span-2">
                <span class="font-bold text-blue-950">Otomatik Şanzıman Sıvısı & Mekatronik</span>
                <span class="text-[11px] text-blue-800 font-semibold">Kavrama Kalibrasyonu & Yağ Seviyesi</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  function attachCockpitWidgetEvents() {
    document.querySelectorAll('.btn-open-dates-modal').forEach(b => {
      b.onclick = () => store.setDatesModalOpen(true);
    });

    document.querySelectorAll('.btn-open-fuel-modal').forEach(b => {
      b.onclick = () => store.setFuelModalOpen(true);
    });

    document.querySelectorAll('.btn-goto-bakim').forEach(b => {
      b.onclick = (e) => {
        e.preventDefault();
        store.setActiveTab('bakim');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });

    document.querySelectorAll('.btn-goto-piyasa').forEach(b => {
      b.onclick = (e) => {
        e.preventDefault();
        store.setActiveTab('piyasa');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });

    document.querySelectorAll('.btn-goto-kronik').forEach(b => {
      b.onclick = (e) => {
        e.preventDefault();
        store.setActiveTab('piyasa');
        setTimeout(() => {
          const chronicSection = document.getElementById('section-chronic-notes');
          if (chronicSection) {
            chronicSection.scrollIntoView({ behavior: 'smooth' });
            chronicSection.classList.add('ring-2', 'ring-amber-400');
            setTimeout(() => chronicSection.classList.remove('ring-2', 'ring-amber-400'), 1500);
          }
        }, 100);
      };
    });
  }

  // --- 14. BAKIM & LASTİK EKRANI ---
  function renderMaintenanceScreen() {
    const v = store.getActiveVehicle();
    if (!v) {
      return `
        <div class="p-12 text-center bg-white rounded-3xl border border-slate-200 card-shadow max-w-xl mx-auto space-y-4">
          <p class="text-sm text-slate-500">Bakım ve lastik takibini görmek için lütfen önce garajınıza bir araç ekleyin.</p>
          <button id="btn-maint-add-vehicle" class="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md">
            + Araç Ekle
          </button>
        </div>
      `;
    }

    const nextKm = v.lastServiceKm + v.serviceIntervalKm;
    const diff = Math.max(0, nextKm - v.currentKm);
    const tireSpecs = getVehicleTireSpecs(v.brandId, v.model, v.enginePackage);
    const currentSize = (v.tires && v.tires.size && v.tires.size !== 'Fabrika Ebadı') ? v.tires.size : tireSpecs.defaultSize;

    return `
      <div class="space-y-6 max-w-5xl mx-auto">
        
        <!-- Üst Başlık Kartı: Periyodik Bakım Takvimi -->
        <div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 card-shadow space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-center p-2 shrink-0 shadow-2xs">
                ${getBrandLogoSvg(v.brandId || v.brand, 'w-8 h-8')}
              </div>
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Periyodik Bakım Takvimi</span>
                <h2 class="text-xl font-black text-slate-900 mt-0.5">${v.brand} ${v.model}</h2>
                <p class="text-xs font-bold text-emerald-800">${v.enginePackage}</p>
              </div>
            </div>
            <span class="inline-block text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
              ${v.serviceIntervalKm.toLocaleString('tr-TR')} KM Standart Bakım Aralığı
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span class="text-[11px] font-semibold text-slate-500 block">Son Yapılan Bakım</span>
              <span class="text-lg font-black text-slate-900 font-mono mt-0.5 block">${v.lastServiceKm.toLocaleString('tr-TR')} KM</span>
              <p class="text-[11px] text-slate-400 mt-1">${v.lastServiceDate}</p>
            </div>
            <div class="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200">
              <span class="text-[11px] font-semibold text-emerald-800 block">Sıradaki Bakım</span>
              <span class="text-lg font-black text-emerald-950 font-mono mt-0.5 block">${nextKm.toLocaleString('tr-TR')} KM</span>
              <p class="text-[11px] font-bold text-emerald-700 mt-1">${diff.toLocaleString('tr-TR')} KM Kaldı</p>
            </div>
          </div>
        </div>

        <!-- 4 Lastik Durumu ve Canlı Basınç Kartı -->
        <div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 card-shadow space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Lastik ve Basınç Monitörü</span>
              <h3 class="text-base font-black text-slate-900 mt-0.5">
                ${v.tires.season} Lastikler • <span class="font-mono text-emerald-700 font-black">${currentSize}</span>
              </h3>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                Diş Derinliği: ${v.tires.treadDepthMm} mm
              </span>
              <button id="btn-open-tire-modal" class="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition active:scale-95 flex items-center gap-1.5">
                ⚙️ Basınç & Ebat Düzenle
              </button>
            </div>
          </div>

          <!-- Basınç Referansı Bilgilendirme Kutusu (Neye Göre?) -->
          <div class="p-4 bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-slate-50 rounded-2xl border border-emerald-200 text-xs text-slate-700 space-y-2">
            <div class="flex items-center gap-2 font-black text-emerald-950">
              <span class="text-base">📌</span>
              <span>Basınç Referans Kaynağı: ${tireSpecs.pressureBasis}</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div class="p-2.5 bg-white/90 rounded-xl border border-emerald-100 flex items-center justify-between">
                <span class="font-semibold text-slate-600">👤 Normal Sürüş (1-3 Kişi):</span>
                <span class="font-bold text-slate-900 font-mono">Ön: ${tireSpecs.normalPressures.fl} PSI • Arka: ${tireSpecs.normalPressures.rl} PSI</span>
              </div>
              <div class="p-2.5 bg-white/90 rounded-xl border border-emerald-100 flex items-center justify-between">
                <span class="font-semibold text-slate-600">👥🎒 Tam Yüklü (4-5 Kişi + Bagaj):</span>
                <span class="font-bold text-slate-900 font-mono">Ön: ${tireSpecs.loadedPressures.fl} PSI • Arka: ${tireSpecs.loadedPressures.rl} PSI</span>
              </div>
            </div>
          </div>

          <!-- 4 Tekerlek Canlı Göstergesi -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span class="text-[10px] font-bold text-slate-500 block uppercase">Ön Sol (FL)</span>
              <span class="text-xl font-mono font-black text-slate-900 mt-1 block">${v.tires.pressures.fl} PSI</span>
              <span class="text-[10px] font-bold text-emerald-600 block mt-0.5">Hedef: ${tireSpecs.normalPressures.fl} PSI</span>
            </div>
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span class="text-[10px] font-bold text-slate-500 block uppercase">Ön Sağ (FR)</span>
              <span class="text-xl font-mono font-black text-slate-900 mt-1 block">${v.tires.pressures.fr} PSI</span>
              <span class="text-[10px] font-bold text-emerald-600 block mt-0.5">Hedef: ${tireSpecs.normalPressures.fr} PSI</span>
            </div>
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span class="text-[10px] font-bold text-slate-500 block uppercase">Arka Sol (RL)</span>
              <span class="text-xl font-mono font-black text-slate-900 mt-1 block">${v.tires.pressures.rl} PSI</span>
              <span class="text-[10px] font-bold text-emerald-600 block mt-0.5">Hedef: ${tireSpecs.normalPressures.rl} PSI</span>
            </div>
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span class="text-[10px] font-bold text-slate-500 block uppercase">Arka Sağ (RR)</span>
              <span class="text-xl font-mono font-black text-slate-900 mt-1 block">${v.tires.pressures.rr} PSI</span>
              <span class="text-[10px] font-bold text-emerald-600 block mt-0.5">Hedef: ${tireSpecs.normalPressures.rr} PSI</span>
            </div>
          </div>
        </div>

        <!-- Bu Araca Uygun Fabrika Onaylı Lastik Ebatları Tablosu -->
        <div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 card-shadow space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Üretici Onaylı Donanımlar</span>
              <h3 class="text-base font-black text-slate-900 mt-0.5">Bu Araca Uygun Fabrika Lastik Ebatları</h3>
            </div>
            <span class="text-[11px] font-semibold text-slate-500">OEM Ebat Listesi</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th class="py-3 px-3">Lastik Ebadı</th>
                  <th class="py-3 px-3">Jant & Donanım Tipi</th>
                  <th class="py-3 px-3">Normal Basınç (Ön / Arka)</th>
                  <th class="py-3 px-3">Yüklü Basınç (Ön / Arka)</th>
                  <th class="py-3 px-3 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium">
                ${tireSpecs.approvedSizes.map(item => {
                  const isSelected = currentSize === item.size;
                  return `
                    <tr class="hover:bg-slate-50 transition ${isSelected ? 'bg-emerald-50/50 font-bold' : ''}">
                      <td class="py-3.5 px-3 font-mono font-black text-slate-900 text-xs">
                        ${item.size}
                      </td>
                      <td class="py-3.5 px-3 text-slate-700">
                        ${item.trim}
                      </td>
                      <td class="py-3.5 px-3 font-mono text-slate-800">
                        Ön: ${item.normalFront} / Arka: ${item.normalRear} PSI <span class="text-slate-400 text-[10px]">(${item.barNormal})</span>
                      </td>
                      <td class="py-3.5 px-3 font-mono text-slate-800">
                        Ön: ${item.loadedFront} / Arka: ${item.loadedRear} PSI
                      </td>
                      <td class="py-3.5 px-3 text-right">
                        ${isSelected ? `
                          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-[11px]">
                            ✓ Takılı Ebat
                          </span>
                        ` : `
                          <button class="btn-apply-tire-size px-3 py-1 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-[11px] font-bold transition active:scale-95" data-size="${item.size}" data-front="${item.normalFront}" data-rear="${item.normalRear}">
                            Bu Ebadı Seç
                          </button>
                        `}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  function attachMaintenanceScreenEvents() {
    const btnAdd = document.getElementById('btn-maint-add-vehicle');
    if (btnAdd) btnAdd.onclick = () => store.setAddVehicleModalOpen(true);

    const btnOpenTire = document.getElementById('btn-open-tire-modal');
    if (btnOpenTire) btnOpenTire.onclick = () => store.setTireModalOpen(true);

    document.querySelectorAll('.btn-apply-tire-size').forEach(btn => {
      btn.onclick = () => {
        const v = store.getActiveVehicle();
        if (!v) return;
        const size = btn.getAttribute('data-size');
        const front = parseInt(btn.getAttribute('data-front'), 10) || 32;
        const rear = parseInt(btn.getAttribute('data-rear'), 10) || 29;
        store.updateVehicleTires(v.id, {
          size: size,
          pressures: { fl: front, fr: front, rl: rear, rr: rear }
        });
      };
    });
  }

  // --- 15. PİYASA & KRONİK EKRANI ---
  function renderMarketScreen() {
    const v = store.getActiveVehicle();
    if (!v) {
      return `
        <div class="p-12 text-center bg-white rounded-3xl border border-slate-200 card-shadow max-w-xl mx-auto space-y-4">
          <p class="text-sm text-slate-500">Piyasa ve kronik arıza analizini görmek için önce bir araç eklemelisiniz.</p>
          <button id="btn-market-add-vehicle" class="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md">
            + Araç Ekle
          </button>
        </div>
      `;
    }

    const authentic = calculateAuthenticMarketValue(v.brandId, v.model, v.year, v.currentKm, v.enginePackage);
    const exp = getVehicleExpertise(v);
    const summary = calculateExpertiseSummary(exp);

    const currentMarketVal = v.marketValue;
    const minRange = v.marketMin || Math.round(currentMarketVal * 0.94 / 5000) * 5000;
    const maxRange = v.marketMax || Math.round(currentMarketVal * 1.06 / 5000) * 5000;
    const damageDeduction = Math.round(authentic.average * summary.penaltyRate);

    // Durum rozeti metin ve renkleri
    let statusBadgeText = '✓ Hatasız, Boyasız & Tramersiz';
    let statusBadgeCls = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    if (exp.heavyDamage) {
      statusBadgeText = '⚠️ Ağır Hasar (Pert) Kayıtlı';
      statusBadgeCls = 'bg-rose-100 text-rose-800 border border-rose-200';
    } else if (summary.changedCount > 0 || summary.paintCount > 0 || summary.localCount > 0 || exp.tramerAmount > 0) {
      const partsArr = [];
      if (summary.changedCount > 0) partsArr.push(`${summary.changedCount} Değişen`);
      if (summary.paintCount > 0) partsArr.push(`${summary.paintCount} Boyalı`);
      if (summary.localCount > 0) partsArr.push(`${summary.localCount} Lokal`);
      if (exp.tramerAmount > 0) partsArr.push(`Tramer: ${exp.tramerAmount.toLocaleString('tr-TR')} ₺`);
      statusBadgeText = partsArr.join(' • ');
      statusBadgeCls = 'bg-amber-100 text-amber-800 border border-amber-200';
    }

    return `
      <div class="space-y-6 max-w-5xl mx-auto">
        
        <!-- Piyasa Değeri Kartı -->
        <div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 card-shadow space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-center p-2 shrink-0 shadow-2xs">
                ${getBrandLogoSvg(v.brandId || v.brand, 'w-8 h-8')}
              </div>
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">2026 Türkiye İkinci El & Kasko Endeksi</span>
                <h2 class="text-xl font-black text-slate-900 mt-0.5">${v.brand} ${v.model}</h2>
                <p class="text-xs font-bold text-emerald-800">${v.enginePackage}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <span class="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800">
                ${v.marketTrend || '+2.4%'} Yıllık Trend Artışı
              </span>
              <button class="btn-open-expertise-modal px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 active:scale-95 cursor-pointer">
                🛠️ Ekspertiz & Hasar
              </button>
              <button class="btn-open-dates-modal px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition flex items-center gap-1.5 active:scale-95 cursor-pointer">
                ⚙️ Değeri Düzenle
              </button>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 block">Tahmini Piyasa Karşılığı</span>
            <div class="flex items-baseline justify-center gap-1.5">
              <span class="text-3xl sm:text-4xl font-black font-mono text-slate-900">${currentMarketVal.toLocaleString('tr-TR')}</span>
              <span class="text-lg font-bold text-slate-500">₺</span>
            </div>
            <div class="flex items-center justify-center gap-2 flex-wrap pt-0.5">
              <span class="text-xs text-slate-500">Model Yılı: ${v.year} | Güncel KM: ${v.currentKm.toLocaleString('tr-TR')} KM</span>
              <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full ${statusBadgeCls}">
                ${statusBadgeText}
              </span>
            </div>
            
            <div class="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-2 max-w-xl mx-auto">
              <span><b>2026 Pazar Aralığı:</b> ${minRange.toLocaleString('tr-TR')} ₺ - ${maxRange.toLocaleString('tr-TR')} ₺</span>
              ${summary.isHatasiz ? `
                <span class="text-emerald-700 font-bold">Tam Hatasız Emsal</span>
              ` : `
                <span class="text-amber-800 font-bold">Hatasız Emsal: ${authentic.average.toLocaleString('tr-TR')} ₺ (${damageDeduction > 0 ? `-${damageDeduction.toLocaleString('tr-TR')} ₺ Hasar/Boya İndirimi` : ''})</span>
              `}
            </div>
          </div>
        </div>

        <!-- YENİ BÖLÜM: Kaporta Ekspertiz ve Hasar Raporu Kartı -->
        <div id="section-expertise-report" class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 card-shadow space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span class="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100">${Icons.shield('w-5 h-5')}</span>
              <div>
                <h3 class="text-base font-black text-slate-900">Kaporta Ekspertiz ve Hasar Raporu</h3>
                <p class="text-xs text-slate-500">Boya, Değişen Parça, Tramer ve Ağır Hasar Durumu</p>
              </div>
            </div>
            <button class="btn-open-expertise-modal px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer">
              ✏️ Ekspertiz Raporunu Düzenle
            </button>
          </div>

          <!-- 3 Temel Durum Kartı -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="p-4 rounded-2xl border ${exp.heavyDamage ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'}">
              <span class="text-[11px] font-bold text-slate-500 block uppercase">Ağır Hasar / Pert Kaydı</span>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-base font-black ${exp.heavyDamage ? 'text-rose-700' : 'text-slate-900'}">
                  ${exp.heavyDamage ? '⚠️ EVET (Ağır Hasarlı)' : '✓ Hayır (Kayıtsız)'}
                </span>
              </div>
              <p class="text-[10px] ${exp.heavyDamage ? 'text-rose-600 font-semibold' : 'text-slate-400'} mt-0.5">
                ${exp.heavyDamage ? 'Piyasa değerine %28 doğrudan düşüş yansıtıldı.' : 'Sigorta kayıtlarında ağır hasar bulunmuyor.'}
              </p>
            </div>

            <div class="p-4 rounded-2xl border ${exp.tramerAmount > 0 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}">
              <span class="text-[11px] font-bold text-slate-500 block uppercase">Tramer Hasar Tutarı</span>
              <div class="flex items-center gap-1.5 mt-1">
                <span class="text-xl font-black font-mono ${exp.tramerAmount > 0 ? 'text-amber-800' : 'text-slate-900'}">
                  ${(exp.tramerAmount || 0).toLocaleString('tr-TR')}
                </span>
                <span class="text-xs font-bold text-slate-500">₺</span>
              </div>
              <p class="text-[10px] text-slate-500 mt-0.5">
                ${exp.tramerAmount > 0 ? 'SBM / Sigorta tramer hasar kaydı toplamı' : '✓ Hasar kaydı yok (0 ₺)'}
              </p>
            </div>

            <div class="p-4 rounded-2xl border ${exp.sasiPodyeAirbag === 'islemli' ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'}">
              <span class="text-[11px] font-bold text-slate-500 block uppercase">Şasi, Podye, Direk & Airbag</span>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-base font-black ${exp.sasiPodyeAirbag === 'islemli' ? 'text-rose-700' : 'text-emerald-700'}">
                  ${exp.sasiPodyeAirbag === 'islemli' ? '⚠️ İşlemli / Onarımlı' : '✓ Orijinal (Kazasız)'}
                </span>
              </div>
              <p class="text-[10px] text-slate-500 mt-0.5">
                ${exp.sasiPodyeAirbag === 'islemli' ? 'Ana taşıyıcı iskelet veya hava yastığı işlem görmüş' : 'Ana iskelet ve airbagler kusursuz fabrikasyon'}
              </p>
            </div>
          </div>

          <!-- Parça Dağılım İstatistik Çubuğu -->
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
            <span class="text-slate-600 font-semibold">11 Parça Kaporta Durumu:</span>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800">🟢 ${summary.originalCount} Orijinal</span>
              ${summary.localCount > 0 ? `<span class="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800">🟡 ${summary.localCount} Lokal Boya</span>` : ''}
              ${summary.paintCount > 0 ? `<span class="px-2.5 py-1 rounded-xl bg-orange-100 text-orange-800">🟠 ${summary.paintCount} Boyalı</span>` : ''}
              ${summary.changedCount > 0 ? `<span class="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800">🔴 ${summary.changedCount} Değişen</span>` : ''}
            </div>
          </div>

          <!-- 11 Parça Detay Tablosu / Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
            ${EXPERTISE_PARTS.map(part => {
              const st = exp.parts[part.id] || 'orijinal';
              let badgeCls = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              let badgeLabel = 'Orijinal';
              if (st === 'lokal') {
                badgeCls = 'bg-amber-50 text-amber-800 border-amber-200';
                badgeLabel = 'Lokal Boyalı';
              } else if (st === 'boyali') {
                badgeCls = 'bg-orange-50 text-orange-800 border-orange-200';
                badgeLabel = 'Boyalı';
              } else if (st === 'degisen') {
                badgeCls = 'bg-rose-50 text-rose-800 border-rose-200';
                badgeLabel = 'Değişen';
              }

              return `
                <div class="p-3 rounded-xl bg-white border border-slate-200/90 flex items-center justify-between text-xs hover:border-slate-300 transition">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full ${st === 'degisen' ? 'bg-rose-500' : (st === 'boyali' ? 'bg-orange-500' : (st === 'lokal' ? 'bg-amber-400' : 'bg-emerald-500'))}"></span>
                    <span class="font-bold text-slate-800">${part.label}</span>
                  </div>
                  <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-lg border ${badgeCls}">
                    ${badgeLabel}
                  </span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Sahibinden İlan Metni Oluşturucu Kartı -->
        <div class="rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border border-amber-300/80 p-6 sm:p-7 card-shadow space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shrink-0 shadow-md shadow-amber-500/20">
                📢
              </div>
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-amber-900">Otomatik İlan Sihirbazı</span>
                <h3 class="text-lg font-black text-slate-900">Tek Tıkla Sahibinden İlan Metni</h3>
                <p class="text-xs text-slate-600 mt-0.5">Aracınızın tüm teknik donanımı, bakım geçmişi ve kaporta ekspertiz durumundan tek tıkla profesyonel satış ilanı oluşturun.</p>
              </div>
            </div>
            <button type="button" class="btn-open-ad-modal px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 active:scale-95 transition flex items-center justify-center gap-2 shrink-0 cursor-pointer">
              ${Icons.copy('w-4 h-4 text-slate-950')}
              <span>İlan Metnini Aç & Kopyala</span>
            </button>
          </div>
        </div>

        <!-- Kronik Notlar ve Servis Bültenleri -->
        <div id="section-chronic-notes" class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 card-shadow space-y-4 transition-all duration-300">
          <div class="flex items-center gap-3">
            <span class="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-100">${Icons.alertTriangle('w-5 h-5')}</span>
            <div>
              <h3 class="text-base font-black text-slate-900">Kronik Arıza ve Servis Bültenleri</h3>
              <p class="text-xs text-slate-500">${v.brand} ${v.model} İçin Özel Uzman Tavsiyesi</p>
            </div>
          </div>

          <div class="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/90">
            <p class="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              ${v.chronicNote}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span class="text-xs font-black text-slate-900 block flex items-center gap-1.5">
                  🛡️ TÜVTÜRK Muayenesi
                </span>
                <span class="text-[11px] ${v.inspectionDate ? 'text-slate-600 font-semibold' : 'text-amber-700 font-bold'}">
                  ${v.inspectionDate ? `${v.inspectionDate} (${formatRemainingDays(v.inspectionDate).text})` : 'Tarih henüz girilmedi (Ruhsattaki tarihi ekleyin)'}
                </span>
              </div>
              <button class="btn-open-dates-modal px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-[11px] transition">
                ${v.inspectionDate ? 'Düzenle' : '+ Tarih Gir'}
              </button>
            </div>

            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span class="text-xs font-black text-slate-900 block flex items-center gap-1.5">
                  📄 Zorunlu Sigorta
                </span>
                <span class="text-[11px] ${v.insuranceDate ? 'text-slate-600 font-semibold' : 'text-amber-700 font-bold'}">
                  ${v.insuranceDate ? `${v.insuranceDate} (${formatRemainingDays(v.insuranceDate).text})` : 'Tarih henüz girilmedi (Poliçe bitiş tarihini ekleyin)'}
                </span>
              </div>
              <button class="btn-open-dates-modal px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-[11px] transition">
                ${v.insuranceDate ? 'Düzenle' : '+ Tarih Gir'}
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  function attachMarketScreenEvents() {
    const btnAdd = document.getElementById('btn-market-add-vehicle');
    if (btnAdd) btnAdd.onclick = () => store.setAddVehicleModalOpen(true);
    document.querySelectorAll('.btn-open-dates-modal').forEach(b => {
      b.onclick = () => store.setDatesModalOpen(true);
    });
    document.querySelectorAll('.btn-open-expertise-modal').forEach(b => {
      b.onclick = () => store.setExpertiseModalOpen(true);
    });
    document.querySelectorAll('.btn-open-ad-modal').forEach(b => {
      b.onclick = () => store.setAdModalOpen(true);
    });
  }

  // --- 16. PROFİL EKRANI ---
  function renderProfileScreen() {
    const state = store.getState();
    const user = state.user;
    const vehicles = state.vehicles;
    const currentTheme = state.theme || 'light';

    return `
      <div class="space-y-6 max-w-4xl mx-auto pb-6">
        <div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 card-shadow">
          <div class="flex items-center gap-4 sm:gap-6">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
              ${user.avatarText}
            </div>
            <div>
              <h2 class="text-lg sm:text-xl font-black text-slate-900">Kişisel Profilim & Ayarlar</h2>
              <p class="text-xs text-slate-500 mt-0.5">Kayıtlı Araç Sayısı: ${vehicles.length}</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">● Çevrimiçi Bulut Senkronizasyonu</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Görünüm ve Tema Seçimi Kartı -->
        <div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 card-shadow space-y-4">
          <div class="border-b border-slate-100 pb-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🎨</span>
                <div>
                  <h3 class="text-sm sm:text-base font-black text-slate-900">Görünüm & Tema Tercihi</h3>
                  <p class="text-xs text-slate-500 mt-0.5">Göz konforunuza uygun renk modunu seçin. Tercihiniz bu cihazda otomatik hatırlanır.</p>
                </div>
              </div>
              <span class="text-xs font-bold px-2.5 py-1 rounded-full ${currentTheme === 'dark' ? 'bg-slate-800 text-slate-200 border border-slate-700' : 'bg-amber-100 text-amber-800 border border-amber-200'}">
                ${currentTheme === 'dark' ? '🌙 Koyu Mod Aktif' : '☀️ Açık Mod Aktif'}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <!-- Açık Tema / Gündüz Modu -->
            <button type="button" class="btn-select-theme p-4 sm:p-5 rounded-2xl border-2 transition cursor-pointer text-left flex items-start gap-4 active:scale-98 ${currentTheme === 'light' ? 'border-emerald-500 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'}" data-theme="light">
              <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
                ${Icons.sun('w-6 h-6')}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <h4 class="text-sm font-black text-slate-900">Açık Tema</h4>
                  ${currentTheme === 'light' ? '<span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white">Kullanılıyor</span>' : ''}
                </div>
                <p class="text-[11px] font-semibold text-emerald-700 mt-0.5">Gündüz Modu</p>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Aydınlık ve ferah görünüm; gün ışığında yüksek netlik ve kolay okunabilirlik sağlar.</p>
              </div>
            </button>

            <!-- Koyu Tema / Gece Kokpit Modu -->
            <button type="button" class="btn-select-theme p-4 sm:p-5 rounded-2xl border-2 transition cursor-pointer text-left flex items-start gap-4 active:scale-98 ${currentTheme === 'dark' ? 'border-emerald-500 bg-slate-800/60 shadow-xs ring-1 ring-emerald-500/30' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'}" data-theme="dark">
              <div class="w-12 h-12 rounded-2xl bg-indigo-900/40 text-indigo-400 flex items-center justify-center shrink-0 shadow-xs">
                ${Icons.moon('w-6 h-6')}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <h4 class="text-sm font-black text-slate-900">Koyu Tema</h4>
                  ${currentTheme === 'dark' ? '<span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold">Kullanılıyor</span>' : ''}
                </div>
                <p class="text-[11px] font-semibold text-indigo-600 mt-0.5">Gece & Kokpit Modu</p>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Göz yormayan siyah/koyu gri tasarım; gece sürüşünde ve loş ışıkta konforlu kullanım sağlar.</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Telefona Uygulama Olarak Ekleme Kartı -->
        <div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 card-shadow space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">📲</span>
              <div>
                <h3 class="text-sm font-black text-slate-900">Telefona Uygulama Olarak Ekle</h3>
                <p class="text-xs text-slate-500">App Store veya Google Play Store gerekmeden telefonunuzun ana ekranına ekleyin.</p>
              </div>
            </div>
            <button id="btn-profile-pwa" class="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200 transition cursor-pointer">
              Nasıl Yapılır?
            </button>
          </div>
        </div>

        <!-- Garajı Sıfırla Butonu -->
        <div class="pt-2">
          <button type="button" id="btn-clear-garage" class="w-full py-4 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-bold text-xs transition active:scale-95 flex items-center justify-center gap-2 border border-slate-200 hover:border-rose-200">
            ${Icons.trash('w-4 h-4')} Garajı Sıfırla / Tüm Araçları Sil
          </button>
        </div>
      </div>
    `;
  }

  function attachProfileScreenEvents() {
    const btnClear = document.getElementById('btn-clear-garage');
    if (btnClear) btnClear.onclick = () => {
      if (confirm('Garajınızdaki tüm araçları silmek ve sıfırdan başlamak istiyor musunuz?')) {
        store.clearAllVehicles();
      }
    };

    const btnPwa = document.getElementById('btn-profile-pwa');
    if (btnPwa) btnPwa.onclick = () => store.setPwaModalOpen(true);

    document.querySelectorAll('.btn-select-theme').forEach(btn => {
      btn.onclick = () => {
        const theme = btn.getAttribute('data-theme');
        store.setTheme(theme);
      };
    });
  }

  // --- 17. HIZLI KM GÜNCELLEME MODALI ---
  function renderQuickKmModal() {
    const state = store.getState();
    if (!state.isKmModalOpen) return '';
    const v = store.getActiveVehicle();
    if (!v) return '';

    return `
      <div id="km-modal-backdrop" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
        <div class="bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl animate-slide-up sm:animate-modal-scale text-slate-900">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 class="font-black text-lg text-slate-900">Güncel KM Güncelle</h3>
            <button id="btn-close-km-modal" class="p-2 text-slate-400 hover:text-slate-700 rounded-full">
              ${Icons.close('w-5 h-5')}
            </button>
          </div>

          <div class="my-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex justify-between items-center">
            ${renderPlateBadge(v.plate, 'sm')}
            <span class="text-sm font-bold text-emerald-700 font-mono">${v.currentKm.toLocaleString('tr-TR')} KM</span>
          </div>

          <div class="mb-4">
            <label class="text-xs font-bold text-slate-700 block mb-2">Hızlı KM Ekle</label>
            <div class="grid grid-cols-4 gap-2">
              <button class="btn-quick-add py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 border border-slate-200 active:scale-95" data-add="100">+100</button>
              <button class="btn-quick-add py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 border border-slate-200 active:scale-95" data-add="250">+250</button>
              <button class="btn-quick-add py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 border border-slate-200 active:scale-95" data-add="500">+500</button>
              <button class="btn-quick-add py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 border border-slate-200 active:scale-95" data-add="1000">+1.000</button>
            </div>
          </div>

          <div class="mb-5">
            <input type="number" id="input-new-km" min="${v.currentKm}" value="${v.currentKm}" class="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:bg-white rounded-2xl py-3.5 px-4 text-xl font-bold font-mono text-slate-900 outline-none transition" />
          </div>

          <div class="flex gap-3 pt-1">
            <button type="button" id="btn-cancel-km" class="flex-1 py-3.5 rounded-2xl bg-slate-100 text-slate-700 font-semibold text-xs active:scale-95">Vazgeç</button>
            <button type="button" id="btn-save-km" class="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 active:scale-95">Kaydet</button>
          </div>
        </div>
      </div>
    `;
  }

  function attachKmModalEvents() {
    const state = store.getState();
    if (!state.isKmModalOpen) return;
    const v = store.getActiveVehicle();
    const close = () => store.setKmModalOpen(false);
    const bClose = document.getElementById('btn-close-km-modal');
    if (bClose) bClose.onclick = close;
    const bCancel = document.getElementById('btn-cancel-km');
    if (bCancel) bCancel.onclick = close;

    const input = document.getElementById('input-new-km');
    document.querySelectorAll('.btn-quick-add').forEach(b => {
      b.onclick = () => {
        const add = parseInt(b.getAttribute('data-add'), 10);
        input.value = (parseInt(input.value, 10) || v.currentKm) + add;
      };
    });

    const bSave = document.getElementById('btn-save-km');
    if (bSave) bSave.onclick = () => store.updateVehicleKm(input.value);
  }

  // --- 17.5 TARİH & PİYASA DEĞERLEME DÜZENLEME MODALI ---
  function renderDatesAndValuationModal() {
    const state = store.getState();
    if (!state.isDatesModalOpen) return '';
    const v = store.getActiveVehicle();
    if (!v) return '';

    const authenticVal = calculateAuthenticMarketValue(v.brandId, v.model, v.year, v.currentKm, v.enginePackage);

    return `
      <div id="dates-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
        <div class="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-7 space-y-5 animate-modal-scale text-slate-900 max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                ${getBrandLogoSvg(v.brandId || v.brand, 'w-6 h-6')}
              </div>
              <div>
                <h3 class="font-black text-lg text-slate-900 leading-tight">Tarih & Piyasa Değerleme Ayarı</h3>
                <p class="text-xs text-slate-500">${v.brand} ${v.model} (${v.plate})</p>
              </div>
            </div>
            <button id="btn-close-dates-modal" class="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition">${Icons.close('w-5 h-5')}</button>
          </div>

          <!-- 1. TÜVTÜRK Muayene Tarihi -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                🛡️ TÜVTÜRK Muayene Geçerlilik Tarihi
              </label>
              <button type="button" id="btn-clear-insp-date" class="text-[11px] font-bold text-red-600 hover:underline">Temizle (Belli Değil)</button>
            </div>
            <input type="date" id="input-edit-insp-date" value="${v.inspectionDate || ''}" class="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500" />
            <p class="text-[11px] text-slate-500">${v.inspectionDate ? formatRemainingDays(v.inspectionDate).text : 'Ruhsatınızdaki resmi muayene son geçerlilik tarihini seçebilirsiniz.'}</p>
          </div>

          <!-- 2. Zorunlu Sigorta Bitiş Tarihi -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                📄 Zorunlu Trafik Sigortası Bitiş Tarihi
              </label>
              <button type="button" id="btn-clear-ins-date" class="text-[11px] font-bold text-red-600 hover:underline">Temizle (Belli Değil)</button>
            </div>
            <input type="date" id="input-edit-ins-date" value="${v.insuranceDate || ''}" class="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500" />
            <p class="text-[11px] text-slate-500">${v.insuranceDate ? formatRemainingDays(v.insuranceDate).text : 'Sigorta poliçenizdeki vade bitiş tarihini seçebilirsiniz.'}</p>
          </div>

          <!-- 3. Piyasa Değeri -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div class="flex items-center justify-between flex-wrap gap-1">
              <label class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                💰 Piyasa / Kasko Karşılığı (₺)
              </label>
              <button type="button" id="btn-reset-market-val" class="text-[11px] font-bold text-emerald-700 hover:underline">
                Önerilen Pazar Değerini Al (${authenticVal.average.toLocaleString('tr-TR')} ₺)
              </button>
            </div>
            <input type="number" id="input-edit-market-val" value="${v.marketValue}" class="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-sm font-mono font-bold text-slate-900 outline-none focus:border-emerald-500" />
            <div class="text-[11px] text-slate-500 flex items-center justify-between pt-1">
              <span>Pazar Aralığı: <b>${authenticVal.min.toLocaleString('tr-TR')} ₺</b> - <b>${authenticVal.max.toLocaleString('tr-TR')} ₺</b></span>
              <span class="text-emerald-700 font-bold">${authenticVal.trend} Trend</span>
            </div>
            <p class="text-[10px] text-slate-500">
              Aracınızın ağır hasar kaydı ve boya/değişen durumuna göre otomatik fiyatlama için:
              <button type="button" id="btn-open-exp-from-dates" class="text-emerald-700 font-bold hover:underline cursor-pointer">
                🛠️ Kaporta & Ekspertiz Raporunu Aç →
              </button>
            </p>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button id="btn-cancel-dates-modal" class="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs active:scale-95 transition">Vazgeç</button>
            <button id="btn-save-dates-modal" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs active:scale-95 shadow-md shadow-emerald-600/25 transition">Kaydet ve Güncelle</button>
          </div>
        </div>
      </div>
    `;
  }

  function attachDatesAndValuationModalEvents() {
    const state = store.getState();
    if (!state.isDatesModalOpen) return;
    const v = store.getActiveVehicle();
    if (!v) return;

    const close = () => store.setDatesModalOpen(false);
    const bClose = document.getElementById('btn-close-dates-modal');
    if (bClose) bClose.onclick = close;
    const bCancel = document.getElementById('btn-cancel-dates-modal');
    if (bCancel) bCancel.onclick = close;

    const inInsp = document.getElementById('input-edit-insp-date');
    const inIns = document.getElementById('input-edit-ins-date');
    const inMarket = document.getElementById('input-edit-market-val');

    const bClearInsp = document.getElementById('btn-clear-insp-date');
    if (bClearInsp && inInsp) {
      bClearInsp.onclick = () => { inInsp.value = ''; };
    }

    const bClearIns = document.getElementById('btn-clear-ins-date');
    if (bClearIns && inIns) {
      bClearIns.onclick = () => { inIns.value = ''; };
    }

    const bResetMarket = document.getElementById('btn-reset-market-val');
    if (bResetMarket && inMarket) {
      bResetMarket.onclick = () => {
        const authentic = calculateAuthenticMarketValue(v.brandId, v.model, v.year, v.currentKm, v.enginePackage);
        inMarket.value = authentic.average;
      };
    }

    const bOpenExp = document.getElementById('btn-open-exp-from-dates');
    if (bOpenExp) {
      bOpenExp.onclick = () => {
        store.setDatesModalOpen(false);
        store.setExpertiseModalOpen(true);
      };
    }

    const bSave = document.getElementById('btn-save-dates-modal');
    if (bSave) {
      bSave.onclick = () => {
        const inspVal = inInsp ? inInsp.value.trim() : null;
        const insVal = inIns ? inIns.value.trim() : null;
        const marketVal = inMarket ? parseInt(inMarket.value, 10) : v.marketValue;

        store.updateVehicleDatesAndValuation(v.id, {
          inspectionDate: inspVal || null,
          insuranceDate: insVal || null,
          marketValue: isNaN(marketVal) ? v.marketValue : marketVal
        });
      };
    }
  }

  // --- 17.6 LASTİK & BASINÇ AYARLAMA MODALI ---
  function renderTireModal() {
    const state = store.getState();
    if (!state.isTireModalOpen) return '';
    const v = store.getActiveVehicle();
    if (!v) return '';

    const tireSpecs = getVehicleTireSpecs(v.brandId, v.model, v.enginePackage);
    const curSize = (v.tires && v.tires.size && v.tires.size !== 'Fabrika Ebadı') ? v.tires.size : tireSpecs.defaultSize;
    const curPressures = v.tires?.pressures || tireSpecs.normalPressures;
    const curSeason = v.tires?.season || '4 Mevsim';
    const curTread = v.tires?.treadDepthMm || 6.8;

    return `
      <div id="tire-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
        <div class="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-7 space-y-5 animate-modal-scale text-slate-900 max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                ${getBrandLogoSvg(v.brandId || v.brand, 'w-6 h-6')}
              </div>
              <div>
                <h3 class="font-black text-lg text-slate-900 leading-tight">Lastik ve Basınç Ayarı</h3>
                <p class="text-xs text-slate-500">${v.brand} ${v.model} (${v.plate})</p>
              </div>
            </div>
            <button id="btn-close-tire-modal" class="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition">${Icons.close('w-5 h-5')}</button>
          </div>

          <!-- 1. Takılı Lastik Ebadı -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <label class="text-xs font-black text-slate-800 flex items-center gap-1.5">
              🛞 Takılı Lastik Ebadı
            </label>
            <select id="select-tire-size" class="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500">
              ${tireSpecs.approvedSizes.map(item => `
                <option value="${item.size}" ${curSize === item.size ? 'selected' : ''}>
                  ${item.size} (${item.trim} - Önerilen: ${item.normalFront}/${item.normalRear} PSI)
                </option>
              `).join('')}
              <option value="custom" ${!tireSpecs.approvedSizes.some(i => i.size === curSize) ? 'selected' : ''}>+ Farklı / Özel Ebat Yaz</option>
            </select>
            <input type="text" id="input-custom-tire-size" placeholder="Örn: 195/65 R15 91H" value="${curSize}" class="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500 mt-2 ${tireSpecs.approvedSizes.some(i => i.size === curSize) ? 'hidden' : ''}" />
            <p class="text-[11px] text-slate-500">Fabrika etiketindeki onaylı ebatlar listelenmiştir. Farklı bir jant/lastik takılıysa belirtebilirsiniz.</p>
          </div>

          <!-- 2. Mevsim ve Diş Derinliği -->
          <div class="grid grid-cols-2 gap-3">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <label class="text-xs font-black text-slate-800">Mevsim Tipi</label>
              <select id="select-tire-season" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-2.5 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500">
                <option value="4 Mevsim" ${curSeason === '4 Mevsim' ? 'selected' : ''}>4 Mevsim (All Season)</option>
                <option value="Yazlık" ${curSeason === 'Yazlık' ? 'selected' : ''}>Yazlık Lastik</option>
                <option value="Kışlık" ${curSeason === 'Kışlık' ? 'selected' : ''}>Kışlık Lastik</option>
              </select>
            </div>
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <label class="text-xs font-black text-slate-800">Diş Derinliği (mm)</label>
              <input type="number" step="0.1" id="input-tire-tread" value="${curTread}" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-2.5 text-xs font-bold font-mono text-slate-900 outline-none focus:border-emerald-500" />
            </div>
          </div>

          <!-- 3. Tekerlek Basınçları (PSI) -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div class="flex items-center justify-between">
              <label class="text-xs font-black text-slate-800">
                4 Tekerlek Hava Basınçları (PSI)
              </label>
              <button type="button" id="btn-reset-pressures-oem" class="text-[11px] font-bold text-emerald-700 hover:underline">
                Kapı İçi Etiketine Eşitle
              </button>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label class="text-[10px] font-bold text-slate-500 block mb-1">Ön Sol (FL)</label>
                <input type="number" id="input-psi-fl" value="${curPressures.fl || 32}" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-2 text-center text-sm font-mono font-bold text-slate-900 outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label class="text-[10px] font-bold text-slate-500 block mb-1">Ön Sağ (FR)</label>
                <input type="number" id="input-psi-fr" value="${curPressures.fr || 32}" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-2 text-center text-sm font-mono font-bold text-slate-900 outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label class="text-[10px] font-bold text-slate-500 block mb-1">Arka Sol (RL)</label>
                <input type="number" id="input-psi-rl" value="${curPressures.rl || 29}" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-2 text-center text-sm font-mono font-bold text-slate-900 outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label class="text-[10px] font-bold text-slate-500 block mb-1">Arka Sağ (RR)</label>
                <input type="number" id="input-psi-rr" value="${curPressures.rr || 29}" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-2 text-center text-sm font-mono font-bold text-slate-900 outline-none focus:border-emerald-500" />
              </div>
            </div>
            <p class="text-[10px] text-slate-500">
              📌 <b>Etiket Notu:</b> ${tireSpecs.pressureBasis} (Normal Sürüş: Ön ${tireSpecs.normalPressures.fl} PSI, Arka ${tireSpecs.normalPressures.rl} PSI)
            </p>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button id="btn-cancel-tire-modal" class="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs active:scale-95 transition">Vazgeç</button>
            <button id="btn-save-tire-modal" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs active:scale-95 shadow-md shadow-emerald-600/25 transition">Kaydet ve Güncelle</button>
          </div>
        </div>
      </div>
    `;
  }

  function attachTireModalEvents() {
    const state = store.getState();
    if (!state.isTireModalOpen) return;
    const v = store.getActiveVehicle();
    if (!v) return;

    const tireSpecs = getVehicleTireSpecs(v.brandId, v.model, v.enginePackage);

    const close = () => store.setTireModalOpen(false);
    const bClose = document.getElementById('btn-close-tire-modal');
    if (bClose) bClose.onclick = close;
    const bCancel = document.getElementById('btn-cancel-tire-modal');
    if (bCancel) bCancel.onclick = close;

    const selSize = document.getElementById('select-tire-size');
    const inCustomSize = document.getElementById('input-custom-tire-size');
    if (selSize && inCustomSize) {
      selSize.onchange = () => {
        if (selSize.value === 'custom') {
          inCustomSize.classList.remove('hidden');
          inCustomSize.focus();
        } else {
          inCustomSize.classList.add('hidden');
          inCustomSize.value = selSize.value;
          const match = tireSpecs.approvedSizes.find(i => i.size === selSize.value);
          if (match) {
            const fl = document.getElementById('input-psi-fl');
            const fr = document.getElementById('input-psi-fr');
            const rl = document.getElementById('input-psi-rl');
            const rr = document.getElementById('input-psi-rr');
            if (fl) fl.value = match.normalFront;
            if (fr) fr.value = match.normalFront;
            if (rl) rl.value = match.normalRear;
            if (rr) rr.value = match.normalRear;
          }
        }
      };
    }

    const bResetOem = document.getElementById('btn-reset-pressures-oem');
    if (bResetOem) {
      bResetOem.onclick = () => {
        const fl = document.getElementById('input-psi-fl');
        const fr = document.getElementById('input-psi-fr');
        const rl = document.getElementById('input-psi-rl');
        const rr = document.getElementById('input-psi-rr');
        if (fl) fl.value = tireSpecs.normalPressures.fl;
        if (fr) fr.value = tireSpecs.normalPressures.fr;
        if (rl) rl.value = tireSpecs.normalPressures.rl;
        if (rr) rr.value = tireSpecs.normalPressures.rr;
      };
    }

    const bSave = document.getElementById('btn-save-tire-modal');
    if (bSave) {
      bSave.onclick = () => {
        const finalSize = (selSize && selSize.value === 'custom') ? (inCustomSize?.value || tireSpecs.defaultSize) : (selSize?.value || tireSpecs.defaultSize);
        const season = document.getElementById('select-tire-season')?.value || '4 Mevsim';
        const tread = parseFloat(document.getElementById('input-tire-tread')?.value) || 6.8;
        const fl = parseInt(document.getElementById('input-psi-fl')?.value, 10) || 32;
        const fr = parseInt(document.getElementById('input-psi-fr')?.value, 10) || 32;
        const rl = parseInt(document.getElementById('input-psi-rl')?.value, 10) || 29;
        const rr = parseInt(document.getElementById('input-psi-rr')?.value, 10) || 29;

        store.updateVehicleTires(v.id, {
          size: finalSize,
          season: season,
          treadDepthMm: tread,
          pressures: { fl, fr, rl, rr }
        });
      };
    }
  }

  // --- 17.7 KAPORTA EKSPERTİZ & HASAR DÜZENLEME MODALI ---
  function renderExpertiseModal() {
    const state = store.getState();
    if (!state.isExpertiseModalOpen) return '';
    const v = store.getActiveVehicle();
    if (!v) return '';

    const exp = getVehicleExpertise(v);
    const authentic = calculateAuthenticMarketValue(v.brandId, v.model, v.year, v.currentKm, v.enginePackage);

    return `
      <div id="expertise-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
        <div class="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 space-y-5 animate-modal-scale text-slate-900 max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                ${getBrandLogoSvg(v.brandId || v.brand, 'w-6 h-6')}
              </div>
              <div>
                <h3 class="font-black text-lg text-slate-900 leading-tight">Araç Ekspertiz & Hasar Düzenleme</h3>
                <p class="text-xs text-slate-500">${v.brand} ${v.model} (${v.plate})</p>
              </div>
            </div>
            <button id="btn-close-expertise-modal" class="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition">${Icons.close('w-5 h-5')}</button>
          </div>

          <!-- Hızlı Seçim Butonu -->
          <div class="flex items-center justify-between flex-wrap gap-2 p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
            <span class="text-xs font-bold text-emerald-950">✨ Aracınızda boya ve değişen yok mu?</span>
            <button type="button" id="btn-quick-all-original" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition active:scale-95 shadow-xs cursor-pointer">
              Tüm Parçaları Orijinal / Hatasız Yap
            </button>
          </div>

          <!-- Bölüm 1: Ağır Hasar, Tramer ve Taşıyıcı İskelet -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <!-- Ağır Hasar -->
            <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <label class="text-[11px] font-black text-slate-800 block">Ağır Hasar (Pert) Kaydı</label>
              <select id="input-exp-heavy" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-2.5 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500">
                <option value="false" ${!exp.heavyDamage ? 'selected' : ''}>Hayır (Kayıtsız)</option>
                <option value="true" ${exp.heavyDamage ? 'selected' : ''}>⚠️ Evet (Ağır Hasarlı)</option>
              </select>
            </div>

            <!-- Tramer Tutarı -->
            <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <label class="text-[11px] font-black text-slate-800 block">Tramer Hasar Tutarı (₺)</label>
              <input type="number" id="input-exp-tramer" value="${exp.tramerAmount || 0}" min="0" step="500" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-2.5 text-xs font-mono font-bold text-slate-900 outline-none focus:border-emerald-500" />
            </div>

            <!-- Şasi / Podye / Airbag -->
            <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <label class="text-[11px] font-black text-slate-800 block">Şasi / Podye / Airbag</label>
              <select id="input-exp-sasi" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-2.5 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500">
                <option value="orijinal" ${exp.sasiPodyeAirbag === 'orijinal' ? 'selected' : ''}>✓ Orijinal (Kazasız)</option>
                <option value="islemli" ${exp.sasiPodyeAirbag === 'islemli' ? 'selected' : ''}>⚠️ İşlemli / Onarımlı</option>
              </select>
            </div>
          </div>

          <!-- Bölüm 2: 11 Parça Kaporta Ekspertizi -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-black uppercase tracking-wider text-slate-700">11 Parça Kaporta Durumu</h4>
              <span class="text-[11px] text-slate-500 font-medium">Her parça için durumu seçin</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[38vh] overflow-y-auto p-1 border border-slate-100 rounded-2xl">
              ${EXPERTISE_PARTS.map(part => {
                const curStatus = exp.parts[part.id] || 'orijinal';
                return `
                  <div class="p-3 bg-slate-50/80 rounded-xl border border-slate-200/90 flex items-center justify-between gap-2">
                    <span class="text-xs font-bold text-slate-900">${part.label}</span>
                    <select class="exp-part-select bg-white border border-slate-300 rounded-lg py-1 px-2 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500 cursor-pointer" data-part="${part.id}">
                      <option value="orijinal" ${curStatus === 'orijinal' ? 'selected' : ''}>🟢 Orijinal</option>
                      <option value="lokal" ${curStatus === 'lokal' ? 'selected' : ''}>🟡 Lokal Boya</option>
                      <option value="boyali" ${curStatus === 'boyali' ? 'selected' : ''}>🟠 Boyalı</option>
                      <option value="degisen" ${curStatus === 'degisen' ? 'selected' : ''}>🔴 Değişen</option>
                    </select>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Canlı Bilgilendirme -->
          <div class="p-3.5 bg-slate-100/80 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div class="flex items-center justify-between font-bold">
              <span>Hatasız Fabrika Emsal Fiyatı:</span>
              <span class="font-mono text-slate-900">${authentic.average.toLocaleString('tr-TR')} ₺</span>
            </div>
            <p class="text-[11px] text-slate-500">Kaydettiğinizde aracın 2026 piyasa karşılığı boya, değişen ve ağır hasar oranına göre anında güncellenir.</p>
          </div>

          <!-- Alt Butonlar -->
          <div class="flex justify-end gap-3 pt-2">
            <button id="btn-cancel-expertise-modal" class="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs active:scale-95 transition cursor-pointer">Vazgeç</button>
            <button id="btn-save-expertise-modal" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs active:scale-95 shadow-md shadow-emerald-600/25 transition cursor-pointer">Kaydet ve Değeri Güncelle</button>
          </div>
        </div>
      </div>
    `;
  }

  function attachExpertiseModalEvents() {
    const state = store.getState();
    if (!state.isExpertiseModalOpen) return;
    const v = store.getActiveVehicle();
    if (!v) return;

    const close = () => store.setExpertiseModalOpen(false);
    const bClose = document.getElementById('btn-close-expertise-modal');
    if (bClose) bClose.onclick = close;
    const bCancel = document.getElementById('btn-cancel-expertise-modal');
    if (bCancel) bCancel.onclick = close;

    const bQuick = document.getElementById('btn-quick-all-original');
    if (bQuick) {
      bQuick.onclick = () => {
        document.querySelectorAll('.exp-part-select').forEach(sel => {
          sel.value = 'orijinal';
        });
        const inHeavy = document.getElementById('input-exp-heavy');
        if (inHeavy) inHeavy.value = 'false';
        const inTramer = document.getElementById('input-exp-tramer');
        if (inTramer) inTramer.value = '0';
        const inSasi = document.getElementById('input-exp-sasi');
        if (inSasi) inSasi.value = 'orijinal';
      };
    }

    const bSave = document.getElementById('btn-save-expertise-modal');
    if (bSave) {
      bSave.onclick = () => {
        const inHeavy = document.getElementById('input-exp-heavy');
        const inTramer = document.getElementById('input-exp-tramer');
        const inSasi = document.getElementById('input-exp-sasi');

        const parts = {};
        document.querySelectorAll('.exp-part-select').forEach(sel => {
          const partId = sel.getAttribute('data-part');
          if (partId) parts[partId] = sel.value;
        });

        store.updateVehicleExpertise(v.id, {
          heavyDamage: inHeavy ? (inHeavy.value === 'true') : false,
          tramerAmount: inTramer ? (parseInt(inTramer.value, 10) || 0) : 0,
          sasiPodyeAirbag: inSasi ? inSasi.value : 'orijinal',
          parts: parts
        });
      };
    }
  }

  // --- 17.8 YAKIT & KM MALİYET TAKİP MODALI ---
  function renderFuelModal() {
    const state = store.getState();
    if (!state.isFuelModalOpen) return '';
    const v = store.getActiveVehicle();
    if (!v) return '';

    const stats = getVehicleFuelStats(v);
    const logs = v.fuelLogs || [];

    return `
      <div id="fuel-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
        <div class="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 space-y-6 animate-modal-scale text-slate-900 max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 shadow-2xs font-bold text-lg">
                ⛽
              </div>
              <div>
                <h3 class="font-black text-lg text-slate-900 leading-tight">Yakıt & KM Başı Maliyet Takibi</h3>
                <p class="text-xs text-slate-500">${v.brand} ${v.model} (${v.plate})</p>
              </div>
            </div>
            <button id="btn-close-fuel-modal" class="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition">${Icons.close('w-5 h-5')}</button>
          </div>

          <!-- 4 Temel Özet Kartı -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-200">
              <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-900 block">Ortalama Tüketim</span>
              <span class="text-lg font-black font-mono text-indigo-950 mt-1 block">${stats.avgLitersPer100}</span>
              <span class="text-[10px] font-semibold text-indigo-700">${stats.unitLabel}</span>
            </div>
            <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">KM Başına</span>
              <span class="text-lg font-black font-mono text-slate-900 mt-1 block">${stats.costPerKm} ₺</span>
              <span class="text-[10px] font-semibold text-slate-500">Maliyet / KM</span>
            </div>
            <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Toplam Harcama</span>
              <span class="text-lg font-black font-mono text-slate-900 mt-1 block">${stats.totalSpent.toLocaleString('tr-TR')} ₺</span>
              <span class="text-[10px] font-semibold text-slate-500">${stats.logCount} Adet Dolum</span>
            </div>
            <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Toplam Yakıt</span>
              <span class="text-lg font-black font-mono text-slate-900 mt-1 block">${stats.totalLiters}</span>
              <span class="text-[10px] font-semibold text-slate-500">Litre / Birim</span>
            </div>
          </div>

          <!-- Yeni Yakıt Fişi Ekleme Formu -->
          <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <h4 class="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span>⛽</span> Yeni Yakıt Dolumu Ekle
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="text-[11px] font-bold text-slate-600 block mb-1">Dolum Tarihi</label>
                <input type="date" id="input-fuel-date" value="${new Date().toISOString().split('T')[0]}" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="text-[11px] font-bold text-slate-600 block mb-1">Dolum Anındaki Güncel KM</label>
                <input type="number" id="input-fuel-km" value="${v.currentKm}" min="${v.currentKm}" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-mono font-bold text-slate-800 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="text-[11px] font-bold text-slate-600 block mb-1">Alınan Yakıt (Litre / Birim)</label>
                <input type="number" id="input-fuel-liters" step="0.01" min="1" placeholder="Örn: 42.5" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-mono font-bold text-slate-800 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="text-[11px] font-bold text-slate-600 block mb-1">Toplam Tutar (₺)</label>
                <input type="number" id="input-fuel-cost" step="0.5" min="10" placeholder="Örn: 1950" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-mono font-bold text-slate-800 outline-none focus:border-indigo-500" />
              </div>
              <div class="sm:col-span-2">
                <label class="text-[11px] font-bold text-slate-600 block mb-1">İstasyon & Not (İsteğe Bağlı)</label>
                <input type="text" id="input-fuel-station" placeholder="Örn: Opet - Şehirlerarası Uzun Yol" class="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-indigo-500" />
              </div>
            </div>

            <div class="flex justify-end pt-1">
              <button type="button" id="btn-save-fuel-log" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md shadow-indigo-600/20 active:scale-95 transition cursor-pointer flex items-center gap-1.5">
                ${Icons.plus('w-4 h-4')}
                <span>Fişi Kaydet & Hesapla</span>
              </button>
            </div>
          </div>

          <!-- Yakıt Geçmişi Listesi -->
          <div class="space-y-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-slate-700">Geçmiş Dolum Kayıtları</h4>
            ${logs.length === 0 ? `
              <div class="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-xs text-slate-500 space-y-1">
                <p class="font-bold text-slate-700">Henüz yakıt fişi eklenmedi.</p>
                <p>Her dolum yaptığınızda fişinizi buraya ekleyerek aracınızın gerçek tüketimini ve kuruşu kuruşuna KM başı masrafını görebilirsiniz.</p>
              </div>
            ` : `
              <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
                ${logs.map(item => {
                  const unitPrice = item.liters > 0 ? (item.totalCost / item.liters).toFixed(2) : '0';
                  return `
                    <div class="p-3 bg-white rounded-2xl border border-slate-200/90 flex items-center justify-between gap-3 text-xs shadow-2xs hover:border-slate-300 transition">
                      <div class="flex items-center gap-3">
                        <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">⛽</span>
                        <div>
                          <div class="flex items-center gap-2">
                            <span class="font-mono font-black text-slate-900">${item.km.toLocaleString('tr-TR')} KM</span>
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">${item.station || 'İstasyon'}</span>
                          </div>
                          <p class="text-[11px] text-slate-400 mt-0.5">${item.date} • Litre Fiyatı: ${unitPrice} ₺/L</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <div class="text-right">
                          <span class="font-mono font-black text-slate-900 block">${item.totalCost.toLocaleString('tr-TR')} ₺</span>
                          <span class="text-[11px] font-mono text-indigo-700 font-bold block">${item.liters} L</span>
                        </div>
                        <button type="button" class="btn-delete-fuel-log p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer" data-id="${item.id}" title="Kaydı Sil">
                          ${Icons.trash('w-4 h-4')}
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>

        </div>
      </div>
    `;
  }

  function attachFuelModalEvents() {
    const state = store.getState();
    if (!state.isFuelModalOpen) return;
    const v = store.getActiveVehicle();
    if (!v) return;

    const close = () => store.setFuelModalOpen(false);
    const bClose = document.getElementById('btn-close-fuel-modal');
    if (bClose) bClose.onclick = close;

    const backdrop = document.getElementById('fuel-modal-backdrop');
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) close();
      };
    }

    const bSave = document.getElementById('btn-save-fuel-log');
    if (bSave) {
      bSave.onclick = () => {
        const inDate = document.getElementById('input-fuel-date')?.value;
        const inKm = document.getElementById('input-fuel-km')?.value;
        const inLiters = document.getElementById('input-fuel-liters')?.value;
        const inCost = document.getElementById('input-fuel-cost')?.value;
        const inStation = (document.getElementById('input-fuel-station')?.value || '').trim();

        if (!inLiters || parseFloat(inLiters) <= 0) {
          store.showToast('Lütfen alınan yakıt miktarını (litre) girin!', 'warning');
          return;
        }
        if (!inCost || parseFloat(inCost) <= 0) {
          store.showToast('Lütfen toplam ödenen tutarı (₺) girin!', 'warning');
          return;
        }

        store.addFuelLog(v.id, {
          date: inDate,
          km: inKm,
          liters: inLiters,
          totalCost: inCost,
          station: inStation || 'Akaryakıt İstasyonu'
        });
      };
    }

    document.querySelectorAll('.btn-delete-fuel-log').forEach(btn => {
      btn.onclick = () => {
        const logId = btn.getAttribute('data-id');
        if (logId) {
          store.deleteFuelLog(v.id, logId);
        }
      };
    });
  }

  // --- 17.9 SAHİBİNDEN İLAN METNİ OLUŞTURUCU MODALI ---
  function renderAdGeneratorModal() {
    const state = store.getState();
    if (!state.isAdModalOpen) return '';
    const v = store.getActiveVehicle();
    if (!v) return '';

    const adText = generateSahibindenAdText(v);

    return `
      <div id="ad-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
        <div class="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl shadow-2xl p-6 sm:p-8 space-y-5 animate-modal-scale text-slate-900 max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl shrink-0 shadow-2xs font-bold">
                📢
              </div>
              <div>
                <h3 class="font-black text-lg text-slate-900 leading-tight">Sahibinden Profesyonel İlan Metni</h3>
                <p class="text-xs text-slate-500">${v.year} ${v.brand} ${v.model} ${v.enginePackage}</p>
              </div>
            </div>
            <button id="btn-close-ad-modal" class="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition">${Icons.close('w-5 h-5')}</button>
          </div>

          <div class="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs text-amber-950 font-medium">
            <span>💡 Bu taslak; aracınızın güncel KM'si, ekspertiz/hasar raporu ve bakım durumundan otomatik derlenmiştir.</span>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-slate-700">İlan Açıklama Metni (Düzenlenebilir / Kopyalanabilir)</label>
              <span class="text-[11px] font-mono text-slate-400">Karakter Sayısı: ${adText.length}</span>
            </div>
            <textarea id="ad-text-content" rows="14" class="w-full p-4 text-xs font-mono bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 outline-none leading-relaxed resize-y selection:bg-amber-500 selection:text-slate-950 focus:border-amber-500">${adText}</textarea>
          </div>

          <div class="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-slate-100">
            <button type="button" id="btn-cancel-ad-modal" class="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition active:scale-95 cursor-pointer">
              Kapat
            </button>
            <button type="button" id="btn-copy-ad-clipboard" class="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md shadow-amber-500/25 active:scale-95 transition flex items-center gap-2 cursor-pointer">
              ${Icons.copy('w-4 h-4 text-slate-950')}
              <span>Tüm İlan Metnini Kopyala</span>
            </button>
          </div>

        </div>
      </div>
    `;
  }

  function attachAdGeneratorModalEvents() {
    const state = store.getState();
    if (!state.isAdModalOpen) return;

    const close = () => store.setAdModalOpen(false);
    const bClose = document.getElementById('btn-close-ad-modal');
    if (bClose) bClose.onclick = close;
    const bCancel = document.getElementById('btn-cancel-ad-modal');
    if (bCancel) bCancel.onclick = close;

    const backdrop = document.getElementById('ad-modal-backdrop');
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) close();
      };
    }

    const bCopy = document.getElementById('btn-copy-ad-clipboard');
    if (bCopy) {
      bCopy.onclick = () => {
        const textarea = document.getElementById('ad-text-content');
        if (textarea) {
          const text = textarea.value;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
              store.showToast('İlan metni panoya kopyalandı! Sahibinden\'e yapıştırabilirsiniz. 📋', 'success');
            }).catch(() => {
              textarea.select();
              document.execCommand('copy');
              store.showToast('İlan metni panoya kopyalandı! 📋', 'success');
            });
          } else {
            textarea.select();
            document.execCommand('copy');
            store.showToast('İlan metni panoya kopyalandı! 📋', 'success');
          }
        }
      };
    }
  }

  // --- 17.10 GÖSTERGE PANELİ ARIZA & İKAZ LAMBALARI REHBERİ MODALI ---
  function renderDashboardLightsModal() {
    const state = store.getState();
    if (!state.isLightsModalOpen) return '';

    return `
      <div id="lights-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
        <div class="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl shadow-2xl p-6 sm:p-8 space-y-5 animate-modal-scale text-slate-900 max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center text-xl shrink-0 shadow-2xs font-bold">
                ⚠️
              </div>
              <div>
                <h3 class="font-black text-lg text-slate-900 leading-tight">Gösterge Paneli İkaz Lambaları Rehberi</h3>
                <p class="text-xs text-slate-500">Arıza lambaları ne anlama gelir? Sürüşe devam edilebilir mi?</p>
              </div>
            </div>
            <button id="btn-close-lights-modal" class="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition">${Icons.close('w-5 h-5')}</button>
          </div>

          <!-- Arama & Filtreleme Çubuğu -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div class="relative flex-1">
              <input type="text" id="lights-search-input" placeholder="İkaz lambası ara... (örn: motor, hararet, yağ, fren, abs, dpf)" class="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-3.5 pl-9 text-xs font-semibold text-slate-800 outline-none focus:border-amber-500 focus:bg-white" />
              <span class="absolute left-3 top-3 text-slate-400 text-xs">🔍</span>
            </div>
            <div class="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button type="button" class="btn-filter-light px-3 py-1.5 rounded-lg text-xs font-bold transition bg-white text-slate-900 shadow-2xs" data-filter="all">Tümü (10)</button>
              <button type="button" class="btn-filter-light px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition" data-filter="red">🔴 Kırmızı Acil</button>
              <button type="button" class="btn-filter-light px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition" data-filter="amber">🟡 Sarı Uyarı</button>
            </div>
          </div>

          <!-- Lambalar Listesi -->
          <div id="lights-list-container" class="space-y-3.5">
            ${DASHBOARD_LIGHTS.map(light => {
              const isRed = light.color === 'red';
              const cardBorder = isRed ? 'border-rose-200/90 bg-rose-50/20' : 'border-amber-200/90 bg-amber-50/20';
              const badgeCls = isRed ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-amber-100 text-amber-800 border-amber-200';
              const iconFn = DASHBOARD_ICONS[light.id];

              return `
                <div class="light-card p-4 sm:p-5 rounded-3xl border ${cardBorder} space-y-4 transition hover:shadow-sm" data-color="${light.color}" data-search="${light.title.toLowerCase()} ${light.visualDesc.toLowerCase()} ${light.causes.toLowerCase()} ${light.action.toLowerCase()}">
                  <div class="flex items-start justify-between gap-4">
                    <div class="flex items-center gap-3.5">
                      <!-- Gerçek Gösterge Paneli Simgesi (Karanlık Kadran Efekti) -->
                      <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-950 border border-slate-800 p-2.5 flex items-center justify-center shrink-0 shadow-inner ${isRed ? 'text-rose-500 shadow-rose-950/40' : 'text-amber-400 shadow-amber-950/40'}">
                        ${iconFn ? iconFn('w-9 h-9 sm:w-10 sm:h-10') : ''}
                      </div>
                      <div>
                        <div class="flex items-center gap-2 flex-wrap">
                          <h4 class="text-sm sm:text-base font-black text-slate-900">${light.title}</h4>
                          <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeCls}">
                            ${light.severity}
                          </span>
                        </div>
                        <!-- Sürücünün Göstergede Gördüğü Şeklin Açıklaması -->
                        <p class="text-xs font-bold ${isRed ? 'text-rose-700' : 'text-amber-800'} mt-1 flex items-center gap-1.5 flex-wrap">
                          <span class="px-2 py-0.5 rounded-md ${isRed ? 'bg-rose-100 text-rose-900 border border-rose-200' : 'bg-amber-100 text-amber-900 border border-amber-200'}">
                            🔍 Göstergedeki Şekil:
                          </span>
                          <span>${light.visualDesc}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs pt-1">
                    <div class="p-3 bg-white rounded-2xl border border-slate-200">
                      <span class="text-[10px] font-black text-slate-400 block uppercase">🚗 Sürüş Durumu</span>
                      <p class="text-xs font-bold ${isRed ? 'text-rose-700' : 'text-amber-800'} mt-0.5 leading-snug">${light.canDrive}</p>
                    </div>
                    <div class="p-3 bg-white rounded-2xl border border-slate-200">
                      <span class="text-[10px] font-black text-slate-400 block uppercase">🔍 Olası Nedenler</span>
                      <p class="text-xs text-slate-700 mt-0.5 leading-snug">${light.causes}</p>
                    </div>
                    <div class="p-3 bg-white rounded-2xl border border-slate-200">
                      <span class="text-[10px] font-black text-slate-400 block uppercase">🛠️ Ne Yapılmalı?</span>
                      <p class="text-xs font-semibold text-slate-800 mt-0.5 leading-snug">${light.action}</p>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

        </div>
      </div>
    `;
  }

  function attachDashboardLightsModalEvents() {
    const state = store.getState();
    if (!state.isLightsModalOpen) return;

    const close = () => store.setLightsModalOpen(false);
    const bClose = document.getElementById('btn-close-lights-modal');
    if (bClose) bClose.onclick = close;

    const backdrop = document.getElementById('lights-modal-backdrop');
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) close();
      };
    }

    let activeFilter = 'all';
    let searchQuery = '';

    const applyFilter = () => {
      document.querySelectorAll('.light-card').forEach(card => {
        const color = card.getAttribute('data-color');
        const searchData = (card.getAttribute('data-search') || '').toLowerCase();

        const matchColor = (activeFilter === 'all') || (color === activeFilter);
        const matchSearch = !searchQuery || searchData.includes(searchQuery);

        if (matchColor && matchSearch) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    };

    const sInput = document.getElementById('lights-search-input');
    if (sInput) {
      sInput.oninput = (e) => {
        searchQuery = (e.target.value || '').trim().toLowerCase();
        applyFilter();
      };
    }

    document.querySelectorAll('.btn-filter-light').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.btn-filter-light').forEach(b => {
          b.classList.remove('bg-white', 'text-slate-900', 'shadow-2xs');
          b.classList.add('text-slate-600');
        });
        btn.classList.add('bg-white', 'text-slate-900', 'shadow-2xs');
        btn.classList.remove('text-slate-600');

        activeFilter = btn.getAttribute('data-filter') || 'all';
        applyFilter();
      };
    });
  }

  // --- 17.11 ACİL YARDIM, KAZA VE ÇEKİCİ ASİSTANI MODALI ---
  function renderEmergencyModal() {
    const state = store.getState();
    if (!state.isEmergencyModalOpen) return '';
    const v = store.getActiveVehicle();

    return `
      <div id="emergency-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
        <div class="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 space-y-6 animate-modal-scale text-slate-900 max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center text-xl shrink-0 shadow-2xs font-bold">
                🆘
              </div>
              <div>
                <h3 class="font-black text-lg text-slate-900 leading-tight">Acil Durum & Kaza Asistanı</h3>
                <p class="text-xs text-slate-500">Tek dokunuşla acil yardım hatları ve 5 adımlı kaza prosedürü</p>
              </div>
            </div>
            <button id="btn-close-emergency-modal" class="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition">${Icons.close('w-5 h-5')}</button>
          </div>

          <!-- Acil Çağrı Hızlı Arama Butonları (Büyük Dokunmatik Kartlar) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a href="tel:112" class="p-4 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-2xl flex flex-col items-center justify-center text-center shadow-lg shadow-rose-600/25 transition group">
              <span class="text-2xl mb-1 group-hover:scale-110 transition-transform">🚨</span>
              <span class="text-2xl font-black font-mono">112</span>
              <span class="text-[11px] font-bold mt-0.5 opacity-90">Acil Çağrı (Polis/Amb.)</span>
              <span class="text-[10px] mt-2 px-2.5 py-0.5 rounded-full bg-white/20 font-bold">Tek Tıkla Ara</span>
            </a>

            <a href="tel:159" class="p-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-2xl flex flex-col items-center justify-center text-center shadow-lg shadow-blue-600/25 transition group">
              <span class="text-2xl mb-1 group-hover:scale-110 transition-transform">🛣️</span>
              <span class="text-2xl font-black font-mono">159</span>
              <span class="text-[11px] font-bold mt-0.5 opacity-90">Karayolları Yol Yardım</span>
              <span class="text-[10px] mt-2 px-2.5 py-0.5 rounded-full bg-white/20 font-bold">Ücretsiz Çekici</span>
            </a>

            <a href="tel:154" class="p-4 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white rounded-2xl flex flex-col items-center justify-center text-center shadow-lg shadow-slate-900/20 transition group">
              <span class="text-2xl mb-1 group-hover:scale-110 transition-transform">👮</span>
              <span class="text-2xl font-black font-mono">154</span>
              <span class="text-[11px] font-bold mt-0.5 opacity-90">Alo Trafik Polisi</span>
              <span class="text-[10px] mt-2 px-2.5 py-0.5 rounded-full bg-white/20 font-bold">Trafik Denetim</span>
            </a>
          </div>

          <!-- Aktif Araç Ruhsat Bilgileri (Telefonda görevliye bildirmek için) -->
          ${v ? `
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span class="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                📋 Görevliye İleteceğiniz Araç Bilgileri
              </span>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span class="text-slate-400 block text-[10px]">Plaka</span>
                  <span class="font-mono font-black text-slate-900 text-sm">${v.plate}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[10px]">Araç</span>
                  <span class="font-bold text-slate-800">${v.brand} ${v.model}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[10px]">Yakıt / Motor</span>
                  <span class="font-bold text-slate-800">${v.fuel}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[10px]">Sigorta Bitiş</span>
                  <span class="font-bold text-slate-800">${v.insuranceDate || 'Girilmedi'}</span>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- 5 Adımlı Kaza Anı Kontrol Listesi -->
          <div class="space-y-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <span>⚠️</span> Kaza Anında Yapılması Gereken 5 Kritik Adım
            </h4>

            <div class="space-y-2.5 text-xs text-slate-700">
              <div class="p-3 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-slate-100 font-black text-slate-700 flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <strong class="text-slate-900 block">Can Güvenliği & Reflektör</strong>
                  <span>Dörtlü flaşörleri derhal yakın. Reflektörü şehir içinde 30 metre, şehirlerarası yolda / otoyolda 150 metre geriye koyun.</span>
                </div>
              </div>

              <div class="p-3 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-slate-100 font-black text-slate-700 flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  <strong class="text-slate-900 block">Yaralı Kontrolü</strong>
                  <span>Yaralı veya can kaybı varsa araçları KESİNLİKLE kıpırdatmayın ve derhal 112'yi arayın.</span>
                </div>
              </div>

              <div class="p-3 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-slate-100 font-black text-slate-700 flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div>
                  <strong class="text-slate-900 block">Geniş Açılı Kaza Fotoğrafları</strong>
                  <span>Araçları yerinden oynatmadan önce her iki aracın plakasını, temas noktalarını ve fren izlerini en az 4 farklı açıdan fotoğraflayın.</span>
                </div>
              </div>

              <div class="p-3 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-slate-100 font-black text-slate-700 flex items-center justify-center shrink-0 mt-0.5">4</span>
                <div>
                  <strong class="text-slate-900 block">Maddi Hasarlı Kaza Tespit Tutanağı</strong>
                  <span>Yaralanma yoksa taraflarca anlaşmalı kaza tutanağını (veya e-Devlet Mobil Kaza Tutanağını) doldurup karşılıklı imzalayın.</span>
                </div>
              </div>

              <div class="p-3 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-slate-100 font-black text-slate-700 flex items-center justify-center shrink-0 mt-0.5">5</span>
                <div>
                  <strong class="text-slate-900 block">Evrak Fotoğrafları</strong>
                  <span>Karşı sürücünün Ehliyet (ön/arka), Ruhsat ve Zorunlu Trafik Sigortası poliçesinin net fotoğraflarını çekip kaydedin.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  function attachEmergencyModalEvents() {
    const state = store.getState();
    if (!state.isEmergencyModalOpen) return;

    const close = () => store.setEmergencyModalOpen(false);
    const bClose = document.getElementById('btn-close-emergency-modal');
    if (bClose) bClose.onclick = close;

    const backdrop = document.getElementById('emergency-modal-backdrop');
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) close();
      };
    }
  }

  // --- 18. GELİŞMİŞ ARAÇ EKLEME SİHİRBAZI (KULLANICI SIRALAMASI: ARAÇ TİPİ -> MARKA -> MODEL -> YIL -> MOTOR & DONANIM) ---
  const SUV_MODELS = new Set([
    'Austral', 'Captur', 'Duster', 'Yeni Duster', 'Tiguan', 'T-Roc', 'Taigo',
    'Egea Cross', 'C-HR', 'Corolla Cross', 'Yaris Cross', 'RAV4', 'Puma', 'Kuga',
    'Tucson', 'Bayon', 'Kona', 'Ioniq 5', '2008', '3008', '408', '5008',
    'Sandero Stepway', 'Jogger', 'Mokka', 'Grandland', 'Crossland',
    'Kamiq', 'Karoq', 'Kodiaq', 'CR-V', 'HR-V', 'ZR-V',
    'C5 Aircross', 'C3 Aircross', 'C4 X', 'X1', 'X3', 'X5',
    'GLA', 'GLB', 'GLC', 'Q2', 'Q3', 'Q5', 'Arona', 'Ateca', 'Tarraco',
    'Formentor', 'Sportage', 'Stonic', 'Niro', 'EV6', 'Qashqai', 'Juke', 'X-Trail',
    'XC40', 'XC60', 'XC90', 'T10X', 'Tiggo 7 Pro', 'Tiggo 8 Pro', 'Omoda 5',
    'HS', 'ZS', 'ZS EV', 'Vitara', 'Jimny', 'S-Cross',
    'Model Y', 'Atto 3', 'Seal U', 'Tang'
  ]);

  const TICARI_MODELS = new Set([
    'Kangoo', 'Trafic', 'Master', 'Caddy', 'Transporter', 'Crafter', 'Amarok',
    'Doblo', 'Fiorino', 'Ducato', 'Tourneo Courier', 'Transit Custom', 'Transit', 'Ranger',
    'Rifter', 'Partner', 'Boxer', 'Berlingo', 'Jumpy', 'Jumper', 'Hilux', 'Proace',
    'Combo', 'Vivaro', 'Vito', 'Sprinter'
  ]);

  function getModelBodyType(modelName) {
    if (SUV_MODELS.has(modelName)) return 'suv';
    if (TICARI_MODELS.has(modelName)) return 'ticari';
    return 'otomobil';
  }

  function getEnginesByModelAndYear(brandId, modelName, year, defaultEngines = []) {
    const y = parseInt(year, 10) || 2022;

    // Renault Clio
    if (modelName === 'Clio') {
      if (y <= 2019) {
        return [
          '1.5 dCi Joy (75 HP Manuel)',
          '1.5 dCi Touch (90 HP Manuel)',
          '1.5 dCi Icon EDC (90 HP Otomatik)',
          '0.9 TCe Touch (90 HP Benzinli)',
          '1.2 16V Joy (75 HP Benzinli)',
          '1.2 Turbo Icon EDC (120 HP Otomatik)'
        ];
      } else {
        return [
          '1.0 TCe Touch X-Tronic (90 HP Otomatik)',
          '1.0 TCe Icon X-Tronic (100 HP Otomatik)',
          '1.0 TCe Evolution X-Tronic (90 HP Otomatik)',
          '1.0 TCe Techno Esprit Alpine (90 HP Otomatik)',
          '1.5 Blue dCi Touch (115 HP Dizel Manuel)',
          '1.5 Blue dCi Icon (115 HP Dizel Manuel)',
          '1.0 SCe Joy (65/72 HP Benzinli)',
          '1.0 TCe ECO-G 100 HP (Fabrikasyon LPG)',
          '1.3 TCe Icon EDC (130 HP Otomatik)',
          '1.6 E-Tech Full Hybrid 145 HP'
        ];
      }
    }

    // Renault Megane / Megane Sedan
    if (modelName === 'Megane Sedan' || modelName === 'Megane') {
      if (y <= 2016) {
        return [
          '1.5 dCi Touch (90/110 HP Manuel)',
          '1.5 dCi Icon EDC (110 HP Otomatik)',
          '1.6 16V Joy (110 HP Benzinli)',
          '1.2 TCe Touch (130 HP Benzinli)'
        ];
      } else if (y <= 2020) {
        return [
          '1.5 dCi Touch EDC (110 HP Otomatik)',
          '1.5 dCi Icon EDC (110 HP Otomatik)',
          '1.6 16V Joy (115 HP Benzinli Manuel)',
          '1.2 TCe Icon EDC (130 HP Benzinli)',
          '1.6 dCi Icon (130 HP Dizel Manuel)'
        ];
      } else {
        return [
          '1.3 TCe Joy EDC (140 HP Otomatik)',
          '1.3 TCe Touch EDC (140 HP Otomatik)',
          '1.3 TCe Icon EDC (140 HP Otomatik)',
          '1.5 Blue dCi Touch EDC (115 HP Dizel Otomatik)',
          '1.5 Blue dCi Icon EDC (115 HP Dizel Otomatik)',
          '1.3 TCe Joy (140 HP Manuel)'
        ];
      }
    }

    // Volkswagen Golf
    if (modelName === 'Golf') {
      if (y <= 2019) {
        return [
          '1.6 TDI Comfortline DSG (115 HP Dizel)',
          '1.6 TDI Highline DSG (115 HP Dizel)',
          '1.4 TSI Highline DSG (125/150 HP)',
          '1.2 TSI Comfortline (105/110 HP)',
          '1.0 TSI Midline Plus (110 HP Manuel)',
          '2.0 TSI GTI DSG (230/245 HP)'
        ];
      } else {
        return [
          '1.0 eTSI Life DSG (110 HP Hibrit/mHEV)',
          '1.0 eTSI Style DSG (110 HP Hibrit/mHEV)',
          '1.5 eTSI Style DSG (150 HP Hibrit/mHEV)',
          '1.5 eTSI R-Line DSG (150 HP Hibrit/mHEV)',
          '2.0 TSI GTI DSG (245 HP)',
          '2.0 TSI R 4Motion DSG (320 HP)'
        ];
      }
    }

    // Volkswagen Passat
    if (modelName === 'Passat') {
      if (y <= 2019) {
        return [
          '1.6 TDI Comfortline DSG (120 HP Dizel)',
          '1.6 TDI Highline DSG (120 HP Dizel)',
          '1.4 TSI Comfortline DSG (125/150 HP)',
          '1.4 TSI Highline DSG (150 HP ACT)',
          '2.0 TDI Highline 4Motion DSG (190 HP)'
        ];
      } else {
        return [
          '1.5 TSI Business DSG (150 HP Benzinli)',
          '1.5 TSI Elegance DSG (150 HP Benzinli)',
          '1.6 TDI Business DSG (120 HP Dizel)',
          '1.6 TDI Elegance DSG (120 HP Dizel)',
          '2.0 TDI Elegance DSG (150/200 HP)'
        ];
      }
    }

    // Fiat Egea / Egea Sedan
    if (modelName === 'Egea' || modelName === 'Egea Sedan' || modelName === 'Egea Cross') {
      if (y <= 2020) {
        return [
          '1.4 Fire Easy (95 HP Benzinli Manuel)',
          '1.4 Fire Urban (95 HP Benzinli Manuel)',
          '1.4 Fire Lounge (95 HP Benzinli Manuel)',
          '1.3 MultiJet Easy (95 HP Dizel Manuel)',
          '1.3 MultiJet Urban (95 HP Dizel Manuel)',
          '1.6 MultiJet Lounge DCT (120 HP Dizel Otomatik)',
          '1.6 E-Torq Lounge AT6 (110 HP Benzinli Otomatik)'
        ];
      } else {
        return [
          '1.4 Fire Easy / Street (95 HP Benzinli Manuel)',
          '1.4 Fire Urban (95 HP Benzinli Manuel)',
          '1.4 Fire Lounge (95 HP Benzinli Manuel)',
          '1.3 MultiJet Easy / Urban (95 HP Dizel Manuel)',
          '1.6 MultiJet Urban DCT (130 HP Dizel Otomatik)',
          '1.6 MultiJet Lounge DCT (130 HP Dizel Otomatik)',
          '1.5 T4 Hibrit Urban AT7 (130 HP Hibrit Otomatik)',
          '1.5 T4 Hibrit Lounge AT7 (130 HP Hibrit Otomatik)',
          '1.0 FireFly Lounge (100 HP Turbo Benzinli)'
        ];
      }
    }

    // Toyota Corolla
    if (modelName === 'Corolla') {
      if (y <= 2018) {
        return [
          '1.6 Valvematic Touch Multidrive S (132 HP)',
          '1.6 Valvematic Advance / Premium (132 HP)',
          '1.4 D-4D Touch M/M (90 HP Dizel)',
          '1.33 Life (99 HP Manuel)'
        ];
      } else {
        return [
          '1.5 Vision Multidrive S (123 HP Otomatik)',
          '1.5 Dream Multidrive S (123 HP Otomatik)',
          '1.5 Flame X-Pack Multidrive S (123 HP Otomatik)',
          '1.5 Passion X-Pack Multidrive S (123 HP Otomatik)',
          '1.8 Hybrid Dream e-CVT (122/140 HP Hibrit)',
          '1.8 Hybrid Flame X-Pack e-CVT (122/140 HP Hibrit)',
          '1.8 Hybrid Passion X-Pack e-CVT (122/140 HP Hibrit)',
          '1.6 Vision / Dream Multidrive S (132 HP)'
        ];
      }
    }

    // Ford Focus
    if (modelName === 'Focus') {
      if (y <= 2018) {
        return [
          '1.6 TDCi Trend X / Titanium (115 HP Manuel)',
          '1.5 TDCi Titanium Powershift (120 HP Dizel Otomatik)',
          '1.6 Ti-VCT Trend X (125 HP Manuel)',
          '1.0 EcoBoost Titanium (125 HP Otomatik)'
        ];
      } else {
        return [
          '1.5 EcoBlue Trend X 8 İleri Otomatik (120 HP)',
          '1.5 EcoBlue Titanium 8 İleri Otomatik (120 HP)',
          '1.5 EcoBlue ST-Line 8 İleri Otomatik (120 HP)',
          '1.0 EcoBoost Hybrid Titanium mHEV (125/155 HP)',
          '1.0 EcoBoost Hybrid ST-Line mHEV (125/155 HP)',
          '1.5 Ti-VCT Trend X (123 HP)'
        ];
      }
    }

    // Honda Civic
    if (modelName === 'Civic') {
      if (y <= 2021) {
        return [
          '1.6 i-VTEC Elegance Eco (125 HP Fabrika LPG)',
          '1.6 i-VTEC Executive Eco (125 HP Fabrika LPG)',
          '1.5 VTEC Turbo RS CVT (182 HP)',
          '1.5 VTEC Turbo Executive+ (182 HP)',
          '1.6 i-DTEC Executive 9 İleri Otomatik (120 HP Dizel)'
        ];
      } else {
        return [
          '1.5 VTEC Turbo Elegance CVT (182 HP)',
          '1.5 VTEC Turbo Executive+ CVT (182 HP)',
          '1.5 VTEC Eco Elegance CVT (129 HP Fabrika LPG)',
          '1.5 VTEC Eco Executive+ CVT (129 HP Fabrika LPG)',
          '2.0 e:HEV Advance Otomatik (184 HP Tam Hibrit)'
        ];
      }
    }

    // Dacia Duster
    if (modelName === 'Duster') {
      if (y <= 2017) {
        return [
          '1.5 dCi Laureate 4x2 / 4x4 (110 HP Manuel)',
          '1.5 dCi Blackshadow EDC (110 HP Otomatik)',
          '1.6 16V Ambiance (105 HP Manuel)'
        ];
      } else if (y <= 2023) {
        return [
          '1.5 Blue dCi Prestige 4x2 / 4x4 (115 HP Dizel)',
          '1.3 TCe Prestige EDC (150 HP Benzinli Otomatik)',
          '1.0 TCe ECO-G Comfort / Prestige (100 HP Fabrika LPG)',
          '1.5 dCi Comfort EDC (110 HP Otomatik)'
        ];
      } else {
        return [
          '1.2 TCe Mild Hybrid 4x4 Extreme (130 HP)',
          '1.6 E-Tech Full Hybrid Journey (140 HP Otomatik)',
          '1.0 ECO-G Expression (100 HP Fabrika LPG)'
        ];
      }
    }

    // Peugeot 2008 / 3008
    if (modelName === '2008' || modelName === '3008') {
      if (y <= 2019) {
        return [
          '1.6 BlueHDi Allure EAT6 (120 HP Dizel Otomatik)',
          '1.2 PureTech Allure EAT6 (130 HP Benzinli Otomatik)',
          '1.6 THP Allure EAT6 (165 HP)'
        ];
      } else {
        return [
          '1.5 BlueHDi Allure EAT8 (130 HP Dizel Otomatik)',
          '1.5 BlueHDi GT EAT8 (130 HP Dizel Otomatik)',
          '1.2 PureTech Allure EAT8 (130 HP Benzinli Otomatik)',
          '1.2 PureTech GT EAT8 (130 HP Benzinli Otomatik)',
          '1.2 Hibrit e-DCS6 Allure / GT (136 HP 48V Hibrit)'
        ];
      }
    }

    // Genel filtreleme:
    if (defaultEngines && defaultEngines.length > 0) {
      if (y >= 2021) {
        const modernEngines = defaultEngines.filter(e => !e.includes('1.6 TDI') && !e.includes('1.4 D-4D') && !e.includes('1.6 TDCi'));
        return modernEngines.length > 0 ? modernEngines : defaultEngines;
      } else if (y <= 2018) {
        const classicEngines = defaultEngines.filter(e => !e.includes('eTSI') && !e.includes('E-Tech') && !e.includes('T4 Hibrit') && !e.includes('e:HEV'));
        return classicEngines.length > 0 ? classicEngines : defaultEngines;
      }
      return defaultEngines;
    }

    return ['Standart Donanım Paketi'];
  }

  let selectedBodyType = 'otomobil';
  let selectedBrandId = null;
  let selectedModelName = '';
  let selectedYear = 2024;
  let selectedEnginePackage = '';

  function resetWizardState() {
    selectedBodyType = 'otomobil';
    selectedBrandId = null;
    selectedModelName = '';
    selectedYear = 2024;
    selectedEnginePackage = '';
  }

  function renderVehicleWizardModal() {
    const state = store.getState();
    if (!state.isAddVehicleModalOpen) return '';

    // Seçili gövde tipine sahip markaları bul ve A'dan Z'ye sırala
    const brandsForType = BRANDS.filter(b => {
      const models = VEHICLE_MODELS[b.id] || [];
      return models.some(m => getModelBodyType(m.name) === selectedBodyType);
    }).sort((a, b) => a.name.localeCompare(b.name, 'tr'));

    // Sadece daha önce seçilmiş marka yeni gövde tipinde yoksa seçimi sıfırla (asla otomatik marka dayatma)
    if (selectedBrandId && !brandsForType.some(b => b.id === selectedBrandId)) {
      selectedBrandId = null;
      selectedModelName = '';
      selectedEnginePackage = '';
    }

    // Seçili marka ve gövde tipine uyan modeller
    const allBrandModels = selectedBrandId ? ((VEHICLE_MODELS[selectedBrandId] || []).slice()) : [];
    let modelsForType = allBrandModels.filter(m => getModelBodyType(m.name) === selectedBodyType);
    if (modelsForType.length === 0 && allBrandModels.length > 0) {
      modelsForType = allBrandModels;
    }

    // Modelleri alfabetik (A'dan Z'ye) sırala
    modelsForType.sort((a, b) => a.name.localeCompare(b.name, 'tr'));

    if (selectedBrandId && modelsForType.length > 0 && !modelsForType.some(m => m.name === selectedModelName)) {
      selectedModelName = modelsForType[0].name;
    } else if (!selectedBrandId) {
      selectedModelName = '';
    }

    const currentModelObj = modelsForType.find(m => m.name === selectedModelName) || modelsForType[0];
    
    // Model yılı seçenekleri (aracın fabrika çıkış yılından günümüze)
    const modelYears = (selectedBrandId && selectedModelName) ? getModelYearRange(selectedBrandId, selectedModelName) : [2026, 2025, 2024, 2023, 2022, 2021, 2020];
    if (!modelYears.includes(selectedYear)) {
      selectedYear = modelYears[0];
    }

    // Model yılına göre filtrelenmiş motor seçenekleri
    const availableEngines = (selectedBrandId && selectedModelName) ? getEnginesByModelAndYear(
      selectedBrandId,
      selectedModelName,
      selectedYear,
      currentModelObj ? (currentModelObj.engines || []) : []
    ) : [];

    if (availableEngines.length > 0 && !availableEngines.includes(selectedEnginePackage)) {
      selectedEnginePackage = availableEngines[0];
    } else if (availableEngines.length === 0) {
      selectedEnginePackage = '';
    }

    const specs = parseEngineSpecs(selectedEnginePackage, selectedBrandId, selectedModelName);

    return `
      <div id="wizard-modal-backdrop" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto">
        <div class="bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl w-full max-w-xl shadow-2xl text-slate-900 flex flex-col max-h-[94vh]">
          
          <!-- Başlık Şeridi -->
          <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white rounded-t-3xl">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                ${Icons.car('w-5 h-5')}
              </div>
              <div>
                <h2 class="font-black text-lg sm:text-xl text-slate-900">Garaja Yeni Araç Ekle</h2>
                <p class="text-xs text-slate-500">Adım Adım Araç ve Donanım Belirleme</p>
              </div>
            </div>
            <button id="btn-close-wizard" class="p-2 text-slate-400 hover:text-slate-700 rounded-full transition hover:bg-slate-100">${Icons.close('w-5 h-5')}</button>
          </div>

          <!-- Adımlar Form Alanı -->
          <div id="wizard-scroll-body" class="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
            
            <!-- 1. ADIM: ARAÇ TİPİ SEÇİMİ -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-black inline-flex items-center justify-center">1</span>
                  Araç Tipi
                </label>
                <span class="text-[11px] text-slate-400 font-medium">Kasa / Segment</span>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <button type="button" class="btn-wiz-bodytype p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${selectedBodyType === 'otomobil' ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}" data-body="otomobil">
                  <span class="text-xl">🚗</span>
                  <span class="text-xs font-bold">Otomobil</span>
                  <span class="text-[10px] text-slate-400 truncate">Sedan / Hatchback</span>
                </button>
                <button type="button" class="btn-wiz-bodytype p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${selectedBodyType === 'suv' ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}" data-body="suv">
                  <span class="text-xl">🚙</span>
                  <span class="text-xs font-bold">SUV & Crossover</span>
                  <span class="text-[10px] text-slate-400 truncate">4x4 / Şehir SUV</span>
                </button>
                <button type="button" class="btn-wiz-bodytype p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${selectedBodyType === 'ticari' ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}" data-body="ticari">
                  <span class="text-xl">🚐</span>
                  <span class="text-xs font-bold">Hafif Ticari</span>
                  <span class="text-[10px] text-slate-400 truncate">Panelvan / Kombi</span>
                </button>
              </div>
            </div>

            <!-- 2. ADIM: MARKA SEÇİMİ -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-full ${selectedBrandId ? 'bg-emerald-600' : 'bg-slate-700'} text-white text-[11px] font-black inline-flex items-center justify-center">2</span>
                  Marka
                </label>
                ${selectedBrandId ? `
                  <span class="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Seçili: ${BRANDS.find(b => b.id === selectedBrandId)?.name}
                  </span>
                ` : `
                  <span class="text-[11px] text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    👆 Lütfen Marka Seçiniz
                  </span>
                `}
              </div>
              <div id="wizard-brands-grid" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-44 sm:max-h-48 overflow-y-auto p-1.5 bg-slate-50 rounded-2xl border border-slate-200">
                ${brandsForType.map(b => {
                  const isSelected = selectedBrandId === b.id;
                  return `
                    <button type="button" class="btn-wiz-brand p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 active:scale-95 ${isSelected ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-black shadow-sm ring-2 ring-emerald-500/20' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'}" data-brand="${b.id}">
                      <div class="w-8 h-8 rounded-xl ${isSelected ? 'bg-white shadow-2xs' : 'bg-slate-50'} flex items-center justify-center p-1 transition shrink-0">
                        ${getBrandLogoSvg(b.id, 'w-6 h-6 max-h-6 max-w-6')}
                      </div>
                      <span class="text-[11px] block truncate font-bold w-full text-center leading-tight">${b.name}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- 3. ADIM: MODEL SEÇİMİ (A'DAN Z'YE SIRALI) -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-full ${selectedBrandId ? 'bg-emerald-600' : 'bg-slate-400'} text-white text-[11px] font-black inline-flex items-center justify-center">3</span>
                  Model (A-Z Sıralı)
                </label>
                ${selectedBrandId && modelsForType.length > 0 ? `
                  <span class="text-[11px] text-slate-400 font-medium">${modelsForType.length} Model Mevcut</span>
                ` : ''}
              </div>

              ${(selectedBrandId && modelsForType.length > 0) ? `
                <select id="wiz-select-model" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-3.5 text-sm text-slate-900 font-bold outline-none focus:border-emerald-500 focus:bg-white transition">
                  ${modelsForType.map(m => `<option value="${m.name}" ${m.name === selectedModelName ? 'selected' : ''}>${m.name}</option>`).join('')}
                </select>
              ` : `
                <div class="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center text-xs font-semibold text-slate-500 flex items-center justify-center gap-2">
                  <span>👆 Model listesini görmek için lütfen yukarıdan bir marka logosu seçiniz</span>
                </div>
              `}
            </div>

            <!-- 4. ADIM: MODEL YILI SEÇİMİ -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-full ${selectedBrandId ? 'bg-emerald-600' : 'bg-slate-400'} text-white text-[11px] font-black inline-flex items-center justify-center">4</span>
                  Model Yılı
                </label>
                ${selectedBrandId ? `
                  <span class="text-[11px] text-emerald-700 font-bold">${modelYears[modelYears.length - 1]} - ${modelYears[0]} Üretim Yılları</span>
                ` : `
                  <span class="text-[11px] text-slate-400 font-medium">Model Yılı</span>
                `}
              </div>
              ${selectedBrandId ? `
                <select id="wiz-select-year" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-3.5 text-sm text-slate-900 font-black outline-none focus:border-emerald-500 focus:bg-white transition">
                  ${modelYears.map(y => `<option value="${y}" ${y === selectedYear ? 'selected' : ''}>${y} Model</option>`).join('')}
                </select>
              ` : `
                <div class="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center text-xs font-semibold text-slate-500">
                  <span>Önce marka seçiniz</span>
                </div>
              `}
            </div>

            <!-- 5. ADIM: O MODEL YILINA AİT MOTOR VE DONANIM PAKETİ (TRIM) -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-full ${selectedBrandId ? 'bg-emerald-600' : 'bg-slate-400'} text-white text-[11px] font-black inline-flex items-center justify-center">5</span>
                  ${selectedYear ? `${selectedYear} Yılı ` : ''}Motor ve Donanım Paketi
                </label>
                ${selectedBrandId && availableEngines.length > 0 ? `
                  <span class="text-[11px] text-slate-400 font-medium">${availableEngines.length} Paket Seçeneği</span>
                ` : ''}
              </div>

              ${(selectedBrandId && availableEngines.length > 0) ? `
                <select id="wiz-select-engine" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-3.5 text-xs text-slate-900 font-bold outline-none focus:border-emerald-500 focus:bg-white transition">
                  ${availableEngines.map(eng => `<option value="${eng}" ${eng === selectedEnginePackage ? 'selected' : ''}>${eng}</option>`).join('')}
                </select>
              ` : `
                <div class="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center text-xs font-semibold text-slate-500">
                  <span>Önce marka ve model seçiniz</span>
                </div>
              `}

              ${selectedBrandId && selectedEnginePackage ? `
                <!-- Seçilen Donanıma Özel Canlı Bilgiler -->
                <div class="flex flex-wrap gap-1.5 mt-2.5">
                  <span class="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1">
                    ⛽ Yakıt: <b>${specs.fuel}</b>
                  </span>
                  <span class="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1">
                    ⚙️ Şanzıman: <b>${specs.transmission}</b>
                  </span>
                  <span class="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    ⏱️ Bakım: <b>${specs.interval.toLocaleString('tr-TR')} KM</b>
                  </span>
                </div>
              ` : ''}
            </div>

            <!-- 6. ADIM: PLAKA VE KİLOMETRE BİLGİSİ -->
            <div class="pt-2 border-t border-slate-100 space-y-3">
              <label class="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-black inline-flex items-center justify-center">6</span>
                Plaka ve Kilometre
              </label>

              <div>
                <input type="text" id="wiz-input-plate" placeholder="Örn: 34 ABC 123" class="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-2xl py-3 px-4 font-mono font-black text-slate-900 uppercase text-center text-lg outline-none transition" />
                <div class="mt-2 flex justify-center p-2.5 bg-slate-50 rounded-2xl border border-slate-200" id="wiz-plate-box">
                  ${renderPlateBadge('34 PLAKA 01', 'md')}
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-[11px] font-bold text-slate-600 block mb-1">Güncel Kilometre</label>
                  <input type="number" id="wiz-input-km" placeholder="Örn: 48500" value="48500" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-3.5 text-sm font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition" />
                </div>
                <div>
                  <label class="text-[11px] font-bold text-slate-600 block mb-1">Aylık Tahmini KM</label>
                  <input type="number" id="wiz-input-monthly" value="1200" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-3.5 text-sm font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition" />
                </div>
              </div>

              <!-- İsteğe Bağlı Muayene & Sigorta Tarihleri -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label class="text-[11px] font-bold text-slate-700 block mb-1">TÜVTÜRK Muayene Geçerlilik (Opsiyonel)</label>
                  <input type="date" id="wiz-input-insp-date" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition" />
                </div>
                <div>
                  <label class="text-[11px] font-bold text-slate-700 block mb-1">Zorunlu Sigorta Bitiş Tarihi (Opsiyonel)</label>
                  <input type="date" id="wiz-input-ins-date" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition" />
                </div>
              </div>
              <p class="text-[10px] text-slate-400">Tarihleri bilmiyorsanız boş bırakabilirsiniz. Kesinlikle uydurma veya tahmini bir tarih atanmaz.</p>
            </div>

          </div>

          <!-- Alt Butonlar -->
          <div class="p-5 sm:p-6 border-t border-slate-100 flex justify-between gap-3 bg-white rounded-b-3xl">
            <button id="btn-wiz-cancel" class="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs active:scale-95 transition">Vazgeç</button>
            <button id="btn-wiz-submit" class="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs active:scale-95 shadow-lg shadow-emerald-600/25 transition">
              Aracı Kaydet ve Garaja Ekle
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function attachWizardModalEvents() {
    const state = store.getState();
    if (!state.isAddVehicleModalOpen) return;

    const close = () => store.setAddVehicleModalOpen(false);
    const bClose = document.getElementById('btn-close-wizard');
    if (bClose) bClose.onclick = close;
    const bCancel = document.getElementById('btn-wiz-cancel');
    if (bCancel) bCancel.onclick = close;

    // 1. Araç Tipi butonları (Otomobil / SUV / Ticari)
    document.querySelectorAll('.btn-wiz-bodytype').forEach(b => {
      b.onclick = () => {
        selectedBodyType = b.getAttribute('data-body') || 'otomobil';
        
        // Bu gövde tipine uygun markalar (A-Z)
        const brandsForType = BRANDS.filter(brand => {
          const mList = VEHICLE_MODELS[brand.id] || [];
          return mList.some(m => getModelBodyType(m.name) === selectedBodyType);
        }).sort((x, y) => x.name.localeCompare(y.name, 'tr'));

        if (selectedBrandId && !brandsForType.some(br => br.id === selectedBrandId)) {
          selectedBrandId = null;
          selectedModelName = '';
          selectedEnginePackage = '';
        } else if (selectedBrandId) {
          // Bu marka ve gövde tipine ait modeller (A-Z)
          const allModels = (VEHICLE_MODELS[selectedBrandId] || []).slice();
          let models = allModels.filter(m => getModelBodyType(m.name) === selectedBodyType);
          if (models.length === 0) models = allModels;
          models.sort((x, y) => x.name.localeCompare(y.name, 'tr'));

          selectedModelName = models[0]?.name || '';
          const mYears = getModelYearRange(selectedBrandId, selectedModelName);
          if (!mYears.includes(selectedYear)) selectedYear = mYears[0];
          
          const engines = getEnginesByModelAndYear(selectedBrandId, selectedModelName, selectedYear, models[0]?.engines);
          selectedEnginePackage = engines[0] || 'Standart Donanım';
        }
        renderApp();
      };
    });

    // 2. Marka butonları
    document.querySelectorAll('.btn-wiz-brand').forEach(b => {
      b.onclick = () => {
        selectedBrandId = b.getAttribute('data-brand');
        const allModels = (VEHICLE_MODELS[selectedBrandId] || []).slice();
        let models = allModels.filter(m => getModelBodyType(m.name) === selectedBodyType);
        if (models.length === 0) models = allModels;
        models.sort((x, y) => x.name.localeCompare(y.name, 'tr'));

        selectedModelName = models[0]?.name || '';
        const mYears = getModelYearRange(selectedBrandId, selectedModelName);
        if (!mYears.includes(selectedYear)) selectedYear = mYears[0];

        const engines = getEnginesByModelAndYear(selectedBrandId, selectedModelName, selectedYear, models[0]?.engines);
        selectedEnginePackage = engines[0] || 'Standart Donanım';
        renderApp();
      };
    });

    // 3. Model select değiştiğinde
    const selModel = document.getElementById('wiz-select-model');
    if (selModel) {
      selModel.onchange = (e) => {
        selectedModelName = e.target.value;
        const curModel = (VEHICLE_MODELS[selectedBrandId] || []).find(m => m.name === selectedModelName);
        const mYears = getModelYearRange(selectedBrandId, selectedModelName);
        if (!mYears.includes(selectedYear)) selectedYear = mYears[0];

        const engines = getEnginesByModelAndYear(selectedBrandId, selectedModelName, selectedYear, curModel?.engines);
        selectedEnginePackage = engines[0] || '';
        renderApp();
      };
    }

    // 4. Model Yılı select değiştiğinde (O yıla ait motor paketlerini otomatik yeniler)
    const selYear = document.getElementById('wiz-select-year');
    if (selYear) {
      selYear.onchange = (e) => {
        selectedYear = parseInt(e.target.value, 10) || 2022;
        const curModel = (VEHICLE_MODELS[selectedBrandId] || []).find(m => m.name === selectedModelName);
        const engines = getEnginesByModelAndYear(selectedBrandId, selectedModelName, selectedYear, curModel?.engines);
        selectedEnginePackage = engines[0] || '';
        renderApp();
      };
    }

    // 5. Motor select değiştiğinde
    const selEngine = document.getElementById('wiz-select-engine');
    if (selEngine) {
      selEngine.onchange = (e) => {
        selectedEnginePackage = e.target.value;
        renderApp();
      };
    }

    // 6. Plaka canlı önizleme
    const inPlate = document.getElementById('wiz-input-plate');
    if (inPlate) {
      inPlate.oninput = (e) => {
        const val = e.target.value.toUpperCase();
        const pBox = document.getElementById('wiz-plate-box');
        if (pBox) pBox.innerHTML = renderPlateBadge(val || '34 PLAKA 01', 'md');
      };
    }

    // Formu onaylama ve ekleme
    const btnSubmit = document.getElementById('btn-wiz-submit');
    if (btnSubmit) {
      btnSubmit.onclick = () => {
        if (!selectedBrandId) {
          store.showToast('Lütfen önce yukarıdaki logolardan bir araç markası seçin!', 'warning');
          return;
        }

        const modelName = document.getElementById('wiz-select-model')?.value || selectedModelName;
        if (!modelName) {
          store.showToast('Lütfen listeden araç modelini seçin!', 'warning');
          return;
        }

        const enginePkg = document.getElementById('wiz-select-engine')?.value || selectedEnginePackage || 'Standart Donanım';

        const plateVal = (document.getElementById('wiz-input-plate')?.value || '').trim();
        if (!plateVal) {
          store.showToast('Lütfen araç plakanızı girin!', 'warning');
          return;
        }

        if (!enginePkg) {
          enginePkg = 'Standart Donanım';
        }

        const brandObj = BRANDS.find(b => b.id === selectedBrandId);
        const kmVal = document.getElementById('wiz-input-km')?.value;
        const inspVal = document.getElementById('wiz-input-insp-date')?.value || null;
        const insVal = document.getElementById('wiz-input-ins-date')?.value || null;

        store.addVehicle({
          plate: plateVal,
          brandId: selectedBrandId,
          brand: brandObj ? brandObj.name : 'Özel Marka',
          model: modelName,
          enginePackage: enginePkg,
          year: selectedYear,
          bodyType: selectedBodyType,
          currentKm: kmVal ? parseInt(kmVal, 10) : 48500,
          monthlyAvgKm: document.getElementById('wiz-input-monthly')?.value || 1200,
          inspectionDate: inspVal,
          insuranceDate: insVal
        });
      };
    }
  }

  // --- 19. ANA RENDER DÖNGÜSÜ (TAM DUYARLI WEB & MOBİL) ---
  function renderApp() {
    const root = document.getElementById('app-root');
    if (!root) return;
    const state = store.getState();
    applyTheme(state.theme);
    const activeVehicle = store.getActiveVehicle();
    const vehicles = state.vehicles;

    // Sihirbaz açıkken marka veya kasa tipi tıklandığında menünün kayıp sıçramaması için scroll konumlarını sakla
    const prevWizScroll = document.getElementById('wizard-scroll-body')?.scrollTop;
    const prevBrandsScroll = document.getElementById('wizard-brands-grid')?.scrollTop;

    let mainContent = '';
    switch (state.activeTab) {
      case 'garajim':
        if (!activeVehicle || vehicles.length === 0) {
          mainContent = renderEmptyGarageHero();
        } else {
          mainContent = `
            <div class="space-y-6 animate-fade-in">
              ${renderVehicleSwitcherBar()}
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div class="lg:col-span-5 space-y-6">
                  ${renderGarageCard()}
                  ${renderPwaTipCard()}
                </div>
                <div class="lg:col-span-7 space-y-6">
                  ${renderCockpitWidgets()}
                </div>
              </div>
            </div>
          `;
        }
        break;
      case 'bakim':
        mainContent = renderMaintenanceScreen();
        break;
      case 'piyasa':
        mainContent = renderMarketScreen();
        break;
      case 'profil':
        mainContent = renderProfileScreen();
        break;
      default:
        mainContent = renderEmptyGarageHero();
    }

    root.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex flex-col text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        ${renderHeader()}
        <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-12">
          ${mainContent}
        </main>
        ${renderBottomNav()}
        ${renderQuickKmModal()}
        ${renderVehicleWizardModal()}
        ${renderDatesAndValuationModal()}
        ${renderTireModal()}
        ${renderExpertiseModal()}
        ${renderFuelModal()}
        ${renderAdGeneratorModal()}
        ${renderDashboardLightsModal()}
        ${renderEmergencyModal()}
        ${renderPwaGuideModal()}
        ${renderToast()}
      </div>
    `;

    // Scroll konumunu anında geri yükle (sıfır kayma ve sıfır animasyonla)
    if (prevWizScroll !== undefined) {
      const curWiz = document.getElementById('wizard-scroll-body');
      if (curWiz) curWiz.scrollTop = prevWizScroll;
    }
    if (prevBrandsScroll !== undefined) {
      const curBrands = document.getElementById('wizard-brands-grid');
      if (curBrands) curBrands.scrollTop = prevBrandsScroll;
    }

    attachHeaderEvents();
    attachBottomNavEvents();
    if (state.activeTab === 'garajim') {
      attachGarageCardEvents();
      attachCockpitWidgetEvents();
    } else if (state.activeTab === 'bakim') {
      attachMaintenanceScreenEvents();
    } else if (state.activeTab === 'profil') {
      attachProfileScreenEvents();
    } else if (state.activeTab === 'piyasa') {
      attachMarketScreenEvents();
    }
    attachKmModalEvents();
    attachWizardModalEvents();
    attachDatesAndValuationModalEvents();
    attachTireModalEvents();
    attachExpertiseModalEvents();
    attachFuelModalEvents();
    attachAdGeneratorModalEvents();
    attachDashboardLightsModalEvents();
    attachEmergencyModalEvents();
    attachPwaModalEvents();
  }

  // Global erişim
  window.openAddWizard = () => store.setAddVehicleModalOpen(true);
  window.store = store;
  window.uluStore = store;

  store.subscribe(() => renderApp());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
})();

