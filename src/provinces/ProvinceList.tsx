import type { RaRecord } from "react-admin";

/**
 * Интерфейс, описывающий структуру данных провинции.
 * Соответствует ProvinceResponseDto на бэкенде.
 */
export interface ProvinceRecord extends RaRecord {
  id: string; // Guid на бэкенде представлен строкой во фронтенде
  name: string;
  slug: string;
}
