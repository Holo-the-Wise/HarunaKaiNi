const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');

module.exports = class CarnivalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'carnival',
            group: 'reactions',
            memberName: 'carnival',
            description: 'Carnival Dayo!!!',
            examples: ['carnival']
        });
    }

    async run (message, args) {
        const embed = new Discord.RichEmbed()
            .setImage(assets["carnival"])
            .setColor(15750656)
        message.embed(embed);
    }
;}