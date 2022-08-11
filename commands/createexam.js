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
                    match: 'separate'
                }
            ],
            channel: 'guild'
        });
    }

    async exec(message, args) {
        if(message.channel.parent != undefined) {
            if(message.channel.parent.name.toLowerCase() != "classes") {
                return message.channel.send({ embeds: [error("you can't use this command outside of a class channel.", message)] });
            }
        } else {
            return message.channel.send({ embeds: [error("encountered an error finding channel parent.", message)] });
        }
        if(args.name != null) {
            var str = args.name[1] || "none";
            const thread = await message.channel.threads.create({
                name: args.name[0],
                autoArchiveDuration: 4320,
                reason: str,
            });
            const chan = message.guild.channels.cache.get(thread.id);
            const msg = await(chan.send({ embeds: [success("**Assignment Details: ** " + str + "\n**Created By:** "+ message.member.user.tag, message, false)] }));
        } else {
            message.channel.send({ embeds: [error("you need to specify the name of the assignment.", message)] });
        }
   
    }
    
}
module.exports = CreateExamCommand;
