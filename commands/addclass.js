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
        var arr = await this.client.settings.get(message.member.user.id, "classes") || [];
        if(arr[0] == "none") {
            arr = [];
        }
        if(args.information != null) {
            const result = actualClasses.findIndex( item =>  item.toLowerCase().includes(args.information.toLowerCase()));
            if(result == -1) {
                return message.channel.send({ embeds: [error("that class isn't currently in the approved class database. Use $classes to see a list of approved classes.", message)] });
            } else {
                for(var i = 0; i < arr.length; i++) {
                    if(arr[i].toLowerCase().includes(args.information.toLowerCase())) {
                        return message.channel.send({ embeds: [error("you've already added that class.", message)] });
                    }
                }              
                message.guild.channels.cache.forEach(ch => 
                {
                    if(ch.name == (actualClasses[result].replace(/\s/g, "-").toLowerCase()))
                    ch.permissionOverwrites.edit(message.member.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
                }) 
                arr.push(actualClasses[result]);
                await this.client.settings.set(message.member.user.id, "classes", arr)
                message.channel.send({ embeds: [success("you've successfully added **" + actualClasses[result] + "** to your class list.", message, true)] });
            }
        } else {
            message.channel.send({ embeds: [error("you need to specify a value. Use $classes to see a list of approved classes.", message)] });
        }
    }
    
}
module.exports = AddClassCommand;
