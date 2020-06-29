const Discord = require('discord.js');
const axios = require('axios');

module.exports.run = async (Client, bot, message, args, helpers) => {
  message.channel.startTyping();
  axios.get('https://keyfm.net/splash/_scripts_/stats.php?specific=nextUp')
  .then((response) => {
    let stats = response.data;
    helpers.sendEmbed(message.channel, "Now Playing", [
      {
        name: "Now",
        value: stats[0].name
      },
      {
        name: "Next",
        value: stats[1].name
      },
      {
        name: "Later",
        value: stats[2].name
      },
    ]);
    message.channel.stopTyping();
  });

}

module.exports.help = {
  name:"oldnext",
  others:[],
  disabled:[]
}
