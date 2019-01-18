const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');

module.exports = class RunpikaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'runpika',
            memberName: 'runpika',
            group: 'reactions',
            description: 'Whoa Whoa! Whoa Whoa!',
            examples: ['runpika'],
            aliases: ['runepika'],
        });
    }

    async run (message, args) {
        const embed = new Discord.RichEmbed()
            .setImage(assets["runpika"])
            .setColor(0x00FFFF)
        return message.embed(embed);
    }
};