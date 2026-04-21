import {
  Edit,
  SimpleForm,
  TextInput,
  ImageField,
  DateField,
  required,
  Labeled,
  TopToolbar,
  DeleteButton,
  ListButton,
  Toolbar,
  SaveButton,
  useRecordContext,
  useNotify,
} from "react-admin";
import {
  Grid,
  Box,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // Стандартная иконка MUI
import { isSlug } from "../utils/validators";
import type { MediaRecord } from "./mediaTypes";

/**
 * Кнопки действий в заголовке (верхний правый угол).
 */
const EditActions = () => {
  const record = useRecordContext<MediaRecord>();
  return (
    <TopToolbar>
      <ListButton />
      <DeleteButton
        mutationMode="pessimistic"
        confirmTitle={`Delete: ${record?.slug}`}
      />
    </TopToolbar>
  );
};

/**
 * Верхний тулбар формы с кнопками «Save» и «Cancel».
 */
const TopFormToolbar = () => (
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "transparent",
      minHeight: "auto",
      p: 0,
      mb: 2,
      "& .RaToolbar-defaultToolbar": { backgroundColor: "transparent" },
    }}
  >
    <Box sx={{ display: "flex", gap: 1 }}>
      <SaveButton label="Save Changes" variant="contained" />
      <ListButton label="Cancel" variant="outlined" color="error" />
    </Box>
  </Toolbar>
);

/**
 * Поле для отображения и копирования полной ссылки на изображение.
 */
const CopyUrlField = () => {
  const record = useRecordContext<MediaRecord>();
  const notify = useNotify();

  if (!record?.url) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(record.url);
    notify("URL copied to clipboard", { type: "info" });
  };

  return (
    <TextInput
      source="url"
      label="Full Public URL"
      fullWidth
      variant="standard"
      size="small"
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Copy URL">
              <IconButton onClick={handleCopy} size="small" color="primary">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
};

export const MediaEdit = () => (
  <Edit
    title="Edit Media"
    mutationMode="pessimistic"
    resource="media"
    actions={<EditActions />}
  >
    <SimpleForm toolbar={<TopFormToolbar />} reValidateMode="onChange">
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {/* Основная область: SEO и Метаданные */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              SEO & PATH
            </Typography>
            <Divider />
          </Box>

          <TextInput
            source="slug"
            label="SEO Slug"
            validate={[required(), isSlug]}
            fullWidth
            size="small"
            helperText="Lowercase, numbers, hyphens only."
          />

          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              LOCALIZATION (ALT TEXT)
            </Typography>
            <Divider />
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                source="altTextEn"
                label="Alt English"
                fullWidth
                multiline
                rows={2}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                source="altTextEs"
                label="Alt Spanish"
                fullWidth
                multiline
                rows={2}
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Правая колонка: Превью и техническая информация */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="grey.600" fontWeight="bold">
              ASSET INFO
            </Typography>
            <Divider />
          </Box>

          <Labeled label="Preview">
            <ImageField
              source="url"
              sx={{
                "& img": {
                  maxWidth: "100%",
                  maxHeight: "150px",
                  objectFit: "contain",
                  borderRadius: 1,
                  display: "block",
                  mt: 1,
                  border: "1px solid #eee",
                },
              }}
            />
          </Labeled>

          <Box
            mt={1}
            p={1.5}
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          >
            {/* Поле с ссылкой и кнопкой копирования */}
            <CopyUrlField />

            <TextInput
              source="fileName"
              label="File"
              disabled
              fullWidth
              variant="standard"
              size="small"
              sx={{ mt: 1 }}
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="caption" color="textSecondary">
                Uploaded:
              </Typography>
              <DateField source="createdAt" showTime textAlign="right" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);
