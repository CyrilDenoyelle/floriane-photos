const fs = require('fs');

module.exports = (dir) => {
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
            let fileName = list[i++];

            if (!fileName) {
                return done(null);
            }

            // fileName = dir.slice(1) + '/' + fileName;
            fileName = fileName;
            fs.stat(fileName, function (error, stat) {

                if (stat && stat.isDirectory()) {
                    walk(fileName, function (error) {
                        next();
                    });
                } else {
                    // do stuff to fileName here
                    // console.log(stat);
                    allFilesPaths.push(fileName);
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
