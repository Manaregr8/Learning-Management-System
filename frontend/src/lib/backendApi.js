export async function backendLogin(email, auth0Id) {
  const res = await fetch("http://127.0.0.1:8000/api/users/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password: auth0Id, // Auth0 ID as password
    }),
  });

  if (!res.ok) {
    throw new Error("Backend login failed");
  }

  return res.json(); // { access, refresh }
}

export async function fetchWithRefresh(url, accessToken, refreshToken) {
  let res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If token expired, refresh and retry
  if (res.status === 401) {
    const refreshRes = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!refreshRes.ok) {
      throw new Error("Token refresh failed");
    }

    const { access: newAccessToken } = await refreshRes.json();

    // Retry the original request
    res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
      },
    });

    return { res, newAccessToken };
  }

  return { res, newAccessToken: accessToken };
}
