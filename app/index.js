'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BaseGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        // this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Base generator!'));

    var prompts = [{
      type: 'confirm',
      name: 'vagrant',
      message: 'Vagrant?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.vagrant = props.vagrant;

      done();
    }.bind(this));
  },

  app: function () {
    this.directory('www', 'www');
    this.directory('_assets', '_assets');

    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('package.json', 'package.json');
    this.copy('.gitignore', '.gitignore');
  },

  vagrant: function () {
    if(this.vagrant)
    {
      this.directory('files', 'files');
      this.directory('manifests', 'manifests');
      this.directory('modules', 'modules');

      this.copy('Vagrantfile', 'Vagrantfile');
    }
  }
});

module.exports = BaseGenerator;
