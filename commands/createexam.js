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

        if(args.name != null) {
            const thread = await message.channel.threads.create({
                name: args.name[0],
                autoArchiveDuration: 60,
                reason: args.name[1] || "none",
            });
            const chan = message.guild.channels.cache.get(thread.id);
            var str = args.name[1] || "none";
            const msg = await(chan.send({ embeds: [success("**Assignment Details: ** " + args.name[1] + "\n**Created By:** "+ message.member.user.tag, message, false)] }));
        } else {
            message.channel.send({ embeds: [error("you need to specify the name of the assignment.", message)] });
        }
   
    }
    
}
module.exports = CreateExamCommand;
