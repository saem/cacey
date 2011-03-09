
/**
 * Module dependencies.
 */

var cacey = require('cacey')
  , should = require('should');

module.exports = {
  'test .version': function(){
    cacey.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};