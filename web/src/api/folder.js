import request from '../utils/request'

export default {
    getList: function () {
        return request.get("/folder", {data: {}});
    },
    getApis: function (folderName) {
        return request.get("/folder/" + folderName);
    }
}