import {
  Edit,
  SimpleForm,
  TextInput,
  ImageField,
  DateField,
  required,
  Labeled,
} from "react-admin";
import { Grid } from "@mui/material";

export const MediaEdit = () => (
  <Edit title="Edit Media Metadata" mutationMode="pessimistic" resource="media">
    <SimpleForm>
      {/* В MUI v6+ Grid по умолчанию работает как контейнер */}
      <Grid container spacing={3} sx={{ width: "100%" }}>
        {/* Левая колонка: Основные данные (8 из 12 колонок) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TextInput source="id" label="System ID" disabled fullWidth />

          <TextInput
            source="slug"
            label="SEO Slug"
            validate={[required()]}
            fullWidth
            helperText="Used for image URL and search engine optimization"
          />

          <TextInput
            source="altTextEn"
            label="Alt Text (English)"
            fullWidth
            multiline
          />

          <TextInput
            source="altTextEs"
            label="Alt Text (Spanish)"
            fullWidth
            multiline
          />
        </Grid>

        {/* Правая колонка: Превью и технические данные (4 из 12 колонки) */}
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
                  border: "1px solid #ccc",
                  display: "block",
                },
              }}
            />
          </Labeled>

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

          <Labeled label="Upload Date" sx={{ display: "block", mt: 2 }}>
            <DateField source="createdAt" showTime />
          </Labeled>
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);
