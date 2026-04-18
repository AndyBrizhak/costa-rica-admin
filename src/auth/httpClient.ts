import { fetchUtils } from "react-admin";

/**
 * Универсальный HTTP-клиент.
 * Настроен перехват кастомных ошибок (напр. 409 Conflict) от бэкенда.
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
  // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Если тело запроса является FormData (загрузка файлов),
  // заголовок Content-Type устанавливать НЕЛЬЗЯ. Браузер выставит его автоматически
  // с необходимым boundary. Принудительная установка JSON приведет к ошибке 415.
  if (
    options.body &&
    !headers.has("Content-Type") &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  // Добавляем JWT токен для авторизованных запросов
  const token = localStorage.getItem(tokenKey);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Выполняем запрос через утилиту react-admin и перехватываем результат
  return fetchUtils
    .fetchJson(finalUrl, { ...options, headers })
    .catch((err) => {
      // Перехватываем сообщения об ошибках от бэкенда
      if (err.body && err.body.error) {
        err.message = err.body.error;
      }

      // Обязательно пробрасываем ошибку дальше для корректной работы уведомлений
      throw err;
    });
};
