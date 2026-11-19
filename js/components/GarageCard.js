import { store } from '../store.js';
import { Icons } from './Icons.js';
import { renderPlateBadge } from './PlateBadge.js';

export function renderGarageCard() {
  const state = store.getState();
  const vehicles = state.vehicles;
  const activeVehicle = store.getActiveVehicle();

  if (!activeVehicle) return '';

  return `
    <section class="space-y-3">
      <!-- Üst Araç Seçim Şeridi (Swipeable / Scrollable Pills) -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          ${Icons.car('w-4 h-4 text-blue-500')}
          <span>Garajımdaki Araçlar (${vehicles.length})</span>
        </div>
        <button 
          id="btn-open-add-vehicle" 
          class="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-2.5 py-1 rounded-xl border border-blue-500/30 transition active:scale-95"
        >
          ${Icons.plus('w-3.5 h-3.5')} Araç Ekle
        </button>
      </div>

      <!-- Araç Hızlı Seçim Hapları (Horizontal Scroll) -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        ${vehicles.map(v => {
          const isActive = v.id === activeVehicle.id;
          return `
            <button 
              type="button" 
              class="btn-switch-vehicle flex items-center gap-2 px-3 py-2 rounded-2xl border transition whitespace-nowrap active:scale-95 ${isActive ? 'bg-gradient-to-r from-blue-900/60 to-slate-900 border-blue-500/80 text-white shadow-md shadow-blue-500/15 ring-1 ring-blue-500/40' : 'bg-slate-800/80 border-slate-700/70 text-slate-400 hover:text-slate-200 hover:border-slate-600'}"
              data-id="${v.id}"
            >
              <span class="w-2 h-2 rounded-full ${isActive ? 'bg-blue-400 shadow-[0_0_8px_#38bdf8]' : 'bg-slate-600'}"></span>
              <span class="font-bold text-xs">${v.plate}</span>
              <span class="text-[11px] opacity-75">${v.brand}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Ana Garaj Kokpit Kartı (High-Tech Instrument Card) -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/90 via-slate-900/95 to-slate-950 border border-slate-700/80 p-5 shadow-2xl">
        <!-- Arka Plan Neon Işıma Efekti -->
        <div class="absolute -right-16 -top-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-16 -bottom-16 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Kart Üst Başlık & Araç Bilgisi -->
        <div class="flex items-start justify-between relative z-10 mb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                ${activeVehicle.year} • ${activeVehicle.fuel}
              </span>
              <span class="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium">
                ${activeVehicle.transmission}
              </span>
            </div>
            <h2 class="text-xl font-extrabold text-white tracking-tight">
              ${activeVehicle.brand} ${activeVehicle.model}
            </h2>
            <p class="text-xs text-slate-400 font-medium">
              ${activeVehicle.enginePackage}
            </p>
          </div>

          <!-- Silme Butonu (Garajda birden çok araç varsa) -->
          ${vehicles.length > 1 ? `
            <button 
              id="btn-delete-active-vehicle" 
              class="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition active:scale-90"
              title="Aracı Garajdan Sil"
            >
              ${Icons.close('w-4 h-4')}
            </button>
          ` : ''}
        </div>

        <!-- Plaka ve Hızlı Durum -->
        <div class="flex items-center justify-between bg-slate-950/80 p-3 rounded-2xl border border-slate-800/90 relative z-10 mb-4">
          <div>
            ${renderPlateBadge(activeVehicle.plate, 'md')}
          </div>
          <div class="text-right">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${activeVehicle.damageStatus === 'hatasiz' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}">
              <span class="w-1.5 h-1.5 rounded-full ${activeVehicle.damageStatus === 'hatasiz' ? 'bg-emerald-400' : 'bg-amber-400'}"></span>
              ${activeVehicle.damageStatus === 'hatasiz' ? 'Hatasız / Tramer Yok' : 'Ekspertizli'}
            </span>
          </div>
        </div>

        <!-- Odomometre ve Tek Tıkla KM Güncelleme Butonu -->
        <div class="relative z-10 bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 flex items-center justify-between">
          <div>
            <div class="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
              ${Icons.gauge('w-4 h-4 text-blue-400')}
              <span>Güncel Gösterge</span>
            </div>
            <div class="flex items-baseline gap-1.5">
              <span class="text-2xl font-black text-white font-mono tracking-tight">
                ${activeVehicle.currentKm.toLocaleString('tr-TR')}
              </span>
              <span class="text-xs font-bold text-slate-400">KM</span>
            </div>
            <span class="text-[10px] text-slate-400 font-medium block mt-0.5">
              Ortalama: ~${activeVehicle.monthlyAvgKm.toLocaleString('tr-TR')} KM / ay
            </span>
          </div>

          <!-- KM Güncelleme Hızlı İşlem Butonu -->
          <button 
            id="btn-open-km-modal" 
            class="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs shadow-lg shadow-blue-500/20 border border-blue-400/30 transition active:scale-95"
          >
            ${Icons.refresh('w-3.5 h-3.5')}
            <span>KM Güncelle</span>
          </button>
        </div>

      </div>
    </section>
  `;
}

export function attachGarageCardEvents() {
  // Araç değiştirme butonları
  document.querySelectorAll('.btn-switch-vehicle').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) store.setActiveVehicle(id);
    });
  });

  // KM Modal Açma
  const btnKmModal = document.getElementById('btn-open-km-modal');
  if (btnKmModal) {
    btnKmModal.addEventListener('click', () => store.setKmModalOpen(true));
  }

  // Araç Ekleme Sihirbazı Açma
  const btnAddVehicle = document.getElementById('btn-open-add-vehicle');
  if (btnAddVehicle) {
    btnAddVehicle.addEventListener('click', () => store.setAddVehicleModalOpen(true));
  }

  // Araç Silme Butonu
  const btnDeleteVehicle = document.getElementById('btn-delete-active-vehicle');
  if (btnDeleteVehicle) {
    btnDeleteVehicle.addEventListener('click', () => {
      const activeVehicle = store.getActiveVehicle();
      if (activeVehicle && confirm(`${activeVehicle.plate} plakalı aracı garajınızdan silmek istediğinize emin misiniz?`)) {
        store.deleteVehicle(activeVehicle.id);
      }
    });
  }
}
