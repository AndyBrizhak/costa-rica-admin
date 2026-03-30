// Типизация для ошибок бэкенда на основе AuthResult
interface ApiError {
  errors?: string[];
}

export const httpClient = async (url: string, options: RequestInit = {}) => {
  // Получаем базовый URL из .env.local
  const apiUrl = import.meta.env.VITE_API_URL;
  const tokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY || "cr_admin_token";

  const fullUrl = `${apiUrl}${url}`;

  // Настройка заголовков
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Извлекаем токен из localStorage
  const token = localStorage.getItem(tokenKey);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (response.status < 200 || response.status >= 300) {
    // Пытаемся распарсить массив ошибок из бэкенда (AuthModels.cs)
    const errorData: ApiError = await response.json().catch(() => ({}));
    const errorMessage = errorData.errors?.join(", ") || response.statusText;

    return Promise.reject(new Error(errorMessage));
  }

  return response.json();
};
