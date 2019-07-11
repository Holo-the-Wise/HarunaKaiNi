const config = require('../config.json');
const parseEmojis = require('./parseEmojis');
// const { formatEmojis, } = require('./formatData');
// const { writeData, } = require('./writeData');

module.exports = async (message) => {
  // parse user message for emojis
  const parsedServerEmojis = parseEmojis(message);
  console.log("parsed");
  message.channel.send(`parsedServeremojies: ${parsedServerEmojis.array()}`);
  if (parsedServerEmojis.length == 0) {
    return;
  }

  // // format emoji to appropriate form for database
  // const emojis = parsedServerEmojis.map(i => formatEmojis(message, i, message.author.id, false, false));

  // writeData(message, emojis, 'Message');
};