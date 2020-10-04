const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const logger = require('../../util/logging');

module.exports = class EmojiCount extends Command {
    constructor(client) {
        super(client, {
            name: 'emojicount',
            memberName: 'emojicount',
            group: 'misc',
            description: 'Shows usage of emotes',
            aliases: [],
            format: '',
            examples: [],
            args: [{
                key: 'member',
                prompt: 'Which user would you like to get the avatar of?',
                type: 'member',
                default: 'clan'
            }],
            guildOnly: true,
            ownerOnly: true
        })
    }

    async run(message, args) {

    return message.channel.send(`WIP: Stay tuned!`);
    }
};