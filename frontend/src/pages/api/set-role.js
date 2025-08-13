import { auth0 } from "@/lib/auth0";
import { backendLogin, fetchWithRefresh } from "@/lib/backendApi";
import cookie from "cookie";

export default async function handler(req, res) {
  const session = await auth0.getSession(req, res);

  if (!session) {
    return res.redirect(302, "/api/auth/login");
  }

  const user = session.user;

  const { access, refresh } = await backendLogin(user.email, user.sub);

  const { res: roleRes } = await fetchWithRefresh(
    `http://127.0.0.1:8000/api/users/sudent1/`,
    access,
    refresh
  );

  if (!roleRes.ok) {
    return res.status(500).send("Failed to fetch role");
  }

  const { role } = await roleRes.json();

  res.setHeader("Set-Cookie", cookie.serialize("userRole", String(role), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  }));

  if (role === 3) {
    res.redirect(302, "/dashboard/admin");
  } else if (role === 2) {
    res.redirect(302, "/dashboard/trainer");
  } else {
    res.redirect(302, "/dashboard/student");
  }
}
