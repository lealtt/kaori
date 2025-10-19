import type { FlexibleColor } from "./types.js";

/**
 * Converts flexible color formats (hex, names) to Discord's number format.
 */
export function resolveColor(color: FlexibleColor): number {
  if (typeof color === "number") {
    return color;
  }

  if (typeof color === "string") {
    // Handle hex colors
    if (color.startsWith("#")) {
      const hex = color.slice(1);
      if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
        return parseInt(hex, 16);
      }
    }

    // Handle named colors (Random, Default, etc)
    return color as any;
  }

  return color as any;
}

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
