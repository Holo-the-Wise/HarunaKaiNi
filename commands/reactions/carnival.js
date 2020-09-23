const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const ownerid = require('../../config.json').OwnerId;

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

        let owner = message.guild.members.get(ownerid);
        
        const embed = new Discord.RichEmbed()
            .setImage(assets["carnival"])
            .setColor(15750656)
        
        // owner.send(`Carnival command activated by ${message.author.tag} (${message.author.id})`);
        return message.embed(embed).then(message.delete());
    }
};