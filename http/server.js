var http = require('http'),
    router = require('zest').router

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
	this.router = router

		// An array of URLs which this server is currently responding to
	this.url_patterns = undefined

		// Start listening with this server.
	this.listen = function(url_patterns, request_callback)
	{
		this.url_patterns = url_patterns

		if (typeof url_patterns == 'undefined')
			throw new Error('You must provide a list of URLs for the server to respond to.')

		var application = http.createServer(request_callback || this.router)
		application.url_patterns = this.url_patterns

		application.listen(this.port, this.address)
	}
}

this.Server.prototype = new Object()

