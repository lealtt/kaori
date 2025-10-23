/**
 * Discord Type Guards
 *
 * Type guard utilities for Discord.js objects
 */

import type {
  Channel,
  TextChannel,
  VoiceChannel,
  DMChannel,
  CategoryChannel,
  StageChannel,
  ForumChannel,
  Interaction,
  GuildMember,
  User,
} from "discord.js";

/**
 * Type guard for text channels
 *
 * @example
 * ```ts
 * if (isTextChannel(channel)) {
 *   // channel is now typed as TextChannel
 *   await channel.send("Hello!");
 * }
 * ```
 */
export function isTextChannel(channel: Channel): channel is TextChannel {
  return channel.type === 0; // ChannelType.GuildText
}

/**
 * Type guard for voice channels
 *
 * @example
 * ```ts
 * if (isVoiceChannel(channel)) {
 *   // channel is now typed as VoiceChannel
 *   console.log(`Bitrate: ${channel.bitrate}`);
 * }
 * ```
 */
export function isVoiceChannel(channel: Channel): channel is VoiceChannel {
  return channel.type === 2; // ChannelType.GuildVoice
}

/**
 * Type guard for category channels
 *
 * @example
 * ```ts
 * if (isCategoryChannel(channel)) {
 *   console.log(`Category: ${channel.name}`);
 * }
 * ```
 */
export function isCategoryChannel(channel: Channel): channel is CategoryChannel {
  return channel.type === 4; // ChannelType.GuildCategory
}

/**
 * Type guard for stage channels
 *
 * @example
 * ```ts
 * if (isStageChannel(channel)) {
 *   console.log(`Stage topic: ${channel.topic}`);
 * }
 * ```
 */
export function isStageChannel(channel: Channel): channel is StageChannel {
  return channel.type === 13; // ChannelType.GuildStageVoice
}

/**
 * Type guard for forum channels
 *
 * @example
 * ```ts
 * if (isForumChannel(channel)) {
 *   console.log(`Available tags: ${channel.availableTags.length}`);
 * }
 * ```
 */
export function isForumChannel(channel: Channel): channel is ForumChannel {
  return channel.type === 15; // ChannelType.GuildForum
}

/**
 * Type guard for thread channels
 *
 * @example
 * ```ts
 * if (isThreadChannel(channel)) {
 *   // channel is now typed as ThreadChannel
 *   console.log(`Thread archived: ${channel.archived}`);
 * }
 * ```
 */
export function isThreadChannel(channel: Channel): boolean {
  return channel.isThread();
}

/**
 * Type guard for DM channels
 *
 * @example
 * ```ts
 * if (isDMChannel(channel)) {
 *   // channel is now typed as DMChannel
 *   await channel.send("Private message!");
 * }
 * ```
 */
export function isDMChannel(channel: Channel): channel is DMChannel {
  return channel.isDMBased();
}

/**
 * Type guard for guild channels
 *
 * @example
 * ```ts
 * if (isGuildChannel(channel)) {
 *   // channel is now typed as GuildChannel
 *   console.log(`Guild: ${channel.guild.name}`);
 * }
 * ```
 */
export function isGuildChannel(channel: Channel): boolean {
  return "guild" in channel && channel.guild !== null;
}

/**
 * Check if interaction is in a guild context
 *
 * @example
 * ```ts
 * if (isGuildInteraction(interaction)) {
 *   // interaction.guild is now guaranteed to be non-null
 *   await interaction.reply(`Server: ${interaction.guild.name}`);
 * }
 * ```
 */
export function isGuildInteraction(
  interaction: Interaction,
): interaction is Interaction & { guild: NonNullable<Interaction["guild"]> } {
  return interaction.guild !== null;
}

/**
 * Check if user is a bot
 *
 * @example
 * ```ts
 * if (isBot(user)) {
 *   console.log("This is a bot account");
 * }
 * ```
 */
export function isBot(user: User): boolean {
  return user.bot;
}

/**
 * Check if member has administrator permission
 *
 * @example
 * ```ts
 * if (isAdmin(member)) {
 *   console.log("User is an administrator");
 * }
 * ```
 */
export function isAdmin(member: GuildMember): boolean {
  return member.permissions.has("Administrator");
}

/**
 * Check if member owns the guild
 *
 * @example
 * ```ts
 * if (isOwner(member)) {
 *   console.log("User is the server owner");
 * }
 * ```
 */
export function isOwner(member: GuildMember): boolean {
  return member.guild.ownerId === member.id;
}

/**
 * Check if member has moderator permissions
 * (Has at least one of: ManageMessages, KickMembers, BanMembers, ModerateMembers)
 *
 * @example
 * ```ts
 * if (isModerator(member)) {
 *   console.log("User has moderator permissions");
 * }
 * ```
 */
export function isModerator(member: GuildMember): boolean {
  return member.permissions.any(["ManageMessages", "KickMembers", "BanMembers", "ModerateMembers"]);
}
