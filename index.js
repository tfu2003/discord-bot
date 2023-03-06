const { Client, GatewayIntentBits } = require('discord.js')
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        // ...
    ]
})

client.once("ready", () => console.log("Waver is online"))

client.login(process.env.TOKEN);