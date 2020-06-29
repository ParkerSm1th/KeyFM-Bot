const Discord = require('discord.js');

module.exports.run = async (Client, bot, message, args, helpers) => {

  switch(args[1]) {
    case "zane": 
      message.channel.send("https://depression.is-inside.me/xrbcoRE9.png");
    break;
    case "charlie":
      message.channel.send("https://depression.is-inside.me/kUHlAdOs.png");
    break;
    case "george":
      message.channel.send("https://images-ext-1.discordapp.net/external/KCe6rycenkWWdL3sYbSPd-hJiC8N0o2Xxh9yGDD3uUA/https/image.prntscr.com/image/pbd_qe4gQG6BFWXeurPnnA.png");
    break;
    case "julia":
      message.channel.send("https://prnt.sc/t5x75j");
    break;
    case "gay":
      message.channel.send("https://images-ext-1.discordapp.net/external/KCe6rycenkWWdL3sYbSPd-hJiC8N0o2Xxh9yGDD3uUA/https/image.prntscr.com/image/pbd_qe4gQG6BFWXeurPnnA.png");
    break;
    case "management":
      if (message.channel.parentID == "704843394203123828" || message.channel.parentID == "704843394203123832" || message.channel.parentID == "708837154670772286") {
        message.channel.send("https://media.discordapp.net/attachments/704843394203123829/725482565397643264/image0.png");
      } else {
        helpers.sendErrorEmbed(message.channel, "That meme is not approved for this channel, sorry!");
      }
    break;
    case "olly":
      if (message.channel.parentID == "704843394203123828" || message.channel.parentID == "704843394203123832" || message.channel.parentID == "708837154670772286") {
        message.channel.send("https://prnt.sc/t5x33c");
      } else {
        helpers.sendErrorEmbed(message.channel, "That meme is not approved for this channel, sorry!");
      }
    break;
    case "zak":
      if (message.channel.parentID == "704843394203123828" || message.channel.parentID == "704843394203123832" || message.channel.parentID == "708837154670772286") {
        message.channel.send("https://media.discordapp.net/attachments/704843394446524466/721871390105534534/image0.png");
      } else {
        helpers.sendErrorEmbed(message.channel, "That meme is not approved for this channel, sorry!");
      }
    break;
    case "aqua":
      if (message.channel.parentID == "704843394203123828" || message.channel.parentID == "704843394203123832" || message.channel.parentID == "708837154670772286") {
        message.channel.send("https://media.discordapp.net/attachments/704843394446524466/721131326949818368/unknown.png");
      } else {
        helpers.sendErrorEmbed(message.channel, "That meme is not approved for this channel, sorry!");
      }
    break;
    default:
      helpers.sendErrorEmbed(message.channel, "Invalid Meme ID!");
    break;
  }

}
 
module.exports.help = {
  name:"meme",
  others:["memes"]
}
