module.exports = async (client, message) => {

    if (message.author.bot) {
        return;
    }
    if (!message.content.startsWith(client.commandPrefix)) {
            return;
    }
};