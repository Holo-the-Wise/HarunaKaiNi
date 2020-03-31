 const {Command} = require('discord.js-commando')

module.exports = class CoughCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vaccine',
            memberName: 'vaccine',
            group: 'admin',
            description: 'vaccine',
            guildOnly: false,
            ownerOnly: true
        })
    }

    hasPermission(message) {
        let PermissionLevel = 4;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run(message, args) {

        let officer = message.guild.roles.find(u => u.name == "Line Officers");
        let purples = message.guild.roles.find(u => u.name == "Friends of the Sea");
    

        
        let membersArray = officer.members.array();
        for(var i = 0; i < membersArray.length; i++){
            let currentMember = membersArray[i];
            let oldnick = currentMember.displayName;
            currentMember.setNickname(oldnick.slice(6)).catch(error => {
                console.log(error);
              });
        }

        let membersArray2 = purples.members.array();
        for(var i = 0; i < membersArray2.length; i++){
            let currentMember = membersArray2[i];
            let oldnick = currentMember.displayName;
            currentMember.setNickname(oldnick.slice(8)).catch(error => {
                console.log(error);
              });
        }
        // message.channel.send(`Rollcall cleared`);
        //owner.send(`Rollcall clear used by ${message.author}`);
        
    }
};