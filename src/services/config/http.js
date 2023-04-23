/* eslint-disable comma-dangle */
import request from './request';
import requestDown from './requestUp';
const http = {
    /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
     */
    get(url, params, headers) {
        const config = {
            method: 'get',
            url,
        };
        if (params) config.params = params;
        if (headers) config.headers = headers;
        return request(config);
    },
    post(url, params, headers) {
        const config = {
            method: 'post',
            url,
        };

        if (params) config.data = params;
        if (headers) config.headers = headers;
        return request(config);
    },
    put(url, params) {
        const config = {
            method: 'put',
            url,
        };
        if (params) config.data = params;
        return request(config);
    },
    delete(url, params) {
        const config = {
            method: 'delete',
            url,
        };
        if (params) config.data = params;
        return request(config);
    },
    upload(url, params) {
        const config = {
            method: 'post',
            url,
            headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' },
        };
        if (params) config.data = params;
        return requestDown(config);
    },
};
export default http;
