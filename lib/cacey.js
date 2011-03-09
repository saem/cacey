/**
 * Library version.
 */

exports.version = '0.0.1';

/**
 * Copyright 2011 Saem Ghani
 * 
 * This file is part of Cacey.
 * 
 * Cacey is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * 
 * Cacey is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with Cacey. If not, see 
 * http://www.gnu.org/licenses/.
 */

var express = require('express')
var app = express.createServer();

contentHash = {'sha-1:hashkey' : 'some awesome content =D'}

app.configure(function() {
  app.use(express.methodOverride())
  app.use(express.bodyDecoder())
  app.use(app.router)
});

//set NODE_ENV development|production to choose between the two

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//Setup the routes

app.get('/hashing', function(req, res) {
  res.send(supportedHashingSchemes().toString(), 200);
});

app.get('/hashing/:hashing', function(req, res) {
  var requestedScheme = req.params['hashing'];
  if(!requestedScheme) { send404(res); }
  var schemes = supportedHashingSchemes();
  var i = schemes.length;
  while(i--) {
    if(schemes[i] == requestedScheme.toLowerCase()) {
      res.send('Supported Scheme', 200);
      return;
    }
  }
  send404(res);
});

app.get('/hashing/:hashingScheme/content', function(req, res) {
  res.send('TODO: Fire off a list of keys for the requested hashing scheme', 200);
});

app.get('/hashing/:hashing/content/:contentKey', function(req, res) {
  var content = contentHash[createHashKey(req.params['hashing'], req.params['contentKey'])];
  if(content == null) { send404(res); } else { res.send(content, 200); }
});

app.post('/content', function(req, res) {
  var hashing = 'sha-1';
  var contentKey = Object.keys(contentHash).length + 1; //lame hashing until I wire in the crypto stuffs

  var content = req.body['content'];

  var key = createHashKey(hashing, contentKey);

  if(!contentHash.hasOwnProperty(key)) {
    contentHash[key] = content;
    res.redirect('/' + hashing + '/' + contentKey, 200);
  } else {
    res.send('Cannot overwrite existing content, or key collision', 409);
    //Security issue, you could flood a server with the same content, will need the logging system to be smart, otherwise DoS, possibly
    console.log('Possible key collision content. key: ' + key + 'content: ' + req.body['content']);
  }
});

app.get(/.*/, function(req, res) {
  send404(res);
});

function createHashKey(hashingScheme, hash) {
  return hashingScheme + ':' + hash;
}

function supportedHashingSchemes() {
  return Array('sha-1');
}

function send404(res) { res.send('WTF?', 404); }

console.log("[cacey] Listening on port 3000");
app.listen(3000);