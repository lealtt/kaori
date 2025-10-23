/**
 * Converts camelCase object keys to snake_case recursively.
 * Required for Discord API objects like author and footer.
 *
 * @example
 * ```ts
 * toSnakeCase({ iconUrl: "...", userName: "..." })
 * // Returns: { icon_url: "...", user_name: "..." }
 * ```
 */
export function toSnakeCase<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCase(v)) as T;
  }

  if (obj !== null && typeof obj === "object" && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        (acc as Record<string, unknown>)[snakeKey] = toSnakeCase(
          (obj as Record<string, unknown>)[key],
        );
        return acc;
      },
      {} as Record<string, unknown>,
    ) as T;
  }

  return obj;
}
