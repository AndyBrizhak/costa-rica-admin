import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DeleteButton,
  BulkDeleteButton,
  FunctionField,
  type RaRecord, // <-- Добавляем префикс 'type' прямо здесь
} from "react-admin";
import { Chip } from "@mui/material";

/**
 * Интерфейс, описывающий структуру данных пользователя.
 */
interface UserRecord extends RaRecord {
  userName: string;
  email: string;
  roles: string[];
}

const UserBulkActionButtons = () => (
  <BulkDeleteButton mutationMode="pessimistic" />
);

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={<UserBulkActionButtons />}>
      <TextField source="userName" label="Username" />
      <EmailField source="email" label="Email Address" />

      <FunctionField<UserRecord>
        label="Roles"
        render={(record) => (
          <>
            {record?.roles?.map((role) => (
              <Chip
                key={role}
                label={role}
                size="small"
                variant="outlined"
                style={{ marginRight: 4 }}
              />
            ))}
          </>
        )}
      />

      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
