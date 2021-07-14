module.exports = async (client, message) => {

    if (message.author.bot) {
        return;
    }
    if (message.content.includes("https://twitter.com")) {
        const fetch = require("node-fetch");

        var tweetLinkRegex = new RegExp(/https:\/\/twitter.com\/\w*\/status\/\d*/);
        var tweetLink = message.content.match(tweetLinkRegex)[0];
        console.log(tweetLink)
        tweetId = tweetLink.split('/').reverse()[0]
        console.log(tweetId);

        const tweetUrl = `https://api.twitter.com/2/tweets/${tweetId}?expansions=attachments.media_keys&media.fields=type`

        var obj = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAABCIRgEAAAAAt8VpNcbLbZgPyhkL3Tvlo%2FOsrCg%3DrR4bOGRHuu2ymmAnYQK0XLSlvN0ShzYPySZla8FbliMg3qW7M5',
                'Content-Type': 'application/json',
            },
        };

        // Gets Tweet Info, Checks if it is a Video/GIF
        fetch(tweetUrl, obj)
            .then((resp) => resp.json())
            .then(function (data) {
                console.log(data.includes.media[0].type);
                var mediaType = data.includes.media[0].type;
                if (mediaType == 'video' || mediaType == 'animated_gif') {

                    var messageContent = message.content;
                    var fxTweetLink = tweetLink.slice(0, 8) + 'fx' + tweetLink.slice(8);
                    const guild = message.guild
                    const channelId = message.channel.id;
                    const member = message.member;
                    const avatar = member.user.displayAvatarURL({ format: 'jpg', dynamic: true })
                    const name = member.displayName;
                    console.log('stuff',name,avatar)

                    guild.fetchWebhooks()
                        .then(function(webhooks) {
                            var fxTwitter = webhooks.find(webhook => webhook.name == 'fxtwitter');
                            return fxTwitter;
                        })
                        .then(fxTwitter => fxTwitter.edit({channel:channelId}))
                        .then(fxTwitter => fxTwitter.send(messageContent.replace(tweetLink,fxTweetLink),{username:name,avatarURL:avatar}))
                        .catch((error) => console.log(error));
                        
                    


                    // message.say(messageContent.replace(tweetLink,fxTweetLink)) // delete after
                    message.delete()
                        .then(() => console.log('Deleted'))
                        .catch((error) => console.log(error));
                };
            })
            .catch(function (error) {
                console.log(error)
            });


        // Gets message information in prep for webhook

        // Creats a new webhook and posts message with fixed url then deletes original msg


    }
    if (!message.content.startsWith(client.commandPrefix)) {
        return;
    }
};