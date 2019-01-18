const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');

module.exports = class ThumbsupCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'thumbsup',
            memberName: 'thumbsup',
            group: 'reactions',
            description: 'Megumin approves',
            examples: ['thumbsup']
        });
    }

    async run (message, args) {
        const embed = new Discord.RichEmbed()
            .setImage(assets["thumbsup"])
            .setColor(0x00FFFF)
        return message.embed(embed);
    }
};