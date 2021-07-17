const token = require("../config.json").token;
module.exports = async (client, message) => {

    if (message.author.bot) {
        return;
    }
    if (message.content.includes("https://twitter.com")) {
        const fetch = require("node-fetch");
        const tweetLinkRegex = new RegExp(/https:\/\/twitter.com\/\w*\/status\/\d*/);
        const tweetLink = message.content.match(tweetLinkRegex)[0];
        tweetId = tweetLink.split('/').reverse()[0]

        const tweetUrl = `https://api.twitter.com/2/tweets/${tweetId}?expansions=attachments.media_keys&media.fields=type`

        const obj = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAABCIRgEAAAAAt8VpNcbLbZgPyhkL3Tvlo%2FOsrCg%3DrR4bOGRHuu2ymmAnYQK0XLSlvN0ShzYPySZla8FbliMg3qW7M5',
                'Content-Type': 'application/json',
            },
        };

        const obj2 = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bot ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'flags': 4
            }),
        };

        // Gets Tweet Info, Checks if it is a Video/GIF
        fetch(tweetUrl, obj)
            .then((resp) => resp.json())
            .then(function (data) {
                // console.log(data.includes.media[0].type);
                const mediaType = data.includes.media[0].type; ``
                if (mediaType == 'video' || mediaType == 'animated_gif') {

                    var messageContent = message.content;
                    var fxTweetLink = tweetLink.slice(0, 8) + 'fx' + tweetLink.slice(8);
                    const guild = message.guild
                    const channelId = message.channel.id;
                    const member = message.member;
                    const avatar = member.user.displayAvatarURL({ format: 'jpg', dynamic: true })
                    const name = member.displayName;
                    // console.log('stuff',name,avatar)
                    // message.suppressEmbeds()
                    //     .catch(err => console.log(err))
                    // console.log(`https://discord.com/api/v8/channels/${message.channel.id}/messages/${message.id}`)
                    
                    
                    fetch(`https://discord.com/api/channels/${message.channel.id}/messages/${message.id}`, obj2)
                        .catch(err => console.log(err));
                    guild.fetchWebhooks()
                        .then(function (webhooks) {
                            var fxTwitter = webhooks.find(webhook => webhook.name == 'fxtwitter');
                            return fxTwitter;
                        })
                        .then(fxTwitter => fxTwitter.edit({ channel: channelId }))
                        .then(fxTwitter => fxTwitter.send(messageContent.replace(tweetLink, fxTweetLink), { username: name, avatarURL: avatar }))
                        // .then(message.delete())
                        // .then(message.edit({flags: ['SUPPRESS_EMBEDS']}))
                        // .then(resp => console.log(resp))
                        .catch((error) => console.log(error));

                    console.log("TwitterFix applied to " + name)
                };
            })
            .catch(error => console.log(error));
        return;
    }
    if (!message.content.startsWith(client.commandPrefix)) {
        return;
    }
};