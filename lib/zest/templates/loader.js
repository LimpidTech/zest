var zest = require('zest'),
    fs = require('fs'),
    path = require('path')

var LoaderError = zest.util.errors.create_error()
this.LoaderError = LoaderError

function Loader()
{
}

	/**
	 * TODO: Figure out how to provide an error response.
	 */
Loader.prototype = {
	find: function(template_name, template_dirs, callback)
	{
		var directory, file_found = false

		template_dirs.forEach(function(directory)
		{
			if (file_found == true)
				return

			fs.exists(directory, function(success)
			{
//				var directory = fs.realpath(directory)

				if (file_found == true)
					return

				if (success)
				{
					fs.readdir(directory, function(err, files)
					{
						var filename

						if (file_found == true)
							return

						files.forEach(function(filename)
						{
							if (file_found == true)
								return

							if (filename == template_name)
							{
								file_found = true

								callback(directory + '/' + filename)
							}
						})
					})
				}
			})
		})
	},

	get: function(template_name, template_dirs, callback)
	{
		template_dirs = template_dirs.map(function(path_name) {
			return path.normalize(path_name)
		})

		this.find(template_name, template_dirs,	function(template_filename)
		{
			// TODO: Fixed hard-coded encoding value
			fs.readFile(template_filename, 'utf-8', function(err, template_contents){
					callback(template_contents)
			})
		})
	}
}

this.Loader = Loader

