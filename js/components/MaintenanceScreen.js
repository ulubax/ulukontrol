import { store } from '../store.js';
import { Icons } from './Icons.js';
import { renderPlateBadge } from './PlateBadge.js';

export function renderMaintenanceScreen() {
  const activeVehicle = store.getActiveVehicle();
  if (!activeVehicle) {
    return `<div class="p-6 text-center text-slate-400">Lütfen önce bir araç seçin.</div>`;
  }

  const nextServiceKm = activeVehicle.lastServiceKm + activeVehicle.serviceIntervalKm;
  const remainingKm = Math.max(0, nextServiceKm - activeVehicle.currentKm);

  return `
    <div class="space-y-4 pb-6 animate-fade-in">
      <!-- Başlık -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-extrabold text-white">Bakım & Lastik Takibi</h2>
          <p class="text-xs text-slate-400">Periyodik Servis, Sıvılar & Lastikler</p>
        </div>
        ${renderPlateBadge(activeVehicle.plate, 'sm')}
      </div>

      <!-- Servis Durum Özeti Banner -->
      <div class="rounded-3xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-500/30 p-5 shadow-lg relative overflow-hidden">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold uppercase tracking-wider text-blue-400">Sonraki Planlı Servis</span>
          <span class="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold">
            ${nextServiceKm.toLocaleString('tr-TR')} KM
          </span>
        </div>
        <div class="flex items-baseline gap-2 mb-2">
          <span class="text-3xl font-black text-white font-mono">${remainingKm.toLocaleString('tr-TR')}</span>
          <span class="text-sm font-semibold text-slate-400">KM Kaldı</span>
        </div>
        <p class="text-xs text-slate-300">
          Son periyodik bakım ${activeVehicle.lastServiceDate} tarihinde (${activeVehicle.lastServiceKm.toLocaleString('tr-TR')} KM) yapılmıştır.
        </p>
      </div>

      <!-- Bakımda Değişecek Parçalar Kontrol Listesi -->
      <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
          ${Icons.wrench('w-4 h-4 text-blue-400')}
          <span>Planlanan Servis İşlemleri (${nextServiceKm.toLocaleString('tr-TR')} KM)</span>
        </h3>
        <div class="space-y-2">
          ${[
            { name: 'Tam Sentetik Motor Yağı (5W-30 / 0W-20)', status: 'Değişim Şart', icon: 'checkCircle', color: 'text-blue-400' },
            { name: 'Yağ Filtresi (Orijinal OEM)', status: 'Değişim Şart', icon: 'checkCircle', color: 'text-blue-400' },
            { name: 'Hava Filtresi', status: 'Değişim Şart', icon: 'checkCircle', color: 'text-blue-400' },
            { name: 'Karbonlu Polen Filtresi', status: 'Tavsiye Edilen', icon: 'checkCircle', color: 'text-emerald-400' },
            { name: 'Ön / Arka Fren Balata Kalınlık Kontrolü', status: 'Kontrol', icon: 'shield', color: 'text-amber-400' },
            { name: 'Fren Hidroliği ve Antifriz Derece Ölçümü', status: 'Kontrol', icon: 'shield', color: 'text-amber-400' }
          ].map(item => `
            <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs">
              <div class="flex items-center gap-2.5">
                <span class="${item.color}">${Icons[item.icon] ? Icons[item.icon]('w-4 h-4') : '✓'}</span>
                <span class="font-medium text-slate-200">${item.name}</span>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">${item.status}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Lastik Detayı & Basınç Düzenleyici -->
      <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            ${Icons.gauge('w-4 h-4 text-blue-400')}
            <span>Lastik Sağlığı ve Basınç Kalibrasyonu</span>
          </h3>
          <span class="text-xs text-blue-400 font-bold">${activeVehicle.tires.season}</span>
        </div>

        <div class="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 mb-4 text-xs text-slate-300 space-y-1">
          <div class="flex justify-between">
            <span class="text-slate-400">Lastik Ebadı:</span>
            <span class="font-mono font-bold text-white">${activeVehicle.tires.size}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Marka / Model:</span>
            <span class="font-semibold text-white">${activeVehicle.tires.brand}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Diş Derinliği:</span>
            <span class="font-mono font-bold text-emerald-400">${activeVehicle.tires.treadDepthMm} mm (Yasal sınır 1.6 mm)</span>
          </div>
        </div>

        <!-- 4 Tekerlek Ayarlama Kartları -->
        <div class="grid grid-cols-2 gap-3">
          ${[
            { key: 'fl', label: 'Ön Sol (FL)', target: 33 },
            { key: 'fr', label: 'Ön Sağ (FR)', target: 33 },
            { key: 'rl', label: 'Arka Sol (RL)', target: 32 },
            { key: 'rr', label: 'Arka Sağ (RR)', target: 32 }
          ].map(w => {
            const currentPsi = activeVehicle.tires.pressures[w.key] || w.target;
            const isLow = currentPsi < w.target;
            return `
              <div class="p-3 rounded-2xl bg-slate-950 border ${isLow ? 'border-amber-500/40 bg-amber-500/5' : 'border-slate-800'}">
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="text-slate-400 font-medium">${w.label}</span>
                  <span class="text-[10px] text-slate-500">Hedef: ${w.target}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-black font-mono ${isLow ? 'text-amber-400' : 'text-emerald-400'}">
                    ${currentPsi} <span class="text-xs">PSI</span>
                  </span>
                  <div class="flex items-center gap-1">
                    <button class="btn-adjust-psi p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold active:scale-90" data-wheel="${w.key}" data-delta="-1">-</button>
                    <button class="btn-adjust-psi p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold active:scale-90" data-wheel="${w.key}" data-delta="1">+</button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- KM Geçmişi Kayıtları -->
      <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
          ${Icons.calendar('w-4 h-4 text-blue-400')}
          <span>Kilometre Güncelleme Geçmişi</span>
        </h3>
        <div class="space-y-2">
          ${(activeVehicle.kmHistory || []).map(hist => `
            <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
              <div>
                <span class="font-mono font-bold text-white text-sm">${hist.km.toLocaleString('tr-TR')} KM</span>
                <span class="text-[11px] text-slate-400 block">${hist.note || 'Güncelleme'}</span>
              </div>
              <span class="text-[11px] text-slate-500 font-mono">${hist.date}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function attachMaintenanceScreenEvents() {
  document.querySelectorAll('.btn-adjust-psi').forEach(btn => {
    btn.addEventListener('click', () => {
      const activeVehicle = store.getActiveVehicle();
      if (!activeVehicle) return;

      const wheel = btn.getAttribute('data-wheel');
      const delta = parseInt(btn.getAttribute('data-delta'), 10);

      if (wheel && activeVehicle.tires && activeVehicle.tires.pressures) {
        const nextVal = Math.max(20, Math.min(45, (activeVehicle.tires.pressures[wheel] || 32) + delta));
        activeVehicle.tires.pressures[wheel] = nextVal;
        store.showToast(`${wheel.toUpperCase()} lastik basıncı ${nextVal} PSI olarak güncellendi.`, 'info');
        store.notify();
      }
    });
  });
}
