import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
import { Map, Users, MapPin, Tags, Tag } from "lucide-react";
import { BookOpen } from "lucide-react"; // Иконка для категорий

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

import { TagGroupList } from "./tag-groups/TagGroupList";
import { TagGroupCreate } from "./tag-groups/TagGroupCreate";
import { TagGroupEdit } from "./tag-groups/TagGroupEdit";

// Импорт компонентов нового ресурса Tags
import { TagList } from "./tags/TagList";
import { TagCreate } from "./tags/TagCreate";
import { TagEdit } from "./tags/TagEdit";

// Импорт компонентов Google Categories
import { GoogleCategoryList } from "./google-categories/GoogleCategoryList";
import { GoogleCategoryCreate } from "./google-categories/GoogleCategoryCreate";

import { GoogleCategoryShow } from "./google-categories/GoogleCategoryShow";

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

    {/* Users Resource */}
    <Resource
      name="admin/users"
      list={UserList}
      edit={UserEdit}
      options={{ label: "Users" }}
      icon={Users}
      recordRepresentation="userName"
    />

    {/* Provinces Resource */}
    <Resource
      name="provinces"
      list={ProvinceList}
      create={ProvinceCreate}
      edit={ProvinceEdit}
      options={{ label: "Provinces" }}
      icon={Map}
      recordRepresentation="name"
    />

    {/* Cities Resource */}
    <Resource
      name="cities"
      list={CityList}
      create={CityCreate}
      edit={CityEdit}
      options={{ label: "Cities" }}
      icon={MapPin}
      recordRepresentation="name"
    />

    {/* Tag Groups Resource */}
    <Resource
      name="tag-groups"
      list={TagGroupList}
      create={TagGroupCreate}
      edit={TagGroupEdit}
      options={{ label: "Tag Groups" }}
      icon={Tags}
      recordRepresentation="nameEn"
    />

    {/* Tags Resource */}
    <Resource
      name="tags"
      list={TagList}
      create={TagCreate}
      edit={TagEdit}
      options={{ label: "Tags" }}
      icon={Tag}
      recordRepresentation="nameEn"
    />
    <Resource
      name="google-categories"
      list={GoogleCategoryList}
      create={GoogleCategoryCreate}
      show={GoogleCategoryShow}
      options={{ label: "Google Categories" }}
      icon={BookOpen}
      recordRepresentation="nameEn"
    />
  </Admin>
);

export default App;
