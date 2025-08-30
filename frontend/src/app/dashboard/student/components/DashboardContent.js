'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../style.module.css";
import MonthContainer from './MonthContainer';

export default function DashboardContent() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(userData => {
        console.log('Received user data:', userData); // See exact keys
        setUser(userData); // ✅ Always set user, no condition
      })
      .catch(err => console.error('Error fetching user:', err));
  }, []);

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.welcomeHeading}>
            Welcome,{" "}
            {user ? (user.name || user.nickname || user.email || "Student") : "Student"}
          </h1>
          <p className={styles.subtitle}>Let's Learn Something New Today</p>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
      <MonthContainer />
    </div>
  );
}
