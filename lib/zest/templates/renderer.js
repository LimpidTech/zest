var zest = require('zest')

this.renderer = function renderer(template_name, context, callback, extra_options)
{
	var template_loader = new zest.templates.Loader(),
	    template_engine = template_name.slice(template_name.lastIndexOf('.')+1)

	template_loader.get(template_name, ['/home/monokro.me/lib/node/monokro.me/templates'],

	function(template_contents)
	{
		var template = new zest.templates.Template(template_contents)

		callback(template.render(template_engine, context, extra_options))
	})
}

