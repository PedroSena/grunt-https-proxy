/*
 * grunt-https-proxy
 * 
 *
 * Copyright (c) 2013 Amit Segal, Dan Griffis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	var httpProxy = require('http-proxy');
  var fs = require('fs');

	grunt.registerMultiTask('proxy', 'Start proxy server', function() {
		var options = this.options(); // TODO: defaults?

    if (options.https) {
      if (options.https.cert) {
        options.https.cert = fs.readFileSync(options.https.cert, 'utf8');
      }
      if (options.https.ca) {
        options.https.ca = fs.readFileSync(options.https.ca, 'utf8');
      }
      if (options.https.key) {
        options.https.key = fs.readFileSync(options.https.key, 'utf8');
      }
    }

		if ( options.target ) {
      httpProxy.createServer( options.target.port, options.target.host, options ).listen( options.port );
    }
		else if (options.router) {
      httpProxy.createServer( options ).listen( options.port );
    }

	});
	
};
