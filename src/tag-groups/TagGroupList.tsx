import {
  List,
  Datagrid,
  TextField,
  SearchInput,
  TopToolbar,
  CreateButton,
} from "react-admin";

/**
 * Фильтры для списка групп тегов.
 * SearchInput с параметром alwaysOn отображается постоянно.
 */
const TagGroupFilters = [<SearchInput key="q" source="q" alwaysOn />];

/**
 * Кастомная панель действий для списка.
 * Мы заменяем стандартную панель, исключая кнопку добавления фильтров
 * и оставляя только кнопку создания новой записи.
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
    </Datagrid>
  </List>
);
