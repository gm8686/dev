const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { success, error } = require('../reference');

    class AddStudyCardCommand extends Command {
        constructor() {
            super('addstudycard', {
                aliases: ['addstudycard', 'addcard','addcards'],
                category: 'Messages',
                args: [
                    {
                        id: 'term',
                        match: 'separate'
                    }
                ],
            })
        }

        async exec(message, args) {
            if(args.term != null && args.term[0] != undefined && args.term[1] != undefined) {
                message.channel.send({embeds: [success("you've successfully added the card **" + args.term[0] + "** to your set.", message, true)]});
                var arr = this.client.settings.get(message.member.user.id, "terms") || [];
                arr.push([args.term[0], args.term[1]]);
                await this.client.settings.set(message.member.user.id, "terms", arr)

            } else {
                message.channel.send({embeds: [error("the correct usage is ``$addcard [term] [description]``.", message)]})
            }
        }
    }

module.exports = AddStudyCardCommand; 