var resolver = require('./resolver').resolver

	/**
	 * This function is what zest uses to route every request to wherever it is
	 * that it needs to go.
	 */
function router(request, response)
{
	// TODO: Hierarchal URLs.
	try
	{
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

		resolved_url.method.apply(this, [
			request,
			response
		].concat(resolved_url.arguments))

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
		}
		else
		{
			throw e
		}
	}

	finally
	{
		response.end()
	}
}

this.router = router

