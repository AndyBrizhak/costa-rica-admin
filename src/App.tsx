import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
import {
  Store,
  Map,
  Users,
  MapPin,
  Tags,
  Tag,
  Image,
  BookOpen,
} from "lucide-react";
import type { CreateParams, RaRecord } from "react-admin";
import type { MediaUploadDto } from "./media/mediaTypes";

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

import { BusinessList } from "./business-pages/BusinessList";
import { BusinessCreate } from "./business-pages/BusinessCreate";
import { BusinessEdit } from "./business-pages/BusinessEdit";

/**
 * Базовый провайдер для стандартных ресурсов
 */
const baseDataProvider = simpleRestProvider(
  apiUrl,
  httpClient,
  "X-Total-Count",
);

/**
 * Расширенный dataProvider для поддержки загрузки файлов через FormData.
 * Использует типы RaRecord и MediaUploadDto для исключения ошибки no-explicit-any.
 */
const dataProvider = {
  ...baseDataProvider,
  create: (resource: string, params: CreateParams<RaRecord>) => {
    // Если это не медиа или нет файла, используем стандартную логику (JSON)
    if (resource !== "media" || !params.data.file) {
      return baseDataProvider.create(resource, params);
    }

    // Приведение к MediaUploadDto только для логики загрузки медиа
    const data = params.data as unknown as MediaUploadDto;
    const formData = new FormData();

    // React Admin ImageInput хранит объект файла в свойстве rawFile
    if (data.file && data.file.rawFile) {
      formData.append("file", data.file.rawFile);
    }

    formData.append("slug", data.slug);

    if (data.altTextEn) {
      formData.append("altTextEn", data.altTextEn);
    }
    if (data.altTextEs) {
      formData.append("altTextEs", data.altTextEs);
    }

    // Отправляем запрос через httpClient напрямую
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: formData,
    }).then(({ json }) => ({
      // Возвращаем только чистый ответ от бэкенда
      data: json,
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
    <Resource
      name="admin/business-pages"
      list={BusinessList}
      create={BusinessCreate}
      edit={BusinessEdit}
      options={{ label: "Business Pages" }}
      icon={Store}
      recordRepresentation="name"
    />
  </Admin>
);

export default App;
