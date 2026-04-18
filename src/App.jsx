import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Sunrise, Sunset, 
  Calendar, Clock, Hash, 
  ChevronUp, ChevronDown, 
  Volume2, X, Maximize2, 
  CheckCircle2, Trash2,
  CalendarDays, Watch,
  Users, User, ArrowLeft 
} from 'lucide-react';

// Sub-component: Analog Clock SVG
const AnalogClock = ({ hour, minute, size = 160 }) => {
  const minuteDeg = minute * 6;
  const hourDeg = (hour % 12) * 30 + minute * 0.5;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className="bg-white rounded-full border-4 border-teal-600 shadow-inner">
      {/* Clock Face Markers */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180);
        const x1 = 100 + 80 * Math.sin(angle);
        const y1 = 100 - 80 * Math.cos(angle);
        const x2 = 100 + 90 * Math.sin(angle);
        const y2 = 100 - 90 * Math.cos(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#CBD5E1" strokeWidth={i % 3 === 0 ? "4" : "2"} />;
      })}
      
      {/* Numbers */}
      {[12, 3, 6, 9].map((n, i) => {
         const angle = (i * 90) * (Math.PI / 180);
         const x = 100 + 65 * Math.sin(angle); 
         const y = 100 - 65 * Math.cos(angle);
         return (
            <text key={n} x={x} y={y} fontSize="24" fontWeight="bold" fill="#64748B" textAnchor="middle" dominantBaseline="middle">
              {i === 0 ? 12 : i === 1 ? 3 : i === 2 ? 6 : 9}
            </text>
         )
      })}
      
      {/* Hour Hand */}
      <line 
        x1="100" y1="100" x2="100" y2="50" 
        stroke="#1E293B" strokeWidth="8" strokeLinecap="round"
        transform={`rotate(${hourDeg} 100 100)`}
      />
      
      {/* Minute Hand */}
      <line 
        x1="100" y1="100" x2="100" y2="30" 
        stroke="#0D9488" strokeWidth="5" strokeLinecap="round"
        transform={`rotate(${minuteDeg} 100 100)`}
      />
      
      {/* Center Dot */}
      <circle cx="100" cy="100" r="6" fill="#0F766E" />
      <circle cx="100" cy="100" r="3" fill="#fff" />
    </svg>
  );
};

const App = () => {
  // Initialization
  const today = new Date();
  
  // State for selections
  const [selectedWeekConcept, setSelectedWeekConcept] = useState(null); 
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(null); 
  
  // Family Selection State
  const [selectedPerson, setSelectedPerson] = useState('');

  // Image Error Handling State
  const [imgError, setImgError] = useState(false);

  // Date State
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [date, setDate] = useState(today.getDate());

  // Time (Clock) State - 12 Hour Format
  const currentHours = today.getHours();
  const [clockAmPm, setClockAmPm] = useState(currentHours >= 12 ? '下午' : '上午');
  const [clockHour, setClockHour] = useState(currentHours > 12 ? currentHours - 12 : (currentHours === 0 ? 12 : currentHours));
  const [clockMinute, setClockMinute] = useState(today.getMinutes());
  
  const [customNumber, setCustomNumber] = useState('');
  
  // View Modes: 'dashboard' or 'focus'
  const [viewMode, setViewMode] = useState('dashboard');
  const [focusContent, setFocusContent] = useState(null);

  // Pre-load voices for TTS
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Reset image error state when content changes
  useEffect(() => {
    setImgError(false);
  }, [focusContent]);

  // Computed: Real weekday based on date
  const getRealWeekday = (y, m, d) => {
    const dayIndex = new Date(y, m - 1, d).getDay(); 
    const weekMap = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    return weekMap[dayIndex];
  };

  // --- Family Members Data ---
  const familyMembers = [
    // 閩南語名單
    { id: 'min1', name: '阿嬌', photoUrl: 'https://i.postimg.cc/mkwbsmvs/a-jiao.jpg' }, 
    { id: 'min2', name: '小陵', photoUrl: 'https://i.postimg.cc/6pxD0rgd/xiao-ling.jpg' },
    { id: 'min3', name: '家豪', photoUrl: 'https://i.postimg.cc/fLyFLBSD/jia-hao.jpg' },
    { id: 'min4', name: '石頭', photoUrl: 'https://i.postimg.cc/85YYrMLR/shi-tou.jpg' },
    { id: 'min5', name: '秀珍', photoUrl: 'https://i.postimg.cc/YjKyd7n6/xiu-zhen.jpg' },
    { id: 'min6', name: '阿德', photoUrl: 'https://i.postimg.cc/6QbKY7dK/a-de.jpg' },
    { id: 'min7', name: '瑞貞', photoUrl: 'https://i.postimg.cc/VsCwWk5z/rui-zhen.jpg' },
    { id: 'min8', name: '阿元', photoUrl: 'https://i.postimg.cc/ZqQk6GSC/a-yuan.jpg' }, // 修正為阿元
    { id: 'min9', name: '阿英', photoUrl: 'https://i.postimg.cc/Df929bRx/a-ying.jpg' },
    { id: 'min10', name: '阿娥', photoUrl: 'https://i.postimg.cc/t4y9TGq4/a-e.jpg' },
    
    // 中文名單
    { id: 'man1', name: '佳樺', photoUrl: 'https://i.postimg.cc/xjJfpPpf/jia-hua.jpg' },
    { id: 'man2', name: '佳霖', photoUrl: 'https://i.postimg.cc/B6PrpmS7/jia-lin.jpg' },
    { id: 'man3', name: '佳欣', photoUrl: 'https://i.postimg.cc/FzJBbzZz/jia-xin.jpg' },
    { id: 'man4', name: '蓉蓉', photoUrl: 'https://i.postimg.cc/cCQVy687/rong-rong.jpg' }, 
    { id: 'man5', name: '鴻鴻', photoUrl: 'https://i.postimg.cc/L4LdZQ0L/hong-hong.jpg' },
    { id: 'man6', name: '偉豪', photoUrl: 'https://i.postimg.cc/L8yGMchT/wei-hao.jpg' },
    { id: 'man7', name: '偉佳', photoUrl: 'https://i.postimg.cc/YqzJdG7r/wei-jia.jpg' },
    { id: 'man8', name: '淑惠', photoUrl: 'https://i.postimg.cc/wB7ZxwmB/shu-hui.jpg' },
    { id: 'man9', name: '淑芬', photoUrl: 'https://i.postimg.cc/5tTGX8B6/shu-fen.jpg' },
    { id: 'man10', name: '振宇', photoUrl: 'https://i.postimg.cc/YSpTcppD/zhen-yu.jpg' },
  ];

  const weekConcepts = [
    { id: 'mon', label: '星期一', num: '1', color: 'bg-red-200 border-red-400 text-red-900' },
    { id: 'tue', label: '星期二', num: '2', color: 'bg-orange-200 border-orange-400 text-orange-900' },
    { id: 'wed', label: '星期三', num: '3', color: 'bg-yellow-200 border-yellow-400 text-yellow-900' },
    { id: 'thu', label: '星期四', num: '4', color: 'bg-green-200 border-green-400 text-green-900' },
    { id: 'fri', label: '星期五', num: '5', color: 'bg-blue-200 border-blue-400 text-blue-900' },
    { id: 'sat', label: '星期六', num: '6', color: 'bg-indigo-200 border-indigo-400 text-indigo-900' },
    { id: 'sun', label: '星期日', num: '7', color: 'bg-purple-200 border-purple-400 text-purple-900' },
  ];

  const timePeriods = [
    { id: 'morning', label: '上午', range: '06:00 - 11:59', icon: <Sunrise size={48} />, color: 'bg-sky-200 border-sky-400 text-sky-900' },
    { id: 'noon', label: '中午', range: '12:00 - 13:30', icon: <Sun size={48} />, color: 'bg-amber-200 border-amber-400 text-amber-900' },
    { id: 'afternoon', label: '下午', range: '13:30 - 18:00', icon: <Sunset size={48} />, color: 'bg-orange-200 border-orange-400 text-orange-900' },
    { id: 'night', label: '晚上', range: '18:00 - 05:59', icon: <Moon size={48} />, color: 'bg-slate-300 border-slate-500 text-slate-900' },
  ];

  // Helper: Text to Speech with Taiwanese preference
  const speak = (text, isTaiwanese = false) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.75;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      let targetVoice = null;

      if (isTaiwanese) {
        // 嘗試抓取系統內建的台語/閩南語引擎
        targetVoice = voices.find(v => 
          v.lang.toLowerCase().includes('nan') || 
          v.name.toLowerCase().includes('taiwanese') || 
          v.name.includes('台語') || 
          v.name.includes('閩南語')
        );
      }

      if (!targetVoice) {
        // 預設抓取台灣標準國語
        targetVoice = voices.find(v => v.lang === 'zh-TW');
      }

      if (targetVoice) {
        utterance.voice = targetVoice;
      } else {
        // 退回 BCP-47 標籤最佳猜測
        utterance.lang = isTaiwanese ? 'nan-TW' : 'zh-TW';
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  // Handler: Enter Focus Mode
  const handleFocus = (content, type) => {
    setFocusContent({ ...content, type });
    setViewMode('focus');
    const textToSpeak = content.speakText || content.label || content.name || content.text;
    const isTaiwanese = type === 'person'; // 如果是親友，嘗試用台語唸
    speak(textToSpeak, isTaiwanese);
  };

  // Handler: Family Selection
  const handleFamilySelect = (e) => {
    const personId = e.target.value;
    setSelectedPerson(personId);
    if (personId) {
      const person = familyMembers.find(p => p.id === personId);
      if (person) {
        handleFocus({
          label: person.name, 
          photoUrl: person.photoUrl,
          color: 'bg-pink-100 border-pink-400 text-pink-900',
          type: 'person'
        }, 'person');
      }
    }
  };

  // Handler: Number Pad
  const handleNumClick = (num) => {
    if (customNumber.length < 8) {
      setCustomNumber(prev => prev + num);
      speak(num);
    }
  };

  // Handler: Date Adjustments
  const adjustDate = (field, delta) => {
    if (field === 'year') {
      const newY = year + delta;
      setYear(newY);
      speak(`${newY}年`);
    } else if (field === 'month') {
      let newM = month + delta;
      if (newM > 12) { newM = 1; setYear(year + 1); }
      if (newM < 1) { newM = 12; setYear(year - 1); }
      setMonth(newM);
      speak(`${newM}月`);
    } else {
      let newD = date + delta;
      const daysInMonth = new Date(year, month, 0).getDate();
      if (newD > daysInMonth) newD = 1;
      if (newD < 1) newD = daysInMonth;
      setDate(newD);
      speak(`${newD}日`);
    }
  };

  // Handler: Clock Adjustments
  const adjustClock = (field, delta) => {
    if (field === 'ampm') {
      const newVal = clockAmPm === '上午' ? '下午' : '上午';
      setClockAmPm(newVal);
      speak(newVal);
    } else if (field === 'hour') {
      let newH = clockHour + delta;
      if (newH > 12) newH = 1;
      if (newH < 1) newH = 12;
      setClockHour(newH);
      speak(`${newH}點`);
    } else if (field === 'minute') {
      let newM = clockMinute + delta;
      if (newM > 59) newM = 0;
      if (newM < 0) newM = 59;
      setClockMinute(newM);
      speak(`${newM}分`);
    }
  };

  // Helper: Format minute
  const formatMinute = (m) => m < 10 ? `0${m}` : m;

  // Render Focus Mode (Large Card)
  if (viewMode === 'focus' && focusContent) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6">
        <button 
          onClick={() => {
            speak('關閉');
            setViewMode('dashboard');
            setSelectedPerson(''); // Reset dropdown
          }}
          className="absolute top-4 right-4 p-6 bg-gray-100 rounded-full hover:bg-gray-200 border-2 border-gray-300"
        >
          <X size={48} />
        </button>
        
        <div className={`flex flex-col items-center justify-center w-full h-3/5 md:h-4/5 rounded-3xl border-8 ${focusContent.color || 'bg-white border-blue-500'} p-8 shadow-2xl relative overflow-hidden`}>
          
          <div className="transform scale-125 mb-8 text-slate-900 flex justify-center items-center">
            {focusContent.type === 'clock_full' ? (
                <AnalogClock hour={clockHour} minute={clockMinute} size={250} />
            ) : focusContent.type === 'person' ? (
                <div className="rounded-full overflow-hidden border-8 border-pink-300 w-64 h-64 bg-white shadow-lg flex items-center justify-center">
                   {!imgError && focusContent.photoUrl ? (
                     <img 
                       src={focusContent.photoUrl} 
                       alt={focusContent.label} 
                       className="w-full h-full object-cover" 
                       onError={() => setImgError(true)}
                     />
                   ) : (
                     <User size={150} className="text-slate-300" />
                   )}
                </div>
            ) : (
               focusContent.icon || (focusContent.type === 'number' ? <Hash size={120} /> : <Calendar size={120} />)
            )}
          </div>
          
          <h1 className="text-[60px] md:text-[100px] font-bold text-center leading-tight mb-4 tracking-wider text-slate-900 whitespace-pre-line">
            {focusContent.label || focusContent.text}
          </h1>
          
          {focusContent.subLabel && (
            <p className="text-4xl md:text-6xl text-slate-700 font-medium bg-white/50 px-8 py-2 rounded-xl">
              {focusContent.subLabel}
            </p>
          )}

          {focusContent.type === 'date_full' && (
             <p className="text-5xl md:text-6xl mt-4 md:mt-8 text-blue-800 font-bold bg-blue-100 px-8 md:px-12 py-4 rounded-full border-4 border-blue-300">
               {getRealWeekday(year, month, date)}
             </p>
          )}

        </div>

        {/* Action Buttons: Speak & Close */}
        <div className="flex gap-4 mt-8 w-full justify-center">
            <button 
            onClick={() => {
              const textToSpeak = focusContent.message || focusContent.speakText || focusContent.label || focusContent.name || focusContent.text;
              const isTaiwanese = focusContent.type === 'person';
              speak(textToSpeak, isTaiwanese);
            }}
            className="flex-1 max-w-xs flex items-center justify-center gap-3 px-6 py-6 bg-blue-600 text-white rounded-2xl text-3xl font-bold shadow-xl active:scale-95 transition-transform"
            >
            <Volume2 size={36} />
            <span>再唸一次</span>
            </button>

            <button 
            onClick={() => {
                speak('關閉');
                setViewMode('dashboard');
                setSelectedPerson('');
            }}
            className="flex-1 max-w-xs flex items-center justify-center gap-3 px-6 py-6 bg-slate-200 text-slate-700 rounded-2xl text-3xl font-bold shadow-xl active:scale-95 transition-transform border-4 border-slate-300"
            >
            <X size={36} />
            <span>關閉視窗</span>
            </button>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-slate-50 p-2 md:p-4 font-sans select-none">
      
      {/* 0. Family Selection Section */}
      <section className="bg-white rounded-3xl shadow-md border-b-4 border-slate-200 p-4 mb-4">
         <SectionTitle icon={<Users size={32}/>} title="親友名單 (Family)" color="text-pink-600" />
         
         <div className="relative w-full">
            <select 
              value={selectedPerson}
              onChange={handleFamilySelect}
              className="w-full appearance-none bg-pink-50 border-4 border-pink-200 text-pink-900 text-3xl font-bold rounded-2xl py-6 px-8 cursor-pointer hover:bg-pink-100 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-colors"
            >
              <option value="" disabled>請點選這裡選擇親友...</option>
              {familyMembers.map(person => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center px-2 text-pink-600">
              <ChevronDown size={40} />
            </div>
         </div>
      </section>

      {/* 1. Date Section */}
      <section className="bg-white rounded-3xl shadow-md border-b-4 border-slate-200 p-4 mb-4">
        <SectionTitle icon={<CalendarDays size={32}/>} title="幾月幾號 (Date)" color="text-green-700" />
        
        <div className="flex flex-col items-center gap-4 mt-2 w-full">
           <div className="flex flex-col items-center">
             <ControlButton onClick={() => adjustDate('year', 1)} icon={<ChevronUp size={40}/>} />
             <div 
               className="w-48 h-28 bg-green-100 rounded-2xl border-4 border-green-300 flex flex-col items-center justify-center cursor-pointer active:bg-green-200"
               onClick={() => handleFocus({ label: `${year}年`, text: `${year}年`, type: 'date', color: 'bg-green-100 border-green-400' }, 'date')}
             >
               <span className="text-5xl font-bold text-green-900">{year}</span>
               <span className="text-xl text-green-700">年 (Year)</span>
             </div>
             <ControlButton onClick={() => adjustDate('year', -1)} icon={<ChevronDown size={40}/>} />
           </div>

           <div className="flex items-center justify-center gap-4 md:gap-8">
               <div className="flex flex-col items-center">
                 <ControlButton onClick={() => adjustDate('month', 1)} icon={<ChevronUp size={40}/>} />
                 <div 
                   className="w-32 h-28 bg-green-100 rounded-2xl border-4 border-green-300 flex flex-col items-center justify-center cursor-pointer active:bg-green-200"
                   onClick={() => handleFocus({ label: `${month}月`, text: `${month}月`, type: 'date', color: 'bg-green-100 border-green-400' }, 'date')}
                 >
                   <span className="text-5xl font-bold text-green-900">{month}</span>
                   <span className="text-xl text-green-700">月 (Month)</span>
                 </div>
                 <ControlButton onClick={() => adjustDate('month', -1)} icon={<ChevronDown size={40}/>} />
               </div>

               <div className="flex flex-col items-center">
                 <ControlButton onClick={() => adjustDate('date', 1)} icon={<ChevronUp size={40}/>} />
                 <div 
                   className="w-32 h-28 bg-green-100 rounded-2xl border-4 border-green-300 flex flex-col items-center justify-center cursor-pointer active:bg-green-200"
                   onClick={() => handleFocus({ label: `${date}日`, text: `${date}日`, type: 'date', color: 'bg-green-100 border-green-400' }, 'date')}
                 >
                   <span className="text-5xl font-bold text-green-900">{date}</span>
                   <span className="text-xl text-green-700">日 (Day)</span>
                 </div>
                 <ControlButton onClick={() => adjustDate('date', -1)} icon={<ChevronDown size={40}/>} />
               </div>
           </div>

           <div className="w-full flex justify-center">
               <div 
                 className="w-full max-w-xs h-48 bg-blue-100 rounded-2xl border-4 border-blue-300 flex flex-col items-center justify-center shadow-inner cursor-pointer hover:bg-blue-200"
                 onClick={() => handleFocus({ 
                    label: `${month}月${date}日`, 
                    subLabel: getRealWeekday(year, month, date),
                    speakText: `${year}年${month}月${date}日，是${getRealWeekday(year, month, date)}`,
                    color: 'bg-green-100 text-green-900 border-green-400',
                    type: 'date_full'
                 }, 'date_full')}
               >
                 <span className="text-xl text-blue-700 font-bold mb-2">是星期幾?</span>
                 <span className="text-7xl font-black text-blue-900">{getRealWeekday(year, month, date)}</span>
                 <Maximize2 className="mt-4 text-blue-500" />
               </div>
           </div>
           
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: Specific Time + Time Periods */}
        <div className="lg:col-span-5 flex flex-col gap-4">
           
           {/* Specific Time (Clock) */}
           <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
             <SectionTitle icon={<Watch size={32} />} title="時間 (Time)" color="text-teal-600" />
             
             <div className="flex flex-col xl:flex-row items-center justify-center gap-6">
                <div 
                  className="shrink-0 cursor-pointer"
                  onClick={() => handleFocus({ 
                      label: `${clockAmPm} ${clockHour}點 ${formatMinute(clockMinute)}分`, 
                      text: `${clockAmPm} ${clockHour}:${formatMinute(clockMinute)}`,
                      type: 'clock_full',
                      color: 'bg-teal-100 border-teal-400 text-teal-900'
                   }, 'clock_full')}
                >
                   <AnalogClock hour={clockHour} minute={clockMinute} />
                </div>

                <div className="flex items-center justify-center gap-1">
                    <div className="flex flex-col items-center">
                       <ControlButton onClick={() => adjustClock('ampm', 0)} icon={<ChevronUp size={32}/>} />
                       <div 
                         className="w-20 h-20 bg-teal-50 rounded-2xl border-4 border-teal-200 flex items-center justify-center cursor-pointer active:bg-teal-100"
                         onClick={() => handleFocus({ label: clockAmPm, text: clockAmPm, type: 'clock', color: 'bg-teal-100 border-teal-400' }, 'clock')}
                       >
                         <span className="text-3xl font-bold text-teal-900">{clockAmPm}</span>
                       </div>
                       <ControlButton onClick={() => adjustClock('ampm', 0)} icon={<ChevronDown size={32}/>} />
                    </div>
                    
                    <div className="flex flex-col items-center">
                       <ControlButton onClick={() => adjustClock('hour', 1)} icon={<ChevronUp size={32}/>} />
                       <div 
                         className="w-20 h-20 bg-teal-50 rounded-2xl border-4 border-teal-200 flex items-center justify-center cursor-pointer active:bg-teal-100"
                         onClick={() => handleFocus({ label: `${clockHour}點`, text: `${clockHour}點`, type: 'clock', color: 'bg-teal-100 border-teal-400' }, 'clock')}
                       >
                         <span className="text-4xl font-bold text-teal-900">{clockHour}</span>
                       </div>
                       <ControlButton onClick={() => adjustClock('hour', -1)} icon={<ChevronDown size={32}/>} />
                    </div>

                    <span className="text-3xl font-bold text-slate-400 pb-8">:</span>

                    <div className="flex flex-col items-center">
                       <ControlButton onClick={() => adjustClock('minute', 1)} icon={<ChevronUp size={32}/>} />
                       <div 
                         className="w-20 h-20 bg-teal-50 rounded-2xl border-4 border-teal-200 flex items-center justify-center cursor-pointer active:bg-teal-100"
                         onClick={() => handleFocus({ label: `${formatMinute(clockMinute)}分`, text: `${formatMinute(clockMinute)}分`, type: 'clock', color: 'bg-teal-100 border-teal-400' }, 'clock')}
                       >
                         <span className="text-4xl font-bold text-teal-900">{formatMinute(clockMinute)}</span>
                       </div>
                       <ControlButton onClick={() => adjustClock('minute', -1)} icon={<ChevronDown size={32}/>} />
                    </div>

                    <div 
                       className="ml-2 w-16 h-20 bg-teal-100 rounded-xl border-4 border-teal-300 flex flex-col items-center justify-center cursor-pointer hover:bg-teal-200 shadow-sm"
                       onClick={() => handleFocus({ 
                          label: `${clockAmPm} ${clockHour}點 ${formatMinute(clockMinute)}分`, 
                          text: `${clockAmPm} ${clockHour}:${formatMinute(clockMinute)}`,
                          type: 'clock_full',
                          color: 'bg-teal-100 border-teal-400 text-teal-900'
                       }, 'clock_full')}
                    >
                       <Maximize2 className="text-teal-600 mb-1" />
                    </div>
                 </div>
             </div>
           </div>

           {/* Time Periods */}
           <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex-grow">
            <SectionTitle icon={<Clock size={32} />} title="時段 (Periods)" color="text-orange-600" />
            <div className="flex flex-col gap-3 mt-2">
              {timePeriods.map(time => {
                const isSelected = selectedTimePeriod?.id === time.id;
                const isAnySelected = selectedTimePeriod !== null;

                return (
                  <button
                    key={time.id}
                    onClick={() => {
                      setSelectedTimePeriod(time);
                      speak(time.label);
                    }}
                    className={`relative p-3 rounded-2xl flex items-center gap-4 transition-all duration-300 ${time.color} ${
                      isSelected
                        ? 'ring-4 ring-offset-4 ring-slate-800 border-4 border-slate-900 scale-[1.03] shadow-2xl z-20 brightness-110'
                        : isAnySelected
                          ? 'border-4 border-transparent opacity-40 grayscale-[0.5] scale-95'
                          : 'border-4 border-transparent hover:brightness-95 opacity-90'
                    }`}
                  >
                    <div className={`p-2 rounded-xl bg-white/40`}>
                      {time.icon}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-3xl font-bold text-slate-900">{time.label}</span>
                      <span className="text-lg text-slate-700 font-mono mt-1 font-bold">{time.range}</span>
                    </div>
                    
                    {isSelected && (
                       <CheckCircle2 className="absolute top-2 right-2 text-slate-900 drop-shadow-sm" size={32} fill="white" />
                    )}

                    {isSelected && (
                      <div 
                        className="absolute right-4 bottom-4 bg-white/50 p-2 rounded-full cursor-pointer hover:bg-white/80"
                        onClick={(e) => { e.stopPropagation(); handleFocus(time, 'time'); }}
                      >
                        <Maximize2 size={24} className="text-slate-900"/>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
           </div>
        </div>

        {/* RIGHT COLUMN: Weekday Concept & Numbers */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Weekday Concept Bar */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
            <SectionTitle icon={<Calendar size={32} />} title="星期幾 (Weekdays)" color="text-indigo-600" />
            <div className="grid grid-cols-1 gap-2 mt-2">
              {weekConcepts.map(day => {
                const isSelected = selectedWeekConcept?.id === day.id;
                const isAnySelected = selectedWeekConcept !== null;
                
                return (
                  <button
                    key={day.id}
                    onClick={() => {
                      setSelectedWeekConcept(day);
                      speak(day.label);
                    }}
                    className={`flex items-center p-3 rounded-xl transition-all duration-300 ${day.color} ${
                      isSelected 
                        ? 'border-4 border-slate-900 scale-[1.03] shadow-xl ring-2 ring-offset-2 ring-slate-800 z-20 brightness-110' 
                        : isAnySelected
                          ? 'border-b-4 border-slate-200 opacity-40 grayscale-[0.5]'
                          : 'border-b-4 border-slate-200 hover:brightness-95 opacity-90'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-bold mr-4 shrink-0">
                      {day.num}
                    </div>
                    <span className="text-3xl font-bold flex-grow text-left text-slate-900">{day.label}</span>
                    
                    {isSelected && (
                       <CheckCircle2 className="mr-4 text-slate-900 drop-shadow-sm" size={32} fill="white" />
                    )}

                    {isSelected && (
                       <Maximize2 
                         size={32}
                         className="opacity-60 hover:opacity-100 text-slate-900"
                         onClick={(e) => { e.stopPropagation(); handleFocus(day, 'day'); }}
                       />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Number Pad */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex-grow">
             <SectionTitle icon={<Hash size={32} />} title="數字 (Numbers)" color="text-slate-600" />
             <div className="flex items-center gap-2 mb-4">
                <div className="flex-grow h-24 bg-slate-100 rounded-2xl border-4 border-slate-300 flex items-center px-6">
                  <span className="text-6xl font-mono font-bold text-slate-900 tracking-widest">
                    {customNumber || '_'}
                  </span>
                </div>
                {customNumber && (
                  <button 
                    onClick={() => {
                      setCustomNumber('');
                      speak('清除');
                    }} 
                    className="h-24 w-24 bg-red-200 rounded-2xl flex items-center justify-center border-4 border-red-300 text-red-700 active:scale-95"
                  >
                    <Trash2 size={40} />
                  </button>
                )}
                 {customNumber && (
                  <button 
                    onClick={() => handleFocus({ label: customNumber, subLabel: '數字', type: 'number', color: 'bg-slate-100 border-slate-300 text-slate-900' }, 'number')} 
                    className="h-24 w-24 bg-blue-200 rounded-2xl flex items-center justify-center border-4 border-blue-300 text-blue-700 active:scale-95"
                  >
                    <Maximize2 size={40} />
                  </button>
                )}
             </div>
             <div className="grid grid-cols-5 gap-3">
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                 <button
                   key={num}
                   onClick={() => handleNumClick(num.toString())}
                   className="aspect-square rounded-2xl bg-white border-b-4 border-slate-300 active:border-b-0 active:translate-y-1 active:bg-slate-100 text-4xl font-bold text-slate-800 shadow-sm transition-all hover:bg-slate-50"
                 >
                   {num}
                 </button>
               ))}
             </div>
          </div>

        </div>

      </div>

      {/* Summary Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
           <div className="flex gap-3 overflow-x-auto items-center py-2">
             <Chip label={`${year}年${month}月${date}日`} active={true} color="bg-green-200 text-green-900" />
             
             <Chip label={`${clockAmPm} ${clockHour}:${formatMinute(clockMinute)}`} active={true} color="bg-teal-100 text-teal-900" />

             {selectedTimePeriod && (
                <Chip label={selectedTimePeriod.label} active={true} color="bg-orange-200 text-orange-900" />
             )}
              {selectedWeekConcept && (
                <Chip label={selectedWeekConcept.label} active={true} color="bg-indigo-200 text-indigo-900" />
             )}
             {customNumber && (
                <Chip label={customNumber} active={true} color="bg-slate-300 text-slate-900" />
             )}
           </div>

           <button 
             onClick={() => {
                const parts = [`${year}年${month}月${date}日`];
                parts.push(`是${getRealWeekday(year, month, date)}`);
                parts.push(`${clockAmPm}${clockHour}點${formatMinute(clockMinute)}分`);
                
                if(selectedTimePeriod) parts.push(selectedTimePeriod.label);
                if(customNumber) parts.push(customNumber);
                speak(parts.join('，'));
             }}
             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-2xl shadow-lg flex items-center gap-3 shrink-0"
           >
             <Volume2 size={32} />
             整句唸出
           </button>
        </div>
      </div>
      
      <div className="h-32"></div>
    </div>
  );
};

// UI Helpers
const ControlButton = ({ onClick, icon }) => (
  <button 
    onClick={onClick}
    className="p-3 bg-slate-200 rounded-xl hover:bg-slate-300 active:bg-slate-400 text-slate-700 transition-colors"
  >
    {icon}
  </button>
);

const SectionTitle = ({ icon, title, color }) => (
  <h2 className={`text-3xl font-bold flex items-center gap-3 mb-4 ${color}`}>
    {icon} {title}
  </h2>
);

const Chip = ({ label, color }) => (
  <span className={`px-6 py-3 rounded-xl font-bold text-2xl whitespace-nowrap border-2 border-black/5 ${color}`}>
    {label}
  </span>
);

export default App;
