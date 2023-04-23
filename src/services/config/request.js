/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable spaced-comment */
/****   request.js   ****/
// 导入axios
import axios from 'axios';
// 使用toast做消息提醒
import Router from '@/route/index.js';
import env from './env';
import store from '../../store/index';
//1. 创建新的axios实例，
const service = axios.create({
    // 公共接口
    baseURL: env.baseURL,
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 30 * 1000,
});
let reqNum = 0; // 当前正在进行的网络请求的数量
window._axiosPromiseArr = []; // axios网络请求数组
// 2.请求拦截器
service.interceptors.request.use(
    (config) => {
        reqNum++;
        config.cancelToken = new axios.CancelToken((cancel) => {
            window._axiosPromiseArr.push({ cancel });
        });
        if (reqNum > 0) {
            store.commit('changeLoadingStatus', true); //打开全局弹窗
        }
        //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
        config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
        config.headers['Content-Type'] = 'application/json';
        //如有需要：注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
        const token = localStorage.getItem('EOAP-LOGIN-TOKEN')
            ? localStorage.getItem('EOAP-LOGIN-TOKEN')
            : '';
        if (token) {
            config.headers['EOAP-LOGIN-TOKEN'] = token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// 3.响应拦截器
service.interceptors.response.use(
    (response) => {
        reqNum--;
        if (reqNum === 0) {
            store.commit('changeLoadingStatus', false); //关闭全局弹窗
        }
        //接收到响应数据并成功后的一些共有的处理，关闭loading等
        // response.config.metadata.endTime = new Date();
        // response.duration =
        //   response.config.metadata.endTime - response.config.metadata.startTime;
        switch (response.data.code) {
            case 200:
                if (response.data.msg && response.data.msg.length > 0) {
                    window.$message.success(response.data.msg);
                }
                break;
            case 400:
                window.$message.error(response.data.msg);
                break;
            case 401:
                localStorage.clear();
                window.$message.error(response.data.msg);
                redirectLogin();
                break;
            case 402:
                // localStorage.clear();
                window.$message.error(response.data.msg);
                // redirectLogin();
                break;
            case 404:
                // localStorage.clear();
                window.$message.warning(response.data.msg);
                // redirectLogin();
                break;
            case 413:
                // localStorage.clear();
                window.$message.error(response.data.msg);
                // redirectLogin();
                break;
            case 500:
                window.$message.error(response.data.msg);
                // redirectLogin();
                break; 
        }

        // if (response.data.errorNumber !== 0) {
        //   ElMessage({
        //     type: 'error',
        //     grouping: true,
        //     message: response.data.message,
        //   });
        //   // eslint-disable-next-line no-unused-expressions, eqeqeq
        //   response.data.errorNumber == 204 ? redirectLogin() : '';
        // } else {
        return response;
        // }
    },
    (error) => {
        reqNum--;
        if (reqNum === 0) {
            store.commit('changeLoadingStatus', false); //关闭全局弹窗
        }
        // error.config.metadata.endTime = new Date();
        // error.duration =
        //   error.config.metadata.endTime - error.config.metadata.startTime;
        // console.log(error, 887654);
        // /***** 接收到异常响应的处理开始 *****/
        if (error && error.response) {
            // 1.公共错误处理
            // 2.根据响应码具体处理
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求';
                    break;
                case 401:
                    localStorage.clear();
                    error.message = '未授权，请重新登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源';
                    // window.location.href = "/NotFound"
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = error.response.data.msg;
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = error.response.data.msg;
            }
        } else {
            // 超时处理
            if (JSON.stringify(error).includes('timeout')) {
                // Toast("服务器响应超时，请刷新当前页");
                window.$message.error('服务器响应超时，请刷新当前页');
            }
            error.message = '连接服务器失败';
        }

        // Message(error.message);
        // eslint-disable-next-line no-unused-expressions
        // eslint-disable-next-line no-unused-expressions
        error.response.status === 401 ? redirectLogin() : '';
        window.$message.error(error.message);
        /***** 处理结束 *****/
        //如果不需要错误处理，以上的处理过程都可省略
        return Promise.resolve(error.response);
    }
);

function redirectLogin() {
    Router.push('/login');
}
export default service;
