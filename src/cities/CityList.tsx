import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
  SearchInput,
} from "react-admin";

/**
 * Фильтры для списка городов.
 * SearchInput заменяет FilterLiveSearch, чтобы избежать ошибок гидратации
 * и вложенных тегов <form>.
 */
const CityFilters = [
  // source="q" в нижнем регистре соответствует логике парсинга на бэкенде
  <SearchInput key="q" source="q" alwaysOn />,
  <ReferenceInput key="provinceId" source="provinceId" reference="provinces">
    <SelectInput label="Провинция" optionText="name" />
  </ReferenceInput>,
];

export const CityList = () => (
  <List
    filters={CityFilters}
    exporter={false}
    // Устанавливаем сортировку по умолчанию
    sort={{ field: "name", order: "ASC" }}
  >
    {/* bulkActionButtons={false} — отключает чекбоксы и панель массового удаления.
      Это стандарт для упрощения интерфейса и предотвращения случайных удалений.
    */}
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="name" label="Название" />
      <TextField source="slug" label="Слаг" />

      <ReferenceField
        source="provinceId"
        reference="provinces"
        label="Провинция"
        // Поле для сортировки на стороне сервера (обработано в CityService.cs)
        sortBy="provinceName"
      >
        <TextField source="name" />
      </ReferenceField>

      <EditButton />
      {/* mutationMode="pessimistic" гарантирует надежное удаление до обновления UI */}
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
