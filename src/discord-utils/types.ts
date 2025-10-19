import type { User, Role, Channel } from "discord.js";

/**
 * Field types that can be extracted from modals
 */
export type ModalFieldType = "text" | "strings" | "users" | "roles" | "channels" | "mentionables";

/**
 * Output types for each modal field type
 */
export interface ModalFieldTypeOutput {
  text: string;
  strings: readonly string[];
  users: User[];
  roles: Role[];
  channels: Channel[];
  mentionables: (User | Role)[];
}

/**
 * Schema for extracting modal values
 */
export type ModalSchema = Record<string, string | readonly [string, ModalFieldType]>;

/**
 * Inferred output type from modal schema
 */
export type ModalValuesOutput<T extends ModalSchema> = {
  [K in keyof T]: T[K] extends readonly [string, infer Type extends ModalFieldType]
    ? ModalFieldTypeOutput[Type]
    : string;
};

/**
 * Chunk array result
 */
export interface ChunkResult<T> {
  chunks: T[][];
  totalChunks: number;
}

/**
 * Permission check result
 */
export interface PermissionCheckResult {
  hasPermission: boolean;
  missing: string[];
}

/**
 * Time units for duration parsing
 */
export type TimeUnit =
  | "ms"
  | "millisecond"
  | "milliseconds"
  | "s"
  | "sec"
  | "second"
  | "seconds"
  | "m"
  | "min"
  | "minute"
  | "minutes"
  | "h"
  | "hr"
  | "hour"
  | "hours"
  | "d"
  | "day"
  | "days"
  | "w"
  | "week"
  | "weeks"
  | "mo"
  | "month"
  | "months"
  | "y"
  | "year"
  | "years";

/**
 * Parsed duration result
 */
export interface ParsedDuration {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  valid: boolean;
  original: string;
}
