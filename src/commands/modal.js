import { SlashCommandBuilder } from '@discordjs/builders';

const modalCommand = new SlashCommandBuilder()
    .setName('modal')
    .setDescription('создать модальное окно')

export default modalCommand.toJSON();