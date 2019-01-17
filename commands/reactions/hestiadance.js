const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');

module.exports = class HestiaDanceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hestiadance',
            group: 'reactions',
            memberName: 'hestiadance',
            description: 'You\'ve got 32 of \'em, remember to keep them clean!',
            examples: ['hestiadance']
        });
    }

    async run (message, args) {
        const embed = new Discord.RichEmbed()
            .setImage(assets["hestiadance"])
            .setColor(0x00FFFF)
        message.embed(embed);
    }
;}