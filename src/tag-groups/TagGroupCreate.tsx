import { Create, SimpleForm, TextInput, required } from "react-admin";
import { useFormContext } from "react-hook-form";
import { slugify } from "../utils/slugify";

/**
 * Умный компонент для поля 'nameEn'.
 * Автоматически генерирует и устанавливает 'slug' при вводе.
 */
const NameEnWithAutoSlug = () => {
  const { setValue } = useFormContext();

  return (
    <TextInput
      source="nameEn"
      label="Название (EN)"
      validate={[required()]}
      fullWidth
      onChange={(e) => {
        const newName = e.target.value;
        const newSlug = slugify(newName);

        // Установка значения слага с флагами для корректной работы валидации и кнопки Save
        setValue("slug", newSlug, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    />
  );
};

export const TagGroupCreate = () => (
  <Create title="Добавить группу тегов" mutationMode="pessimistic">
    <SimpleForm>
      {/* Поле с авто-генерацией слага */}
      <NameEnWithAutoSlug />

      <TextInput
        source="nameEs"
        label="Название (ES)"
        validate={[required()]}
        fullWidth
      />

      <TextInput
        source="slug"
        label="Слаг (SEO)"
        validate={[required()]}
        fullWidth
        helperText="Генерируется автоматически из названия (EN)"
      />
    </SimpleForm>
  </Create>
);
