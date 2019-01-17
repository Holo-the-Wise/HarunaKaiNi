const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');

module.exports = class ClapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clap',
            group: 'reactions',
            memberName: 'clap',
            description: 'Congratulations!',
            examples: ['clap']
        });
    }

    async run (message, args) {
        const embed = new Discord.RichEmbed()
            .setImage(assets["puckclap"])
            .setColor(0xFFFFFF)
        message.embed(embed);
    }
;}