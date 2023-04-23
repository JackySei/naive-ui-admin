/* eslint-disable comma-dangle */
/* eslint-disable prefer-const */
import env from '../config/env';

const login = {
    loginByOa(serviceId) {
        let redirectUrl = env.redirectUrl
            ? '&redirectUrl=' + env.redirectUrl
            : '';
        return env.serviceHost + '?serviceId=' + serviceId + redirectUrl;
    },
    loginBySms(serviceId) {
        let redirectUrl = env.redirectUrl
            ? '&redirectUrl=' + env.redirectUrl
            : '';
        return env.serviceHostSms + '?serviceId=' + serviceId + redirectUrl;
    },
};

export default login;
