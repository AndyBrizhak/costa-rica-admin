import {
  List,
  Datagrid,
  TextField,
  EmailField,
  FunctionField,
  SearchInput,
  SelectArrayInput,
  DeleteButton,
} from "react-admin";
import { Chip, Box } from "@mui/material";
// Исправляем здесь: добавляем ключевое слово 'type'
import type { UserRecord } from "./types";

/**
 * Filter configuration for the User List.
 * q: Global search (Email/Username)
 * roles: Multi-select filter for security roles
 */
const UserFilters = [
  <SearchInput
    key="q"
    source="q"
    alwaysOn
    placeholder="Search by email or name..."
  />,
  <SelectArrayInput
    key="roles"
    source="roles"
    label="Roles"
    choices={[
      { id: "SuperAdmin", name: "SuperAdmin" },
      { id: "Admin", name: "Admin" },
      { id: "Manager", name: "Manager" },
      { id: "Viewer", name: "Viewer" },
    ]}
  />,
];

export const UserList = () => (
  <List
    filters={UserFilters}
    sort={{ field: "email", order: "ASC" }}
    exporter={false}
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="userName" label="Username" />
      <EmailField source="email" label="Email Address" />

      <FunctionField<UserRecord>
        label="Roles"
        sortBy="roles"
        render={(record) => (
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {record?.roles?.map((role) => (
              <Chip
                key={role}
                label={role}
                size="small"
                variant="outlined"
                color={role === "SuperAdmin" ? "secondary" : "default"}
              />
            ))}
          </Box>
        )}
      />

      <DeleteButton
        label="Delete"
        mutationMode="pessimistic"
        confirmTitle="Delete User"
        confirmContent="Are you sure you want to permanently remove this user?"
      />
    </Datagrid>
  </List>
);
