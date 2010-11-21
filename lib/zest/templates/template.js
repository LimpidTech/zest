var zest = require('zest')

var TemplateEngineError = zest.util.errors.create_error('TemplateEngineError')
this.TemplateEngineError = TemplateEngineError

var template_renderers = {
	jade: function(template_string, context, extra_options)
	{
		var jade = require('jade')

		if (typeof extra_options.locals != 'undefined')
			extra_options.locals.prototype = context
		else
			extra_options.locals = context

		return jade.render(template_string, extra_options)
	}
}

this.Template = function Template(template_string)
{
	this.template_string = template_string

	this.render = function(engine, context, extra_options)
	{
		extra_options = extra_options || {}

		if (typeof template_renderers[engine] != 'undefined')
		{
			var template_method = template_renderers[engine]

			return template_method(template_string, context, extra_options)
		}

		throw new TemplateEngineError('The requested template engine is not supported.')
	}
}

this.Template.prototype = new Object()

