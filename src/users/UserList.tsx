import React from "react";
import { List, Datagrid, TextField, EmailField, DeleteButton, BulkDeleteButton } from "react-admin";

/**
 * Кнопки массовых действий для списка.
 * Режим pessimistic обязателен для предотвращения ошибок с ID.
 */
const UserBulkActionButtons = () => <BulkDeleteButton mutationMode="pessimistic" />;

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={<UserBulkActionButtons />}>
      <TextField source="userName" label="Username" />
      <EmailField source="email" label="Email Address" />

      {/* Кнопка удаления в строке */}
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
