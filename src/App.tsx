import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
import { authProvider } from "./auth/authProvider";
import { httpClient } from "./auth/httpClient";
import RegistrationPage from "./auth/RegistrationPage";
import LoginPage from "./auth/LoginPage";
import { UserList } from "./users/UserList";
import { UserEdit } from "./users/UserEdit"; // Импорт нового компонента редактирования

const apiUrl = import.meta.env.VITE_API_URL;

// Инициализация dataProvider с использованием кастомного httpClient для обработки токенов
const dataProvider = simpleRestProvider(apiUrl, httpClient);

export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} loginPage={LoginPage} requireAuth>
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegistrationPage />} />
    </CustomRoutes>

    {/* Настройка ресурса пользователей:
        1. edit={UserEdit} — подключает страницу редактирования ролей.
        2. recordRepresentation="userName" — заменяет технический ID на логин в заголовках и уведомлениях.
    */}
    <Resource
      name="admin/users"
      list={UserList}
      edit={UserEdit}
      options={{ label: "Users" }}
      recordRepresentation="userName"
    />
  </Admin>
);

export default App;
