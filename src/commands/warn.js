import { SlashCommandBuilder } from 'discord.js';

export const warnCommand = new SlashCommandBuilder()
    .setName('warn')
    .setDescription('выдать варн')
    .addStringOption((option) =>
        option
            .setName('reason')
            .setDescription('причина варна')
            .setRequired(true)
            .setChoices(
                { name: 'cringe', value: '1' },
                { name: 'aboba', value: '2' },
            )
    )
    .addIntegerOption((option) =>
        option
            .setName('time')
            .setDescription('время варна')
            .setRequired(true));

warnCommand.toJSON()