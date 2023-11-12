import { SlashCommandBuilder } from '@discordjs/builders';

const usersCommand = new SlashCommandBuilder()
    .setName('users')
    .setDescription('команда юзера')
    .addUserOption((option) =>
        option
            .setName('user')
            .setDescription('юзер')
            .setRequired(true)
    )

export default usersCommand.toJSON();