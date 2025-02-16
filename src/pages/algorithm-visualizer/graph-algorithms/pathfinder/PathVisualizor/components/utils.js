const randomNumber = (min,max)=>{
    return Math.round(Math.random()*(max-min)+min);
}

module.exports = randomNumber;