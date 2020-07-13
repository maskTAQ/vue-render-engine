import axios from 'axios';
import qs from 'qs';
import baseURL from './api';
import store from '@/store';
export const IPportal = baseURL.portal;
export const IPcas = baseURL.cas;
export const IPadmin = (axios.defaults.baseURL = baseURL.admin);
const accessToken = 'Z3prajpnemtq'
const basicp = 'Basic'
// axios.defaults.headers.common['Authorization'] = basicp + ' ' + accessToken;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.interceptors.request.use((request) => {
    //console.log (request, 'request')
    if (request.method == 'post') {
        request.params = {};
    }
    let token = localStorage.getItem("access_token")
    let out = localStorage.getItem("goout")
    if (token) {
        let name = out === '退出' ? 'Bearer' :'bearer'
        // 把token加入到默认请求参数中
        request.headers.common['Authorization'] = name + ' ' + token
    }

    return request;
});
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });
//
// if (request.code === 401) {
//     iView.Message.info('账号或密码错误，请刷新重试')
// }
// if (request.code === 500) {
//     //console.log ('接口500')
//     iView.Message.info('服务器报错，请刷新重试')
// }



// // 添加拦截器
// axios.interceptors.request.use(config => {
//     return config
// }, error => {
//     return Promise.reject(error)
// })




export const fetch = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const deletes = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};


export const post = (url, data = {}) => {
    const result = {};
    for (const key in data) {
        const v = data[key];
        if (typeof v === 'string') {
            result[key] = v;
        } else {
            result[key] = JSON.stringify(v);
        }
    }
    //console.log (result, qs.stringify(result), 'qs ')
    return new Promise((resolve, reject) => {
        axios
            .post(
            url,
            qs.stringify(result)
            )
            .then(response => {
                resolve(response);
            })
            .catch(err => {

                reject(err);
            });
    });
};

export const patch = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(
            url,
            qs.stringify(data, {
                arrayFormat: 'repeat'
            })
            )
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const put = (url, id, data = {}, config) => {
    const result = {};
    for (const key in data) {
        const v = data[key];
        if (typeof v === 'string') {
            result[key] = v;
        } else {
            result[key] = JSON.stringify(v);
        }
    }
    return new Promise((resolve, reject) => {
        axios
            .put(url, id, qs.stringify(result), config)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const postConfig = (url, data = {}, config) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data,config)
            .then(response => {
                if(response.data.success){
                resolve(response.data);
               }
               else{
                reject(response.data);
               }
            })
            .catch(err => {
                reject(err);
            });
    });
};
