const Discord = require('discord.js');
const config = require('./config.json');
 function success(description, message) {
    let colors = config.colors
    let color = colors[Math.floor(Math.random() * colors.length)];	
    const successEmbed = new Discord.MessageEmbed();
    successEmbed.setDescription("**" + message.member.user.tag + ",** " + description);
    successEmbed.setColor(color);
    return successEmbed;
  }

  module.exports = { success };
