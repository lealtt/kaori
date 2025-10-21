import { GuildMember, PermissionResolvable, Role, GuildChannel, ThreadChannel } from "discord.js";
import type { ChunkResult, PermissionCheckResult, ParsedDuration } from "../types/kaori.js";

/**
 * Chunks an array into smaller arrays of specified size
 *
 * @example
 * ```ts
 * const items = [1, 2, 3, 4, 5];
 * const { chunks } = chunkArray(items, 2);
 * // [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunkArray<T>(array: T[], size: number): ChunkResult<T> {
  if (size <= 0) throw new Error("Chunk size must be greater than 0");

  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return {
    chunks,
    totalChunks: chunks.length,
  };
}

/**
 * Checks if a member has all required permissions
 *
 * @example
 * ```ts
 * const check = checkPermissions(member, ["ManageMessages", "BanMembers"]);
 * if (!check.hasPermission) {
 *   console.log(`Missing: ${check.missing.join(", ")}`);
 * }
 * ```
 */
export function checkPermissions(
  member: GuildMember,
  permissions: PermissionResolvable[],
): PermissionCheckResult {
  const missing: string[] = [];

  for (const permission of permissions) {
    if (!member.permissions.has(permission)) {
      missing.push(permission.toString());
    }
  }

  return {
    hasPermission: missing.length === 0,
    missing,
  };
}

/**
 * Checks if a bot has required permissions in a channel
 *
 * @example
 * ```ts
 * const check = checkBotPermissions(channel, ["SendMessages", "EmbedLinks"]);
 * if (!check.hasPermission) {
 *   await interaction.reply("I don't have permission to send messages!");
 * }
 * ```
 */
export function checkBotPermissions(
  channel: GuildChannel | ThreadChannel,
  permissions: PermissionResolvable[],
): PermissionCheckResult {
  const botMember = channel.guild.members.me;
  if (!botMember) {
    return { hasPermission: false, missing: ["Bot not in guild"] };
  }

  const missing: string[] = [];
  const channelPerms = channel.permissionsFor(botMember);

  if (!channelPerms) {
    return { hasPermission: false, missing: ["Cannot resolve permissions"] };
  }

  for (const permission of permissions) {
    if (!channelPerms.has(permission)) {
      missing.push(permission.toString());
    }
  }

  return {
    hasPermission: missing.length === 0,
    missing,
  };
}

/**
 * Parses a duration string into milliseconds
 *
 * @example
 * ```ts
 * parseDuration("1h 30m") // { milliseconds: 5400000, minutes: 90, ... }
 * parseDuration("2d") // { milliseconds: 172800000, days: 2, ... }
 * parseDuration("invalid") // { valid: false, ... }
 * ```
 */
export function parseDuration(input: string): ParsedDuration {
  const timeUnits: Record<string, number> = {
    ms: 1,
    millisecond: 1,
    milliseconds: 1,
    s: 1000,
    sec: 1000,
    second: 1000,
    seconds: 1000,
    m: 60000,
    min: 60000,
    minute: 60000,
    minutes: 60000,
    h: 3600000,
    hr: 3600000,
    hour: 3600000,
    hours: 3600000,
    d: 86400000,
    day: 86400000,
    days: 86400000,
    w: 604800000,
    week: 604800000,
    weeks: 604800000,
    mo: 2592000000,
    month: 2592000000,
    months: 2592000000,
    y: 31536000000,
    year: 31536000000,
    years: 31536000000,
  };

  const regex = /(\d+(?:\.\d+)?)\s*([a-z]+)/gi;
  let totalMs = 0;
  let matches = 0;

  let match;
  while ((match = regex.exec(input)) !== null) {
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();

    if (timeUnits[unit]) {
      totalMs += value * timeUnits[unit];
      matches++;
    }
  }

  const valid = matches > 0 && totalMs > 0;

  return {
    milliseconds: totalMs,
    seconds: Math.floor(totalMs / 1000),
    minutes: Math.floor(totalMs / 60000),
    hours: Math.floor(totalMs / 3600000),
    days: Math.floor(totalMs / 86400000),
    valid,
    original: input,
  };
}

/**
 * Formats milliseconds into a human-readable duration
 *
 * @example
 * ```ts
 * formatDuration(90000) // "1m 30s"
 * formatDuration(3665000) // "1h 1m 5s"
 * formatDuration(1000, { verbose: true }) // "1 second"
 * ```
 */
export function formatDuration(
  ms: number,
  options: { verbose?: boolean; maxUnits?: number } = {},
): string {
  const { verbose = false, maxUnits = 3 } = options;

  if (ms < 0) ms = 0;

  const units = [
    { name: verbose ? "day" : "d", ms: 86400000 },
    { name: verbose ? "hour" : "h", ms: 3600000 },
    { name: verbose ? "minute" : "m", ms: 60000 },
    { name: verbose ? "second" : "s", ms: 1000 },
  ];

  const parts: string[] = [];
  let remaining = ms;

  for (const unit of units) {
    if (remaining >= unit.ms) {
      const value = Math.floor(remaining / unit.ms);
      remaining %= unit.ms;

      if (verbose) {
        parts.push(`${value} ${unit.name}${value !== 1 ? "s" : ""}`);
      } else {
        parts.push(`${value}${unit.name}`);
      }

      if (parts.length >= maxUnits) break;
    }
  }

  return parts.length > 0 ? parts.join(" ") : verbose ? "0 seconds" : "0s";
}

/**
 * Gets the highest role of a member
 *
 * @example
 * ```ts
 * const highestRole = getHighestRole(member);
 * console.log(highestRole?.name);
 * ```
 */
export function getHighestRole(member: GuildMember): Role | null {
  return member.roles.highest.id === member.guild.id ? null : member.roles.highest;
}

/**
 * Compares positions of two members
 * Returns true if member1 is higher than member2
 *
 * @example
 * ```ts
 * if (isHigherRole(moderator, user)) {
 *   // Moderator can take action
 * }
 * ```
 */
export function isHigherRole(member1: GuildMember, member2: GuildMember): boolean {
  return member1.roles.highest.position > member2.roles.highest.position;
}

/**
 * Safely escapes markdown in a string
 *
 * @example
 * ```ts
 * const safe = escapeMarkdown("**bold** text");
 * // "\\*\\*bold\\*\\* text"
 * ```
 */
export function escapeMarkdown(text: string): string {
  return text.replace(/(\*|_|`|~|\\|\|)/g, "\\$1");
}

/**
 * Truncates text to a specific length with ellipsis
 *
 * @example
 * ```ts
 * truncate("This is a long text", 10) // "This is..."
 * truncate("Short", 10) // "Short"
 * ```
 */
export function truncate(text: string, maxLength: number, ellipsis = "..."): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Resolves a user mention to a user ID
 *
 * @example
 * ```ts
 * resolveUserId("<@123456789>") // "123456789"
 * resolveUserId("123456789") // "123456789"
 * ```
 */
export function resolveUserId(mention: string): string | null {
  const match = mention.match(/^<@!?(\d+)>$/) || mention.match(/^(\d+)$/);
  return match ? match[1] : null;
}

/**
 * Resolves a role mention to a role ID
 *
 * @example
 * ```ts
 * resolveRoleId("<@&123456789>") // "123456789"
 * resolveRoleId("123456789") // "123456789"
 * ```
 */
export function resolveRoleId(mention: string): string | null {
  const match = mention.match(/^<@&(\d+)>$/) || mention.match(/^(\d+)$/);
  return match ? match[1] : null;
}

/**
 * Resolves a channel mention to a channel ID
 *
 * @example
 * ```ts
 * resolveChannelId("<#123456789>") // "123456789"
 * resolveChannelId("123456789") // "123456789"
 * ```
 */
export function resolveChannelId(mention: string): string | null {
  const match = mention.match(/^<#(\d+)>$/) || mention.match(/^(\d+)$/);
  return match ? match[1] : null;
}

/**
 * Gets a random element from an array
 *
 * @example
 * ```ts
 * const color = randomElement(["red", "blue", "green"]);
 * ```
 */
export function randomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffles an array (Fisher-Yates algorithm)
 *
 * @example
 * ```ts
 * const shuffled = shuffleArray([1, 2, 3, 4, 5]);
 * ```
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Delays execution for a specified time
 *
 * @example
 * ```ts
 * await delay(1000); // Wait 1 second
 * await interaction.editReply("Done!");
 * ```
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
