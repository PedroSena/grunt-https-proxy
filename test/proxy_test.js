'use strict';

var	should	= require('should'),
	http	= require('http'),
  https = require('https');

describe('grunt-proxy', function() {
	
	it('should forward requests to the target server', function(done) {
		get('http://localhost:8050/index.html', function (response, body) {
			response.statusCode.should.equal(200);
			body.should.equal('HOST:1');
			done();
		});	
	});
	
	it('should forward requests using the proxy table', function(done) {
		get('http://localhost:8051/host1/index.html', function (response, body) {
			response.statusCode.should.equal(200);
			body.should.equal('HOST:1');
			get('http://localhost:8051/host2/index.html', function (response, body) {
				response.statusCode.should.equal(200);
				body.should.equal('HOST:2');
				done();
			});
		});
	});

  it('should forward https requests using the proxy table', function(done) {
    get_secure('https://localhost:8443/host1/index.html', function (response, body) {
      response.statusCode.should.equal(200);
      body.should.equal('HOST:1');
      get_secure('https://localhost:8443/host2/index.html', function (response, body) {
        response.statusCode.should.equal(200);
        body.should.equal('HOST:2');
        done();
      });
    });
  });

});

function get(url, done) {
	http.get(url, function(res) {
		var body = '';
		res.on('data', function(chunk) {
			body += chunk;
		}).on('end', function() {
			done(res, body);
		});
	});
}

function get_secure(url, done) {
  https.get(url, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    }).on('end', function() {
          done(res, body);
        });
  });
}