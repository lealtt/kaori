/**
 * Discord Validators
 *
 * Validation utilities for Discord-related data
 */

/**
 * Validation result type
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate Discord ID format (17-20 digits)
 *
 * @example
 * ```ts
 * if (isValidDiscordId("123456789012345678")) {
 *   console.log("Valid Discord ID");
 * }
 * ```
 */
export function isValidDiscordId(id: string): boolean {
  return /^\d{17,20}$/.test(id);
}

/**
 * Validate hex color format
 *
 * @example
 * ```ts
 * isValidHexColor("#5865F2") // true
 * isValidHexColor("5865F2")  // true
 * isValidHexColor("#XYZ")    // false
 * ```
 */
export function isValidHexColor(hex: string): boolean {
  return /^#?[0-9A-Fa-f]{6}$/.test(hex);
}

/**
 * Validate embed field limits
 *
 * @example
 * ```ts
 * const result = validateEmbedField({
 *   name: "Field Name",
 *   value: "Field Value"
 * });
 * if (!result.valid) {
 *   console.error(result.errors);
 * }
 * ```
 */
export function validateEmbedField(field: { name: string; value: string }): ValidationResult {
  const errors: string[] = [];

  if (!field.name || field.name.trim().length === 0) {
    errors.push("Field name cannot be empty");
  } else if (field.name.length > 256) {
    errors.push(`Field name exceeds 256 characters (${field.name.length})`);
  }

  if (!field.value || field.value.trim().length === 0) {
    errors.push("Field value cannot be empty");
  } else if (field.value.length > 1024) {
    errors.push(`Field value exceeds 1024 characters (${field.value.length})`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate complete embed limits
 *
 * @example
 * ```ts
 * const result = validateEmbed({
 *   title: "My Embed",
 *   description: "Description here",
 *   fields: [{ name: "Field", value: "Value" }]
 * });
 * ```
 */
export function validateEmbed(embed: {
  title?: string;
  description?: string;
  fields?: Array<{ name: string; value: string }>;
  footer?: { text: string };
  author?: { name: string };
}): ValidationResult {
  const errors: string[] = [];

  if (embed.title && embed.title.length > 256) {
    errors.push(`Title exceeds 256 characters (${embed.title.length})`);
  }

  if (embed.description && embed.description.length > 4096) {
    errors.push(`Description exceeds 4096 characters (${embed.description.length})`);
  }

  if (embed.footer?.text && embed.footer.text.length > 2048) {
    errors.push(`Footer text exceeds 2048 characters (${embed.footer.text.length})`);
  }

  if (embed.author?.name && embed.author.name.length > 256) {
    errors.push(`Author name exceeds 256 characters (${embed.author.name.length})`);
  }

  if (embed.fields) {
    if (embed.fields.length > 25) {
      errors.push(`Too many fields (${embed.fields.length}/25)`);
    }

    embed.fields.forEach((field, index) => {
      const fieldResult = validateEmbedField(field);
      if (!fieldResult.valid) {
        errors.push(`Field ${index + 1}: ${fieldResult.errors.join(", ")}`);
      }
    });
  }

  // Total character limit check
  const totalChars =
    (embed.title?.length || 0) +
    (embed.description?.length || 0) +
    (embed.footer?.text.length || 0) +
    (embed.author?.name.length || 0) +
    (embed.fields?.reduce((sum, f) => sum + f.name.length + f.value.length, 0) || 0);

  if (totalChars > 6000) {
    errors.push(`Total embed characters exceed 6000 limit (${totalChars})`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate button label length
 *
 * @example
 * ```ts
 * if (!isValidButtonLabel("Click Me")) {
 *   console.log("Label too long!");
 * }
 * ```
 */
export function isValidButtonLabel(label: string): boolean {
  return label.length > 0 && label.length <= 80;
}

/**
 * Validate select menu option label
 *
 * @example
 * ```ts
 * if (!isValidSelectOption({ label: "Option 1", value: "opt1" })) {
 *   console.log("Invalid option!");
 * }
 * ```
 */
export function isValidSelectOption(option: {
  label: string;
  value: string;
  description?: string;
}): ValidationResult {
  const errors: string[] = [];

  if (!option.label || option.label.trim().length === 0) {
    errors.push("Option label cannot be empty");
  } else if (option.label.length > 100) {
    errors.push(`Option label exceeds 100 characters (${option.label.length})`);
  }

  if (!option.value || option.value.trim().length === 0) {
    errors.push("Option value cannot be empty");
  } else if (option.value.length > 100) {
    errors.push(`Option value exceeds 100 characters (${option.value.length})`);
  }

  if (option.description && option.description.length > 100) {
    errors.push(`Option description exceeds 100 characters (${option.description.length})`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate modal title
 *
 * @example
 * ```ts
 * if (isValidModalTitle("User Input")) {
 *   // Title is valid
 * }
 * ```
 */
export function isValidModalTitle(title: string): boolean {
  return title.length > 0 && title.length <= 45;
}

/**
 * Validate text input label
 *
 * @example
 * ```ts
 * if (isValidTextInputLabel("Enter your name")) {
 *   // Label is valid
 * }
 * ```
 */
export function isValidTextInputLabel(label: string): boolean {
  return label.length > 0 && label.length <= 45;
}
