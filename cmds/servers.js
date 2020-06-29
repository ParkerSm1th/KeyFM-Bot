const Discord = require('discord.js');

module.exports.run = async (Client, bot, message, args, helpers) => {

  let count = bot.guilds.size;
  helpers.sendSimpleEmbed(message.channel, "Server Count", "Total Servers Joined", count);

}
 
module.exports.help = {
  name:"servers",
  others:["servercount"]
}
