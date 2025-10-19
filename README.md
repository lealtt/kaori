# 🎨 Kaori - Discord UI & Utils Library

A powerful and intuitive library for building Discord.js UIs and utilities, with a total focus on Developer Experience.

## ✨ Features

- 🎯 **Intuitive Naming**: `kui.button()`, `kui.embed()`, `kui.row()` – it's that simple\!
- 🔒 **Type-Safe**: Full TypeScript support with autocompletion.
- 🎨 **Smart Defaults**: Less boilerplate, more productivity.
- 🌐 **V1 & V2 Support**: All Discord components, including V2 Containers.
- 🛠️ **Utilities Included**: Comes with helper functions for modals, permissions, durations, and more.

## 📦 Installation

```bash
# npm
npm install @lealt/kaori discord.js

# pnpm
pnpm add @lealt/kaori discord.js

# yarn
yarn add @lealt/kaori discord.js
```

## 🚀 Quick Start

All builders are exported from the `kui` (Kaori UI) object, and helpers from the `kut` (Kaori Utils) object.

```typescript
import { kui, kut } from "@lealt/kaori";
```

---

## `kui` - UI Builders

### Embeds

Create simple embeds, full rich embeds, or even image galleries with one function.

```typescript
import { kui } from "@lealt/kaori";

// Rich embed with fields and aliases
const userEmbed = kui.embed({
  title: "User Info",
  description: "Full profile data",
  color: kui.colors.blurple, // Use the color palette
  author: {
    name: "John Doe",
    iconUrl: "https://example.com/avatar.png",
  },
  thumbnail: "https://example.com/thumb.png",
  fields: [
    { name: "ID", value: "123456789", inline: true },
    { name: "Tag", value: "john#1234", inline: true },
    { name: "Joined", value: "<t:1234567890:F>" },
  ],
  footer: { text: "Kaori Bot", iconUrl: "https://example.com/bot.png" },
  timestamp: new Date(),
});

// Image Gallery (returns an array of embeds)
const gallery = kui.embed({
  title: "My Photos",
  images: ["https://example.com/photo1.png", "https://example.com/photo2.png"],
});

await interaction.reply({ embeds: [userEmbed] });
// await interaction.reply({ embeds: gallery });
```

### Buttons & Action Rows

Build buttons with type-safety. Link buttons _must_ have a `url`, and all other buttons _must_ have a `customId`.

```typescript
import { kui } from "@lealt/kaori";

// Interaction button
const btn = kui.button({
  customId: "my_button",
  label: "Click Me!",
  style: kui.styles.button.primary,
});

// Use style aliases
const dangerBtn = kui.button({
  customId: "delete",
  label: "Delete",
  style: kui.styles.button.red, // Alias for Danger
});

const secondaryBtn = kui.button({
  customId: "cancel",
  label: "Cancel",
  style: kui.styles.button.grey, // Alias for Secondary
});

// Link button (no customId allowed)
const linkBtn = kui.button({
  style: kui.styles.button.link,
  url: "https://discord.com",
  label: "Discord",
});

// Create an action row with your buttons
await interaction.reply({
  content: "Choose an option:",
  components: [kui.row(btn, dangerBtn, secondaryBtn, linkBtn)],
});
```

### Select Menus

Create any type of select menu.

```typescript
import { kui } from "@lealt/kaori";

// String Select Menu
const stringMenu = kui.stringSelect({
  customId: "choose_color",
  placeholder: "Choose a color",
  options: [
    { label: "Red", value: "red", emoji: "🔴" },
    { label: "Green", value: "green", emoji: "🟢" },
    { label: "Blue", value: "blue", emoji: "🔵" },
  ],
});

// User Select Menu
const userMenu = kui.userSelect({
  customId: "select_user",
  placeholder: "Choose a user",
});

// Role Select Menu
const roleMenu = kui.roleSelect({
  customId: "select_role",
  placeholder: "Choose a role",
});

await interaction.reply({
  content: "Select an option:",
  components: [kui.row(stringMenu), kui.row(userMenu), kui.row(roleMenu)],
});
```

### Modals

Build modals with text inputs or even select menus.

```typescript
import { kui } from "@lealt/kaori";

// Modal with text inputs
const feedbackModal = kui.modal({
  customId: "feedback_modal",
  title: "Feedback Form",
  components: [
    kui.textInput({
      customId: "feedback_title",
      label: "Title",
      placeholder: "Summary of your feedback",
      required: true,
    }),
    kui.textInput({
      customId: "feedback_message",
      label: "Message",
      style: kui.styles.input.paragraph, // 'long' is also an alias
      placeholder: "Describe your feedback...",
    }),
  ],
});

// Modal with select menus
const advancedModal = kui.modal({
  customId: "preferences",
  title: "Your Preferences",
  components: [
    kui.label({
      label: "Choose a user",
      component: kui.userSelect({
        customId: "user_choice",
        placeholder: "Select a user",
      }),
    }),
    kui.label({
      label: "Choose a role",
      description: "Select the desired role",
      component: kui.roleSelect({
        customId: "role_choice",
        placeholder: "Select a role",
      }),
    }),
  ],
});

await interaction.showModal(feedbackModal);
```

### V2 Components (Containers)

Build rich V2 component messages.

```typescript
import { kui } from "@lealt/kaori";

const myContainer = kui.container(
  [
    // Simple text
    kui.text("Welcome to the system!"),

    // Separator
    kui.separators.line,

    // Section with text and thumbnail
    kui.section({
      text: ["Section Title", "Detailed description"],
      accessory: {
        thumbnail: kui.thumbnail("https://example.com/icon.png"),
      },
    }),

    // Section with a button
    kui.section({
      text: "Click to continue",
      accessory: {
        button: kui.button({
          customId: "continue",
          label: "Continue",
          style: kui.styles.button.primary,
        }),
      },
    }),

    // Media Gallery
    kui.gallery([
      { url: "https://example.com/img1.png", description: "Image 1" },
      { url: "https://example.com/img2.png", description: "Image 2" },
    ]),
  ],
  kui.colors.blurple,
); // Optional accent color

await interaction.reply({ flags: "IsComponentsV2", components: [myContainer] });
```

---

## `kut` - Kaori Utility Helpers

### Extracting Modal Values

Type-safely extract values from a modal submission.

```typescript
import { kut } from "@lealt/kaori";

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "advanced_modal") {
    const { categories, users, roles } = kut.extractModalValues(interaction, {
      categories: ["category_select", "strings"],
      users: ["user_select", "users"],
      roles: ["role_select", "roles"],
    });

    console.log("Categories:", categories); // string[]
    console.log("Users:", users); // User[]
    console.log("Roles:", roles); // Role[]
  }
});
```

### Utility Helpers

A collection of useful helpers for common bot tasks.

```typescript
import { kut } from "@lealt/kaori";

// Parse duration strings
const duration = kut.parseDuration("1h 30m");
console.log(duration.minutes); // 90

// Format durations
const formatted = kut.formatDuration(5400000); // "1h 30m"
const verbose = kut.formatDuration(5400000, { verbose: true }); // "1 hour 30 minutes"

// Check member permissions
const permCheck = kut.checkPermissions(member, ["ManageMessages", "BanMembers"]);
if (!permCheck.hasPermission) {
  await interaction.reply(`You're missing: ${permCheck.missing.join(", ")}`);
}

// Check bot permissions in a channel
const botCheck = kut.checkBotPermissions(channel, ["SendMessages", "EmbedLinks"]);
if (!botCheck.hasPermission) {
  console.log("Bot can't send messages here!");
}

// Array utilities
const items = [1, 2, 3, 4, 5, 6, 7];
const { chunks } = kut.chunkArray(items, 3); // [[1,2,3], [4,5,6], [7]]
const random = kut.randomElement(["red", "blue", "green"]);
const shuffled = kut.shuffleArray(items);

// String utilities
const safe = kut.escapeMarkdown("**bold** and *italic*");
const short = kut.truncate("Very long text here", 10); // "Very lo..."

// ID resolvers
const userId = kut.resolveUserId("<@123456789>");
const roleId = kut.resolveRoleId("<@&987654321>");
```
