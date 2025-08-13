// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // For now, pretend this is the logged-in role
  const userRole = request.cookies.get('userRole')?.value;

  const path = request.nextUrl.pathname;

  if (path.startsWith('/dashboard/trainer') && userRole !== '2') {
    return new NextResponse('Forbidden: You do not have trainer access', { status: 403 });
  }

  if (path.startsWith('/dashboard/admin') && userRole !== '3') {
    return new NextResponse('Forbidden: You do not have admin access', { status: 403 });
  }
  if (path.startsWith('/dashboard/student') && userRole !== '1') {
    return new NextResponse('Forbidden: You do not have student access', { status: 403 });
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
