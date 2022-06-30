const { Command } = require('discord-akairo');
const { success } = require('../reference');

class ProfileCommand extends Command {
    constructor() {
        super('profile', {
            aliases: ['profile']
        });
    }

    exec(message) {
        const p =  this.client.settings.get(message.member.user.id, 'userInfo');
        message.channel.send(success("your current about me is: **" + p + "**.", message));
    }
}

module.exports = ProfileCommand;
