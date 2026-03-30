import { Admin, Resource, ListGuesser, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
import { authProvider } from "./auth/authProvider";
import RegistrationPage from "./auth/RegistrationPage";
import LoginPage from "./auth/LoginPage";

/**
 * Главный компонент системы управления.
 * Здесь мы подключаем авторизацию, кастомные страницы входа/регистрации
 * и настраиваем поставщика данных для связи с .NET API.
 */

// Базовый URL нашего API (подтягивается из .env.local)
const apiUrl = import.meta.env.VITE_API_URL;

// Провайдер данных, работающий по стандарту Simple REST
const dataProvider = simpleRestProvider(apiUrl);

export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    // Подключаем кастомную страницу входа с ссылкой на регистрацию
    loginPage={LoginPage}
    // Обязательная проверка авторизации для всех внутренних разделов
    requireAuth
  >
    {/* Публичные маршруты, доступные без входа в систему.
        Флаг noLayout скрывает боковое меню и шапку админки. 
    */}
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegistrationPage />} />
    </CustomRoutes>

    {/* Тестовый ресурс для проверки работы CRUD после логина */}
    <Resource name="users" list={ListGuesser} />
  </Admin>
);

export default App;
