import { store } from '../store.js';
import { Icons } from './Icons.js';

let authTab = 'login'; // 'login' or 'register'

export function renderAuthScreen() {
  return `
    <div class="min-h-full flex flex-col justify-between p-6 animate-fade-in text-slate-100">
      
      <!-- Marka Başlığı ve Kokpit Logosu -->
      <div class="text-center pt-8 pb-4">
        <div class="inline-flex p-4 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-xl shadow-blue-500/30 mb-4 border border-blue-400/40 relative">
          ${Icons.car('w-10 h-10')}
          <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping"></span>
        </div>
        <h1 class="text-3xl font-black tracking-tight text-white">
          Ulu<span class="text-blue-500">Kontrol</span>
        </h1>
        <p class="text-xs text-slate-400 mt-1.5 font-medium max-w-xs mx-auto">
          Akıllı Mobil Araç ve Kokpit Takip Asistanı
        </p>
      </div>

      <!-- Demo Hızlı Giriş Butonu (En Üstte Öne Çıkarılmış) -->
      <div class="mb-4">
        <button 
          type="button" 
          id="btn-quick-demo-login" 
          class="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 border border-blue-400/30 transition transform active:scale-95 flex items-center justify-center gap-2.5"
        >
          ${Icons.sparkles('w-5 h-5 text-amber-300')}
          <span>Demo Hesap ile Tek Tıkla Giriş Yap</span>
        </button>
        <p class="text-[11px] text-center text-slate-500 mt-1.5">
          Tüm özellikleri 34 ULU 61 plakalı demo araçla hemen deneyin.
        </p>
      </div>

      <!-- Giriş Yap / Kayıt Ol Sekmeleri -->
      <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl mb-4">
        <div class="flex p-1 bg-slate-950 rounded-2xl mb-4 border border-slate-800/80">
          <button 
            type="button" 
            id="tab-btn-login" 
            class="flex-1 py-2.5 text-xs font-bold rounded-xl transition ${authTab === 'login' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}"
          >
            Giriş Yap
          </button>
          <button 
            type="button" 
            id="tab-btn-register" 
            class="flex-1 py-2.5 text-xs font-bold rounded-xl transition ${authTab === 'register' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}"
          >
            Kayıt Ol
          </button>
        </div>

        ${authTab === 'login' ? renderLoginForm() : renderRegisterForm()}
      </div>

      <!-- Alt Güvenlik ve PWA Bilgisi -->
      <div class="text-center text-[11px] text-slate-500 pb-2">
        <span>🔒 256-bit SSL ve Yerel Veri Kalıcılığı</span>
      </div>

    </div>
  `;
}

function renderLoginForm() {
  return `
    <form id="form-login" class="space-y-3.5">
      <div>
        <label for="login-email" class="text-xs font-semibold text-slate-300 block mb-1">E-posta veya @Kullanıcı Adı</label>
        <div class="relative">
          <input 
            type="text" 
            id="login-email" 
            required 
            class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-2xl py-3 px-3.5 text-sm font-medium text-white placeholder-slate-600 outline-none transition" 
            placeholder="ahmet@ulukontrol.com veya @ahmetulu"
            value="ahmet@ulukontrol.com"
          />
        </div>
      </div>

      <div>
        <label for="login-password" class="text-xs font-semibold text-slate-300 block mb-1">Şifre</label>
        <div class="relative">
          <input 
            type="password" 
            id="login-password" 
            required 
            class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-2xl py-3 px-3.5 text-sm font-medium text-white placeholder-slate-600 outline-none transition" 
            placeholder="••••••••"
            value="123456"
          />
        </div>
      </div>

      <div class="flex items-center justify-between text-xs pt-1">
        <label class="flex items-center gap-2 cursor-pointer text-slate-400">
          <input type="checkbox" checked class="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0 w-3.5 h-3.5" />
          <span>Beni Hatırla</span>
        </label>
        <a href="#" id="link-forgot-pw" class="text-blue-400 hover:underline">Şifremi Unuttum</a>
      </div>

      <button 
        type="submit" 
        class="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition active:scale-95"
      >
        Giriş Yap
      </button>
    </form>
  `;
}

function renderRegisterForm() {
  return `
    <form id="form-register" class="space-y-3">
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label for="reg-firstname" class="text-[11px] font-semibold text-slate-300 block mb-1">Ad</label>
          <input 
            type="text" 
            id="reg-firstname" 
            required 
            class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl py-2.5 px-3 text-xs font-medium text-white placeholder-slate-600 outline-none" 
            placeholder="Ahmet"
          />
        </div>
        <div>
          <label for="reg-lastname" class="text-[11px] font-semibold text-slate-300 block mb-1">Soyad</label>
          <input 
            type="text" 
            id="reg-lastname" 
            required 
            class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl py-2.5 px-3 text-xs font-medium text-white placeholder-slate-600 outline-none" 
            placeholder="Ulu"
          />
        </div>
      </div>

      <div>
        <label for="reg-username" class="text-[11px] font-semibold text-slate-300 block mb-1">Kullanıcı Adı (@)</label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">@</span>
          <input 
            type="text" 
            id="reg-username" 
            required 
            class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl py-2.5 pl-7 pr-3 text-xs font-medium text-white placeholder-slate-600 outline-none" 
            placeholder="ahmetulu"
          />
        </div>
      </div>

      <div>
        <label for="reg-email" class="text-[11px] font-semibold text-slate-300 block mb-1">E-posta</label>
        <input 
          type="email" 
          id="reg-email" 
          required 
          class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl py-2.5 px-3 text-xs font-medium text-white placeholder-slate-600 outline-none" 
          placeholder="ornek@mail.com"
        />
      </div>

      <div>
        <label for="reg-phone" class="text-[11px] font-semibold text-slate-300 block mb-1">Telefon Numarası</label>
        <input 
          type="tel" 
          id="reg-phone" 
          required 
          class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl py-2.5 px-3 text-xs font-medium text-white placeholder-slate-600 outline-none" 
          placeholder="+90 532 000 00 00"
        />
      </div>

      <div>
        <label for="reg-password" class="text-[11px] font-semibold text-slate-300 block mb-1">Şifre</label>
        <input 
          type="password" 
          id="reg-password" 
          required 
          minlength="6"
          class="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl py-2.5 px-3 text-xs font-medium text-white placeholder-slate-600 outline-none" 
          placeholder="En az 6 karakter"
        />
      </div>

      <div class="pt-1">
        <label class="flex items-start gap-2 cursor-pointer text-[10px] text-slate-400">
          <input type="checkbox" required class="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0 w-3.5 h-3.5 mt-0.5" />
          <span>Kullanım Şartları ve Gizlilik Politikasını okudum, kabul ediyorum.</span>
        </label>
      </div>

      <button 
        type="submit" 
        class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition active:scale-95"
      >
        Hesap Oluştur ve Garajı Aç
      </button>
    </form>
  `;
}

export function attachAuthScreenEvents() {
  // Demo hızlı giriş butonu
  const btnDemo = document.getElementById('btn-quick-demo-login');
  if (btnDemo) {
    btnDemo.addEventListener('click', () => {
      store.loginAsDemo();
    });
  }

  // Sekme değiştirme
  const tabLogin = document.getElementById('tab-btn-login');
  const tabRegister = document.getElementById('tab-btn-register');

  if (tabLogin) {
    tabLogin.addEventListener('click', () => {
      authTab = 'login';
      store.notify();
    });
  }

  if (tabRegister) {
    tabRegister.addEventListener('click', () => {
      authTab = 'register';
      store.notify();
    });
  }

  // Giriş Formu
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const pw = document.getElementById('login-password').value;
      store.login(email, pw);
    });
  }

  // Kayıt Formu
  const formRegister = document.getElementById('form-register');
  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      store.register({
        firstName: document.getElementById('reg-firstname').value,
        lastName: document.getElementById('reg-lastname').value,
        username: document.getElementById('reg-username').value,
        email: document.getElementById('reg-email').value,
        phone: document.getElementById('reg-phone').value,
        password: document.getElementById('reg-password').value
      });
    });
  }

  const forgotPw = document.getElementById('link-forgot-pw');
  if (forgotPw) {
    forgotPw.addEventListener('click', (e) => {
      e.preventDefault();
      store.showToast('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.', 'info');
    });
  }
}
