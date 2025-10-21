import {
  EmbedBuilder,
  resolveColor as discordResolveColor,
  type ColorResolvable,
} from "discord.js";
import type { EmbedOptions } from "../types/kaori.js";
import { resolveColor, toSnakeCase } from "../functions/index.js";

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
 * // Embed with single image
 * embed({
 *   title: "Photo",
 *   image: "url.png"
 * })
 *
 * // Multiple images (returns array of embeds)
 * embed({
 *   title: "Gallery",
 *   image: ["url1.png", "url2.png", "url3.png"]
 * })
 * ```
 */
export function embed(options: EmbedOptions & { image: string[] }): EmbedBuilder[];
export function embed(options: EmbedOptions): EmbedBuilder;
export function embed(options: EmbedOptions): EmbedBuilder | EmbedBuilder[] {
  const { image, color, author, footer, ...rest } = options;

  // Handle multi-image gallery (when image is an array)
  if (Array.isArray(image) && image.length > 0) {
    const embeds: EmbedBuilder[] = [];
    const sharedUrl = rest.url ?? "https://discord.com";

    image.forEach((imageUrl, index) => {
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
        builder.setColor(discordResolveColor(resolveColor(color)) as ColorResolvable);
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

  // Handle single image (when image is a string)
  if (typeof image === "string") {
    builder.setImage(image);
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
    builder.setColor(discordResolveColor(resolveColor(color)) as ColorResolvable);
  }

  return builder;
}
