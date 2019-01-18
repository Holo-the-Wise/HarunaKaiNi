const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');

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
        let size = assets["lewd"].length;
        let randNumber = Math.floor((Math.random() * size));
      
        const embed = new Discord.RichEmbed()
            .setImage(assets["lewd"][randNumber])
            .setColor(0xFFFFFF)
        return message.embed(embed);
    }
};