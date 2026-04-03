import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
  BulkDeleteButton,
  FilterLiveSearch,
} from "react-admin";

const CityFilters = [
  <FilterLiveSearch key="q" source="Q" alwaysOn />,
  <ReferenceInput key="province" source="provinceId" reference="provinces">
    <SelectInput label="Провинция" optionText="name" />
  </ReferenceInput>,
];

const CityBulkActionButtons = () => (
  <BulkDeleteButton mutationMode="pessimistic" />
);

export const CityList = () => (
  <List filters={CityFilters} exporter={false}>
    <Datagrid rowClick="edit" bulkActionButtons={<CityBulkActionButtons />}>
      <TextField source="name" label="Название" />
      <TextField source="slug" label="Слаг" />

      <ReferenceField
        source="provinceId"
        reference="provinces"
        label="Провинция"
        sortBy="provinceName"
      >
        <TextField source="name" />
      </ReferenceField>

      <EditButton />
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
