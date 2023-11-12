import { config } from 'dotenv';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import warnCommand from './commands/warn.js';
import rolesCommand from './commands/roles.js'


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
    const slash = interaction.commandName;
    switch (slash) {
        case 'warn':
            interaction.reply({ content: `пред по четкой причине ${interaction.options.get('reason').value} на ${interaction.options.get('time').value} минут` });
            break;
        case 'addrole':
            interaction.reply({content: `ок`});
            break
        default:
            break;
    }
});

async function main() {
    const commands = [warnCommand, rolesCommand];
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