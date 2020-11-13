const Commando = require('discord.js-commando');
const path = require('path');
const discord = require('discord.js');
const ownerIds = require("./config.json").OwnerIds;
const client = new Commando.Client({
    commandPrefix: '-',
    owner: ownerIds,
    disableEveryone: true
});
const token = require("./config.json").token;
const fs = require('fs');
const changeAvatar = require("./util/changeAvatar");
const logger = require('./util/logging');




/* Trackers - used to track various bot states etc */

//emoji notifications, default is on for both channels
client.emojiNotifsGeneral = true;
client.emojiNotifsCaptains = true;

//Rollcall: rollcallActive, kinda unnecessary but w/e
client.rollcallActive = false;
client.rollcallMsgId = 0;

//timeout for CBRollcall - 1000 * secs * mins* hours
client.cbtimer = 1000 * 60 * 60 * 16;

//avatar cycling and frequency
client.avatarCycling = true;
client.avatarTimer = 1000 * 3600 * 4;

//activate avatar cycling
client.setInterval(changeAvatar, client.avatarTimer, client);


client.muted = []; //muted users are here

//DM owners at startup
client.setTimeout(logger, 1000*5, client, `Haruna is now online!`);


client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['reactions', 'ImageReactions'],
        ['moderation', 'Moderation'],
        ['admin', 'Admin'],
        ['misc', 'Misc'],
        ['clanbattle', 'ClanBattles']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({ 
        unknownCommand: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.elevation = message => {
    /* This function should resolve to an ELEVATION level which
       is then sent to the command handler for verification*/
    let permlvl = 0;
    
    let member_role = message.guild.roles.cache.find(x => x.name === "Line Officers");
    if (member_role && message.member.roles.cache.has(member_role.id)) permlvl = 1;
    
    let captain_role = message.guild.roles.cache.find(x => x.name === "Captains");
    if (captain_role && message.member.roles.cache.has(captain_role.id)) permlvl = 2;
    
    let admin_role = message.guild.roles.cache.find(x => x.name === "Admirals");
    if (admin_role && message.member.roles.cache.has(admin_role.id)) permlvl = 3;

    let admin2role = message.guild.roles.cache.find(x => x.name === "Admirals of The Fleet");
    if (admin2role && message.member.roles.cache.has(admin2role.id)) permlvl = 3;
    
    if (client.isOwner(message.author)) permlvl = 4;
    
    return permlvl;
};

function readEvents() {
    fs.readdir('./events/', (err, files) => {
        if (err) return console.error(err);
        let eventNumber = 0;
        console.log('\nEvents loading...');
        files.forEach(file => {
            try {
                const event = require(`./events/${file}`);
                let eventName = file.split(".")[0];
                ++eventNumber;
                client.on(eventName, event.bind(null, client));
                delete require.cache[require.resolve(`./events/${file}`)];
            } catch (err) {
                console.log(`Could not load event: ${file}\n   ${err}`);
            }
        });
        console.log(`${eventNumber} events loaded!`);
    });
}

readEvents();

client.login(token);