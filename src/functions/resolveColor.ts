import type { FlexibleColor } from "../types/kaori.js";

/**
 * Converts flexible color formats (hex, names) to Discord's number format.
 */

export function resolveColor(color: FlexibleColor): number | "Random" | "Default" {
  if (typeof color === "number") {
    return color;
  }

  if (typeof color === "string") {
    if (color.startsWith("#")) {
      const hex = color.slice(1);
      if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
        return parseInt(hex, 16);
      }
      return 0;
    }

    if (color === "Random" || color === "Default") {
      return color;
    }

    return 0;
  }

  return 0;
}
