const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');

module.exports = class CarnivalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'carnival',
            memberName: 'carnival',
            group: 'reactions',
            description: 'Carnival Dayo!!!',
            aliases: ['maya'],
            examples: ['carnival']
        });
    }

    async run (message, args) {
        const embed = new Discord.RichEmbed()
            .setImage(assets["carnival"])
            .setColor(15750656)
        return message.embed(embed);
    }
};