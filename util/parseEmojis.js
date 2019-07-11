module.exports = async (message) => {
  const string = message.content;
  message.channel.send(`content: ${string}`);
  // match all server emojis, strip non-id characters, and validate
  const serverEmojiRegExp = /:\d+>/gi;
  const serverEmojis = (string.match(serverEmojiRegExp) || [])
    .map(i => i.substring(1, i.length - 1))
    .filter(i => message.guild.emojis.has(i));
  return serverEmojis;
  // return "found emoji";
};