// Otantik Türk Plakası Bileşeni (TR Mavi Şeritli Standart Karayolları Tasarımı)
export function renderPlateBadge(plateNumber = '34 ULU 61', size = 'md') {
  const sizeClasses = {
    sm: 'text-xs h-7 px-2 py-0.5 min-w-[120px]',
    md: 'text-sm h-9 px-2.5 py-1 min-w-[145px]',
    lg: 'text-base h-11 px-3 py-1.5 min-w-[180px]',
    xl: 'text-xl h-14 px-4 py-2 min-w-[220px]'
  };

  const blueBandWidth = {
    sm: 'w-5',
    md: 'w-6',
    lg: 'w-7',
    xl: 'w-9'
  };

  const trTextSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm'
  };

  return `
    <div class="inline-flex items-center bg-white text-slate-900 border-2 border-slate-900 rounded-md font-bold tracking-widest shadow-md select-none overflow-hidden ${sizeClasses[size] || sizeClasses.md}">
      <!-- Sol Mavi TR Şeridi -->
      <div class="bg-[#003399] -ml-2.5 -my-2.5 self-stretch flex flex-col items-center justify-between py-1 text-white ${blueBandWidth[size] || blueBandWidth.md} mr-2">
        <span class="text-[7px] leading-none opacity-90">★</span>
        <span class="font-extrabold tracking-tighter ${trTextSize[size] || trTextSize.md}">TR</span>
      </div>
      <!-- Plaka Numarası -->
      <span class="font-mono font-black uppercase text-slate-950 tracking-wider flex-1 text-center font-['DIN_Alternate',sans-serif]">
        ${plateNumber.toUpperCase()}
      </span>
    </div>
  `;
}
