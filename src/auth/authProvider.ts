import type { AuthProvider } from "react-admin";
import { httpClient } from "./httpClient";

// Ключ для хранения токена, соответствующий твоему .env.local
const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || "cr_admin_token";

export const authProvider: AuthProvider = {
  // Вход в систему: мапим username из формы в email для бэкенда
  login: async ({ username, password }) => {
    try {
      // httpClient теперь возвращает { status, headers, body, json }
      const { json } = await httpClient("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: username, password }),
      });

      // Данные (token и roles) теперь берем из поля json
      localStorage.setItem(TOKEN_KEY, json.token);
      localStorage.setItem(
        `${TOKEN_KEY}_roles`,
        JSON.stringify(json.roles || []),
      );

      return Promise.resolve();
    } catch (error: unknown) {
      // Извлекаем сообщение об ошибке из объекта, если оно там есть
      const message =
        error instanceof Error ? error.message : "Authentication failed";
      throw new Error(message);
    }
  },

  // Выход: чистим локальное хранилище
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(`${TOKEN_KEY}_roles`);
    return Promise.resolve();
  },

  // Проверка: есть ли у нас токен
  checkAuth: () => {
    return localStorage.getItem(TOKEN_KEY)
      ? Promise.resolve()
      : Promise.reject();
  },

  // Исправлено: разлогиниваем только при 401. При 403 просто остаемся в системе.
  checkError: (error) => {
    const status = error.status;
    if (status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(`${TOKEN_KEY}_roles`);
      return Promise.reject();
    }
    // Для 403 и других ошибок не делаем редирект на логин
    return Promise.resolve();
  },

  // Получение данных профиля через эндпоинт /me
  getIdentity: async () => {
    try {
      // Здесь тоже достаем json из ответа
      const { json } = await httpClient("/auth/me");
      return Promise.resolve({
        id: json.id,
        fullName: json.email, // Используем email как отображаемое имя
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Проверка прав (roles)
  getPermissions: () => {
    const roles = localStorage.getItem(`${TOKEN_KEY}_roles`);
    return roles ? Promise.resolve(JSON.parse(roles)) : Promise.resolve([]);
  },
};
