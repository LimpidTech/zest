function resolve_url(url)
{
	if (typeof url.request_uri == 'string'  && url.request_uri == this.url)
		return true

	else if (typeof url.request_uri == 'function')
	{
		if (url.request_uri instanceof RegExp && url.request_uri.test(this.url))
			return true
	}

	return false
}

	/**
	 * This function is what zest uses to route every request to wherever it is
	 * that it needs to go.
	 */
this.router = function(request, response)
{
	// TODO: Hierarchal URLs.
	var resolved_url,
	    resolved_urls = this.url_patterns.filter(resolve_url, request)

	// A very basic middleware implementation
	this.middleware.forEach(function(middleware){
		var middleware_response = middleware(request, response)

		if (typeof middleware_response != 'undefined')
		{
			request = middleware_response[0]
			response = middleware_response[1]
		}
	})

	if (resolved_urls.length > 1)
		throw new Error('You can only have one URL matching this request.' +
		                'There were ' + resolved_urls.length)

	if (resolved_urls.length == 1)
		resolved_url = resolved_urls[0]

	if (typeof resolved_url != 'undefined' && typeof resolved_url.method == 'function')
		resolved_url.method.apply(this, [request, response])

	// If we didn't resolve a URL, we have a 404.
	response.writeHead(404, {})
	response.end()
}

	/**
	 * A set of tools useful for using zest with HTTP.
	 */
this.http = require('./http')

