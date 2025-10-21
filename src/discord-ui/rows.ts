import { ActionRowBuilder, type MessageActionRowComponentBuilder } from "discord.js";

/**
 * Creates an action row with components
 */
export function row<T extends MessageActionRowComponentBuilder>(
  ...components: T[]
): ActionRowBuilder<T> {
  if (components.length === 0) {
    throw new Error("ActionRow requires at least one component");
  }
  return new ActionRowBuilder<T>().addComponents(components);
}
