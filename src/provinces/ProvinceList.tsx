import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  BulkDeleteButton,
  FilterLiveSearch,
  type RaRecord,
} from "react-admin";

/**
 * Интерфейс, описывающий структуру данных провинции.
 * Соответствует ProvinceResponseDto на бэкенде.
 */
export interface ProvinceRecord extends RaRecord {
  id: string;
  name: string;
  slug: string;
}

/**
 * Компонент фильтров для поиска.
 * source="Q" соответствует параметру в ProvinceQueryParameters на бэкенде.
 */
const ProvinceFilters = [<FilterLiveSearch source="Q" alwaysOn />];

/**
 * Компонент для массовых операций.
 */
const ProvinceBulkActionButtons = () => (
  <BulkDeleteButton mutationMode="pessimistic" />
);

/**
 * Список провинций (Table View)
 */
export const ProvinceList = () => (
  <List
    filters={ProvinceFilters}
    sort={{ field: "name", order: "ASC" }}
    exporter={false} // Отключаем экспорт, так как записей всего 7
  >
    <Datagrid rowClick="edit" bulkActionButtons={<ProvinceBulkActionButtons />}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
      <TextField source="slug" label="Слаг (SEO)" />

      <EditButton />
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
