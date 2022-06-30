const Discord = require('discord.js');
const config = require('./config.json');
let colors = config.colors

 function success(description, message) {
    let color = colors[Math.floor(Math.random() * colors.length)];	
    const successEmbed = new Discord.MessageEmbed();
    successEmbed.setDescription("**" + message.member.user.tag + ",** " + description);
    successEmbed.setColor(color);
    return successEmbed;
  }

function error(description, message) {
    let color = colors[Math.floor(Math.random() * colors.length)];	
    const failEmbed = new Discord.MessageEmbed();
    failEmbed.setDescription("**" + message.member.user.tag + ",** " + description);
    failEmbed.setColor("#ff0000");
    return failEmbed;
}
  module.exports = { success, error };
