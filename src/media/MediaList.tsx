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
  DeleteButton,
} from "react-admin";
import type { MediaRecord } from "./mediaTypes";

/**
 * Filter configurations for the Media Library list.
 * All labels and placeholders are strictly in English.
 */
const MediaFilters = [
  <SearchInput
    key="q"
    source="q"
    alwaysOn
    placeholder="Search by slug or alt..."
  />,
  <BooleanInput key="onlyOrphans" source="onlyOrphans" label="Orphans only" />,
];

/**
 * Global actions for the Media list.
 */
const MediaActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Upload Media" />
    <ExportButton />
  </TopToolbar>
);

/**
 * Media Library List Component.
 * * REFACTORING LOG:
 * 1. Removed ID (GUID) column to reduce technical clutter.
 * 2. Removed fileName column as requested.
 * 3. Switched all labels, placeholders, and titles to English.
 * 4. Implemented inline DeleteButton with pessimistic mutation mode.
 */
export const MediaList = () => (
  <List
    filters={MediaFilters}
    actions={<MediaActions />}
    sort={{ field: "createdAt", order: "DESC" }}
    title="Media Library"
    resource="media"
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      {/* Thumbnail Preview */}
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

      {/* Primary SEO Identifier */}
      <TextField source="slug" label="SEO Slug" />

      {/* Media MIME Type */}
      <TextField source="contentType" label="Type" />

      {/* Business Associations Count */}
      <FunctionField
        label="Usage"
        render={(record: MediaRecord) => record.relatedBusinessIds?.length || 0}
      />

      {/* Upload Timestamp */}
      <DateField source="createdAt" label="Uploaded" />

      {/* Immediate Delete Action */}
      <DeleteButton
        label="Delete"
        mutationMode="pessimistic"
        redirect={false}
      />
    </Datagrid>
  </List>
);
