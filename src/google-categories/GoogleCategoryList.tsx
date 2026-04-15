import {
  List,
  Datagrid,
  TextField,
  SearchInput,
  DeleteButton,
  EditButton,
  TopToolbar,
  CreateButton,
} from "react-admin";
import { GoogleCategoryImportButton } from "./GoogleCategoryImportButton";

/**
 * Панель действий для списка категорий.
 * Содержит кнопку создания новой записи и кнопку импорта JSON.
 */
const GoogleCategoryListActions = () => (
  <TopToolbar>
    <GoogleCategoryImportButton />
    <CreateButton />
  </TopToolbar>
);

/**
 * Фильтры для поиска категорий Google.
 */
const GoogleCategoryFilters = [<SearchInput key="q" source="q" alwaysOn />];

export const GoogleCategoryList = () => (
  <List
    filters={GoogleCategoryFilters}
    actions={<GoogleCategoryListActions />}
    exporter={false}
    sort={{ field: "nameEn", order: "ASC" }}
    title="Google Categories"
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="gcid" label="GCID" />
      <TextField source="nameEn" label="Name (EN)" />
      <TextField source="nameEs" label="Name (ES)" />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <EditButton />
        <DeleteButton mutationMode="pessimistic" />
      </div>
    </Datagrid>
  </List>
);
