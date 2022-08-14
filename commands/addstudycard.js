const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { success, error } = require('../reference');

    class AddStudyCardCommand extends Command {
        constructor() {
            super('addstudycard', {
                aliases: ['addstudycard'],
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
            if(args.term[0] != undefined && args.term[1] != undefined) {
                message.channel.send({embeds: [success("you've successfully added the card **" + args.term[0] + "** to your set.", message, true)]});
            } else {
                message.channel.send({embeds: [error("the correct usage is ``$addstudycard [term] [description]``.", message)]})
            }
        }
    }

module.exports = AddStudyCardCommand; 