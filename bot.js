const Commando = require('discord.js-commando');
const path = require('path');
const discord = require('discord.js');
const client = new Commando.Client({commandPrefix: '-', owner: '118348886262677506', unknownCommandResponse: false, disableEveryone: true});
const token = require("./config.json").token;
// const token  = 'NTMzOTA4ODE2MzkyMjI0NzY5.DyDBMw.sYVkMluq5TJaYnLm9x_pELWpgFg';

client.muted = [];//muted users are here

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
    if (!message.content.startsWith(client.commandPrefix)) {
        return;
    }
})

client.on('ready', function() {
    console.log(`I am loaded and running.`)
})

client.elevation = message => {
    /* This function should resolve to an ELEVATION level which
       is then sent to the command handler for verification*/
    let permlvl = 0;
    let member_role = message.guild.roles.find(x => x.name === "Line Officers");
    if (member_role && message.member.roles.has(member_role.id)) permlvl = 1;
    let captain_role = message.guild.roles.find(x => x.name === "Captains");
    if (captain_role && message.member.roles.has(captain_role.id)) permlvl = 2;
    let admin_role = message.guild.roles.find(x => x.name === "Admirals");
    if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
    let admin2_role = message.guild.roles.find(x => x.name === "Admirals of the Fleet");
    if (admin2_role && message.member.roles.has(admin2_role.id)) permlvl = 3;
    if (message.author.id == client.owner) permlvl = 4;
    return permlvl;
};

client.login(token);