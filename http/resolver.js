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

function resolver(url_patterns)
{
	matches = url_patterns.filter(resolve_url, this)

	if (matches.length != 1)
	{
		if (matches.length > 1)
			throw new Error('You can only have one URL matching this request.' +
			                'There were ' + matches.length)
		else
			throw new Error('No URLs matched the given request URI.')
	}

	return matches[0]
}

this.resolver = resolver
