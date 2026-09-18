const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_ME = process.env.NEXT_PUBLIC_API_ME;

const TOKEN_KEY = "token";

export async function getCurrentUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}${API_ME}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Get current user failed:", error);
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/";
}
