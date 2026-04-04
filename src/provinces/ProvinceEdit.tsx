import { Edit, SimpleForm, TextInput, required, minLength } from "react-admin";
import { useFormContext } from "react-hook-form";
import { slugify } from "../utils/slugify";
// Импортируем тип как type-only для соответствия verbatimModuleSyntax
import type { ProvinceUpsertDto } from "./types";

/**
 * Вспомогательный компонент для синхронизации имени и слага.
 * Использует useFormContext для доступа к методам управления формой.
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
        // shouldDirty: true активирует кнопку сохранения при автозаполнении
        setValue("slug", newSlug, { shouldValidate: true, shouldDirty: true });
      }}
    />
  );
};

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

      {/* Используем наш новый компонент вместо обычного TextInput */}
      <NameWithAutoSlug />

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
