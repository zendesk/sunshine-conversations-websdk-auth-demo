'use strict';

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const Smooch = require('smooch-core');
const JWT = require('jsonwebtoken');

var smooch ;
var url;
var key;
var secret;

express()
    .use(express.static('public'))
    .use(bodyParser.json())
    .get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    })
    //Init appMaker
    .post('/init-appmaker', initAppmaker)
    //User login
    .post('/user-login', userLogin)
    //Sending a webview to the current user
    .post('/send-auth-webview', sendAuthWebview)
    .listen(process.env.PORT || 8000);


// Initialise the appMaker
function initAppmaker(req, res) {
    let payload = JSON.stringify(req.body, null, 4);
    console.log('init appmaker:\n', payload);

    url = req.body.url;
    key = req.body.key;
    secret = req.body.secret;

    console.log("init with : KEY="+key+" and secret="+secret);
    smooch = new Smooch({
        keyId: key,
        secret: secret,
        scope: 'app'
    });
    return res.status(200).end();
}


// User login from the webpage
async function userLogin(req, res) {
    console.log('User login:\n', JSON.stringify(req.body, null, 4));

    var userId = req.body.userId;
    var pwd = req.body.pwd;

    console.log('User identified: ' + userId + "/" + pwd);

    //sign JWT
    var jwt = signJwt(userId);
    let reply = {token : jwt};
    console.log('Reply:\n', JSON.stringify(reply, null, 4));
    res.send(reply);
    return res.status(200).end();
}

// Signing a JWT using user ID, key and secret
function signJwt(userId) {
    return JWT.sign(
        {
            scope: 'appUser',
            userId: userId
        },
        secret,
        {
            header: {
                alg: 'HS256',
                typ: 'JWT',
                kid: key
            }
        }
    );
}

// Sendinga webview to the user for authentication
async function sendAuthWebview(req, res) {
    console.log('Sending webview:\n', JSON.stringify(req.body, null, 4));

    var appUserId = req.body.appUserId;
    console.log('Recipient:\n', appUserId);
    console.log('URL:\n', url+'/webview_auth');

    if (smooch && appUserId) {
        smooch.appUsers.sendMessage(appUserId,{
            role: 'appMaker',
            type: 'text',
            text: 'Please login',
            actions: [
                {
                    type: 'webview',
                    text: 'Login',
                    size: 'tall',
                    uri: url+'webview_auth.html',
                    fallback: 'https://no-thanks.html'
                }
            ]
        })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log('API ERROR:\n', err);
        });
    }
    return res.status(200).end();
}