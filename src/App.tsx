import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
// Используем Tag (вместо Tags) для совместимости с вашей версией lucide-react
import { Map, Users, MapPin, Tag } from "lucide-react";

import { authProvider } from "./auth/authProvider";
import { httpClient } from "./auth/httpClient";
import RegistrationPage from "./auth/RegistrationPage";
import LoginPage from "./auth/LoginPage";

import { UserList } from "./users/UserList";
import { UserEdit } from "./users/UserEdit";

import { ProvinceList } from "./provinces/ProvinceList";
import { ProvinceCreate } from "./provinces/ProvinceCreate";
import { ProvinceEdit } from "./provinces/ProvinceEdit";

import { CityList } from "./cities/CityList";
import { CityCreate } from "./cities/CityCreate";
import { CityEdit } from "./cities/CityEdit";

// Импортируем упрощенный список групп тегов
import { TagGroupList } from "./tag-groups/TagGroupList";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Инициализация dataProvider.
 */
const dataProvider = simpleRestProvider(apiUrl, httpClient, "X-Total-Count");

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    loginPage={LoginPage}
    requireAuth
  >
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegistrationPage />} />
    </CustomRoutes>

    {/* Пользователи */}
    <Resource
      name="admin/users"
      list={UserList}
      edit={UserEdit}
      options={{ label: "Users" }}
      icon={Users}
      recordRepresentation="userName"
    />

    {/* Провинции */}
    <Resource
      name="provinces"
      list={ProvinceList}
      create={ProvinceCreate}
      edit={ProvinceEdit}
      options={{ label: "Provinces" }}
      icon={Map}
      recordRepresentation="name"
    />

    {/* Города */}
    <Resource
      name="cities"
      list={CityList}
      create={CityCreate}
      edit={CityEdit}
      options={{ label: "Cities" }}
      icon={MapPin}
      recordRepresentation="name"
    />

    {/* Группы тегов */}
    <Resource
      name="tag-groups"
      list={TagGroupList}
      options={{ label: "Tag Groups" }}
      icon={Tag}
      recordRepresentation="nameEn"
    />
  </Admin>
);

// ДОБАВЛЯЕМ DEFAULT EXPORT, чтобы main.tsx не ругался
export default App;
