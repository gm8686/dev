const mongoose = require('mongoose');
const { Intents } = require('discord.js');
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_MEMBERS);

const { AkairoClient, CommandHandler } = require('discord-akairo');
const MongooseProvider = require('akairo-mongoose');
require('dotenv').config();

const model = require('./models/guild');

class CustomClient extends AkairoClient {
    constructor() {
        super(
            {
                ownerID: '959638717239296040'
            },
            {
                disableMentions: 'everyone'
            }
        );

        this.settings = new MongooseProvider(model);

        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: (message) => {
                if (message.guild) {
                    return this.settings.get(message.guild.id, 'prefix', '$');
                }

                return '$';
            }
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
        const client = new CustomClient({intents: myIntents });
        client.login(process.env.TOKEN);
    })
    .catch((err) => console.log(err));
