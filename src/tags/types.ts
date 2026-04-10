import type { RaRecord } from "react-admin";

/**
 * Универсальный интерфейс записи (Record).
 * Используется для отображения данных в списках и формах.
 */
export interface Record extends RaRecord {
  id: string; // UUID тега
  nameEn: string; // Название (EN)
  nameEs: string; // Название (ES)
  slug: string; // Уникальный SEO-слаг
  tagGroupId: string; // ID родительской группы
  tagGroupName?: string; // Название группы (приходит из Join на бэкенде)
}

/**
 * Тип данных для создания и обновления (UpsertDto).
 * Описывает структуру данных, отправляемых на сервер.
 */
export interface UpsertDto {
  nameEn: string;
  nameEs: string;
  slug: string;
  tagGroupId: string;
}
