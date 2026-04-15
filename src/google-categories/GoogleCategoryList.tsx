import {
  List,
  Datagrid,
  TextField,
  SearchInput,
  DeleteButton,
  EditButton,
} from "react-admin";

/**
 * Фильтры для поиска категорий Google.
 * Используем 'q' для полнотекстового поиска (GCID, NameEn, NameEs).
 */
const GoogleCategoryFilters = [<SearchInput key="q" source="q" alwaysOn />];

export const GoogleCategoryList = () => (
  <List
    filters={GoogleCategoryFilters}
    exporter={false}
    sort={{ field: "nameEn", order: "ASC" }}
    title="Google Categories"
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      {/* Идентификатор из Google/Pleper */}
      <TextField source="gcid" label="GCID" />

      {/* Названия на двух языках */}
      <TextField source="nameEn" label="Name (EN)" />
      <TextField source="nameEs" label="Name (ES)" />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <EditButton />
        {/* Pessimistic режим позволяет увидеть ошибку 409 при удалении связанных данных */}
        <DeleteButton mutationMode="pessimistic" />
      </div>
    </Datagrid>
  </List>
);
