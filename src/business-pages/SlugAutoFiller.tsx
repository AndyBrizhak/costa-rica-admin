import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useNotify } from "react-admin";
import { slugify } from "../utils/slugify";

/**
 * Component for automatic generation and synchronization of the business slug with its name.
 * Triggers an English notification when the slug is updated automatically.
 */
export const SlugAutoFiller = () => {
  const { watch, setValue, getValues } = useFormContext();
  const notify = useNotify();

  // Observe the 'name' field
  const name = watch("name");

  // Prevent execution during initial mounting (critical for Edit mode)
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (name) {
      const newSlug = slugify(name);
      const currentSlug = getValues("slug");

      // Update only if the new slug differs from the current one
      if (newSlug !== currentSlug) {
        setValue("slug", newSlug, {
          shouldValidate: true,
          shouldDirty: true,
        });

        // Notify the manager about the automatic URL change
        notify(
          "Attention: URL slug has been automatically updated based on the name",
          {
            type: "info",
          },
        );
      }
    }
  }, [name, setValue, getValues, notify]);

  return null;
};
