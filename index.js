function resolve_url(url)
{
	if (typeof url.request_uri == 'string')// && url.request_uri == this.url)
		return true

	return false
}

	/**
	 * This function is what zest uses to route every request to wherever it is
	 * that it needs to go.
	 */
this.router = function(request, response)
{
	// TODO: Hierarchal URLs.
	var resolved_url, resolved_urls = this.url_patterns.filter(resolve_url, request)

	if (resolved_urls.length > 1)
		throw new Error('You can only have one URL matching this request.' +
		                'There were ' + resolved_urls.length)

	if (resolved_urls.length == 1)
		resolved_url = resolved_urls[0]

	if (typeof resolved_url != 'undefined' && typeof resolved_url.method == 'function')
		resolved_url.method(request, response)

	// If we didn't resolve a URL, we have a 404.
	response.writeHead(404, {})
	response.end()
}

	/**
	 * A set of tools useful for using zest with HTTP.
	 */
this.http = require('./http')

