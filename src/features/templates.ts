import type { Template } from "../types/kaori.js";

/**
 * Manages registering and rendering templates.
 *
 * @example
 * ```ts
 * // In your main bot file:
 * import { KaoriTemplates, kui } from "@lealt/kaori";
 *
 * const templates = new KaoriTemplates()
 *   .register({
 *     id: "success",
 *     render: (data: { title: string; desc?: string }) => kui.embed({
 *       color: kui.colors.success,
 *       title: `✅ ${data.title}`,
 *       description: data.desc,
 *       timestamp: new Date()
 *     })
 *   })
 *   .register({
 *     id: "userCard",
 *     render: (data: { username: string; id: string }) => kui.container([
 *       kui.section(`User: ${data.username}`),
 *       kui.section(`ID: ${data.id}`)
 *     ])
 *   });
 *
 * // In a command file - with full autocomplete:
 * const embed = templates.render("success", {
 *   title: "User Banned",
 *   desc: "The user was banned successfully."
 * });
 *
 * await interaction.reply({ embeds: [embed] });
 * ```
 */
export class KaoriTemplates<TStore = object> {
  /**
   * Internal store for all registered templates.
   */
  private readonly templates = new Map<string, Template<any, any>>();

  /**
   * Registers a new template and returns a new type-safe manager instance.
   * @param template The template object, conforming to the `Template` interface.
   */
  public register<const TId extends string, TData, TReturn>(
    template: Template<TData, TReturn> & { id: TId },
  ): KaoriTemplates<TStore & { [K in TId]: { data: TData; return: TReturn } }> {
    if (this.templates.has(template.id)) {
      console.warn(`[KaoriTemplates] Template ID "${template.id}" is being overwritten.`);
    }
    this.templates.set(template.id, template);

    return this as any;
  }

  /**
   * Renders a template with the provided data.
   * Provides full autocomplete for both 'id' and 'data'.
   * @param id The ID of the template to render.
   * @param data The data to pass to the template's render function.
   */
  public render<const TId extends keyof TStore>(
    id: TId,
    data: TStore[TId] extends { data: infer D } ? D : never,
  ): TStore[TId] extends { return: infer R } ? R : never {
    const template = this.templates.get(id as string);

    if (!template) {
      throw new Error(`[KaoriTemplates] Template "${id.toString()}" not found.`);
    }

    return template.render(data);
  }

  /**
   * Lists all registered template IDs.
   */
  public list(): string[] {
    return Array.from(this.templates.keys());
  }
}

export function templates(): KaoriTemplates {
  return new KaoriTemplates();
}
