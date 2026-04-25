import { ReferenceArrayInput, AutocompleteArrayInput } from "react-admin";
import { Box, Typography, Link, Stack, Divider } from "@mui/material";
import { useWatch } from "react-hook-form";

/**
 * Исправленный компонент управления медиа (Шаг 1).
 * Теперь он видит данные сразу после загрузки страницы и корректно правит ссылки.
 */
export const BusinessMediaFields = () => {
  // 1. Наблюдаем за РЕАЛЬНЫМИ объектами медиа, которые прислал бэкенд
  const media = useWatch({ name: "media" }) || [];
  // 2. Наблюдаем за изменениями в инпуте (для новых добавлений)
  const mediaIds = useWatch({ name: "mediaIds" }) || [];

  // Получаем корректный базовый URL из окружения
  const apiUrl = import.meta.env.VITE_API_URL || "";
  const host = apiUrl.endsWith("/api")
    ? apiUrl.substring(0, apiUrl.lastIndexOf("/api"))
    : apiUrl;

  /**
   * Функция формирования ссылки.
   * Если бэкенд прислал localhost, мы меняем его на актуальный host из .env
   */
  const formatFullUrl = (record: any) => {
    if (!record) return "";
    // Если есть fileName, строим путь с нуля (самый надежный способ)
    if (record.fileName) {
      return `${host}/media-files/${record.fileName}`;
    }
    // Если fileName нет, берем url и правим localhost на наш хост
    if (record.url && record.url.includes("localhost")) {
      const path = record.url.split(":5046")[1]; // забираем всё после порта
      return `${host}${path}`;
    }
    return record.url || "";
  };

  return (
    <Box sx={{ textAlign: "left", width: "100%" }}>
      <Typography
        variant="h6"
        gutterBottom
        color="primary"
        sx={{ fontWeight: 600 }}
      >
        Media Assets Management
      </Typography>

      {/* --- БЛОК ОТОБРАЖЕНИЯ ССЫЛОК --- */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ color: "text.secondary", fontWeight: "bold" }}
        >
          Active Media Links:
        </Typography>

        {/* Проверяем наличие данных в media (то что пришло) или mediaIds (то что добавили) */}
        {media.length > 0 || mediaIds.length > 0 ? (
          <Stack spacing={1.5} sx={{ mt: 1, alignItems: "flex-start" }}>
            {media.map((m: any) => {
              const fullUrl = formatFullUrl(m);
              return (
                <Box
                  key={m.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontWeight: "bold" }}
                  >
                    Slug: {m.slug}
                  </Typography>
                  <Link
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontSize: "0.85rem",
                      wordBreak: "break-all",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {fullUrl}
                  </Link>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", color: "grey.500", mt: 1 }}
          >
            No images linked yet.
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* --- БЛОК УПРАВЛЕНИЯ --- */}
      <Box>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Edit Media Connections:
        </Typography>
        <ReferenceArrayInput source="mediaIds" reference="media">
          <AutocompleteArrayInput
            optionText="slug"
            label="Linked Media Assets"
            fullWidth
            sx={{
              "& .MuiInputLabel-root": {
                textAlign: "left",
                transformOrigin: "top left",
              },
              "& .MuiAutocomplete-input": { textAlign: "left" },
              "& .MuiAutocomplete-tag": {
                borderRadius: 1,
                fontSize: "0.75rem",
                fontWeight: "bold",
              },
            }}
          />
        </ReferenceArrayInput>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ display: "block", mt: 1 }}
        >
          * Search by slug to add. Click 'X' on a tag to remove.
        </Typography>
      </Box>
    </Box>
  );
};
