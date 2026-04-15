import type { RaRecord } from "react-admin";

/**
 * Frontend-представление сущности Google Category.
 */
export interface GoogleCategoryRecord extends RaRecord {
  id: string;
  gcid: string;
  nameEn: string;
  nameEs: string;
}

/**
 * Тип для создания и обновления одной записи.
 */
export interface GoogleCategoryUpsertDto {
  gcid: string;
  nameEn: string;
  nameEs: string;
}

/**
 * Структура объекта в JSON-файле для массовой загрузки.
 */
export interface GoogleCategoryImportDto {
  gcid: string;
  nameEn: string;
  nameEs: string;
}

/**
 * Ответ бэкенда после попытки массового импорта.
 * Соответствует BulkImportResponseDto в C#.
 */
export interface BulkImportResponseDto {
  importedCount: number;
  hasConflict: boolean;
  errorMessage?: string;
  conflictType?: string; // Поле, вызвавшее конфликт (gcid, nameEn, nameEs)
}
