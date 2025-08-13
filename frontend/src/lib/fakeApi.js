// frontend/src/lib/fakeApi.js

export async function getUserRole(username) {
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 300));

  if (username === "manjeetdevelops@gmail.com") {
    return { username, role: "Admin" };
  } else if (username === "teacher@example.com") {
    return { username, role: "Teacher" };
  } else {
    return { username, role: "Student" };
  }
}
