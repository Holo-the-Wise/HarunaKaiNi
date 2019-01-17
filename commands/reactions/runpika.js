const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');

module.exports = class RunpikaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'runpika',
            group: 'reactions',
            memberName: 'runpika',
            description: 'Whoa Whoa! Whoa Whoa!',
            examples: ['runpika']
        });
    }

    async run (message, args) {
        const embed = new Discord.RichEmbed()
            .setImage(assets["runpika"])
            .setColor(0x00FFFF)
        message.embed(embed);
    }
;}