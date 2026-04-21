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
import { isSlug } from "../utils/validators"; // Импорт нашего чистого валидатора
import type { MediaRecord } from "./mediaTypes";

/**
 * Custom Top Actions.
 */
const EditActions = () => {
  const record = useRecordContext<MediaRecord>();
  return (
    <TopToolbar sx={{ justifyContent: "flex-end", width: "100%", gap: 1 }}>
      <ListButton />
      <DeleteButton
        mutationMode="pessimistic"
        confirmTitle={`Delete Media: ${record?.slug}`}
        confirmContent="Are you sure you want to permanently delete this media asset?"
      />
    </TopToolbar>
  );
};

const EditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

/**
 * Media Edit Component with strict SEO validation.
 */
export const MediaEdit = () => (
  <Edit
    title="Edit Media Metadata"
    mutationMode="pessimistic"
    resource="media"
    actions={<EditActions />}
  >
    <SimpleForm toolbar={<EditToolbar />} reValidateMode="onChange">
      <Grid container spacing={4} sx={{ width: "100%" }}>
        {/* SEO Section */}
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
            // Используем композицию валидаторов: обязательность + формат
            validate={[required(), isSlug]}
            fullWidth
            helperText="Lowercase letters, numbers, and hyphens only."
          />

          <Box mt={4}>
            <Typography variant="subtitle1" gutterBottom>
              Localization
            </Typography>
            <TextInput
              source="altTextEn"
              label="Alt Text (English)"
              fullWidth
              multiline
              rows={2}
            />
            <TextInput
              source="altTextEs"
              label="Alt Text (Spanish)"
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </Grid>

        {/* Technical Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Box>

          <Labeled label="Current Image">
            <ImageField
              source="url"
              sx={{
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 2,
                  display: "block",
                },
              }}
            />
          </Labeled>

          <Box
            mt={3}
            p={2}
            sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}
          >
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
