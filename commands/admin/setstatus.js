const { Command } = require('discord.js-commando')
const ownerid = require('../../config.json').OwnerId;

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

        let owner = message.guild.members.get(ownerid);


        if (statustype === "playing" || statustype === "game"){
            message.client.user.setPresence({
                game: {
                    name: statustext
                }
            }).then().catch(console.error);
        } else if (statustype === "streaming" || statustype === "stream"){
            message.client.user.setPresence({
                game: {
                    name: statustext,
                    url: "https://www.twitch.tv/holo_thewise"
                }
            }).then().catch(console.error);
        } else if (statustype === "listen" || statustype === "listening"){
            message.client.user.setPresence({
                game: {
                    name: statustext,
                    type: "LISTENING"
                }
            }).then().catch(console.error);  
        } else if (statustype === "watch" || statustype === "watching"){
            message.client.user.setPresence({
                game: {
                    name: statustext,
                    type: "WATCHING"
                }
            }).then().catch(console.error);
        } else {
            return message.say("Unrecognised status type. Please check help for details.");
        }

        // owner.send(`${statustype} status changed to ${statustext} by ${message.author.username}`);
    }
};