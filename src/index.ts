/**
 * @lealt/kaori - A feature-rich library for Discord.js
 */

// Export everything from discord-ui as a namespace
import * as uiExports from "./discord-ui/index.js";
export const kui = uiExports;

// Export everything from discord-utils as a namespace
import * as utilsExports from "./discord-utils/index.js";
export const kut = utilsExports;

// Also export everything individually for direct imports
export * from "./discord-ui/index.js";
export * from "./discord-utils/index.js";
