const { Command } = require('discord-akairo');
const { success, error } = require('../reference');
const config = require('../config.json');
const actualClasses = config.classes;
class AddClassCommand extends Command {
    constructor() {
        super('addclass', {
            aliases: ['addclass'],
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
        if(this.client.settings.get(message.member.user.id, "classes") == undefined) {
            //await this.client.settings.set(message.member.user.id, "classes", ["none"]);
        }

        var arr = await this.client.settings.get(message.member.user.id, "classes") || [];
        console.log(arr);
        if(arr[0] == "none") {
            arr = [];
        }
        if(args.information != null) {

            const result = actualClasses.findIndex( item =>  args.information.toLowerCase() === item.toLowerCase());
            if(result == -1) {
                return message.channel.send(error("that class isn't currently in the approved class database.", message));
            } else {
                arr.push(actualClasses[result]);
                await this.client.settings.set(message.member.user.id, "classes", arr)
                message.channel.send(success("you've successfully added **" + actualClasses[result] + "** to your class list.", message, true))
            }
            console.log(result);
        } else {
            message.channel.send(error("you need to specify a value.", message));
        }


    }
}
module.exports = AddClassCommand;
