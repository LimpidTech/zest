	/**
	 * This function is what zest uses to route every request to wherever it is
	 * that it needs to go.
	 */
this.router = function(request, response)
{
	var url;

	response.writeHead(200, {
		'Content-Type': 'text/plain',
	})

	for (url in this.url_patterns)
		console.log(url)

	response.end()
}

	/**
	 * A set of tools useful for using zest with HTTP.
	 */
this.http = require('./http')

