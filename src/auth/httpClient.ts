import { fetchUtils } from "react-admin";

/**
 * Универсальный HTTP-клиент.
 * Исправлена проблема отсутствия Content-Type, вызывавшая 400 ошибку.
 */
export const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const tokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY || "cr_admin_token";

  // Формируем финальный URL
  const finalUrl = url.startsWith("http") ? url : `${apiUrl}${url}`;

  // Настройка заголовков
  const headers = new Headers(options.headers || {});

  // Добавляем Accept, если его нет
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  // ВАЖНО: Добавляем Content-Type для POST/PUT запросов, чтобы бэкенд видел JSON
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Добавляем JWT токен для авторизованных запросов
  const token = localStorage.getItem(tokenKey);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Выполняем запрос через утилиту react-admin
  return fetchUtils.fetchJson(finalUrl, { ...options, headers });
};
