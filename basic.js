let walk = require('walk'),

options = {},

walker = walk.walk(process.argv[2] || process.cwd(), options);

walker.on('file', function (root, fileStats, next) {

    console.log(this);

    next();

});
