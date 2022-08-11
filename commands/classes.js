const { Command } = require('discord-akairo');
const { success, error } = require('../reference');
const config = require('../config.json');
const actualClasses = config.classes;

class ClassesCommand extends Command {
    constructor() {
        super('classes', {
            aliases: ['classes'],
            category: 'profiles',
            channel: 'guild'
        });
    }

    async exec(message, args) {
        var classList = "";
        for(var i = 0; i < actualClasses.length; i++) {
            classList += "*" + actualClasses[i] + "*, ";
        }
        classList = classList.slice(0, -2);
        message.channel.send(success("here are the classes currently in the database: \n\n" + classList, message, true));
    }
    
}
module.exports = ClassesCommand;
