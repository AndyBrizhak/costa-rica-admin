import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  SearchInput,
} from "react-admin";

/**
 * Фильтры для списка групп тегов.
 * SearchInput настроен на поле "q", которое наш бэкенд
 * умеет парсить и превращать в глобальный ILike поиск.
 */
const TagGroupFilters = [<SearchInput key="q" source="q" alwaysOn />];

export const TagGroupList = () => (
  <List
    filters={TagGroupFilters}
    exporter={false} // Отключаем экспорт для чистоты интерфейса
    sort={{ field: "nameEn", order: "ASC" }} // Сортировка по умолчанию
    title="Группы тегов"
  >
    {/* bulkActionButtons={false} — убираем чекбоксы слева. 
        Это делает интерфейс аккуратнее и защищает от случайного удаления пачки групп.
    */}
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="nameEn" label="Название (EN)" />
      <TextField source="nameEs" label="Название (ES)" />
      <TextField source="slug" label="Слаг (SEO)" />

      {/* Кнопки управления */}
      <EditButton />
      <DeleteButton
        mutationMode="pessimistic"
        confirmTitle="Удаление группы"
        confirmContent="Вы уверены? Если в группе есть теги, сервер вернет ошибку."
      />
    </Datagrid>
  </List>
);
