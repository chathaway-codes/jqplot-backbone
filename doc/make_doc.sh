#!/bin/bash

java -jar jsdoc-toolkit/jsrun.jar jsdoc-toolkit/app/run.js -a -t=jsdoc-toolkit/templates/jsdoc -d=api/ ../src/sample_site/jqplot_backbone/static/js/v/*.js
