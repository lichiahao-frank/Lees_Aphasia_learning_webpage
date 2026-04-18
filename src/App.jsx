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
    { id: 'min8', name: '阿元', photoUrl: 'https://i.postimg.cc/ZqQk6GSC/a-yuan.jpg' }, 
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
      <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
        <button 
          onClick={() => {
            speak('關閉');
            setViewMode('dashboard');
            setSelectedPerson(''); // Reset dropdown
          }}
          className="absolute top-4 right-4 p-4 bg-white rounded-full hover:bg-gray-100 border-2 border-gray-200 shadow-sm z-10"
        >
          <X size={32} className="text-slate-600" />
        </button>
        
        <div className={`flex flex-col items-center justify-center w-full max-w-4xl h-[70vh] sm:h-4/5 rounded-[2rem] border-4 sm:border-8 ${focusContent.color || 'bg-white border-blue-500'} p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-white`}>
          
          <div className="transform scale-100 sm:scale-125 mb-6 sm:mb-8 text-slate-900 flex justify-center items-center">
            {focusContent.type === 'clock_full' ? (
                <AnalogClock hour={clockHour} minute={clockMinute} size={200} />
            ) : focusContent.type === 'person' ? (
                <div className="rounded-full overflow-hidden border-4 sm:border-8 border-pink-300 w-48 h-48 sm:w-64 sm:h-64 bg-white shadow-lg flex items-center justify-center">
                   {!imgError && focusContent.photoUrl ? (
                     <img 
                       src={focusContent.photoUrl} 
                       alt={focusContent.label} 
                       className="w-full h-full object-cover" 
                       onError={() => setImgError(true)}
                     />
                   ) : (
                     <User size={120} className="text-slate-300" />
                   )}
                </div>
            ) : (
               focusContent.icon || (focusContent.type === 'number' ? <Hash size={80} sm:size={120} /> : <Calendar size={80} sm:size={120} />)
            )}
          </div>
          
          <h1 className="text-6xl sm:text-[80px] md:text-[100px] font-bold text-center leading-tight mb-4 tracking-wider text-slate-900 whitespace-pre-line">
            {focusContent.label || focusContent.text}
          </h1>
          
          {focusContent.subLabel && (
            <p className="text-3xl sm:text-5xl md:text-6xl text-slate-700 font-medium bg-slate-100/80 px-6 sm:px-8 py-2 rounded-2xl">
              {focusContent.subLabel}
            </p>
          )}

          {focusContent.type === 'date_full' && (
             <p className="text-4xl sm:text-5xl md:text-6xl mt-4 md:mt-8 text-blue-800 font-bold bg-blue-100 px-8 md:px-12 py-3 sm:py-4 rounded-full border-4 border-blue-300 shadow-sm">
               {getRealWeekday(year, month, date)}
             </p>
          )}

        </div>

        {/* Action Buttons: Speak & Close */}
        <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-4xl justify-center px-4">
            <button 
            onClick={() => {
              const textToSpeak = focusContent.message || focusContent.speakText || focusContent.label || focusContent.name || focusContent.text;
              const isTaiwanese = focusContent.type === 'person';
              speak(textToSpeak, isTaiwanese);
            }}
            className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 sm:py-6 bg-blue-600 text-white rounded-2xl text-2xl sm:text-3xl font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
            >
            <Volume2 size={28} className="sm:w-9 sm:h-9" />
            <span>再唸一次</span>
            </button>

            <button 
            onClick={() => {
                speak('關閉');
                setViewMode('dashboard');
                setSelectedPerson('');
            }}
            className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 sm:py-6 bg-white text-slate-700 rounded-2xl text-2xl sm:text-3xl font-bold shadow-lg hover:bg-slate-50 active:scale-95 transition-all border-4 border-slate-200"
            >
            <X size={28} className="sm:w-9 sm:h-9" />
            <span>關閉視窗</span>
            </button>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6 font-sans select-none max-w-7xl mx-auto">
      
      {/* 0. Family Selection Section */}
      <section className="bg-white rounded-3xl shadow-sm border-b-4 border-slate-200 p-4 sm:p-6 mb-4 sm:mb-6">
         <SectionTitle icon={<Users size={28} className="sm:w-8 sm:h-8"/>} title="親友名單 (Family)" color="text-pink-600" />
         
         <div className="relative w-full mt-2">
            <select 
              value={selectedPerson}
              onChange={handleFamilySelect}
              className="w-full appearance-none bg-pink-50 border-4 border-pink-200 text-pink-900 text-2xl sm:text-3xl font-bold rounded-2xl py-4 sm:py-6 px-6 sm:px-8 cursor-pointer hover:bg-pink-100 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-colors shadow-sm"
            >
              <option value="" disabled>請點選這裡選擇親友...</option>
              {familyMembers.map(person => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 sm:right-6 flex items-center px-2 text-pink-600">
              <ChevronDown size={32} className="sm:w-10 sm:h-10" />
            </div>
         </div>
      </section>

      {/* 1. Date Section */}
      <section className="bg-white rounded-3xl shadow-sm border-b-4 border-slate-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <SectionTitle icon={<CalendarDays size={28} className="sm:w-8 sm:h-8"/>} title="幾月幾號 (Date)" color="text-green-700" />
        
        <div className="flex flex-col items-center gap-4 sm:gap-6 mt-4 w-full">
           <div className="flex flex-col items-center">
             <ControlButton onClick={() => adjustDate('year', 1)} icon={<ChevronUp size={32} className="sm:w-10 sm:h-10"/>} />
             <div 
               className="w-40 sm:w-48 h-24 sm:h-28 bg-green-50 rounded-2xl border-4 border-green-200 flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 active:scale-95 transition-all my-1 shadow-sm"
               onClick={() => handleFocus({ label: `${year}年`, text: `${year}年`, type: 'date', color: 'bg-green-100 border-green-400 text-green-900' }, 'date')}
             >
               <span className="text-4xl sm:text-5xl font-bold text-green-800">{year}</span>
               <span className="text-lg sm:text-xl text-green-600 font-medium">年 (Year)</span>
             </div>
             <ControlButton onClick={() => adjustDate('year', -1)} icon={<ChevronDown size={32} className="sm:w-10 sm:h-10"/>} />
           </div>

           <div className="flex items-center justify-center gap-3 sm:gap-6 w-full">
               <div className="flex flex-col items-center flex-1 max-w-[140px]">
                 <ControlButton onClick={() => adjustDate('month', 1)} icon={<ChevronUp size={32} className="sm:w-10 sm:h-10"/>} />
                 <div 
                   className="w-full h-24 sm:h-28 bg-green-50 rounded-2xl border-4 border-green-200 flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 active:scale-95 transition-all my-1 shadow-sm"
                   onClick={() => handleFocus({ label: `${month}月`, text: `${month}月`, type: 'date', color: 'bg-green-100 border-green-400 text-green-900' }, 'date')}
                 >
                   <span className="text-4xl sm:text-5xl font-bold text-green-800">{month}</span>
                   <span className="text-lg sm:text-xl text-green-600 font-medium">月 (Month)</span>
                 </div>
                 <ControlButton onClick={() => adjustDate('month', -1)} icon={<ChevronDown size={32} className="sm:w-10 sm:h-10"/>} />
               </div>

               <div className="flex flex-col items-center flex-1 max-w-[140px]">
                 <ControlButton onClick={() => adjustDate('date', 1)} icon={<ChevronUp size={32} className="sm:w-10 sm:h-10"/>} />
                 <div 
                   className="w-full h-24 sm:h-28 bg-green-50 rounded-2xl border-4 border-green-200 flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 active:scale-95 transition-all my-1 shadow-sm"
                   onClick={() => handleFocus({ label: `${date}日`, text: `${date}日`, type: 'date', color: 'bg-green-100 border-green-400 text-green-900' }, 'date')}
                 >
                   <span className="text-4xl sm:text-5xl font-bold text-green-800">{date}</span>
                   <span className="text-lg sm:text-xl text-green-600 font-medium">日 (Day)</span>
                 </div>
                 <ControlButton onClick={() => adjustDate('date', -1)} icon={<ChevronDown size={32} className="sm:w-10 sm:h-10"/>} />
               </div>
           </div>

           <div className="w-full flex justify-center mt-2">
               <div 
                 className="w-full max-w-sm py-6 bg-blue-50 rounded-2xl border-4 border-blue-200 flex flex-col items-center justify-center shadow-sm cursor-pointer hover:bg-blue-100 active:scale-95 transition-all"
                 onClick={() => handleFocus({ 
                    label: `${month}月${date}日`, 
                    subLabel: getRealWeekday(year, month, date),
                    speakText: `${year}年${month}月${date}日，是${getRealWeekday(year, month, date)}`,
                    color: 'bg-green-50 text-green-900 border-green-300',
                    type: 'date_full'
                 }, 'date_full')}
               >
                 <span className="text-lg sm:text-xl text-blue-600 font-bold mb-1">是星期幾?</span>
                 <span className="text-5xl sm:text-6xl font-black text-blue-800">{getRealWeekday(year, month, date)}</span>
                 <Maximize2 className="mt-3 text-blue-400" size={24} />
               </div>
           </div>
           
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* LEFT COLUMN: Specific Time + Time Periods */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
           
           {/* Specific Time (Clock) */}
           <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200">
             <SectionTitle icon={<Watch size={28} className="sm:w-8 sm:h-8" />} title="時間 (Time)" color="text-teal-600" />
             
             <div className="flex flex-col xl:flex-row items-center justify-center gap-6 mt-4">
                <div 
                  className="shrink-0 cursor-pointer active:scale-95 transition-transform"
                  onClick={() => handleFocus({ 
                      label: `${clockAmPm} ${clockHour}點 ${formatMinute(clockMinute)}分`, 
                      text: `${clockAmPm} \n ${clockHour}:${formatMinute(clockMinute)}`,
                      type: 'clock_full',
                      color: 'bg-teal-50 border-teal-300 text-teal-900'
                   }, 'clock_full')}
                >
                   <AnalogClock hour={clockHour} minute={clockMinute} size={140} />
                </div>

                <div className="flex items-center justify-center gap-1 sm:gap-2 w-full max-w-sm">
                    <div className="flex flex-col items-center flex-1">
                       <ControlButton onClick={() => adjustClock('ampm', 0)} icon={<ChevronUp size={28}/>} />
                       <div 
                         className="w-full aspect-square bg-teal-50 rounded-2xl border-4 border-teal-200 flex items-center justify-center cursor-pointer hover:bg-teal-100 active:scale-95 transition-all my-1 shadow-sm"
                         onClick={() => handleFocus({ label: clockAmPm, text: clockAmPm, type: 'clock', color: 'bg-teal-50 border-teal-300 text-teal-900' }, 'clock')}
                       >
                         <span className="text-2xl sm:text-3xl font-bold text-teal-800">{clockAmPm}</span>
                       </div>
                       <ControlButton onClick={() => adjustClock('ampm', 0)} icon={<ChevronDown size={28}/>} />
                    </div>
                    
                    <div className="flex flex-col items-center flex-1">
                       <ControlButton onClick={() => adjustClock('hour', 1)} icon={<ChevronUp size={28}/>} />
                       <div 
                         className="w-full aspect-square bg-teal-50 rounded-2xl border-4 border-teal-200 flex items-center justify-center cursor-pointer hover:bg-teal-100 active:scale-95 transition-all my-1 shadow-sm"
                         onClick={() => handleFocus({ label: `${clockHour}點`, text: `${clockHour}點`, type: 'clock', color: 'bg-teal-50 border-teal-300 text-teal-900' }, 'clock')}
                       >
                         <span className="text-3xl sm:text-4xl font-bold text-teal-800">{clockHour}</span>
                       </div>
                       <ControlButton onClick={() => adjustClock('hour', -1)} icon={<ChevronDown size={28}/>} />
                    </div>

                    <span className="text-2xl font-bold text-slate-300 pb-8 sm:pb-10">:</span>

                    <div className="flex flex-col items-center flex-1">
                       <ControlButton onClick={() => adjustClock('minute', 1)} icon={<ChevronUp size={28}/>} />
                       <div 
                         className="w-full aspect-square bg-teal-50 rounded-2xl border-4 border-teal-200 flex items-center justify-center cursor-pointer hover:bg-teal-100 active:scale-95 transition-all my-1 shadow-sm"
                         onClick={() => handleFocus({ label: `${formatMinute(clockMinute)}分`, text: `${formatMinute(clockMinute)}分`, type: 'clock', color: 'bg-teal-50 border-teal-300 text-teal-900' }, 'clock')}
                       >
                         <span className="text-3xl sm:text-4xl font-bold text-teal-800">{formatMinute(clockMinute)}</span>
                       </div>
                       <ControlButton onClick={() => adjustClock('minute', -1)} icon={<ChevronDown size={28}/>} />
                    </div>

                    <div 
                       className="ml-1 sm:ml-2 w-12 sm:w-16 h-16 sm:h-20 bg-teal-100 rounded-xl border-4 border-teal-200 flex flex-col items-center justify-center cursor-pointer hover:bg-teal-200 active:scale-95 transition-all shadow-sm"
                       onClick={() => handleFocus({ 
                          label: `${clockAmPm} ${clockHour}點 ${formatMinute(clockMinute)}分`, 
                          text: `${clockAmPm} \n ${clockHour}:${formatMinute(clockMinute)}`,
                          type: 'clock_full',
                          color: 'bg-teal-50 border-teal-300 text-teal-900'
                       }, 'clock_full')}
                    >
                       <Maximize2 className="text-teal-600" size={24} />
                    </div>
                 </div>
             </div>
           </div>

           {/* Time Periods */}
           <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200 flex-grow">
            <SectionTitle icon={<Clock size={28} className="sm:w-8 sm:h-8" />} title="時段 (Periods)" color="text-orange-600" />
            <div className="flex flex-col gap-3 sm:gap-4 mt-4">
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
                    className={`relative p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 ${time.color} ${
                      isSelected
                        ? 'ring-4 ring-offset-2 ring-slate-400 border-4 border-slate-800 scale-[1.02] shadow-xl z-20 brightness-105'
                        : isAnySelected
                          ? 'border-4 border-transparent opacity-50 grayscale-[0.3] scale-[0.98]'
                          : 'border-4 border-transparent hover:brightness-95 opacity-90 shadow-sm'
                    }`}
                  >
                    <div className={`p-3 rounded-xl bg-white/50 shrink-0`}>
                      {time.icon}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-2xl sm:text-3xl font-bold text-slate-800">{time.label}</span>
                      <span className="text-sm sm:text-base text-slate-600 font-mono mt-1 font-semibold">{time.range}</span>
                    </div>
                    
                    {isSelected && (
                       <CheckCircle2 className="absolute top-2 right-2 text-slate-800 drop-shadow-sm" size={28} fill="white" />
                    )}

                    {isSelected && (
                      <div 
                        className="absolute right-4 bottom-4 bg-white/60 p-2 rounded-full cursor-pointer hover:bg-white/90"
                        onClick={(e) => { e.stopPropagation(); handleFocus(time, 'time'); }}
                      >
                        <Maximize2 size={24} className="text-slate-800"/>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
           </div>
        </div>

        {/* RIGHT COLUMN: Weekday Concept & Numbers */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
          
          {/* Weekday Concept Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200">
            <SectionTitle icon={<Calendar size={28} className="sm:w-8 sm:h-8" />} title="星期幾 (Weekdays)" color="text-indigo-600" />
            <div className="grid grid-cols-1 gap-2 sm:gap-3 mt-4">
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
                    className={`flex items-center p-3 sm:p-4 rounded-xl transition-all duration-300 ${day.color} ${
                      isSelected 
                        ? 'border-2 border-slate-800 scale-[1.02] shadow-md ring-2 ring-offset-1 ring-slate-400 z-20 brightness-105' 
                        : isAnySelected
                          ? 'border-b-4 border-slate-200 opacity-50 grayscale-[0.3]'
                          : 'border-b-4 border-black/5 hover:brightness-95 opacity-90'
                    }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 text-white flex items-center justify-center text-xl sm:text-2xl font-bold mr-3 sm:mr-4 shrink-0">
                      {day.num}
                    </div>
                    <span className="text-2xl sm:text-3xl font-bold flex-grow text-left text-slate-800">{day.label}</span>
                    
                    {isSelected && (
                       <CheckCircle2 className="mr-3 sm:mr-4 text-slate-800 drop-shadow-sm" size={28} fill="white" />
                    )}

                    {isSelected && (
                       <div 
                         className="p-2 bg-white/40 rounded-full hover:bg-white/80"
                         onClick={(e) => { e.stopPropagation(); handleFocus(day, 'day'); }}
                       >
                         <Maximize2 size={24} className="text-slate-800" />
                       </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Number Pad */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200 flex-grow">
             <SectionTitle icon={<Hash size={28} className="sm:w-8 sm:h-8" />} title="數字 (Numbers)" color="text-slate-600" />
             
             <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 mt-4">
                <div className="flex-grow h-20 sm:h-24 bg-slate-50 rounded-2xl border-4 border-slate-200 flex items-center px-4 sm:px-6 shadow-inner overflow-hidden">
                  <span className="text-4xl sm:text-6xl font-mono font-bold text-slate-800 tracking-widest truncate">
                    {customNumber || '_'}
                  </span>
                </div>
                {customNumber && (
                  <button 
                    onClick={() => {
                      setCustomNumber('');
                      speak('清除');
                    }} 
                    className="shrink-0 h-20 w-20 sm:h-24 sm:w-24 bg-red-50 rounded-2xl flex items-center justify-center border-4 border-red-200 text-red-600 active:scale-95 transition-transform shadow-sm hover:bg-red-100"
                  >
                    <Trash2 size={32} className="sm:w-10 sm:h-10" />
                  </button>
                )}
                 {customNumber && (
                  <button 
                    onClick={() => handleFocus({ label: customNumber, subLabel: '數字', type: 'number', color: 'bg-slate-50 border-slate-300 text-slate-900' }, 'number')} 
                    className="shrink-0 h-20 w-20 sm:h-24 sm:w-24 bg-blue-50 rounded-2xl flex items-center justify-center border-4 border-blue-200 text-blue-600 active:scale-95 transition-transform shadow-sm hover:bg-blue-100"
                  >
                    <Maximize2 size={32} className="sm:w-10 sm:h-10" />
                  </button>
                )}
             </div>
             
             <div className="grid grid-cols-5 gap-2 sm:gap-3">
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                 <button
                   key={num}
                   onClick={() => handleNumClick(num.toString())}
                   className="aspect-square rounded-2xl bg-white border-4 border-slate-200 active:border-b-4 active:scale-95 active:bg-slate-100 text-3xl sm:text-4xl font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center"
                 >
                   {num}
                 </button>
               ))}
             </div>
          </div>

        </div>

      </div>

      {/* Summary Footer Placeholder to prevent overlap */}
      <div className="h-40 sm:h-48"></div>

      {/* Fixed Summary Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-slate-200 p-3 sm:p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
           
           {/* Chips Scroll Area */}
           <div className="flex gap-2 sm:gap-3 overflow-x-auto items-center py-1 sm:py-2 w-full custom-scrollbar mask-edges">
             <Chip label={`${year}年${month}月${date}日`} color="bg-green-100 text-green-800 border-green-200" />
             
             <Chip label={`${clockAmPm} ${clockHour}:${formatMinute(clockMinute)}`} color="bg-teal-100 text-teal-800 border-teal-200" />

             {selectedTimePeriod && (
                <Chip label={selectedTimePeriod.label} color="bg-orange-100 text-orange-800 border-orange-200" />
             )}
              {selectedWeekConcept && (
                <Chip label={selectedWeekConcept.label} color="bg-indigo-100 text-indigo-800 border-indigo-200" />
             )}
             {customNumber && (
                <Chip label={customNumber} color="bg-slate-100 text-slate-800 border-slate-300" />
             )}
           </div>

           {/* Action Button */}
           <button 
             onClick={() => {
                const parts = [`${year}年${month}月${date}日`];
                parts.push(`是${getRealWeekday(year, month, date)}`);
                parts.push(`${clockAmPm}${clockHour}點${formatMinute(clockMinute)}分`);
                
                if(selectedTimePeriod) parts.push(selectedTimePeriod.label);
                if(customNumber) parts.push(customNumber);
                speak(parts.join('，'));
             }}
             className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-xl sm:text-2xl shadow-lg flex items-center justify-center gap-2 shrink-0 active:scale-95 transition-transform"
           >
             <Volume2 size={28} />
             <span>整句唸出</span>
           </button>
        </div>
      </div>
      
      {/* Global styles for custom scrollbar hiding on mobile but keeping functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .mask-edges {
          -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%);
          mask-image: linear-gradient(to right, black 80%, transparent 100%);
        }
      `}} />
    </div>
  );
};

// UI Helpers
const ControlButton = ({ onClick, icon }) => (
  <button 
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className="p-2 sm:p-3 bg-slate-100 rounded-xl hover:bg-slate-200 active:bg-slate-300 text-slate-600 transition-colors border-2 border-transparent active:border-slate-300 flex items-center justify-center"
  >
    {icon}
  </button>
);

const SectionTitle = ({ icon, title, color }) => (
  <h2 className={`text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3 ${color}`}>
    {icon} {title}
  </h2>
);

const Chip = ({ label, color }) => (
  <span className={`px-4 sm:px-5 py-2 sm:py-3 rounded-xl font-bold text-lg sm:text-xl whitespace-nowrap border-2 shadow-sm ${color}`}>
    {label}
  </span>
);

export default App;