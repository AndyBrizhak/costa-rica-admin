import type { RaRecord } from "react-admin";

/**
 * Интерфейс, описывающий Группу Тегов в системе.
 * Расширяет RaRecord, чтобы React Admin понимал, что у объекта есть 'id'.
 */
export interface TagGroupRecord extends RaRecord {
  id: string; // UUID из бэкенда
  nameEn: string; // Название на английском
  nameEs: string; // Название на испанском
  slug: string; // Уникальный SEO-слаг
}

/**
 * Тип данных для операций создания и обновления (Upsert).
 * Содержит только те поля, которые мы отправляем на сервер.
 */
export interface TagGroupUpsertDto {
  nameEn: string;
  nameEs: string;
  slug: string;
}
