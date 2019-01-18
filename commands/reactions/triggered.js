const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');

module.exports = class TriggeredlCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'triggered',
            memberName: 'triggered',
            group: 'reactions',
            description: 'REEEEEEEEEEEEEE',
            examples: ['triggered']
        });
    }

    async run (message, args) {
        let size = assets["triggered"].length;
        let randNumber = Math.floor((Math.random() * size));
      
        const embed = new Discord.RichEmbed()
            .setImage(assets["triggered"][randNumber])
            .setColor(0xFFFFFF)
        return message.embed(embed);
    }
};