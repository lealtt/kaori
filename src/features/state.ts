import type { StateOptions, StateStore } from "../types/kaori.js";

/**
 * Internal entry structure for state management
 */
interface StateEntry<T> {
  data: T;
  expiresAt: number;
  lastAccessed: number;
}

/**
 * Type-safe state store implementation
 */
class KaoriStateStore<T> implements StateStore<T> {
  private readonly store = new Map<string, StateEntry<T>>();
  private readonly options: Required<Omit<StateOptions<T>, "onExpire">> & {
    onExpire?: (key: string, value: T) => void;
  };
  private cleanupInterval?: NodeJS.Timeout;

  constructor(options: StateOptions<T>) {
    this.options = {
      id: options.id,
      maxSize: options.maxSize ?? 1000,
      ttl: options.ttl ?? 3600000, // 1 hour default
      onExpire: options.onExpire,
    };

    // Start cleanup interval
    this.startCleanup();
  }

  /**
   * Gets a value from the store
   */
  public get(key: string): T | undefined {
    const entry = this.store.get(key);

    if (!entry) return undefined;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.delete(key);
      return undefined;
    }

    // Update last accessed time
    entry.lastAccessed = Date.now();
    return entry.data;
  }

  /**
   * Sets a value in the store
   */
  public set(key: string, value: T, customTTL?: number): void {
    // Enforce max size with LRU eviction
    if (this.store.size >= this.options.maxSize && !this.store.has(key)) {
      this.evictLRU();
    }

    const ttl = customTTL ?? this.options.ttl;
    const now = Date.now();

    this.store.set(key, {
      data: value,
      expiresAt: now + ttl,
      lastAccessed: now,
    });
  }

  /**
   * Checks if a key exists in the store
   */
  public has(key: string): boolean {
    const entry = this.store.get(key);

    if (!entry) return false;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Deletes a key from the store
   */
  public delete(key: string): boolean {
    const entry = this.store.get(key);

    if (entry && this.options.onExpire) {
      this.options.onExpire(key, entry.data);
    }

    return this.store.delete(key);
  }

  /**
   * Clears all entries from the store
   */
  public clear(): void {
    if (this.options.onExpire) {
      for (const [key, entry] of this.store.entries()) {
        this.options.onExpire(key, entry.data);
      }
    }

    this.store.clear();
  }

  /**
   * Returns the number of entries in the store
   */
  public size(): number {
    return this.store.size;
  }

  /**
   * Returns all keys in the store
   */
  public keys(): string[] {
    return Array.from(this.store.keys());
  }

  /**
   * Returns all values in the store
   */
  public values(): T[] {
    return Array.from(this.store.values()).map((entry) => entry.data);
  }

  /**
   * Returns all entries in the store
   */
  public entries(): [string, T][] {
    return Array.from(this.store.entries()).map(([key, entry]) => [key, entry.data]);
  }

  /**
   * Evicts the least recently used entry
   */
  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    for (const [key, entry] of this.store.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  /**
   * Starts the cleanup interval to remove expired entries
   */
  private startCleanup(): void {
    // Run cleanup every 5 minutes
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const expiredKeys: string[] = [];

      for (const [key, entry] of this.store.entries()) {
        if (now > entry.expiresAt) {
          expiredKeys.push(key);
        }
      }

      for (const key of expiredKeys) {
        this.delete(key);
      }
    }, 300000);

    // Prevent the interval from keeping the process alive
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Stops the cleanup interval and clears the store
   */
  public destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
  }
}

/**
 * Creates a new typed state store
 *
 * @example
 * ```ts
 * interface User {
 *   username: string;
 *   discriminator: string;
 * }
 *
 * const userState = defineState<User>({
 *   id: 'users',
 *   maxSize: 500,
 *   ttl: 3600000, // 1 hour
 *   onExpire: (key, user) => {
 *     console.log(`User ${user.username} expired`);
 *   }
 * });
 *
 * // Set a user
 * userState.set('123456789', {
 *   username: 'john',
 *   discriminator: '0001'
 * });
 *
 * // Get a user
 * const user = userState.get('123456789');
 *
 * // Check if exists
 * if (userState.has('123456789')) {
 *   console.log('User exists');
 * }
 * ```
 */
export function defineState<T>(options: StateOptions<T>): StateStore<T> {
  return new KaoriStateStore<T>(options);
}
