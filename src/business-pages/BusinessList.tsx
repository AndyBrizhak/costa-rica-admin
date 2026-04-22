import {
  List,
  Datagrid,
  TextField,
  DateField,
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
  useUpdate,
  useRecordContext,
  useNotify,
} from "react-admin";
import { Switch, FormControlLabel, Box } from "@mui/material";
import type { BusinessRecord } from "./businessTypes";

/**
 * Интерфейс пропсов для переключателя.
 */
interface PublishToggleProps {
  label?: string;
  source: string; // Делаем обязательным, чтобы использовать в коде
}

/**
 * Универсальный компонент-переключатель для Datagrid.
 * Теперь он использует проп 'source', что делает его переиспользуемым
 * и решает проблему с неиспользуемыми переменными.
 */
const PublishToggle = ({ source }: PublishToggleProps) => {
  const record = useRecordContext<BusinessRecord>();
  const [update, { isLoading }] = useUpdate();
  const notify = useNotify();

  if (!record || !source) return null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    // Динамически берем имя поля из пропса 'source'
    update(
      "businesses",
      {
        id: record.id,
        data: { [source]: event.target.checked },
        previousData: record,
      },
      {
        onSuccess: () =>
          notify("Status updated", { type: "info", undoable: false }),
        onError: () => notify("Update failed", { type: "warning" }),
      },
    );
  };

  // Получаем текущее значение поля из записи
  const value = !!record[source as keyof BusinessRecord];

  return (
    <FormControlLabel
      control={
        <Switch
          size="small"
          checked={value}
          onChange={handleChange}
          disabled={isLoading}
          color="primary"
        />
      }
      label=""
      onClick={(e) => e.stopPropagation()}
    />
  );
};

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
    <Datagrid rowClick="show" bulkActionButtons={false}>
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

      {/* Теперь TypeScript доволен: аргументы в функции объявлены и используются */}
      <PublishToggle label="Publish" source="isPublished" />

      <DateField source="createdAt" label="Created" />
      <DateField source="updatedAt" label="Updated" />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <EditButton />
        <DeleteButton />
      </Box>
    </Datagrid>
  </List>
);
