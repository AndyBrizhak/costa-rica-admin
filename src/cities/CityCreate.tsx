import type { FC } from "react";
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
 * Вспомогательный компонент для автоматической генерации слага.
 * Синхронизирует поле 'name' с полем 'slug' в реальном времени.
 */
const NameWithAutoSlug: FC = () => {
  const { setValue } = useFormContext();

  return (
    <TextInput
      source="name"
      label="Название города"
      validate={[required(), minLength(2)]}
      fullWidth
      onChange={(e) => {
        const newSlug = slugify(e.target.value);
        // Устанавливаем значение, помечаем поле как "грязное" и запускаем валидацию
        setValue("slug", newSlug, { shouldValidate: true, shouldDirty: true });
      }}
    />
  );
};

export const CityCreate: FC = () => (
  <Create title="Добавить новый город">
    <SimpleForm>
      <NameWithAutoSlug />

      <TextInput
        source="slug"
        label="Слаг (SEO)"
        validate={required()}
        fullWidth
        helperText="Генерируется автоматически из названия, доступен для правки"
      />

      {/* Выбор провинции из существующего справочника provinces */}
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
