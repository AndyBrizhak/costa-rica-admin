import { Create, SimpleForm, TextInput, required } from "react-admin";

/**
 * Компонент создания новой категории Google.
 * Поле gcid заполняется вручную согласно справочнику Google (pleper.com).
 */
export const GoogleCategoryCreate = () => (
  <Create title="Create Google Category" mutationMode="pessimistic">
    <SimpleForm>
      <TextInput
        source="gcid"
        label="Google Category ID (GCID)"
        helperText="Example: restaurant, shopping_mall"
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
  </Create>
);
