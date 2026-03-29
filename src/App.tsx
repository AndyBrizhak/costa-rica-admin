import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

// Используем публичный тестовый API для проверки
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin dataProvider={dataProvider}>
    {/* Resource — это описание сущности (например, ваши Businesses или Provinces) */}
    <Resource name="posts" list={ListGuesser} />
  </Admin>
);

export default App;
