const { Command } = require('discord-akairo');
const { success, error } = require('../reference');

    class RemoveCardCommand extends Command {
        constructor() {
            super('removecard', {
                aliases: ['removecard', 'deletecard'],
                category: 'Study',
                args: [
                    {
                        id: 'information',
                        match: 'content'
                    }
                ],
            })
        }

        async exec(message, args) {
                var arr = this.client.settings.get(message.member.user.id, "terms") || [];
                if(arr.length == 0) {
                    return message.channel.send({embeds: [error("you don't have any cards yet. You can add some using the ``$addcard`` command.", message)]});
                } else {
                    var pointer;
                    for(var i = 0; i < arr.length; i++) {
                        if(arr[i][0].toLowerCase().includes(args.information.toLowerCase()) || arr[i][1].toLowerCase().includes(args.information.toLowerCase())) {
                            pointer = i;
                        } 
                    }
                        if(pointer != null) {
                            message.channel.send({ embeds: [success("I successfully removed the card **" + arr[pointer][0] + "** from your set.", message, true)] });
                            arr.splice(pointer, 1);
                            await this.client.settings.set(message.member.user.id, "terms", arr);
                        } else {
                            return message.channel.send({embeds: [error("I couldn't find any cards with the provided information. Please try again.", message)]});
                        }
                    
                }
        }
    }

module.exports = RemoveCardCommand; 