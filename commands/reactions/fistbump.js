const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const logger = require('../../util/logging');

module.exports = class FistbumpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fistbump',
            memberName: 'fistbump',
            group: 'reactions',
            description: 'Brofist!',
            examples: ['fistbump']
        });
    }

    async run (message) {

        logger(message.client, `Fistbump activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);
        
        const embed = new Discord.MessageEmbed()
            .setImage(assets["fistbump"])
            .setColor(0x00FFFF)
        if(message.channel.type == 'dm'){
            return message.channel.send(embed);
        } else {
            return message.channel.send(embed).then(message.delete());
        }
    }
};