import { store } from '../store.js';
import { Icons } from './Icons.js';
import { renderPlateBadge } from './PlateBadge.js';

export function renderQuickKmModal() {
  const state = store.getState();
  if (!state.isKmModalOpen) return '';

  const vehicle = store.getActiveVehicle();
  if (!vehicle) return '';

  const currentKm = vehicle.currentKm;

  return `
    <div id="km-modal-backdrop" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      <div class="bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 shadow-2xl animate-slide-up text-slate-100 relative">
        <!-- Başlık ve Kapat Butonu -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              ${Icons.gauge('w-6 h-6')}
            </div>
            <div>
              <h3 class="font-bold text-lg text-white">Güncel KM Güncelle</h3>
              <p class="text-xs text-slate-400">${vehicle.brand} ${vehicle.model}</p>
            </div>
          </div>
          <button id="btn-close-km-modal" class="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition active:scale-90">
            ${Icons.close('w-5 h-5')}
          </button>
        </div>

        <!-- Seçili Araç Plaka Rozeti -->
        <div class="flex items-center justify-between my-4 bg-slate-800/60 p-3 rounded-2xl border border-slate-700/50">
          <div class="flex items-center gap-2">
            ${renderPlateBadge(vehicle.plate, 'sm')}
          </div>
          <div class="text-right">
            <span class="text-[11px] text-slate-400 uppercase tracking-wider block">Mevcut Kayıt</span>
            <span class="text-sm font-bold text-blue-400 font-mono">${currentKm.toLocaleString('tr-TR')} KM</span>
          </div>
        </div>

        <!-- Hızlı KM Ekleme Butonları -->
        <div class="mb-4">
          <label class="text-xs font-semibold text-slate-400 block mb-2">Hızlı KM Ekle</label>
          <div class="grid grid-cols-4 gap-2">
            <button type="button" class="btn-quick-add py-2 text-xs font-medium rounded-xl bg-slate-800 hover:bg-blue-600/20 text-slate-200 border border-slate-700 hover:border-blue-500 transition active:scale-95" data-add="100">+100</button>
            <button type="button" class="btn-quick-add py-2 text-xs font-medium rounded-xl bg-slate-800 hover:bg-blue-600/20 text-slate-200 border border-slate-700 hover:border-blue-500 transition active:scale-95" data-add="250">+250</button>
            <button type="button" class="btn-quick-add py-2 text-xs font-medium rounded-xl bg-slate-800 hover:bg-blue-600/20 text-slate-200 border border-slate-700 hover:border-blue-500 transition active:scale-95" data-add="500">+500</button>
            <button type="button" class="btn-quick-add py-2 text-xs font-medium rounded-xl bg-slate-800 hover:bg-blue-600/20 text-slate-200 border border-slate-700 hover:border-blue-500 transition active:scale-95" data-add="1000">+1.000</button>
          </div>
        </div>

        <!-- Yeni KM Giriş Alanı -->
        <div class="mb-4">
          <label for="input-new-km" class="text-xs font-semibold text-slate-400 block mb-1.5">Yeni Kilometre</label>
          <div class="relative">
            <input 
              type="number" 
              id="input-new-km" 
              min="${currentKm}" 
              value="${currentKm}" 
              step="1"
              class="w-full bg-slate-950 border-2 border-slate-700 focus:border-blue-500 rounded-2xl py-3.5 px-4 text-xl font-bold font-mono text-white placeholder-slate-600 outline-none transition"
              placeholder="${currentKm}"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">KM</span>
          </div>
          <p id="km-diff-preview" class="text-xs text-blue-400 mt-2 font-medium flex items-center gap-1">
            ${Icons.checkCircle('w-3.5 h-3.5')} Değişiklik yok (+0 km)
          </p>
        </div>

        <!-- Butonlar -->
        <div class="flex gap-3 pt-2">
          <button 
            type="button" 
            id="btn-cancel-km" 
            class="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition active:scale-95"
          >
            Vazgeç
          </button>
          <button 
            type="button" 
            id="btn-save-km" 
            class="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition active:scale-95 flex items-center justify-center gap-2"
          >
            ${Icons.check('w-4 h-4')} Kaydet
          </button>
        </div>
      </div>
    </div>
  `;
}

export function attachKmModalEvents() {
  const state = store.getState();
  if (!state.isKmModalOpen) return;

  const vehicle = store.getActiveVehicle();
  if (!vehicle) return;

  const modalBackdrop = document.getElementById('km-modal-backdrop');
  const btnClose = document.getElementById('btn-close-km-modal');
  const btnCancel = document.getElementById('btn-cancel-km');
  const btnSave = document.getElementById('btn-save-km');
  const inputKm = document.getElementById('input-new-km');
  const diffPreview = document.getElementById('km-diff-preview');
  const quickAddBtns = document.querySelectorAll('.btn-quick-add');

  const closeModal = () => store.setKmModalOpen(false);

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  const updateDiff = (val) => {
    const newKm = parseInt(val, 10);
    if (isNaN(newKm)) {
      diffPreview.innerHTML = `<span class="text-amber-400">Lütfen geçerli bir kilometre girin.</span>`;
      return;
    }
    const diff = newKm - vehicle.currentKm;
    if (diff < 0) {
      diffPreview.innerHTML = `<span class="text-rose-400">Yeni KM mevcut KM'den (${vehicle.currentKm.toLocaleString('tr-TR')}) az olamaz!</span>`;
    } else if (diff === 0) {
      diffPreview.innerHTML = `${Icons.checkCircle('w-3.5 h-3.5')} Değişiklik yok (+0 km)`;
    } else {
      const daysEstimate = Math.round(diff / (vehicle.monthlyAvgKm / 30));
      diffPreview.innerHTML = `${Icons.arrowUpRight('w-3.5 h-3.5')} <strong>+${diff.toLocaleString('tr-TR')} KM</strong> artış (~${daysEstimate > 0 ? daysEstimate : 1} günlük sürüş)`;
    }
  };

  if (inputKm) {
    inputKm.addEventListener('input', (e) => updateDiff(e.target.value));
  }

  quickAddBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const add = parseInt(btn.getAttribute('data-add'), 10);
      const currentVal = parseInt(inputKm.value, 10) || vehicle.currentKm;
      const nextVal = currentVal + add;
      inputKm.value = nextVal;
      updateDiff(nextVal);
    });
  });

  if (btnSave) {
    btnSave.addEventListener('click', () => {
      const newKm = inputKm.value;
      store.updateVehicleKm(newKm);
    });
  }
}
