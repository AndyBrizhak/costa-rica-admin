import { useEffect } from "react";
import { ReferenceArrayInput, AutocompleteArrayInput } from "react-admin";
import { Box, Typography, Link, Stack, Divider } from "@mui/material";
import { useWatch, useFormContext } from "react-hook-form";

interface MediaAsset {
  id: string;
  slug: string;
  fileName: string;
}

/**
 * Компонент управления медиа-галереей.
 * Исправлено:
 * 1. Реализована синхронизация media -> mediaIds при загрузке (решает проблему Replace vs Append).
 * 2. Поддержка удаления: удаление чипа в инпуте теперь корректно обновляет список ID для бэкенда.
 * 3. Строгая типизация и выравнивание по левому краю.
 */
export const BusinessMediaFields = () => {
  const { setValue } = useFormContext();

  // Наблюдаем за исходными данными (объекты) и полем для отправки (ID)
  const media = useWatch({ name: "media" }) as MediaAsset[] | undefined;
  const mediaIds = useWatch({ name: "mediaIds" }) as string[] | undefined;

  const apiUrl = import.meta.env.VITE_API_URL || "";
  const host = apiUrl.endsWith("/api") ? apiUrl.slice(0, -4) : apiUrl;

  /**
   * ЭФФЕКТ СИНХРОНИЗАЦИИ:
   * Если форма загрузилась, и у нас есть объекты в 'media', но список 'mediaIds' пуст,
   * мы наполняем 'mediaIds' существующими идентификаторами.
   * Это гарантирует, что бэкенд получит ПОЛНЫЙ список (старые + новые).
   */
  useEffect(() => {
    if (
      Array.isArray(media) &&
      media.length > 0 &&
      (!mediaIds || mediaIds.length === 0)
    ) {
      const initialIds = media.map((m) => m.id);
      // Устанавливаем начальные значения в форму
      setValue("mediaIds", initialIds, { shouldDirty: false });
    }
  }, [media, mediaIds, setValue]);

  const getUrl = (asset: MediaAsset): string => {
    if (!asset.fileName) return "";
    return `${host}/media-files/${asset.fileName}`;
  };

  // Для рендеринга списка ссылок используем актуальное состояние mediaIds
  // (В идеале здесь нужен ReferenceArrayField, но для простоты и скорости
  // используем текущие объекты, пока они не сохранены)
  const activeMedia = Array.isArray(media) ? media : [];

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

      {/* --- СПИСОК АКТИВНЫХ ССЫЛОК --- */}
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
          Current Active Links:
        </Typography>

        {activeMedia.length > 0 ? (
          <Stack spacing={1.5} sx={{ mt: 1, alignItems: "flex-start" }}>
            {activeMedia.map((m) => {
              const fullUrl = getUrl(m);
              if (!fullUrl) return null;

              // Отображаем только те ссылки, чьи ID есть в текущем наборе mediaIds
              const isMarkedForDeletion = mediaIds && !mediaIds.includes(m.id);

              return (
                <Box
                  key={m.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    opacity: isMarkedForDeletion ? 0.4 : 1,
                    textDecoration: isMarkedForDeletion
                      ? "line-through"
                      : "none",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontWeight: "bold" }}
                  >
                    Slug: {m.slug}{" "}
                    {isMarkedForDeletion && "(Will be removed after save)"}
                  </Typography>
                  <Link
                    href={isMarkedForDeletion ? "#" : fullUrl}
                    target={isMarkedForDeletion ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    sx={{
                      fontSize: "0.85rem",
                      wordBreak: "break-all",
                      pointerEvents: isMarkedForDeletion ? "none" : "auto",
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
            No images linked.
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* --- УПРАВЛЕНИЕ (ДОБАВЛЕНИЕ И УДАЛЕНИЕ ПО ID) --- */}
      <Box sx={{ textAlign: "left" }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Sync Media IDs (Search by Slug):
        </Typography>
        <ReferenceArrayInput source="mediaIds" reference="media">
          <AutocompleteArrayInput
            optionText="slug"
            label="Selected Identifiers"
            fullWidth
            sx={{
              "& .MuiInputLabel-root": {
                textAlign: "left",
                transformOrigin: "top left",
              },
              "& .MuiAutocomplete-input": { textAlign: "left" },
              "& .MuiAutocomplete-tag": { borderRadius: 1, fontWeight: "bold" },
            }}
          />
        </ReferenceArrayInput>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ display: "block", mt: 1 }}
        >
          * To <b>add</b>: start typing the slug. To <b>delete</b>: click the
          'X' on the tag. The identifiers will be updated in the database upon
          saving.
        </Typography>
      </Box>
    </Box>
  );
};
