const { Command } = require('discord-akairo');
const { success, error } = require('../reference');

class CreateExamCommand extends Command {
    constructor() {
        super('createassignment', {
            aliases: ['createassignment', 'newassignment', 'establishassignment'],
            category: 'schoolMisc',
            args: [
                {
                    id: 'name',
                    match: 'content'
                },
                {
                    id: 'information',
                    match: 'content'
                }
            ],
            channel: 'guild'
        });
    }

    async exec(message, args) {

        console.log(message.channel.threads);

                
    }
    
}
module.exports = CreateExamCommand;
