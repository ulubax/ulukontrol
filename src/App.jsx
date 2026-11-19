import React, { useState, useEffect } from 'react';
import { store } from '../js/store.js';

export default function App() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      setState({ ...newState });
    });
    return () => unsubscribe();
  }, []);

  const activeVehicle = store.getActiveVehicle();

  return (
    <div className="mobile-frame-container min-h-screen bg-slate-950 flex items-center justify-center sm:p-4">
      <div className="mobile-device-wrapper w-full max-w-[430px] min-h-screen sm:min-h-[880px] bg-slate-900 sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col border border-slate-800">
        
        {/* Header */}
        <header className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white">U</div>
            <h1 className="text-base font-bold text-white">Ulu<span className="text-blue-500">Kontrol</span></h1>
          </div>
          <span className="text-xs text-blue-400 font-mono font-bold">{activeVehicle?.plate}</span>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="bg-slate-850 p-4 rounded-3xl border border-slate-800">
            <h2 className="text-lg font-bold text-white">{activeVehicle?.brand} {activeVehicle?.model}</h2>
            <p className="text-xs text-slate-400">{activeVehicle?.enginePackage}</p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">{activeVehicle?.currentKm?.toLocaleString('tr-TR')}</span>
              <span className="text-xs text-slate-400 font-bold">KM</span>
            </div>
          </div>
        </main>

        {/* Bottom Tab Bar */}
        <nav className="p-3 bg-slate-900 border-t border-slate-800 grid grid-cols-4 gap-1 text-center text-[10px] text-slate-400">
          <span className="text-blue-400 font-bold">Garajım</span>
          <span>Bakım & Lastik</span>
          <span>Piyasa & Kronik</span>
          <span>Profil</span>
        </nav>
      </div>
    </div>
  );
}
