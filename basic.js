let walk = require('walk'),
path = require('path'),

options = {},

walker = walk.walk(process.argv[2] || process.cwd(), options);

walker.on('names', function (root, names, next) {

    //console.log(path.join(root, fileStats.name));

    //console.log(fileStats.isDirectory());
    console.log('names at : ' + root);
    console.log(names);
    console.log('');

    next();

});
