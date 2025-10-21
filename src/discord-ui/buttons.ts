import { ButtonBuilder, ButtonStyle } from "discord.js";
import type { ButtonOptions, QuickButtonOptions, QuickLinkButtonOptions } from "../types/kaori.js";

function createButton(options: ButtonOptions): ButtonBuilder {
  const builder = new ButtonBuilder();

  if (options.style === ButtonStyle.Link) {
    if (!options.url) throw new Error("Link button requires a URL");
    builder.setStyle(ButtonStyle.Link).setURL(options.url);
  } else {
    if (!options.customId) throw new Error("Non-link button requires a customId");
    builder.setStyle(options.style ?? ButtonStyle.Primary).setCustomId(options.customId);
  }

  if (options.label) builder.setLabel(options.label);
  if (options.emoji) builder.setEmoji(options.emoji);

  if (!options.label && !options.emoji) {
    throw new Error("Button requires at least a label or an emoji");
  }

  if (options.disabled) builder.setDisabled(true);

  return builder;
}

/**
 * Quick button builders with style presets
 */
export const button = {
  /**
   * Creates a primary (blurple) button
   */
  primary(options: QuickButtonOptions): ButtonBuilder {
    return createButton({ ...options, style: ButtonStyle.Primary });
  },

  /**
   * Creates a secondary (grey) button
   */
  secondary(options: QuickButtonOptions): ButtonBuilder {
    return createButton({ ...options, style: ButtonStyle.Secondary });
  },

  /**
   * Creates a success (green) button
   */
  success(options: QuickButtonOptions): ButtonBuilder {
    return createButton({ ...options, style: ButtonStyle.Success });
  },

  /**
   * Creates a danger (red) button
   */
  danger(options: QuickButtonOptions): ButtonBuilder {
    return createButton({ ...options, style: ButtonStyle.Danger });
  },

  /**
   * Creates a link button
   */
  link(options: QuickLinkButtonOptions): ButtonBuilder {
    return createButton({ ...options, style: ButtonStyle.Link });
  },

  /**
   * Creates a premium button
   */
  premium(options: QuickButtonOptions): ButtonBuilder {
    return createButton({ ...options, style: ButtonStyle.Premium });
  },

  // Aliases
  blurple(options: QuickButtonOptions): ButtonBuilder {
    return this.primary(options);
  },

  grey(options: QuickButtonOptions): ButtonBuilder {
    return this.secondary(options);
  },

  green(options: QuickButtonOptions): ButtonBuilder {
    return this.success(options);
  },

  red(options: QuickButtonOptions): ButtonBuilder {
    return this.danger(options);
  },

  blue(options: QuickLinkButtonOptions): ButtonBuilder {
    return this.link(options);
  },
};
