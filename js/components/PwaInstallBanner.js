import { Icons } from './Icons.js';

let deferredPrompt = null;
let isBannerDismissed = false;

export function initPwaInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Header'daki indir butonunu göster
    const headerBtn = document.getElementById('btn-header-pwa-install');
    if (headerBtn) {
      headerBtn.classList.remove('hidden');
      headerBtn.addEventListener('click', triggerInstall);
    }

    renderPwaPromptBanner();
  });
}

function triggerInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Kullanıcı UluKontrol PWA kurulumunu kabul etti.');
      }
      deferredPrompt = null;
      hideBanner();
    });
  }
}

function hideBanner() {
  isBannerDismissed = true;
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.remove();
}

export function renderPwaPromptBanner() {
  if (isBannerDismissed || !deferredPrompt) return '';

  return `
    <div id="pwa-install-banner" class="m-3 p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/80 to-slate-900 border border-blue-500/40 shadow-xl flex items-center justify-between gap-3 animate-fade-in text-white">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
          ${Icons.car('w-5 h-5')}
        </div>
        <div>
          <h4 class="text-xs font-bold leading-tight">UluKontrol'ü Yükle</h4>
          <p class="text-[10px] text-slate-300 leading-tight">Tam ekran yerel uygulama deneyimi için ana ekrana ekleyin.</p>
        </div>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <button id="btn-pwa-banner-install" class="px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs shadow-md transition active:scale-95">
          Ekle
        </button>
        <button id="btn-pwa-banner-close" class="p-1.5 text-slate-400 hover:text-white rounded-lg">
          ${Icons.close('w-4 h-4')}
        </button>
      </div>
    </div>
  `;
}

export function attachPwaBannerEvents() {
  const btnInstall = document.getElementById('btn-pwa-banner-install');
  const btnClose = document.getElementById('btn-pwa-banner-close');

  if (btnInstall) btnInstall.addEventListener('click', triggerInstall);
  if (btnClose) btnClose.addEventListener('click', hideBanner);
}
