
let walk = require('walk').walk,
path = require('path'),
yargs = require('yargs'),

htmlWalker = function (dir, forFile) {

    // resolve to absolute path
    dir = path.resolve(dir);

    // walk the set dir
    walk(dir)

    // on file
    .on('file', function (root, stats, next) {

        let ext = path.extname(stats.name).toLowerCase();

        if (ext === '.html' || ext === '.htm') {

            forFile.call({

                root: root,
                absPath: path.join(root, stats.name),
                ext: ext,
                stats: stats

            }, next);

        } else {

            next();

        }

    });

};

// process cli arguments with yargs
yargs

.command({

    command: '*',
    handler: function () {

        console.log('html file tool demo');

    }

})

// just list all html files
.command({

    command: 'list',
    handler: function (argv) {

        htmlWalker(argv.dir, function (next) {

            console.log(this.absPath);

            next();

        });

        /*
        // resolve to absolute path
        argv.dir = path.resolve(argv.dir);

        // walk the set dir
        walk(argv.dir)

        // on file
        .on('file', function (root, stats, next) {


        let ext = path.extname(stats.name);

        console.log(ext);

        if (ext.toLowerCase() === '.html') {

        console.log(path.join(argv.dir, root, stats.name));

        }

        next();


        htmlWalker(argv.dir)


        });
         */

    }

})

.option('dir', {
    alias: 'd',
default:
    process.cwd()
})

.argv;

// node index list -d ../../../hexo_sitesource/public
