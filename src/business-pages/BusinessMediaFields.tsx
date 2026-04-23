import {
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ReferenceArrayField,
  SingleFieldList,
  ImageField,
} from "react-admin";
import { Box, Typography, Avatar, ListItemText, Divider } from "@mui/material";
import { useWatch } from "react-hook-form";
import type { MediaRecord } from "../media/mediaTypes";

/**
 * Рендерер для элемента в выпадающем списке выбора медиа.
 */
const MediaOptionRenderer = (choice: MediaRecord) => {
  if (!choice || !choice.url) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar
        src={choice.url}
        variant="rounded"
        sx={{ width: 40, height: 40, border: "1px solid #eee" }}
      />
      <ListItemText
        primary={choice.slug}
        secondary={choice.contentType}
        primaryTypographyProps={{ variant: "body2", noWrap: true }}
      />
    </Box>
  );
};

/**
 * Изолированный компонент управления галереей для ресурсов Business.
 */
export const BusinessMediaFields = () => {
  const mediaIds = useWatch({ name: "mediaIds" }) || [];

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom color="primary">
        Gallery Management
      </Typography>

      <ReferenceArrayInput source="mediaIds" reference="media">
        <AutocompleteArrayInput
          label="Search and add images by slug"
          optionText={MediaOptionRenderer}
          inputText={(record: MediaRecord) => record.slug}
          fullWidth
          shouldRenderSuggestions={(val: string) => val.length > 0}
          helperText="Type to search. Use 'Enter' to select and continue typing."
          // В RA v5 пропсы MUI Autocomplete передаются напрямую в компонент
          disableCloseOnSelect
          // Перехватываем Enter, чтобы форма не отправлялась
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.stopPropagation();
            }
          }}
        />
      </ReferenceArrayInput>

      {mediaIds.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle2" gutterBottom>
            Selection Preview ({mediaIds.length})
          </Typography>
          <Box
            sx={{
              p: 2,
              backgroundColor: "#fcfcfc",
              borderRadius: 1,
              border: "1px dashed #ccc",
            }}
          >
            <ReferenceArrayField
              source="mediaIds"
              reference="media"
              record={{ id: "preview-context", mediaIds }}
            >
              <SingleFieldList
                linkType={false}
                sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}
              >
                <ImageField
                  source="url"
                  title="slug"
                  sx={{
                    "& img": {
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 1,
                      border: "2px solid #fff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    },
                  }}
                />
              </SingleFieldList>
            </ReferenceArrayField>
          </Box>
        </Box>
      )}
    </Box>
  );
};
