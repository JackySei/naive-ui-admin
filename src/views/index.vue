<template>
    <div class="adminIndex">
        <n-layout>
            <n-layout-header
                :inverted="inverted"
                bordered
                content-style="padding: 24px"
                class="header"
            >
                <div class="side-title">
                    <div class="logoname">
                        <img
                            src="@/assets/image/favicon.png"
                            alt=""
                            style="vertical-align: text-bottom"
                        />
                        项目名称
                    </div>
                    <div class="right-setting">
                        <div class="pane-item">
                            <n-dropdown :options="userOptions">
                                <div>
                                    <n-icon size="20">
                                        <SettingsOutline />
                                    </n-icon>
                                    <span>{{
                                        userName ? userName : '用户名'
                                    }}</span>
                                </div>
                            </n-dropdown>
                        </div>
                    </div>
                </div>
            </n-layout-header>
            <n-layout has-sider>
                <n-layout-sider
                    bordered
                    content-style="max-height:calc(100vh - 56px);overflow-y:auto"
                    width="220"
                    collapse-mode="width"
                    :collapsed-width="64"
                    show-trigger="arrow-circle"
                    :collapsed="collapsed"
                    @collapse="collapsed = true"
                    @after-leave="updateNavScroll"
                    @after-enter="updateNavScroll"
                    @expand="collapsed = false"
                    class="sider-btn"
                >
                    <n-menu
                        :options="routeOptions"
                        key-field="path"
                        label-field="menuLabel"
                        children-field="children"
                        :collapsed-width="64"
                        :collapsed-icon-size="22"
                        @update:value="clickMenuItem"
                        @update:expanded-keys="flodMenu"
                        :value="selectPath"
                    />
                </n-layout-sider>
                <n-layout-content>
                    <!-- 菜单快捷选项 -->
                    <!-- <n-layout-header
                        :inverted="inverted"
                        bordered
                        class="subheader"
                    >
                        <div class="tabs-view">
                            <div class="tabs-view-main">
                                <div
                                    ref="navWrap"
                                    class="tabs-card"
                                    :class="{
                                        'tabs-card-scrollable': scrollable,
                                    }"
                                >
                                    <span
                                        class="tabs-card-prev"
                                        :class="{
                                            'tabs-card-prev-hide': !scrollable,
                                        }"
                                        @click="scrollPrev"
                                    >
                                        <n-icon size="16" color="#515a6e">
                                            <ChevronBack />
                                        </n-icon>
                                    </span>
                                    <span
                                        class="tabs-card-next"
                                        :class="{
                                            'tabs-card-next-hide': !scrollable,
                                        }"
                                        @click="scrollNext"
                                    >
                                        <n-icon size="16" color="#515a6e">
                                            <ChevronForward />
                                        </n-icon>
                                    </span>
                                    <div
                                        ref="navScroll"
                                        class="tabs-card-scroll"
                                    >
                                        <div
                                            class="tabs-card-scroll-item"
                                            :class="{
                                                'active-item':
                                                    isActive === item.path,
                                            }"
                                            v-for="(item, index) in tabList"
                                            :key="item.path"
                                            @click.stop="goPage(item, index)"
                                        >
                                            <span>{{ item.menuLabel }}</span>
                                            <n-icon
                                                size=" 14"
                                                @click.stop="
                                                    closeTabItem(item, index)
                                                "
                                                v-if="!item.notClose"
                                            >
                                                <CloseOutline />
                                            </n-icon>
                                        </div>
                                    </div>
                                </div>
                                <div class="tabs-down">
                                    <n-dropdown
                                        trigger="hover"
                                        @select="closeHandleSelect"
                                        placement="bottom-end"
                                        :options="TabsMenuOptions"
                                    >
                                        <div class="tabs-down-btn">
                                            <n-icon size="16" color="#515a6e">
                                                <ChevronDownOutline />
                                            </n-icon>
                                        </div>
                                    </n-dropdown>
                                </div>
                            </div>
                        </div>
                    </n-layout-header> -->
                    <n-layout-content
                        style="
                            background: #f5f7f9;
                            min-height: calc(100vh - 54px);
                        "
                    >
                        <n-spin :show="loading">
                            <template #description> 加载中 </template>
                            <router-view></router-view>
                        </n-spin>
                    </n-layout-content>
                </n-layout-content>
            </n-layout>
        </n-layout>
    </div>
</template>
<script setup>
import logout from '@/services/module/logout.js';
import { useStore } from 'vuex';
import { routes } from '../route/index';
import {
    ref,
    watch,
    computed,
    onMounted,
    getCurrentInstance,
    h,
    defineEmits,
    nextTick,
} from 'vue';
import { NIcon, useMessage, useDialog } from 'naive-ui';
import {
    BookOutline,
    PersonOutline,
    SettingsOutline,
    BulbOutline,
    CloudDoneOutline,
    ClipboardOutline,
    DocumentOutline,
    GitNetworkOutline,
    ShareSocialOutline,
} from '@vicons/ionicons5';
import { useRouter, useRoute } from 'vue-router';
import { get } from 'lodash';
// const emit = defineEmits('clickMenuItem');
const iconList = {
    home: BookOutline,
    organization: GitNetworkOutline,
    baseData: ClipboardOutline,
    saltmaster: BulbOutline,
    strategy: DocumentOutline,
    service: CloudDoneOutline,
    personal: PersonOutline,
    system: SettingsOutline,
    workflow: ShareSocialOutline,
};
const { proxy } = getCurrentInstance();
const serviceId = ref('');
const breadcrumbData = ref([]);
const store = useStore();
const route = useRoute();
const router = useRouter();
const routeOptions = ref();
const navScroll = ref(null);
const isActive = ref('');
const scrollable = ref(false);
const editPasswordShow = ref(false);
const showMessage = ref(false);
const showDeal = ref(false);
const showMyStart = ref(false);
const selectPath = ref('/test1');
const selectName = ref('/test1');
const oldPassword = ref();
const newPassword = ref();
const newPasswordSecond = ref();
const collapsed = ref(true);
const userOptions = [
    {
        label: '退出登录',
        key: 'logout',
        props: {
            onClick: () => {
                outUser();
            },
        },
    },
];
const tabList = ref([]);
// 设置全局提示和弹窗
window.$message = useMessage();
window.$dialog = useDialog();
// function flodMenu(keys) {
//     if (keys.length > 1) keys.splice(0, 1);
// }

function clickMenuItem(key, item) {
    console.log(key, 111);
    router.push(key);
    selectPath.value = key;
}
function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const getBreadcrumbData = () => {
    breadcrumbData.value = route.matched.filter(
        (item) => item.meta && item.meta.title
    );
};
function goPage(item, index) {
    if (isActive.value === item.path) return;
    isActive.value = item.path;
    router.push(item.path);
}
function closeTabItem(tabitem, index) {
    tabList.value.some((item, index) => {
        if (tabitem.path === item.path) {
            tabList.value.splice(index, 1);
        }
    });
    localStorage.setItem('eoap_tablist', JSON.stringify(tabList.value));
    if (isActive.value === tabitem.path) {
        router.push('/home');
    }
}
/**
 * @param value 要滚动到的位置
 * @param amplitude 每次滚动的长度
 */
function scrollTo(value, amplitude) {
    const currentScroll = navScroll.value.scrollLeft;
    const scrollWidth =
        (amplitude > 0 && currentScroll + amplitude >= value) ||
        (amplitude < 0 && currentScroll + amplitude <= value)
            ? value
            : currentScroll + amplitude;
    navScroll.value && navScroll.value.scrollTo(scrollWidth, 0);
    if (scrollWidth === value) return;
    return window.requestAnimationFrame(() => scrollTo(value, amplitude));
}

function scrollPrev() {
    const containerWidth = navScroll.value.offsetWidth;
    const currentScroll = navScroll.value.scrollLeft;
    console.log(currentScroll, containerWidth, '.....');
    if (!currentScroll) return;
    const scrollLeft =
        currentScroll > containerWidth ? currentScroll - containerWidth : 0;
    scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
}

function scrollNext() {
    const containerWidth = navScroll.value.offsetWidth;
    const navWidth = navScroll.value.scrollWidth;
    const currentScroll = navScroll.value.scrollLeft;

    if (navWidth - currentScroll <= containerWidth) return;
    const scrollLeft =
        navWidth - currentScroll > containerWidth * 2
            ? currentScroll + containerWidth
            : navWidth - containerWidth;
    scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
}
// 监听路由变化时触发
watch(
    route,
    (to, from) => {
        console.log('to', to, 'from', from);
        isActive.value = to.path;
        console.log(to, '1111');
        //to中to.menuLabel获取不到，只能通过to.meta.menuLabel获取名称。
        //所以在路由中两种都写了，menulabel是用于直接导入生成了菜单，而to.meta.menuLabel是为了watch时能获取到名称。
        selectName.value = to.meta.menuLabel; 
        selectPath.value = to.path;
        getTabList();
        const isExist = tabList.value.some((item, index) => {
            if (item.path === to.path) {
                return true;
            } else {
                return false;
            }
        });
        if (!isExist) {
            tabList.value.push({
                path: to.path,
                menuLabel: to.meta.menuLabel,
            });
        }
        localStorage.setItem('eoap_tablist', JSON.stringify(tabList.value));
    },
    {
        immediate: true,
    }
);
watch(
    tabList,
    () => {
        updateNavScroll();
    },
    {
        deep: true,
    }
);
const loading = computed({
    get() {
        return store.state.isLoading;
    },
});
const haveNowPath = ref(false);
const activePath = computed(() => {
    if (route.path.indexOf('/ecrs/pgccheck/check') > -1) {
        return '/ecrs/pgccheck/check';
    } else {
        return route.path;
    }
});
async function updateNavScroll() {
    await nextTick();
    if (!navScroll.value) return;
    const containerWidth = navScroll.value.offsetWidth;
    const navWidth = navScroll.value.scrollWidth;
    if (containerWidth < navWidth) {
        scrollable.value = true;
    } else {
        scrollable.value = false;
    }
}
const userRoutes = ref();
const userName = ref('');
const userRouteIds = ref();
onMounted(() => {
    getRouteList();
});
function getServiceId() {
    proxy.$http
        .get('/eoap/auth/service/id')
        .then((res) => {
            serviceId.value = res.data.data;
        })
        .catch(() => {});
}
function getUserInfo() {
    proxy.$http.get('/eoap/auth/current/user').then((res) => {
        if (res.data.code === 200) {
            userName.value = res.data.data;
        }
    });
}
function getRouteList() {
    getAllMenu();
}
function getAllMenu() {
    console.log(routes[0], '11111111111');
    // 一级菜单添加图标
    routes[0].children.forEach((item) => {
        if (item.meta.iconname && item.meta.iconname.length > 0) {
            item.icon = renderIcon(iconList[item.meta.iconname]);
        }
    });
    // 菜单
    // 静态路由
    routeOptions.value = routes[0].children;
    // 动态路由
    // proxy.$http.get('/eoap/menu/list').then((res) => {
    //     if (res.data.code === 200) {
    //         userRoutes.value = res.data.data;
    //         // console.log(userRoutes.value, '获取的路由');
    //         transformRoute(userRoutes.value);
    //     }
    // });
}
// 路由转换
function transformRoute() {
    getUserMenuIds().then(() => {
        console.log('拥有的id', userRouteIds.value);
        // userRouteIds.value = userRouteIds.value.filter((item) => {
        //     return ![7, 20].includes(item);
        // });
        // console.log(userRouteIds.value, 999999999999);
        if (!userRouteIds.value || userRouteIds.value.length === 0) {
            router.push('/noRight');
        }
        console.log(haveNowPath.value, 'haveNowPath');
        console.log(route.path, 'nowPath');
        deleteNoneMenu(userRoutes.value);
        console.log(haveNowPath.value, 'haveNowPath');
        routeOptions.value = userRoutes.value;
        canGetNowPath(routeOptions.value);
        routeOptions.value &&
            routeOptions.value.forEach((item, index) => {
                if (item.iconName && item.iconName.length > 0) {
                    item.icon = renderIcon(iconList[item.iconName]);
                }
            });
        // 进入拥有用户拥有菜单的第一项
        console.log('生成的菜单', routeOptions.value);
        // const havePath = routeOptions.value.some((item) => {
        //     if(item.)
        // });
        if (routeOptions.value.length > 0) {
            // router.push(routeOptions.value[0].menuPath);
            console.log('11111111111', haveNowPath.value);
            if (haveNowPath.value) {
                router.push({
                        path: route.path,
                        query: router.currentRoute.value.query,
                    });
            } else if (
                routeOptions.value[0].childMenuList &&
                routeOptions.value[0].childMenuList.length > 0
            ) {
                router.push(routeOptions.value[0].childMenuList[0].menuPath);
            } else {
                router.push(routeOptions.value[0].menuPath);
            }
        }
        // router.push(routeOptions.value[0].menuPath);
    });
}

function canGetNowPath(allarr) {
    for (let i = 0; i < allarr.length; i++) {
        // console.log(allarr[i].id, '菜单id'); // 删除个人设置菜单（id=7）项
        if (allarr[i].childMenuList && allarr[i].childMenuList.length > 0) {
            console.log('有children', allarr[i].id);
            if (allarr[i].menuPath === route.path) {
                haveNowPath.value = true;
                continue;
            } else {
                canGetNowPath(allarr[i].childMenuList);
            }
        } else {
            if (allarr[i].menuPath === route.path) {
                haveNowPath.value = true;
                continue;
            }
        }
    }
}
// 删除没有的菜单项
function deleteNoneMenu(allarr) {
    console.log([...allarr], 'all');
    for (let i = 0; i < allarr.length; i++) {
        // console.log(allarr[i].id, '菜单id'); // 删除个人设置菜单（id=7）项
        if (allarr[i].id === 7 || allarr[i].id === 17) {
            allarr.splice(i, 1);
            i--;
            continue;
        }
        if (allarr[i].childMenuList && allarr[i].childMenuList.length > 0) {
            console.log('有children', allarr[i].id);
            if (!userRouteIds.value.includes(allarr[i].id)) {
                console.log('删除', allarr[i].id);
                allarr.splice(i, 1);
                i--;
            } else {
                deleteNoneMenu(allarr[i].childMenuList);
            }
        } else {
            allarr[i].childMenuList = undefined; // 如果没有childMenuList 则删除这个字段，否则生成菜单会出错
            if (!userRouteIds.value.includes(allarr[i].id)) {
                console.log('删除', allarr[i].id);
                allarr.splice(i, 1);
                i--;
            }
        }
    }
}
function getUserMenuIds() {
    return proxy.$http.get('/eoap/auth/menu/list').then((res) => {
        if (res.data.code === 200) {
            userRouteIds.value = res.data.data;
            // console.log(userRouteIds.value, 'ids');
        } else {
            router.push('/login');
        }
    });
}
function getTabList() {
    tabList.value = JSON.parse(localStorage.getItem('eoap_tablist')) || [];
    if (tabList.value.length === 0) {
        tabList.value = [];
        tabList.value.push({
            path: '/home',
            menuLabel: '首页',
            notClose: true,
        });
        if (isActive.value !== '/home') {
            tabList.value.push({
                path: isActive.value,
                menuLabel: selectName.value,
            });
        }
    }
    localStorage.setItem('eoap_tablist', JSON.stringify(tabList.value));
}
function outUser() {
    localStorage.removeItem('EOAP-LOGIN-TOKEN');
    window.location.href = logout.logout(serviceId.value);
}
</script>
<style lang="scss" scoped>
.adminIndex {
    .n-layout-header {
        color: #fff;
        padding: 0 6px;
    }

    .header {
        color: #fff;
        background-color: #262f3e;
    }

    .subheader {
        color: #fff;
        background-color: #f5f7f9;
        padding-top: 6px;
    }

    ::v-deep .n-layout-sider .n-layout-toggle-button {
        top: 200px;
    }

    .side-title {
        display: flex;
        font-size: 16px;
        font-weight: bold;
        // text-align: center;
        margin-left: 10px;
        justify-content: space-between;
        padding: 15px 0;

        img {
            width: 20px;
            position: relative;
            top: 0px;
            vertical-align: text-bottom;
            // height: 20px;
        }

        .right-setting {
            display: flex;
            margin-right: 20px;
            color: #666;
            font-size: 14px;
            align-items: center;

            .notify {
                display: flex;

                .notify-header {
                }

                .notify-header-all {
                }

                .notify-body {
                    .notify-body-item {
                    }
                }
            }

            .pane-item {
                color: #fff;
                margin-right: 14px;
                cursor: pointer;

                .n-icon {
                    vertical-align: text-bottom;
                    margin-right: 2px;
                }
            }
        }
    }

    .tabs-view {
        width: 100%;
        padding: 6px;
        display: flex;
        transition: all 0.2s ease-in-out;

        &-main {
            height: 32px;
            display: flex;
            max-width: 100%;
            min-width: 100%;

            .tabs-card {
                -webkit-box-flex: 1;
                flex-grow: 1;
                flex-shrink: 1;
                overflow: hidden;
                position: relative;

                .tabs-card-prev,
                .tabs-card-next {
                    width: 32px;
                    text-align: center;
                    position: absolute;
                    line-height: 32px;
                    cursor: pointer;

                    .n-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 32px;
                        width: 32px;
                    }
                }

                .tabs-card-prev {
                    left: 0;
                }

                .tabs-card-next {
                    right: 0;
                }

                .tabs-card-scroll {
                    &-item {
                        vertical-align: bottom;
                    }
                }

                .tabs-card-next-hide,
                .tabs-card-prev-hide {
                    display: none;
                }

                &-scroll {
                    white-space: nowrap;
                    overflow: hidden;
                    height: 32px;
                    // vertical-align: top;

                    &-item {
                        background: #fff;
                        color: #000;
                        height: 24px;
                        padding: 4px 16px 4px;
                        border-radius: 3px;
                        margin-right: 6px;
                        cursor: pointer;
                        display: inline-block;
                        position: relative;
                        flex: 0 0 auto;
                        border-radius: 5px;
                        // font-size: 14px;

                        span {
                            float: left;
                            font-size: 14px;
                            line-height: 24px;
                        }

                        &:hover {
                            color: #515a6e;
                        }

                        .n-icon {
                            height: 22px;
                            width: 21px;
                            margin-right: -6px;
                            position: relative;
                            vertical-align: text-top;
                            text-align: center;
                            color: #808695;
                            margin-top: 2px;

                            &:hover {
                                color: #f60 !important;
                            }

                            svg {
                                height: 21px;
                                display: inline-block;
                            }
                        }
                    }

                    .active-item {
                        color: #f60;
                    }
                }
            }

            .tabs-card-scrollable {
                padding: 0 32px;
                overflow: hidden;
            }
        }

        .tabs-down {
            min-width: 32px;
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: var(--color);
            border-radius: 2px;
            cursor: pointer;
            //margin-right: 10px;

            &-btn {
                color: var(--color);
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>
