/**
 * Custom Error Classes for Kaori
 *
 * Provides specialized error types for better error handling
 */

/**
 * Base error class for all Kaori errors
 *
 * @example
 * ```ts
 * try {
 *   // Some operation
 * } catch (error) {
 *   if (error instanceof KaoriError) {
 *     console.log(`Error code: ${error.code}`);
 *     console.log(`Context:`, error.context);
 *   }
 * }
 * ```
 */
export class KaoriError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "KaoriError";
    Error.captureStackTrace?.(this, this.constructor);
  }
}

/**
 * Error thrown when a template is not found
 *
 * @example
 * ```ts
 * throw new TemplateNotFoundError("my-template");
 * ```
 */
export class TemplateNotFoundError extends KaoriError {
  constructor(templateId: string) {
    super(`Template "${templateId}" not found`, "TEMPLATE_NOT_FOUND", { templateId });
    this.name = "TemplateNotFoundError";
  }
}

/**
 * Error thrown when validation fails
 *
 * @example
 * ```ts
 * throw new ValidationError("title", "Title exceeds 256 characters");
 * ```
 */
export class ValidationError extends KaoriError {
  constructor(field: string, reason: string) {
    super(`Validation failed for "${field}": ${reason}`, "VALIDATION_ERROR", { field, reason });
    this.name = "ValidationError";
  }
}

/**
 * Error thrown when a permission check fails
 *
 * @example
 * ```ts
 * throw new PermissionError(["ManageMessages", "BanMembers"]);
 * ```
 */
export class PermissionError extends KaoriError {
  constructor(missingPermissions: string[]) {
    super(`Missing required permissions: ${missingPermissions.join(", ")}`, "PERMISSION_ERROR", {
      missingPermissions,
    });
    this.name = "PermissionError";
  }
}

/**
 * Error thrown when a cooldown is active
 *
 * @example
 * ```ts
 * throw new CooldownError(5000); // 5 seconds remaining
 * ```
 */
export class CooldownError extends KaoriError {
  constructor(remainingMs: number) {
    super(
      `Action is on cooldown. Please wait ${Math.ceil(remainingMs / 1000)} seconds`,
      "COOLDOWN_ACTIVE",
      { remainingMs, remainingSeconds: Math.ceil(remainingMs / 1000) },
    );
    this.name = "CooldownError";
  }
}

/**
 * Error thrown when state store operations fail
 *
 * @example
 * ```ts
 * throw new StateError("users", "Failed to retrieve user data");
 * ```
 */
export class StateError extends KaoriError {
  constructor(storeId: string, reason: string) {
    super(`State store "${storeId}" error: ${reason}`, "STATE_ERROR", { storeId, reason });
    this.name = "StateError";
  }
}

/**
 * Error thrown when queue operations fail
 *
 * @example
 * ```ts
 * throw new QueueError("Queue is empty");
 * ```
 */
export class QueueError extends KaoriError {
  constructor(reason: string) {
    super(`Queue error: ${reason}`, "QUEUE_ERROR", { reason });
    this.name = "QueueError";
  }
}
