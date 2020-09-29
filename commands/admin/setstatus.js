const { Command } = require('discord.js-commando')
const logger = require('../../util/logging');

module.exports = class SetStatusCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'setstatus',
            memberName: 'setstatus',
            group: 'admin',
            description: 'set bots status check details for accepted argument types',
            details: `arg types: 'playing', 'game', 'listen', 'listening', 'watch', 'watching', 'streaming', 'stream'`,
            aliases: ['status', 'presence'],
            examples: ['setstatus playing WoWs', 'setstatus listening mimorin','setstatus watching fubuki', 'setstatus streaming WoWs'],
            format: '[setstatus [type] [game/music/stream]',
            args: [
                {
                    key: 'statustype',
                    prompt: 'Please provide the status type. (Playing/Listening/Watching/Streaming)',
                    type: 'string'
                },
                {
                    key: 'statustext',
                    prompt: 'What status would you like to display?',
                    type: 'string'
                }
            ],
            guildOnly: false,
            ownerOnly: true
        })
    }

    async run (message, {statustype, statustext}) {
        if (statustype === "playing" || statustype === "game"){
            statustype = "PLAYING";
        } else if (statustype === "streaming" || statustype === "stream"){
            statustype = "STREAMING";
        } else if (statustype === "listen" || statustype === "listening"){
            statustype = "LISTENING"; 
        } else if (statustype === "watch" || statustype === "watching"){
            statustype = "WATCHING";
        } else {
            return message.channel.send("Unrecognised status type. Please check help for details.");
        }

        message.client.user.setPresence({ 
            activity: {
                name: statustext,
                type: statustype,
                url: "https://www.twitch.tv/holo_thewise"
            }
        });

        logger(message.client, `Setstatus activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})\n` + 
        `Status type: ${statustype} - Status text: ${statustext}`);
    }
};