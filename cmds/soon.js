const Discord = require('discord.js');
const axios = require('axios');
const { Canvas } = require('canvas-constructor');
const { resolve, join } = require("path");

module.exports.run = async (Client, bot, message, args, helpers) => {
  message.channel.startTyping();
  axios.get('https://keyfm.net/splash/_scripts_/stats.php?specific=nextUp')
  .then(async (response) => {
    let stats = response.data;
    let img1 = stats[0].img;
    let img2 = stats[1].img;
    let img3 = stats[2].img;
    if (img1 == "assets/images/square.png") {
      img1 = "https://staff.keyfm.net/images/square.png";
    }
    if (img2 == "assets/images/square.png") {
      img2 = "https://staff.keyfm.net/images/square.png";
    }
    if (img3 == "assets/images/square.png") {
      img3 = "https://staff.keyfm.net/images/square.png";
    }
    let aResponse = await axios.get(img1,  { responseType: 'arraybuffer' });
    let bResponse = await axios.get(img2,  { responseType: 'arraybuffer' });
    let cResponse = await axios.get(img3,  { responseType: 'arraybuffer' });
    const nbf = Buffer.from(aResponse.data, "utf-8")
    const nebf = Buffer.from(bResponse.data, "utf-8")
    const lbf = Buffer.from(cResponse.data, "utf-8")
    let test = new Canvas(500, 250)
    .printLinearGradient(0, 0, 500, 250, [
        { position: 0, color: '#5F20AE' },
        { position: 0.20, color: '#8C42EB' },
        { position: 0.75, color: '#863D88' }
    ])
    .addBeveledRect(0, 0, 500, 250, 10)
    .setStroke("rgba(255, 255, 255, 0.3)")
    .setLineWidth(5)
    .addStrokeRect(0, 0, 500, 250)
    .setColor('#ffffff')
    .setTextFont('25px Sequel')
    .setTextAlign('center')
    .addText(stats[0].name, 85, 210)
    .setTextFont('30px Sequel')
    .addText("NOW", 85, 70)
    .setShadowBlur(10)
    .setShadowColor('rgba(255, 255, 255, 0.5)')
    .setShadowOffsetX(0)
    .setShadowOffsetY(0)
    .setColor('rgba(255, 255, 255, 1)')
    .addCircle(85, 130, 43)
    .addCircularImage(nbf, 85, 130, 42)
    .setTextFont('25px Sequel')
    .setTextAlign('center')
    .addText(stats[1].name, 250, 210)
    .setTextFont('30px Sequel')
    .addText("NEXT", 250, 70)
    .setShadowBlur(10)
    .setShadowColor('rgba(255, 255, 255, 0.5)')
    .setShadowOffsetX(0)
    .setShadowOffsetY(0)
    .setColor('rgba(255, 255, 255, 1)')
    .addCircle(250, 130, 43)
    .addCircularImage(nebf, 250, 130, 42)
    .setTextFont('25px Sequel')
    .setTextAlign('center')
    .addText(stats[2].name, 415, 210)
    .setTextFont('30px Sequel')
    .addText("LATER", 415, 70)
    .setShadowBlur(10)
    .setShadowColor('rgba(255, 255, 255, 0.5)')
    .setShadowOffsetX(0)
    .setShadowOffsetY(0)
    .setColor('rgba(255, 255, 255, 1)')
    .addCircle(415, 130, 43)
    .addCircularImage(lbf, 415, 130, 42)
    .toBuffer();


    message.channel.send({
        file: test
    });
    message.channel.stopTyping();
  });

}

module.exports.help = {
  name:"next",
  others:["upnext", "timetable", "soon"],
  disabled:[]
}
