// src/app/page.js
import { redirect } from 'next/navigation';
import { auth0 } from '@/lib/auth0';

export default async function HomePage() {
  const session = await auth0.getSession();

  // Redirect to Auth0 login if not authenticated
  if (!session) {
    redirect('/api/auth/login');
  }

  const user = session.user;

  return (
    <main>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <a href="/api/auth/logout">Logout</a>
    </main>
  );
}
