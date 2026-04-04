import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  minLength,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { slugify } from "../utils/slugify";

/**
 * Умный компонент для поля 'name'.
 * Автоматически генерирует и устанавливает 'slug'.
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

        // Установка значения слага с флагами для корректной работы кнопки Save
        setValue("slug", newSlug, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    />
  );
};

export const CityCreate = () => (
  <Create title="Добавить новый город" mutationMode="pessimistic">
    <SimpleForm>
      {/* Авто-генерация слага при вводе имени */}
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
  </Create>
);
