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
 * Ensures the 'Upload' action is always visible without scrolling.
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
 * Component that watches the file input and auto-generates a slug.
 */
const SlugAutoFiller = () => {
  const { watch, setValue, getValues } = useFormContext();
  const file = watch("file");

  useEffect(() => {
    const currentSlug = getValues("slug");
    // If a file is selected and the slug is still empty, auto-generate it
    if (file?.rawFile?.name && !currentSlug) {
      const fileNameWithoutExtension = file.rawFile.name
        .split(".")
        .slice(0, -1)
        .join(".");
      setValue("slug", slugify(fileNameWithoutExtension));
    }
  }, [file, setValue, getValues]);

  return null;
};

export const MediaCreate = () => (
  <Create title="Upload New Media" resource="media">
    <SimpleForm toolbar={<TopFormToolbar />} reValidateMode="onChange">
      <SlugAutoFiller />

      <Grid container spacing={2} sx={{ width: "100%" }}>
        {/* Left Column: SEO & Metadata (8/12) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              1. SEO & SLUG CONFIGURATION
            </Typography>
            <Divider />
          </Box>

          <TextInput
            source="slug"
            label="SEO Slug"
            // Combined validation: required + Google SEO format
            validate={[required(), isSlug]}
            fullWidth
            autoFocus
            size="small"
            helperText="REQUIRED: Only lowercase, numbers, and hyphens allowed. Auto-filled from filename."
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

        {/* Right Column: Dropzone & Preview (4/12) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="grey.600" fontWeight="bold">
              3. SELECT IMAGE
            </Typography>
            <Divider />
          </Box>

          <ImageInput
            source="file"
            label="Drop file or click"
            accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
            validate={[required()]}
            sx={{
              "& .RaImageInput-dropZone": {
                p: 1,
                minHeight: "120px",
                border: "2px dashed #e0e0e0",
                backgroundColor: "#fafafa",
                transition: "border .3s ease-in-out",
                "&:hover": { borderColor: "primary.main" },
              },
            }}
          >
            <ImageField
              source="src"
              title="title"
              sx={{
                "& img": {
                  maxWidth: "100%",
                  maxHeight: "160px",
                  borderRadius: 1,
                  objectFit: "contain",
                  mt: 1,
                },
              }}
            />
          </ImageInput>
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
