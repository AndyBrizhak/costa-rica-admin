import {
  Create,
  SimpleForm,
  TextInput,
  required,
  minLength,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { slugify } from "../utils/slugify";

/**
 * Вспомогательный компонент для синхронизации имени и слага.
 * Использует useFormContext из react-hook-form, который доступен внутри SimpleForm.
 */
const NameWithAutoSlug = () => {
  const { setValue } = useFormContext();

  return (
    <TextInput
      source="name"
      label="Название провинции"
      validate={[required(), minLength(3)]}
      fullWidth
      onChange={(e) => {
        // Автоматически генерируем и подставляем слаг при изменении имени
        const newSlug = slugify(e.target.value);
        setValue("slug", newSlug, { shouldValidate: true });
      }}
    />
  );
};

/**
 * Компонент создания новой провинции.
 */
export const ProvinceCreate = () => (
  <Create>
    <SimpleForm>
      <NameWithAutoSlug />
      <TextInput
        source="slug"
        label="Слаг (SEO)"
        validate={required()}
        fullWidth
        helperText="Генерируется автоматически из названия, можно поправить вручную"
      />
    </SimpleForm>
  </Create>
);
