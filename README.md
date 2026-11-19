# UluKontrol - PWA Mobil Kokpit ve Araç Takip Asistanı (Faz 1)

UluKontrol, modern otomotiv kokpitlerinden ilham alan, Türkiye araç piyasasına ve kullanıcı alışkanlıklarına özel olarak tasarlanmış yeni nesil Progressive Web App (PWA) mobil web uygulamasıdır.

---

## 🏎️ 1. Mimari ve Tasarım Dili

- **Uygulama Adı:** UluKontrol
- **Ekran Düzeni:** 
  - Masaüstünde ve geniş ekranlarda maksimum `430px` genişliğinde (iPhone Pro Max boyutlarında), üstte simüle edilmiş Dinamik Ada / Status Bar ve gerçekçi cihaz çerçevesi ile açılır.
  - Mobil cihazlarda ve "Ana Ekrana Ekle" sonrasında ise tam ekran (`viewport-fit=cover`, safe-area-inset) yerel uygulama gibi çalışır.
- **Tasarım Dili (Dark Cockpit Theme):**
  - Arka Plan: `#0F172A` (Slate 900) & `#020617` (Deep Space)
  - Vurgu Rengi: `#3B82F6` (Elektrik Mavisi)
  - Uyarı Rengi: `#F59E0B` (Kehribar Sarısı)
  - Durum Rengi: `#10B981` (Zümrüt Yeşili)
  - Kritik Hata: `#EF4444` (Kırmızı)
  - Tipografi: Inter & JetBrains Mono / DIN Plaka yazı tipi
  - Dokunmatik Hissi: `active:scale-95` mikro etkileşimleri

---

## 🛠️ 2. Faz 1 Özellikleri

### A. Kimlik Doğrulama (Auth) & Profil
- **Giriş Yap & Kayıt Ol Sekmeleri:** Ad, Soyad, @kullaniciadi, E-posta, TR Telefon formatı ve Güvenli Şifre alanları.
- **Tek Tıkla Demo Giriş:** Ekranda yer alan *"Demo Hesap ile Giriş Yap"* butonu ile doğrudan Ahmet Ulu (@ahmetulu) demo kullanıcısı ile açılış.
- **Profil Ekranı:** Sürücü doğrulama rozeti, garaj özet istatistikleri (Araç sayısı, Toplam KM, Hatırlatıcılar).
- **Bildirim Tercihleri:** Mobil Anlık Bildirimler, E-posta Özeti, SMS ile Kritik Uyarılar ve Periyodik Bakım Alarmları için interaktif açma/kapama anahtarları (toggle).
- **Demo Sıfırlama:** Tek tuşla tüm demo araçları ve kayıtları fabrika ayarlarına döndürme.

### B. Türkiye Araç Veritabanı ve Garaj Sihirbazı (Stepper)
- **1. Adım:**
  - Kasa Tipi Seçimi: *Otomobil, SUV / Crossover, Hafif Ticari*
  - Türkiye Popüler Markaları: *Renault, Volkswagen, Fiat, Ford, Toyota, Hyundai, Peugeot, Dacia, BMW, Mercedes-Benz, Opel, Skoda, Togg vb.*
  - Dinamik Model & Yıl (2010 - 2026): Seçilen markaya göre otomatik filtrelenen modeller (Megane, Clio, Egea, Golf, Passat, Focus, Corolla, T10X vb.).
  - Motor & Donanım Paketleri: Fabrika çıkış motor kodları (Örn: *1.5 Blue dCi Icon EDC, 1.4 Fire Easy, 1.5 eTSI R-Line, 1.8 Hybrid Passion*).
- **2. Adım:**
  - **Otantik TR Plaka Tasarımı:** Mavi sol şeritli, Avrupa yıldızlı, siyah kabartmalı canlı plaka önizlemesi (Örn: `34 ULU 61`).
  - Güncel Kilometre & Aylık Ortalama KM tahmini.
  - Son Bakım KM'si ve Tarihi.
  - Hasar ve Ekspertiz Seçimi (*Hatasız/Boyasız, Lokal Boyalı, 1-2 Parça Boyalı, Değişenli, Ağır Hasar*).
  - Tramer Tutarı ve Ekspertiz Notu.

### C. Ana Ekran (Garajım Dashboard) ve Alt Navigasyon
- **Üst Kısım:** Garajdaki araçlar arasında yatay kaydırmalı (swipeable) geçiş sağlayan Araç Kartı ve "+ Araç Ekle" butonu.
- **Hızlı KM Güncelleme Modalı:** Tek tıkla açılan, `+100`, `+250`, `+500`, `+1.000` hızlı artırma butonları ve canlı gün/km fark hesaplayıcısı.
- **4 Adet Kokpit Önizleme Kartı:**
  1. **Yaklaşan Periyodik Bakım:** Kalan KM, tahmini kalan gün sayısı, ilerleme çubuğu ve değişecek parça önizlemesi.
  2. **Piyasa Değerim (S-Aracım Özeti):** Güncel tahmini piyasa değeri (₺), 30 günlük trend grafiği (Sparkline), minimum/maksimum piyasa aralığı.
  3. **Lastik Ömrü ve Hava Basıncı:** 4 tekerlekli kokpit basınç şeması (FL, FR, RL, RR PSI göstergeleri), mevsime özel lastik durumu ve diş derinliği göstergesi.
  4. **Resmi Tarihler ve Kronik Sorunlar:** TÜVTÜRK Muayene geri sayımı, Zorunlu Trafik Sigortası bitiş tarihi ve o model/motora özel bilinen kronik teknik bülten notu.
- **Sabit Alt Navigasyon Çubuğu (Bottom Tab Bar):**
  - `Garajım`
  - `Bakım & Lastik`
  - `Piyasa & Kronik`
  - `Profil`

---

## 💾 3. Veri Kalıcılığı & Demo Veriler

- `localStorage` tabanlı state yönetimi sayesinde sayfa yenilendiğinde hiçbir veri kaybolmaz.
- İlk açılışta hazır gelen araçlar:
  - **34 ULU 61:** 2021 Renault Megane Sedan 1.5 Blue dCi Icon EDC (78.450 KM)
  - **06 UK 1923:** 2023 Volkswagen Golf 1.5 eTSI R-Line DSG (28.600 KM)

---

## 🚀 4. Uygulamayı Çalıştırma ve Test Etme

### Seçenek 1: Tek Tıkla Başlatma (Tavsiye Edilen)
Klasördeki `start-app.bat` dosyasına çift tıklayarak yerel test sunucusunu `http://localhost:5173` adresinde başlatabilir ve tarayıcınızda açabilirsiniz.

### Seçenek 2: Doğrudan Tarayıcıda Açma
`index.html` dosyasını Google Chrome, Edge veya Safari ile doğrudan açabilirsiniz.

### Seçenek 3: Modern Vite / NPM Akışı
```bash
npm install
npm run dev
```

---

## 📱 PWA Kurulumu ("Ana Ekrana Ekle")

1. Tarayıcıda `http://localhost:5173` adresini açın.
2. Ekranda beliren **"UluKontrol'ü Yükle"** banner'ına veya sağ üstteki indirme simgesine tıklayın.
3. iOS Safari'de: Alttaki **Paylaş** simgesine dokunun ve **"Ana Ekrana Ekle"** seçeneğini seçin.
4. Uygulama artık mobil cihazınızın ana ekranında yerel bir iOS/Android uygulaması gibi çalışacaktır.
