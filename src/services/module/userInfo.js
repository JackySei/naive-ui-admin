import env from '../config/env';
const user = {
    getInfo(serviceId) {
        return (
            env.serviceOut +
            '/cas/getmineV2?serviceId=' +
            serviceId +
            '&token=' +
            localStorage.getItem('ECRS-LOGIN-TOKEN')
        );
    },
};
export default user;
