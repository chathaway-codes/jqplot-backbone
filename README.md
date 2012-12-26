jqplot-backbone
===============

<p>jqplot-backbone aims to create an easy-to-use layer for creating graphs and charts in Javascript with data provided by a REST API</p>

<p>This project uses RequireJS to handle all module tracking, and will provide the "jqplot" module. Any applications that use it are expected to provide the following modules:</p>

<ul>
  <li>backbone (and backbone-tastypie, at least for now)</li>
  <li>jquery</li>
  <li>jqplot</li>
</ul>

<p>Along with all the jqplot plugins that get used. These will be referenced relative to the project root. A sample project layout would look like:</p>

<pre>
static/
  js/
    backbone.js
    backbone-tastypie.js
    jquery.jqplot.js
    require-jquery.js
    underscore.js
    plugins/
      jqplot.*
</pre>
