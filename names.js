let walk = require('walk'),
path = require('path'),

dir = process.argv[2] || process.cwd();

walker = walk.walk(dir);

walker.on('names', function (root, names, next) {

    console.log('names at : ' + root);
    console.log(names);
    console.log('');

    next();

});
