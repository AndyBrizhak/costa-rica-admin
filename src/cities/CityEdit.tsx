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
import { slugify } from "../utils/slugify";

/**
 * Компонент для автоматической генерации слага при редактировании названия.
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

        // Как и в форме создания, важно пометить поле как "грязное" (shouldDirty),
        // чтобы React Admin понял, что данные изменились и нужно активировать кнопку Save.
        setValue("slug", newSlug, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    />
  );
};

export const CityEdit = () => (
  /* mutationMode="pessimistic" гарантирует, что мы дождемся ответа от API 
     перед тем как считать операцию успешной и закрыть форму. */
  <Edit title="Редактировать город" mutationMode="pessimistic">
    <SimpleForm>
      {/* Системный ID — только для чтения */}
      <TextInput source="id" label="ID (Системный)" disabled fullWidth />

      {/* Умное поле названия с авто-слагом */}
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
