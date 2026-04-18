import {
  List,
  Datagrid,
  TextField,
  DateField,
  ImageField,
  SearchInput,
  BooleanInput,
  TopToolbar,
  CreateButton,
  FilterButton,
  ExportButton,
  FunctionField,
} from "react-admin";
import type { MediaRecord } from "./mediaTypes";

/**
 * Фильтры для списка медиа-ассетов.
 * Включают глобальный поиск и фильтр "Сироты".
 */
const MediaFilters = [
  <SearchInput
    key="q"
    source="q"
    alwaysOn
    placeholder="Search slug or alt text..."
  />,
  <BooleanInput key="onlyOrphans" source="onlyOrphans" label="Orphans only" />,
];

/**
 * Панель действий над списком.
 */
const MediaActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Upload Media" />
    <ExportButton />
  </TopToolbar>
);

export const MediaList = () => (
  <List
    filters={MediaFilters}
    actions={<MediaActions />}
    sort={{ field: "createdAt", order: "DESC" }}
    title="Media Library"
    resource="media"
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      {/* Превью изображения */}
      <ImageField
        source="url"
        label="Preview"
        sx={{
          "& img": {
            maxWidth: 80,
            maxHeight: 80,
            objectFit: "cover",
            borderRadius: 1,
          },
        }}
      />

      <TextField source="slug" label="SEO Slug" />

      <TextField source="fileName" label="File Name" />

      <TextField source="contentType" label="Type" />

      {/* Отображение количества связей (Usage) */}
      <FunctionField
        label="Usage"
        render={(record: MediaRecord) =>
          record.relatedBusinessIds?.length > 0
            ? `${record.relatedBusinessIds.length} pages`
            : "Orphan"
        }
      />

      <DateField source="createdAt" label="Uploaded At" showTime />
    </Datagrid>
  </List>
);
