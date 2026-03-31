import { List, Datagrid, TextField, EmailField } from "react-admin";

/**
 * Чистый список пользователей: только логин и почта.
 * Мы скрыли ID и роли, чтобы не перегружать интерфейс и не вызывать пустых колонок.
 */
export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      {/* Имя пользователя (логин) */}
      <TextField source="userName" label="Username" />

      {/* Электронная почта */}
      <EmailField source="email" label="Email Address" />
    </Datagrid>
  </List>
);
