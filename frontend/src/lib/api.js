const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.token
      ? { Authorization: `Bearer ${options.token}` }
      : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}