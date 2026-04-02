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
 */
export interface ProvinceRecord extends RaRecord {
  id: string;
  name: string;
  slug: string;
}

/**
 * Компонент фильтров для поиска через параметр Q.
 */
const ProvinceFilters = [<FilterLiveSearch source="Q" alwaysOn />];

/**
 * Компонент для массовых операций.
 */
const ProvinceBulkActionButtons = () => (
  <BulkDeleteButton mutationMode="pessimistic" />
);

/**
 * Список провинций без колонки ID.
 */
export const ProvinceList = () => (
  <List
    filters={ProvinceFilters}
    sort={{ field: "name", order: "ASC" }}
    exporter={false}
  >
    <Datagrid rowClick="edit" bulkActionButtons={<ProvinceBulkActionButtons />}>
      {/* Колонку с ID убрали, оставив только значимые данные */}
      <TextField source="name" label="Название" />
      <TextField source="slug" label="Слаг (SEO)" />

      <EditButton />
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
