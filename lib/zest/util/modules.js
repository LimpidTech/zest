var attribute_separator = ':'

exports.get = function get(identifier)
{
	var contained_module,
		attribute_name,
		module_name = identifier,
		attribute_index = identifier.lastIndexOf(attribute_separator)

	if (attribute_index != -1)
	{
		attribute_name = identifier.slice(attribute_index+1)
		module_name = identifier.slice(0, attribute_index)
	}

	contained_module = require(module_name)

	if (typeof attribute_name != 'undefined')
		return contained_module[attribute_name]

	else
		return contained_module
}
