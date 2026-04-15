import { Edit, SimpleForm, TextInput, required } from "react-admin";

/**
 * Компонент редактирования категории Google.
 * mutationMode="pessimistic" позволяет корректно отображать ошибки 409 от бэкенда.
 */
export const GoogleCategoryEdit = () => (
  <Edit title="Edit Google Category" mutationMode="pessimistic">
    <SimpleForm>
      {/* Системный Guid — только для чтения */}
      <TextInput source="id" label="ID (System)" disabled fullWidth />

      {/* Идентификатор категории — редактируемый */}
      <TextInput
        source="gcid"
        label="Google Category ID (GCID)"
        validate={required()}
        fullWidth
      />

      <TextInput
        source="nameEn"
        label="Name (EN)"
        validate={required()}
        fullWidth
      />

      <TextInput
        source="nameEs"
        label="Name (ES)"
        validate={required()}
        fullWidth
      />
    </SimpleForm>
  </Edit>
);
