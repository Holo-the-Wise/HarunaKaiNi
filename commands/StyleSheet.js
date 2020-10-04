/*
    The following comment examples where taken from the discord.js-commando docs.
    This file is basically an organization sheet for commands.
    This helps keeps commands consistent in organization.
*/

const { Command } = require('discord.js-commando')

module.exports = class StyleSheetCommand extends Command {
    constructor (client) {
        super(client, {
            name: '', // Name of this command.
            memberName: '', // Name of this command.
            group: 'StyleSheet', // The group the command belongs to, assigned upon registration.
            description: 'A short description goes here.', // Short description of the command.
            details:` A long description for your command goes here.`,
            aliases: [ // Aliases for this command.
                'SheetStyle',
                'CommandExample'
            ],
            format: '[Test/Testing/Testing123]', // Usage format string of the command.
            examples: [ // Example usage strings.
                'StyleSheet This is not a command.',
                'StyleSheet There are arguments.',
                'StyleSheet This is just an example.'
            ],
            args: [ // Go here for argument help: http://discord.js.org/#/docs/commando/master/class/Argument
                {
                    key: 'message',
                    label: 'text',
                    prompt: 'What text would you like to provide?',
                    type: 'string',
                    max: 2,
                    min: 1,
                    oneOf: [''] //An array of values that are allowed to be used
                }
            ],
            argsPromptLimit: 2,  //Maximum number of times to prompt a user for a single argument. 
                                //Only applicable if args is specified.
            throttling: {
                usages: 'INT',//Maximum number of usages of the command allowed in the time frame.
                duration: 'INT'//Amount of time to count the usages of the command within (in seconds).
            },
            defaultHandling: true,   //Whether or not the default command handling should be used. If false, 
                                    //then only patterns will trigger the command.
            guarded: false, // Whether the command is protected from being disabled.
            guildOnly: false, // Whether the command can only be run in a guild channel.
            ownerOnly: false // Whether the command can only be used by an owner.
        })
    }

    //to check if correct permission level. check hasPermission() in bot.js to see levels
    /*
    hasPermission(message) 
        let PermissionLevel = 0;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }
    */

    async run (message, args) {
        // Code goes here etc.
    }
};