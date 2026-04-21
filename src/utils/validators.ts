/**
 * Валидатор для проверки соответствия строки формату SEO-слага (Google recommendations).
 */
export const isSlug = (value: string): string | undefined => {
  if (!value) return undefined;

  // Регулярное выражение: только строчные латинские буквы, цифры и одиночные дефисы.
  // Запрещены дефисы в начале и конце.
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  return slugRegex.test(value)
    ? undefined
    : "Invalid format: use only lowercase letters, numbers, and single hyphens (e.g., 'my-image-1')";
};
