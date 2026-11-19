import { store } from './store.js';
import { renderMobileStatusBar, renderToast } from './components/MobileFrame.js';
import { renderHeader, attachHeaderEvents } from './components/Header.js';
import { renderGarageCard, attachGarageCardEvents } from './components/GarageCard.js';
import { renderCockpitWidgets, attachCockpitWidgetEvents } from './components/CockpitWidgets.js';
import { renderMaintenanceScreen, attachMaintenanceScreenEvents } from './components/MaintenanceScreen.js';
import { renderMarketScreen } from './components/MarketScreen.js';
import { renderProfileScreen, attachProfileScreenEvents } from './components/ProfileScreen.js';
import { renderAuthScreen, attachAuthScreenEvents } from './components/AuthScreen.js';
import { renderBottomNav, attachBottomNavEvents } from './components/BottomNav.js';
import { renderQuickKmModal, attachKmModalEvents } from './components/QuickKmModal.js';
import { renderVehicleWizardModal, attachWizardModalEvents } from './components/VehicleWizardModal.js';
import { initPwaInstallPrompt, renderPwaPromptBanner, attachPwaBannerEvents } from './components/PwaInstallBanner.js';

function renderApp() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const state = store.getState();

  // Oturum açılmamışsa Giriş / Kayıt ekranı göster
  if (!state.isAuthenticated) {
    root.innerHTML = `
      <div class="mobile-frame-container min-h-screen bg-slate-950 flex items-center justify-center sm:p-4">
        <div class="mobile-device-wrapper w-full max-w-[430px] min-h-screen sm:min-h-[880px] sm:max-h-[920px] bg-slate-900 sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col border border-slate-800 relative">
          ${renderMobileStatusBar()}
          <main class="flex-1 overflow-y-auto">
            ${renderAuthScreen()}
          </main>
          ${renderToast()}
        </div>
      </div>
    `;
    attachAuthScreenEvents();
    return;
  }

  // Oturum açık: Ana Kokpit Arayüzü
  let mainContent = '';
  switch (state.activeTab) {
    case 'garajim':
      mainContent = `
        <div class="p-4 space-y-5 animate-fade-in">
          ${renderGarageCard()}
          ${renderCockpitWidgets()}
        </div>
      `;
      break;
    case 'bakim':
      mainContent = `
        <div class="p-4 animate-fade-in">
          ${renderMaintenanceScreen()}
        </div>
      `;
      break;
    case 'piyasa':
      mainContent = `
        <div class="p-4 animate-fade-in">
          ${renderMarketScreen()}
        </div>
      `;
      break;
    case 'profil':
      mainContent = `
        <div class="p-4 animate-fade-in">
          ${renderProfileScreen()}
        </div>
      `;
      break;
    default:
      mainContent = `
        <div class="p-4 space-y-5">
          ${renderGarageCard()}
          ${renderCockpitWidgets()}
        </div>
      `;
  }

  root.innerHTML = `
    <div class="mobile-frame-container min-h-screen bg-slate-950 flex items-center justify-center sm:p-4 selection:bg-blue-500 selection:text-white">
      <div class="mobile-device-wrapper w-full max-w-[430px] min-h-screen sm:min-h-[880px] sm:max-h-[920px] bg-slate-900 sm:rounded-[44px] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col border border-slate-800 relative">
        
        <!-- Üst Cihaz Status Barı (Masaüstü çerçevesinde) -->
        ${renderMobileStatusBar()}

        <!-- Sabit Kokpit Header -->
        ${renderHeader()}

        <!-- PWA İndirme / Ekleme Bannerı (varsa) -->
        ${renderPwaPromptBanner()}

        <!-- Ana Dinamik Ekran İçeriği -->
        <main class="flex-1 overflow-y-auto scrollbar-none pb-4">
          ${mainContent}
        </main>

        <!-- Sabit Alt Menü Tab Bar -->
        ${renderBottomNav()}

        <!-- Modallar -->
        ${renderQuickKmModal()}
        ${renderVehicleWizardModal()}

        <!-- Toast Bildirimi -->
        ${renderToast()}

      </div>
    </div>
  `;

  // Olay Dinleyicilerini Bağla
  attachHeaderEvents();
  attachBottomNavEvents();
  attachPwaBannerEvents();

  if (state.activeTab === 'garajim') {
    attachGarageCardEvents();
    attachCockpitWidgetEvents();
  } else if (state.activeTab === 'bakim') {
    attachMaintenanceScreenEvents();
  } else if (state.activeTab === 'profil') {
    attachProfileScreenEvents();
  }

  // Modal Olayları
  attachKmModalEvents();
  attachWizardModalEvents();
}

// Service Worker Kaydı (PWA)
function registerServiceWorker() {
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('UluKontrol PWA Service Worker başarıyla kaydedildi:', reg.scope);
        })
        .catch((err) => {
          console.warn('Service Worker kaydı yapılamadı (normal development modu):', err);
        });
    });
  }
}

// Başlangıç Kurulumu
document.addEventListener('DOMContentLoaded', () => {
  registerServiceWorker();
  initPwaInstallPrompt();
  
  // Store değişikliklerini dinle ve ekranı yeniden çiz
  store.subscribe(() => {
    renderApp();
  });

  // İlk render
  renderApp();
});
