import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  ArrayField,
  Datagrid,
  UrlField,
  NumberField,
  Labeled,
} from "react-admin";
import { Grid, Typography, Divider, Box, Paper } from "@mui/material";

/**
 * Улучшенная страница просмотра (Refactored for MUI v6+).
 * Используем Grid2 и проп size для соответствия актуальному API.
 */
export const BusinessShow = () => (
  <Show title="Business Details">
    <TabbedShowLayout sx={{ "& .RaTabbedShowLayout-content": { p: 3 } }}>
      {/* Вкладка 1: Основное */}
      <Tab label="General Info">
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
              <TextField source="description" />
            </Labeled>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <BooleanField source="isPublished" label="Is Live" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField source="languageCode" label="Language" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DateField source="updatedAt" label="Last Update" />
          </Grid>
        </Grid>
      </Tab>

      {/* Вкладка 2: Локация */}
      <Tab label="Location">
        <Grid container spacing={3}>
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

          <Grid size={12}>
            <Divider sx={{ my: 1 }}>GPS Coordinates</Divider>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Labeled label="Latitude">
              <NumberField source="location.latitude" />
            </Labeled>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Labeled label="Longitude">
              <NumberField source="location.longitude" />
            </Labeled>
          </Grid>
        </Grid>
      </Tab>

      {/* Вкладка 3: Категории */}
      <Tab label="Taxonomy">
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Primary Category
          </Typography>
          <ReferenceField
            source="primaryCategoryId"
            reference="google-categories"
          >
            <TextField source="nameEn" />
          </ReferenceField>
        </Box>

        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>
        <ArrayField source="tags">
          <Datagrid bulkActionButtons={false}>
            <TextField source="nameEn" label="English" />
            <TextField source="nameEs" label="Spanish" />
          </Datagrid>
        </ArrayField>
      </Tab>

      {/* Вкладка 4: Расписание */}
      <Tab label="Schedule">
        <ArrayField source="schedule">
          <Datagrid bulkActionButtons={false} sx={{ mb: 2 }}>
            <TextField source="days" label="Days (0=Sun)" />
            <ArrayField source="intervals" label="Time Windows">
              <Datagrid bulkActionButtons={false}>
                <TextField source="start" label="Open" />
                <TextField source="end" label="Close" />
              </Datagrid>
            </ArrayField>
          </Datagrid>
        </ArrayField>
      </Tab>

      {/* Вкладка 5: SEO & Contacts */}
      <Tab label="SEO & Contacts">
        <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Contact Channels
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
          Search Engine Optimization
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField source="seo.title" label="Meta Title" />
          </Grid>
          <Grid size={12}>
            <TextField source="seo.description" label="Meta Description" />
          </Grid>
        </Grid>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
