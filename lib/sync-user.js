const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function syncUser(user) {
  try {
    const res = await fetch(`${API_URL}/api/auth/sync`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authUserId: user.id,
        name: user.name,
        email: user.email,
        image: user.image || "",
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Sync failed");
    return data;
  } catch (err) {
    console.error("User sync error:", err);
    return null;
  }
}