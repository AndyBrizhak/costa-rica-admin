import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  SearchInput,
  ReferenceInput,
  AutocompleteInput,
  BooleanInput,
  EditButton,
  DeleteButton,
  TopToolbar,
  FilterButton,
  CreateButton,
  ExportButton,
} from "react-admin";
import { Box } from "@mui/material";

/**
 * Панель фильтров.
 */
const BusinessFilters = [
  <SearchInput
    key="q"
    source="q"
    alwaysOn
    placeholder="Search name or slug..."
  />,

  <ReferenceInput key="province" source="provinceId" reference="provinces">
    <AutocompleteInput optionText="name" label="Province" />
  </ReferenceInput>,

  <ReferenceInput key="city" source="cityId" reference="cities">
    <AutocompleteInput optionText="name" label="City" />
  </ReferenceInput>,

  <ReferenceInput key="tags" source="tagIds" reference="tags">
    <AutocompleteInput optionText="nameEn" label="Tag" />
  </ReferenceInput>,

  <BooleanInput
    key="isPublished"
    source="isPublished"
    label="Published Only"
  />,
];

/**
 * Кастомная панель действий.
 */
const BusinessActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Add Business" />
    <ExportButton />
  </TopToolbar>
);

export const BusinessList = () => (
  <List
    filters={BusinessFilters}
    actions={<BusinessActions />}
    sort={{ field: "createdAt", order: "DESC" }}
    title="Business Directory"
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="name" label="Name" />
      <TextField source="slug" label="URL Slug" />

      <ReferenceField
        source="provinceId"
        reference="provinces"
        label="Province"
        link={false}
      >
        <TextField source="name" />
      </ReferenceField>

      <BooleanField source="isPublished" label="Live" />

      <DateField source="createdAt" label="Created" showTime />
      <DateField source="updatedAt" label="Updated" showTime />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <EditButton />
        <DeleteButton
          mutationMode="pessimistic"
          confirmTitle="Delete Business Page"
          confirmContent="Are you sure you want to delete this business? This action cannot be undone."
        />
      </Box>
    </Datagrid>
  </List>
);
