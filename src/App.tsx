import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
// Добавляем Image в импорт
import { Map, Users, MapPin, Tags, Tag, Image, BookOpen } from "lucide-react";

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

import { TagList } from "./tags/TagList";
import { TagCreate } from "./tags/TagCreate";
import { TagEdit } from "./tags/TagEdit";

import { GoogleCategoryList } from "./google-categories/GoogleCategoryList";
import { GoogleCategoryCreate } from "./google-categories/GoogleCategoryCreate";
import { GoogleCategoryShow } from "./google-categories/GoogleCategoryShow";

// Новые компоненты Media
import { MediaList } from "./media/MediaList";
import { MediaEdit } from "./media/MediaEdit";
import { MediaCreate } from "./media/MediaCreate";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Базовый провайдер для стандартных ресурсов
 */
const baseDataProvider = simpleRestProvider(
  apiUrl,
  httpClient,
  "X-Total-Count",
);

/**
 * Расширенный dataProvider для поддержки загрузки файлов через FormData (решает ошибку 415)
 */
const dataProvider = {
  ...baseDataProvider,
  create: (resource: string, params: any) => {
    // Если это не медиа или нет файла, используем стандартную логику (JSON)
    if (resource !== "media" || !params.data.file) {
      return baseDataProvider.create(resource, params);
    }

    // Создаем FormData для передачи бинарных данных
    const formData = new FormData();

    // React Admin ImageInput хранит объект файла в свойстве rawFile
    if (params.data.file && params.data.file.rawFile) {
      formData.append("file", params.data.file.rawFile);
    }

    formData.append("slug", params.data.slug);

    if (params.data.altTextEn)
      formData.append("altTextEn", params.data.altTextEn);
    if (params.data.altTextEs)
      formData.append("altTextEs", params.data.altTextEs);

    // Отправляем запрос через httpClient напрямую
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: formData,
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    }));
  },
};

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

    <Resource
      name="admin/users"
      list={UserList}
      edit={UserEdit}
      options={{ label: "Users" }}
      icon={Users}
      recordRepresentation="userName"
    />

    <Resource
      name="provinces"
      list={ProvinceList}
      create={ProvinceCreate}
      edit={ProvinceEdit}
      options={{ label: "Provinces" }}
      icon={Map}
      recordRepresentation="name"
    />

    <Resource
      name="cities"
      list={CityList}
      create={CityCreate}
      edit={CityEdit}
      options={{ label: "Cities" }}
      icon={MapPin}
      recordRepresentation="name"
    />

    <Resource
      name="tag-groups"
      list={TagGroupList}
      create={TagGroupCreate}
      edit={TagGroupEdit}
      options={{ label: "Tag Groups" }}
      icon={Tags}
      recordRepresentation="nameEn"
    />

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

    {/* Ресурс Media Library */}
    <Resource
      name="media"
      list={MediaList}
      create={MediaCreate}
      edit={MediaEdit}
      options={{ label: "Media Library" }}
      icon={Image}
    />
  </Admin>
);

export default App;
