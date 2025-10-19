import { ButtonStyle, TextInputStyle, SeparatorSpacingSize } from "discord.js";

/**
 * Button styles with intuitive aliases
 */
export const button = {
  // Original names
  primary: ButtonStyle.Primary,
  secondary: ButtonStyle.Secondary,
  success: ButtonStyle.Success,
  danger: ButtonStyle.Danger,
  link: ButtonStyle.Link,
  premium: ButtonStyle.Premium,

  // Color aliases
  blurple: ButtonStyle.Primary,
  grey: ButtonStyle.Secondary,
  green: ButtonStyle.Success,
  red: ButtonStyle.Danger,
  blue: ButtonStyle.Link,
} as const;

/**
 * Text input styles
 */
export const input = {
  short: TextInputStyle.Short,
  paragraph: TextInputStyle.Paragraph,
  long: TextInputStyle.Paragraph,
} as const;

/**
 * Separator spacing sizes
 */
export const separator = {
  small: SeparatorSpacingSize.Small,
  large: SeparatorSpacingSize.Large,
} as const;

/**
 * All styles combined for easy access
 */
export const styles = {
  button,
  input,
  separator,
} as const;
