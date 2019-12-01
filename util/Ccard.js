const Discord = require("discord.js");
const Canvas = require('canvas');
const DisplayBingo = require('./DisplayBingo.js');

module.exports = async (message, member, client) => {

    if (member == '???'){
        user = message.member;
    } else {
        user = member;
    }

    if (!client.contestData.has(user.id)) {
        return message.channel.send("Error: User isn't in the contest");
    } else {
        let points = client.contestData.get(user.id)
        return DisplayBingo(points, user, message);
    }
};