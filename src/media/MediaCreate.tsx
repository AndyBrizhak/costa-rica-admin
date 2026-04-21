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
  Button 
} from "@mui/material";
// Исправлено: использование type-only импорта для FieldValues
import { useFormContext, type FieldValues } from "react-hook-form";
import { slugify } from "../utils/slugify";
import { isSlug } from "../utils/validators";

/**
 * Interface for the file structure returned by React Admin's ImageInput.
 */
interface RaFileObject {
  rawFile: File;
  src?: string;
  title?: string;
}

/**
 * Interface for Single Upload form fields.
 */
interface SingleUploadValues extends FieldValues {
  slug: string;
  altTextEn: string;
  altTextEs: string;
  file: RaFileObject;
}

/**
 * Interface for Bulk Upload form fields.
 */
interface BulkUploadValues extends FieldValues {
  baseSlug: string;
  files: RaFileObject[];
}

/**
 * Automator for Single Upload.
 */
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
      const capitalized = humanized.charAt(0).toUpperCase() + humanized.slice(1);
      setValue("altTextEn", capitalized);
    }
  }, [slug, setValue, getValues]);

  return null;
};

const SingleUploadForm = () => (
  <Box mt={1}>
    <MediaFormAutomator />
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Box mb={1}>
          <Typography variant="subtitle2" color="primary" fontWeight="bold">1. SEO & AUTOMATION</Typography>
          <Divider />
        </Box>
        <TextInput source="slug" label="SEO Slug" validate={[required(), isSlug]} fullWidth autoFocus size="small" />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="altTextEn" label="Alt English" fullWidth multiline rows={2} size="small" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="altTextEs" label="Alt Spanish" fullWidth multiline rows={2} size="small" />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Box mb={1}>
          <Typography variant="subtitle2" color="grey.600" fontWeight="bold">2. FILE PREVIEW</Typography>
          <Divider />
        </Box>
        <ImageInput source="file" label="Drop Image" validate={[required()]}>
          <ImageField source="src" sx={{ '& img': { maxWidth: '100%', maxHeight: '160px', objectFit: 'contain' } }} />
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

        await dataProvider.create('media', {
          data: {
            slug: finalSlug,
            altTextEn: finalAlt,
            altTextEs: '',
            file: fileObj
          }
        });
        done++;
        setProgress(Math.round((done / files.length) * 100));
      } catch {
        notify(`Failed to upload ${fileObj.title || 'asset'}`, { type: 'error' });
      }
    }

    setLoading(false);
    notify(`Successfully processed ${done} assets`, { type: 'info' });
    redirect('list', 'media');
  };

  return (
    <SimpleForm 
      onSubmit={handleBulkSubmit as (values: FieldValues) => Promise<void>}
      toolbar={
        <Toolbar sx={{ justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? `Uploading... ${progress}%` : 'Upload All'}
          </Button>
        </Toolbar>
      }
    >
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box mb={1}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">1. BULK CONFIG</Typography>
            <Divider />
          </Box>
          <TextInput source="baseSlug" label="Base Slug" validate={[required(), isSlug]} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box mb={1}>
            <Typography variant="subtitle2" color="grey.600" fontWeight="bold">2. SELECT IMAGES</Typography>
            <Divider />
          </Box>
          <ImageInput source="files" label="Select Multiple" multiple validate={[required()]}>
             <ImageField source="src" sx={{ '& img': { maxWidth: '100%', maxHeight: '80px' } }} />
          </ImageInput>
        </Grid>
      </Grid>
      {loading && <LinearProgress variant="determinate" value={progress} sx={{ width: '100%', mt: 2 }} />}
    </SimpleForm>
  );
};

export const MediaCreate = () => {
  const [tab, setTab] = useState(0);

  return (
    <Create title="Media Library: New Asset" resource="media">
      <Box sx={{ width: '100%' }}>
        <Tabs value={tab} onChange={(_, v: number) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
          <Tab label="Single" />
          <Tab label="Bulk (Auto-Suffix)" />
        </Tabs>

        {tab === 0 ? (
          <SimpleForm toolbar={<Toolbar><SaveButton label="Save Asset" /></Toolbar>}>
            <SingleUploadForm />
          </SimpleForm>
        ) : (
          <BulkUploadForm />
        )}
      </Box>
    </Create>
  );
};
