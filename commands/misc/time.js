const { Command } = require('discord.js-commando');
let moment = require('moment-timezone');

module.exports = class TimeCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'time', // Name of this command.
            memberName: 'time', // Name of this command.
            group: 'misc', // The group the command belongs to, assigned upon registration.
            description: 'A short description goes here.', // Short description of the command.
            details: ` // Short description of the command
            A long description for
            your command goes here.
            `,
            examples: ['time'],
            format: '[time]', // Usage format string of the command.
            guarded: false, // Whether the command is protected from being disabled.
            guildOnly: false, // Whether the command can only be run in a guild channel.
            ownerOnly: false // Whether the command can only be used by an owner.
        })
    }


    async run (message, args) {
        let timeUSA = moment().tz("America/Chicago").format('HH:mm');
        let timeINDIA = moment().tz("Asia/Kolkata").format('HH:mm');
        let timeINDO = moment().tz("Asia/Jakarta").format('HH:mm');
        let timeSG = moment().tz("Asia/Singapore").format('HH:mm');
        let timeSA = moment().tz("Australia/Adelaide").format('HH:mm');
        let timeMELB = moment().tz("Australia/Melbourne").format('HH:mm');
        let timeNZ = moment().tz("Pacific/Auckland").format('HH:mm');
        let timeJP = moment().tz("Asia/Tokyo").format('HH:mm');
    
        return message.channel.send(`It is currently:\n\n` +
          `${timeUSA} in America (Central)\n` +
          `${timeINDIA} in India\n` +
          `${timeINDO} in Indonesia (West)/Vietnam\n` +
          `${timeSG} in Singapore/HK/Philippines/Indonesia (Central)\n` +
          `${timeJP} in Japan\n` +
          `${timeSA} in South Australia\n` +
          `${timeMELB} in Melbourne\n` +
          `${timeNZ} in New Zealand`);
    }
};