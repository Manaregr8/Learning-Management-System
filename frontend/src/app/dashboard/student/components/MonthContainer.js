'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../style.module.css';

const MonthContainer = () => {
  const [months, setMonths] = useState([]);
  const [openMonths, setOpenMonths] = useState({});
  const [openDays, setOpenDays] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folderName: 'batch_1' }), // make dynamic if needed
        });

        if (!response.ok) throw new Error('Failed to fetch videos');
        const data = await response.json();

        // Group: Month -> Day (keep exactly ONE lecture per day; choose latest if multiple)
        const grouped = {};
        (data.videos || []).forEach((video) => {
          const ts = (video.upload_time || 0) * 1000;
          const dateObj = new Date(ts);

          const monthName = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          });

          const dayKey = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
          const dayLabel = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          });

          if (!grouped[monthName]) grouped[monthName] = {};

          const lectureObj = {
            id: video.id,
            title: video.title || 'Untitled Video',
            upload_time: video.upload_time, // seconds
          };

          // if a day already exists, keep the latest upload
          if (!grouped[monthName][dayKey] ||
              (grouped[monthName][dayKey].lecture?.upload_time || 0) < video.upload_time) {
            grouped[monthName][dayKey] = {
              label: dayLabel,
              lecture: lectureObj,
            };
          }
        });

        // Turn into array + sort by date desc inside each month
        const formatted = Object.entries(grouped).map(([month, daysObj]) => {
          const daysArr = Object.entries(daysObj)
            .map(([date, details]) => ({ date, ...details }))
            .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
          return { name: month, days: daysArr };
        });

        // optional: sort months by newest day inside
        formatted.sort((a, b) => {
          const aTop = a.days[0]?.date ?? '';
          const bTop = b.days[0]?.date ?? '';
          return aTop < bTop ? 1 : -1;
        });

        setMonths(formatted);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const toggleMonth = (monthName) => {
    setOpenMonths((prev) => ({ ...prev, [monthName]: !prev[monthName] }));
  };

  const toggleDay = (dayId) => {
    setOpenDays((prev) => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  return (
    <div className={styles.monthsContainer}>
      {months.map((month) => (
        <div key={month.name} className={styles.monthDropdown}>
          <button className={styles.monthHeader} onClick={() => toggleMonth(month.name)}>
            <span>{month.name}</span>
            <span className={styles.arrow}>{openMonths[month.name] ? '▼' : '▶'}</span>
          </button>

          {openMonths[month.name] && (
            <div className={styles.daysContainer}>
              {month.days.map((day) => {
                const timeStr = day.lecture?.upload_time
                  ? new Date(day.lecture.upload_time * 1000).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '';

                return (
                  <div key={day.date} className={styles.dayDropdown}>
                    <button className={styles.dayHeader} onClick={() => toggleDay(day.date)}>
                      <span>{day.label}</span>
                      <span className={styles.arrow}>{openDays[day.date] ? '▼' : '▶'}</span>
                    </button>

                    {openDays[day.date] && day.lecture && (
                      <div className={styles.lecturesContainer}>
                        <Link href={`/dashboard/student/lesson/${day.lecture.id}`} className={styles.lecture}>
                          {/* exactly one per day */}
                          <div>
                            {/* Always "Lecture 1" since there’s only one per day */}
                            Lecture 1 — {day.label} • {timeStr}
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MonthContainer;