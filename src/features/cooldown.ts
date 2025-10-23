/**
 * Cooldown Manager
 *
 * Simple cooldown/rate limiting system for commands and features
 */

/**
 * Cooldown manager for rate limiting operations
 *
 * @example
 * ```ts
 * const commandCooldowns = kfeat.cooldown.create();
 *
 * // In command handler
 * const key = `${userId}-${commandName}`;
 * if (!commandCooldowns.setCooldown(key, 5000)) {
 *   const remaining = commandCooldowns.getRemaining(key);
 *   return interaction.reply(`Cooldown: ${Math.ceil(remaining / 1000)}s remaining`);
 * }
 *
 * // Execute command...
 * ```
 */
export class CooldownManager {
  private cooldowns = new Map<string, number>();

  /**
   * Set a cooldown for a key
   * @param key - Unique identifier for the cooldown
   * @param durationMs - Duration in milliseconds
   * @returns true if cooldown was set, false if already on cooldown
   *
   * @example
   * ```ts
   * if (cooldowns.setCooldown("user-123-command", 5000)) {
   *   // Cooldown set successfully
   * } else {
   *   // User is already on cooldown
   * }
   * ```
   */
  setCooldown(key: string, durationMs: number): boolean {
    if (this.hasCooldown(key)) return false;

    const expiresAt = Date.now() + durationMs;
    this.cooldowns.set(key, expiresAt);

    // Auto-cleanup after expiry
    setTimeout(() => this.cooldowns.delete(key), durationMs);

    return true;
  }

  /**
   * Check if key is currently on cooldown
   * @param key - Unique identifier to check
   * @returns true if on cooldown, false otherwise
   *
   * @example
   * ```ts
   * if (cooldowns.hasCooldown("user-123-command")) {
   *   console.log("User must wait before using this command again");
   * }
   * ```
   */
  hasCooldown(key: string): boolean {
    const expiry = this.cooldowns.get(key);
    if (!expiry) return false;

    if (Date.now() > expiry) {
      this.cooldowns.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Get remaining cooldown time in milliseconds
   * @param key - Unique identifier to check
   * @returns Remaining time in milliseconds, or 0 if not on cooldown
   *
   * @example
   * ```ts
   * const remaining = cooldowns.getRemaining("user-123-command");
   * if (remaining > 0) {
   *   console.log(`Wait ${Math.ceil(remaining / 1000)} more seconds`);
   * }
   * ```
   */
  getRemaining(key: string): number {
    const expiry = this.cooldowns.get(key);
    if (!expiry) return 0;

    const remaining = expiry - Date.now();
    return remaining > 0 ? remaining : 0;
  }

  /**
   * Reset cooldown for a specific key
   * @param key - Unique identifier to reset
   * @returns true if cooldown was removed, false if it didn't exist
   *
   * @example
   * ```ts
   * // Admin command to reset user cooldown
   * cooldowns.reset("user-123-command");
   * ```
   */
  reset(key: string): boolean {
    return this.cooldowns.delete(key);
  }

  /**
   * Clear all active cooldowns
   *
   * @example
   * ```ts
   * // Clear all cooldowns on bot restart
   * cooldowns.clear();
   * ```
   */
  clear(): void {
    this.cooldowns.clear();
  }

  /**
   * Get all active cooldown keys
   * @returns Array of active cooldown keys
   *
   * @example
   * ```ts
   * const activeCooldowns = cooldowns.getKeys();
   * console.log(`Active cooldowns: ${activeCooldowns.length}`);
   * ```
   */
  getKeys(): string[] {
    return Array.from(this.cooldowns.keys());
  }

  /**
   * Get number of active cooldowns
   * @returns Count of active cooldowns
   *
   * @example
   * ```ts
   * console.log(`Active cooldowns: ${cooldowns.size()}`);
   * ```
   */
  size(): number {
    return this.cooldowns.size;
  }
}

/**
 * Creates a new cooldown manager instance
 *
 * @example
 * ```ts
 * const commandCooldowns = cooldown();
 * const dailyRewards = cooldown();
 * ```
 */
export function cooldown(): CooldownManager {
  return new CooldownManager();
}
