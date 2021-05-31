const { Command } = require('discord.js-commando');
// const rolecooldown = 1000 * 60 * 60 * 16;//cooldown, after this time the roles are reset: 1000 * secs * mins* hours
const logger = require('../../util/logging');
const Canvas = require('canvas');
const drawMultilineText = require('canvas-multiline-text');
const Discord = require("discord.js");
const moment = require('moment-timezone');
//const phrases = require('../../assets/cbphrases.json');

module.exports = class RollcallCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'rollcall', 
            memberName: 'rollcall', 
            group: 'clanbattle', 
            description: 'Starts a rollcall for CB', 
            aliases: [ 'cw', 'cws', 'cb', 'cbs', 'cbrollcall', 'cwrollcall' ],
            guarded: true,
            guildOnly: true
        })
    }

    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message) {
        
        /* DONT TOUCH */ 
        let cwconfirmed = message.guild.roles.cache.find(u => u.name == "CB Confirmed");
        let fishrole = message.guild.roles.cache.find(u => u.name == "Clan Battles");
        
        if (!cwconfirmed) {
            return message.channel.send("Error no CB roles found");
        };
    
        if (message.client.rollcallActive) {
            return message.channel.send("A CW rolecall is already active for tonight.");
        }
        const hawoo = message.guild.emojis.cache.find(emoji => emoji.name === "hawoo");
        const cheer = message.guild.emojis.cache.find(emoji => emoji.name === "a_nekocheer");

        //canvas start
        /*

        // for( let i = 0 ; i < phrases.length ; i++){
        const canvas = Canvas.createCanvas(600, 200);
        const ctx = canvas.getContext('2d');
        
        // Since the image takes time to load, you should await it
        const background = await Canvas.loadImage('./assets/CleveCBBG2.png');
        const gif = await Canvas.loadImage('./assets/CleveCBBG1.gif');

        // This uses the canvas dimensions to stretch the image onto the entire canvas
        ctx.drawImage(gif, 0, 0, canvas.width, canvas.height);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer());
        */
        
        let attachment = new Discord.MessageAttachment('./assets/CleveRollcall.png');
        /* DONT TOUCH  */
        // channel.send({
        //     files: [{
        //       attachment: 'entire/path/to/file.jpg',
        //       name: 'file.jpg'
        //     }]
        //   })

        message.channel.send(`Ahoy ${fishrole} team, Cleveland here!!  Please react ${hawoo} if you are available for Clan Battles tonight!\nGood luck and have fun! ${cheer}`, attachment).then(msg => {
            message.delete();
            msg.react(hawoo.id);
            message.client.rollcallMsgId = msg.id;
            message.client.rollcallActive = true;
            
            logger(message.client, `Command Rollcall activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);
            
            
            setTimeout(function () {

                let membersArray = cwconfirmed.members.array();
                for (var i = 0; i < membersArray.length; i++) {
                    membersArray[i].roles.remove(cwconfirmed);
                }

                message.client.rollcallMsgId  = 0;
                message.client.rollcallActive = false;
                msg.delete();

                logger(message.client, `Rollcall cleared normally`);
            }, message.client.cbtimer);
        }).catch(console.error); 
    // )
        

/* Haruna part
        let day = moment().format('DD');
        let month = moment().format('MMM').toUpperCase();


        // for( let i = 0 ; i < phrases.length ; i++){
        const canvas = Canvas.createCanvas(565, 173);
        const ctx = canvas.getContext('2d');
        
        // Since the image takes time to load, you should await it
        const background = await Canvas.loadImage('./assets/CBrollcallBG.png');
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


        ctx.font = 'bold 50px sans-serif';
        ctx.fillStyle = '#000000'; 
        ctx.textAlign = "center"
        ctx.fillText(day, 398, 103);

        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(month, 400, 61);

        // rectangle for testing text bounds
        // ctx.beginPath();
        // ctx.lineWidth = "1";
        // ctx.strokeStyle = "red";
        // ctx.rect(30, 15, 100, 140);
        // ctx.stroke();

        let size = phrases.length;
        let randNum = Math.floor((Math.random() * size));
        let thisPhrase = phrases[randNum];

        ctx.textAlign = "left"
        drawMultilineText(canvas.getContext('2d'), thisPhrase,
            {
                rect: {
                    x: 30,
                    y: 15,
                    width:  85,
                    height: 125
                },
                font: 'sans-serif',
                verbose: false,
                minFontSize: 10,
                maxFontSize: 30
            }
        );
        */

}};