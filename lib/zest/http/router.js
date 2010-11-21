var resolver = require('./resolver').resolver,
    zest = require('zest')

	/**
	 * This function is what zest uses to route every request to wherever it is
	 * that it needs to go.
	 */
function router(request, response)
{
	// TODO: Hierarchal URLs.
	try
	{
		response.render = zest.templates.renderer

		this.middleware.forEach(function(middleware){
			var middleware_response

			if (typeof middleware.process_request != 'undefined')
				middleware_response = middleware.process_request(request, response)

			if (typeof middleware_response != 'undefined')
				request = middleware_response
		})

		var resolved_url = resolver.apply(request, [this.url_patterns])

		resolved_url.method.apply(this, [
			request,
			response
		].concat(resolved_url.method_args))
	}

	catch (e)
	{
		// If we didn't resolve a URL, we have a 404.
		if (e.name == 'ResolutionError')
		{
			response.writeHead(404, {
				'Content-Type': 'text/plain',
			})

			response.write('A 404 error has occured. The requested page was not found.')
			response.end()
		}
		// If another error occured, we've had a 503.
		else
		{
//			throw e

			response.writeHead(503, {
				'Content-Type': 'text/plain',
			})

			response.write('An internal server error has occured: ' + e.message)
			response.end()
		}
	}
}

this.router = router

