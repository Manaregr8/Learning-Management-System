'use client';
import { useState, useEffect } from 'react';
import styles from '../style.module.css';

// Pseudo data - replace with actual API call later
const mockData = {
  months: [
    {
      name: 'January 2025',
      days: [
        { date: '2025-01-01', lectures: ['Introduction to React', 'JavaScript Basics'] },
        { date: '2025-01-03', lectures: ['State Management', 'React Hooks'] },
        { date: '2025-01-05', lectures: ['API Integration', 'Error Handling'] },
      ]
    },
    {
      name: 'February 2025',
      days: [
        { date: '2025-02-01', lectures: ['Advanced React Patterns', 'Performance Optimization'] },
        { date: '2025-02-04', lectures: ['Testing React Applications', 'Deployment Strategies'] },
        { date: '2025-02-07', lectures: ['React with TypeScript', 'State Management with Redux'] },
      ]
    }
  ]
};

const MonthContainer = () => {
  const [months, setMonths] = useState([]);
  const [openMonths, setOpenMonths] = useState({});
  const [openDays, setOpenDays] = useState({});

  useEffect(() => {
    // Simulate API call
    const fetchMonthData = async () => {
      try {
        // Replace this with actual API call
        const response = mockData;
        setMonths(response.months);
      } catch (error) {
        console.error('Error fetching month data:', error);
      }
    };

    fetchMonthData();
  }, []);

  const toggleMonth = (monthName) => {
    setOpenMonths(prev => ({
      ...prev,
      [monthName]: !prev[monthName]
    }));
  };

  const toggleDay = (dayId) => {
    setOpenDays(prev => ({
      ...prev,
      [dayId]: !prev[dayId]
    }));
  };

  return (
    <div className={styles.monthsContainer}>
      {months.map((month) => (
        <div key={month.name} className={styles.monthDropdown}>
          <button
            className={styles.monthHeader}
            onClick={() => toggleMonth(month.name)}
          >
            <span>{month.name}</span>
            <span className={styles.arrow}>
              {openMonths[month.name] ? '▼' : '▶'}
            </span>
          </button>
          
          {openMonths[month.name] && (
            <div className={styles.daysContainer}>
              {month.days.map((day) => (
                <div key={day.date} className={styles.dayDropdown}>
                  <button
                    className={styles.dayHeader}
                    onClick={() => toggleDay(day.date)}
                  >
                    <span>{new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                    <span className={styles.arrow}>
                      {openDays[day.date] ? '▼' : '▶'}
                    </span>
                  </button>
                  
                  {openDays[day.date] && (
                    <div className={styles.lecturesContainer}>
                      {day.lectures.map((lecture, index) => (
                        <div key={index} className={styles.lecture}>
                          {lecture}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MonthContainer;
