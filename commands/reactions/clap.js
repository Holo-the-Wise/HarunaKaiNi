const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const ownerid = require('../../config.json').OwnerId;

module.exports = class ClapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clap',
            memberName: 'clap',
            group: 'reactions',
            description: 'Congratulations!',
            examples: ['clap']
        });
    }

    async run (message, args) {

        let owner = message.guild.members.get(ownerid);
        
        const embed = new Discord.RichEmbed()
            .setImage(assets["puckclap"])
            .setColor(0xFFFFFF)

        // owner.send(`Clap command activated by ${message.author.tag} (${message.author.id})`);
        return message.embed(embed).then(message.delete());
    }
};