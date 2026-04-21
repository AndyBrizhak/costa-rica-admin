import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  required,
  Toolbar,
  SaveButton,
} from "react-admin";
import { Grid, Box, Typography, Divider } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { slugify } from "../utils/slugify";
import { isSlug } from "../utils/validators";

/**
 * Custom Form Toolbar positioned at the TOP.
 * Keeps the 'Save' action immediately accessible.
 */
const TopFormToolbar = () => (
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "transparent",
      minHeight: "auto",
      p: 0,
      mb: 2,
      "& .RaToolbar-defaultToolbar": { backgroundColor: "transparent" },
    }}
  >
    <SaveButton label="Upload & Save" variant="contained" />
  </Toolbar>
);

/**
 * Auto-fills the slug based on the selected filename if the slug field is empty.
 */
const SlugAutoFiller = () => {
  const { watch, setValue, getValues } = useFormContext();
  const file = watch("file");

  useEffect(() => {
    const currentSlug = getValues("slug");
    if (file?.rawFile?.name && !currentSlug) {
      const fileName = file.rawFile.name.split(".").slice(0, -1).join(".");
      setValue("slug", slugify(fileName));
    }
  }, [file, setValue, getValues]);

  return null;
};

/**
 * Media Create Component.
 * Optimized for speed: Slug auto-focus, SEO-first layout, and compact preview.
 */
export const MediaCreate = () => (
  <Create title="Upload New Media" resource="media">
    <SimpleForm toolbar={<TopFormToolbar />} reValidateMode="onChange">
      <SlugAutoFiller />

      <Grid container spacing={2} sx={{ width: "100%" }}>
        {/* Left Column: SEO & Metadata (8/12) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              1. SEO IDENTIFIER
            </Typography>
            <Divider />
          </Box>

          <TextInput
            source="slug"
            label="SEO Slug"
            validate={[required(), isSlug]}
            fullWidth
            autoFocus // Automatically sets cursor here on load
            size="small"
            helperText="REQUIRED: lowercase, numbers, and hyphens only. Example: 'villa-ocean-view-1'"
          />

          <Box sx={{ mt: 3, mb: 1 }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              2. ACCESSIBILITY (ALT TEXT)
            </Typography>
            <Divider />
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                source="altTextEn"
                label="Alt English"
                fullWidth
                multiline
                rows={2}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                source="altTextEs"
                label="Alt Spanish"
                fullWidth
                multiline
                rows={2}
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column: File Selection & Preview (4/12) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="grey.600" fontWeight="bold">
              3. MEDIA FILE
            </Typography>
            <Divider />
          </Box>

          <ImageInput
            source="file"
            label="Drop or Click"
            accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
            validate={[required()]}
            sx={{
              "& .RaImageInput-dropZone": {
                p: 1,
                minHeight: "100px",
                border: "2px dashed #e0e0e0",
                backgroundColor: "#fafafa",
              },
            }}
          >
            <ImageField
              source="src"
              title="title"
              sx={{
                "& img": {
                  maxWidth: "100%",
                  maxHeight: "180px",
                  borderRadius: 1,
                  objectFit: "contain",
                },
              }}
            />
          </ImageInput>
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
