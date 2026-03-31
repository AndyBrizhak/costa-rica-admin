import {
  List,
  Datagrid,
  TextField,
  EmailField,
  ArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";

/**
 * Компонент для отображения списка пользователей.
 * Мы используем только необходимые компоненты, чтобы избежать ошибок компиляции.
 */
export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      {/* Уникальный идентификатор пользователя */}
      <TextField source="id" label="ID" />

      {/* Имя пользователя и Email */}
      <TextField source="userName" label="Username" />
      <EmailField source="email" label="Email Address" />

      {/* Роли пользователя: отображаем массив строк как набор графических тегов (Chips) */}
      <ArrayField source="roles" label="User Roles">
        <SingleFieldList linkType={false}>
          <ChipField source="id" size="small" sx={{ fontWeight: "bold" }} />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);
