const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const ownerid = require('../../config.json').OwnerId;

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

        let owner = message.guild.members.get(ownerid);
        
        const embed = new Discord.RichEmbed()
            .setImage(assets["thumbsup"])
            .setColor(0x00FFFF)

        // owner.send(`Thumbs up command activated by ${message.author.tag} (${message.author.id})`);
        return message.embed(embed).then(message.delete());
    }
};