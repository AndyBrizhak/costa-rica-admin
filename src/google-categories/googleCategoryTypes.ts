import type { RaRecord } from "react-admin";

/**
 * Frontend-представление сущности Google Category.
 * Соответствует GoogleCategoryResponseDto из .NET бэкенда.
 */
export interface GoogleCategoryRecord extends RaRecord {
  id: string; // Guid
  gcid: string; // Google Category ID (напр. "restaurant")
  nameEn: string;
  nameEs: string;
}

/**
 * Тип для создания и обновления Google категории.
 * Соответствует GoogleCategoryUpsertDto из .NET бэкенда.
 */
export interface GoogleCategoryUpsertDto {
  gcid: string;
  nameEn: string;
  nameEs: string;
}
