import { Admin, Resource, ListGuesser, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
import { authProvider } from "./auth/authProvider";
import RegistrationPage from "./auth/RegistrationPage";

// URL берется из .env, никаких захардкоженных доменов
const apiUrl = import.meta.env.VITE_API_URL;

const dataProvider = simpleRestProvider(apiUrl);

export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} requireAuth>
    {/* Публичный маршрут для регистрации без основного макета (меню/шапки) */}
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegistrationPage />} />
    </CustomRoutes>

    {/* Временный ресурс для проверки доступа */}
    <Resource name="users" list={ListGuesser} />
  </Admin>
);

export default App;
