const generalChannelID = require("../config.json").generalChannel;
const capChannelID = require("../config.json").capChannel;
let welcome = require('../assets/welcome.json');
const silencedRole = require('../config.json').silencedrole;
const Discord = require("discord.js");
// const MessageAttachment = require('discord.js');
const Canvas = require('canvas');
const ownerid = require('../config.json').OwnerId;

module.exports = async (client, member) => {

    let owner = member.guild.members.cache.get(ownerid);

    let guild = member.guild;
    let generalChannel = guild.channels.cache.find(u => u.id == generalChannelID);
    let capChannel = guild.channels.cache.find(u => u.id == capChannelID);
    console.log(`${member.user.username} has joined ${guild}`);

    if (client.muted[member.id]) {
        let silenced = guild.roles.find(u => u.name == silencedRole);
        generalChannel.send(`Welcome back ${member.user}, you're still muted`);
        capChannel.send(`${member.user} has rejoined the server, still muted!`);
        member.addRole(silenced);
        return owner.send(`${member.user.username} has joined the server, still muted`);
    } else {

        let size = welcome.length;
        let randNumber = Math.floor((Math.random() * size));
        let welcomeMsg = welcome[randNumber];
        let finalWelcome = welcomeMsg.replace("xxx", member.user);


        const canvas = Canvas.createCanvas(850, 500);
        const ctx = canvas.getContext('2d');

        // Since the image takes time to load, you should await it
        const background = await Canvas.loadImage('./assets/welcomeimage/background4.jpg');
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


        ctx.font = 'bold 60px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.fillText('Welcome to', 380, 80);
        ctx.fillText('FISH n CHIPS', 365, 150);

        nameSize = 120;
        do {
            ctx.font = `bold ${nameSize -= 10}px sans-serif`;
        } while (ctx.measureText(member.user.username).width > canvas.width - 400);
        
        ctx.textBaseline = "middle"; 
        ctx.fillText(member.user.username, 385, 410);
        
        ctx.beginPath();
        ctx.arc(228, 405, 93, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        //breaks here


        // const {
        //     body: buffer
        // } = await nodefetch(member.user.displayAvatarURL);
        // } = await snekfetch.get(member.user.displayAvatarURL);
        // console.log(member.user.avatarURL)
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'jpg', dynamic: true } ));
        

        //
        
        ctx.drawImage(avatar, 135, 313, 185, 185);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer());
        generalChannel.send(finalWelcome, attachment);
        capChannel.send(`${member.user} has joined the server, welcome!`);

        return owner.send(`${member.user.tag} has joined the server`);
    }
};