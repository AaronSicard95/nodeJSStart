const fs = require('fs');

var cat = function(path){
    return fs.readFile(path, 'utf8', function(err,data){
        if(err){
            console.error(err);
            process.exit(1);
        }
        console.log(data);
    });
}

cat(process.argv[2]);