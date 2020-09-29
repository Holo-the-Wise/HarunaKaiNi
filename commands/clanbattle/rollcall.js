const { Command } = require('discord.js-commando');
const rolecooldown = 1000 * 60 * 60 * 12;//cooldown, after this time the roles are reset: 1000 * secs * mins* hours
const logger = require('../../util/logging');

module.exports = class RollcallCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'rollcall', 
            memberName: 'rollcall', 
            group: 'clanbattle', 
            description: 'Starts a rollcall for CB', 
            aliases: [ 'cw', 'cws', 'cb', 'cbs', 'cbrollcall', 'cwrollcall' ],
            guildOnly: true
        })
    }


    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message, args) {

        let cwconfirmed = message.guild.roles.cache.find(u => u.name == "CB Confirmed");
        let cwmemes = message.guild.roles.cache.find(u => u.name == "Supreme Meme Stream Dream Team");
        let fishrole = message.guild.roles.cache.find(u => u.name == "FISH");

        if (!cwconfirmed && !cwmemes) {
            return message.channel.send("Error no CB roles found");
        };
    
        if (message.client.rollcallActive) {
            return message.channel.send("A CW rolecall is already active for tonight.");
        }
        const hawoo = message.guild.emojis.cache.find(emoji => emoji.name === "hawoo");
        const cheer = message.guild.emojis.cache.find(emoji => emoji.name === "a_nekocheer");
        const ramspin = message.guild.emojis.cache.find(emoji => emoji.name === "a_RamSpin");

        message.channel.send(`Ahoy ${fishrole}, Haruna desu!  Please react ${hawoo} if you are available for Clan Battles tonight! If you just want to meme please react ${ramspin}. \n Good luck and have fun! ${cheer}`).then(msg => {
            message.delete();
            msg.react(hawoo.id);
            msg.react(ramspin.id);
            message.client.rollcallMsgId = msg.id;
            message.client.rollcallActive = true;
            
            logger(message.client, `Command Rollcall activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`)
            
            setTimeout(function () {
                let membersArray = cwconfirmed.members.array();
                for (var i = 0; i < membersArray.length; i++) {
                    membersArray[i].removeRole(cwconfirmed);
                }

                let membersArray2 = cwmemes.members.array();
                for (var i = 0; i < membersArray2.length; i++) {
                    membersArray2[i].removeRole(cwmemes);
                }
                
                message.client.rollcallMsgId  = 0;
                message.client.rollcallActive = false;
                msg.delete();

                logger(message.client, `Rollcall cleared normally`)
            }, rolecooldown);

        }).catch(console.error);
    }
};