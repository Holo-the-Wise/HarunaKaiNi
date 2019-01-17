const { Command } = require('discord.js-commando');
const Discord = require("discord.js");

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            group: 'misc',
            memberName: 'avatar',
            description: 'Display users avatar',
            examples: ['avatar'],
            args: [
                {
                    key: 'user',
                    prompt: 'Please mention a user',
                    type: 'user'
                }
            ]
        });
    }

    async run (message, args) {
        
    }
;}