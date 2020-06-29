const Logger = require('../utils/logger.js');
const Config = require('../config.js');
const Client = require('../client.js');
const fs = require("fs");

module.exports = async (Client, bot, helpers, user) => {
  if (user.guild.id == "704843392911409184") {
    user.addRole('709464569546014871');
  }
}
