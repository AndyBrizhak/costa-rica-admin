import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  SearchInput,
} from "react-admin";

/**
 * Фильтры для списка.
 * SearchInput — правильный выбор для верхней панели (не создает вложенных <form>).
 */
const ProvinceFilters = [
  <SearchInput key="q" source="Q" alwaysOn placeholder="Поиск..." />,
];

/**
 * Список провинций.
 * 1. Исправлена ошибка вложенных форм (белый экран).
 * 2. Отключены массовые операции для безопасности.
 * 3. Убраны неиспользуемые импорты типов для устранения предупреждений linter/TS.
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
      {/* mutationMode="pessimistic" обязателен для корректной обработки ошибок FK с бэкенда */}
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
