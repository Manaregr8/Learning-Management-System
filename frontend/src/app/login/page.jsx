'use client';
import { useState } from 'react';
import api from '@/services/axios'; // Axios instance with baseURL
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login/', { email, password });
      localStorage.setItem('token', res.data.token);
      const role = res.data.role;
      // Redirect based on role
      if (role === 'admin') router.push('/dashboard/admin');
      else if (role === 'instructor') router.push('/dashboard/instructor');
      else router.push('/dashboard/student');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login to LMS</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
