import type { RaRecord } from "react-admin";

/**
 * Интерфейс, описывающий структуру данных провинции (Read).
 * Расширяет RaRecord для полной совместимости с react-admin.
 */
export interface ProvinceRecord extends RaRecord {
  id: string;
  name: string;
  slug: string;
}

/**
 * Тип для данных, отправляемых при создании или обновлении (Upsert).
 */
export interface ProvinceUpsertDto {
  name: string;
  slug: string;
}
