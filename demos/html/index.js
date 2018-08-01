
let walk = require('walk').walk,
path = require('path'),
yargs = require('yargs'),
fs = require('fs'),

// html walker
htmlWalker = function (opt, forFile) {

    opt = opt || {};
    forFile = forFile || function () {};

    // dir will be the given dir, or current working dir
    // and it should always be an absolute path
    opt.dir = opt.dir || process.cwd();
    opt.dir = path.resolve(opt.dir);

    // default file reading to false
    opt.read = opt.read || false;

    // walk the set dir
    walk(opt.dir)

    // on file
    .on('file', function (root, stats, next) {

        let ext = path.extname(stats.name).toLowerCase(),
        api = {

            root: root,
            absPath: path.join(root, stats.name),
            ext: ext,
            stats: stats,
            html: null,
            err: null

        };

        if (ext === '.html' || ext === '.htm') {

            if (opt.read) {

                fs.readFile(api.absPath, 'utf-8', function (err, html) {

                    api.err = err;
                    api.html = html;

                    forFile.call(api, next);

                });

            } else {

                forFile.call(api, next);

            }

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

        htmlWalker({
            dir: argv.dir,
            read: false
        }, function (next) {

            // just log the absolute path of all files
            console.log(this.absPath);

            next();

        });

    }

})

// read all html files
.command({

    command: 'read',
    handler: function (argv) {

        htmlWalker({
            dir: argv.dir,
            read: true
        }, function (next) {

            // logg the html
            console.log(this.html);

            next();

        });

    }

})

.option('dir', {
    alias: 'd',
default:
    process.cwd()
})

.argv;

// node index list -d ../../../hexo_sitesource/public
