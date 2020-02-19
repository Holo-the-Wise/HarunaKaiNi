const { Command } = require('discord.js-commando');
const Discord = require("discord.js");

module.exports = class EmojiCount extends Command {
    constructor(client) {
        super(client, {
            name: 'emojicount',
            memberName: 'emojicount',
            group: 'misc',
            description: 'Shows usage of emotes',
            aliases: [],
            examples: [],
            format: '',
            args: [{
                key: 'member',
                prompt: 'Which user would you like to get the avatar of?',
                type: 'member',
                default: 'clan'
            }],
            guildOnly: true,
            ownerOnly:true
        })
    }

    async run(message, args) {
        if(args.member == "clan"){
            console.log("using clan")
        }
    }
};