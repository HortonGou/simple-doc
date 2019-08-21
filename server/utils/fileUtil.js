const fs = require('fs');

function readDir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    });
}

function stat(path) { // 确认是否是文件夹
    return new Promise((res, rej) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                rej(err);
            } else {
                res(stats)
            }
        })
    })
}

function readFile(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,'utf-8',(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
module.exports={
    readDir,
    stat,
    readFile
}