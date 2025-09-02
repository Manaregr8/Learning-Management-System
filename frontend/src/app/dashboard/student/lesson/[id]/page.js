'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './lesson.module.css'; // import the CSS file

export default function LessonPage() {
  const { id } = useParams();
  const router = useRouter();
  const [otpData, setOtpData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOtp = async () => {
      try {
        const res = await fetch(`/api/videos/${id}/otp`);
        if (!res.ok) throw new Error('Failed to fetch OTP');
        const data = await res.json();
        setOtpData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOtp();
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
     window.location.href = '/api/auth/logout';
  };

  if (loading) {
    return (
      <div className={styles.centerScreen}>
        <p className={styles.loadingText}>Loading…</p>
      </div>
    );
  }

  if (!otpData) {
    return (
      <div className={styles.centerScreen}>
        <p className={styles.errorText}>Error loading video</p>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <button onClick={handleBack} className={`${styles.btn} ${styles.btnBlue}`}>
          Back
        </button>
        <button onClick={handleLogout} className={`${styles.btn} ${styles.btnRed}`}>
          Logout
        </button>
      </header>

      {/* Video Section */}
      <main className={styles.main}>
        <div className={styles.videoBox}>
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${otpData.otp}&playbackInfo=${otpData.playbackInfo}&primaryColor=4245EF`}
            className={styles.videoFrame}
            allow="encrypted-media"
            allowFullScreen
          />
        </div>
        <p className={styles.caption}>Enjoy your lesson 🚀</p>
      </main>
    </div>
  );
}
