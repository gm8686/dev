const { Command } = require('discord-akairo');
const { success } = require('../reference');

class ProfileCommand extends Command {
    constructor() {
        super('profile', {
            aliases: ['profile'],
            args: [
                {
                    id: 'username',
                    type: 'member'
                },
            ]
        });
    }

    exec(message, args) {
        var p =  this.client.settings.get(message.member.user.id, 'userInfo', false);
        var w = message.member.user.tag;

        if(args.username != null) {
            p = this.client.settings.get(args.username.id, 'userInfo', false);
            w = args.username.user.tag;
        }
        message.channel.send(success("** " + w + "**'s current about me is: **" + p + "**.", message));

    }
}

module.exports = ProfileCommand;
