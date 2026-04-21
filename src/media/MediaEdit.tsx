import {
  Edit,
  SimpleForm,
  TextInput,
  ImageField,
  DateField,
  required,
  Labeled,
  TopToolbar,
  DeleteButton,
  ListButton,
  Toolbar,
  SaveButton,
  useRecordContext,
} from "react-admin";
import { Grid, Box, Typography, Divider } from "@mui/material";
import { isSlug } from "../utils/validators";
import type { MediaRecord } from "./mediaTypes";

/**
 * Custom Actions for the header (Top Right).
 * We keep only navigation and dangerous actions here.
 */
const EditActions = () => {
  const record = useRecordContext<MediaRecord>();
  return (
    <TopToolbar>
      <ListButton />
      <DeleteButton
        mutationMode="pessimistic"
        confirmTitle={`Delete: ${record?.slug}`}
      />
    </TopToolbar>
  );
};

/**
 * Custom Form Toolbar positioned at the TOP of the form.
 * This keeps the SaveButton INSIDE the form context.
 */
const TopFormToolbar = () => (
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "transparent",
      minHeight: "auto",
      p: 0,
      mb: 2, // Margin bottom to separate from fields
      "& .RaToolbar-defaultToolbar": { backgroundColor: "transparent" },
    }}
  >
    <SaveButton label="Save Changes" variant="contained" />
  </Toolbar>
);

export const MediaEdit = () => (
  <Edit
    title="Edit Media"
    mutationMode="pessimistic"
    resource="media"
    actions={<EditActions />}
  >
    <SimpleForm toolbar={<TopFormToolbar />} reValidateMode="onChange">
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {/* Main Content Area (8/12) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              SEO & PATH
            </Typography>
            <Divider />
          </Box>

          <TextInput
            source="slug"
            label="SEO Slug"
            validate={[required(), isSlug]}
            fullWidth
            size="small"
            helperText="Lowercase, numbers, hyphens only."
          />

          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              LOCALIZATION (ALT TEXT)
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

        {/* Info & Preview Area (4/12) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="grey.600" fontWeight="bold">
              ASSET INFO
            </Typography>
            <Divider />
          </Box>

          <Labeled label="Preview">
            <ImageField
              source="url"
              sx={{
                "& img": {
                  maxWidth: "100%",
                  maxHeight: "150px", // Limited height for compactness
                  objectFit: "contain",
                  borderRadius: 1,
                  display: "block",
                  mt: 1,
                  border: "1px solid #eee",
                },
              }}
            />
          </Labeled>

          <Box
            mt={1}
            p={1.5}
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          >
            <TextInput
              source="fileName"
              label="File"
              disabled
              fullWidth
              variant="standard"
              size="small"
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="caption" color="textSecondary">
                Uploaded:
              </Typography>
              <DateField source="createdAt" showTime textAlign="right" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);
