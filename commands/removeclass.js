const { Command } = require('discord-akairo');
const { success, error } = require('../reference');
class RemoveClassCommand extends Command {
    constructor() {
        super('removeclass', {
            aliases: ['removeclass'],
            category: 'profiles',
            args: [{
                id: 'information',
                match: 'content'
            }],
            channel: 'guild'
        });
    }

    async exec(message, args) {
        var arr = await this.client.settings.get(message.member.user.id, "classes");
        if (arr[0] == "none" || arr == undefined) {
            return message.channel.send(error("you don't have any classes to remove.", message));
        }
        if (args.information != null) {
            const result = arr.findIndex(item => args.information.toLowerCase() === item.toLowerCase());
            if (result == -1) {
                return message.channel.send(error("you don't currently have that class.", message));
            } else {
                message.channel.send(success("you've successfully removed **" + arr[result] + "** from your class list.", message, true))
                if (result == 0) {
                    if (arr.length == 1) {
                        arr.push("none");
                    }
                    arr.shift();
                } else {
                    arr.splice(result, result);
                }
                await this.client.settings.set(message.member.user.id, "classes", arr)
            }
        } else {
            message.channel.send(error("you need to specify a value.", message));
        }
    }
    
}
module.exports = RemoveClassCommand;