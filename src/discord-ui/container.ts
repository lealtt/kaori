import {
  ActionRowBuilder,
  ContainerBuilder,
  FileBuilder,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  SectionBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  TextDisplayBuilder,
  ThumbnailBuilder,
  type MessageActionRowComponentBuilder,
} from "discord.js";
import type {
  FlexibleColor,
  MediaGalleryItemOptions,
  SectionOptions,
  ThumbnailOptions,
} from "../types/kaori.js";
import { resolveColor } from "../functions/index.js";
import { colors } from "./constants.js";
import { randomElement } from "../discord-utils/index.js";

/**
 * Pre-configured separator components for common use cases
 */
export const separators = {
  small: new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small),
  large: new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
  line: new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
  divider: new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large).setDivider(true),
} as const;

/**
 * Creates a text display component
 */
export function text(content: string): TextDisplayBuilder {
  if (!content) throw new Error("Text display requires content");
  return new TextDisplayBuilder().setContent(content);
}

/**
 * Creates a file component
 */
export function file(url: string): FileBuilder {
  if (!url) throw new Error("File requires a valid URL");
  return new FileBuilder().setURL(url);
}

/**
 * Creates a thumbnail component
 */
export function thumbnail(urlOrOptions: string | ThumbnailOptions): ThumbnailBuilder {
  if (typeof urlOrOptions === "string") {
    return new ThumbnailBuilder().setURL(urlOrOptions);
  }

  if (!urlOrOptions.url) throw new Error("Thumbnail requires a valid URL");

  const builder = new ThumbnailBuilder().setURL(urlOrOptions.url);

  if (urlOrOptions.description) {
    builder.setDescription(urlOrOptions.description);
  }

  return builder;
}

/**
 * Creates a section component with text and optional accessory
 */
export function section(textOrOptions: string | string[] | SectionOptions): SectionBuilder {
  const builder = new SectionBuilder();

  if (typeof textOrOptions === "string") {
    builder.addTextDisplayComponents(text(textOrOptions));
    return builder;
  }

  if (Array.isArray(textOrOptions)) {
    const displays = textOrOptions.map((t) => text(t));
    builder.addTextDisplayComponents(...displays);
    return builder;
  }

  const { text: textContent, accessory } = textOrOptions;

  if (!textContent) throw new Error("Section requires text content");

  const textItems = Array.isArray(textContent) ? textContent : [textContent];
  const displays = textItems.map((t) => text(t));
  builder.addTextDisplayComponents(...displays);

  if (accessory) {
    if (accessory.button) {
      builder.setButtonAccessory(accessory.button);
    } else if (accessory.thumbnail) {
      builder.setThumbnailAccessory(accessory.thumbnail);
    }
  }

  return builder;
}

/**
 * Creates a media gallery component
 */
export function gallery(items: (string | MediaGalleryItemOptions)[]): MediaGalleryBuilder {
  if (!items?.length) throw new Error("Gallery requires at least one item");

  const galleryItems = items.map((item) => {
    if (typeof item === "string") {
      return new MediaGalleryItemBuilder().setURL(item);
    }

    if (!item.url) throw new Error("Gallery item requires a valid URL");

    const builder = new MediaGalleryItemBuilder().setURL(item.url);

    if (item.description) builder.setDescription(item.description);
    if (item.spoiler) builder.setSpoiler(item.spoiler);

    return builder;
  });

  return new MediaGalleryBuilder().addItems(...galleryItems);
}

/**
 * Type for components that can be added to a container
 */
type ContainerComponent =
  | TextDisplayBuilder
  | SectionBuilder
  | SeparatorBuilder
  | FileBuilder
  | MediaGalleryBuilder
  | ActionRowBuilder<MessageActionRowComponentBuilder>;

/**
 * Creates a container component (V2 message structure)
 */
export function container(
  components: ContainerComponent[],
  accentColor?: FlexibleColor,
): ContainerBuilder {
  if (!components?.length) throw new Error("Container requires at least one component");

  const builder = new ContainerBuilder();

  if (accentColor !== undefined) {
    const resolved = resolveColor(accentColor);

    if (resolved === "Random") {
      const randomColor = randomElement(Object.values(colors)) ?? 0x5865f2;
      builder.setAccentColor(randomColor);
    } else if (resolved !== "Default") {
      builder.setAccentColor(resolved);
    }
  }

  for (const component of components) {
    if (component instanceof TextDisplayBuilder) {
      builder.addTextDisplayComponents(component);
    } else if (component instanceof SectionBuilder) {
      builder.addSectionComponents(component);
    } else if (component instanceof SeparatorBuilder) {
      builder.addSeparatorComponents(component);
    } else if (component instanceof FileBuilder) {
      builder.addFileComponents(component);
    } else if (component instanceof MediaGalleryBuilder) {
      builder.addMediaGalleryComponents(component);
    } else if (component instanceof ActionRowBuilder) {
      builder.addActionRowComponents(component);
    }
  }

  return builder;
}

/**
 * Creates a custom separator with specific spacing and divider options
 */
export function separator(
  spacing: SeparatorSpacingSize = SeparatorSpacingSize.Small,
  divider = false,
): SeparatorBuilder {
  const builder = new SeparatorBuilder().setSpacing(spacing);
  if (divider) builder.setDivider(true);
  return builder;
}
