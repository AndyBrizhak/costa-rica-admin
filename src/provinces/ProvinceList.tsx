import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  FilterLiveSearch,
} from "react-admin";

/**
 * Параметры фильтрации: используем Q для глобального поиска.
 */
const ProvinceFilters = [<FilterLiveSearch key="q" source="Q" alwaysOn />];

/**
 * Список провинций.
 * Реализован "Золотой стандарт":
 * 1. Отключены массовые операции (bulkActionButtons={false}).
 * 2. Поиск через параметр Q.
 * 3. Пессимистичное удаление для стабильности.
 */
export const ProvinceList = () => (
  <List
    filters={ProvinceFilters}
    sort={{ field: "name", order: "ASC" }}
    exporter={false}
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="name" label="Название" />
      <TextField source="slug" label="Слаг (SEO)" />

      <EditButton />
      {/* mutationMode="pessimistic" гарантирует, что удаление произойдет 
          только после успешного ответа от сервера (где стоит наша проверка FK) */}
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
