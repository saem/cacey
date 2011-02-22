# Cacey

Means watchful or alert.

## The Premise

The idea is that this is a content addressable cache. So we can have a hashing scheme, and a hash, and then use that to locate a piece of content.

So clients could simply call the server server.com/<hashing scheme>/<base64 encoded hash>, and then get the content at that address, or a 404 if we do not have it.

Additionally, we can put new content in by way of a POST -- this still needs to be secured.

----

## TODO

* Secure posting
* Add validation based on hashing of the content to ensure that it infact syncs up.
* Use an awesome data structure