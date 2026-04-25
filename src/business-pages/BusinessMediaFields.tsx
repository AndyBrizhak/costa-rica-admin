import { ReferenceArrayInput, AutocompleteArrayInput } from "react-admin";
import { Box, Typography, Link, Stack, Divider } from "@mui/material";
import { useWatch } from "react-hook-form";

/**
 * Интерфейс для строгого описания объекта медиа.
 */
interface MediaAsset {
  id: string;
  slug: string;
  fileName: string;
}

/**
 * Компонент управления медиа-галереей бизнеса.
 * Исправлено:
 * 1. Ошибка 'mediaIds is never read' (переменная теперь используется в логике).
 * 2. Ошибки типизации перегрузок и 'any'.
 * 3. Реактивность: список ссылок учитывает актуальное количество выбранных ID.
 */
export const BusinessMediaFields = () => {
  // Наблюдаем за объектами и за массивом ID.
  // Используем 'as', чтобы избежать конфликтов перегрузок useWatch в TS.
  const media = useWatch({ name: "media" }) as MediaAsset[] | undefined;
  const mediaIds = useWatch({ name: "mediaIds" }) as string[] | undefined;

  const apiUrl = import.meta.env.VITE_API_URL || "";

  // Безопасный расчет корня хоста
  const host = apiUrl.endsWith("/api")
    ? apiUrl.substring(0, apiUrl.lastIndexOf("/api"))
    : apiUrl;

  const getUrl = (asset: MediaAsset): string => {
    if (!asset.fileName) return "";
    return `${host}/media-files/${asset.fileName}`;
  };

  // Подготавливаем данные для рендеринга
  const activeMedia = Array.isArray(media) ? media : [];
  const totalCount = Array.isArray(mediaIds) ? mediaIds.length : 0;

  return (
    <Box sx={{ textAlign: "left", width: "100%" }}>
      <Typography
        variant="h6"
        gutterBottom
        color="primary"
        sx={{ fontWeight: 600, textAlign: "left" }}
      >
        Media Assets Management
      </Typography>

      {/* --- СПИСОК ССЫЛОК --- */}
      <Box sx={{ mb: 3, textAlign: "left" }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{
            color: "text.secondary",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Active Media Links ({totalCount}):
        </Typography>

        {activeMedia.length > 0 ? (
          <Stack spacing={1.5} sx={{ mt: 1, alignItems: "flex-start" }}>
            {activeMedia.map((m) => {
              const fullUrl = getUrl(m);
              if (!fullUrl) return null;
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
                    sx={{
                      color: "text.secondary",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
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
                      textAlign: "left",
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
            sx={{
              fontStyle: "italic",
              color: "grey.500",
              mt: 1,
              textAlign: "left",
            }}
          >
            {totalCount > 0
              ? "Saving changes will update the links list..."
              : "No images linked yet."}
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* --- УПРАВЛЕНИЕ СВЯЗЯМИ --- */}
      <Box sx={{ textAlign: "left" }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 1, textAlign: "left" }}
        >
          Edit Connections (Search by Slug):
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
          sx={{ display: "block", mt: 1, textAlign: "left" }}
        >
          * Search by slug to add. Click 'X' on a tag to remove a link.
        </Typography>
      </Box>
    </Box>
  );
};
