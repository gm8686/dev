const Discord = require('discord.js');
const config = require('./config.json');
let colors = config.colors

 function success(description, message, includeTag) {
    let color = colors[Math.floor(Math.random() * colors.length)];	
    const successEmbed = new Discord.MessageEmbed();
    if(includeTag == false) {
        successEmbed.setDescription(description);
    } else {
        successEmbed.setDescription("**" + message.member.user.tag + ",** " + description);
    }
    successEmbed.setColor(color);
    return successEmbed;
  }

function error(description, message) {
    const failEmbed = new Discord.MessageEmbed();
    failEmbed.setDescription("**" + message.member.user.tag + ",** " + description);
    failEmbed.setColor("#ff0000");
    return failEmbed;
}

function profile(message, x, y, z) {
  let color = colors[Math.floor(Math.random() * colors.length)];	
  const prof = new Discord.MessageEmbed();
  var arr =  z;
  var classList = "";

  if(arr != undefined) {
    for (let i = 0; i < arr.length; i++) {
      classList += arr[i] + ", ";
    }
  } else {
    classList += "none  ";
  }

  classList = classList.slice(0, -2);
  prof.setDescription("**About Me**: " + y + "\n\n**Current Classes**: " + classList);
  var str = "https://cdn.discordapp.com/avatars/" + x.id + "/" + x.user.avatar + ".webp";
  prof.setAuthor({
    name: x.user.username + "'s profile",
    iconURL: str,
  })
  prof.setColor(color);
  return prof;
}
  module.exports = { success, error, profile };
