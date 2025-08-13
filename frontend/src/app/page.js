import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

export default async function HomePage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/api/auth/login");
  }

  // Now that session exists, just go to API that sets cookie + redirects
  redirect("/api/set-role");
}
