const path = require('path');//解析需要遍历的文件夹
const filePath = path.resolve('../docs');
const fileUtil = require('./fileUtil');


async function getFolders() {
    const files = await fileUtil.readDir(filePath);
    const promises = files.map(file => {
        let filedir = path.join(filePath, file);
        return new Promise(resolve => {
            fileUtil.stat(filedir).then(state => {
                resolve({name: file, state: state})
            });
        });
    });
    const statsList = await Promise.all(promises);
    const folderList = statsList.filter(item => {
        return item.state.isFile();
    }).map(item => {
        const fileName = item.name.substring(0, item.name.indexOf("."));
        return {name: fileName}
    });
    return folderList;
}


function getApiList(fileName) {
    return new Promise(resolve => {
        let dirPath = path.join(filePath, fileName + ".json");
        fileUtil.readFile(dirPath)
            .then(data => {
                resolve(JSON.parse(data.toString()))
            });
    })

}

module.exports = {
    getFolders,
    getApiList
};
