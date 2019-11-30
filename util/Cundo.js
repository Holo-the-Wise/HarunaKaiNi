const Discord = require("discord.js");
const Canvas = require('canvas');
const DisplayBingo = require('./DisplayBingo.js');
const ownerId = require("../config.json").OwnerId;

module.exports = async (message, member, mission, client) => {

    if (message.author.id != ownerId){
        return message.channel.send("Error: You cannot use this command");
    }
    
    if(!mission || mission < 1 || mission > 36) {
        return message.channel.send("Error: Please enter a valid mission number")
    }
    let user = member;

    if (!client.contestData.has(user.id)) {
        return message.channel.send("Error: you aren't in the contest");
    } else {

        if(client.contestData.get(user.id, mission)){
            
            client.contestData.set(user.id, 0, mission);
            let curr = client.contestData.get(user.id, 0);

            client.contestData.set(user.id, curr - 1, 0);
            return message.channel.send(`${user.displayName} reset mission # ${mission}`);
        } else {
            return message.channel.send("Mission not cleared");
        }   
    }
};