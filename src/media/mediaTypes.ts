import type { RaRecord } from "react-admin";

/**
 * Интерфейс медиа-ассета, соответствующий MediaAssetResponseDto.
 */
export interface MediaRecord extends RaRecord {
  id: string;
  slug: string;
  fileName: string;
  contentType: string;
  altTextEn: string | null;
  altTextEs: string | null;
  url: string;
  createdAt: string;
  relatedBusinessIds: string[];
}

/**
 * Данные для обновления метаданных (SEO) существующего ассета.
 */
export interface MediaUpdateDto {
  slug: string;
  altTextEn: string | null;
  altTextEs: string | null;
}

/**
 * Данные для загрузки нового ассета.
 * React Admin ImageInput передает объект, содержащий сырой файл.
 */
export interface MediaUploadDto extends MediaUpdateDto {
  file: {
    rawFile: File;
    src?: string;
    title?: string;
  };
}
