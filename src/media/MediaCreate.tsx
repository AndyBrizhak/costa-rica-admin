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
 * Compact Top Toolbar.
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
 * Advanced Logic Automator:
 * 1. Derives Slug from Filename.
 * 2. Derives English Alt Text from Slug (Humanizing).
 */
const MediaFormAutomator = () => {
  const { watch, setValue, getValues } = useFormContext();
  const file = watch("file");
  const slug = watch("slug");

  // Step 1: Filename -> Slug
  useEffect(() => {
    const currentSlug = getValues("slug");
    if (file?.rawFile?.name && !currentSlug) {
      const fileName = file.rawFile.name.split(".").slice(0, -1).join(".");
      setValue("slug", slugify(fileName));
    }
  }, [file, setValue, getValues]);

  // Step 2: Slug -> Alt Text (English)
  useEffect(() => {
    const currentAltEn = getValues("altTextEn");
    if (slug && !currentAltEn) {
      // Transform slug "villa-ocean-view" to "Villa ocean view"
      const humanized = slug.replace(/-/g, " ");
      const capitalized =
        humanized.charAt(0).toUpperCase() + humanized.slice(1);
      setValue("altTextEn", capitalized);
    }
  }, [slug, setValue, getValues]);

  return null;
};

export const MediaCreate = () => (
  <Create title="Upload New Media" resource="media">
    <SimpleForm toolbar={<TopFormToolbar />} reValidateMode="onChange">
      <MediaFormAutomator />

      <Grid container spacing={2} sx={{ width: "100%" }}>
        {/* Left Column: Metadata (8/12) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              1. SEO & AUTOMATION
            </Typography>
            <Divider />
          </Box>

          <TextInput
            source="slug"
            label="SEO Slug"
            validate={[required(), isSlug]}
            fullWidth
            autoFocus
            size="small"
            helperText="REQUIRED: lowercase, numbers, and hyphens only. Auto-fills Alt Text below."
          />

          <Box sx={{ mt: 3, mb: 1 }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              2. ACCESSIBILITY (AUTO-GENERATED)
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
                helperText="Auto-generated from slug. Edit if necessary."
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

        {/* Right Column: File & Preview (4/12) - On the same level as Slug */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="grey.600" fontWeight="bold">
              3. ASSET SELECTION
            </Typography>
            <Divider />
          </Box>

          <ImageInput
            source="file"
            label="Drag & Drop"
            accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
            validate={[required()]}
            sx={{
              "& .RaImageInput-dropZone": {
                p: 1,
                minHeight: "120px",
                border: "2px dashed #e0e0e0",
                backgroundColor: "#fafafa",
              },
            }}
          >
            <ImageField
              source="src"
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
