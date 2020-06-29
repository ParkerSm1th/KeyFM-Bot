const Logger = require('./logger.js');
const Config = require('../config.js');
const fetch = require('node-fetch');
const qs = require('qs');
module.exports = {
  init: function(app, bot, helpers) {
    Logger.log("Initializing API");
    var apiref = Config.apiref;
    var port = Config.port;
    var api = Config.api;
    // NO API Key

    app.get(`/api/${apiref}/logs/:variable`,function(req,res) {
        var arg1 = req.params.variable;
        if (bot.channels.get(arg1) != null) {
          res.sendFile('/home/bots/KeyFM/logs/' + arg1 + ".txt");
        } else {
          helpers.returnData(res, "");
        }
    });

    // GET REQUEST

    // REQUIRED API KEY

    app.get(`/api/${apiref}/:variable/:api`,function(req,res) {
        if (req.params.api != api) {
          res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
          return true;
        }
        var arg1 = req.params.variable;
        returnData(res, arg1);
    });



    app.get(`/api/${apiref}/guild/:variable/:api`,function(req,res) {
        if (req.params.api != api) {
          res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
          return true;
        }
        var arg1 = req.params.variable;
        var guild = bot.guilds.get(arg1);
        guild.fetchMembers().then(() => {
          helpers.returnData(res, guild);
        });
    });



    // POST REQUEST

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post(`/api/${apiref}/post/:api`, function(req, res){
        if (req.params.api != api) {
          res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
          return true;
        }
        var arg1 = req.body.arg1;
        helpers.returnData(res, arg1);
    });

    app.post(`/api/${apiref}/verifyIP/`,function(req,res) {
        if (req.body.api != api) {
          res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
          return true;
        }
        var discordId = req.body.discordId;
        var username = req.body.username;
        var user = bot.guilds.get('704843392911409184').members.get(discordId);
        helpers.sendSimpleEmbed(user, `New IP Verification`, `Logging in?`, `Hi **${username}**! Someone is trying to log into the panel with a different IP than your normal IP. Please react with a check to verify this is you. If this was not you, you can safely ignore this message.`)
        .then(function(message) {
          res.send({
            success: true
          });
          message.react(`✅`);
          message.awaitReactions((reaction, user) => user.id == discordId && (reaction.emoji.name == '✅'),
          { max: 1, time: 30000 }).then(collected => {
                  if (collected.first().emoji.name == '✅') {
                          var data = {
                            api: "q1tbDYr9M4rCDM5Nos09Wrg7UlKpSunv9WM3BG9V9N5qeVE",
                            id: discordId
                          };
                          fetch(`https://staff.keyfm.net/panel/scripts/verifyIP.php`,
                            {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                              },
                              body: qs.stringify(data)
                            }).then(function(response) {

                              message.delete();
                            });
                  }
          }).catch(() => {
                  message.delete();
          });
        })
        .catch(function (e) {
          res.send({
            success: false
          });
        });

    });

    app.post(`/api/${apiref}/verifyStaff/`,function(req,res) {
      if (req.body.api != api) {
        res.json([{"success" : "false"}, {"error" : "Invalid API Key"}]);
        return true;
      }
      var discordId = req.body.discordId;
      var username = req.body.username;
      var user = bot.guilds.get('704843392911409184').members.get(discordId);
      console.log(discordId);
      console.log(username);
      user.setNickname("❖ " + username)
      .then(function() {
        helpers.sendSimpleEmbed(user, `Discord Linked`, `Congrats!`, `Hey **${username}**! Your discord has been linked to your panel account. You will now have the ❖ icon which symbolizes that your panel has been linked.`)
        .then(function(message) {
          res.send({
            success: true
          });
        })
        .catch(function (e) {
          res.send({
            success: false
          });
        });
      })
      .catch(function(e) {
        res.send({
          success: false
        });
      });

  });

    app.post(`/api/${apiref}/newForm/`,function(req,res) {
        if (req.body.api != api) {
          res.json([{"success" : "false"}, {"error" : "Invalid API Key"}, {"key": req.body.api}]);
          return true;
        }
        var type = req.body.type;
        var username = req.body.username;
        var mgmt = bot.guilds.get('704843392911409184').channels.get('704843393959723013');
        var hdj = bot.guilds.get('704843392911409184').channels.get('704843393959723010');
        if (type == 0) {
          mgmt.send("@everyone")
          .then(function(msg) {
            msg.delete();
          });
          helpers.sendSimpleEmbedNT(mgmt, `New Application!`, `**${username}** has sent in a new application, Please go review this application! https://staff.keyfm.net/panel/Manager.Applications`)
          .then(function () {
            res.send({
              success: true
            });
          })
          .catch(function (e) {
            res.send({
              success: false
            });
          });
        } 
        if (type == 1) {
          helpers.sendSimpleEmbedNT(mgmt, `${username} has sent in a new contact form`, `Please go view this contact form!`)
          .then(function () {
            res.send({
              success: true
            });
          })
          .catch(function (e) {
            res.send({
              success: false
            });
          });
        }
        if (type == 2) {
          hdj.send("@everyone")
          .then(function(msg) {
            msg.delete();
          });
          helpers.sendSimpleEmbedNT(hdj, `New PA request!`, `**${username}** has requested to post away, Please go review this request! https://staff.keyfm.net/panel/HDJ.PostAway`)
          .then(function () {
            res.send({
              success: true
            });
          })
          .catch(function (e) {
            res.send({
              success: false
            });
          });
        }

    });

    // Errors

    app.use(function(req, res, next) {
      res.status(404).json([{"success" : "false"}, {"error" : "Invalid API Call"}]);
    });

    app.use(function(req, res, next) {
      res.status(500).json([{"success" : "false"}, {"error" : "An error occured"}]);
    });
    app.listen(port);
    Logger.successLog("Started " + Config.projectname + "'s API on port " + Config.port + " (http://vps.parkersmith.io:" + Config.port + "/api/" + Config.apiref + ")");
  }
}
