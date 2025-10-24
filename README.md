# 🎨 Kaori - Discord UI & Utils Library

A powerful and intuitive library for building Discord.js UIs and utilities, with a total focus on Developer Experience.

## ✨ Features

- 🎯 **Intuitive API**: `kui.button.primary()`, `kui.embed()`, `kui.container.create()` – it's that simple!
- 🔒 **Type-Safe**: Full TypeScript support with autocompletion
- 🎨 **Smart Defaults**: Less boilerplate, more productivity
- 🌐 **V1 & V2 Support**: All Discord components, including V2 Containers
- 🛠️ **Rich Utilities**: Helper functions for modals, permissions, durations, and more
- 📦 **State Management**: Built-in typed state management system
- 🎭 **Templates**: Create reusable component templates
- 🔄 **Queue System**: Generic queue implementation
- ⏱️ **Timer Utilities**: Readable time values in milliseconds

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

All builders are exported from organized namespaces for better developer experience:

- `kui` - UI components (buttons, embeds, containers, etc.)
- `kut` - Utility functions (permissions, time, text, arrays, etc.)
- `kfeat` - Advanced features (templates, state, queues, timers)
- `kres` - Resources (colors, styles)

```typescript
import { kui, kut, kfeat, kres } from "@lealt/kaori";
```

---

## 📚 Documentation

### `kui` - UI Builders

#### Buttons

Create buttons with an intuitive API:

```typescript
// Quick style builders
const primaryBtn = kui.button.primary({
  customId: "confirm",
  label: "Confirm",
  emoji: "✅",
});

const dangerBtn = kui.button.danger({
  customId: "delete",
  label: "Delete",
  disabled: false,
});

const linkBtn = kui.button.link({
  url: "https://discord.com",
  label: "Visit Discord",
});

// Color aliases
const blurpleBtn = kui.button.blurple({ customId: "id", label: "Blurple" });
const redBtn = kui.button.red({ customId: "id", label: "Red" });
const greyBtn = kui.button.grey({ customId: "id", label: "Grey" });
const greenBtn = kui.button.green({ customId: "id", label: "Green" });

await interaction.reply({
  content: "Choose an option:",
  components: [kui.row(primaryBtn, dangerBtn, linkBtn)],
});
```

#### Select Menus

Create any type of select menu:

```typescript
// String Select Menu
const colorMenu = kui.menu.string({
  customId: "choose_color",
  placeholder: "Choose a color",
  options: [
    { label: "Red", value: "red", emoji: "🔴" },
    { label: "Green", value: "green", emoji: "🟢" },
    { label: "Blue", value: "blue", emoji: "🔵" },
  ],
});

// User Select Menu
const userMenu = kui.menu.user({
  customId: "select_user",
  placeholder: "Choose a user",
});

// Role Select Menu
const roleMenu = kui.menu.role({
  customId: "select_role",
  placeholder: "Choose a role",
});

// Channel Select Menu
const channelMenu = kui.menu.channel({
  customId: "select_channel",
  placeholder: "Choose a channel",
});

// Mentionable Select Menu
const mentionableMenu = kui.menu.mentionable({
  customId: "select_mention",
  placeholder: "Choose a user or role",
});

await interaction.reply({
  content: "Select an option:",
  components: [kui.row(colorMenu)],
});
```

#### Embeds

Create beautiful embeds with a fluent API:

```typescript
// Simple embed
const simpleEmbed = kui.embed({
  title: "Hello World",
  description: "This is a test embed",
  color: kres.colors.blurple,
});

// Rich embed with fields
const userEmbed = kui.embed({
  title: "User Info",
  description: "Full profile data",
  color: "#5865F2", // Hex colors supported
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
  footer: {
    text: "Kaori Bot",
    iconUrl: "https://example.com/bot.png",
  },
  timestamp: new Date(),
});

// Image Gallery (returns array of embeds)
const gallery = kui.embed({
  title: "My Photos",
  image: [
    "https://example.com/photo1.png",
    "https://example.com/photo2.png",
    "https://example.com/photo3.png",
  ],
});

await interaction.reply({ embeds: [userEmbed] });
```

#### Modals

Build modals with text inputs:

```typescript
const feedbackModal = kui.modal.create({
  customId: "feedback_modal",
  title: "Feedback Form",
  components: [
    kui.modal.input({
      customId: "feedback_title",
      label: "Title",
      placeholder: "Summary of your feedback",
      required: true,
    }),
    kui.modal.input({
      customId: "feedback_message",
      label: "Message",
      style: kres.styles.input.paragraph,
      placeholder: "Describe your feedback...",
    }),
  ],
});

await interaction.showModal(feedbackModal);
```

##### File Upload in Modals

Add file upload components to your modals:

```typescript
// Simple file upload modal
const uploadModal = kui.modal.create({
  customId: "upload_modal",
  title: "Upload Files",
  components: [
    kui.modal.fileUpload({
      customId: "attachment",
      label: "Select File",
      required: true,
    }),
  ],
});

await interaction.showModal(uploadModal);
```

##### Combined Text Inputs and File Uploads

Mix text inputs with file uploads in the same modal:

```typescript
const reportModal = kui.modal.create({
  customId: "bug_report",
  title: "Bug Report",
  components: [
    kui.modal.input({
      customId: "bug_title",
      label: "Bug Title",
      placeholder: "Brief description of the issue",
      required: true,
    }),
    kui.modal.input({
      customId: "bug_description",
      label: "Description",
      style: kres.styles.input.paragraph,
      placeholder: "Detailed explanation...",
    }),
    kui.modal.fileUpload({
      customId: "screenshots",
      label: "Screenshots",
      description: "Upload screenshots or logs",
      minValues: 1,
      maxValues: 5,
      required: false,
    }),
  ],
});

await interaction.showModal(reportModal);
```

##### Advanced File Upload Options

Use all available file upload options:

```typescript
const submissionModal = kui.modal.create({
  customId: "project_submission",
  title: "Project Submission",
  components: [
    kui.modal.input({
      customId: "project_name",
      label: "Project Name",
      required: true,
    }),
    kui.modal.fileUpload({
      customId: "project_files",
      label: "Project Files",
      description: "Upload 2-10 files related to your project",
      minValues: 2,
      maxValues: 10,
      required: true,
    }),
  ],
});

await interaction.showModal(submissionModal);

// Extract uploaded files from modal submission
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "project_submission") {
    const { projectName, files } = kut.interaction.extractModalValues(interaction, {
      projectName: "project_name",
      files: ["project_files", "files"],
    });

    console.log("Project:", projectName); // string
    console.log("Files:", files); // Attachment[]

    await interaction.reply({
      content: `Received ${files.length} file(s) for project: ${projectName}`,
      flags: "Ephemeral",
    });
  }
});
```

#### V2 Components (Containers)

Build rich V2 component messages:

```typescript
const myContainer = kui.container.create(
  [
    // Simple text
    kui.container.text("Welcome to the system!"),

    // Separator
    kui.container.separators.line,

    // Section with text and thumbnail
    kui.container.section({
      text: ["Section Title", "Detailed description"],
      accessory: {
        thumbnail: kui.container.thumbnail("https://example.com/icon.png"),
      },
    }),

    // Section with a button
    kui.container.section({
      text: "Click to continue",
      accessory: {
        button: kui.button.primary({
          customId: "continue",
          label: "Continue",
        }),
      },
    }),

    // Media Gallery
    kui.container.gallery([
      { url: "https://example.com/img1.png", description: "Image 1" },
      { url: "https://example.com/img2.png", description: "Image 2" },
    ]),
  ],
  kres.colors.blurple, // Optional accent color
);

await interaction.reply({
  flags: "IsComponentsV2",
  components: [myContainer],
});
```

---

### `kut` - Utility Helpers

#### Permission Checkers

```typescript
// Check member permissions
const permCheck = kut.checkers.checkPermissions(member, ["ManageMessages", "BanMembers"]);

if (!permCheck.hasPermission) {
  await interaction.reply(`You're missing: ${permCheck.missing.join(", ")}`);
}

// Check bot permissions in a channel
const botCheck = kut.checkers.checkBotPermissions(channel, ["SendMessages", "EmbedLinks"]);

if (!botCheck.hasPermission) {
  console.log("Bot can't send messages here!");
}
```

#### Modal Value Extraction

Type-safely extract values from modal submissions:

```typescript
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "advanced_modal") {
    const { categories, users, roles } = kut.interaction.extractModalValues(interaction, {
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

#### Time & Duration

```typescript
// Parse duration strings
const duration = kut.time.parseDuration("1h 30m");
console.log(duration.minutes); // 90

// Format durations
const formatted = kut.time.formatDuration(5400000);
// "1h 30m"

const verbose = kut.time.formatDuration(5400000, { verbose: true });
// "1 hour 30 minutes"

// Delay execution
await kut.time.delay(1000); // Wait 1 second
await interaction.editReply("Done!");
```

#### Entity Resolvers

```typescript
// Resolve mentions to IDs
const userId = kut.resolvers.userId("<@123456789>"); // "123456789"
const roleId = kut.resolvers.roleId("<@&987654321>"); // "987654321"
const channelId = kut.resolvers.channelId("<#555555>"); // "555555"
```

#### Member/User Helpers

```typescript
// Get highest role
const highestRole = kut.member.getHighestRole(member);
console.log(highestRole?.name);

// Compare member roles
if (kut.member.isHigher(moderator, user)) {
  // Moderator can take action
}
```

#### Text Formatting

```typescript
// Escape markdown
const safe = kut.text.escapeMarkdown("**bold** text");
// "\\*\\*bold\\*\\* text"

// Truncate text
const short = kut.text.truncate("Very long text here", 10);
// "Very lo..."
```

#### Array Utilities

```typescript
// Chunk arrays
const items = [1, 2, 3, 4, 5, 6, 7];
const { chunks } = kut.array.chunk(items, 3);
// [[1,2,3], [4,5,6], [7]]

// Random element
const random = kut.array.random(["red", "blue", "green"]);

// Shuffle array
const shuffled = kut.array.shuffle(items);
```

---

### `kfeat` - Advanced Features

#### Templates System

Create reusable component templates with full type safety:

```typescript
// Create a template manager
const templates = kfeat.templates
  .create()
  .register({
    id: "success",
    render: (data: { title: string; desc?: string }) =>
      kui.embed({
        color: kres.colors.success,
        title: `✅ ${data.title}`,
        description: data.desc,
        timestamp: new Date(),
      }),
  })
  .register({
    id: "error",
    render: (data: { message: string }) =>
      kui.embed({
        color: kres.colors.danger,
        title: "❌ Error",
        description: data.message,
      }),
  })
  .register({
    id: "userCard",
    render: (data: { username: string; id: string }) =>
      kui.container.create([
        kui.container.text(`User: ${data.username}`),
        kui.container.text(`ID: ${data.id}`),
      ]),
  });

// Use templates with full autocomplete
const successEmbed = templates.render("success", {
  title: "User Banned",
  desc: "The user was banned successfully.",
});

const errorEmbed = templates.render("error", {
  message: "Something went wrong!",
});

await interaction.reply({ embeds: [successEmbed] });
```

#### State Management

Create typed state stores with TTL and LRU eviction:

```typescript
interface User {
  username: string;
  discriminator: string;
  avatar: string;
}

const userState = kfeat.state.define<User>({
  id: "users",
  maxSize: 500, // Max 500 entries
  ttl: 3600000, // 1 hour TTL
  onExpire: (key, user) => {
    console.log(`User ${user.username} expired from cache`);
  },
});

// Set a user
userState.set("123456789", {
  username: "john",
  discriminator: "0001",
  avatar: "avatar_url",
});

// Get a user
const user = userState.get("123456789");

// Check if exists
if (userState.has("123456789")) {
  console.log("User exists in cache");
}

// Get all keys/values
const allKeys = userState.keys();
const allUsers = userState.values();
const entries = userState.entries();

// Clear all
userState.clear();
```

#### Queue System

Generic FIFO queue with circular buffer optimization:

```typescript
interface Track {
  title: string;
  url: string;
  duration: number;
}

const musicQueue = kfeat.queue.create<Track>();

// Add tracks
musicQueue.enqueue({
  title: "Song 1",
  url: "https://...",
  duration: 180000,
});

musicQueue.enqueue({
  title: "Song 2",
  url: "https://...",
  duration: 200000,
});

// Get next track
const nextTrack = musicQueue.dequeue();

// Peek at next without removing
const peek = musicQueue.peek();

// Check if empty
if (musicQueue.isEmpty()) {
  console.log("Queue is empty");
}

// Get size
console.log(`${musicQueue.size} tracks in queue`);

// Convert to array
const allTracks = musicQueue.toArray();

// Iterate
for (const track of musicQueue) {
  console.log(track.title);
}
```

#### Timer Utilities

Create readable time values in milliseconds:

```typescript
// Create readable time values
const fifteenSeconds = kfeat.timer.create(15).sec(); // 15000
const thirtyMinutes = kfeat.timer.create(30).min(); // 1800000
const oneHour = kfeat.timer.create(1).hour(); // 3600000
const twoMonths = kfeat.timer.create(2).monthly(); // 5184000000

// Use in state management
const sessionState = kfeat.state.define({
  id: "sessions",
  ttl: kfeat.timer.create(30).min(), // 30 minutes TTL
});

// Use in delays
await kut.time.delay(kfeat.timer.create(5).sec());
```

---

### `kres` - Resources

#### Colors

Access a comprehensive color palette:

```typescript
// Basic colors
kres.colors.primary    // 0x5865f2
kres.colors.success    // 0x57f287
kres.colors.warning    // 0xfee75c
kres.colors.danger     // 0xed4245
kres.colors.info       // 0x3498db

// Color aliases
kres.colors.blurple    // 0x5865f2
kres.colors.green      // 0x57f287
kres.colors.red        // 0xed4245
kres.colors.yellow     // 0xfee75c

// Extended palette (200+ colors!)
kres.colors.lavender   // 0xb57edc
kres.colors.coral      // 0xff7f50
kres.colors.mint       // 0x98ff98
kres.colors.ocean      // 0x1ca9c9
kres.colors.sunset     // 0xff4500
kres.colors.galaxy     // 0x2e003e
// ... and many more!

// Use in embeds
kui.embed({
  title: "Colorful!",
  color: kres.colors.lavender
});

// Use in containers
kui.container.create([...], kres.colors.ocean);
```

#### Styles

```typescript
// Button styles
kres.styles.button.primary;
kres.styles.button.secondary;
kres.styles.button.success;
kres.styles.button.danger;
kres.styles.button.link;
kres.styles.button.premium;

// Button style aliases
kres.styles.button.blurple; // Same as primary
kres.styles.button.grey; // Same as secondary
kres.styles.button.green; // Same as success
kres.styles.button.red; // Same as danger

// Text input styles
kres.styles.input.short;
kres.styles.input.paragraph;
kres.styles.input.long; // Alias for paragraph

// Use in components
kui.modal.input({
  customId: "bio",
  label: "Biography",
  style: kres.styles.input.paragraph,
});
```

---

## 🎯 Complete Example

Here's a complete example bringing it all together:

```typescript
import { kui, kut, kfeat, kres } from "@lealt/kaori";

// Setup templates
const templates = kfeat.templates.create().register({
  id: "welcome",
  render: (data: { username: string; memberCount: number }) =>
    kui.embed({
      title: `Welcome ${data.username}!`,
      description: `You are member #${data.memberCount}`,
      color: kres.colors.success,
      timestamp: new Date(),
    }),
});

// Setup state
interface ServerConfig {
  prefix: string;
  welcomeChannel: string;
}

const configState = kfeat.state.define<ServerConfig>({
  id: "configs",
  maxSize: 1000,
  ttl: kfeat.timer.create(1).hour(),
});

// Command handler
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "setup") {
    // Check permissions
    const permCheck = kut.checkers.checkPermissions(interaction.member, ["ManageGuild"]);

    if (!permCheck.hasPermission) {
      return interaction.reply({
        embeds: [
          kui.embed({
            title: "❌ No Permission",
            description: `Missing: ${permCheck.missing.join(", ")}`,
            color: kres.colors.danger,
          }),
        ],
        flags: "Ephemeral",
      });
    }

    // Create config modal
    const modal = kui.modal.create({
      customId: "config_modal",
      title: "Server Configuration",
      components: [
        kui.modal.input({
          customId: "prefix",
          label: "Bot Prefix",
          placeholder: "!",
          required: true,
          maxLength: 5,
        }),
      ],
    });

    await interaction.showModal(modal);
  }
});

// Modal submission
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "config_modal") {
    const { prefix } = kut.interaction.extractModalValues(interaction, {
      prefix: "prefix",
    });

    // Save to state
    configState.set(interaction.guildId!, {
      prefix,
      welcomeChannel: interaction.channelId,
    });

    await interaction.reply({
      embeds: [
        kui.embed({
          title: "✅ Configuration Saved",
          description: `Prefix set to: \`${prefix}\``,
          color: kres.colors.success,
        }),
      ],
      flags: "Ephemeral",
    });
  }
});

// Welcome new members
client.on("guildMemberAdd", async (member) => {
  const config = configState.get(member.guild.id);
  if (!config) return;

  const channel = member.guild.channels.cache.get(config.welcomeChannel);
  if (!channel?.isTextBased()) return;

  const welcomeEmbed = templates.render("welcome", {
    username: member.user.username,
    memberCount: member.guild.memberCount,
  });

  await channel.send({ embeds: [welcomeEmbed] });
});
```

---

## 📝 License

[MIT](LICENSE)

Made with ❤️ by [Lealt](https://github.com/lealtt)
