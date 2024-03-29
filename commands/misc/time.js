const { Command } = require('discord.js-commando');
let moment = require('moment-timezone');
const logger = require('../../util/logging');

module.exports = class TimeCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'time', 
            memberName: 'time',
            group: 'misc', 
            description: 'Displays current time or specified time (in SGT) across multiple time zones',
            details: `specific time may be left blank, in which cause the current time in SGT will be used`,
            format: '[specific time]',
            examples: ['time', 'time 8pm', 'time 2045', 'time 20.45', 'time 8:45pm'],
            args: [
                {
                    key: 'time',
                    label: 'time',
                    prompt: 'What text would you like to provide?',
                    type: 'string',
                    default: ''
                }
            ],
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

        let timeINDIA = timeformat.tz("Asia/Kolkata").format('HH:mm');
        let timeBANG = timeformat.tz("Asia/Dhaka").format('HH:mm');
        let timeINDO = timeformat.tz("Asia/Jakarta").format('HH:mm');
        let timeSG = timeformat.tz("Asia/Singapore").format('HH:mm');
        let timeSA = timeformat.tz("Australia/Adelaide").format('HH:mm');
        let timeMELB = timeformat.tz("Australia/Melbourne").format('HH:mm');
        let timeNZ = timeformat.tz("Pacific/Auckland").format('HH:mm');
        let timeJP = timeformat.tz("Asia/Tokyo").format('HH:mm');

        logger(message.client, `Time activated by ${message.author} (${message.author.tag} - ID: ${message.author.id}`);
        
        return message.channel.send(
            `\n\n${timeINDIA} in India\n` +
            `${timeBANG} in Bangladesh\n` +
            `${timeINDO} in Indonesia (West)/Vietnam/Thailand\n` +
            `${timeSG} in Singapore/HK/Philippines/Indonesia (Central)/Perth\n` +
            `${timeJP} in Japan\n` +
            `${timeSA} in South Australia\n` +
            `${timeMELB} in Melbourne\n` +
            `${timeNZ} in New Zealand`);
    }
};