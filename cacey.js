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

contentHash = {'sha1:content' : 'your mom'}

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

app.get('/:hashing/:contentKey', function(req, res) {
  var content = contentHash[createHashKey(req.params['hashing'], req.params['contentKey'])];
  if(content == null) { send404(res); } else { res.send(content, 200); }
  res.send(content);
});

app.post('/:hashing/:contentKey', function(req, res) {
  var hashing = req.params['hashing'];
  var contentKey = req.params['contentKey'];

  var content = req.body['content'];

  var key = createHashKey(hashing, contentKey);

  contentHash[key] = content;
  res.redirect('/' + hashing + '/' + contentKey, 200);
});

app.get(/.*/, function(req, res) {
  send404(res);
});

function createHashKey(hashingScheme, hash) {
  return hashingScheme + ':' + hash;
}

function send404(res) { res.send('WTF?', 404); }

app.listen(3000);