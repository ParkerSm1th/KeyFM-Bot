module.exports.run = async (Client, bot, message, args, helpers) => {

  switch(args[1]) {
    case "updates":
        if (message.member.roles.has('709464569546014871')) {
          helpers.sendSuccessEmbed(message.channel, "You will no longer get update pings.");
          message.member.removeRole('709464569546014871');
        } else {
          helpers.sendSuccessEmbed(message.channel, "You will now get update pings.");
          message.member.addRole('709464569546014871');
        }
      break;
    default:
      helpers.sendErrorEmbed(message.channel, "Invalid role! The current available role is 'updates'.");
    break;
  }

}

module.exports.help = {
  name:"roles",
  others:["role"],
  enabled: ["704843392911409184"]
}
