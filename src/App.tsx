import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
import { authProvider } from "./auth/authProvider";
import { httpClient } from "./auth/httpClient";
import RegistrationPage from "./auth/RegistrationPage";
import LoginPage from "./auth/LoginPage";
import { UserList } from "./users/UserList";

const apiUrl = import.meta.env.VITE_API_URL;

// Инициализация dataProvider с использованием нашего httpClient для передачи токенов
const dataProvider = simpleRestProvider(apiUrl, httpClient);

export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} loginPage={LoginPage} requireAuth>
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegistrationPage />} />
    </CustomRoutes>

    {/* recordRepresentation="userName" указывает React Admin использовать поле userName 
        для заголовков и уведомлений об удалении/изменении.
    */}
    <Resource
      name="admin/users"
      list={UserList}
      options={{ label: "Users" }}
      recordRepresentation="userName"
    />
  </Admin>
);

export default App;
