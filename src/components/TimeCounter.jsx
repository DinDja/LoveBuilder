import React, { useState, useEffect } from 'react';

const TimeCounter = ({ startDate, theme }) => {
  const [time, setTime] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const start = new Date(startDate);
      const now = new Date();
      const diff = now - start;
      if (diff < 0) return;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({ years, months, days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4 my-2 group">
      <div className={`text-3xl md:text-5xl font-light tabular-nums tracking-tight ${theme.text} transition-all duration-300 group-hover:-translate-y-1`}>
        {String(value).padStart(2, '0')}
      </div>
      <div className={`text-[9px] md:text-xs uppercase tracking-[0.2em] opacity-60 font-semibold ${theme.text} mt-1`}>
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center items-center py-6 md:py-8 px-4 md:px-6 backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl transform transition-all hover:scale-[1.02]">
      {time.years > 0 && <TimeUnit value={time.years} label="Anos" />}
      {time.months > 0 && <TimeUnit value={time.months} label="Meses" />}
      <TimeUnit value={time.days} label="Dias" />
      <div className={`hidden md:block text-2xl mx-1 opacity-30 pb-4 ${theme.text}`}>:</div>
      <TimeUnit value={time.hours} label="Horas" />
      <div className={`hidden md:block text-2xl mx-1 opacity-30 pb-4 ${theme.text}`}>:</div>
      <TimeUnit value={time.minutes} label="Min" />
      <div className={`hidden md:block text-2xl mx-1 opacity-30 pb-4 ${theme.text}`}>:</div>
      <TimeUnit value={time.seconds} label="Seg" />
    </div>
  );
};

export default TimeCounter;