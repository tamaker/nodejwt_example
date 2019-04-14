var jwt = require('jsonwebtoken');
var moment = require('moment');

// KEY THAT
var key = '12345ASDFas@%@$@#$adsfa9w9f9f9e9wetwt24234';

var iat = moment(new Date()).unix();
var exp = moment(new Date()).add(1, 'hours').unix();

var userName = 'mickey mouse';

var tokenPayload = {
    "iss": "HEPbuilder",    // ISSUER
    "aud": 'test users 1',  // AUDIENCE
    "iat": iat,             // ISSUED AT
    "exp": exp,             // EXPIRES AT
    "userName": userName,    // OUR USERS NAME
    "userOtherValue": 'test information for user',
    "userStatus": "xyz123"
};


var iat = new Date(); // ISSUED AT DATE
var exp = new Date(); // EXPIRES AT DATE

var token = jwt.sign(tokenPayload, key);  // CREATE THE TOKEN

console.log('JWT Generated: ' + token); // ECHO OUT THE TOKEN 


console.log('-----------------')


// ATTEMPT TO DECODE THE JSON WEB TOKEN, REQUIRES WE HAVE THE TOKEN AND KEY
try {
    var decoded = jwt.verify(token, key);
    //var decoded = jwt.verify(token, '23456');   // THROWS AND ERROR BACK BECAUSE WRONG KEY
    console.log('Successfully validated token!');
    console.log(decoded);
} catch(err) {
    console.log('ERROR validating token! ' + err.name + ': ' + err.message);
} 