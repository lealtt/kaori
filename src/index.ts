/**
 * @lealt/kaori - A feature-rich library for Discord.js
 */

import * as uiExports from "./discord-ui/index.js";
import * as utilsExports from "./discord-utils/index.js";
import * as featuresExports from "./features/index.js";

/**
 * Kaori Resources - All utilities
 */
export const kres = {
  colors: uiExports.colors,
  styles: uiExports.styles,
};

/**
 * Kaori UI - All UI component builders
 */
export const kui = {
  /**
   * Category: Embeds
   * Fluent builder for embeds.
   * (ex: kui.embed({ title: ... }))
   */
  embed: uiExports.embed,

  /**
   * Category: Buttons
   * Fluent builder for buttons.
   * (ex: kui.button.primary(...))
   */
  button: uiExports.button,

  /**
   * Category: Select Menus
   * Fluent builder for select menus.
   * (ex: kui.menu.string(...))
   */
  menu: uiExports.menu,

  /**
   * Category: Action Rows
   * Builder for Action Rows.
   * (ex: kui.row(kui.button...))
   */
  row: uiExports.row,

  /**
   * Category: Modals
   * Builders for modals and their inputs.
   */
  modal: {
    /** Creates a ModalBuilder (ex: kui.modal.create(...)) */
    create: uiExports.modal,
    /** Creates a TextInput (ex: kui.modal.input(...)) */
    input: uiExports.textInput,
    /** Creates a Label (ex: kui.modal.label(...)) */
    label: uiExports.label,
  },

  /**
   * Category: Container (V2 Messages)
   * Builders for the new (non-embed) message structure.
   */
  container: {
    /** Creates a ContainerBuilder (ex: kui.container.create(...)) */
    create: uiExports.container,
    /** Creates a SectionBuilder (ex: kui.container.section(...)) */
    section: uiExports.section,
    /** Creates a TextDisplayBuilder (ex: kui.container.text(...)) */
    text: uiExports.text,
    /** Creates a MediaGalleryBuilder (ex: kui.container.gallery(...)) */
    gallery: uiExports.gallery,
    /** Creates a ThumbnailBuilder (ex: kui.container.thumbnail(...)) */
    thumbnail: uiExports.thumbnail,
    /** Creates a FileBuilder (ex: kui.container.file(...)) */
    file: uiExports.file,
    /** Creates a SeparatorBuilder (ex: kui.container.separator(...)) */
    separator: uiExports.separator,
    /** Separator constants (ex: kui.container.separators.small) */
    separators: uiExports.separators,
  },
};

/**
 * Kaori Utils - All utility functions
 */
export const kut = {
  /**
   * Category: Permission Checkers
   * Functions to check bot and member permissions.
   */
  checkers: {
    checkBotPermissions: utilsExports.checkBotPermissions,
    checkPermissions: utilsExports.checkPermissions,
  },
  /**
   * Category: Interaction
   * Utilities for handling interactions, like modals.
   */
  interaction: {
    extractModalValues: utilsExports.extractModalValues,
  },
  /**
   * Category: Entity Resolvers
   * Functions to convert mentions or IDs into string IDs.
   */
  resolvers: {
    userId: utilsExports.resolveUserId,
    roleId: utilsExports.resolveRoleId,
    channelId: utilsExports.resolveChannelId,
  },
  /**
   * Category: Formatters
   * Functions to format mentions and timestamps.
   */
  formatters: {
    userMention: utilsExports.formatUserMention,
    roleMention: utilsExports.formatRoleMention,
    channelMention: utilsExports.formatChannelMention,
    timestamp: utilsExports.formatTimestamp,
    customEmoji: utilsExports.formatCustomEmoji,
  },
  /**
   * Category: Type Guards
   * Type guard utilities for Discord objects.
   */
  guards: {
    isTextChannel: utilsExports.isTextChannel,
    isVoiceChannel: utilsExports.isVoiceChannel,
    isCategoryChannel: utilsExports.isCategoryChannel,
    isStageChannel: utilsExports.isStageChannel,
    isForumChannel: utilsExports.isForumChannel,
    isThreadChannel: utilsExports.isThreadChannel,
    isDMChannel: utilsExports.isDMChannel,
    isGuildChannel: utilsExports.isGuildChannel,
    isGuildInteraction: utilsExports.isGuildInteraction,
    isBot: utilsExports.isBot,
    isAdmin: utilsExports.isAdmin,
    isOwner: utilsExports.isOwner,
    isModerator: utilsExports.isModerator,
  },
  /**
   * Category: Validators
   * Validation functions for Discord data.
   */
  validators: {
    isValidDiscordId: utilsExports.isValidDiscordId,
    isValidHexColor: utilsExports.isValidHexColor,
    validateEmbedField: utilsExports.validateEmbedField,
    validateEmbed: utilsExports.validateEmbed,
    isValidButtonLabel: utilsExports.isValidButtonLabel,
    isValidSelectOption: utilsExports.isValidSelectOption,
    isValidModalTitle: utilsExports.isValidModalTitle,
    isValidTextInputLabel: utilsExports.isValidTextInputLabel,
  },
  /**
   * Category: Member/User Helpers
   * Utilities for getting info from GuildMembers or Users.
   */
  member: {
    getHighestRole: utilsExports.getHighestRole,
    isHigher: utilsExports.isHigherRole,
  },
  /**
   * Category: Time & Duration
   * Functions to parse, format, and create delays.
   */
  time: {
    parseDuration: utilsExports.parseDuration,
    formatDuration: utilsExports.formatDuration,
    delay: utilsExports.delay,
  },
  /**
   * Category: Text Formatting
   * Utilities for manipulating strings.
   */
  text: {
    escapeMarkdown: utilsExports.escapeMarkdown,
    truncate: utilsExports.truncate,
  },
  /**
   * Category: Array Utilities
   * Functions for manipulating arrays.
   */
  array: {
    chunk: utilsExports.chunkArray,
    random: utilsExports.randomElement,
    shuffle: utilsExports.shuffleArray,
  },
};

/**
 * Kaori Features - Templates and state management
 */
export const kfeat = {
  /**
   * Category: State Management
   * Creates a new typed state store.
   * (ex: kfeat.state.define<User>({ id: 'users' }))
   */
  state: {
    define: featuresExports.defineState,
  },
  /**
   * Category: Templates
   * Creates a new template manager.
   * (ex: kfeat.templates.create())
   */
  templates: {
    create: featuresExports.templates,
  },
  /**
   * Category: Queue
   * Creates a new generic Queue.
   * (ex: kfeat.queue.create<Track>())
   */
  queue: {
    create: featuresExports.queue,
  },
  /**
   * Category: Timer
   * Utility for creating readable time values in ms.
   * (ex: kfeat.timer.create(15).sec())
   */
  timer: {
    create: featuresExports.timer,
  },
  /**
   * Category: Cooldown
   * Creates a new cooldown manager for rate limiting.
   * (ex: kfeat.cooldown.create())
   */
  cooldown: {
    create: featuresExports.cooldown,
  },
};

export type * from "./types/kaori.js";

// Export error classes for users who want to catch specific errors
export {
  KaoriError,
  TemplateNotFoundError,
  ValidationError,
  PermissionError,
  CooldownError,
  StateError,
  QueueError,
} from "./discord-utils/errors.js";
