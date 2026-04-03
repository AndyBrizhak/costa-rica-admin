import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  minLength,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { slugify } from "../utils/slugify"; // Тот самый путь к утилите

/**
 * Компонент для автоматической генерации слага при вводе имени.
 */
const NameWithAutoSlug = () => {
  const { setValue } = useFormContext();

  return (
    <TextInput
      source="name"
      label="Название города"
      validate={[required(), minLength(2)]}
      fullWidth
      onChange={(e) => {
        const newName = e.target.value;
        const newSlug = slugify(newName);
        // shouldDirty: true помечает форму как измененную (кнопка Save станет активной)
        setValue("slug", newSlug, { shouldValidate: true, shouldDirty: true });
      }}
    />
  );
};

export const CityEdit = () => (
  <Edit title="Редактировать город" mutationMode="pessimistic">
    <SimpleForm>
      {/* Оставляем ID только для чтения */}
      <TextInput
        source="id"
        label="ID (Системный)"
        InputProps={{ readOnly: true }}
        fullWidth
      />

      {/* Используем наш умный компонент вместо обычного TextInput */}
      <NameWithAutoSlug />

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
