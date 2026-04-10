import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  minLength,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { slugify } from "../utils/slugify";

/**
 * Component for automatic slug generation when editing the English name.
 */
const NameEnWithAutoSlug = () => {
  const { setValue } = useFormContext();

  return (
    <TextInput
      source="nameEn"
      label="Name (EN)"
      validate={[required(), minLength(2)]}
      fullWidth
      onChange={(e) => {
        const newName = e.target.value;
        const newSlug = slugify(newName);

        // Update slug and mark it as dirty to enable the Save button
        setValue("slug", newSlug, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    />
  );
};

export const TagEdit = () => (
  <Edit title="Edit Tag" mutationMode="pessimistic">
    <SimpleForm>
      {/* System ID - read only */}
      <TextInput source="id" label="System ID" disabled fullWidth />

      {/* Field with auto-slug generation */}
      <NameEnWithAutoSlug />

      <TextInput
        source="nameEs"
        label="Name (ES)"
        validate={[required()]}
        fullWidth
      />

      <TextInput
        source="slug"
        label="Slug (SEO)"
        validate={[required()]}
        fullWidth
      />

      {/* Select Tag Group with autocomplete search */}
      <ReferenceInput source="tagGroupId" reference="tag-groups">
        <AutocompleteInput
          label="Tag Group"
          optionText="nameEn"
          validate={[required()]}
          fullWidth
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
