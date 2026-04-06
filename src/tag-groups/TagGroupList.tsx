import { List, Datagrid, TextField, SearchInput } from "react-admin";

/**
 * Фильтры для списка групп тегов.
 * Используем SearchInput для связи с параметром "q" на бэкенде.
 */
const TagGroupFilters = [<SearchInput key="q" source="q" alwaysOn />];

export const TagGroupList = () => (
  <List
    filters={TagGroupFilters}
    exporter={false}
    sort={{ field: "nameEn", order: "ASC" }}
    title="Группы тегов"
  >
    {/* КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: 
        Удален rowClick="edit" и кнопки EditButton/DeleteButton.
        Пока в App.tsx не зарегистрированы компоненты create и edit, 
        любая попытка сослаться на них приведет к белому экрану.
    */}
    <Datagrid bulkActionButtons={false}>
      <TextField source="nameEn" label="Название (EN)" />
      <TextField source="nameEs" label="Название (ES)" />
      <TextField source="slug" label="Слаг (SEO)" />
    </Datagrid>
  </List>
);
