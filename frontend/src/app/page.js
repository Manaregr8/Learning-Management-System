'use client';

import { useUser } from '@auth0/nextjs-auth0';

export default function HomePage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {!user ? (
        <a href="/api/auth/login">Login</a>
      ) : (
        <>
          <p>Welcome, {user.name}</p>
          <a href="/api/auth/logout">Logout</a>
        </>
      )}
    </div>
  );
}
