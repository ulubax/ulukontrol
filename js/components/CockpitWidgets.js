import { store } from '../store.js';
import { Icons } from './Icons.js';

export function renderCockpitWidgets() {
  const activeVehicle = store.getActiveVehicle();
  if (!activeVehicle) return '';

  return `
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          ${Icons.sparkles('w-4 h-4 text-amber-400')}
          <span>Kokpit Durum ve Önizleme</span>
        </h3>
        <span class="text-[11px] text-blue-400 font-semibold">Canlı Senkron</span>
      </div>

      <!-- 1. KART: Yaklaşan Periyodik Bakım -->
      ${renderMaintenanceCard(activeVehicle)}

      <!-- 2. KART: Piyasa Değerim (S-Aracım Özeti) -->
      ${renderMarketValueCard(activeVehicle)}

      <!-- 3. KART: Lastik Ömrü ve Hava Basıncı -->
      ${renderTiresCard(activeVehicle)}

      <!-- 4. KART: Resmi Tarihler ve Kronik Sorunlar -->
      ${renderOfficialDatesAndChronicCard(activeVehicle)}
    </section>
  `;
}

// 1. KART: Yaklaşan Periyodik Bakım
function renderMaintenanceCard(vehicle) {
  const nextServiceKm = vehicle.lastServiceKm + vehicle.serviceIntervalKm;
  const remainingKm = Math.max(0, nextServiceKm - vehicle.currentKm);
  const cycleDistance = vehicle.serviceIntervalKm;
  const drivenInCycle = Math.max(0, vehicle.currentKm - vehicle.lastServiceKm);
  const progressPercent = Math.min(100, Math.round((drivenInCycle / cycleDistance) * 100));

  const dailyKm = Math.max(1, vehicle.monthlyAvgKm / 30);
  const daysRemaining = Math.max(0, Math.round(remainingKm / dailyKm));

  const isUrgent = remainingKm <= 2000;
  const isOverdue = remainingKm <= 0;

  return `
    <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-2xl ${isOverdue ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' : isUrgent ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'}">
            ${Icons.wrench('w-5 h-5')}
          </div>
          <div>
            <h4 class="font-bold text-sm text-white">Yaklaşan Periyodik Bakım</h4>
            <p class="text-xs text-slate-400">Her ${vehicle.serviceIntervalKm.toLocaleString('tr-TR')} KM Döngüsü</p>
          </div>
        </div>
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${isOverdue ? 'bg-rose-500/15 text-rose-400' : isUrgent ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 animate-pulse' : 'bg-emerald-500/15 text-emerald-400'}">
          ${isOverdue ? 'Bakım Gecikti' : isUrgent ? 'Yaklaşıyor' : 'Normal'}
        </span>
      </div>

      <!-- Kalan Bilgileri -->
      <div class="grid grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 mb-3">
        <div>
          <span class="text-[10px] text-slate-400 uppercase font-semibold block">Kalan Mesafe</span>
          <span class="text-base font-extrabold text-white font-mono">
            ${remainingKm.toLocaleString('tr-TR')} KM
          </span>
        </div>
        <div class="text-right">
          <span class="text-[10px] text-slate-400 uppercase font-semibold block">Tahmini Kalan Süre</span>
          <span class="text-base font-extrabold text-amber-400 font-mono">
            ~${daysRemaining} Gün
          </span>
        </div>
      </div>

      <!-- İlerleme Çubuğu -->
      <div class="space-y-1.5 mb-3">
        <div class="flex justify-between text-[11px] text-slate-400">
          <span>Son Bakım: ${vehicle.lastServiceKm.toLocaleString('tr-TR')} KM</span>
          <span class="font-bold text-white">%${progressPercent} Doldu</span>
        </div>
        <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-500 ${isOverdue ? 'bg-rose-500' : isUrgent ? 'bg-amber-500' : 'bg-blue-500'}" 
            style="width: ${progressPercent}%"
          ></div>
        </div>
      </div>

      <button 
        type="button" 
        class="btn-nav-to-tab w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-blue-400 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95"
        data-target-tab="bakim"
      >
        <span>Detaylı Bakım Geçmişi & Parça Listesi</span>
        ${Icons.chevronRight('w-3.5 h-3.5')}
      </button>
    </div>
  `;
}

// 2. KART: Piyasa Değerim (S-Aracım Özeti)
function renderMarketValueCard(vehicle) {
  const formattedVal = (vehicle.marketValue || 1200000).toLocaleString('tr-TR');
  const minVal = Math.round(vehicle.marketValue * 0.95).toLocaleString('tr-TR');
  const maxVal = Math.round(vehicle.marketValue * 1.05).toLocaleString('tr-TR');

  return `
    <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            ${Icons.trendingUp('w-5 h-5')}
          </div>
          <div>
            <h4 class="font-bold text-sm text-white">Piyasa Değerim (S-Aracım)</h4>
            <p class="text-xs text-slate-400">Güncel İkinci El Algoritması</p>
          </div>
        </div>
        <span class="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
          ${vehicle.marketTrend || '+2.4%'} ↗
        </span>
      </div>

      <!-- Fiyat ve Aralık Gösterimi -->
      <div class="mb-3">
        <div class="flex items-baseline gap-1">
          <span class="text-2xl font-black text-white font-mono tracking-tight">${formattedVal}</span>
          <span class="text-sm font-bold text-slate-400">₺</span>
        </div>
        <p class="text-[11px] text-slate-400 mt-0.5">
          Piyasa Aralığı: <span class="text-slate-200 font-mono">${minVal} ₺ - ${maxVal} ₺</span>
        </p>
      </div>

      <!-- Mini Trend Çizimi (Sparkline) -->
      <div class="bg-slate-950/70 p-2.5 rounded-2xl border border-slate-800/80 mb-3 flex items-center justify-between">
        <div class="text-[10px] text-slate-400">
          <span>Son 30 Günlük Değişim:</span>
          <span class="text-emerald-400 font-bold block font-mono">+${(vehicle.marketTrendAmount || 25000).toLocaleString('tr-TR')} ₺</span>
        </div>
        <!-- SVG Sparkline -->
        <svg class="w-32 h-8 text-emerald-400" viewBox="0 0 100 24" fill="none">
          <path d="M0 20 L20 18 L40 14 L60 16 L80 9 L100 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="100" cy="4" r="3" fill="#10B981" />
        </svg>
      </div>

      <button 
        type="button" 
        class="btn-nav-to-tab w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-emerald-400 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95"
        data-target-tab="piyasa"
      >
        <span>Detaylı Piyasa Analizi & Fiyat Eğrisi</span>
        ${Icons.chevronRight('w-3.5 h-3.5')}
      </button>
    </div>
  `;
}

// 3. KART: Lastik Ömrü & Hava Basıncı
function renderTiresCard(vehicle) {
  const tires = vehicle.tires || {
    brand: 'Standart',
    season: 'Yazlık',
    treadDepthMm: 6.4,
    lifePercentage: 80,
    pressures: { fl: 33, fr: 33, rl: 32, rr: 31 }
  };

  const p = tires.pressures;

  return `
    <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
            ${Icons.gauge('w-5 h-5')}
          </div>
          <div>
            <h4 class="font-bold text-sm text-white">Lastik Ömrü & Hava Basıncı</h4>
            <p class="text-xs text-slate-400">${tires.season} • Diş: ${tires.treadDepthMm} mm (%${tires.lifePercentage})</p>
          </div>
        </div>
        <span class="px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400 text-[10px] font-bold">
          ${tires.season}
        </span>
      </div>

      <!-- 4 Tekerlek Kokpit Basınç Şeması -->
      <div class="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 mb-3">
        <div class="grid grid-cols-2 gap-4 relative">
          <!-- Sol Ön (FL) -->
          <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span class="text-[10px] font-semibold text-slate-400">Sol Ön (FL)</span>
            <span class="text-xs font-mono font-bold ${p.fl < 32 ? 'text-amber-400' : 'text-emerald-400'}">${p.fl} PSI</span>
          </div>

          <!-- Sağ Ön (FR) -->
          <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span class="text-[10px] font-semibold text-slate-400">Sağ Ön (FR)</span>
            <span class="text-xs font-mono font-bold ${p.fr < 32 ? 'text-amber-400' : 'text-emerald-400'}">${p.fr} PSI</span>
          </div>

          <!-- Sol Arka (RL) -->
          <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span class="text-[10px] font-semibold text-slate-400">Sol Arka (RL)</span>
            <span class="text-xs font-mono font-bold ${p.rl < 31 ? 'text-amber-400' : 'text-emerald-400'}">${p.rl} PSI</span>
          </div>

          <!-- Sağ Arka (RR) - Uyarı Örneği -->
          <div class="p-2.5 rounded-xl bg-slate-900 border ${p.rr < 32 ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-800'} flex items-center justify-between">
            <span class="text-[10px] font-semibold text-slate-400">Sağ Arka (RR)</span>
            <span class="text-xs font-mono font-bold ${p.rr < 32 ? 'text-amber-400' : 'text-emerald-400'}">
              ${p.rr} PSI ${p.rr < 32 ? '⚠️' : ''}
            </span>
          </div>
        </div>
      </div>

      <p class="text-[11px] text-slate-400 mb-3 flex items-center gap-1.5">
        ${Icons.alertTriangle('w-3.5 h-3.5 text-amber-400 shrink-0')}
        <span>Sağ arka lastik basıncı 1 PSI düşük. En yakın istasyonda kontrol ediniz.</span>
      </p>

      <button 
        type="button" 
        class="btn-nav-to-tab w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-blue-400 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95"
        data-target-tab="bakim"
      >
        <span>Lastik Değişimi & Rotasyon Tavsiyesi</span>
        ${Icons.chevronRight('w-3.5 h-3.5')}
      </button>
    </div>
  `;
}

// 4. KART: Resmi Tarihler & Kronik Sorunlar
function renderOfficialDatesAndChronicCard(vehicle) {
  // Muayene kalan gün hesabı
  const inspDate = new Date(vehicle.inspectionDate || '2027-03-15');
  const now = new Date('2026-11-18');
  const diffTime = inspDate - now;
  const daysInsp = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return `
    <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            ${Icons.calendar('w-5 h-5')}
          </div>
          <div>
            <h4 class="font-bold text-sm text-white">Resmi Tarihler & Kronik İpuçları</h4>
            <p class="text-xs text-slate-400">Muayene, Sigorta ve Model Notu</p>
          </div>
        </div>
        <span class="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-bold">
          ${daysInsp} Gün Kaldı
        </span>
      </div>

      <!-- Tarih Özetleri -->
      <div class="space-y-2 mb-3">
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
          <div class="flex items-center gap-2 text-slate-300">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>TÜVTÜRK Muayene</span>
          </div>
          <span class="font-mono font-bold text-slate-100">${vehicle.inspectionDate} (${daysInsp} gün)</span>
        </div>

        <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
          <div class="flex items-center gap-2 text-slate-300">
            <span class="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>Trafik Sigortası</span>
          </div>
          <span class="font-mono font-bold text-slate-100">${vehicle.insuranceDate}</span>
        </div>
      </div>

      <!-- Araca Özel Bilinen Kronik Sorun Uyarısı -->
      <div class="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-3">
        <div class="flex items-center gap-2 mb-1">
          ${Icons.alertTriangle('w-4 h-4 text-amber-400')}
          <span class="text-xs font-bold text-amber-300">${vehicle.brand} ${vehicle.model} Kronik Tavsiyesi</span>
        </div>
        <p class="text-[11px] text-slate-300 leading-relaxed">
          ${vehicle.chronicNote || 'Bu model için kayıtlı kritik teknik bülten bulunmamaktadır.'}
        </p>
      </div>

      <button 
        type="button" 
        class="btn-nav-to-tab w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-amber-400 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95"
        data-target-tab="piyasa"
      >
        <span>Model Bültenlerini İncele</span>
        ${Icons.chevronRight('w-3.5 h-3.5')}
      </button>
    </div>
  `;
}

export function attachCockpitWidgetEvents() {
  document.querySelectorAll('.btn-nav-to-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target-tab');
      if (target) store.setActiveTab(target);
    });
  });
}
