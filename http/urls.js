var module_method_separator = ':'

	/**
	 * Object used to represent a specific URL.
	 */
var URL = function(request_url, module, method)
{
	module = require(module)

	this.request_url = request_url
	this.method = module[method]
}

URL.prototype = new Object()

	// Helper function for generating URLs
this.url = function(request_url, module)
{
	var method,
	    method_index = module.indexOf(module_method_separator)

	if (method_index == -1)
		throw new Error('The following invalid URL models/method was given: ' + module)

	method = module.slice(method_index+1)
	module = module.slice(0, method_index)

	return new URL(request_url, module, method)
}

