'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var AppChaseGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the swell AppChase generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name?',
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName; // Slugify this

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir(this.appName);
      this.dest.mkdir(this.appName + '/bin');
      this.dest.mkdir(this.appName + '/data');
      this.dest.mkdir(this.appName + '/node_modules');
      this.dest.mkdir(this.appName + '/src');

      this.src.copy('_package.json', this.appName + '/package.json');
      this.src.copy('_bower.json', this.appName + '/bower.json');
      this.src.copy('config.yml', this.appName + '/config.yml');
      this.src.copy('Gruntfile.js', this.appName + '/Gruntfile.js');
    },

    projectfiles: function () {
      this.src.copy('LICENSE', this.appName + '/LICENSE');
      this.src.copy('README.md', this.appName + '/README.md');
      this.src.copy('editorconfig', this.appName + '/.editorconfig');
      this.src.copy('jshintrc', this.appName + '/.jshintrc');
    }
  },

  end: function () {
    process.chdir(this.appName);

    this.installDependencies({
      bower: true,
      npm: true,
      skipInstall: false
    });
  }
});

module.exports = AppChaseGenerator;
