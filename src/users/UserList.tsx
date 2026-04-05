import {
  List,
  Datagrid,
  TextField,
  EmailField,
  SearchInput,
  SelectArrayInput,
  DeleteButton,
  FunctionField,
  WrapperField,
} from "react-admin";
import { Chip } from "@mui/material";
import type { UserRecord } from "./types";

/**
 * Filter configuration for the User List.
 * q: Global search (Email/Username)
 * roles: Multi-select filter to find users with specific roles
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
    label="Filter by Roles"
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

      {/* Displaying a single role. 
          sortBy="role" matches the backend implementation in AdminUserService.
      */}
      <WrapperField label="Role" sortBy="role">
        <FunctionField<UserRecord>
          render={(record) =>
            record?.role ? (
              <Chip
                label={record.role}
                size="small"
                variant="outlined"
                color={record.role === "SuperAdmin" ? "secondary" : "default"}
              />
            ) : null
          }
        />
      </WrapperField>

      <DeleteButton
        label="Delete"
        mutationMode="pessimistic"
        confirmTitle="Delete User"
        confirmContent="Are you sure you want to permanently remove this user?"
      />
    </Datagrid>
  </List>
);
