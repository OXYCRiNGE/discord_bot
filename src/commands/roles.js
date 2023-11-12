import { SlashCommandBuilder } from '@discordjs/builders';

const rolesCommand = new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('добавить роль')
    .addRoleOption((option) =>
        option
            .setName('name')
            .setDescription('название роли')
            .setRequired(true)
    )

export default rolesCommand.toJSON();