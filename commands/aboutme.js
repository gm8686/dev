const { Command } = require('discord-akairo');
const { success, error } = require('../reference');

class AboutMeCommand extends Command {
    constructor() {
        super('aboutme', {
            aliases: ['aboutme'],
            category: 'profiles',
            args: [
                {
                    id: 'information',
                    match: 'content'
                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        await this.client.settings.set(message.member.user.id, 'userInfo', args.information);
        if(args.information != null) {
            return message.channel.send(success("you've successfully set your about me to **" + args.information + "**.", message));
        } else {
            return message.channel.send(error("you need to pick a value.", message));
        }
    }
}
module.exports = AboutMeCommand;
