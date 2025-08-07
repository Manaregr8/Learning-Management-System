// middleware.js
import { auth0 } from './src/lib/auth0';

export async function middleware(request) {
  const response = new Response();
  const session = await auth0.getSession(request, response);

  if (!session) {
    return Response.redirect(`${process.env.AUTH0_BASE_URL}/api/auth/login`);
  }

  return response;
}

export const config = {
  matcher: ['/'], // Apply middleware only on the home page
};

