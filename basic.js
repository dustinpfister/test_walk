let dir = process.argv[2] || process.cwd();

require('walk').walk(dir)

// on file
.on('file', function (root, fileStats, next) {

    // log absolute path of each file found
    console.log(require('path').join(root,fileStats.name));
    next();

});
