module.exports = {
generateRandomNumber: async function(max){
    return Math.floor(Math.random() * Math.floor(max))
},
generateRandomText: async function(){
    var random = require('crypto')
    return random.randomBytes(5).toString()
    }
}