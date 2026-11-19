import { store } from '../store.js';
import { Icons } from './Icons.js';

export function renderBottomNav() {
  const state = store.getState();
  const activeTab = state.activeTab;

  const tabs = [
    { id: 'garajim', label: 'Garajım', icon: 'car' },
    { id: 'bakim', label: 'Bakım & Lastik', icon: 'wrench' },
    { id: 'piyasa', label: 'Piyasa & Kronik', icon: 'trendingUp' },
    { id: 'profil', label: 'Profil', icon: 'user' }
  ];

  return `
    <nav class="sticky bottom-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/90 px-3 py-2">
      <div class="grid grid-cols-4 gap-1">
        ${tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return `
            <button 
              type="button" 
              class="btn-nav-tab flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 active:scale-95 relative ${isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'}"
              data-tab="${tab.id}"
            >
              <!-- Aktif Işık Çizgisi -->
              ${isActive ? `
                <span class="absolute top-0 w-8 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]"></span>
              ` : ''}
              
              <div class="p-1 rounded-xl transition ${isActive ? 'bg-blue-500/10' : ''}">
                ${Icons[tab.icon](isActive ? 'w-5 h-5 text-blue-400' : 'w-5 h-5')}
              </div>
              <span class="text-[10px] tracking-tight leading-none mt-1 truncate w-full text-center">
                ${tab.label}
              </span>
            </button>
          `;
        }).join('')}
      </div>
    </nav>
  `;
}

export function attachBottomNavEvents() {
  document.querySelectorAll('.btn-nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) store.setActiveTab(tabId);
    });
  });
}
