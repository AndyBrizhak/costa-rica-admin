import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { authProvider } from "./auth/authProvider";

// Получаем URL API из настроек окружения
const apiUrl = import.meta.env.VITE_API_URL;

// Создаем dataProvider для работы с ресурсами бэкенда
const dataProvider = simpleRestProvider(apiUrl);

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    requireAuth // Требовать авторизацию для доступа к любому ресурсу
  >
    {/* Временный ресурс для проверки. 
        React Admin отправит запрос на ${apiUrl}/users 
    */}
    <Resource name="users" list={ListGuesser} />
  </Admin>
);

export default App;
