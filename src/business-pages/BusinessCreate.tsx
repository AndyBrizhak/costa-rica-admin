import {
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ArrayInput,
  SimpleFormIterator,
  required,
} from "react-admin";
import { Grid, Typography, Divider, Button, Box } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { SlugAutoFiller } from "./SlugAutoFiller";
import { isSlug } from "../utils/validators";
import { BusinessMediaFields } from "./BusinessMediaFields";

/**
 * Component to parse GPS coordinates from Google Maps URL.
 */
const GoogleMapsParser = () => {
  const { setValue, watch } = useFormContext();
  const mapsUrl = watch("googleMapsUrl");

  const handleParse = () => {
    if (!mapsUrl) return;
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = mapsUrl.match(regex);
    if (match) {
      setValue("location.latitude", parseFloat(match[1]), {
        shouldDirty: true,
      });
      setValue("location.longitude", parseFloat(match[2]), {
        shouldDirty: true,
      });
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={handleParse}
      size="small"
      sx={{ mt: 1 }}
      disabled={!mapsUrl}
    >
      Parse GPS from URL
    </Button>
  );
};

/**
 * Geography Tab: Smart city filtering based on selected province.
 */
const GeographyTabFields = () => {
  const provinceId = useWatch({ name: "provinceId" });

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <ReferenceInput source="provinceId" reference="provinces">
          <AutocompleteInput
            optionText="name"
            label="Province"
            validate={[required()]}
            fullWidth
          />
        </ReferenceInput>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ReferenceInput
          source="cityId"
          reference="cities"
          sort={{ field: "name", order: "ASC" }}
          filter={provinceId ? { provinceId } : {}}
          perPage={100}
        >
          <AutocompleteInput
            optionText="name"
            label={
              provinceId
                ? "City (Full list for province)"
                : "City (Type to search)"
            }
            fullWidth
            shouldRenderSuggestions={(val: string) =>
              provinceId ? true : val.length > 0
            }
            noOptionsText={
              provinceId
                ? "No cities found for this province"
                : "Type to search..."
            }
          />
        </ReferenceInput>
      </Grid>

      <Grid size={12} sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Maps Integration
        </Typography>
        <TextInput source="googleMapsUrl" label="Google Maps Link" fullWidth />
        <GoogleMapsParser />
      </Grid>

      <Grid size={{ xs: 6, md: 3 }}>
        <TextInput source="location.latitude" label="Latitude" fullWidth />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <TextInput source="location.longitude" label="Longitude" fullWidth />
      </Grid>
    </Grid>
  );
};

/**
 * Taxonomy Tab: Google categories and dependent tags.
 */
const TaxonomyTabFields = () => {
  const selectedTagGroupId = useWatch({ name: "ui_tag_group_id" });

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <ReferenceInput
          source="primaryCategoryId"
          reference="google-categories"
        >
          <AutocompleteInput
            optionText="nameEn"
            label="Primary Google Category"
            fullWidth
            shouldRenderSuggestions={(val: string) => val.length > 0}
          />
        </ReferenceInput>
      </Grid>

      <Grid size={12}>
        <ReferenceArrayInput
          source="additionalCategoryIds"
          reference="google-categories"
        >
          <AutocompleteArrayInput
            optionText="nameEn"
            label="Additional Google Categories"
            fullWidth
            shouldRenderSuggestions={(val: string) => val.length > 0}
          />
        </ReferenceArrayInput>
      </Grid>

      <Grid size={12}>
        <Box sx={{ mt: 2, p: 2, border: "1px dashed #ccc", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom color="primary">
            Tag Management Tool
          </Typography>

          <ReferenceInput source="ui_tag_group_id" reference="tag-groups">
            <AutocompleteInput
              label="1. Filter by Tag Group"
              optionText="nameEn"
              fullWidth
            />
          </ReferenceInput>

          <ReferenceArrayInput
            source="tagIds"
            reference="tags"
            filter={
              selectedTagGroupId
                ? { tagGroupId: selectedTagGroupId }
                : { id: "00000000-0000-0000-0000-000000000000" }
            }
          >
            <AutocompleteArrayInput
              optionText="nameEn"
              label="2. Select Tags from Group"
              fullWidth
              disabled={!selectedTagGroupId}
            />
          </ReferenceArrayInput>
        </Box>
      </Grid>
    </Grid>
  );
};

export const BusinessCreate = () => (
  <Create title="Add New Business" redirect="show">
    <TabbedForm defaultValues={{ isPublished: true, languageCode: "en" }}>
      <FormTab label="General">
        <SlugAutoFiller />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextInput
              source="name"
              label="Business Name"
              validate={[required()]}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextInput
              source="slug"
              label="URL Slug"
              validate={[required(), isSlug]}
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextInput
              source="description"
              label="Description"
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <BooleanInput source="isPublished" label="Publish immediately" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              source="languageCode"
              label="Language Code"
              validate={[required()]}
              fullWidth
            />
          </Grid>
        </Grid>
      </FormTab>

      <FormTab label="Geography">
        <GeographyTabFields />
      </FormTab>

      <FormTab label="Taxonomy">
        <TaxonomyTabFields />
      </FormTab>

      <FormTab label="Media">
        <BusinessMediaFields />
      </FormTab>

      <FormTab label="Schedule">
        <ArrayInput source="schedule" label={false}>
          <SimpleFormIterator inline>
            <AutocompleteArrayInput
              source="days"
              label="Days"
              choices={[
                { id: 1, name: "Monday" },
                { id: 2, name: "Tuesday" },
                { id: 3, name: "Wednesday" },
                { id: 4, name: "Thursday" },
                { id: 5, name: "Friday" },
                { id: 6, name: "Saturday" },
                { id: 0, name: "Sunday" },
              ]}
              sx={{ minWidth: 200 }}
            />
            <ArrayInput source="intervals" label="Time Slots">
              <SimpleFormIterator inline>
                <TextInput
                  source="start"
                  label="Open"
                  type="time"
                  sx={{ width: 120 }}
                />
                <TextInput
                  source="end"
                  label="Close"
                  type="time"
                  sx={{ width: 120 }}
                />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>

      <FormTab label="SEO & Contacts">
        <Typography variant="h6" gutterBottom>
          Communication
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              source="contacts.phoneCallable"
              label="Call Phone"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              source="contacts.phoneWhatsapp"
              label="WhatsApp"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              source="contacts.facebook"
              label="Facebook URL"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              source="contacts.instagram"
              label="Instagram URL"
              fullWidth
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>
          SEO Metadata
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextInput source="seo.title" label="SEO Title" fullWidth />
          </Grid>
          <Grid size={12}>
            <TextInput
              source="seo.description"
              label="SEO Description"
              multiline
              rows={2}
              fullWidth
            />
          </Grid>
        </Grid>
      </FormTab>
    </TabbedForm>
  </Create>
);
