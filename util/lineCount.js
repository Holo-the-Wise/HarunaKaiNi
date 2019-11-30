const Discord = require("discord.js");

module.exports = async (points) => {

    let lineCount = 0;


    //horizontal
    if( points[1] && points[2] && points[3] && points[4] && points[5] && points[6]){
        lineCount++;
    }
    if( points[7] && points[8] && points[9] && points[10] && points[11] && points[12]){
        lineCount++;
    }
    if( points[13] && points[14] && points[15] && points[16] && points[17] && points[18]){
        lineCount++;
    }
    if( points[19] && points[20] && points[21] && points[22] && points[23] && points[24]){
        lineCount++;
    }
    if( points[25] && points[26] && points[27] && points[28] && points[29] && points[30]){
        lineCount++;
    }
    if( points[31] && points[32] && points[33] && points[34] && points[35] && points[36]){
        lineCount++;
    }

    //vertical
    if( points[1] && points[7] && points[13] && points[19] && points[25] && points[31]){
        lineCount++;
    }
    if( points[2] && points[8] && points[14] && points[20] && points[26] && points[32]){
        lineCount++;
    }
    if( points[3] && points[9] && points[15] && points[21] && points[27] && points[33]){
        lineCount++;
    }
    if( points[4] && points[10] && points[16] && points[22] && points[28] && points[34]){
        lineCount++;
    }
    if( points[5] && points[11] && points[17] && points[23] && points[29] && points[35]){
        lineCount++;
    }
    if( points[6] && points[12] && points[18] && points[24] && points[30] && points[36]){
        lineCount++;
    }

    //diag

    if( points[1] && points[8] && points[15] && points[22] && points[29] && points[36]){
        lineCount++;
    }
    if( points[6] && points[11] && points[16] && points[21] && points[26] && points[31]){
        lineCount++;
    }
    
    return lineCount;
};