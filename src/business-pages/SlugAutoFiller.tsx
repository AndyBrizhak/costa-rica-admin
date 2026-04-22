import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useNotify } from "react-admin";
import { slugify } from "../utils/slugify";

/**
 * Компонент для автоматической генерации и синхронизации слага с именем бизнеса.
 * При каждом изменении имени генерирует новый слаг и уведомляет об этом менеджера.
 */
export const SlugAutoFiller = () => {
  const { watch, setValue, getValues } = useFormContext();
  const notify = useNotify();

  // Отслеживаем значение имени
  const name = watch("name");

  // Флаг для предотвращения срабатывания при инициализации (важно для формы Edit)
  const isMounted = useRef(false);

  useEffect(() => {
    // Если это первый рендер, просто помечаем компонент как смонтированный и выходим
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (name) {
      const newSlug = slugify(name);
      const currentSlug = getValues("slug");

      // Обновляем только если новый слаг отличается от текущего
      if (newSlug !== currentSlug) {
        setValue("slug", newSlug, {
          shouldValidate: true,
          shouldDirty: true,
        });

        // Выводим уведомление, чтобы менеджер зафиксировал изменение URL
        notify(
          "Внимание: URL-слаг был обновлен автоматически на основе названия",
          {
            type: "info",
          },
        );
      }
    }
  }, [name, setValue, getValues, notify]);

  return null;
};
