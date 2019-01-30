const { Command } = require('discord.js-commando');
let moment = require('moment-timezone');

module.exports = class TimetwoCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'time2', // Name of this command.
            memberName: 'time2', // Name of this command.
            group: 'misc', // The group the command belongs to, assigned upon registration.
            description: 'A short description goes here.', // Short description of the command.
            details: ` // Short description of the command
            A long description for
            your command goes here.
            `,
            examples: ['time'],
            format: '[time]', // Usage format string of the command.
            args: [ // Go here for argument help: http://discord.js.org/#/docs/commando/master/class/Argument
                {
                    key: 'time',
                    label: 'time',
                    prompt: 'What text would you like to provide?',
                    type: 'string',
                    default: ''
                },
                {
                    key: 'zone',
                    label: 'zone',
                    prompt: 'What text would you like to provide?',
                    type: 'string',
                    default: ''
                }
            ],
            guarded: false, // Whether the command is protected from being disabled.
            guildOnly: false, // Whether the command can only be run in a guild channel.
            ownerOnly: true // Whether the command can only be used by an owner.
        })
    }


    async run (message, {time, zone}) {
        let timeformat;
        if(time && !zone){
            timeformat = moment(time, ["hmm", "HH:mm", "hmma", "HH:mma"]);
            message.say(`SGT ${timeformat.format('HH:mm')}, in other time zones:\n\n`);
        } else if (time && zone){
            return message.say("time + zone");
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