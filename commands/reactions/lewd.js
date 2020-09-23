const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const ownerid = require('../../config.json').OwnerId;

module.exports = class LewdCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lewd',
            memberName: 'lewd',
            group: 'reactions',
            description: 'When things are too lewd to handle',
            examples: ['lewd']
        });
    }

    async run (message, args) {

        let owner = message.guild.members.get(ownerid);
        
        let size = assets["lewd"].length;
        let randNumber = Math.floor((Math.random() * size));
      
        const embed = new Discord.RichEmbed()
            .setImage(assets["lewd"][randNumber])
            .setColor(0xFFFFFF)

        // owner.send(`Lewd command activated by ${message.author.tag} (${message.author.id})`);
        return message.embed(embed).then(message.delete());
    }
};