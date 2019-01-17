const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');

module.exports = class FistbumpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fistbump',
            group: 'reactions',
            memberName: 'fistbump',
            description: 'Brofist!',
            examples: ['fistbump']
        });
    }

    async run (message, args) {
        const embed = new Discord.RichEmbed()
            .setImage(assets["fistbump"])
            .setColor(0x00FFFF)
        message.embed(embed);
    }
;}