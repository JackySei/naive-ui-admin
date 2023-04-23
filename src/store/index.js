import { createStore } from 'vuex';

export default createStore({
    state: {
        isLoading: false, // 全局弹窗状态
    },
    mutations: {
        changeLoadingStatus(state, status) {
            state.isLoading = status;
        },
    },
    actions: {},
    modules: {},
});
