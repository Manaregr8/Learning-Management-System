// src/pages/api/auth/me.js
import { auth0 } from '@/lib/auth0';

export default async function me(req, res) {
  const session = await auth0.getSession(req, res);
  res.status(200).json(session?.user || null);  // ✅ no wrapper
}
