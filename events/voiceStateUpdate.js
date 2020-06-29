const Logger = require('../utils/logger.js');
const Config = require('../config.js');
const Client = require('../client.js');
const fs = require("fs");

module.exports = async (Client, bot, helpers, oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    // User Joins a voice channel

 } else if(newUserChannel === undefined){
    
    if (oldUserChannel.members.size == 1) {
      oldUserChannel.leave();
    }

 }
}
