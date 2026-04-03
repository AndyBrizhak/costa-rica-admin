import type { RaRecord } from "react-admin";

/**
 * Frontend-представление сущности City.
 * Соответствует CityResponseDto из .NET бэкенда.
 */
export interface CityRecord extends RaRecord {
  id: string;
  name: string;
  slug: string;
  provinceId: string;
  // Поле из Include(c => c.Province) в бэкенде
  provinceName?: string;
}

/**
 * Тип для создания/обновления города.
 * Соответствует CityUpsertDto.
 */
export interface CityUpsertDto {
  name: string;
  slug: string;
  provinceId: string;
}
