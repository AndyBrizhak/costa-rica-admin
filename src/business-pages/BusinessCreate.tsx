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
import { Grid, Typography, Divider, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SlugAutoFiller } from "./SlugAutoFiller";
import { isSlug } from "../utils/validators";

/**
 * Вспомогательный компонент для извлечения координат из URL Google Maps.
 */
const GoogleMapsParser = () => {
  const { setValue, watch } = useFormContext();
  const mapsUrl = watch("googleMapsUrl");

  const handleParse = () => {
    if (!mapsUrl) return;
    // Регулярное выражение для поиска координат в URL
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

export const BusinessCreate = () => (
  <Create title="Add New Business" redirect="show">
    <TabbedForm defaultValues={{ isPublished: true, languageCode: "es" }}>
      {/* Вкладка 1: Основное */}
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
              label="Language (e.g. es)"
              validate={[required()]}
              fullWidth
            />
          </Grid>
        </Grid>
      </FormTab>

      {/* Вкладка 2: Локация */}
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
              Google Maps Integration
            </Typography>
            <TextInput
              source="googleMapsUrl"
              label="Paste Google Maps Link here"
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

      {/* Вкладка 3: Категории */}
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

      {/* Вкладка 4: Расписание */}
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

      {/* Вкладка 5: SEO и Контакты */}
      <FormTab label="SEO & Contacts">
        <Typography variant="h6" gutterBottom>
          Contact Info
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
  </Create>
);
