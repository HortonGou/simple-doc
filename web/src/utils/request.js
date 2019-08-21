import axios from 'axios'

// 创建axios实例
const instance = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
});

// request拦截器
instance.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error);
});

// response拦截器
instance.interceptors.response.use(
    res => {
        if (res.status !== 200) {
            console.log(res);
            return Promise.reject('error' + res.statusText)
        } else {
            return res.data
        }
    },
    error => {
        return Promise.reject(error)
    }
);

export default instance