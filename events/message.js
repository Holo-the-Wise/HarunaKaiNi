module.exports = async (client, message) => {

    if (message.author.bot) {
        return;
    }
    if (message.content.includes("https://twitter.com")) {
        message.delete()
            .then(() => console.log('suppressed'))
            .catch(console.error);
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


        fetch(tweetUrl, obj)
            .then((resp) => resp.json())
            .then(function (data) {
                console.log(data.includes.media[0].type);
                var mediaType = data.includes.media[0].type;
                if (mediaType == 'video' || mediaType == 'animated_gif') {
                    message.say(tweetLink.slice(0, 8) + 'fx' + tweetLink.slice(8));
                    message.suppressEmbeds(true);
                };
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    if (!message.content.startsWith(client.commandPrefix)) {
        return;
    }
};