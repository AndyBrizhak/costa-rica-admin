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
import { Grid, Box } from "@mui/material";
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
        confirmContent="Are you sure you want to permanently delete this media asset from storage?"
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
 * * FIX LOG:
 * 1. Replaced legacy 'item' and 'xs/md' props with the MUI v6 'size' prop.
 * 2. Maintained clean architecture by separating Actions and Toolbar.
 */
export const MediaEdit = () => (
  <Edit
    title="Edit Media Metadata"
    mutationMode="pessimistic"
    resource="media"
    actions={<EditActions />}
  >
    <SimpleForm toolbar={<EditToolbar />}>
      <Grid container spacing={3} sx={{ width: "100%" }}>
        {/* Left Column: Metadata - Using the correct 'size' prop */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TextInput
            source="slug"
            label="SEO Slug"
            validate={[required()]}
            fullWidth
            helperText="The unique URL-friendly identifier for this image."
          />

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
        </Grid>

        {/* Right Column: Preview & Tech Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Labeled label="Current Preview">
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
                },
              }}
            />
          </Labeled>

          <Box mt={3}>
            <TextInput
              source="fileName"
              label="Storage Filename"
              disabled
              fullWidth
            />
            <TextInput
              source="contentType"
              label="MIME Type"
              disabled
              fullWidth
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
