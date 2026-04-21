import {
  List,
  Datagrid,
  TextField,
  DateField,
  ImageField,
  SearchInput,
  TopToolbar,
  CreateButton,
  ExportButton,
  DeleteButton,
} from "react-admin";

const MediaFilters = [
  <SearchInput key="q" source="q" alwaysOn placeholder="Search slug..." />,
];

const MediaActions = () => (
  <TopToolbar sx={{ minHeight: "auto", mb: 1 }}>
    <CreateButton label="Upload" size="small" />
    <ExportButton size="small" />
  </TopToolbar>
);

/**
 * Media List: High-Density Refactoring
 * - Vertical: size="small" + 4px padding
 * - Horizontal: 40px thumbnails + icon-only actions
 * - UI Language: English Only
 */
export const MediaList = () => (
  <List
    filters={MediaFilters}
    actions={<MediaActions />}
    sort={{ field: "createdAt", order: "DESC" }}
    title="Media"
    resource="media"
    sx={{ mt: 0 }}
  >
    <Datagrid
      rowClick="edit"
      bulkActionButtons={false}
      size="small" // MUI standard small
      sx={{
        "& .MuiTableCell-root": {
          padding: "4px 8px", // Ultra-tight spacing
        },
        "& .MuiTypography-root": {
          fontSize: "0.85rem", // Slightly smaller text
        },
      }}
    >
      {/* Tiny Thumbnail Preview */}
      <ImageField
        source="url"
        label="Img"
        sx={{
          "& img": {
            width: 40,
            height: 40,
            objectFit: "cover",
            borderRadius: 0.5,
          },
        }}
      />

      {/* Main Identifier */}
      <TextField source="slug" label="Slug" />

      {/* Tech info: compressed labels and content */}
      <TextField
        source="contentType"
        label="Type"
        sx={{ color: "text.secondary" }}
      />

      {/* Minimal Date View */}
      <DateField source="createdAt" label="Date" showTime={false} />

      {/* Minimal Action: Icon Only */}
      <DeleteButton
        label=""
        mutationMode="pessimistic"
        redirect={false}
        sx={{ p: 0.5 }}
      />
    </Datagrid>
  </List>
);
