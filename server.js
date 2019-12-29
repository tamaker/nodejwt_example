var dotenv = require('dotenv').config() // USED TO ISOLATE / PROTECT SIGNING KEY FOR TOKEN
var jwt = require('jsonwebtoken');      // USED FOR JSON WEB TOKEN CREATE / VALIDATE
var moment = require('moment');         // USED FOR DATE/TIMES

// KEY THAT IS USED TO SIGN THE TOKEN
var key = process.env.JWT_KEY;

// ISSUED AT DATE
var iat = moment(new Date()).unix();
// EXPIRES AT DATE
var exp = moment(new Date()).add(3, 'seconds').unix();

var userName = 'mickey mouse';

var tokenPayload = {
    "iss": "SOME COMMON STRING",    // ISSUER
    "aud": 'test users 1',  // AUDIENCE
    "iat": iat,             // ISSUED AT
    "exp": exp,             // EXPIRES AT
    "userName": userName,    // OUR USERS NAME
    "userOtherValue": 'test information for user',
    "userStatus": "xyz123"
};


var token = jwt.sign(tokenPayload, key);  // CREATE THE TOKEN, AND SIGN WITH KEY

console.log('JWT Generated: ' + token); // ECHO OUT THE TOKEN 


console.log('-----------------')


// ATTEMPT TO DECODE THE JSON WEB TOKEN, REQUIRES WE HAVE THE TOKEN AND KEY
try {
    var decoded = jwt.verify(token, key);
    // var decoded = jwt.verify('token', key);
    //var decoded = jwt.verify(token, '23456');   // THROWS AND ERROR BACK BECAUSE WRONG KEY
    console.log('Successfully validated token!');
    console.log(decoded);
} catch(err) {
    console.log('ERROR validating token! ' + err.name + ': ' + err.message);
} 

// WAIT UNTIL THE TOKEN HAS EXPIRED, RETRY AUTH AND IT SHOULD FAIL
// (NOTE THE TOKEN EXP IS SET TO 3 SECS, WE WAIT 5 SECS HERE)
setTimeout(function(){
    try {
        var decoded = jwt.verify(token, key);
        //var decoded = jwt.verify(token, '23456');   // THROWS AND ERROR BACK BECAUSE WRONG KEY -- ONLY WE KNOW OUR KEY!
        console.log('Successfully validated token!');
        console.log(decoded);
    } catch(err) {
        // SHOW THE AUTH REJECTION DETAILS (MESSAGE AND NAME)
        console.log('ERROR validating token! ' + err.name + ': ' + err.message);
    } 

}, 5000)
