import { store } from '../store.js';
import { Icons } from './Icons.js';

export function renderHeader() {
  const state = store.getState();
  const user = state.user;

  return `
    <header class="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
      <!-- Logo ve Uygulama Adı -->
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white flex items-center justify-center shadow-md shadow-blue-500/25 border border-blue-400/30">
          ${Icons.car('w-4 h-4')}
        </div>
        <div>
          <h1 class="text-base font-black tracking-tight text-white flex items-center gap-1">
            <span>Ulu</span><span class="text-blue-500">Kontrol</span>
          </h1>
          <span class="text-[9px] uppercase font-bold tracking-widest text-slate-500 block -mt-0.5">Kokpit Asistanı</span>
        </div>
      </div>

      <!-- Sağ Aksiyonlar: PWA İndir + Bildirim Zili + Profil Kısayolu -->
      <div class="flex items-center gap-1.5">
        <!-- PWA İndir Butonu (Müsaitse) -->
        <button 
          id="btn-header-pwa-install" 
          class="hidden p-2 text-blue-400 hover:text-white rounded-xl hover:bg-slate-800 transition active:scale-95"
          title="Uygulamayı Yükle"
        >
          ${Icons.download('w-4 h-4')}
        </button>

        <!-- Bildirim Zili -->
        <button 
          id="btn-header-notifications" 
          class="relative p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition active:scale-95"
          title="Bildirimler"
        >
          ${Icons.bell('w-4 h-4')}
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
        </button>

        <!-- Profil Avatarı -->
        <button 
          id="btn-header-profile" 
          class="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 text-xs font-black border border-slate-700 flex items-center justify-center transition active:scale-95"
          title="Profilime Git"
        >
          ${user ? user.avatarText || 'AU' : 'AU'}
        </button>
      </div>
    </header>
  `;
}

export function attachHeaderEvents() {
  const btnNotifications = document.getElementById('btn-header-notifications');
  if (btnNotifications) {
    btnNotifications.addEventListener('click', () => {
      store.showToast('1 Yeni Uyarı: Sağ arka lastik 31 PSI (1 PSI Düşük).', 'warning');
    });
  }

  const btnProfile = document.getElementById('btn-header-profile');
  if (btnProfile) {
    btnProfile.addEventListener('click', () => {
      store.setActiveTab('profil');
    });
  }
}
