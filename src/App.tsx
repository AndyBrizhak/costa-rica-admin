import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
import { Map, Users } from "lucide-react";

import { authProvider } from "./auth/authProvider";
import { httpClient } from "./auth/httpClient";
import RegistrationPage from "./auth/RegistrationPage";
import LoginPage from "./auth/LoginPage";

import { UserList } from "./users/UserList";
import { UserEdit } from "./users/UserEdit";

import { ProvinceList } from "./provinces/ProvinceList";
import { ProvinceCreate } from "./provinces/ProvinceCreate";
import { ProvinceEdit } from "./provinces/ProvinceEdit";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Инициализация dataProvider.
 * Добавляем третий аргумент 'X-Total-Count', чтобы simpleRestProvider
 * знал, какой заголовок использовать для пагинации.
 */
const dataProvider = simpleRestProvider(apiUrl, httpClient, "X-Total-Count");

export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    loginPage={LoginPage}
    requireAuth
  >
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegistrationPage />} />
    </CustomRoutes>

    {/* Ресурс пользователей */}
    <Resource
      name="admin/users"
      list={UserList}
      edit={UserEdit}
      options={{ label: "Users" }}
      icon={Users}
      recordRepresentation="userName"
    />

    {/* Ресурс провинций */}
    <Resource
      name="provinces"
      list={ProvinceList}
      create={ProvinceCreate}
      edit={ProvinceEdit}
      options={{ label: "Provinces" }}
      icon={Map}
      recordRepresentation="name"
    />
  </Admin>
);

export default App;
