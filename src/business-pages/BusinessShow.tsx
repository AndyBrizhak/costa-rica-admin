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
} from "react-admin";
import { Typography, Divider, Box } from "@mui/material";

/**
 * Страница просмотра бизнеса.
 * Исправлено: удалены невалидные пропсы multiline и неиспользуемые импорты.
 */
export const BusinessShow = () => (
  <Show title="Business View">
    <TabbedShowLayout>
      {/* Вкладка 1: Основная информация */}
      <Tab label="General">
        <TextField source="name" label="Business Name" />
        <TextField source="slug" label="URL Slug" />
        <TextField source="description" />
        <TextField source="languageCode" label="Language" />
        <BooleanField source="isPublished" label="Published Status" />
        <DateField source="createdAt" label="Created Date" />
        <DateField source="updatedAt" label="Last Update" />
      </Tab>

      {/* Вкладка 2: География */}
      <Tab label="Geography">
        <ReferenceField source="provinceId" reference="provinces" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="cityId" reference="cities" link="show">
          <TextField source="name" />
        </ReferenceField>
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="textSecondary" display="block">
            GPS Coordinates
          </Typography>
          <Box display="flex" gap={2} sx={{ mt: 0.5 }}>
            <NumberField source="location.latitude" label="Latitude" />
            <NumberField source="location.longitude" label="Longitude" />
          </Box>
        </Box>
      </Tab>

      {/* Вкладка 3: Классификация */}
      <Tab label="Taxonomy">
        <ReferenceField
          source="primaryCategoryId"
          reference="google-categories"
          label="Primary Category"
        >
          <TextField source="nameEn" />
        </ReferenceField>

        <ArrayField source="tags" label="Tags">
          <Datagrid bulkActionButtons={false}>
            <TextField source="nameEn" label="Tag (EN)" />
            <TextField source="nameEs" label="Tag (ES)" />
          </Datagrid>
        </ArrayField>
      </Tab>

      {/* Вкладка 4: Расписание */}
      <Tab label="Schedule">
        <ArrayField source="schedule">
          <Datagrid bulkActionButtons={false}>
            <TextField source="days" label="Day Indices" />
            <ArrayField source="intervals" label="Opening Hours">
              <Datagrid bulkActionButtons={false}>
                <TextField source="start" label="Open" />
                <TextField source="end" label="Close" />
              </Datagrid>
            </ArrayField>
          </Datagrid>
        </ArrayField>
      </Tab>

      {/* Вкладка 5: Контакты и SEO */}
      <Tab label="Communication & SEO">
        <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
          Social & Phone
        </Typography>
        <TextField source="contacts.phoneCallable" label="Call Phone" />
        <TextField source="contacts.phoneWhatsapp" label="WhatsApp" />
        <UrlField source="contacts.facebook" label="Facebook Profile" />
        <UrlField source="contacts.instagram" label="Instagram Profile" />

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          SEO Metadata
        </Typography>
        <TextField source="seo.title" label="Meta Title" />
        <TextField source="seo.description" label="Meta Description" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
