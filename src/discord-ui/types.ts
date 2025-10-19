import type { APIMessageComponentEmoji, ButtonStyle, TextInputStyle } from "discord.js";

/**
 * Flexible color type that accepts hex strings or Discord's ColorResolvable
 */
export type FlexibleColor = number | `#${string}` | "Random" | "Default";

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
    | import("discord.js").TextInputBuilder;
}

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
  image?: string;
  images?: string[];
  fields?: EmbedField[];
}

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
  accessory?: SectionAccessory;
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
