const Discord = require('discord.js');
const axios = require('axios');
const { Canvas } = require('canvas-constructor');
const { resolve, join } = require("path");

async function now(song, dj, djImg) {

}

module.exports.run = async (Client, bot, message, args, helpers) => {

  helpers.sendEmbed(message.channel, "Hi! Below is a list of commands..", [
    {
      name: "!now, !stats, !nowplaying, !current",
      value: "This command shows you the current song & DJ on KeyFM."
    },
    {
      name: "!soon, !upnext, !next, !timetable",
      value: "This command shows you who's on now, next, and later."
    },
    {
      name: "!join",
      value: "This command has the bot join your current channnel and allows you to listen to KeyFM through discord!"
    },
    {
      name: "!help, !helpme",
      value: "This command shows you this help menu!"
    }
  ]);
}

module.exports.help = {
  name:"help",
  others:["helpme"],
  disabled:[]
}
