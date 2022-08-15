const { Command } = require('discord-akairo');
const { success, error } = require('../reference');

    class CardsCommand extends Command {
        constructor() {
            super('cards', {
                aliases: ['cards'],
                category: 'Study',
                args: [
                ],
            })
        }

        async exec(message, args) {
                var arr = this.client.settings.get(message.member.user.id, "terms") || [];
                if(arr.length == 0) {
                    return message.channel.send({embeds: [error("you don't have any cards yet. You can add some using the ``$addcard`` command.", message)]});
                } else {
                    var z = "";
                    for(var i = 0; i < arr.length; i++) {
                        z += "**" + arr[i][0] + "** *" + arr[i][1] + "*\n";
                    }
                    message.channel.send({embeds: [success("here are your current cards: \n\n" + z, message, true)]});
                }
        }
    }

module.exports = CardsCommand; 