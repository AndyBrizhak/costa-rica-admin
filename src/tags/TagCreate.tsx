import {
  Create,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { slugify } from "../utils/slugify";

/**
 * Smart component for the 'nameEn' field.
 * Automatically generates and sets the 'slug' value during input.
 */
const NameEnWithAutoSlug = () => {
  const { setValue } = useFormContext();

  return (
    <TextInput
      source="nameEn"
      label="Name (EN)"
      validate={[required()]}
      fullWidth
      onChange={(e) => {
        const newName = e.target.value;
        const newSlug = slugify(newName);

        // Update slug field with validation and dirty state flags
        setValue("slug", newSlug, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    />
  );
};

export const TagCreate = () => (
  <Create title="Create Tag" mutationMode="pessimistic">
    <SimpleForm>
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
  </Create>
);
