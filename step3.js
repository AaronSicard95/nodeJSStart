const { default: axios } = require('axios');
const fs = require('fs');

var cat = async function(write, startint){
    let path = "";
    let newData = "";
    for(let i=startint; i<process.argv.length; i++){
        path = process.argv[i];
        testHead = path.slice(0,7);
        if (testHead == 'http://' || testHead == 'https:/'){
            newData = await axios.get(path);
            newData = newData.data;
        }
        else{
            fs.readFile(path, 'utf8', function(err,data){
                if(err){
                    console.error(err);
                    process.exit(1);
                }
                newData = data;
            });
        };
        console.log(newData);
        if(write==true){
            fs.stat(`./${process.argv[3]}`, function(err, stat){
                if(err==null){
                    fs.readFile(`./${process.argv[3]}`, 'utf8', function(err,data){
                        if(err){
                            console.error(err);
                            process.exit(1);
                        }
                        fs.writeFile(`./${process.argv[3]}`, `${data}${newData}`, "utf8", function(err){
                            if(err){
                                console.log(err);
                                process.exit(1);
                            }
                            console.log('File written successfully')
                        })
                    })
                }else if(err.code==='ENOENT'){
                    fs.writeFile(`./${process.argv[3]}`, newData, "utf8", function(err){
                        if(err){
                            console.log(err);
                            process.exit(1);
                        }
                        console.log('File written successfully')
                    })
                }else{
                    console.log(err);
                    process.exit(1);
                }
            })
        }else{
            console.log(newData);
        }
    }
}

if(process.argv[2]=="--out"){
    cat(true, 4);
} else{
    cat(false, 2);
}

