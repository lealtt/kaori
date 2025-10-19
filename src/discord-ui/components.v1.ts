import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  MentionableSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  LabelBuilder,
  TextDisplayBuilder,
  type MessageActionRowComponentBuilder,
} from "discord.js";
import type {
  ButtonOptions,
  SelectMenuOptions,
  SelectMenuOption,
  TextInputOptions,
  ModalOptions,
  LabelOptions,
} from "./types.js";

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

/**
 * Creates a button component with smart defaults
 */
export function button(options: ButtonOptions): ButtonBuilder {
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
 * Creates a string select menu
 */
export function stringSelect(
  options: SelectMenuOptions & {
    options: (SelectMenuOption | StringSelectMenuOptionBuilder)[];
  },
): StringSelectMenuBuilder {
  if (!options.customId) throw new Error("Select menu requires a customId");
  if (!options.options?.length) throw new Error("Select menu requires at least one option");

  const menuOptions = options.options.map((opt) => {
    if (opt instanceof StringSelectMenuOptionBuilder) return opt;

    const option = new StringSelectMenuOptionBuilder().setLabel(opt.label).setValue(opt.value);

    if (opt.description) option.setDescription(opt.description);
    if (opt.emoji) option.setEmoji(opt.emoji);
    if (opt.default) option.setDefault(true);

    return option;
  });

  const builder = new StringSelectMenuBuilder()
    .setCustomId(options.customId)
    .setOptions(menuOptions);

  if (options.placeholder) builder.setPlaceholder(options.placeholder);
  if (options.minValues) builder.setMinValues(options.minValues);
  if (options.maxValues) builder.setMaxValues(options.maxValues);
  if (options.disabled) builder.setDisabled(true);
  if (options.required !== undefined) builder.setRequired(options.required);

  return builder;
}

/**
 * Creates a user select menu
 */
export function userSelect(options: SelectMenuOptions): UserSelectMenuBuilder {
  if (!options.customId) throw new Error("Select menu requires a customId");

  const builder = new UserSelectMenuBuilder().setCustomId(options.customId);

  if (options.placeholder) builder.setPlaceholder(options.placeholder);
  if (options.minValues) builder.setMinValues(options.minValues);
  if (options.maxValues) builder.setMaxValues(options.maxValues);
  if (options.disabled) builder.setDisabled(true);
  if (options.required !== undefined) builder.setRequired(options.required);

  return builder;
}

/**
 * Creates a role select menu
 */
export function roleSelect(options: SelectMenuOptions): RoleSelectMenuBuilder {
  if (!options.customId) throw new Error("Select menu requires a customId");

  const builder = new RoleSelectMenuBuilder().setCustomId(options.customId);

  if (options.placeholder) builder.setPlaceholder(options.placeholder);
  if (options.minValues) builder.setMinValues(options.minValues);
  if (options.maxValues) builder.setMaxValues(options.maxValues);
  if (options.disabled) builder.setDisabled(true);
  if (options.required !== undefined) builder.setRequired(options.required);

  return builder;
}

/**
 * Creates a channel select menu
 */
export function channelSelect(options: SelectMenuOptions): ChannelSelectMenuBuilder {
  if (!options.customId) throw new Error("Select menu requires a customId");

  const builder = new ChannelSelectMenuBuilder().setCustomId(options.customId);

  if (options.placeholder) builder.setPlaceholder(options.placeholder);
  if (options.minValues) builder.setMinValues(options.minValues);
  if (options.maxValues) builder.setMaxValues(options.maxValues);
  if (options.disabled) builder.setDisabled(true);
  if (options.required !== undefined) builder.setRequired(options.required);

  return builder;
}

/**
 * Creates a mentionable select menu
 */
export function mentionableSelect(options: SelectMenuOptions): MentionableSelectMenuBuilder {
  if (!options.customId) throw new Error("Select menu requires a customId");

  const builder = new MentionableSelectMenuBuilder().setCustomId(options.customId);

  if (options.placeholder) builder.setPlaceholder(options.placeholder);
  if (options.minValues) builder.setMinValues(options.minValues);
  if (options.maxValues) builder.setMaxValues(options.maxValues);
  if (options.disabled) builder.setDisabled(true);
  if (options.required !== undefined) builder.setRequired(options.required);

  return builder;
}

/**
 * Creates a text input wrapped in a LabelBuilder for use in modals
 */
export function textInput(options: TextInputOptions): LabelBuilder {
  if (!options.customId) throw new Error("Text input requires a customId");
  if (!options.label) throw new Error("Text input requires a label");

  const input = new TextInputBuilder()
    .setCustomId(options.customId)
    .setStyle(options.style ?? TextInputStyle.Short);

  if (options.placeholder) input.setPlaceholder(options.placeholder);
  if (options.required !== undefined) input.setRequired(options.required);
  if (options.minLength) input.setMinLength(options.minLength);
  if (options.maxLength) input.setMaxLength(options.maxLength);
  if (options.value) input.setValue(options.value);

  return new LabelBuilder().setLabel(options.label).setTextInputComponent(input);
}

/**
 * Creates a label wrapper for components in modals
 */
export function label(options: LabelOptions): LabelBuilder {
  if (!options.label) throw new Error("Label requires a label text");
  if (!options.component) throw new Error("Label requires a component");

  const builder = new LabelBuilder().setLabel(options.label);

  if (options.description) {
    builder.setDescription(options.description);
  }

  // Route component to appropriate setter
  if (options.component instanceof StringSelectMenuBuilder) {
    builder.setStringSelectMenuComponent(options.component);
  } else if (options.component instanceof UserSelectMenuBuilder) {
    builder.setUserSelectMenuComponent(options.component);
  } else if (options.component instanceof RoleSelectMenuBuilder) {
    builder.setRoleSelectMenuComponent(options.component);
  } else if (options.component instanceof ChannelSelectMenuBuilder) {
    builder.setChannelSelectMenuComponent(options.component);
  } else if (options.component instanceof MentionableSelectMenuBuilder) {
    builder.setMentionableSelectMenuComponent(options.component);
  } else if (options.component instanceof TextInputBuilder) {
    builder.setTextInputComponent(options.component);
  } else {
    throw new Error("Unsupported component type for label");
  }

  return builder;
}

/**
 * Creates a modal with labeled text inputs and other components
 */
export function modal(options: ModalOptions): ModalBuilder {
  if (!options.customId) throw new Error("Modal requires a customId");
  if (!options.title) throw new Error("Modal requires a title");
  if (!options.components?.length) throw new Error("Modal requires at least one component");

  const builder = new ModalBuilder().setCustomId(options.customId).setTitle(options.title);

  const labelComponents: LabelBuilder[] = [];
  const textDisplayComponents: TextDisplayBuilder[] = [];

  for (const component of options.components) {
    if (component instanceof LabelBuilder) {
      labelComponents.push(component);
    } else if (component instanceof TextDisplayBuilder) {
      textDisplayComponents.push(component);
    }
  }

  if (labelComponents.length) {
    builder.addLabelComponents(...labelComponents);
  }
  if (textDisplayComponents.length) {
    builder.addTextDisplayComponents(...textDisplayComponents);
  }

  return builder;
}

/**
 * Helper to create a select menu option
 */
export function option(data: SelectMenuOption): StringSelectMenuOptionBuilder {
  const builder = new StringSelectMenuOptionBuilder().setLabel(data.label).setValue(data.value);

  if (data.description) builder.setDescription(data.description);
  if (data.emoji) builder.setEmoji(data.emoji);
  if (data.default) builder.setDefault(true);

  return builder;
}
