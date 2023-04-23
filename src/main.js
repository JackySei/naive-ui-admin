import './assets/css/index.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from './route/index';
import store from './store';
import Http from '@/services/config/http.js';
import naive from 'naive-ui';

if (process.env.NODE_ENV === 'development' && process.env.API_ENV === 'mock') {
    require('../mock');
}
// 动态路由部分
router.beforeEach(async (to, from, next) => {
    next();
});
// 如果有动态路由可以参考
// 首次或者刷新界面，next(...to, replace: true)会循环遍历路由，如果to找不到对应的路由会再执行一次beforeEach((to, from, next))直到找到对应路由
// if (to.query.errorCode == '407') {
//     next('/noRight');
// }
// if (registerRouteFresh && to.path !== '/login' && to.path !== '/noRight') {
//     await Http.get('/eoap/menu/list').then(async (res) => {
//         if (res.data.code === 200) {
//             userRoutes = res.data.data;
//             await transformRoute();
//         }
//         console.log(userRoutes, 'main.js');
//         if (!userRoutes && userRoutes.length === 0) {
//             next('/noRight');
//         } else {
//             const newRoutes = routerInit(userRoutes);
//             allRoutes.push({
//                 name: 'index',
//                 path: '/',
//                 component: () => import('@/views/index.vue'),
//                 // redirect: { name: 'home' },
//                 children: newRoutes,
//             });
//             console.log(allRoutes, '生成的路由');
//             // router.addRoute(allRoutes[0]);
//             allRoutes.forEach((value, index) => {
//                 router.addRoute(value);
//             });
//             const notFound = {
//                 path: '/:catchAll(.*)*',
//                 redirect: { name: 'error' },
//             };
//             router.addRoute(notFound);
//             next({ ...to, replace: true });
//             registerRouteFresh = false;
//         }
//     });
// } else {
//     next();
// }

// let userRouteIds = [];
// const userRoutes = [];
// const registerRouteFresh = true;
// const allRoutes = [];
// 路由转换
// async function transformRoute() {
//     await getUserMenuIds().then(() => {
//         deleteNoneMenu(userRoutes);
//     });
// }
// // 删除没有的菜单项
// function deleteNoneMenu(allarr) {
//     // console.log([...allarr],);
//     for (let i = 0; i < allarr.length; i++) {
//         if (allarr[i].childMenuList && allarr[i].childMenuList.length > 0) {
//             // console.log('有children', allarr[i].id);
//             if (userRouteIds && !userRouteIds.includes(allarr[i].id)) {
//                 console.log('删除', allarr[i].id);
//                 allarr.splice(i, 1);
//                 i--;
//             } else {
//                 deleteNoneMenu(allarr[i].childMenuList);
//             }
//         } else {
//             allarr[i].childMenuList = undefined; // 如果没有childMenuList 则删除这个字段，否则生成菜单会出错
//             if (userRouteIds &&!userRouteIds.includes(allarr[i].id)) {
//                 console.log('删除', allarr[i].id);
//                 allarr.splice(i, 1);
//                 i--;
//             }
//         }
//     }
// }
// function getUserMenuIds() {
//     return Http.get('/eoap/auth/menu/list').then((res) => {
//         if (res.data.code === 200) {
//             const notRoute = [];
//             userRouteIds = res.data.data;
//             console.log(userRoutes, 'hahah');
//             userRoutes.map((item) => {
//                 if (item.hidden && item.menuType === 0) {
//                     notRoute.push(item.id);
//                 }
//             });
//             userRouteIds =
//                 userRouteIds &&
//                 userRouteIds.filter((item) => {
//                     return !notRoute.includes(item);
//                 });
//             console.log(userRouteIds, 'ids,main.js.1');
//         }
//         if (!userRouteIds || userRouteIds.length === 0) {
//             router.push('/noRight');
//         }
//         if (res.data.code === 401) {
//             router.push('/login');
//         }
//     });
// }
// // 生成路由树
// function routerInit(options) {
//     console.log(options, '456');
//     const routearr = [];
//     options.forEach((item, index, arr) => {
//         if (item.menuComponent) {
//             console.log(`@/views/${item.menuComponent}`, '组件');
//         }
//         routearr.push({
//             name: item.pageName,
//             path: item.menuPath,
//             redirect: item.redirect
//                 ? { name: `${item.redirect.replace('/', '')}` }
//                 : '',
//             component:
//                 item.menuComponent && item.menuComponent.length > 0
//                     ? () => import(`@/views/${item.menuComponent}`)
//                     : undefined,
//             children:
//                 item.childMenuList && item.childMenuList.length > 0
//                     ? routerInit(item.childMenuList)
//                     : undefined,
//         });
//     });
//     return routearr;
// }
const app = createApp(App);
// 全局报错查看
app.config.errorHandler = (err, vm, info) => {
    console.log('[全局异常]', err, vm, info);
};
app.config.globalProperties.$http = Http;
app.use(naive).use(store).use(router).mount('#app');
