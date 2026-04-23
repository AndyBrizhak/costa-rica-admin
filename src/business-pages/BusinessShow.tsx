import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  ArrayField,
  Datagrid,
  UrlField,
  ImageField,
  Labeled,
} from "react-admin";
import { Grid, Typography, Divider, Box } from "@mui/material";

/**
 * Страница просмотра бизнеса.
 * Исправлено: выравнивание по левому краю, удалены неиспользуемые переменные.
 */
export const BusinessShow = () => (
  <Show title="Business View">
    <TabbedShowLayout
      sx={{
        "& .RaTabbedShowLayout-content": { p: 2 },
        "& .MuiGrid-container": {
          justifyContent: "flex-start",
          textAlign: "left",
        },
      }}
    >
      {/* Вкладка 1: General */}
      <Tab label="General">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Labeled label="Business Name">
              <TextField
                source="name"
                sx={{ fontSize: "1.1rem", fontWeight: 500 }}
              />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Labeled label="URL Slug">
              <TextField source="slug" sx={{ fontStyle: "italic" }} />
            </Labeled>
          </Grid>
          <Grid size={12}>
            <Labeled label="Description">
              <TextField
                source="description"
                component="pre"
                sx={{ whiteSpace: "pre-wrap" }}
              />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Labeled label="Is Published">
              <BooleanField source="isPublished" />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Labeled label="Language">
              <TextField source="languageCode" />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ textAlign: "left" }}>
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
              >
                Created At
              </Typography>
              <DateField source="createdAt" showTime />
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
                sx={{ mt: 1 }}
              >
                Last Update
              </Typography>
              <DateField source="updatedAt" showTime />
            </Box>
          </Grid>
        </Grid>
      </Tab>

      {/* Вкладка 2: Geography */}
      <Tab label="Geography">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Labeled label="Province">
              <ReferenceField
                source="provinceId"
                reference="provinces"
                link="show"
              >
                <TextField source="name" />
              </ReferenceField>
            </Labeled>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Labeled label="City">
              <ReferenceField source="cityId" reference="cities" link="show">
                <TextField source="name" />
              </ReferenceField>
            </Labeled>
          </Grid>
          <Grid size={12} sx={{ mt: 1 }}>
            <Typography
              variant="subtitle2"
              gutterBottom
              color="primary"
              sx={{ textAlign: "left" }}
            >
              Maps Integration
            </Typography>
            <Labeled label="Google Maps Link">
              <UrlField source="googleMapsUrl" target="_blank" />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Labeled label="Latitude">
              <TextField source="location.latitude" />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Labeled label="Longitude">
              <TextField source="location.longitude" />
            </Labeled>
          </Grid>
        </Grid>
      </Tab>

      {/* Вкладка 3: Taxonomy */}
      <Tab label="Taxonomy">
        <Grid container spacing={2}>
          <Grid size={12}>
            <Labeled label="Primary Google Category">
              <ReferenceField
                source="primaryCategoryId"
                reference="google-categories"
                link="show"
              >
                <TextField source="nameEn" />
              </ReferenceField>
            </Labeled>
          </Grid>
          <Grid size={12}>
            <Labeled label="Additional Google Categories">
              <ReferenceArrayField
                source="additionalCategoryIds"
                reference="google-categories"
              >
                <SingleFieldList linkType="show">
                  <ChipField source="nameEn" variant="outlined" size="small" />
                </SingleFieldList>
              </ReferenceArrayField>
            </Labeled>
          </Grid>
          <Grid size={12}>
            <Box sx={{ mt: 1, textAlign: "left" }}>
              <Typography variant="subtitle2" gutterBottom color="primary">
                Tags
              </Typography>
              <ReferenceArrayField source="tagIds" reference="tags">
                <SingleFieldList linkType="show">
                  <ChipField source="nameEn" size="small" color="primary" />
                </SingleFieldList>
              </ReferenceArrayField>
            </Box>
          </Grid>
        </Grid>
      </Tab>

      {/* Вкладка 4: Media */}
      <Tab label="Media">
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="subtitle2" gutterBottom color="primary">
            Business Gallery
          </Typography>
          <ReferenceArrayField source="mediaIds" reference="media">
            <SingleFieldList
              linkType="show"
              sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}
            >
              <ImageField
                source="url"
                title="slug"
                sx={{
                  "& img": {
                    width: 140,
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 1,
                    border: "1px solid #ddd",
                  },
                }}
              />
            </SingleFieldList>
          </ReferenceArrayField>
        </Box>
      </Tab>

      {/* Вкладка 5: Schedule */}
      <Tab label="Schedule">
        <ArrayField source="schedule" label={false}>
          <Datagrid bulkActionButtons={false}>
            <TextField source="days" label="Working Days" />
            <ArrayField source="intervals" label="Hours">
              <Datagrid bulkActionButtons={false} header={null}>
                <TextField source="start" label="Open" />
                <TextField source="end" label="Close" />
              </Datagrid>
            </ArrayField>
          </Datagrid>
        </ArrayField>
      </Tab>

      {/* Вкладка 6: SEO & Contacts */}
      <Tab label="SEO & Contacts">
        <Typography
          variant="h6"
          gutterBottom
          color="primary"
          sx={{ textAlign: "left" }}
        >
          Communication
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Labeled label="Call Phone">
              <TextField source="contacts.phoneCallable" />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Labeled label="WhatsApp">
              <TextField source="contacts.phoneWhatsapp" />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Labeled label="Facebook URL">
              <UrlField source="contacts.facebook" target="_blank" />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Labeled label="Instagram URL">
              <UrlField source="contacts.instagram" target="_blank" />
            </Labeled>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="h6"
          gutterBottom
          color="primary"
          sx={{ textAlign: "left" }}
        >
          SEO Metadata
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Labeled label="SEO Title">
              <TextField source="seo.title" />
            </Labeled>
          </Grid>
          <Grid size={12}>
            <Labeled label="SEO Description">
              <TextField source="seo.description" />
            </Labeled>
          </Grid>
        </Grid>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
