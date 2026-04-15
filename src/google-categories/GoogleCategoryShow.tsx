import { Show, SimpleShowLayout, TextField } from "react-admin";

/**
 * Компонент для детального просмотра категории Google.
 * Используется вместо формы редактирования для обеспечения целостности данных.
 */
export const GoogleCategoryShow = () => (
  <Show title="Google Category Details">
    <SimpleShowLayout>
      <TextField source="id" label="System ID" />
      <TextField source="gcid" label="Google Category ID (GCID)" />
      <TextField source="nameEn" label="Name (EN)" />
      <TextField source="nameEs" label="Name (ES)" />
    </SimpleShowLayout>
  </Show>
);
