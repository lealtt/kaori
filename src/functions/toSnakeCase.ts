/**
 * Converts camelCase object keys to snake_case recursively.
 * Required for Discord API objects like author and footer.
 */
export function toSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCase(v));
  }

  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      (acc as any)[snakeKey] = toSnakeCase(obj[key]);
      return acc;
    }, {});
  }

  return obj;
}
