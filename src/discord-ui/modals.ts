import { ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder } from "discord.js";
import type { TextInputOptions, ModalOptions, LabelOptions } from "../types/kaori.js";

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
  if ("setOptions" in options.component) {
    builder.setStringSelectMenuComponent(options.component as any);
  } else if ("setDefaultUsers" in options.component) {
    builder.setUserSelectMenuComponent(options.component as any);
  } else if ("setDefaultRoles" in options.component) {
    builder.setRoleSelectMenuComponent(options.component as any);
  } else if ("setDefaultChannels" in options.component) {
    builder.setChannelSelectMenuComponent(options.component as any);
  } else if ("setStyle" in options.component) {
    builder.setTextInputComponent(options.component as any);
  } else {
    builder.setMentionableSelectMenuComponent(options.component as any);
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
  const textDisplayComponents: any[] = [];

  for (const component of options.components) {
    if (component.constructor.name === "LabelBuilder") {
      labelComponents.push(component as LabelBuilder);
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
