const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const ownerid = require('../../config.json').OwnerId;

module.exports = class HestiaDanceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hestiadance',
            memberName: 'hestiadance',
            group: 'reactions',
            description: 'You\'ve got 32 of \'em, remember to keep them clean!',
            examples: ['hestiadance'],
            aliases: ['dance'],
        });
    }

    async run (message, args) {

        let owner = message.guild.members.get(ownerid);
        
        const embed = new Discord.RichEmbed()
            .setImage(assets["hestiadance"])
            .setColor(0x00FFFF)

        owner.send(`Hestiadance command activated by ${message.author.tag} (${message.author.id})`);
        return message.embed(embed).then(message.delete());
    }
};