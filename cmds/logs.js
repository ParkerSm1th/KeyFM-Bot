var Config = require('../config.js');
module.exports.run = async (Client, bot, message, args, helpers) => {

  if (message.author.id !== "212630637365035009") return;

  helpers.sendSimpleEmbed(message.channel, `Logs`, `API link for ${Config.projectname}`, `http://vps.parkersmith.io:${Config.port}/api/${Config.apiref}/logs/${message.channel.id}`);

}

module.exports.help = {
  name:"logs",
  enabled: ["704843392911409184"]
}
