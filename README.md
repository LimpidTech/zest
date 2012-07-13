# Zest for Node.JS
#### Brandon "monokrome" Stoner <monokrome@monokro.me>

## What is Zest?

To my dismay, there aren't really any "full-featured" frameworks for NodeJS. I needed a framework with flexibilities that just aren't supported by any node.js frameworks that I've come across yet, so I wrote my own. This framework aims to be as flexible as possible while making development as fast as possible and not forcing you to use anything that you don't need.

## What does it do?

Well, right now it doesn't do much. I've just started it, but for now we have this:

* Flexible URL routing. You simply provide a list of URLs to zest.http.server, and it will route them to whatever views it needs to. Currently, the following types of URLs are supported:
	* Regular Expressions *(automatically passes matches as arguments)*
	* Static strings *(no dynamic strings, so no argument support)*
* Templating with support for the following template languages
	* Jade

## What is planned?

There are a lot of planned features for Zest. Initially, I want to see a framework where every componenet is generally usable and flexible enough to be extended. I will be adding the following to reach this goal:

* More basic HTTP tools
* More flexible template loading, with multiple loader backends
* Support for automatic HTML form generation
* Object Relational Mapping *(unless someone shows me something worth the dependancy)*

After this, I will be looking into expanding the current feature set with more additions and interesting features.

## How does it work?

Here is a simple usage example: https://gist.github.com/3108135

Note that you could also use a template in a directory called `templates` with a file
called `home.jade` in it, and your application could simply use this instead:

    module.exports =
        home: (request, response) ->
            response.render 'home.jade'

You can also pass an object as the secondary argument which can contain any variables
that will be exposed in home.jade for your template to make use of.

