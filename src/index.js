import { config } from 'dotenv';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';

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
    if (interaction.commandName === 'cring') {
        console.log('hello');
        interaction.reply({content: 'hellooo'});
    }
});

async function main() {
    const commands = [
        {
            name: 'ping',
            description: 'Replies with Pong!',
        },
        {
            name: 'cring',
            description: 'Replies with Aboba!',
        },
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