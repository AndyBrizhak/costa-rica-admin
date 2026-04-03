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

// Создаем такой же помощник, как в Create
const NameWithAutoSlug = () => {
  const { setValue } = useFormContext();

  return (
    <TextInput
      source="name"
      label="Название города"
      validate={[required(), minLength(2)]}
      fullWidth
      onChange={(e) => {
        const newSlug = slugify(e.target.value);
        // shouldDirty: true заставит форму понять, что данные изменились
        setValue("slug", newSlug, { shouldValidate: true, shouldDirty: true });
      }}
    />
  );
};

export const CityEdit = () => (
  <Edit title="Редактировать город" mutationMode="pessimistic">
    <SimpleForm>
      <TextInput source="id" label="ID" disabled fullWidth />

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
