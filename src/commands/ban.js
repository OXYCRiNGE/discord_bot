import { SlashCommandBuilder } from "@discordjs/builders";

const banCommand = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("забанить пользователя")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("temp")
      .setDescription("временный бан")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("юзер")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("permanent")
      .setDescription("бан навсегда")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("юзер")
          .setRequired(true)
      )
  );

export default banCommand.toJSON();
