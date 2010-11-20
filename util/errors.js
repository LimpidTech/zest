	/**
	 * Creates and returns an error object that can be used to easily define new
	 * errors.
	 */
function create_error()
{
	var final_error = function(message, fileName, lineNumber)
	{
		this.name = 'Resolution Error'

		this.message = message
		this.fileName = fileName
		this.lineNumber = lineNumber
	}

	final_error.prototype = new Error()

	return final_error
}

this.create_error = create_error

