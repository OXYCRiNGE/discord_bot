import { config } from 'dotenv';
import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';


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
        console.log(interaction.options.get('reason').value);
        interaction.reply({ content: `пред по четкой причине ${interaction.options.get('reason').value} на ${interaction.options.get('time').value} минут` });
    }
});

async function main() {

    const commands = [
        {
            name: 'wavn',
            description: 'get warn to user',
            options: [
                {
                    name: 'reason',
                    description: 'reason for warn',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'cringe',
                            value: '1',
                        },
                        {
                            name: 'aboba',
                            value: '2',
                        },
                    ],
                },
                {
                    name: 'time',
                    description: 'time',
                    type: 3,
                    required: true,
                },
            ],
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