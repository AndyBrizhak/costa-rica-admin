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
import { useFormContext, type FieldValues } from "react-hook-form";
import { slugify } from "../utils/slugify";
import { isSlug } from "../utils/validators";

interface RaFileObject {
  rawFile: File;
  src?: string;
  title?: string;
}

interface SingleUploadValues extends FieldValues {
  slug: string;
  altTextEn: string;
  altTextEs: string;
  file: RaFileObject;
}

interface BulkUploadValues extends FieldValues {
  baseSlug: string;
  files: RaFileObject[];
}

const MediaFormAutomator = () => {
  const { watch, setValue, getValues } = useFormContext<SingleUploadValues>();
  const file = watch("file");
  const slug = watch("slug");

  useEffect(() => {
    const currentSlug = getValues("slug");
    if (file?.rawFile?.name && !currentSlug) {
      const fileName = file.rawFile.name.split(".").slice(0, -1).join(".");
      setValue("slug", slugify(fileName));
    }
  }, [file, setValue, getValues]);

  useEffect(() => {
    const currentAltEn = getValues("altTextEn");
    if (slug && !currentAltEn) {
      const humanized = slug.replace(/-/g, " ");
      const capitalized =
        humanized.charAt(0).toUpperCase() + humanized.slice(1);
      setValue("altTextEn", capitalized);
    }
  }, [slug, setValue, getValues]);

  return null;
};

const SingleUploadForm = () => (
  <Box mt={0.5}>
    <MediaFormAutomator />
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="caption" fontWeight="bold" color="primary">
          SEO & SLUG
        </Typography>
        <TextInput
          source="slug"
          label="Slug"
          validate={[required(), isSlug]}
          fullWidth
          autoFocus
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

  const handleBulkSubmit = async (values: BulkUploadValues) => {
    const { baseSlug, files } = values;
    if (!files || files.length === 0) return;
    setLoading(true);
    let done = 0;
    for (const fileObj of files) {
      try {
        const suffix = Math.random().toString(36).substring(2, 6);
        const finalSlug = `${slugify(baseSlug)}-${suffix}`;
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
        <Toolbar sx={{ minHeight: "auto", p: 1, mt: 1 }}>
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            size="small"
          >
            {loading ? `Uploading ${progress}%` : "Start Bulk Upload"}
          </Button>
        </Toolbar>
      }
    >
      <Grid container spacing={1} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12 }}>
          <Box mb={0.5}>
            <Typography variant="caption" fontWeight="bold" color="primary">
              COMMON CONFIG
            </Typography>
            <Divider />
          </Box>
          <TextInput
            source="baseSlug"
            label="Base Slug"
            validate={[required(), isSlug]}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box mb={0.5} mt={1}>
            <Typography variant="caption" fontWeight="bold" color="grey.600">
              MEDIA SELECTION
            </Typography>
            <Divider />
          </Box>
          <ImageInput
            source="files"
            label="Drop files"
            multiple
            validate={[required()]}
            sx={{
              "& .RaImageInput-dropZone": {
                backgroundColor: "#fcfcfc",
                border: "1px dashed #ccc",
                padding: "8px",
                minHeight: "60px",
              },
              "& .ra-input-files-list": {
                display: "flex",
                flexWrap: "wrap",
                gap: "2px",
                mt: 1,
              },
            }}
          >
            <ImageField
              source="src"
              sx={{
                "& img": {
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "2px",
                },
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
            <SimpleForm
              toolbar={
                <Toolbar sx={{ p: 1 }}>
                  <SaveButton label="Save" size="small" />
                </Toolbar>
              }
            >
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
