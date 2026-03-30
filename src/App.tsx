import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
import { authProvider } from "./auth/authProvider";
import { httpClient } from "./auth/httpClient"; // Импортируем наш чистый клиент
import RegistrationPage from "./auth/RegistrationPage";
import LoginPage from "./auth/LoginPage";
import { UserList } from "./users/UserList";

const apiUrl = import.meta.env.VITE_API_URL;

// Передаем httpClient вторым аргументом.
// Теперь все запросы ресурсов (Resource) будут автоматически идти с токеном.
const dataProvider = simpleRestProvider(apiUrl, httpClient);

export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} loginPage={LoginPage} requireAuth>
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegistrationPage />} />
    </CustomRoutes>

    {/* Путь "admin/users" теперь совпадает с UserEndpoints.cs на бэкенде */}
    <Resource name="admin/users" list={UserList} options={{ label: "Users" }} />
  </Admin>
);

export default App;
