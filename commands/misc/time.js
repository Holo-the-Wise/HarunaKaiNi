const { Command } = require('discord.js-commando');
let moment = require('moment-timezone');

module.exports = class TimeCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'time', 
            memberName: 'time',
            group: 'misc', 
            description: 'Displays current time or specified time (in SGT) across multiple time zones', // Short description of the command.
            details: ` // Short description of the command
            A long description for
            your command goes here.
            `,
            examples: ['time', 'time 8pm', 'time 2045', 'time 20.45', 'time 8:45pm'],
            format: 'time [specific time] (if specific time is empty, will use current time)',
            args: [
                {
                    key: 'time',
                    label: 'time',
                    prompt: 'What text would you like to provide?',
                    type: 'string',
                    default: ''
                }
            ],
            guarded: false, // Whether the command is protected from being disabled.
            guildOnly: false, // Whether the command can only be run in a guild channel.
            ownerOnly: false // Whether the command can only be used by an owner.
        })
    }


    async run (message, {time}) {
        let timeformat;
        if(time){
            timeformat = moment(time, ["hmm", "HH:mm", "hmma", "HH:mma"]);
            message.say(`SGT ${timeformat.format('HH:mm')}, in other time zones:\n\n`);
        } else {
            timeformat = moment();
            message.say(`It is currently:`);
        }

        let timeUSA = timeformat.tz("America/Chicago").format('HH:mm');
        let timeINDIA = timeformat.tz("Asia/Kolkata").format('HH:mm');
        let timeINDO = timeformat.tz("Asia/Jakarta").format('HH:mm');
        let timeSG = timeformat.tz("Asia/Singapore").format('HH:mm');
        let timeSA = timeformat.tz("Australia/Adelaide").format('HH:mm');
        let timeMELB = timeformat.tz("Australia/Melbourne").format('HH:mm');
        let timeNZ = timeformat.tz("Pacific/Auckland").format('HH:mm');
        let timeJP = timeformat.tz("Asia/Tokyo").format('HH:mm');
        return message.channel.send(`\n\n${timeUSA} in America (Central)\n` +
            `${timeINDIA} in India\n` +
            `${timeINDO} in Indonesia (West)/Vietnam\n` +
            `${timeSG} in Singapore/HK/Philippines/Indonesia (Central)\n` +
            `${timeJP} in Japan\n` +
            `${timeSA} in South Australia\n` +
            `${timeMELB} in Melbourne\n` +
            `${timeNZ} in New Zealand`);









        // let timeUSA = moment().tz("America/Chicago").format('HH:mm');
        // let timeINDIA = moment().tz("Asia/Kolkata").format('HH:mm');
        // let timeINDO = moment().tz("Asia/Jakarta").format('HH:mm');
        // let timeSG = moment().tz("Asia/Singapore").format('HH:mm');
        // let timeSA = moment().tz("Australia/Adelaide").format('HH:mm');
        // let timeMELB = moment().tz("Australia/Melbourne").format('HH:mm');
        // let timeNZ = moment().tz("Pacific/Auckland").format('HH:mm');
        // let timeJP = moment().tz("Asia/Tokyo").format('HH:mm');
    
        // return message.channel.send(`It is currently:\n\n` +
        //   `${timeUSA} in America (Central)\n` +
        //   `${timeINDIA} in India\n` +
        //   `${timeINDO} in Indonesia (West)/Vietnam\n` +
        //   `${timeSG} in Singapore/HK/Philippines/Indonesia (Central)\n` +
        //   `${timeJP} in Japan\n` +
        //   `${timeSA} in South Australia\n` +
        //   `${timeMELB} in Melbourne\n` +
        //   `${timeNZ} in New Zealand`);
    }
};