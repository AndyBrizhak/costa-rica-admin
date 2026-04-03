import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  minLength,
} from "react-admin";

export const CityEdit = () => (
  <Edit title="Редактировать город" mutationMode="pessimistic">
    <SimpleForm>
      <TextInput
        source="id"
        label="ID (Системный)"
        InputProps={{ readOnly: true }}
        fullWidth
      />
      <TextInput
        source="name"
        label="Название города"
        validate={[required(), minLength(2)]}
        fullWidth
      />
      <TextInput
        source="slug"
        label="Слаг (SEO)"
        validate={required()}
        fullWidth
      />
      <ReferenceInput source="provinceId" reference="provinces">
        <SelectInput
          label="Провинция"
          optionText="name"
          validate={required()}
          fullWidth
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
