import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  LabelBuilder,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  MentionableSelectMenuBuilder,
  FileUploadBuilder,
} from "discord.js";
import type {
  TextInputOptions,
  ModalOptions,
  LabelOptions,
  FileUploadOptions,
} from "../types/kaori.js";

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
 * Creates a file upload wrapped in a LabelBuilder for use in modals
 */
export function fileUpload(options: FileUploadOptions): LabelBuilder {
  if (!options.customId) throw new Error("File upload requires a customId");
  if (!options.label) throw new Error("File upload requires a label");

  const upload = new FileUploadBuilder().setCustomId(options.customId);

  if (options.minValues !== undefined) upload.setMinValues(options.minValues);
  if (options.maxValues !== undefined) upload.setMaxValues(options.maxValues);
  if (options.required !== undefined) upload.setRequired(options.required);

  const builder = new LabelBuilder().setLabel(options.label).setFileUploadComponent(upload);

  if (options.description) {
    builder.setDescription(options.description);
  }

  return builder;
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

  // Route component to appropriate setter using instanceof (type-safe)
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
  } else if (options.component instanceof FileUploadBuilder) {
    builder.setFileUploadComponent(options.component);
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
  const textDisplayComponents: import("discord.js").TextDisplayBuilder[] = [];

  for (const component of options.components) {
    if (component instanceof LabelBuilder) {
      labelComponents.push(component);
    } else {
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
