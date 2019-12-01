const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const Cjoin = require('../../util/Cjoin.js');
const Cdone = require('../../util/Cdone.js');
const Ccard = require('../../util/Ccard.js');
const Cundo = require('../../util/Cundo.js');


module.exports = class ContestCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'contest',
			group: 'contest',
			memberName: 'contest',
			description: 'Commands for contest',
			clientPermissions: [],
			args: [
				{
					key: 'option',
					prompt: 'Please enter a valid option',
					type: 'string'
				},
				{
                    key: 'member',
                    prompt: 'Which user?',
                    type: 'member',
                    default: '???'
				},
				{
                    key: 'mission',
                    prompt: 'Mission number?',
                    type: 'string',
                    default: ''
                }
			]
		});
	}

	async run(message, {option, member, mission}, client) {
        
		switch (option){
            case 'join':
                return Cjoin(message, message.client);
            case 'done':
                return Cdone(message, member, mission, message.client);
            case 'undo':
                return Cundo(message, member, mission, message.client);
            case 'card':
                return Ccard(message, member, message.client);
        }
	}
};
