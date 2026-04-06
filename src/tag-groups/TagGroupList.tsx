import {
  List,
  Datagrid,
  TextField,
  SearchInput,
  TopToolbar,
  CreateButton,
  EditButton,
  DeleteButton,
} from "react-admin";

/**
 * Фильтры для списка групп тегов.
 */
const TagGroupFilters = [<SearchInput key="q" source="q" alwaysOn />];

/**
 * Кастомная панель действий для списка.
 */
const TagGroupActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export const TagGroupList = () => (
  <List
    filters={TagGroupFilters}
    actions={<TagGroupActions />}
    exporter={false}
    sort={{ field: "nameEn", order: "ASC" }}
    title="Группы тегов"
  >
    <Datagrid bulkActionButtons={false}>
      <TextField source="nameEn" label="Название (EN)" />
      <TextField source="nameEs" label="Название (ES)" />
      <TextField source="slug" label="Слаг (SEO)" />

      {/* Кнопки управления по аналогии с городами */}
      <EditButton />
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
