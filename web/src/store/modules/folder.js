import api from '../../api'


const user = {
    namespaced: true,
    state: {
        folderList: []
    },
    getters: {
        getApiList: (state) => (folderName) => {
            let item = state.folderList.find((value) => {
                return value.name === folderName
            });
            if (item == null || item.apis == null) {
                return []
            }
            return item.apis;
        }
    },
    mutations: {
        updateFolderList(state, list) {
            state.folderList = list
        },
        updateApiList(state, payload) {
            state.folderList.map(folder => {
                if (folder.name === payload.folderName) {
                    folder.apis = payload.apiList;
                }
            })
        }
    },
    actions: {
        getFolderList({commit}) {
            return new Promise(function (resolve, reject) {
                api.folder.getList().then(list => {
                    list.map(item => {
                        item.apis = []
                    });
                    commit('updateFolderList', list);
                    resolve();
                }).catch(function (err) {
                    reject(err);
                })
            })
        },
        getFolderApiList({commit},params) {
            return new Promise(function (resolve, reject) {
                api.folder.getApis(params.folderName).then(apiList => {
                    commit('updateApiList', {
                        folderName: params.folderName,
                        apiList: apiList
                    });
                    resolve();
                }).catch(function (err) {
                    reject(err);
                })
            })
        },
        refresh({commit, state}) {
            return new Promise(function (resolve, reject) {
                const promises = state.folderList.filter(value => {
                    return value.apis != null && value.apis.length > 0
                }).map(item => {
                    return new Promise(resolve1 => {
                        api.folder.getApis(item.name).then(apis => {
                            item.apis = apis;
                            resolve1();
                        })
                    })
                });
                if (promises.length > 0) {
                    Promise.all(promises).then(() => {
                        return api.folder.getList();
                    }).then(list => {
                        list.map(item => {
                            let old = state.folderList.find((value) => {
                                return value.name === item.name
                            });
                            if (old == null) {
                                item.apis = [];
                            } else {
                                item.apis = old.apis
                            }
                        });
                        commit('updateFolderList', list);
                        resolve();
                    });
                } else {
                    api.folder.getList().then(list => {
                        list.map(item => {
                            item.apis = []
                        });
                        commit('updateFolderList', list);
                        resolve();
                    }).catch(function (err) {
                        reject(err);
                    })
                }

            })
        }
    }
};
export default user