import type {
  APIMessageComponentEmoji,
  ButtonStyle,
  TextInputStyle,
  User,
  Role,
  Channel,
  Attachment,
} from "discord.js";

// ==================== UI TYPES ====================

/**
 * Flexible color type that accepts hex strings or Discord's ColorResolvable
 */
export type FlexibleColor = number | `#${string}` | "Random" | "Default";

// ---------- Button Types ----------

/**
 * Button content configuration with emoji or label requirement
 */
export type ButtonContent =
  | { emoji: APIMessageComponentEmoji | string; label?: string }
  | { emoji?: never; label: string };

/**
 * Options for creating a button component
 */
export type ButtonOptions = {
  disabled?: boolean;
} & (
  | { style: ButtonStyle.Link; url: string; customId?: never }
  | {
      style?: Exclude<ButtonStyle, ButtonStyle.Link>;
      customId: string;
      url?: never;
    }
) &
  ButtonContent;

/**
 * Options for quick-style buttons
 */
export type QuickButtonOptions =
  | {
      customId: string;
      label: string;
      disabled?: boolean;
      emoji?: string | APIMessageComponentEmoji;
    }
  | {
      customId: string;
      label?: string;
      disabled?: boolean;
      emoji: string | APIMessageComponentEmoji;
    };

/**
 * Options for quick-style link buttons
 */
export type QuickLinkButtonOptions =
  | { url: string; label: string; disabled?: boolean; emoji?: string | APIMessageComponentEmoji }
  | { url: string; label?: string; disabled?: boolean; emoji: string | APIMessageComponentEmoji };

// ---------- Select Menu Types ----------

/**
 * Base options for all select menu types
 */
export interface SelectMenuOptions {
  customId: string;
  placeholder?: string;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
  required?: boolean;
}

/**
 * Options for a single string select menu option
 */
export interface SelectMenuOption {
  label: string;
  value: string;
  description?: string;
  emoji?: APIMessageComponentEmoji | string;
  default?: boolean;
}

/**
 * Options for string select menus, extending the base
 */
export interface QuickStringMenuOptions extends SelectMenuOptions {
  options: SelectMenuOption[];
}

// ---------- Modal Types ----------

/**
 * Options for text input in modal
 */
export interface TextInputOptions {
  customId: string;
  label: string;
  style?: TextInputStyle;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  value?: string;
}

/**
 * Options for file upload in modal
 */
export interface FileUploadOptions {
  customId: string;
  label: string;
  description?: string;
  minValues?: number;
  maxValues?: number;
  required?: boolean;
}

/**
 * Options for creating a modal
 */
export interface ModalOptions {
  customId: string;
  title: string;
  components: (import("discord.js").LabelBuilder | import("discord.js").TextDisplayBuilder)[];
}

/**
 * Options for creating a label
 */
export interface LabelOptions {
  label: string;
  description?: string;
  component:
    | import("discord.js").StringSelectMenuBuilder
    | import("discord.js").UserSelectMenuBuilder
    | import("discord.js").RoleSelectMenuBuilder
    | import("discord.js").ChannelSelectMenuBuilder
    | import("discord.js").MentionableSelectMenuBuilder
    | import("discord.js").TextInputBuilder
    | import("discord.js").FileUploadBuilder;
}

// ---------- Embed Types ----------

/**
 * Embed author configuration with camelCase properties
 */
export interface EmbedAuthor {
  name: string;
  iconUrl?: string;
  url?: string;
}

/**
 * Embed footer configuration with camelCase properties
 */
export interface EmbedFooter {
  text: string;
  iconUrl?: string;
}

/**
 * Embed field configuration
 */
export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

/**
 * Complete embed configuration options
 */
export interface EmbedOptions {
  title?: string;
  description?: string;
  url?: string;
  color?: FlexibleColor;
  timestamp?: Date | number | string;
  author?: EmbedAuthor | string;
  footer?: EmbedFooter | string;
  thumbnail?: string;
  image?: string | string[];
  fields?: EmbedField[];
}

// ---------- V2 Component Types ----------

/**
 * Section accessory types for V2 components
 */
export interface SectionAccessory {
  button?: import("discord.js").ButtonBuilder;
  thumbnail?: import("discord.js").ThumbnailBuilder;
}

/**
 * Section options for V2 components
 */
export interface SectionOptions {
  text: string | string[];
  accessory: SectionAccessory;
}

/**
 * Media gallery item options
 */
export interface MediaGalleryItemOptions {
  url: string;
  description?: string;
  spoiler?: boolean;
}

/**
 * Thumbnail options
 */
export interface ThumbnailOptions {
  url: string;
  description?: string;
}

// ==================== UTILS TYPES ====================

// ---------- Modal Extraction Types ----------

/**
 * Field types that can be extracted from modals
 */
export type ModalFieldType = "text" | "strings" | "users" | "roles" | "channels" | "mentionables" | "files";

/**
 * Output types for each modal field type
 */
export interface ModalFieldTypeOutput {
  text: string;
  strings: readonly string[];
  users: User[];
  roles: Role[];
  channels: Channel[];
  mentionables: (User | Role)[];
  files: Attachment[];
}

/**
 * Schema for extracting modal values
 */
export type ModalSchema = Record<string, string | readonly [string, ModalFieldType]>;

/**
 * Inferred output type from modal schema
 */
export type ModalValuesOutput<T extends ModalSchema> = {
  [K in keyof T]: T[K] extends readonly [string, infer Type extends ModalFieldType]
    ? ModalFieldTypeOutput[Type]
    : string;
};

// ---------- Helper Types ----------

/**
 * Chunk array result
 */
export interface ChunkResult<T> {
  chunks: T[][];
  totalChunks: number;
}

/**
 * Permission check result
 */
export interface PermissionCheckResult {
  hasPermission: boolean;
  missing: string[];
}

/**
 * Time units for duration parsing
 */
export type TimeUnit =
  | "ms"
  | "millisecond"
  | "milliseconds"
  | "s"
  | "sec"
  | "second"
  | "seconds"
  | "m"
  | "min"
  | "minute"
  | "minutes"
  | "h"
  | "hr"
  | "hour"
  | "hours"
  | "d"
  | "day"
  | "days"
  | "w"
  | "week"
  | "weeks"
  | "mo"
  | "month"
  | "months"
  | "y"
  | "year"
  | "years";

/**
 * Parsed duration result
 */
export interface ParsedDuration {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  valid: boolean;
  original: string;
}

// ==================== FEATURES TYPES ====================

// ---------- State Management Types ----------

/**
 * Options for defining a state store
 */
export interface StateOptions<T> {
  id: string;
  maxSize?: number;
  ttl?: number;
  onExpire?: (key: string, value: T) => void;
}

/**
 * State store interface
 */
export interface StateStore<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  has(key: string): boolean;
  delete(key: string): boolean;
  clear(): void;
  size(): number;
  keys(): string[];
  values(): T[];
  entries(): [string, T][];
}

// ---------- Template Types ----------

/**
 * Template definition for components
 */
export interface Template<TData = any, TReturn = any> {
  id: string;
  render: (data: TData) => TReturn;
}
