import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { backendLogin, fetchWithRefresh } from "@/lib/backendApi";

export default async function HomePage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/api/auth/login");
  }

  const user = session.user;

  // Step 1: Login to backend
  const { access, refresh } = await backendLogin(user.email, user.sub);

  // Step 2: Fetch role with token refresh handling
  const { res: roleRes, newAccessToken } = await fetchWithRefresh(
    `http://127.0.0.1:8000/api/users/manjeet/`,
    access,
    refresh
  );

  if (!roleRes.ok) {
    throw new Error("Failed to fetch role");
  }

  const { role } = await roleRes.json();

  // Step 3: Redirect based on role
  if (role === "Admin") {
    redirect("/dashboard/admin");
  } else if (role === "Teacher") {
    redirect("/dashboard/trainer");
  } else {
    redirect("/dashboard/student");
  }
}
