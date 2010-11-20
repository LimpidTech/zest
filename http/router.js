var resolver = require('./resolver').resolver

	/**
	 * This function is what zest uses to route every request to wherever it is
	 * that it needs to go.
	 */
function router(request, response)
{
	// TODO: Hierarchal URLs.
	var resolved_url = resolver.apply(request, [this.url_patterns])

	// A very basic middleware implementation
	this.middleware.forEach(function(middleware){
		var middleware_response = middleware(request, response)

		if (typeof middleware_response != 'undefined')
		{
			request = middleware_response[0]
			response = middleware_response[1]
		}
	})

	if (resolved_url != false)
		resolved_url.method.apply(this, [request, response])

	// If we didn't resolve a URL, we have a 404.
	response.writeHead(404, {})
	response.end()
}

this.router = router

