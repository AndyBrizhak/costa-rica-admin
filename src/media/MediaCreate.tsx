import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  required,
} from "react-admin";
import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { slugify } from "../utils/slugify";

/**
 * Вспомогательный компонент для автоматической генерации слага.
 * Наблюдает за полем 'file' и обновляет 'slug', если он пуст.
 */
const SlugAutoFiller = () => {
  const { watch, setValue, getValues } = useFormContext();
  const file = watch("file");

  useEffect(() => {
    const currentSlug = getValues("slug");
    // Если файл выбран, а слаг еще не заполнен вручную
    if (file?.rawFile?.name && !currentSlug) {
      // Отрезаем расширение и преобразуем в URL-friendly формат
      const fileName = file.rawFile.name.split(".").slice(0, -1).join(".");
      setValue("slug", slugify(fileName));
    }
  }, [file, setValue, getValues]);

  return null;
};

export const MediaCreate = () => (
  <Create title="Upload New Media" resource="media">
    <SimpleForm>
      {/* Логика автозаполнения слага */}
      <SlugAutoFiller />

      <Grid container spacing={3} sx={{ width: "100%" }}>
        {/* Поле загрузки файла */}
        <Grid size={{ xs: 12 }}>
          <ImageInput
            source="file"
            label="Select Image"
            accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
            placeholder={<p>Drop a file here or click to upload</p>}
            validate={[required()]}
          >
            <ImageField source="src" title="title" />
          </ImageInput>
        </Grid>

        {/* Поля метаданных */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            source="slug"
            label="SEO Slug"
            validate={[required()]}
            fullWidth
            helperText="This will be used in the URL. Auto-generated from filename."
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextInput source="altTextEn" label="Alt Text (EN)" fullWidth />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextInput source="altTextEs" label="Alt Text (ES)" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
