const Discord = require('discord.js');
const Config = require('./config.js');
const fs = require("fs");


var express = require('express');

const Logger = require('./utils/logger.js');
const Loader = require('./loader.js');
const Functions = require('./utils/functions.js');
const APIClass = require('./utils/api.js');

class Client {
  constructor() {
    this.Logger = Logger;
    this.Config = Config;
    this.APIClass = APIClass;
    this.Loader = Loader;
    this.app = express();
    this.bot = new Discord.Client();
    this.global = {
        url: Config.url,
        projectname: Config.projectname,
        apiref: Config.apiref,
        port: Config.port,
        api: Config.api
    };
    this.helpers = {
        sendEmbed: Functions.sendEmbed,
        sendSimpleEmbed: Functions.sendSimpleEmbed,
        sendSimpleEmbedNT: Functions.sendSimpleEmbedNT,
        sendErrorEmbed: Functions.sendErrorEmbed,
        sendSuccessEmbed: Functions.sendSuccessEmbed,
        permsError: Functions.permsError,
        checkPerms: Functions.checkPerms,
        global: global,
        getTime: Functions.getTime
    };
    this.commands = new Discord.Collection();
  }

  init() {
    this.Loader.init(this, this.bot, this.helpers);
    this.bot.login(Config.token);
    this.APIClass.init(this.app, this.bot, this.helpers);
    this.Logger.successLog("Successfully logged in");
  }
}

module.exports = Client;
