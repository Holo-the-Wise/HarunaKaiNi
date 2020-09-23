const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const ownerid = require('../../config.json').OwnerId;

module.exports = class TriggeredlCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'triggered',
            memberName: 'triggered',
            group: 'reactions',
            description: 'REEEEEEEEEEEEEE',
            examples: ['triggered']
        });
    }

    async run (message, args) {

        let owner = message.guild.members.get(ownerid);
        
        let size = assets["triggered"].length;
        let randNumber = Math.floor((Math.random() * size));
      
        const embed = new Discord.RichEmbed()
            .setImage(assets["triggered"][randNumber])
            .setColor(0xFFFFFF)

        // owner.send(`Triggered command activated by ${message.author.tag} (${message.author.id})`);
        return message.embed(embed).then(message.delete());
    }
};