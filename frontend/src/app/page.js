// src/app/page.js
import { redirect } from 'next/navigation';
import { auth0 } from '@/lib/auth0';
import { getUserRole } from '@/lib/fakeApi';

export default async function HomePage() {
  const session = await auth0.getSession();

  // Redirect to Auth0 login if not authenticated
  if (!session) {
    redirect('/api/auth/login');
  }

  const user = session.user;
  // Call the fake API to get the role
  const { role } = await getUserRole(user.email);

  // Role-based redirect
  if (role === 'Admin') {
    redirect('/dashboard/admin');
  } else if (role === 'Teacher') {
    redirect('/dashboard/trainer');
  } else {
    redirect('/dashboard/student');
  }

  // This part will rarely be reached because of the redirects
  return (
    <main>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <a href="/api/auth/logout">Logout</a>
    </main>
  );
}
