import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  SearchInput,
  ReferenceInput,
  SelectInput,
  TopToolbar,
  CreateButton,
  EditButton,
  DeleteButton,
  FilterButton,
} from "react-admin";

/**
 * Filters for the Tag list.
 */
const TagFilters = [
  <SearchInput
    key="q"
    source="q"
    alwaysOn
    placeholder="Search by name or slug..."
  />,
  <ReferenceInput
    key="tagGroupId"
    source="tagGroupId"
    reference="tag-groups"
    alwaysOn // Теперь фильтр по группе будет виден всегда
  >
    <SelectInput label="Group" optionText="nameEn" />
  </ReferenceInput>,
];

/**
 * Custom actions for the Tag list toolbar.
 */
const TagActions = () => (
  <TopToolbar>
    <FilterButton /> {/* Добавляем кнопку управления фильтрами */}
    <CreateButton label="Add Tag" />
  </TopToolbar>
);

export const TagList = () => (
  <List
    filters={TagFilters}
    actions={<TagActions />}
    exporter={false}
    sort={{ field: "nameEn", order: "ASC" }}
    title="Tags"
  >
    <Datagrid bulkActionButtons={false}>
      <TextField source="nameEn" label="Name (EN)" />
      <TextField source="nameEs" label="Name (ES)" />
      <TextField source="slug" label="Slug (SEO)" />

      <ReferenceField
        source="tagGroupId"
        reference="tag-groups"
        label="Tag Group"
        link="edit"
      >
        <TextField source="nameEn" />
      </ReferenceField>

      <EditButton />
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
