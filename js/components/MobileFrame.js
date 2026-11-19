import { store } from '../store.js';

export function renderMobileStatusBar() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  return `
    <div class="desktop-status-bar hidden sm:flex items-center justify-between px-6 pt-3 pb-1 text-white text-xs select-none bg-slate-900 border-b border-slate-800/40">
      <!-- Saat -->
      <span class="font-semibold tracking-tight text-[13px] font-mono">${timeStr}</span>
      
      <!-- Dynamic Island / Ahize Simülasyonu -->
      <div class="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-center border border-slate-800/80">
        <div class="w-2 h-2 rounded-full bg-slate-900 mr-2"></div>
        <div class="w-1.5 h-1.5 rounded-full bg-blue-900/40"></div>
      </div>

      <!-- Hücresel, Wifi, Pil -->
      <div class="flex items-center gap-1.5 text-slate-300">
        <!-- Sinyal -->
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="16" width="3" height="6" rx="1"/>
          <rect x="7" y="12" width="3" height="10" rx="1"/>
          <rect x="12" y="8" width="3" height="14" rx="1"/>
          <rect x="17" y="4" width="3" height="18" rx="1"/>
        </svg>
        <!-- Wifi -->
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M5 13a10 10 0 0 1 14 0"/>
          <path d="M8.5 16.5a5 5 0 0 1 7 0"/>
          <line x1="12" y1="20" x2="12.01" y2="20"/>
        </svg>
        <!-- Pil -->
        <div class="w-5 h-2.5 border border-slate-300 rounded-[3px] p-[1px] flex items-center">
          <div class="w-3/4 h-full bg-emerald-400 rounded-[1px]"></div>
        </div>
      </div>
    </div>
  `;
}

export function renderToast() {
  const state = store.getState();
  if (!state.toast) return '';

  const colors = {
    info: 'bg-blue-600 border-blue-400 text-white',
    success: 'bg-emerald-600 border-emerald-400 text-white',
    warning: 'bg-amber-600 border-amber-400 text-white',
    danger: 'bg-rose-600 border-rose-400 text-white'
  };

  return `
    <div class="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-[90%] w-auto px-4 py-2.5 rounded-2xl shadow-2xl border text-xs font-bold text-center animate-bounce-short pointer-events-none ${colors[state.toast.type] || colors.info}">
      ${state.toast.message}
    </div>
  `;
}
