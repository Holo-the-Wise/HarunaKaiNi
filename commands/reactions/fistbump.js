const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const ownerid = require('../../config.json').OwnerId;

module.exports = class FistbumpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fistbump',
            memberName: 'fistbump',
            group: 'reactions',
            description: 'Brofist!',
            examples: ['fistbump']
        });
    }

    async run (message, args) {

        let owner = message.guild.members.get(ownerid);
        
        const embed = new Discord.RichEmbed()
            .setImage(assets["fistbump"])
            .setColor(0x00FFFF)

        owner.send(`Fistbump command activated by ${message.author.tag} (${message.author.id})`);
        return message.embed(embed).then(message.delete());
    }
};