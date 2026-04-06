import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
// Импортируем Tags для групп тегов
import { Map, Users, MapPin, Tags } from "lucide-react";

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

// Подключаем компоненты модуля Групп Тегов
import { TagGroupList } from "./tag-groups/TagGroupList";
import { TagGroupCreate } from "./tag-groups/TagGroupCreate";
import { TagGroupEdit } from "./tag-groups/TagGroupEdit";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Инициализация dataProvider с поддержкой заголовка пагинации.
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

    {/* Ресурс городов */}
    <Resource
      name="cities"
      list={CityList}
      create={CityCreate}
      edit={CityEdit}
      options={{ label: "Cities" }}
      icon={MapPin}
      recordRepresentation="name"
    />

    {/* Ресурс Групп Тегов — теперь с поддержкой создания и редактирования */}
    <Resource
      name="tag-groups"
      list={TagGroupList}
      create={TagGroupCreate}
      edit={TagGroupEdit}
      options={{ label: "Tag Groups" }}
      icon={Tags}
      recordRepresentation="nameEn"
    />
  </Admin>
);

export default App;
