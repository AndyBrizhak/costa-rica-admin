import { useState, useEffect } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  required,
  Toolbar,
  SaveButton,
  ListButton,
  useDataProvider,
  useNotify,
  useRedirect,
} from "react-admin";
import {
  Grid,
  Box,
  Typography,
  Divider,
  Tabs,
  Tab,
  LinearProgress,
  Button,
} from "@mui/material";
import {
  useFormContext,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { slugify } from "../utils/slugify";
import { isSlug } from "../utils/validators";

interface RaFileObject {
  rawFile: File;
  src?: string;
  title?: string;
}

interface SingleUploadValues extends FieldValues {
  title: string;
  slug: string;
  altTextEn: string;
  altTextEs: string;
  file: RaFileObject;
}

interface BulkUploadValues extends FieldValues {
  baseTitle: string;
  baseSlug: string;
  files: RaFileObject[];
}

/**
 * Тулбар с кнопками Save и Cancel для обеих форм
 */
const TopFormToolbar = () => (
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      minHeight: "auto",
      p: 1,
      mb: 1,
      backgroundColor: "transparent",
    }}
  >
    <Box sx={{ display: "flex", gap: 1 }}>
      <SaveButton label="Save" size="small" />
      <ListButton
        label="Cancel"
        size="small"
        variant="outlined"
        color="error"
      />
    </Box>
  </Toolbar>
);

/**
 * Автоматизация для одиночной загрузки: Title -> Slug -> Alt Text
 */
const MediaFormAutomator = () => {
  const { watch, setValue } = useFormContext<SingleUploadValues>();
  const title = watch("title");
  const slug = watch("slug");

  useEffect(() => {
    if (title) {
      setValue("slug", slugify(title), { shouldValidate: true });
    }
  }, [title, setValue]);

  useEffect(() => {
    if (slug) {
      const humanized = slug.replace(/-/g, " ");
      const capitalized =
        humanized.charAt(0).toUpperCase() + humanized.slice(1);
      setValue("altTextEn", capitalized);
    }
  }, [slug, setValue]);

  return null;
};

/**
 * Автоматизация для массовой загрузки: Base Title -> Base Slug
 */
const BulkFormAutomator = () => {
  const { watch, setValue } = useFormContext<BulkUploadValues>();
  const baseTitle = watch("baseTitle");

  useEffect(() => {
    if (baseTitle) {
      setValue("baseSlug", slugify(baseTitle), { shouldValidate: true });
    }
  }, [baseTitle, setValue]);

  return null;
};

const SingleUploadForm = () => (
  <Box mt={0.5}>
    <MediaFormAutomator />
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="caption" fontWeight="bold" color="primary">
          NAME & SEO
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <TextInput
          source="title"
          label="Title"
          fullWidth
          autoFocus
          size="small"
        />
        <TextInput
          source="slug"
          label="Slug"
          validate={[required(), isSlug]}
          fullWidth
          size="small"
        />
        <Grid container spacing={1} sx={{ mt: 0.5 }}>
          <Grid size={{ xs: 6 }}>
            <TextInput
              source="altTextEn"
              label="Alt EN"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextInput
              source="altTextEs"
              label="Alt ES"
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="caption" fontWeight="bold" color="grey.600">
          FILE
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <ImageInput source="file" label="" validate={[required()]}>
          <ImageField
            source="src"
            sx={{
              "& img": {
                maxWidth: "100%",
                maxHeight: "100px",
                objectFit: "contain",
              },
            }}
          />
        </ImageInput>
      </Grid>
    </Grid>
  </Box>
);

const BulkUploadForm = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleBulkSubmit: SubmitHandler<BulkUploadValues> = async (values) => {
    const { baseSlug, files } = values;
    if (!files || files.length === 0) return;
    setLoading(true);
    let done = 0;
    for (const fileObj of files) {
      try {
        const suffix = Math.random().toString(36).substring(2, 6);
        const finalSlug = `${baseSlug}-${suffix}`;
        const humanized = baseSlug.replace(/-/g, " ");
        const finalAlt = humanized.charAt(0).toUpperCase() + humanized.slice(1);

        await dataProvider.create("media", {
          data: {
            slug: finalSlug,
            altTextEn: finalAlt,
            altTextEs: "",
            file: fileObj,
          },
        });
        done++;
        setProgress(Math.round((done / files.length) * 100));
      } catch {
        notify(`Upload failed`, { type: "error" });
      }
    }
    setLoading(false);
    notify(`Uploaded ${done} assets`, { type: "info" });
    redirect("list", "media");
  };

  return (
    <SimpleForm
      onSubmit={handleBulkSubmit as (v: FieldValues) => Promise<void>}
      toolbar={
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "auto",
            p: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              size="small"
            >
              {loading ? `Uploading ${progress}%` : "Upload All"}
            </Button>
            <ListButton
              label="Cancel"
              size="small"
              variant="outlined"
              color="error"
            />
          </Box>
        </Toolbar>
      }
    >
      <BulkFormAutomator />
      <Grid container spacing={1} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="caption" fontWeight="bold" color="primary">
            BULK CONFIG
          </Typography>
          <Grid container spacing={1}>
            <Grid size={{ xs: 6 }}>
              <TextInput
                source="baseTitle"
                label="Base Title"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextInput
                source="baseSlug"
                label="Base Slug"
                validate={[required(), isSlug]}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="caption"
            fontWeight="bold"
            color="grey.600"
            sx={{ mt: 1, display: "block" }}
          >
            MEDIA SELECTION
          </Typography>
          <ImageInput
            source="files"
            label=""
            multiple
            validate={[required()]}
            sx={{
              "& .RaImageInput-dropZone": {
                backgroundColor: "#fcfcfc",
                border: "1px dashed #ccc",
                minHeight: "40px",
                py: 1,
              },
              "& .ra-input-files-list": {
                display: "flex",
                flexWrap: "wrap",
                gap: "1px",
                mt: 0.5,
              },
            }}
          >
            <ImageField
              source="src"
              sx={{
                "& img": { width: "60px", height: "60px", objectFit: "cover" },
              }}
            />
          </ImageInput>
        </Grid>
      </Grid>
      {loading && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ width: "100%", mt: 1 }}
        />
      )}
    </SimpleForm>
  );
};

export const MediaCreate = () => {
  const [tab, setTab] = useState(0);

  return (
    <Create title="Add Media" resource="media">
      <Box sx={{ width: "100%", p: 0.5 }}>
        <Tabs
          value={tab}
          onChange={(_, v: number) => setTab(v)}
          sx={{
            minHeight: "auto",
            "& .MuiTab-root": { py: 0.5, minHeight: "auto" },
          }}
        >
          <Tab label="Single" />
          <Tab label="Bulk" />
        </Tabs>
        <Box mt={1}>
          {tab === 0 ? (
            <SimpleForm toolbar={<TopFormToolbar />}>
              <SingleUploadForm />
            </SimpleForm>
          ) : (
            <BulkUploadForm />
          )}
        </Box>
      </Box>
    </Create>
  );
};
