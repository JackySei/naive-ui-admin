import axios from 'axios';
import env from '../config/env';

// const logout = (opts) => {
//   console.log(opts, 123);
//   opts = {
//     method: "get",
//     url: "user/logout",
//     params: {
//       serviceId: env.serviceId,
//       token: localStorage.getItem("ECRS-ADMIN-TOKEN"),
//     },
//   };
//   // opts.url = env.serviceHost + opts.url;
//   return new Promise((resolve, reject) => {
//     axios
//       .request(opts)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((error) => {
//         // ajax 请求错误统一处理给用户的反馈是“请求失败，请重试”
//         reject({
//           Message: opts.Message || "请求失败，请重试",
//           Data: error,
//         });
//       });
//   });
// };

const logout = {
    logout(serviceId) {
        return (
            env.serviceOut +
            '?serviceId=' +
            serviceId +
            '&token=' +
            localStorage.getItem('ECRS-LOGIN-TOKEN')
        );
    },
};
export default logout;
