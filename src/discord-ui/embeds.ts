import { EmbedBuilder, resolveColor, type ColorResolvable } from "discord.js";
import type { EmbedOptions } from "./types.js";
import { toSnakeCase } from "./utils.js";

/**
 * Creates an embed with a fluent, developer-friendly API
 *
 * @example
 * ```ts
 * // Simple embed
 * embed({
 *   title: "Hello World",
 *   description: "This is a test",
 *   color: "#5865F2"
 * })
 *
 * // Embed with fields
 * embed({
 *   title: "User Info",
 *   fields: [
 *     { name: "Username", value: "John", inline: true },
 *     { name: "ID", value: "123", inline: true }
 *   ]
 * })
 *
 * // Multiple images (returns array of embeds)
 * embed({
 *   title: "Gallery",
 *   images: ["url1.png", "url2.png", "url3.png"]
 * })
 * ```
 */
export function embed(options: EmbedOptions & { images: string[] }): EmbedBuilder[];
export function embed(options: EmbedOptions): EmbedBuilder;
export function embed(options: EmbedOptions): EmbedBuilder | EmbedBuilder[] {
  const { images, color, author, footer, ...rest } = options;

  // Handle multi-image gallery
  if (Array.isArray(images) && images.length > 0) {
    const embeds: EmbedBuilder[] = [];
    const sharedUrl = rest.url ?? "https://discord.com";

    images.forEach((imageUrl, index) => {
      const builder = new EmbedBuilder();

      // First embed gets all the content
      if (index === 0) {
        if (rest.title) builder.setTitle(rest.title);
        if (rest.description) builder.setDescription(rest.description);
        if (rest.fields) builder.addFields(...rest.fields);
        if (rest.timestamp) {
          const timestamp =
            rest.timestamp instanceof Date ? rest.timestamp : new Date(rest.timestamp);
          builder.setTimestamp(timestamp);
        }

        if (author) {
          if (typeof author === "string") {
            builder.setAuthor({ name: author });
          } else {
            builder.setAuthor(toSnakeCase(author));
          }
        }

        if (footer) {
          if (typeof footer === "string") {
            builder.setFooter({ text: footer });
          } else {
            builder.setFooter(toSnakeCase(footer));
          }
        }
      }

      builder.setURL(sharedUrl);
      builder.setImage(imageUrl);

      if (color) {
        builder.setColor(resolveColor(color) as ColorResolvable);
      }

      embeds.push(builder);
    });

    return embeds;
  }

  // Single embed
  const builder = new EmbedBuilder();

  if (rest.title) builder.setTitle(rest.title);
  if (rest.description) builder.setDescription(rest.description);
  if (rest.url) builder.setURL(rest.url);
  if (rest.thumbnail) builder.setThumbnail(rest.thumbnail);
  if (rest.fields) builder.addFields(...rest.fields);

  if (typeof images === "string") {
    builder.setImage(images);
  } else if (rest.image) {
    builder.setImage(rest.image);
  }

  if (rest.timestamp) {
    const timestamp = rest.timestamp instanceof Date ? rest.timestamp : new Date(rest.timestamp);
    builder.setTimestamp(timestamp);
  }

  if (author) {
    if (typeof author === "string") {
      builder.setAuthor({ name: author });
    } else {
      builder.setAuthor(toSnakeCase(author));
    }
  }

  if (footer) {
    if (typeof footer === "string") {
      builder.setFooter({ text: footer });
    } else {
      builder.setFooter(toSnakeCase(footer));
    }
  }

  if (color) {
    builder.setColor(resolveColor(color) as ColorResolvable);
  }

  return builder;
}

/**
 * Predefined color palette for quick access
 */
export const colors = {
  primary: 0x5865f2,
  success: 0x57f287,
  warning: 0xfee75c,
  danger: 0xed4245,
  info: 0x3498db,
  blurple: 0x5865f2,
  green: 0x57f287,
  yellow: 0xfee75c,
  fuchsia: 0xeb459e,
  red: 0xed4245,
  white: 0xffffff,
  black: 0x000000,
} as const;
