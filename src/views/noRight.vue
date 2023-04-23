<template>
    <div class="no-right">
        <n-layout has-sider>
            <n-layout-sider
                bordered
                content-style="min-height:100vh;"
                width="250"
                collapse-mode="transform"
            >
                <div class="logoname">
                    <img src="@/assets/image/favicon.png" alt="" />
                    项目名称
                </div>
            </n-layout-sider>
            <n-layout-content style="background: #f3f3f4">
                <div class="no-role">
                    {{ '账号不存在或无权限,请联系管理员!' }}
                </div>
            </n-layout-content>
        </n-layout>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useMessage } from 'naive-ui';
// import
const message = useMessage();
</script>

<style lang="scss" scoped>
.no-right {
    .logoname {
        padding: 20px;
        font-weight: 800;
        img {
            width: 20px;
            position: relative;
            top: 3px;
            vertical-align: bottom;
            // height: 20px;
        }
    }

    .no-role {
        padding: 20px;
        margin-top: 10px;
        font-weight: 800;
    }
}
</style>
