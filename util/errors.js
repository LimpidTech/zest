	/**
	 * Creates and returns an error object that can be used to easily define new
	 * errors.
	 */
function create_error(error_name)
{
	var final_error = function(message, fileName, lineNumber)
	{
		this.name = error_name

		this.message = message
		this.fileName = fileName
		this.lineNumber = lineNumber
	}

	final_error.prototype = new Error()

	return final_error
}

this.create_error = create_error

