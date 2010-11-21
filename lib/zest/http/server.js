var http = require('http'),
    zest = require('zest')

	/**
	 * An HTTP server.
	 */
this.Server = function()
{
		// The default address and port for this server to listen on
	this._address = '0.0.0.0'
	this._port = 80

		// A reference to our actual server application
	this.application = undefined

		// The router is our function that every request begins within
	this.router = zest.http.router

		// An array of URLs which this server is currently responding to
	this.url_patterns = undefined

		// Start listening with this server.
	this.listen = function(url_patterns, middleware, request_callback)
	{
		var middleware = middleware || []

		if (typeof url_patterns == 'undefined')
			throw new Error('You must provide a list of URLs for the server to respond to.')

		// Create our actual application server
		var application = http.createServer(request_callback || this.router)

		if (typeof url_patterns == 'string')
		{
			var url_module = require(url_patterns)
			url_patterns = url_module['url_patterns']
		}

		// Update this object's URL pattern list, and give access to the list and middleware to our router
		this.url_patterns = url_patterns
		this.middleware = middleware

		application.url_patterns = this.url_patterns
		application.middleware = this.middleware

		application.listen(this.port, this.address)
	}
}

this.Server.prototype = new Object()

