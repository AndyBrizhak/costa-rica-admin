import type { FC } from "react";
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

/**
 * Фильтры списка городов:
 * 1. Живой поиск 'Q' (по названию и слагу города, а также по имени провинции).
 * 2. Выпадающий список для фильтрации по конкретной провинции.
 */
const CityFilters = [
  <FilterLiveSearch key="q" source="Q" alwaysOn />,
  <ReferenceInput key="province" source="provinceId" reference="provinces">
    <SelectInput label="Провинция" optionText="name" />
  </ReferenceInput>,
];

/**
 * Кнопки массовых операций (в режиме pessimistic для надежности данных).
 */
const CityBulkActionButtons = () => (
  <BulkDeleteButton mutationMode="pessimistic" />
);

export const CityList: FC = () => (
  <List filters={CityFilters} exporter={false}>
    <Datagrid rowClick="edit" bulkActionButtons={<CityBulkActionButtons />}>
      <TextField source="name" label="Название" />
      <TextField source="slug" label="Слаг" />

      {/* Сортировка по провинции: 
          Используем sortBy="provinceName", так как наш CityService на бэкенде 
          уже умеет обрабатывать это поле для OrderBy.
      */}
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
