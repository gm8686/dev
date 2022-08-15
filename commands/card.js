const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { success, error } = require('../reference');

    class CardCommand extends Command {
        constructor() {
            super('card', {
                aliases: ['card'],
                category: 'Study',
                args: [
                ],
            })
        }

        async exec(message, args) {
                var arr = this.client.settings.get(message.member.user.id, "terms") || [];
                if(arr.length == 0) {
                    message.channel.send({embeds: [error("you don't have any cards yet. You can add some using the ``$addcard`` command.", message)]});
                } else {
                    var z = 0;
                    for(var i = 0; i < arr.length; i++) {
                        z++;
                    }
                    var num =  Math.floor(Math.random() * (z - 0) + 0);
                    message.channel.send({embeds: [success("your term is **" + arr[num][0] + "**. Please respond accordingly.", message, true)]});
                    const filter = m => m.author.id == message.author.id;
                    var w = "";
                    await message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] })
                    
                      .then(collected => w = JSON.stringify(collected))
                      .catch(collected => w = "x");
                    if(w == "x") {
                        message.channel.send({embeds: [error("you didn't respond in the given time. Please try again using ``$cards``.", message)]});
                    } else {
                        if(JSON.parse(w)[0].content.toLowerCase() == arr[num][1].toLowerCase()) {
                            message.channel.send({embeds: [success("you correctly answered the term: **" + arr[num][0] + "**.", message, true)]});
                        } else {
                            message.channel.send({embeds: [error("you didn't answer this card correctly. Please try again using ``$cards``.", message)]});
                        }
                    }
                }
        }
    }

module.exports = CardCommand; 