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
  required,
} from "react-admin";
import { Grid, Typography, Divider, Button, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SlugAutoFiller } from "./SlugAutoFiller";
import { isSlug } from "../utils/validators";
import { BusinessMediaFields } from "./BusinessMediaFields";

/**
 * Вспомогательный компонент для извлечения координат из ссылок Google Maps.
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
      disabled={!mapsUrl}
      sx={{ mt: 1 }}
    >
      Parse Coordinates
    </Button>
  );
};

/**
 * Страница редактирования бизнеса.
 * Изменено: добавлен redirect="show" для перехода к просмотру после сохранения.
 */
export const BusinessEdit = () => (
  <Edit title="Edit Business" mutationMode="pessimistic" redirect="show">
    <TabbedForm
      sx={{
        "& .MuiGrid-container": {
          justifyContent: "flex-start",
          textAlign: "left",
        },
        "& .RaTabbedForm-content": { p: 2 },
      }}
    >
      {/* --- Вкладка 1: General --- */}
      <FormTab label="General">
        <SlugAutoFiller />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextInput source="name" validate={required()} fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <BooleanInput source="isPublished" label="Published" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextInput
              source="slug"
              validate={[required(), isSlug]}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextInput source="languageCode" validate={required()} fullWidth />
          </Grid>
          <Grid size={12}>
            <TextInput
              source="description"
              multiline
              rows={4}
              fullWidth
              helperText="HTML description"
            />
          </Grid>
        </Grid>
      </FormTab>

      {/* --- Вкладка 2: Location & Categories --- */}
      <FormTab label="Location & Categories">
        <Typography variant="h6" gutterBottom color="primary">
          Geography
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextInput
              source="googleMapsUrl"
              label="Google Maps URL"
              fullWidth
            />
            <GoogleMapsParser />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReferenceInput source="provinceId" reference="provinces">
              <AutocompleteInput optionText="name" label="Province" fullWidth />
            </ReferenceInput>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReferenceInput source="cityId" reference="cities">
              <AutocompleteInput optionText="name" label="City" fullWidth />
            </ReferenceInput>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="location.latitude" label="Latitude" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput
              source="location.longitude"
              label="Longitude"
              fullWidth
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom color="primary">
          Categories
        </Typography>
        <Grid container spacing={2}>
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
        </Grid>
      </FormTab>

      {/* --- Вкладка 3: Contacts & SEO --- */}
      <FormTab label="Contacts & SEO">
        <Typography variant="h6" gutterBottom color="primary">
          Contacts
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

        <Typography variant="h6" gutterBottom color="primary">
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

      {/* --- Вкладка 4: Tags --- */}
      <FormTab label="Tags">
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Attached Tags
          </Typography>
          <ReferenceArrayInput source="tagIds" reference="tags">
            <AutocompleteArrayInput
              optionText="nameEn"
              label="Search and Add Tags"
              fullWidth
            />
          </ReferenceArrayInput>
        </Box>
      </FormTab>

      {/* --- Вкладка 5: Media Gallery --- */}
      <FormTab label="Media Gallery">
        <BusinessMediaFields />
      </FormTab>
    </TabbedForm>
  </Edit>
);
