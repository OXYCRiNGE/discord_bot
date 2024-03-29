import { Client, GatewayIntentBits, REST, Routes, TextInputStyle } from 'discord.js';
import { config } from 'dotenv';
import banCommand from './commands/ban.js';
import channelsCommand from './commands/channel.js';
import modalCommand from './commands/modal.js';
import rolesCommand from './commands/roles.js';
import usersCommand from './commands/user.js';
import warnCommand from './commands/warn.js';
import { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } from '@discordjs/builders';


config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const rest = new REST({ version: '10' }).setToken(TOKEN)


client.login(TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} log in!`);
});

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        const slash = interaction.commandName;
        switch (slash) {
            case 'warn':
                const warnEmbed = new EmbedBuilder()
                    .setColor(16121600)
                    .setDescription(`Пользователь  **<@!${interaction.options.get('user').user.id}>** получает варн на **${interaction.options.get('time').value}** минут по причине **${interaction.options.get('reason').value}**`)
                interaction.reply({ embeds: [warnEmbed] });
                break;
            case 'addrole':
                interaction.reply({ content: `ок` });
                break;
            case 'users':
                interaction.reply({ content: `призываю ${interaction.options.get('user').user.username}` });
                break;
            case 'channels':
                interaction.reply({ content: `призываю канал ${interaction.options.get('channel').channel.name}` });
                break;
            case 'modal':
                const modal = new ModalBuilder()
                    .setTitle('Test title')
                    .setCustomId('show modal')
                    .setComponents(
                        new ActionRowBuilder().setComponents(
                            new TextInputBuilder()
                                .setLabel('text')
                                .setCustomId('text')
                                .setStyle(TextInputStyle.Short)
                        ),
                        new ActionRowBuilder().setComponents(
                            new TextInputBuilder()
                                .setLabel('text_text')
                                .setCustomId('text_text')
                                .setStyle(TextInputStyle.Paragraph)
                        )
                    );
                interaction.showModal(modal)
                break;
            default:
                break;
        }
    }
});

async function main() {
    const commands = [
        warnCommand,
        rolesCommand,
        usersCommand,
        channelsCommand,
        banCommand,
        modalCommand
    ];
    try {
        console.log('Started refreshing application (/) commands.');
        Routes.applicationGuildCommand()
        await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

main();