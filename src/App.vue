<template>
    <n-message-provider>
        <n-config-provider
            :theme-overrides="themeOverrides"
            :locale="zhCN"
            :date-locale="dateZhCN"
        >
            <n-dialog-provider>
                <div id="content">
                    <router-view class="router"></router-view>
                </div>
            </n-dialog-provider>
        </n-config-provider>
    </n-message-provider>
</template>
<script setup>
import { NConfigProvider, zhCN, dateZhCN, NDialogProvider } from 'naive-ui';
/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
    common: {
        primaryColor: '#f60',
        primaryColorHover: '#f60',
    },
    Button: {
        // textColor: '#fff',
    },
};
</script>

<style lang="scss">
#nprogress .bar {
    background: #753fe0 !important;
}
</style>
