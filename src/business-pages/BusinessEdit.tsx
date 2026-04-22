import {
  Edit,
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
  DateField,
  TextField,
  Labeled,
} from "react-admin";
import { Grid, Typography, Divider, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SlugAutoFiller } from "./SlugAutoFiller";
import { isSlug } from "../utils/validators";

/**
 * Helper component to extract coordinates from Google Maps URL.
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

export const BusinessEdit = () => (
  <Edit title="Edit Business" mutationMode="pessimistic" redirect="show">
    <TabbedForm>
      {/* Tab 1: General Info & Metadata */}
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
            <BooleanInput source="isPublished" label="Is Live / Published" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              source="languageCode"
              label="Language Code"
              validate={[required()]}
              fullWidth
            />
          </Grid>

          <Grid size={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="textSecondary">
              System Metadata
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Labeled label="Created At">
              <DateField source="createdAt" showTime />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Labeled label="Last Updated">
              <DateField source="updatedAt" showTime />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Labeled label="Previous Slugs">
              <TextField source="oldSlugs" emptyText="No history" />
            </Labeled>
          </Grid>
        </Grid>
      </FormTab>

      {/* Tab 2: Geography */}
      <FormTab label="Geography">
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
            <ReferenceInput source="cityId" reference="cities">
              <AutocompleteInput optionText="name" label="City" fullWidth />
            </ReferenceInput>
          </Grid>

          <Grid size={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              GPS & Maps
            </Typography>
            <TextInput
              source="googleMapsUrl"
              label="Google Maps Link"
              fullWidth
            />
            <GoogleMapsParser />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <TextInput source="location.latitude" label="Latitude" fullWidth />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <TextInput
              source="location.longitude"
              label="Longitude"
              fullWidth
            />
          </Grid>
        </Grid>
      </FormTab>

      {/* Tab 3: Taxonomy */}
      <FormTab label="Taxonomy">
        <Grid container spacing={2}>
          <Grid size={12}>
            <ReferenceInput
              source="primaryCategoryId"
              reference="google-categories"
            >
              <AutocompleteInput
                optionText="nameEn"
                label="Primary Category"
                fullWidth
              />
            </ReferenceInput>
          </Grid>
          <Grid size={12}>
            <ReferenceArrayInput source="tagIds" reference="tags">
              <AutocompleteArrayInput
                optionText="nameEn"
                label="Tags"
                fullWidth
              />
            </ReferenceArrayInput>
          </Grid>
        </Grid>
      </FormTab>

      {/* Tab 4: Schedule */}
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

      {/* Tab 5: SEO & Contacts */}
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
          SEO Settings
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
  </Edit>
);
