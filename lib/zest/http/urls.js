var method_separator = ':'

	/**
	 * Object used to represent a specific URL.
	 */
var URL = function(request_uri, method, view_args)
{
	this.request_uri = request_uri
	this.method = method
	this.view_args = view_args || []
}

URL.prototype = new Object()

	// Helper function for generating URLs
this.url = function(request_uri, method)
{
	if (typeof method == 'string')
	{
		var contained_module,
		    method_name,
		    method_index = method.lastIndexOf(method_separator)

		if (method_index == -1)
			throw new Error('The following invalid URL models/method was given: ' + method)

			// Get the name of our method, as well as attempt to require our module
		method_name = method.slice(method_index+1)
		contained_module = require(method.slice(0, method_index))

			// Now, set method to the variable in contained_module called method_name
		method = contained_module[method_name]
	}

	return new URL(request_uri, method)
}

