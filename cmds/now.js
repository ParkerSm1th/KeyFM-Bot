const Discord = require('discord.js');
const axios = require('axios');
const { Canvas } = require('canvas-constructor');
const { resolve, join } = require("path");

module.exports.run = async (Client, bot, message, args, helpers) => {
  message.channel.startTyping();
  axios.get('http://45.82.72.86:3200/stats')
  .then(async (response) => {
    let stats = response.data;
    let dj;
    let song;
    let artist;
    let img;
    if (stats.currentDJ.autoDJ) {
      dj = "KeyFM's Auto DJ";
    } else {
      dj = stats.currentDJ.username;
      img = stats.currentDJ.avatar;
    }
    if (stats.playing.error) {
      artist = "Error";
      song = "DJ setup incorrectly";
    } else {
      artist = stats.playing.artist;
      song = stats.playing.song;
    }
    let test;
    if (stats.currentDJ.autoDJ) {
      const aResponse = await axios.get("https://staff.keyfm.net/images/square.png",  { responseType: 'arraybuffer' })
      const buffer = Buffer.from(aResponse.data, "utf-8")
      test = new Canvas(500, 250)
      .printLinearGradient(0, 0, 500, 250, [
          { position: 0, color: '#07468F' },
          { position: 0.20, color: '#07468F' },
          { position: 0.75, color: '#0690AE' }
      ])
      .addBeveledRect(0, 0, 500, 250, 10)
      .setStroke("rgba(255, 255, 255, 0.3)")
      .setLineWidth(5)
      .addStrokeRect(0, 0, 500, 250)
      .setColor('#ffffff')
      .setTextFont('35px Jaldi')
      .setTextAlign('left')
      .addText(artist, 165, 110)
      .setTextFont('25px Jaldi')
      .setTextAlign('left')
      .addText(song, 165, 140)
      .setShadowBlur(10)
      .setShadowColor('rgba(255, 255, 255, 0.5)')
      .setShadowOffsetX(0)
      .setShadowOffsetY(0)
      .setColor('rgba(255, 255, 255, 1)')
      .addCircle(90, 100, 51)
      .addCircularImage(buffer, 90, 100, 50)
      .setTextFont('28px Sequel')
      .setTextAlign('center')
      .addText("Auto DJ", 90, 190)
      .toBuffer();
    } else {
      let aResponse;
      if (img == null) {
        aResponse = await axios.get("https://staff.keyfm.net/images/square.png",  { responseType: 'arraybuffer' })
      } else {
        aResponse = await axios.get("https://staff.keyfm.net/profilePictures/" + img,  { responseType: 'arraybuffer' })
      }
      const buffer = Buffer.from(aResponse.data, "utf-8")
      if (artist == "Error" && song == "DJ setup incorrectly") {
        test = new Canvas(500, 250)
        .printLinearGradient(0, 0, 500, 250, [
            { position: 0, color: '#892E28' },
            { position: 0.20, color: '#892E28' },
            { position: 0.75, color: '#840B03' }
        ])
        .addBeveledRect(0, 0, 500, 250, 10)
        .setStroke("rgba(255, 255, 255, 0.3)")
        .setLineWidth(5)
        .addStrokeRect(0, 0, 500, 250)
        .setColor('#ffffff')
        .setTextFont('35px Jaldi')
        .setTextAlign('left')
        .addText(artist, 165, 110)
        .setTextFont('25px Jaldi')
        .setTextAlign('left')
        .addText("DJ setup incorrectly", 165, 140)
        .setTextFont('28px Sequel')
        .setTextAlign('left')
        .addText(dj, 90, 190)
        .setShadowBlur(10)
        .setShadowColor('rgba(255, 255, 255, 0.5)')
        .setShadowOffsetX(0)
        .setShadowOffsetY(0)
        .setColor('rgba(255, 255, 255, 1)')
        .addCircle(90, 100, 51)
        .addCircularImage(buffer, 90, 100, 50)
        .toBuffer();
      } else {
        test = new Canvas(500, 250)
        .printLinearGradient(0, 0, 500, 250, [
            { position: 0, color: '#07468F' },
            { position: 0.20, color: '#07468F' },
            { position: 0.75, color: '#0690AE' }
        ])
        .addBeveledRect(0, 0, 500, 250, 10)
        .setStroke("rgba(255, 255, 255, 0.3)")
        .setLineWidth(5)
        .addStrokeRect(0, 0, 500, 250)
        .setColor('#ffffff')
        .setTextFont('35px Jaldi')
        .setTextAlign('left')
        .addText(artist, 165, 110)
        .setTextFont('25px Jaldi')
        .setTextAlign('left')
        .addText(song, 165, 140)
        .setTextFont('28px Sequel')
        .setTextAlign('center')
        .addText(dj, 90, 190)
        .setShadowBlur(10)
        .setShadowColor('rgba(255, 255, 255, 0.5)')
        .setShadowOffsetX(0)
        .setShadowOffsetY(0)
        .setColor('rgba(255, 255, 255, 1)')
        .addCircle(90, 100, 51)
        .addCircularImage(buffer, 90, 100, 50)
        .toBuffer();
      }

    }

    message.channel.send({
        file: test
    });
    message.channel.stopTyping();



  });


}

module.exports.help = {
  name:"now",
  others:["stats", "nowplaying", "current"],
  disabled:[]
}
