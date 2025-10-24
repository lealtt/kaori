import type {
  ModalSubmitInteraction,
  ModalSubmitFields,
  Channel,
  Role,
  Attachment,
} from "discord.js";
import { BaseChannel } from "discord.js";
import type { ModalSchema, ModalValuesOutput, ModalFieldType } from "../types/kaori.js";

/**
 * Extracts values from a Discord modal interaction based on a schema.
 * This provides a simple, type-safe way to get text inputs, selections, and more.
 *
 * @example
 * ```ts
 * // Basic usage for text inputs
 * const { username, bio } = extractModalValues(interaction, {
 *   username: "user-form/username",
 *   bio: "user-form/bio"
 * });
 * // Returns: { username: string, bio: string }
 * ```
 *
 * @example
 * ```ts
 * // Usage with specific field types like roles and string selects
 * const { tags, roles } = extractModalValues(interaction, {
 *   tags: ["staff-apply/tags", "strings"],
 *   roles: ["staff-apply/roles", "roles"]
 * });
 * // Returns: { tags: string[], roles: Role[] }
 * ```
 *
 * @example
 * ```ts
 * // Usage with file uploads
 * const { documents } = extractModalValues(interaction, {
 *   documents: ["form/documents", "files"]
 * });
 * // Returns: { documents: Attachment[] }
 * ```
 *
 * @param interaction The ModalSubmitInteraction to extract values from
 * @param schema An object mapping field names to their customId or a [customId, type] tuple
 * @returns An object with the extracted values, with types inferred from the schema
 * @throws {Error} If the interaction has no fields
 */
export function extractModalValues<const T extends ModalSchema>(
  interaction: ModalSubmitInteraction<"raw"> | ModalSubmitInteraction,
  schema: T,
): ModalValuesOutput<T> {
  const fields = interaction.fields;

  if (!fields) {
    throw new Error("Modal fields not found");
  }

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(schema)) {
    const [customId, type] = typeof value === "string" ? [value, "text" as const] : value;

    result[key] = extractField(fields, customId, type);
  }

  return result as ModalValuesOutput<T>;
}

/**
 * Extracts a single field from modal submit fields
 */
function extractField(fields: ModalSubmitFields, customId: string, type: ModalFieldType): any {
  try {
    switch (type) {
      case "text":
        return fields.getTextInputValue(customId) ?? "";

      case "strings":
        return fields.getStringSelectValues(customId) ?? [];

      case "users": {
        const users = fields.getSelectedUsers(customId);
        return users ? Array.from(users.values()).filter(Boolean) : [];
      }

      case "roles": {
        const roles = fields.getSelectedRoles(customId);
        return roles ? Array.from(roles.values()).filter((r): r is Role => r !== null) : [];
      }

      case "channels": {
        const channels = fields.getSelectedChannels(customId);
        if (!channels) return [];
        return Array.from(channels.values()).filter((c) => c instanceof BaseChannel) as Channel[];
      }

      case "mentionables": {
        const mentionables = fields.getSelectedMentionables(customId);
        if (!mentionables) return [];

        return [
          ...Array.from(mentionables.users.values()).filter(Boolean),
          ...Array.from(mentionables.roles.values()).filter((r): r is Role => r !== null),
        ];
      }

      case "files": {
        const attachments = fields.getUploadedFiles(customId);
        return attachments
          ? Array.from(attachments.values()).filter((a): a is Attachment => a !== null)
          : [];
      }

      default:
        return "";
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    // Return default values on error
    if (type === "text") return "";
    return [];
  }
}
