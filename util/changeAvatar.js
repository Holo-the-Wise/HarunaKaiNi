const fs = require('fs');

module.exports = (client) => {

    let dirs = fs.readdirSync('./assets/avatars');
    let randIndex = Math.floor( Math.random() * dirs.length );
    
    client.user.setAvatar(`./assets/avatars/${dirs[randIndex]}`);
    console.log(`Changed avatar to: ${dirs[randIndex]}`);
    return;
};
