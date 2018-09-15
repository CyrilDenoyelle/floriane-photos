const fs = require('fs');

module.exports = (dir) => {
    const done = (error) => {
        if (error) {
            throw error;
        } else {
            // console.log('-------------------------------------------------------------');
            // console.log('finished.', allFilesPaths);
            // console.log('-------------------------------------------------------------');
        };
    };

    allFilesPaths = [];
    fs.readdir(dir, (error, list) => {
        if (error) {
            return done(error);
        }

        let i = 0;

        (function next() {
            let file = list[i++];

            if (!file) {
                return done(null);
            }

            file = dir + '/' + file;

            fs.stat(file, function (error, stat) {

                if (stat && stat.isDirectory()) {
                    walk(file, function (error) {
                        next();
                    });
                } else {
                    // do stuff to file here
                    // console.log(stat);
                    allFilesPaths.push(__dirname + file);
                    next();
                }
            });
        })();
    });
    return allFilesPaths;
};

// optional command line params
//      source for walk path
process.argv.forEach((val, index, array) => {
    if (val.indexOf('source') !== -1) {
        walkPath = val.split('=')[1];
    }
});
