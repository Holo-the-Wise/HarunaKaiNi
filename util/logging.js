var moment = require('moment'); 

module.exports = (message, string ) => {

    message.client.owners.forEach(owner => {
        owner.send(`========== ${moment().format('hh:mm a - ddd, Do MMM YYYY')} ==========\n` +
            `${string}`); 
    });

    console.log(`========== ${moment().format('hh:mm a - ddd, Do MMM YYYY')} ==========\n` +
        `${string}`);
    
        return;
};
