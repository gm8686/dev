const mongoose = require('mongoose');
const { Intents } = require('discord.js');
const { AkairoClient, CommandHandler } = require('discord-akairo');
const MongooseProvider = require('akairo-mongoose');
require('dotenv').config();
const model = require('./models/guild');

class CustomClient extends AkairoClient {
    constructor() {
        super({ownerID: '959638717239296040'}, {
            intents: [
                "GUILDS",
                "GUILD_MEMBERS",
                "GUILD_MESSAGES",
                "GUILD_BANS",
                "GUILD_MESSAGE_REACTIONS",
                "DIRECT_MESSAGES",
                "DIRECT_MESSAGE_REACTIONS",
              ],
        })
        this.settings = new MongooseProvider(model);
        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: '$',
        });
        this.commandHandler.loadAll();
    }
    login(token) {
        this.settings.init();
        return super.login(token);
    }
}
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        const client = new CustomClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
        client.login(process.env.TOKEN);
    })
    .catch((err) => console.log(err));