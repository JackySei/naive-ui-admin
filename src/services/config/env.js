/* eslint-disable indent */
// eslint-disable-next-line indent
let envBase;
switch (process.env.API_ENV) {
    case 'prd':
        envBase = {
            baseURL: '',
            serviceHost: 'https://njcas.eastmoney.com/cas/login',
            serviceHostSms: 'https://wxuc.eastmoney.com/mcas/loginbysms.html',
            serviceOut: 'https://njcas.eastmoney.com/cas/logout',
        };
        break;
    case 'uat':
        envBase = {
            baseURL: '',
            serviceHost: 'https://njcas.eastmoney.com/cas/login',
            serviceHostSms: 'https://wxuc.eastmoney.com/mcas/loginbysms.html',
            serviceOut: 'https://njcas.eastmoney.com/cas/logout',
        };
        break;
    case 'dev':
        envBase = {
            serviceHost: 'https://njcas.eastmoney.com/cas/login',
            serviceHostSms: 'https://wxuc.eastmoney.com/mcas/loginbysms.html',
            serviceOut: 'https://njcas.eastmoney.com/cas/logout',
            redirectUrl: 'http://28.51.8.136:8003/',
        };
        break;
    case 'mock':
        envBase = {
            serviceHost: 'https://njcas.eastmoney.com/cas/login',
            serviceHostSms: 'https://wxuc.eastmoney.com/mcas/loginbysms.html',
            serviceOut: 'https://njcas.eastmoney.com/cas/logout',
        };
        break;
    default:
        envBase = {
            baseURL: '',
        };
}

export default envBase;
