import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { authProvider } from "./auth/authProvider";

// Получаем базовый URL API из переменных окружения (.env.local)
const apiUrl = import.meta.env.VITE_API_URL;

// Создаем dataProvider для взаимодействия с ресурсами бэкенда.
// Используем simpleRestProvider, так как он лучше всего подходит для кастомных .NET API.
const dataProvider = simpleRestProvider(apiUrl);

export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    requireAuth // Заставляет пользователя авторизоваться перед просмотром контента
  >
    {/* Временный ресурс для проверки работоспособности. 
        React Admin отправит GET запрос на ${apiUrl}/users 
    */}
    <Resource name="users" list={ListGuesser} />
  </Admin>
);

export default App;
