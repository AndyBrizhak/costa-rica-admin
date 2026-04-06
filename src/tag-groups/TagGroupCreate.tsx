import { Create, SimpleForm, TextInput, required } from "react-admin";

/**
 * Компонент создания группы тегов.
 * Все поля обязательны для заполнения.
 */
export const TagGroupCreate = () => (
  <Create title="Добавить группу тегов">
    <SimpleForm>
      {/* Название на английском */}
      <TextInput
        source="nameEn"
        label="Название (EN)"
        validate={[required()]}
        fullWidth
      />

      {/* Название на испанском */}
      <TextInput
        source="nameEs"
        label="Название (ES)"
        validate={[required()]}
        fullWidth
      />

      {/* Уникальный слаг для URL */}
      <TextInput
        source="slug"
        label="Слаг (SEO)"
        validate={[required()]}
        fullWidth
        helperText="Используйте маленькие буквы и дефисы (например, basic-amenities)"
      />
    </SimpleForm>
  </Create>
);
