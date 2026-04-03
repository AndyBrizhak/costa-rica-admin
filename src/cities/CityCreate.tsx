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
        setValue("slug", newSlug, { shouldValidate: true, shouldDirty: true });
      }}
    />
  );
};

export const CityCreate = () => (
  <Create title="Добавить новый город">
    <SimpleForm>
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
