import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  FunctionField,
  required,
} from "react-admin";
import type { UserRecord } from "./types";

/**
 * Custom title component to show the email of the user being edited.
 */
const UserTitle = () => (
  <FunctionField<UserRecord>
    render={(record) =>
      record ? <span>Edit User: {record.email}</span> : <span>Edit User</span>
    }
  />
);

const roleChoices = [
  { id: "SuperAdmin", name: "SuperAdmin" },
  { id: "Admin", name: "Admin" },
  { id: "Manager", name: "Manager" },
  { id: "Viewer", name: "Viewer" },
];

/**
 * User Edit view following the "Gold Standard".
 * Enforces strict "one user - one role" logic.
 */
export const UserEdit = () => (
  <Edit mutationMode="pessimistic" title={<UserTitle />} redirect="list">
    <SimpleForm>
      {/* Primary Key - visible but read-only */}
      <TextInput source="id" label="System ID" disabled fullWidth />

      {/* Identity fields are read-only to prevent accidental changes via Admin API */}
      <TextInput
        source="userName"
        label="Username"
        InputProps={{ readOnly: true }}
        fullWidth
      />
      <TextInput
        source="email"
        label="Email Address"
        InputProps={{ readOnly: true }}
        fullWidth
      />

      {/* Single role selection directly maps to the backend UserUpdateDto */}
      <SelectInput
        source="role"
        label="Security Role"
        choices={roleChoices}
        validate={required()}
        fullWidth
      />
    </SimpleForm>
  </Edit>
);
