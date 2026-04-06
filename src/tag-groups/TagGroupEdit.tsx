import { Edit, SimpleForm, TextInput, required, minLength } from "react-admin";
import { useFormContext } from "react-hook-form";
import { slugify } from "../utils/slugify";

/**
 * Компонент для автоматической генерации слага при редактировании английского названия.
 * Реализован по аналогии с CityEdit.tsx.
 */
const NameEnWithAutoSlug = () => {
  const { setValue } = useFormContext();

  return (
    <TextInput
      source="nameEn"
      label="Название (EN)"
      validate={[required(), minLength(2)]}
      fullWidth
      onChange={(e) => {
        const newName = e.target.value;
        const newSlug = slugify(newName);

        // Установка значения слага с флагами для активации кнопки Save
        setValue("slug", newSlug, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    />
  );
};

export const TagGroupEdit = () => (
  /* mutationMode="pessimistic" гарантирует ожидание ответа от API */
  <Edit title="Редактировать группу тегов" mutationMode="pessimistic">
    <SimpleForm>
      {/* Системный ID — только для чтения */}
      <TextInput source="id" label="ID (Системный)" disabled fullWidth />

      {/* Умное поле названия с авто-слагом */}
      <NameEnWithAutoSlug />

      <TextInput
        source="nameEs"
        label="Название (ES)"
        validate={[required(), minLength(2)]}
        fullWidth
      />

      <TextInput
        source="slug"
        label="Слаг (SEO)"
        validate={required()}
        fullWidth
        helperText="Генерируется автоматически из названия (EN)"
      />
    </SimpleForm>
  </Edit>
);
