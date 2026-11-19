import { store } from '../store.js';
import { Icons } from './Icons.js';

export function renderProfileScreen() {
  const state = store.getState();
  const user = state.user;
  const vehicles = state.vehicles;
  const notifications = user.notifications || {};

  const totalKm = vehicles.reduce((sum, v) => sum + (v.currentKm || 0), 0);

  return `
    <div class="space-y-4 pb-6 animate-fade-in">
      <!-- Kullanıcı Başlık Kartı -->
      <div class="rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 p-5 shadow-2xl relative overflow-hidden">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-blue-500/25 border-2 border-blue-400/30">
            ${user.avatarText || 'AU'}
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-0.5">
              <h2 class="text-lg font-extrabold text-white">${user.firstName} ${user.lastName}</h2>
              <span class="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold">
                Doğrulanmış
              </span>
            </div>
            <p class="text-xs text-blue-400 font-medium">@${user.username}</p>
            <p class="text-[11px] text-slate-400">${user.email}</p>
          </div>
        </div>

        <!-- Garaj İstatistikleri -->
        <div class="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-800 text-center">
          <div class="p-2 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <span class="text-[10px] text-slate-400 block mb-0.5 uppercase font-semibold">Araç</span>
            <span class="text-base font-extrabold text-white font-mono">${vehicles.length}</span>
          </div>
          <div class="p-2 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <span class="text-[10px] text-slate-400 block mb-0.5 uppercase font-semibold">Toplam KM</span>
            <span class="text-base font-extrabold text-blue-400 font-mono">${(totalKm / 1000).toFixed(1)}k</span>
          </div>
          <div class="p-2 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <span class="text-[10px] text-slate-400 block mb-0.5 uppercase font-semibold">Hatırlatıcı</span>
            <span class="text-base font-extrabold text-emerald-400 font-mono">4 Aktif</span>
          </div>
        </div>
      </div>

      <!-- İletişim Bilgileri Kartı -->
      <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          ${Icons.user('w-4 h-4 text-blue-400')}
          <span>Hesap ve İletişim Bilgileri</span>
        </h3>
        <div class="space-y-3 text-xs">
          <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div class="flex items-center gap-2.5 text-slate-300">
              ${Icons.phone('w-4 h-4 text-slate-400')}
              <span>Telefon Numarası</span>
            </div>
            <span class="font-mono font-bold text-white">${user.phone}</span>
          </div>
          <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div class="flex items-center gap-2.5 text-slate-300">
              ${Icons.mail('w-4 h-4 text-slate-400')}
              <span>E-posta Adresi</span>
            </div>
            <span class="font-semibold text-slate-200">${user.email}</span>
          </div>
        </div>
      </div>

      <!-- Bildirim Tercihleri (Toggle Switches) -->
      <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-5">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          ${Icons.bell('w-4 h-4 text-blue-400')}
          <span>Bildirim ve Uyarı Tercihleri</span>
        </h3>
        <div class="space-y-3">
          ${[
            { key: 'pushEnabled', label: 'Mobil Anlık Bildirimler', desc: 'KM güncelleme ve kritik servis uyarıları' },
            { key: 'emailEnabled', label: 'E-posta Bilgilendirme', desc: 'Aylık özet ve piyasa değeri değişim raporu' },
            { key: 'smsEnabled', label: 'SMS ile Kritik Uyarılar', desc: 'Muayene ve kasko bitişinden 7 gün önce' },
            { key: 'maintenanceAlerts', label: 'Periyodik Bakım Alarmları', desc: 'Kalan KM 1.500 altına düştüğünde bildirim' }
          ].map(pref => {
            const isChecked = !!notifications[pref.key];
            return `
              <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div class="pr-2">
                  <span class="text-xs font-bold text-slate-200 block">${pref.label}</span>
                  <span class="text-[10px] text-slate-400 block">${pref.desc}</span>
                </div>
                <label class="relative inline-flex items-center cursor-pointer shrink-0">
                  <input 
                    type="checkbox" 
                    class="sr-only peer toggle-notification-input" 
                    data-key="${pref.key}" 
                    ${isChecked ? 'checked' : ''}
                  />
                  <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- İşlem Butonları (Sıfırla & Çıkış Yap) -->
      <div class="space-y-2 pt-2">
        <button 
          type="button" 
          id="btn-reset-demo-data" 
          class="w-full py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 font-bold text-xs transition active:scale-95 flex items-center justify-center gap-2 border border-slate-700/80"
        >
          ${Icons.refresh('w-4 h-4 text-blue-400')} Demo Verilerini Sıfırla
        </button>

        <button 
          type="button" 
          id="btn-profile-logout" 
          class="w-full py-3.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs transition active:scale-95 flex items-center justify-center gap-2 border border-rose-500/20"
        >
          ${Icons.logOut('w-4 h-4')} Oturumu Kapat
        </button>
      </div>

      <!-- Sürüm Bilgisi -->
      <div class="text-center pt-2">
        <span class="text-[10px] text-slate-600 font-mono">UluKontrol PWA v1.0.0 • Faz 1 Sürümü</span>
      </div>
    </div>
  `;
}

export function attachProfileScreenEvents() {
  // Bildirim toggle dinleyicileri
  document.querySelectorAll('.toggle-notification-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const key = e.target.getAttribute('data-key');
      store.updateNotifications(key, e.target.checked);
    });
  });

  // Demo verilerini sıfırlama butonu
  const btnReset = document.getElementById('btn-reset-demo-data');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Tüm veriler varsayılan demo araçları ve ayarlarına sıfırlanacaktır. Onaylıyor musunuz?')) {
        store.resetToDemo();
      }
    });
  }

  // Çıkış yap butonu
  const btnLogout = document.getElementById('btn-profile-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('Oturumu kapatmak istediğinize emin misiniz?')) {
        store.logout();
      }
    });
  }
}
