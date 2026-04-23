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
import { Grid, Typography, Divider, Box, Paper } from "@mui/material";

/**
 * Страница просмотра бизнеса.
 * Полностью синхронизирована по структуре с формами Create и Edit.
 */
export const BusinessShow = () => (
  <Show title="Business Overview">
    <TabbedShowLayout sx={{ "& .RaTabbedShowLayout-content": { p: 3 } }}>
      {/* Вкладка 1: Основная информация */}
      <Tab label="General">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Labeled label="Business Name">
              <TextField
                source="name"
                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Labeled label="URL Slug">
              <TextField
                source="slug"
                sx={{ fontStyle: "italic", color: "text.secondary" }}
              />
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
          <Grid size={{ xs: 6, md: 3 }}>
            <BooleanField source="isPublished" label="Published Status" />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <TextField source="languageCode" label="Language" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Labeled label="Created At">
                <DateField source="createdAt" showTime />
              </Labeled>
              <Labeled label="Last Updated">
                <DateField source="updatedAt" showTime />
              </Labeled>
            </Box>
          </Grid>
        </Grid>
      </Tab>

      {/* Вкладка 2: География */}
      <Tab label="Geography">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReferenceField
              source="provinceId"
              reference="provinces"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReferenceField source="cityId" reference="cities" link="show">
              <TextField source="name" />
            </ReferenceField>
          </Grid>
          <Grid size={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" gutterBottom>
              Location Coordinates
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <TextField source="location.latitude" label="Latitude" />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <TextField source="location.longitude" label="Longitude" />
          </Grid>
          <Grid size={12}>
            <UrlField
              source="googleMapsUrl"
              label="Google Maps Link"
              target="_blank"
            />
          </Grid>
        </Grid>
      </Tab>

      {/* Вкладка 3: Категории и Теги */}
      <Tab label="Taxonomy">
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Google Categories
          </Typography>
          <Labeled label="Primary Category">
            <ReferenceField
              source="primaryCategoryId"
              reference="google-categories"
            >
              <TextField source="nameEn" />
            </ReferenceField>
          </Labeled>

          <Box sx={{ mt: 2 }}>
            <ReferenceArrayField
              source="additionalCategoryIds"
              reference="google-categories"
            >
              <SingleFieldList linkType="show">
                <ChipField
                  source="nameEn"
                  variant="outlined"
                  color="secondary"
                />
              </SingleFieldList>
            </ReferenceArrayField>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Tags
          </Typography>
          <ReferenceArrayField source="tagIds" reference="tags">
            <SingleFieldList linkType="show">
              <ChipField source="nameEn" />
            </SingleFieldList>
          </ReferenceArrayField>
        </Box>
      </Tab>

      {/* Вкладка 4: Медиа (Галерея) */}
      <Tab label="Media">
        <Typography variant="subtitle1" gutterBottom>
          Business Gallery
        </Typography>
        <ReferenceArrayField source="mediaIds" reference="media">
          <SingleFieldList
            linkType="show"
            sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
          >
            <ImageField
              source="url"
              title="slug"
              sx={{
                "& img": {
                  width: 180,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: 2,
                },
              }}
            />
          </SingleFieldList>
        </ReferenceArrayField>
      </Tab>

      {/* Вкладка 5: Расписание */}
      <Tab label="Schedule">
        <ArrayField source="schedule">
          <Datagrid bulkActionButtons={false}>
            <TextField source="days" label="Days (Raw)" />
            <ArrayField source="intervals" label="Time Slots">
              <Datagrid bulkActionButtons={false}>
                <TextField source="start" label="Open" />
                <TextField source="end" label="Close" />
              </Datagrid>
            </ArrayField>
          </Datagrid>
        </ArrayField>
      </Tab>

      {/* Вкладка 6: Контакты и SEO */}
      <Tab label="SEO & Contacts">
        <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "#fafafa" }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Communication
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField source="contacts.phoneCallable" label="Phone" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField source="contacts.phoneWhatsapp" label="WhatsApp" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <UrlField source="contacts.facebook" label="Facebook" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <UrlField source="contacts.instagram" label="Instagram" />
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="subtitle1" color="primary" gutterBottom>
          SEO Metadata
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField source="seo.title" label="SEO Title" />
          </Grid>
          <Grid size={12}>
            <TextField source="seo.description" label="SEO Description" />
          </Grid>
        </Grid>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
