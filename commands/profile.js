const { Command } = require('discord-akairo');
const { success, error, profile } = require('../reference');

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
        var w = message.member;
        if(args.username != null) {
            var z = this.client.settings.get(args.username.id , "classes");
        } else var z = this.client.settings.get(message.member.user.id, "classes");
        var logError = "";
        if(args.username != null) {
            p = this.client.settings.get(args.username.id, 'userInfo');
            w = args.username;
            if(p == undefined) {
                logError = "that user hasn't set their about me yet."
            } 
        }
        if(p == undefined && logError == "") {
            logError = "you haven't set your about me yet."
        }

        if(logError != "") {
            message.channel.send(error(logError, message));
        } else {
            message.channel.send(profile(message, w, p, z))
        }
    }

}
module.exports = ProfileCommand;
