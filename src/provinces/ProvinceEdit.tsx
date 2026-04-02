import { Edit, SimpleForm, TextInput, required, minLength } from "react-admin";

/**
 * Компонент редактирования провинции.
 * Используется mutationMode="pessimistic" для мгновенного подтверждения изменений на сервере.
 */
export const ProvinceEdit = () => (
  <Edit mutationMode="pessimistic" redirect="list">
    <SimpleForm>
      {/* ID отображается только для чтения */}
      <TextInput
        source="id"
        label="ID (Системный)"
        InputProps={{ readOnly: true }}
        fullWidth
      />

      <TextInput
        source="name"
        label="Название провинции"
        validate={[required(), minLength(3)]}
        fullWidth
      />

      <TextInput
        source="slug"
        label="Слаг (SEO)"
        validate={required()}
        fullWidth
        helperText="Внимание: изменение слага изменит URL-адрес страницы в каталоге"
      />
    </SimpleForm>
  </Edit>
);
