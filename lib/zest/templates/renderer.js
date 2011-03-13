var zest = require('zest')

this.renderer = function renderer(template_name, context, callback, extra_options)
{
	var template_loader = new zest.templates.Loader(),
	    template_engine = template_name.slice(template_name.lastIndexOf('.')+1),

	        // TODO: Make this setting much more flexibile. We need a settings library.
	    template_dirs = ['./templates']

	if (typeof extra_options != 'undefined')
		if ('template_dirs' in extra_options)
			template_dirs = extra_options.template_dirs

	template_loader.get(template_name, template_dirs, function(template_contents)
	{
		var template = new zest.templates.Template(template_contents)

		callback(template.render(template_engine, context, extra_options))
	})
}

