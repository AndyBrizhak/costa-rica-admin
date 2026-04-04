import {
  Create,
  SimpleForm,
  TextInput,
  required,
  minLength,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { slugify } from "../utils/slugify";
// Исправленный импорт типа для соответствия verbatimModuleSyntax
import type { ProvinceUpsertDto } from "./types";

/**
 * Компонент для автоматической генерации слага при вводе имени.
 * shouldDirty: true критически важен для корректной работы кнопки Save.
 */
const NameWithAutoSlug = () => {
  const { setValue } = useFormContext<ProvinceUpsertDto>();

  return (
    <TextInput
      source="name"
      label="Название провинции"
      validate={[required(), minLength(3)]}
      fullWidth
      onChange={(e) => {
        const newSlug = slugify(e.target.value);
        // shouldDirty: true помечает форму как измененную
        setValue("slug", newSlug, { shouldValidate: true, shouldDirty: true });
      }}
    />
  );
};

/**
 * Форма создания провинции.
 */
export const ProvinceCreate = () => (
  <Create title="Добавить новую провинцию">
    <SimpleForm>
      <NameWithAutoSlug />
      <TextInput
        source="slug"
        label="Слаг (SEO)"
        validate={required()}
        fullWidth
        helperText="Генерируется автоматически, можно править вручную"
      />
    </SimpleForm>
  </Create>
);
