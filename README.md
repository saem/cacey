# Cacey

Means watchful or alert.

## The Premise

The idea is that this is a content addressable cache. So we can have a hashing scheme, and a hash, and then use that to locate a piece of content.

So clients could simply call the server server.com/\<hashing scheme\>/\<base64 encoded hash\>, and then get the content at that address, or a 404 if we do not have it.

Additionally, we can put new content in by way of a POST -- this still needs to be secured.

## Install

* Node version 0.4.1
* NPM verison 0.3.3

* Install node (https://github.com/ry/node/wiki/Installation)
* Install npm (https://github.com/isaacs/npm)
* NODE_ENV=(development|production) node cacey.js

*Note* I use supervisor (https://github.com/fgnass/node-dev) during development, so the last step is:

* NODE_ENV=development node-dev index.js

## API

    /content -> this is where you POST new content
    /hashing -> get a list of supported hashing schemes
    /hashing/<scheme> -> return whether this scheme is supported or not
    /hashing/<scheme>/content -> list of BASE64 encoded keys for the particular scheme
    /hashing/<scheme>/content/<key> -> content item

## TODO

* Finish implementing the basic API
* Add validation based on hashing of the content to ensure that it infact syncs up.
* Use an awesome data structure (going to use the file system)

## License

Cacey is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
  
Cacey is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
  
You should have received a copy of the GNU General Public License along with Cacey. If not, see http://www.gnu.org/licenses/.