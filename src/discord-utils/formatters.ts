/**
 * Discord Mention & Timestamp Formatters
 *
 * Utility functions to format Discord mentions and timestamps
 */

/**
 * Formats user ID to Discord mention string
 *
 * @example
 * ```ts
 * formatUserMention("123456789012345678")
 * // Returns: "<@123456789012345678>"
 * ```
 */
export function formatUserMention(userId: string): `<@${string}>` {
  return `<@${userId}>`;
}

/**
 * Formats role ID to Discord mention string
 *
 * @example
 * ```ts
 * formatRoleMention("123456789012345678")
 * // Returns: "<@&123456789012345678>"
 * ```
 */
export function formatRoleMention(roleId: string): `<@&${string}>` {
  return `<@&${roleId}>`;
}

/**
 * Formats channel ID to Discord mention string
 *
 * @example
 * ```ts
 * formatChannelMention("123456789012345678")
 * // Returns: "<#123456789012345678>"
 * ```
 */
export function formatChannelMention(channelId: string): `<#${string}>` {
  return `<#${channelId}>`;
}

/**
 * Format timestamp for Discord's dynamic time display
 *
 * @param timestamp - Date object or Unix timestamp in milliseconds
 * @param style - Discord timestamp style
 *   - "t": Short time (16:20)
 *   - "T": Long time (16:20:30)
 *   - "d": Short date (20/04/2021)
 *   - "D": Long date (20 April 2021)
 *   - "f": Short date/time (20 April 2021 16:20) [default]
 *   - "F": Long date/time (Tuesday, 20 April 2021 16:20)
 *   - "R": Relative time (2 months ago)
 *
 * @example
 * ```ts
 * formatTimestamp(Date.now(), "R")
 * // Returns: "<t:1234567890:R>" (displays as "2 months ago")
 *
 * formatTimestamp(new Date("2025-12-25"), "f")
 * // Returns: "<t:1735084800:f>" (displays as formatted date/time)
 * ```
 */
export function formatTimestamp(
  timestamp: Date | number,
  style: "t" | "T" | "d" | "D" | "f" | "F" | "R" = "f",
): `<t:${number}:${string}>` {
  const unix = Math.floor((timestamp instanceof Date ? timestamp.getTime() : timestamp) / 1000);
  return `<t:${unix}:${style}>`;
}

/**
 * Formats a custom emoji for use in messages and components
 *
 * @param name - Emoji name
 * @param id - Emoji ID
 * @param animated - Whether the emoji is animated
 *
 * @example
 * ```ts
 * formatCustomEmoji("kaori", "123456789012345678", false)
 * // Returns: "<:kaori:123456789012345678>"
 *
 * formatCustomEmoji("dance", "987654321098765432", true)
 * // Returns: "<a:dance:987654321098765432>"
 * ```
 */
export function formatCustomEmoji(
  name: string,
  id: string,
  animated = false,
): `<${string}:${string}:${string}>` {
  return animated ? `<a:${name}:${id}>` : `<:${name}:${id}>`;
}
