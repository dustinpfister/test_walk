let walk = require('walk'),
dir = process.argv[2] || process.cwd();

walker = walk.walk(dir);

walker.on('directories', function (root, stats, next) {

   console.log(root, stats[0].name);

    next();

});
