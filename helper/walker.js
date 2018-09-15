const fs = require('fs');

module.exports = (dir, dirname) => {
    const done = (error) => {
        if (error) {
            console.log(error)
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
            let filePath = list[i++];

            if (!filePath) {
                return done(null);
            }

            filePath = dir.slice(1) + '/' + filePath;
            fs.stat(filePath, function (error, stat) {

                if (stat && stat.isDirectory()) {
                    walk(filePath, function (error) {
                        next();
                    });
                } else {
                    // do stuff to filePath here
                    // console.log(stat);
                    allFilesPaths.push(filePath);
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
