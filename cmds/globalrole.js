module.exports.run = async (Client, bot, message, args, helpers) => {

  if (message.author.id !== "212630637365035009") return;

  switch(args[1]) {
    case "updates":
        let role = message.guild.roles.find(r => r.name == 'Updates')
        message.guild.members.filter(m => !m.user.bot).forEach(member => member.addRole(role))
        message.channel.send(`**${message.author.username}**, role **${role.name}** was added to all members`)
      break;
    default:
      helpers.sendErrorEmbed(message.channel, "Invalid role! The current available role is 'updates'.");
    break;
  }

}

module.exports.help = {
  name:"gr",
  others:[]
}
