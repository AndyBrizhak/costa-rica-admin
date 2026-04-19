import type { RaRecord } from "react-admin";

/**
 * Географические координаты.
 * Соответствует GeoPointDto в .NET.
 */
export interface GeoPoint {
  latitude: number;
  longitude: number;
}

/**
 * Контактная информация (JSONB).
 * Соответствует классу BusinessContacts.
 */
export interface BusinessContacts {
  facebook?: string;
  instagram?: string;
  phoneCallable?: number;
  phoneWhatsapp?: number;
  ownerName?: string;
}

/**
 * Интервал рабочего времени.
 */
export interface ScheduleInterval {
  start: string; // Формат "HH:mm"
  end: string; // Формат "HH:mm"
}

/**
 * Элемент расписания для группы дней.
 * Соответствует классу ScheduleDay.
 */
export interface ScheduleDay {
  days: number[]; // 0 = Sunday, 1 = Monday...
  intervals: ScheduleInterval[];
}

/**
 * Настройки Hreflang для SEO.
 */
export interface ManualHreflang {
  languageCode: string;
  url: string;
}

/**
 * Настройки SEO (JSONB).
 * Соответствует классу BusinessSeoSettings.
 */
export interface BusinessSeo {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  noIndex: boolean;
  noFollow: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogType: string;
  ogImageId?: string;
  hreflangs: ManualHreflang[];
  schemaType?: string;
  priceRange?: string;
}

/**
 * Основной интерфейс записи BusinessPage (Read).
 * Соответствует BusinessPageResponseDto.
 */
export interface BusinessRecord extends RaRecord {
  id: string;
  isPublished: boolean;
  name: string;
  slug: string;
  oldSlugs: string[];
  languageCode: string;
  description?: string;
  provinceId: string;
  provinceName?: string;
  cityId?: string;
  cityName?: string;
  location: GeoPoint;
  primaryCategoryId?: string;
  primaryCategoryName?: string;
  secondaryCategories: Array<{ id: string; nameEn: string; nameEs: string }>;
  contacts: BusinessContacts;
  schedule: ScheduleDay[];
  seo: BusinessSeo;
  tags: Array<{ id: string; nameEn: string; nameEs: string }>;
  media: Array<{ id: string; url: string; slug: string }>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Данные для создания/обновления (Write).
 * Соответствует BusinessPageUpsertDto.
 */
export interface BusinessUpsert {
  name: string;
  slug?: string;
  isPublished: boolean;
  languageCode: string;
  description?: string;
  provinceId: string;
  cityId?: string;
  primaryCategoryId?: string;
  secondaryCategoryIds: string[];
  location: GeoPoint;
  contacts: BusinessContacts;
  schedule: ScheduleDay[];
  seo: BusinessSeo;
  tagIds: string[];
  mediaIds: string[];
}
