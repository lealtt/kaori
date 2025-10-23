import {
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  MentionableSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import type { QuickStringMenuOptions, SelectMenuOptions } from "../types/kaori.js";

/**
 * Local helper to apply common SelectMenuOptions
 */
function applyCommonMenuOptions<
  T extends {
    setPlaceholder: (value: string) => T;
    setMinValues: (value: number) => T;
    setMaxValues: (value: number) => T;
    setDisabled: (value: boolean) => T;
    setRequired: (value: boolean) => T;
  },
>(builder: T, options: SelectMenuOptions): T {
  if (options.placeholder) builder.setPlaceholder(options.placeholder);
  if (options.minValues) builder.setMinValues(options.minValues);
  if (options.maxValues) builder.setMaxValues(options.maxValues);
  if (options.disabled) builder.setDisabled(true);
  if (options.required !== undefined) builder.setRequired(options.required);
  return builder;
}

/**
 * Quick select menu builders
 */
export const menu = {
  /**
   * Creates a string select menu with quick syntax
   */
  string(options: QuickStringMenuOptions): StringSelectMenuBuilder {
    const builtOptions = options.options.map((opt) => {
      const option = new StringSelectMenuOptionBuilder().setLabel(opt.label).setValue(opt.value);

      if (opt.description) option.setDescription(opt.description);
      if (opt.emoji) option.setEmoji(opt.emoji);
      if (opt.default) option.setDefault(true);

      return option;
    });

    const builder = new StringSelectMenuBuilder()
      .setCustomId(options.customId)
      .addOptions(builtOptions);

    return applyCommonMenuOptions(builder, options);
  },

  /**
   * Creates a user select menu with quick syntax
   */
  user(options: SelectMenuOptions): UserSelectMenuBuilder {
    const builder = new UserSelectMenuBuilder().setCustomId(options.customId);
    return applyCommonMenuOptions(builder, options);
  },

  /**
   * Creates a role select menu with quick syntax
   */
  role(options: SelectMenuOptions): RoleSelectMenuBuilder {
    const builder = new RoleSelectMenuBuilder().setCustomId(options.customId);
    return applyCommonMenuOptions(builder, options);
  },

  /**
   * Creates a channel select menu with quick syntax
   */
  channel(options: SelectMenuOptions): ChannelSelectMenuBuilder {
    const builder = new ChannelSelectMenuBuilder().setCustomId(options.customId);
    return applyCommonMenuOptions(builder, options);
  },

  /**
   * Creates a mentionable select menu with quick syntax
   */
  mentionable(options: SelectMenuOptions): MentionableSelectMenuBuilder {
    const builder = new MentionableSelectMenuBuilder().setCustomId(options.customId);
    return applyCommonMenuOptions(builder, options);
  },
};
