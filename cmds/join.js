const Discord = require('discord.js');

module.exports.run = async (Client, bot, message, args, helpers) => {

  const stream = "http://procyon.shoutca.st:8223/stream";
  const channel = message.member.voiceChannel;
  if (message.channel.guild.id == "704843392911409184") {
    if (channel == null) {
      helpers.sendErrorEmbed(message.channel, "Whoops! Please be in the **Listen Live** to listen to the bot!");
      return true;
    }
    if (message.author.id !== "212630637365035009") {
      if (channel.id !== "718733708001149018") {
        helpers.sendErrorEmbed(message.channel, "Whoops! Please be in the **Listen Live** to listen to the bot!");
      } else {
        channel.join()
        .then(connection => {
          helpers.sendSuccessEmbed(message.channel, `Woohoo! I've joined the channel, please give me a few seconds to fetch the stream..`);
          connection.playArbitraryInput(stream,  {bitrate: 96000, volume: 1});
        })
        .catch(err => {
          helpers.sendErrorEmbed(message.channel, `Whoops! I wasn't able to join that channel, I might not have permission to join that channel..`);
        })
      }
    } else {
      channel.join()
      .then(connection => {
        helpers.sendSuccessEmbed(message.channel, `Woohoo! I've joined the channel, please give me a few seconds to fetch the stream..`);
        connection.playArbitraryInput(stream,  {bitrate: 96000, volume: 1});
      })
      .catch(err => {
        helpers.sendErrorEmbed(message.channel, `Whoops! I wasn't able to join that channel, I might not have permission to join that channel..`);
      })
    }
  } else {
    if (channel == null) {
      helpers.sendErrorEmbed(message.channel, "Whoops! Please be in a channel to listen to the bot!");
      return true;
    }
    channel.join()
    .then(connection => {
      helpers.sendSuccessEmbed(message.channel, `Woohoo! I've joined the channel, please give me a few seconds to fetch the stream..`);
      connection.playArbitraryInput(stream,  {bitrate: 96000, volume: 1});
    })
    .catch(err => {
      helpers.sendErrorEmbed(message.channel, `Whoops! I wasn't able to join that channel, I might not have permission to join that channel..`);
    })
  }

}

module.exports.help = {
  name:"join",
  others:["play", "listen"]
}
