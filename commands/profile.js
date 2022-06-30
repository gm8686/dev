const { Command } = require('discord-akairo');
const { success, error } = require('../reference');

class ProfileCommand extends Command {
    constructor() {
        super('profile', {
            aliases: ['profile'],
            args: [
                {
                    id: 'username',
                    type: 'member',
                    match: 'rest'
                },
            ]
        });
    }

    exec(message, args) {
        var p =  this.client.settings.get(message.member.user.id, 'userInfo');
        var w = message.member.user.tag;
        var logError = "";
        if(args.username != null) {
            p = this.client.settings.get(args.username.id, 'userInfo');
            w = args.username.user.tag;
            if(p == undefined) {
                logError = "that user has't set their about me yet."
            } 
        }
        if(p == undefined && logError == "") {
            logError = "you haven't set your about me yet."
        }

        if(logError != "") {
            message.channel.send(error(logError, message));
        } else {
            message.channel.send(success("** " + w + "**'s current about me is: **" + p + "**.", message, false));
        }
    }
}

module.exports = ProfileCommand;
