const { default: axios } = require('axios');
const fs = require('fs');

var cat = async function(path){
    testHead = path.slice(0,7);
    if (testHead == 'http://' || testHead == 'https:/'){
        let newData = await axios.get(path);
        console.log(newData.data);
    }
    else{
        return fs.readFile(path, 'utf8', function(err,data){
            if(err){
                console.error(err);
                process.exit(1);
            }
            console.log(data);
        });
    };
}

cat(process.argv[2]);