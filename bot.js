const Commando = require('discord.js-commando');
const path = require('path');
const discord = require('discord.js');
const client = new Commando.Client({
    commandPrefix: '-',
    owner: ['274773384657633281'],
    unknownCommandResponse: false,
    disableEveryone: true
});
const token = require("./config.json").token;
const fs = require('fs');
const ownerId = require("./config.json").OwnerId;


/* Trackers - used to track various bot states etc */
client.emojinotifs = true;

client.rollcallActive = false;
client.rollcallMsgId = 0;
// client.owneruser = client.owner;



client.muted = []; //muted users are here
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

    let admin2role = message.guild.roles.find(x => x.name === "Admirals of The Fleet");
    if (admin2role && message.member.roles.has(admin2role.id)) permlvl = 3;
    
    if (message.author.id == ownerId) permlvl = 4;
    console.log(`permlvl: ${permlvl}`);
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