import React, { useState, useEffect } from 'react';
import { CalendarGrid } from './CalendarGrid';
import { NotesSection } from './NotesSection';
import { format, addMonths, subMonths } from 'date-fns';

export const WallCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const [heroImage, setHeroImage] = useState<string>('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=1200');
  const [themeColor, setThemeColor] = useState<string>('#3b82f6');

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date < startDate) {
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
    }
  };

  // Change hero image slightly based on month index (0-11) for demonstration
  useEffect(() => {
    const monthIndex = currentDate.getMonth();
    const images = [
      'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?auto=format&fit=crop&q=80&w=1200', // Winter
      'https://images.unsplash.com/photo-1478719059408-592965723cbc?auto=format&fit=crop&q=80&w=1200', // Winter
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1200', // Spring
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=1200', // Spring
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=1200', // Spring
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200', // Summer
      'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?auto=format&fit=crop&q=80&w=1200', // Summer (July)
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200', // Summer
      'https://images.unsplash.com/photo-1507371341162-763b5e419408?auto=format&fit=crop&q=80&w=1200', // Fall (September)
      'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&q=80&w=1200', // Fall
      'https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&q=80&w=1200', // Fall
      'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=1200', // Winter
    ];
    
    // Set colors based on season
    const colors = [
      '#3b82f6', // Winter
      '#3b82f6', // Winter
      '#10b981', // Spring
      '#10b981', // Spring
      '#10b981', // Spring
      '#f59e0b', // Summer
      '#f59e0b', // Summer
      '#f59e0b', // Summer
      '#ef4444', // Fall
      '#ef4444', // Fall
      '#ef4444', // Fall
      '#3b82f6', // Winter
    ];

    setHeroImage(images[monthIndex]);
    setThemeColor(colors[monthIndex]);
  }, [currentDate]);

  return (
    <div className="calendar-container" style={{ '--accent-color': themeColor } as React.CSSProperties}>
      <div className="calendar-hanger">
        <div className="hanger-hook"></div>
      </div>
      <div className="wall-calendar">
        {/* Left/Top Hero Image Context */}
        <div 
          className="hero-section" 
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h2 className="hero-month">{format(currentDate, 'MMMM yyyy')}</h2>
            <div className="hero-date">{format(currentDate, 'dd')}</div>
          </div>
        </div>

        {/* Right/Bottom Calendar + Notes */}
        <div className="calendar-main">
          <CalendarGrid 
            currentDate={currentDate}
            startDate={startDate}
            endDate={endDate}
            onDateSelect={handleDateSelect}
            onNextMonth={handleNextMonth}
            onPrevMonth={handlePrevMonth}
            direction={direction}
          />
          <NotesSection 
            currentDate={currentDate} 
            startDate={startDate} 
            endDate={endDate} 
          />
        </div>
      </div>
    </div>
  );
};
