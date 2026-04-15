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

const GoogleCategoryListActions = () => (
  <TopToolbar>
    <GoogleCategoryImportButton />
    <CreateButton />
  </TopToolbar>
);

const GoogleCategoryFilters = [<SearchInput key="q" source="q" alwaysOn />];

export const GoogleCategoryList = () => (
  <List
    filters={GoogleCategoryFilters}
    actions={<GoogleCategoryListActions />}
    exporter={false}
    sort={{ field: "nameEn", order: "ASC" }}
    title="Google Categories"
  >
    {/* Теперь клик по строке открывает страницу просмотра */}
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="gcid" label="GCID" />
      <TextField source="nameEn" label="Name (EN)" />
      <TextField source="nameEs" label="Name (ES)" />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <ShowButton />
        <DeleteButton mutationMode="pessimistic" />
      </div>
    </Datagrid>
  </List>
);
