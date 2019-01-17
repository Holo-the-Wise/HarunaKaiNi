const Commando = require('discord.js-commando');
const path = require('path');
const discord = require('discord.js');
const client = new Commando.Client({commandPrefix: '-', owner: '118348886262677506', unknownCommandResponse: false, disableEveryone: true});
const token = require("./config.json").token;
// const token  = 'NTMzOTA4ODE2MzkyMjI0NzY5.DyDBMw.sYVkMluq5TJaYnLm9x_pELWpgFg';

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['reactions', 'ImageReactions'],
        ['admin', 'Admin'],
        ['misc', 'Misc']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.on('message', message => {
    if(message.content === 'Hello'){
        message.channel.send('Hello there.')
    }
})

client.on('ready', function() {
    console.log(`I am loaded and running.`)
})

client.login(token);