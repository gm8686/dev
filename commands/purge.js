const { Command } = require('discord-akairo');
const { success, error } = require('../reference');

    class PurgeCommand extends Command {
        constructor() {
            super('purge', {
                aliases: ['purge'],
                category: 'Messages',
                args: [{ 
                    id: 'purge', type: 'number', default: null, 
                        prompt: {
                            start: `please provide a quantity of messages from 1-50 to delete.`,
                            retry: `please provide a quantity of messages from 1-50 to delete.`,    
                        } 
                }],
                userPermissions: ['MANAGE_MESSAGES'],
                clientPermissions: ['MANAGE_MESSAGES']
            })
        }

        async exec(message, args) {
        if(args.purge < 1 || args.purge > 50) {
            return message.channel.send({embeds: [error("please enter a number greater than 0 and less than 50.", message)]})
        }
        const z = await message.channel.messages.fetch({ limit: args.purge });
        await message.delete() && await message.channel.bulkDelete(z);

        return await message.channel.send({embeds: [success("you successfully deleted " + args.purge + " messages.", message, true)]});
        }
    }

module.exports = PurgeCommand;