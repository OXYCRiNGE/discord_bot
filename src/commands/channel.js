import { SlashCommandBuilder } from '@discordjs/builders';

const channelsCommand = new SlashCommandBuilder()
    .setName('channels')
    .setDescription('команда канала')
    .addChannelOption((option) =>
        option
            .setName('channel')
            .setDescription('канал')
            .setRequired(true)
    )

export default channelsCommand.toJSON();