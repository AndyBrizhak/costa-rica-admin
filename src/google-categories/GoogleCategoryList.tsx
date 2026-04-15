import {
  List,
  Datagrid,
  TextField,
  SearchInput,
  DeleteButton,
  ShowButton,
  TopToolbar,
  CreateButton,
} from "react-admin";
import { GoogleCategoryImportButton } from "./GoogleCategoryImportButton";

/**
 * Панель действий над списком.
 */
const GoogleCategoryListActions = () => (
  <TopToolbar>
    <GoogleCategoryImportButton />
    <CreateButton label="Add Category" />
  </TopToolbar>
);

/**
 * Фильтр глобального поиска.
 * Используем source="q", который мапится на Q в бэкенде.
 */
const GoogleCategoryFilters = [
  <SearchInput
    key="q"
    source="q"
    alwaysOn
    placeholder="Search by name or GCID..."
  />,
];

export const GoogleCategoryList = () => (
  <List
    filters={GoogleCategoryFilters}
    actions={<GoogleCategoryListActions />}
    exporter={false}
    sort={{ field: "nameEn", order: "ASC" }}
    title="Google Categories"
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      {/* Эти source теперь обрабатываются регистронезависимо в GoogleCategoryService */}
      <TextField source="gcid" label="GCID" />
      <TextField source="nameEn" label="Name (EN)" />
      <TextField source="nameEs" label="Name (ES)" />

      {/* Кнопки действий без лишних оберток */}
      <ShowButton />
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
