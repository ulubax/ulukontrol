import { DEMO_USER, DEMO_VEHICLES } from './data/initialState.js';

const STORAGE_KEYS = {
  USER: 'ulukontrol_user',
  VEHICLES: 'ulukontrol_vehicles',
  ACTIVE_VEHICLE: 'ulukontrol_active_vehicle',
  ACTIVE_TAB: 'ulukontrol_active_tab',
  AUTH_STATE: 'ulukontrol_is_authenticated'
};

class Store {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const savedVehicles = localStorage.getItem(STORAGE_KEYS.VEHICLES);
      const savedActiveVehicle = localStorage.getItem(STORAGE_KEYS.ACTIVE_VEHICLE);
      const savedTab = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
      const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH_STATE);

      const user = savedUser ? JSON.parse(savedUser) : DEMO_USER;
      const vehicles = savedVehicles ? JSON.parse(savedVehicles) : DEMO_VEHICLES;
      const activeVehicleId = savedActiveVehicle || (vehicles.length > 0 ? vehicles[0].id : null);
      const activeTab = savedTab || 'garajim';
      const isAuthenticated = savedAuth !== null ? JSON.parse(savedAuth) : true; // default demo logged in

      return {
        user,
        isAuthenticated,
        vehicles,
        activeVehicleId,
        activeTab,
        isKmModalOpen: false,
        isAddVehicleModalOpen: false,
        toast: null
      };
    } catch (e) {
      console.warn('LocalStorage erişim hatası, varsayılan demo verisi kullanılıyor:', e);
      return {
        user: DEMO_USER,
        isAuthenticated: true,
        vehicles: DEMO_VEHICLES,
        activeVehicleId: DEMO_VEHICLES[0].id,
        activeTab: 'garajim',
        isKmModalOpen: false,
        isAddVehicleModalOpen: false,
        toast: null
      };
    }
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.state.user));
      localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(this.state.vehicles));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_VEHICLE, this.state.activeVehicleId || '');
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, this.state.activeTab);
      localStorage.setItem(STORAGE_KEYS.AUTH_STATE, JSON.stringify(this.state.isAuthenticated));
    } catch (e) {
      console.error('LocalStorage kaydetme hatası:', e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.saveState();
    this.listeners.forEach(fn => fn(this.state));
  }

  getState() {
    return this.state;
  }

  getActiveVehicle() {
    const { vehicles, activeVehicleId } = this.state;
    if (!vehicles || vehicles.length === 0) return null;
    return vehicles.find(v => v.id === activeVehicleId) || vehicles[0];
  }

  // --- ACTIONS ---

  showToast(message, type = 'info', duration = 3000) {
    this.state.toast = { message, type, id: Date.now() };
    this.notify();
    setTimeout(() => {
      if (this.state.toast && Date.now() - this.state.toast.id >= duration - 100) {
        this.state.toast = null;
        this.notify();
      }
    }, duration);
  }

  setActiveTab(tab) {
    this.state.activeTab = tab;
    this.notify();
  }

  setKmModalOpen(isOpen) {
    this.state.isKmModalOpen = isOpen;
    this.notify();
  }

  setAddVehicleModalOpen(isOpen) {
    this.state.isAddVehicleModalOpen = isOpen;
    this.notify();
  }

  setActiveVehicle(vehicleId) {
    this.state.activeVehicleId = vehicleId;
    this.notify();
  }

  updateVehicleKm(newKm) {
    const activeVehicle = this.getActiveVehicle();
    if (!activeVehicle) return;

    const parsedKm = parseInt(newKm, 10);
    if (isNaN(parsedKm) || parsedKm < activeVehicle.currentKm) {
      this.showToast('Girilen KM mevcut KM değerinden küçük olamaz!', 'warning');
      return false;
    }

    const diff = parsedKm - activeVehicle.currentKm;
    activeVehicle.currentKm = parsedKm;
    
    if (!activeVehicle.kmHistory) activeVehicle.kmHistory = [];
    activeVehicle.kmHistory.unshift({
      date: new Date().toISOString().split('T')[0],
      km: parsedKm,
      note: diff > 0 ? `+${diff.toLocaleString('tr-TR')} km artış` : 'KM Doğrulandı'
    });

    this.state.isKmModalOpen = false;
    this.showToast(`Güncel KM ${parsedKm.toLocaleString('tr-TR')} olarak kaydedildi!`, 'success');
    this.notify();
    return true;
  }

  addVehicle(vehicleData) {
    const newId = 'veh-' + Date.now();
    const newVehicle = {
      id: newId,
      plate: vehicleData.plate.toUpperCase().trim(),
      brand: vehicleData.brand,
      model: vehicleData.model,
      year: parseInt(vehicleData.year, 10),
      bodyType: vehicleData.bodyType || 'otomobil',
      enginePackage: vehicleData.enginePackage,
      fuel: vehicleData.fuel || 'Benzin',
      transmission: vehicleData.transmission || 'Otomatik',
      currentKm: parseInt(vehicleData.currentKm, 10) || 10000,
      monthlyAvgKm: parseInt(vehicleData.monthlyAvgKm, 10) || 1200,
      lastServiceKm: parseInt(vehicleData.lastServiceKm, 10) || parseInt(vehicleData.currentKm, 10) - 2000,
      lastServiceDate: vehicleData.lastServiceDate || '2026-06-01',
      serviceIntervalKm: vehicleData.serviceIntervalKm || 15000,
      marketValue: vehicleData.marketValue || 1250000,
      marketTrend: '+1.5%',
      marketTrendAmount: 20000,
      tires: {
        brand: 'Fabrika Standardı',
        size: '205/55 R16',
        season: '4 Mevsim',
        treadDepthMm: 7.0,
        lifePercentage: 88,
        pressures: vehicleData.tirePsi || { fl: 33, fr: 33, rl: 32, rr: 32 },
        targetPressures: vehicleData.tirePsi || { fl: 33, fr: 33, rl: 32, rr: 32 }
      },
      inspectionDate: vehicleData.inspectionDate || '2027-04-10',
      insuranceDate: vehicleData.insuranceDate || '2027-01-15',
      kaskoDate: vehicleData.kaskoDate || '2027-01-15',
      damageStatus: vehicleData.damageStatus || 'hatasiz',
      damageNote: vehicleData.damageNote || 'Kayıt bulunmuyor.',
      tramerAmount: parseInt(vehicleData.tramerAmount, 10) || 0,
      chronicNote: vehicleData.chronicNote || 'Periyodik bakımların aksatılmaması önerilir.',
      chronicLevel: vehicleData.chronicLevel || 'Düşük',
      kmHistory: [
        { date: new Date().toISOString().split('T')[0], km: parseInt(vehicleData.currentKm, 10) || 10000, note: 'Garaja ilk kayıt' }
      ]
    };

    this.state.vehicles.push(newVehicle);
    this.state.activeVehicleId = newId;
    this.state.isAddVehicleModalOpen = false;
    this.showToast(`${newVehicle.plate} plakalı ${newVehicle.brand} garaja eklendi!`, 'success');
    this.notify();
  }

  deleteVehicle(vehicleId) {
    if (this.state.vehicles.length <= 1) {
      this.showToast('Garajda en az bir araç bulunmalıdır!', 'warning');
      return;
    }

    this.state.vehicles = this.state.vehicles.filter(v => v.id !== vehicleId);
    this.state.activeVehicleId = this.state.vehicles[0].id;
    this.showToast('Araç garajınızdan kaldırıldı.', 'info');
    this.notify();
  }

  login(emailOrUser, password) {
    this.state.isAuthenticated = true;
    this.state.user = {
      ...DEMO_USER,
      email: emailOrUser.includes('@') ? emailOrUser : 'kullanici@ulukontrol.com',
      username: emailOrUser.startsWith('@') ? emailOrUser.slice(1) : emailOrUser
    };
    this.showToast(`Hoş geldiniz, ${this.state.user.firstName}!`, 'success');
    this.notify();
  }

  loginAsDemo() {
    this.state.isAuthenticated = true;
    this.state.user = DEMO_USER;
    this.state.vehicles = DEMO_VEHICLES;
    this.state.activeVehicleId = DEMO_VEHICLES[0].id;
    this.showToast('Demo hesap ile başarılı giriş yapıldı!', 'success');
    this.notify();
  }

  register(userData) {
    this.state.isAuthenticated = true;
    this.state.user = {
      id: 'user_' + Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username.replace('@', ''),
      email: userData.email,
      phone: userData.phone,
      avatarText: `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase(),
      isVerifiedDriver: true,
      createdAt: new Date().toISOString().split('T')[0],
      notifications: {
        pushEnabled: true,
        emailEnabled: true,
        smsEnabled: false,
        maintenanceAlerts: true,
        inspectionAlerts: true
      }
    };
    this.showToast(`Kayıt başarılı! Hoş geldiniz, ${this.state.user.firstName}.`, 'success');
    this.notify();
  }

  logout() {
    this.state.isAuthenticated = false;
    this.showToast('Oturum kapatıldı.', 'info');
    this.notify();
  }

  updateNotifications(key, value) {
    if (!this.state.user.notifications) {
      this.state.user.notifications = {};
    }
    this.state.user.notifications[key] = value;
    this.showToast('Bildirim tercihiniz güncellendi.', 'success');
    this.notify();
  }

  resetToDemo() {
    this.state.user = DEMO_USER;
    this.state.vehicles = DEMO_VEHICLES;
    this.state.activeVehicleId = DEMO_VEHICLES[0].id;
    this.state.activeTab = 'garajim';
    this.showToast('Demo garaj ve kullanıcı verileri sıfırlandı.', 'info');
    this.notify();
  }
}

export const store = new Store();
