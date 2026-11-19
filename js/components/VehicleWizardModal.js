import { store } from '../store.js';
import { BODY_TYPES, BRANDS, VEHICLE_MODELS, YEARS, DAMAGE_STATUSES } from '../data/vehiclesData.js';
import { Icons } from './Icons.js';
import { renderPlateBadge } from './PlateBadge.js';

// Sihirbaz geçici formu state'i
let wizardState = {
  currentStep: 1,
  bodyType: 'otomobil',
  brand: 'renault',
  model: 'Megane Sedan',
  modelId: 'megane_sedan',
  year: 2022,
  enginePackage: '1.5 Blue dCi Icon EDC',
  fuel: 'Dizel',
  transmission: 'Otomatik',
  plate: '34 ABC 123',
  currentKm: 45000,
  monthlyAvgKm: 1200,
  lastServiceKm: 40000,
  lastServiceDate: '2026-04-10',
  damageStatus: 'hatasiz',
  tramerAmount: 0,
  damageNote: ''
};

export function renderVehicleWizardModal() {
  const state = store.getState();
  if (!state.isAddVehicleModalOpen) return '';

  const availableModels = VEHICLE_MODELS[wizardState.brand] || [];
  const selectedModelObj = availableModels.find(m => m.id === wizardState.modelId) || availableModels[0] || null;
  const availableEngines = selectedModelObj ? selectedModelObj.engines : [];

  return `
    <div id="wizard-modal-backdrop" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 overflow-y-auto animate-fade-in">
      <div class="bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl w-full max-w-lg shadow-2xl animate-slide-up text-slate-100 flex flex-col max-h-[92vh]">
        
        <!-- Modal Başlık & Stepper Göstergesi -->
        <div class="p-5 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              ${Icons.plus('w-5 h-5')}
            </div>
            <div>
              <h2 class="font-bold text-lg text-white">Yeni Araç Ekle</h2>
              <p class="text-xs text-slate-400">Garaj Ekleme Sihirbazı</p>
            </div>
          </div>
          <button id="btn-close-wizard" class="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition active:scale-90">
            ${Icons.close('w-5 h-5')}
          </button>
        </div>

        <!-- Stepper İlerleme Çubuğu -->
        <div class="px-6 pt-4 pb-2 bg-slate-950/50">
          <div class="flex items-center justify-between mb-2 text-xs">
            <span class="font-semibold ${wizardState.currentStep === 1 ? 'text-blue-400' : 'text-slate-400'}">
              1. Araç & Motor Bilgisi
            </span>
            <span class="font-semibold ${wizardState.currentStep === 2 ? 'text-blue-400' : 'text-slate-400'}">
              2. Plaka, KM & Ekspertiz
            </span>
          </div>
          <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-300 ${wizardState.currentStep === 1 ? 'w-1/2' : 'w-full'}"></div>
          </div>
        </div>

        <!-- Adım İçeriği (Kaydırılabilir) -->
        <div class="p-6 overflow-y-auto flex-1 space-y-5">
          ${wizardState.currentStep === 1 ? renderStep1(availableModels, availableEngines) : renderStep2()}
        </div>

        <!-- Alt Gezinme Butonları -->
        <div class="p-5 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-3">
          ${wizardState.currentStep === 2 ? `
            <button 
              type="button" 
              id="btn-wizard-prev" 
              class="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition active:scale-95 flex items-center gap-1.5"
            >
              ${Icons.chevronLeft('w-4 h-4')} Geri
            </button>
          ` : `
            <button 
              type="button" 
              id="btn-wizard-cancel" 
              class="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 font-semibold text-sm transition active:scale-95"
            >
              Vazgeç
            </button>
          `}

          ${wizardState.currentStep === 1 ? `
            <button 
              type="button" 
              id="btn-wizard-next" 
              class="flex-1 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition active:scale-95 flex items-center justify-center gap-2"
            >
              Devam Et ${Icons.chevronRight('w-4 h-4')}
            </button>
          ` : `
            <button 
              type="button" 
              id="btn-wizard-submit" 
              class="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition active:scale-95 flex items-center justify-center gap-2"
            >
              ${Icons.checkCircle('w-4 h-4')} Aracı Garaja Ekle
            </button>
          `}
        </div>

      </div>
    </div>
  `;
}

function renderStep1(availableModels, availableEngines) {
  return `
    <!-- 1. Kasa Tipi Seçimi -->
    <div>
      <label class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">1. Kasa Tipi</label>
      <div class="grid grid-cols-3 gap-2">
        ${BODY_TYPES.map(bt => `
          <button 
            type="button" 
            class="btn-select-body-type p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${wizardState.bodyType === bt.id ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-sm' : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:border-slate-600'}"
            data-type="${bt.id}"
          >
            <span class="text-lg">${Icons[bt.icon] ? Icons[bt.icon]('w-5 h-5') : '🚗'}</span>
            <span class="text-[11px] font-semibold leading-tight">${bt.label.split(' ')[0]}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- 2. Marka Seçimi -->
    <div>
      <label class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">2. Marka</label>
      <div class="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto pr-1">
        ${BRANDS.map(br => `
          <button 
            type="button" 
            class="btn-select-brand p-2.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${wizardState.brand === br.id ? 'bg-blue-600/20 border-blue-500 text-blue-400 ring-1 ring-blue-500' : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:border-slate-600'}"
            data-brand="${br.id}"
          >
            <span class="text-base">${br.logo}</span>
            <span class="text-[11px] font-semibold truncate w-full">${br.name}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- 3. Model & Yıl -->
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label for="select-model" class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">3. Model</label>
        <select id="select-model" class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-2xl py-3 px-3 text-sm font-semibold text-white outline-none">
          ${availableModels.length > 0 ? availableModels.map(m => `
            <option value="${m.id}" ${wizardState.modelId === m.id ? 'selected' : ''}>${m.name}</option>
          `).join('') : '<option value="diger">Diğer Model</option>'}
        </select>
      </div>

      <div>
        <label for="select-year" class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Model Yılı</label>
        <select id="select-year" class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-2xl py-3 px-3 text-sm font-semibold text-white outline-none">
          ${YEARS.map(yr => `
            <option value="${yr}" ${wizardState.year === yr ? 'selected' : ''}>${yr}</option>
          `).join('')}
        </select>
      </div>
    </div>

    <!-- 4. Motor ve Donanım Paketi -->
    <div>
      <label for="select-engine" class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">4. Motor & Donanım Paketi</label>
      <select id="select-engine" class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-2xl py-3 px-3 text-sm font-semibold text-white outline-none mb-2">
        ${availableEngines.length > 0 ? availableEngines.map(eng => `
          <option value="${eng.code}" ${wizardState.enginePackage === eng.code ? 'selected' : ''}>
            ${eng.code} (${eng.hp} HP - ${eng.fuel})
          </option>
        `).join('') : '<option value="Standart Paket">Standart Paket</option>'}
      </select>
      <p class="text-[11px] text-slate-400">
        💡 Seçtiğiniz motor tipine göre periyodik bakım aralığı ve kronik sorun uyarıları otomatik yüklenecektir.
      </p>
    </div>
  `;
}

function renderStep2() {
  return `
    <!-- Plaka Girişi ve Canlı Önizleme -->
    <div class="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
      <label class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Araç Plakası</label>
      <div class="flex items-center gap-3 mb-3">
        <input 
          type="text" 
          id="input-wizard-plate" 
          value="${wizardState.plate}" 
          maxlength="11" 
          class="flex-1 bg-slate-900 border-2 border-slate-700 focus:border-blue-500 rounded-2xl py-3 px-4 text-base font-bold font-mono uppercase text-white placeholder-slate-600 outline-none transition"
          placeholder="34 ULU 61"
        />
      </div>
      <div class="flex flex-col items-center justify-center p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
        <span class="text-[10px] text-slate-500 mb-1.5 uppercase font-semibold">Canlı Plaka Tasarımı</span>
        <div id="wizard-plate-preview">
          ${renderPlateBadge(wizardState.plate || '34 ULU 61', 'lg')}
        </div>
      </div>
    </div>

    <!-- Güncel KM ve Aylık Ortalama KM -->
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label for="input-wizard-km" class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Güncel Kilometre</label>
        <div class="relative">
          <input 
            type="number" 
            id="input-wizard-km" 
            value="${wizardState.currentKm}" 
            min="0"
            class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-2xl py-3 px-3.5 text-base font-bold font-mono text-white outline-none"
            placeholder="50000"
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">KM</span>
        </div>
      </div>

      <div>
        <label for="input-wizard-monthly" class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Aylık Tahmini KM</label>
        <div class="relative">
          <input 
            type="number" 
            id="input-wizard-monthly" 
            value="${wizardState.monthlyAvgKm}" 
            min="100"
            step="100"
            class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-2xl py-3 px-3.5 text-base font-bold font-mono text-white outline-none"
            placeholder="1200"
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">KM</span>
        </div>
      </div>
    </div>

    <!-- Son Bakım KM ve Tarihi -->
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label for="input-wizard-last-service-km" class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Son Bakım KM'si</label>
        <input 
          type="number" 
          id="input-wizard-last-service-km" 
          value="${wizardState.lastServiceKm}" 
          class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-2xl py-3 px-3.5 text-sm font-semibold font-mono text-white outline-none"
          placeholder="40000"
        />
      </div>

      <div>
        <label for="input-wizard-last-service-date" class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Son Bakım Tarihi</label>
        <input 
          type="date" 
          id="input-wizard-last-service-date" 
          value="${wizardState.lastServiceDate}" 
          class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-2xl py-3 px-3 text-sm font-semibold text-white outline-none"
        />
      </div>
    </div>

    <!-- Hasar ve Ekspertiz Özeti -->
    <div>
      <label class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">Hasar / Ekspertiz Durumu</label>
      <div class="space-y-1.5">
        ${DAMAGE_STATUSES.map(ds => `
          <label class="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 cursor-pointer hover:border-slate-500 transition">
            <span class="text-xs font-medium text-slate-200">${ds.label}</span>
            <input 
              type="radio" 
              name="damageStatus" 
              value="${ds.id}" 
              ${wizardState.damageStatus === ds.id ? 'checked' : ''} 
              class="w-4 h-4 text-blue-500 focus:ring-0"
            />
          </label>
        `).join('')}
      </div>
    </div>

    <!-- Tramer Tutarı (Opsiyonel) -->
    <div>
      <label for="input-wizard-tramer" class="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">Tramer Kaydı (TL - Opsiyonel)</label>
      <input 
        type="number" 
        id="input-wizard-tramer" 
        value="${wizardState.tramerAmount}" 
        min="0"
        class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-2xl py-3 px-4 text-sm font-semibold text-white outline-none"
        placeholder="0"
      />
    </div>
  `;
}

export function attachWizardModalEvents() {
  const state = store.getState();
  if (!state.isAddVehicleModalOpen) return;

  const modalBackdrop = document.getElementById('wizard-modal-backdrop');
  const btnClose = document.getElementById('btn-close-wizard');
  const btnCancel = document.getElementById('btn-wizard-cancel');
  const btnNext = document.getElementById('btn-wizard-next');
  const btnPrev = document.getElementById('btn-wizard-prev');
  const btnSubmit = document.getElementById('btn-wizard-submit');

  const closeModal = () => {
    wizardState.currentStep = 1;
    store.setAddVehicleModalOpen(false);
  };

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Adım 1 Olayları
  if (wizardState.currentStep === 1) {
    // Kasa Tipi
    document.querySelectorAll('.btn-select-body-type').forEach(btn => {
      btn.addEventListener('click', () => {
        wizardState.bodyType = btn.getAttribute('data-type');
        store.notify();
      });
    });

    // Marka
    document.querySelectorAll('.btn-select-brand').forEach(btn => {
      btn.addEventListener('click', () => {
        const brandId = btn.getAttribute('data-brand');
        wizardState.brand = brandId;
        const models = VEHICLE_MODELS[brandId] || [];
        if (models.length > 0) {
          wizardState.modelId = models[0].id;
          wizardState.model = models[0].name;
          if (models[0].engines.length > 0) {
            wizardState.enginePackage = models[0].engines[0].code;
            wizardState.fuel = models[0].engines[0].fuel;
            wizardState.transmission = models[0].engines[0].transmission;
          }
        }
        store.notify();
      });
    });

    // Model Select
    const selectModel = document.getElementById('select-model');
    if (selectModel) {
      selectModel.addEventListener('change', (e) => {
        const models = VEHICLE_MODELS[wizardState.brand] || [];
        const found = models.find(m => m.id === e.target.value);
        if (found) {
          wizardState.modelId = found.id;
          wizardState.model = found.name;
          if (found.engines.length > 0) {
            wizardState.enginePackage = found.engines[0].code;
            wizardState.fuel = found.engines[0].fuel;
            wizardState.transmission = found.engines[0].transmission;
          }
        }
        store.notify();
      });
    }

    // Yıl Select
    const selectYear = document.getElementById('select-year');
    if (selectYear) {
      selectYear.addEventListener('change', (e) => {
        wizardState.year = parseInt(e.target.value, 10);
      });
    }

    // Motor Select
    const selectEngine = document.getElementById('select-engine');
    if (selectEngine) {
      selectEngine.addEventListener('change', (e) => {
        wizardState.enginePackage = e.target.value;
      });
    }

    // İleri Butonu
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        wizardState.currentStep = 2;
        store.notify();
      });
    }
  }

  // Adım 2 Olayları
  if (wizardState.currentStep === 2) {
    const inputPlate = document.getElementById('input-wizard-plate');
    const platePreview = document.getElementById('wizard-plate-preview');
    const inputKm = document.getElementById('input-wizard-km');
    const inputMonthly = document.getElementById('input-wizard-monthly');
    const inputLastKm = document.getElementById('input-wizard-last-service-km');
    const inputLastDate = document.getElementById('input-wizard-last-service-date');
    const inputTramer = document.getElementById('input-wizard-tramer');

    if (inputPlate) {
      inputPlate.addEventListener('input', (e) => {
        wizardState.plate = e.target.value.toUpperCase();
        if (platePreview) {
          platePreview.innerHTML = renderPlateBadge(wizardState.plate || '34 ULU 61', 'lg');
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        wizardState.currentStep = 1;
        store.notify();
      });
    }

    if (btnSubmit) {
      btnSubmit.addEventListener('click', () => {
        const plateVal = (inputPlate ? inputPlate.value : wizardState.plate).trim();
        if (!plateVal) {
          store.showToast('Lütfen geçerli bir araç plakası girin!', 'warning');
          return;
        }

        const models = VEHICLE_MODELS[wizardState.brand] || [];
        const modelObj = models.find(m => m.id === wizardState.modelId);
        const engineObj = modelObj ? modelObj.engines.find(e => e.code === wizardState.enginePackage) : null;

        const damageRadios = document.querySelectorAll('input[name="damageStatus"]');
        let selectedDamage = 'hatasiz';
        damageRadios.forEach(r => { if (r.checked) selectedDamage = r.value; });

        const brandObj = BRANDS.find(b => b.id === wizardState.brand);
        const brandName = brandObj ? brandObj.name : wizardState.brand;

        store.addVehicle({
          plate: plateVal,
          brand: brandName,
          model: wizardState.model,
          year: wizardState.year,
          bodyType: wizardState.bodyType,
          enginePackage: wizardState.enginePackage,
          fuel: engineObj ? engineObj.fuel : 'Benzin',
          transmission: engineObj ? engineObj.transmission : 'Otomatik',
          currentKm: inputKm ? inputKm.value : wizardState.currentKm,
          monthlyAvgKm: inputMonthly ? inputMonthly.value : wizardState.monthlyAvgKm,
          lastServiceKm: inputLastKm ? inputLastKm.value : wizardState.lastServiceKm,
          lastServiceDate: inputLastDate ? inputLastDate.value : wizardState.lastServiceDate,
          serviceIntervalKm: engineObj ? engineObj.intervalKm : 15000,
          marketValue: engineObj ? Math.round((engineObj.marketMin + engineObj.marketMax) / 2) : 1200000,
          tirePsi: modelObj ? modelObj.tirePsi : { fl: 33, fr: 33, rl: 32, rr: 32 },
          damageStatus: selectedDamage,
          tramerAmount: inputTramer ? inputTramer.value : 0,
          chronicNote: modelObj ? modelObj.chronicNote : 'Periyodik kontrollerin aksatılmaması önerilir.',
          chronicLevel: modelObj ? modelObj.chronicLevel : 'Düşük'
        });

        // Reset wizard
        wizardState.currentStep = 1;
      });
    }
  }
}
