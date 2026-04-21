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
import type { MediaRecord } from "./mediaTypes";

/**
 * Custom Top Actions for the Edit View.
 */
const EditActions = () => {
  const record = useRecordContext<MediaRecord>();

  return (
    <TopToolbar sx={{ justifyContent: "flex-end", width: "100%", gap: 1 }}>
      <ListButton />
      <DeleteButton
        mutationMode="pessimistic"
        confirmTitle={`Delete Media: ${record?.slug}`}
        confirmContent="Are you sure you want to permanently delete this media asset? This will break any existing public links."
      />
    </TopToolbar>
  );
};

/**
 * Custom Bottom Toolbar.
 */
const EditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

/**
 * Media Edit Component.
 * * REFACTORING LOG:
 * 1. Placed SEO Slug as the primary editable field.
 * 2. Standardized layout using MUI v6 Grid 'size' prop.
 * 3. All UI labels and helper texts are in English.
 */
export const MediaEdit = () => (
  <Edit
    title="Edit Media Metadata"
    mutationMode="pessimistic"
    resource="media"
    actions={<EditActions />}
  >
    <SimpleForm toolbar={<EditToolbar />}>
      <Grid container spacing={4} sx={{ width: "100%" }}>
        {/* Left Column: SEO & Metadata Management */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              SEO Management
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Box>

          <TextInput
            source="slug"
            label="SEO Slug"
            validate={[required()]}
            fullWidth
            helperText="The unique URL identifier for this media. Changes will affect the image path."
          />

          <Box mt={4}>
            <Typography variant="subtitle1" gutterBottom>
              Accessibility & Localization
            </Typography>
            <TextInput
              source="altTextEn"
              label="Alt Text (English)"
              fullWidth
              multiline
              rows={2}
              helperText="Describe the image content for screen readers (English)."
            />

            <TextInput
              source="altTextEs"
              label="Alt Text (Spanish)"
              fullWidth
              multiline
              rows={2}
              helperText="Describe the image content for screen readers (Spanish)."
            />
          </Box>
        </Grid>

        {/* Right Column: Preview & Storage Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              Asset Preview
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Box>

          <Labeled label="Current Image Preview">
            <ImageField
              source="url"
              sx={{
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 2,
                  mt: 1,
                  border: "1px solid #e0e0e0",
                  display: "block",
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
          </Labeled>

          <Box
            mt={3}
            p={2}
            sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}
          >
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Storage Details
            </Typography>
            <TextInput
              source="fileName"
              label="Storage Filename"
              disabled
              fullWidth
              variant="standard"
            />
            <TextInput
              source="contentType"
              label="MIME Type"
              disabled
              fullWidth
              variant="standard"
            />
            <Labeled label="Uploaded On" sx={{ display: "block", mt: 2 }}>
              <DateField source="createdAt" showTime />
            </Labeled>
          </Box>
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);
