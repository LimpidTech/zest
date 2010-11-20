var zest = require('zest')

	// Create a new error type
var ResolutionError = zest.util.errors.create_error('ResolutionError')
this.ResolutionError = ResolutionError

	/**
	 * Decides whether or not a specific given URL matches the request URL
	 */
function resolve_url(url)
{
	if (typeof url.request_uri == 'string'  && url.request_uri == this.url)
		return true

	else if (typeof url.request_uri == 'function')
	{
		if (url.request_uri instanceof RegExp)
		{
			var matches = url.request_uri.exec(this.url)

			if (matches != null)
			{
				// Append any extra arguments received from the expression
				url.arguments = matches.splice(1)
				return true
			}
		}
	}

	return false
}

	/**
	 * Loops through the given request and URL patterns to pass to resolve_url
	 * and finally decide whether or not it successfully resolved the required URL.
	 */
function resolver(url_patterns)
{
	var matches = url_patterns.filter(resolve_url, this)

	if (matches.length != 1)
	{
		if (matches.length > 1)
			throw new ResolutionError('You can only have one URL matching this request.' +
			                'There were ' + matches.length)
		else
			throw new ResolutionError('No URLs matched the given request URI.')
	}

	return matches[0]
}

this.resolver = resolver

