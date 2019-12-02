const Discord = require("discord.js");
const Canvas = require('canvas');
const DisplayBingo = require('./DisplayBingo.js');

module.exports = async (message, client) => {

    if (client.contestData.has(message.author.id)) {
        return message.channel.send("Error: you are already in the contest");
    } else {
        if (!(message.member.roles.find(u => u.name == 'FISH') || message.member.roles.find(u => u.name == 'CHIPS'))) {
            return message.channel.send("You must be a clan member to take part");
        } else {
            let points = [];
            for (i = 0; i < 38; i++) { //0 == missions done, 37 == lines
                points[i] = 0;
            }
            client.contestData.set(message.author.id, points);
            message.channel.send(`${message.author}, you've been added to the contest. Your Bingo Card is below: `);
            DisplayBingo(points, message.member, message);

            let Xmasrole = message.guild.roles.find(u => u.name == 'Xmas');
            message.member.addRole(Xmasrole);     
        }
    }
};