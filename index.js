'use strict'
var chalk = require('chalk');
var sh = require('shelljs');
var fs = require('fs');
var path = require('path');
var minimist = require('minimist');
var prompt = require('prompt');
var options = minimist(process.argv.slice(2));

var TARGETS = {
    rn: 'react-native',
}
function start(options) {
    var commands = options._;
    if (commands.length === 0 && (options.h || options.help)) {
        console.log([
            '',
            '  Usage: skit [command] [options]',
            '',
            '',
            '  Commands:',
            '',
            '    init <ProjectName> [options]  generates a new project and installs its dependencies',
            '',
            '  Options:',
            '',
            '    -h, --help    output usage information',
            '    -t,--template use an app template. Use --template to see available templates.',
            '',
        ].join('\n'));
        process.exit(0);
    }
    if (commands.length === 0) {
        console.error(
            'You did not pass any commands, run `react-native --help` to see a list of all available commands.'
        );
        process.exit(1);
    }
    switch (commands[0]) {
        case 'init':
            if (!commands[1]) {
                console.error(
                    'Usage: skit init <ProjectName> [--verbose]'
                );
                process.exit(1);
            } else {
                init(commands[1], options.template || options.t || '');
            }
            break;
        default:
            break;
    }
}
function init(name, template) {
    validateProjectName(name);
    if (fs.existsSync(name)) {
        createAfterConfirmation(name, template);
    } else {
        createProject(name, template);
    }
}

function validateProjectName(name) {
    if (!String(name).match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
        console.error(
            '"%s" is not a valid name for a project. Please use a valid identifier ' +
            'name (alphanumeric).',
            name
        );
        process.exit(1);
    }
}

function createProject(name, template) {
    var root = path.resolve(name);
    var projectName = path.basename(root);

    console.log(
        'This will walk you through creating a new project in',
        root
    );

    if (fs.existsSync(root)) {
       sh.rm('-rf',root);
    }
    fs.mkdirSync(root);
    var packageJson = {
        name: projectName,
        version: '0.0.1',
        private: true,
        scripts: {
        }
    };
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson));
    process.chdir(root);

    run(root, projectName, template);
}
function createAfterConfirmation(name, template) {
    prompt.start();
    var property = {
        name: 'yesno',
        message: 'Directory ' + name + ' already exists. Continue?',
        validator: /y[es]*|n[o]?/,
        warning: 'Must respond yes or no',
        default: 'no'
    };
    prompt.get(property, function (err, result) {
        if (result.yesno[0] === 'y') {
            createProject(name, template);
        } else {
            console.log('Project initialization canceled');
            process.exit();
        }
    });
}
function installDependencies(dependencies, isDev) {
    if (dependencies && dependencies.length > 0) {
        sh.exec('npm i ' + dependencies.join(' ') + (isDev ? ' -D' : ' -S'))
    }
}
function run(root, projectName, template) {
    var dependencies = [];
    var devDependencies = [];
    var npmIgnore = [];
    switch (template) {
        case TARGETS.rn:
            break;
    }
    installDependencies(['spencer-kit-project-templates@./../templates'],true);
    sh.exec('node ./node_modules/.bin/skitlocal -p ' + projectName + ' -t ' + template);
}
start(options);