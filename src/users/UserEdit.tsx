import React from "react";
import { Edit, SimpleForm, TextInput, SelectInput, required } from "react-admin";

const roleChoices = [
  { id: "Admin", name: "Administrator" },
  { id: "Manager", name: "Manager" },
  { id: "Viewer", name: "Viewer" },
];

export const UserEdit = () => (
  <Edit mutationMode="pessimistic">
    <SimpleForm>
      {/* Используем readOnly вместо disabled, чтобы поля попали в Payload */}
      <TextInput source="userName" label="Username" InputProps={{ readOnly: true }} fullWidth />
      <TextInput source="email" label="Email Address" InputProps={{ readOnly: true }} fullWidth />

      <SelectInput
        source="roles"
        label="Security Role"
        choices={roleChoices}
        format={(value) => (Array.isArray(value) ? value[0] : value)}
        parse={(value) => [value]}
        validate={required()}
        fullWidth
      />
    </SimpleForm>
  </Edit>
);
