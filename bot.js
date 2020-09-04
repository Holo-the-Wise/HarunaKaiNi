const Commando = require('discord.js-commando');
const path = require('path');
const discord = require('discord.js');
const client = new Commando.Client({
    commandPrefix: '-',
    owner: '118348886262677506',
    unknownCommandResponse: false,
    disableEveryone: true
});

const fs = require('fs');






client.login(process.env.TOKEN);