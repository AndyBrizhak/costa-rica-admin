import { List, Datagrid, TextField, EmailField, DeleteButton, BulkDeleteButton } from "react-admin";

/**
 * Компонент для кнопок массовых действий в шапке таблицы.
 * Установка mutationMode="pessimistic" предотвращает ошибку обращения к 'id' удаленной записи.
 */
const UserBulkActionButtons = () => <BulkDeleteButton mutationMode="pessimistic" />;

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={<UserBulkActionButtons />}>
      {/* Отображаем только логин и почту */}
      <TextField source="userName" label="Username" />
      <EmailField source="email" label="Email Address" />

      {/* Кнопка удаления в строке также в режиме pessimistic */}
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
