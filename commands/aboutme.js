const { Command } = require('discord-akairo');
const { success } = require('../reference');

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
        return message.channel.send(success("you've successfully set your user profile about me to **" + args.information + "**.", message));
    }
}
module.exports = AboutMeCommand;
