
let walk = require('walk').walk,
path = require('path')
    yargs = require('yargs');

yargs

.command({

    command: '*',
    handler: function () {

        console.log('html file tool demo');

    }

})

.command({

    command: 'list',
    handler: function (argv) {

        // resolve to absolute path
        argv.dir = path.resolve(argv.dir);

        // on file
        walk(argv.dir)

        // on file
        .on('file', function (root, stats, next) {

            // log absolute path of each file found
            console.log(path.join(argv.dir,root,stats.name));

            //console.log(names)

            next();

        });

    }

})

.option('dir', {alias: 'd',default:process.cwd()})

.argv;

// node index list -d ../../../hexo_sitesource/public
