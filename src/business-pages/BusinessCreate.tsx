import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  SelectInput,
  ReferenceInput,
  AutocompleteInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  required,
} from "react-admin";
import { Grid, Typography, Divider, Box, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { slugify } from "../utils/slugify";
import type { BusinessUpsert } from "./businessTypes";

/**
 * Автоматическое заполнение слага на основе имени при создании.
 */
const SlugAutoFiller = () => {
  const { watch, setValue, getValues } = useFormContext();
  const name = watch("name");

  useEffect(() => {
    const currentSlug = getValues("slug");
    if (name && !currentSlug) {
      setValue("slug", slugify(name));
    }
  }, [name, setValue, getValues]);

  return null;
};

/**
 * Парсинг координат из ссылки Google Maps.
 */
const GoogleMapsParser = () => {
  const { setValue, watch } = useFormContext();
  const mapsUrl = watch("googleMapsUrl");

  const handleParse = () => {
    if (!mapsUrl) return;
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)|query=(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = (mapsUrl as string).match(regex);
    if (match) {
      const lat = match[1] || match[3];
      const lng = match[2] || match[4];
      setValue("location.latitude", parseFloat(lat));
      setValue("location.longitude", parseFloat(lng));
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
      <TextInput
        source="googleMapsUrl"
        label="Google Maps Link"
        fullWidth
        helperText="Auto-fill coordinates"
      />
      <Button variant="outlined" onClick={handleParse} sx={{ height: 56 }}>
        Parse
      </Button>
    </Box>
  );
};

export const BusinessCreate = () => {
  return (
    <Create<BusinessUpsert> title="Add New Business" redirect="edit">
      <SimpleForm
        defaultValues={{
          isPublished: false,
          languageCode: "en",
          location: { latitude: 9.9281, longitude: -84.0907 },
          contacts: {},
          schedule: [],
          seo: {
            noIndex: false,
            noFollow: false,
            ogType: "business.business",
            hreflangs: [],
          },
        }}
      >
        <SlugAutoFiller />
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">General Information</Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="name" validate={[required()]} fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextInput source="slug" validate={[required()]} fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <BooleanInput source="isPublished" label="Published" />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <SelectInput
              source="languageCode"
              choices={[
                { id: "en", name: "English" },
                { id: "es", name: "Spanish" },
              ]}
              fullWidth
              validate={[required()]}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextInput source="description" multiline rows={4} fullWidth />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
            <Typography variant="h6">Location & Geography</Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ReferenceInput source="provinceId" reference="provinces">
              <AutocompleteInput
                optionText="name"
                fullWidth
                validate={[required()]}
              />
            </ReferenceInput>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReferenceInput source="cityId" reference="cities">
              <AutocompleteInput optionText="name" fullWidth />
            </ReferenceInput>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <NumberInput
              source="location.latitude"
              label="Latitude"
              fullWidth
              validate={[required()]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <NumberInput
              source="location.longitude"
              label="Longitude"
              fullWidth
              validate={[required()]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <GoogleMapsParser />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
            <Typography variant="h6">Categorization</Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
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
          <Grid size={{ xs: 12, md: 6 }}>
            <ReferenceArrayInput
              source="secondaryCategoryIds"
              reference="google-categories"
            >
              <AutocompleteArrayInput
                optionText="nameEn"
                label="Secondary Categories"
                fullWidth
              />
            </ReferenceArrayInput>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ReferenceArrayInput source="tagIds" reference="tags">
              <AutocompleteArrayInput
                optionText="nameEn"
                label="Tags"
                fullWidth
              />
            </ReferenceArrayInput>
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
            <Typography variant="h6">Media Assets</Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ReferenceArrayInput source="mediaIds" reference="media">
              <AutocompleteArrayInput
                fullWidth
                label="Select Images"
                optionText={(record: { slug: string; altTextEn?: string }) =>
                  record
                    ? `${record.slug} (${record.altTextEn || "no alt"})`
                    : ""
                }
              />
            </ReferenceArrayInput>
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
            <Typography variant="h6">Schedule</Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ArrayInput source="schedule">
              <SimpleFormIterator inline fullWidth>
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
                />
                <ArrayInput source="intervals" label="Intervals">
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
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
            <Typography variant="h6">Contacts</Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              source="contacts.phoneCallable"
              label="Phone"
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
        </Grid>
      </SimpleForm>
    </Create>
  );
};
