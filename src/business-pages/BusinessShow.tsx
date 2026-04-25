import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  BooleanField,
  ArrayField,
  SingleFieldList,
  ChipField,
  UrlField,
  Labeled,
  FunctionField,
} from "react-admin";
import { Grid, Typography, Divider, Box, Stack, Link } from "@mui/material";
import type { BusinessRecord } from "./businessTypes";

/**
 * Локальный интерфейс для корректной типизации медиа-файлов,
 * так как в базовом businessTypes.ts может отсутствовать fileName.
 */
interface MediaItem {
  id: string;
  slug: string;
  fileName: string;
}

/**
 * Страница просмотра бизнеса (Шаг 2).
 * Исправлено:
 * 1. Ошибки типизации (двойное приведение через unknown).
 * 2. Восстановлены все 5 вкладок.
 * 3. Жесткое выравнивание по левому краю.
 * 4. Корректный расчет хоста для ссылок.
 */
export const BusinessShow = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "";
  // Безопасно отрезаем /api только с конца строки
  const host = apiUrl.endsWith("/api") ? apiUrl.slice(0, -4) : apiUrl;

  return (
    <Show title="Business View">
      <TabbedShowLayout
        sx={{
          "& .RaTabbedShowLayout-content": { p: 2 },
          "& .MuiGrid-container": {
            justifyContent: "flex-start",
            textAlign: "left",
          },
          "& .RaLabeled-root": { display: "block", textAlign: "left" },
          "& .RaLabeled-label": { textAlign: "left", mb: 0.5 },
          "& .MuiTypography-root": { textAlign: "left" },
        }}
      >
        {/* --- Вкладка 1: General --- */}
        <Tab label="General">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Labeled label="Business Name">
                <TextField
                  source="name"
                  sx={{ fontSize: "1.1rem", fontWeight: 600 }}
                />
              </Labeled>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Labeled label="Published Status">
                <BooleanField source="isPublished" />
              </Labeled>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Labeled label="URL Slug">
                <TextField source="slug" />
              </Labeled>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Labeled label="Language">
                <TextField source="languageCode" />
              </Labeled>
            </Grid>
            <Grid size={12}>
              <Labeled label="Description">
                <FunctionField<BusinessRecord>
                  render={(record) => (
                    <Box
                      sx={{
                        border: "1px solid #eee",
                        p: 1.5,
                        borderRadius: 1,
                        backgroundColor: "#fafafa",
                        whiteSpace: "pre-wrap",
                        minHeight: "40px",
                        textAlign: "left",
                      }}
                      dangerouslySetInnerHTML={{
                        __html:
                          record?.description ||
                          "<i>No description available</i>",
                      }}
                    />
                  )}
                />
              </Labeled>
            </Grid>
          </Grid>
        </Tab>

        {/* --- Вкладка 2: Location & Categories --- */}
        <Tab label="Location & Categories">
          <Typography variant="h6" gutterBottom color="primary">
            Geography
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Labeled label="Province">
                <TextField source="provinceName" />
              </Labeled>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Labeled label="City">
                <TextField source="cityName" />
              </Labeled>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Labeled label="Latitude">
                <TextField source="location.latitude" />
              </Labeled>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Labeled label="Longitude">
                <TextField source="location.longitude" />
              </Labeled>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom color="primary">
            Categories
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Labeled label="Primary Category">
                <TextField source="primaryCategoryName" />
              </Labeled>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Labeled label="Secondary Categories">
                <ArrayField source="secondaryCategories">
                  <SingleFieldList linkType={false}>
                    <ChipField source="nameEn" size="small" />
                  </SingleFieldList>
                </ArrayField>
              </Labeled>
            </Grid>
          </Grid>
        </Tab>

        {/* --- Вкладка 3: Contacts & SEO --- */}
        <Tab label="Contacts & SEO">
          <Typography variant="h6" gutterBottom color="primary">
            Contacts
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Labeled label="Phone">
                <TextField source="contacts.phoneCallable" />
              </Labeled>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Labeled label="WhatsApp">
                <TextField source="contacts.phoneWhatsapp" />
              </Labeled>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Labeled label="Facebook">
                <UrlField source="contacts.facebook" target="_blank" />
              </Labeled>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Labeled label="Instagram">
                <UrlField source="contacts.instagram" target="_blank" />
              </Labeled>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom color="primary">
            SEO Settings
          </Typography>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Labeled label="SEO Title">
                <TextField source="seo.title" />
              </Labeled>
            </Grid>
            <Grid size={12}>
              <Labeled label="SEO Description">
                <TextField
                  source="seo.description"
                  sx={{ display: "block", whiteSpace: "pre-wrap" }}
                />
              </Labeled>
            </Grid>
          </Grid>
        </Tab>

        {/* --- Вкладка 4: Tags --- */}
        <Tab label="Tags">
          <Box sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Linked Tags
            </Typography>
            <ArrayField source="tags">
              <SingleFieldList linkType={false}>
                <ChipField source="nameEn" sx={{ borderRadius: 1 }} />
              </SingleFieldList>
            </ArrayField>
          </Box>
        </Tab>

        {/* --- Вкладка 5: Media Gallery --- */}
        <Tab label="Media Gallery">
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="h6"
              gutterBottom
              color="primary"
              sx={{ textAlign: "left" }}
            >
              Direct Media Links
            </Typography>

            <FunctionField<BusinessRecord>
              render={(record) => {
                // Используем unknown для обхода несовпадения типов в businessTypes.ts
                const items = record?.media as unknown as
                  | MediaItem[]
                  | undefined;

                if (!items || items.length === 0)
                  return (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 2 }}
                    >
                      No media objects found.
                    </Typography>
                  );

                return (
                  <Stack spacing={2} sx={{ mt: 2, alignItems: "flex-start" }}>
                    {items.map((m) => {
                      const fullUrl = `${host}/media-files/${m.fileName}`;
                      return (
                        <Box
                          key={m.id}
                          sx={{
                            borderLeft: "3px solid #1976d2",
                            pl: 2,
                            textAlign: "left",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: "bold",
                              color: "text.secondary",
                              display: "block",
                            }}
                          >
                            Slug: {m.slug}
                          </Typography>
                          <Link
                            href={fullUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              fontSize: "0.9rem",
                              wordBreak: "break-all",
                              textAlign: "left",
                            }}
                          >
                            {fullUrl}
                          </Link>
                        </Box>
                      );
                    })}
                  </Stack>
                );
              }}
            />
          </Box>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
