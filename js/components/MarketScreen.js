import { store } from '../store.js';
import { Icons } from './Icons.js';
import { renderPlateBadge } from './PlateBadge.js';

export function renderMarketScreen() {
  const activeVehicle = store.getActiveVehicle();
  if (!activeVehicle) {
    return `<div class="p-6 text-center text-slate-400">Lütfen önce bir araç seçin.</div>`;
  }

  const basePrice = activeVehicle.marketValue || 1200000;
  const lowPrice = Math.round(basePrice * 0.94);
  const highPrice = Math.round(basePrice * 1.06);

  return `
    <div class="space-y-4 pb-6 animate-fade-in">
      <!-- Başlık -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-extrabold text-white">Piyasa Değeri & Kronik Rehber</h2>
          <p class="text-xs text-slate-400">S-Aracım Değerleme ve Teknik Bülten</p>
        </div>
        ${renderPlateBadge(activeVehicle.plate, 'sm')}
      </div>

      <!-- S-Aracım Yapay Zeka Değerleme Kartı -->
      <div class="rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-5 shadow-2xl relative overflow-hidden">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            ${Icons.sparkles('w-4 h-4')}
            <span>Tahmini Piyasa Değeri</span>
          </span>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            ${activeVehicle.marketTrend || '+2.4%'} Son 30 Gün
          </span>
        </div>

        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-3xl font-black text-white font-mono tracking-tight">
            ${basePrice.toLocaleString('tr-TR')}
          </span>
          <span class="text-lg font-bold text-slate-400">₺</span>
        </div>

        <!-- Fiyat Aralığı Cetveli -->
        <div class="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 mb-4 space-y-2">
          <div class="flex justify-between text-xs">
            <span class="text-slate-400">Hızlı Satış Fiyatı:</span>
            <span class="font-mono font-bold text-slate-200">${lowPrice.toLocaleString('tr-TR')} ₺</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-emerald-400 font-semibold">Tavsiye Edilen İlan:</span>
            <span class="font-mono font-bold text-emerald-400 text-sm">${basePrice.toLocaleString('tr-TR')} ₺</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-slate-400">Üst Limit (Kusursuz):</span>
            <span class="font-mono font-bold text-slate-200">${highPrice.toLocaleString('tr-TR')} ₺</span>
          </div>
        </div>

        <!-- Değerleme Faktörleri -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
            <span class="text-[10px] text-slate-400 block mb-0.5">Kilometre Etkisi</span>
            <span class="font-bold text-blue-400 font-mono">${activeVehicle.currentKm.toLocaleString('tr-TR')} KM</span>
            <span class="text-[10px] text-slate-500 block">Piyasa ortalamasında</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
            <span class="text-[10px] text-slate-400 block mb-0.5">Ekspertiz Durumu</span>
            <span class="font-bold text-emerald-400">${activeVehicle.damageStatus === 'hatasiz' ? 'Hatasız / Boyasız' : 'Ekspertiz Kayıtlı'}</span>
            <span class="text-[10px] text-slate-500 block">+%4.5 Değer Avantajı</span>
          </div>
        </div>
      </div>

      <!-- Araca Özel Kronik Sorunlar ve Önleyici Çözümler -->
      <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            ${Icons.alertTriangle('w-4 h-4')}
            <span>${activeVehicle.brand} ${activeVehicle.model} Kronik Sorunlar</span>
          </h3>
          <span class="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-bold">
            Risk: ${activeVehicle.chronicLevel || 'Orta'}
          </span>
        </div>

        <div class="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 mb-4">
          <h4 class="text-sm font-bold text-white mb-1.5">Model Teknik Analiz Notu</h4>
          <p class="text-xs text-slate-300 leading-relaxed">
            ${activeVehicle.chronicNote}
          </p>
        </div>

        <!-- Önleyici Adımlar -->
        <h4 class="text-xs font-bold uppercase text-slate-400 mb-2">Önleyici Bakım Tavsiyeleri</h4>
        <div class="space-y-2">
          ${[
            { title: 'Şanzıman / Mekatronik Yazılımı', desc: 'Yetkili servis cihazı ile yazılım versiyonu güncelliği kontrol edilmelidir.', tag: 'Yazılım' },
            { title: 'Soğutma Sıvısı ve Termostat', desc: 'Sıcaklık dalgalanması yaşanmaması için organik antifriz kullanılmalıdır.', tag: 'Mekanik' },
            { title: 'Akü ve Şarj Sistemi', desc: 'Start-Stop ve akıllı alternatör voltaj değerleri her bakımda test edilmelidir.', tag: 'Elektrik' }
          ].map(tip => `
            <div class="p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-xs">
              <div class="flex items-center justify-between mb-1">
                <span class="font-bold text-slate-200">${tip.title}</span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">${tip.tag}</span>
              </div>
              <p class="text-[11px] text-slate-400 leading-relaxed">${tip.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
