import React from 'react';
import { 
  format, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday,
  isBefore,
  isAfter
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample holiday data for demonstration
const holidays: Record<string, string> = {
  '01-01': "New Year's Day",
  '02-14': "Valentine's Day",
  '07-04': "Independence Day",
  '10-31': "Halloween",
  '12-25': "Christmas",
  '12-31': "New Year's Eve"
};

interface CalendarGridProps {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (date: Date) => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  direction: number; // 1 for next, -1 for prev
}

// Framer motion variants for a premium physical page flip animation (Horizontal 3D)
const variants = {
  enter: (direction: number) => {
    return {
      zIndex: 0,
      opacity: 0,
      rotateY: direction > 0 ? 60 : -60, // Swing horizontally
      x: direction > 0 ? 150 : -150, // Physical page sliding motion
      scale: 0.85, // Parallax depth effect
      filter: 'brightness(0.3) blur(4px)' // Cast deeply into shadow to simulate bending away from light
    };
  },
  center: {
    zIndex: 1,
    opacity: 1,
    rotateY: 0,
    x: 0,
    scale: 1,
    filter: 'brightness(1) blur(0px)',
    transition: {
      rotateY: { type: "spring" as const, stiffness: 120, damping: 14 }, // Satisfying physical 'snap' flat into place
      x: { type: "spring" as const, stiffness: 250, damping: 25 },
      opacity: { duration: 0.3 },
      scale: { type: "spring" as const, stiffness: 200, damping: 20 },
      filter: { duration: 0.3 }
    }
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      opacity: 0,
      rotateY: direction < 0 ? 60 : -60,
      x: direction < 0 ? 150 : -150,
      scale: 0.85,
      filter: 'brightness(0.3) blur(2px)',
      transition: {
        rotateY: { type: "spring" as const, stiffness: 120, damping: 14 },
        x: { type: "spring" as const, stiffness: 250, damping: 25 },
        opacity: { duration: 0.2 },
        scale: { type: "spring" as const, stiffness: 200, damping: 20 },
        filter: { duration: 0.2 }
      }
    };
  }
};

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  startDate,
  endDate,
  onDateSelect,
  onNextMonth,
  onPrevMonth,
  direction
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const daysInCalendar = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Helper function to determine the CSS classes for a given day
  const getDayClasses = (day: Date) => {
    const classes = ['day-cell'];
    
    if (!isSameMonth(day, monthStart)) {
      classes.push('empty');
      return classes.join(' ');
    }
    
    if (isToday(day)) {
      classes.push('today');
    }

    if (startDate && isSameDay(day, startDate)) {
      classes.push('selected-start');
    }
    
    if (endDate && isSameDay(day, endDate)) {
      classes.push('selected-end');
    }
    
    if (startDate && endDate) {
      if (
        (isAfter(day, startDate) || isSameDay(day, startDate)) && 
        (isBefore(day, endDate) || isSameDay(day, endDate)) &&
        !isSameDay(day, startDate) && 
        !isSameDay(day, endDate)
      ) {
        classes.push('in-range');
      }
    }

    return classes.join(' ');
  };

  return (
    <div className="calendar-grid-wrapper">
      <div className="calendar-header">
        <h3 className="month-title">{format(currentDate, 'MMMM yyyy')}</h3>
        <div className="month-nav">
          <button className="nav-btn" onClick={onPrevMonth} aria-label="Previous Month">
            <ChevronLeft size={20} />
          </button>
          <button className="nav-btn" onClick={onNextMonth} aria-label="Next Month">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid-weekdays">
        {weekDays.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      
      {/* 
        AnimatePresence with mode='popLayout' natively handles pulling the exiting element out of the flow.
        We tie it to the currentDate.toISOString() so it triggers the transition when month changes!
      */}
      <div className="relative-grid-container" style={{ perspective: '1200px' }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentDate.toISOString()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid-days"
            style={{ width: '100%' }}
          >
            {daysInCalendar.map((day) => {
              const isCurrentMonth = isSameMonth(day, monthStart);
              const dateString = format(day, 'MM-dd');
              const holidayTheme = holidays[dateString];

              return (
                <div 
                  key={day.toString()} 
                  className={getDayClasses(day)}
                  onClick={() => isCurrentMonth && onDateSelect(day)}
                  title={holidayTheme ? holidayTheme : ''}
                >
                  <span className="day-number">{isCurrentMonth ? format(day, 'd') : ''}</span>
                  {/* Holiday Marker Badge */}
                  {isCurrentMonth && holidayTheme && (
                     <div className="holiday-marker" />
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
