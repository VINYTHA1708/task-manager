const API_BASE = "http://localhost:8080/api/v1";

function getToken(): string | null {
  return localStorage.getItem("jwt_token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
}): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Registration failed");
  }
  return res.text();
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<{ token: string }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Login failed");
  }
  return res.json();
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: "PENDING" | "COMPLETED";
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE}/tasks`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    if (res.status === 403) throw new Error("Not Authorized");
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

export async function createTask(task: Omit<Task, "id">): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    if (res.status === 403) throw new Error("Not Authorized");
    throw new Error("Failed to create task");
  }
  return res.json();
}

export async function checkAdminAccess(): Promise<string> {
  const res = await fetch(`${API_BASE}/tasks/admin/test`, {
    headers: authHeaders(),
  });
  if (res.status === 403) throw new Error("Not Authorized – Admin access required");
  if (!res.ok) throw new Error("Admin check failed");
  return res.text();
}
