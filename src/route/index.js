/* eslint-disable comma-dangle */
import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
const NotFind = () => import('@/views/404.vue');

const routes = [
    {
        name: 'index',
        path: '/',
        meta: {
            iconname: 'admin',
        },
        component: () => import('@/views/index.vue'),
        // redirect: { name: 'home' },
        children: [
            {
                name: 'home', // 首页
                path: '/home',
                menuLabel: '首页',
                meta: {
                    iconname: 'home',
                    menuLabel: '首页',
                },
                // component: () => import('@/views/home/index.vue'),
            },

            {
                name: 'OSAdministration', 
                path: '/OsAdministration',
                menuLabel: '组织架构管理',
                redirect: { name: 'team' },
                meta: {
                    iconname: 'organization',
                },
                children: [
                    {
                        name: 'team',
                        path: '/osAdministration/team',
                        menuLabel: '团队管理',
                        meta: {
                            menuLabel: '团队管理',
                        },
                        // component: () => import('@/views/teamcontrol/team.vue'),
                    },
                    {
                        name: 'person',
                        path: '/osAdministration/person',
                        menuLabel: '人员管理',
                        meta: {
                            menuLabel: '人员管理',
                        },
                        // component: () =>
                        //     import('@/views/teamcontrol/person.vue'),
                    },
                ],
            },
        ],
    },
    {
        name: 'noRight',
        path: '/noRight',
        component: () => import('@/views/noRight.vue'),
        meta: {
            iconname: 'admin',
        },
        menuLabel: '无权限页面',
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        name: 'error',
        path: '/404',
        component: NotFind,
    },
    {
        path: '/:pathMatch(.*)',
        component: NotFind,
        // redirect: { name: 'error' },
    },
];

const router = createRouter({
    history: createWebHistory(), // history 模式
    routes,
});
NProgress.configure({ showSpinner: false });
router.beforeEach((to, from, next) => {
    // 跳转路由cancel掉所有的网络请求
    window._axiosPromiseArr &&
        window._axiosPromiseArr.forEach((item) => {
            item.cancel();
            window._axiosPromiseArr = [];
        });
    NProgress.start();
    // token校验
    // if (to.path !== '/noRight') {
    //     if (to.query.token) {
    //         router.replace({
    //             path: to.path,
    //         });
    //         localStorage.setItem('EOAP-LOGIN-TOKEN', to.query.token);
    //         next();
    //     } else {
    //         console.log(to.query);
    //         if (to.query.errorCode == '407') {
    //             next('/noRight');
    //         } else {
    //             if (
    //                 !localStorage.getItem('EOAP-LOGIN-TOKEN') &&
    //                 to.path !== '/login'
    //             ) {
    //                 next('/login');
    //             } else {
    //                 next();
    //             }
    //         }
    //     }
    // } else {
    next();
    // }
});

router.afterEach((to) => {
    NProgress.done();
});
export { routes };
export default router;
