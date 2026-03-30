import type { AuthProvider } from "react-admin";
import { httpClient } from "./httpClient";

// Ключ для хранения токена, соответствующий твоему .env.local
const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || "cr_admin_token";

export const authProvider: AuthProvider = {
  // Вход в систему: мапим username из формы в email для бэкенда
  login: async ({ username, password }) => {
    try {
      const response = await httpClient("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: username, password }),
      });

      // Бэкенд возвращает id, token и roles
      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(`${TOKEN_KEY}_roles`, JSON.stringify(response.roles || []));

      return Promise.resolve();
    } catch (error: unknown) {
      // Проверяем, является ли пойманный объект экземпляром стандартной Ошибки
      const message = error instanceof Error ? error.message : "Ошибка аутентификации";
      throw new Error(message);
    }
  },

  // Выход: просто чистим локальное хранилище
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(`${TOKEN_KEY}_roles`);
    return Promise.resolve();
  },

  // Простая проверка: есть ли у нас токен в принципе
  checkAuth: () => {
    return localStorage.getItem(TOKEN_KEY) ? Promise.resolve() : Promise.reject();
  },

  // Если API вернуло 401 или 403 — токен невалиден, разлогиниваем пользователя
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(`${TOKEN_KEY}_roles`);
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Получение данных профиля через эндпоинт /me
  getIdentity: async () => {
    try {
      const user = await httpClient("/auth/me");
      return Promise.resolve({
        id: user.id,
        fullName: user.email, // Используем email как отображаемое имя
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Извлечение ролей (Admin, Manager и т.д.) для управления доступом
  getPermissions: () => {
    const roles = localStorage.getItem(`${TOKEN_KEY}_roles`);
    return roles ? Promise.resolve(JSON.parse(roles)) : Promise.resolve([]);
  },
};
