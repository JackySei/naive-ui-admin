<template>
    <div class="both-container">
        <div class="banner-container">
            <img src="@/assets/image/banner.gif" alt="login_banner" />
        </div>
        <div class="action-container">
            <p class="action-title">选择登录方式</p>
            <button class="disabled-btn" @click="loginOA">OA账号登录</button>
            <button class="disabled-btn" @click="loginSms">
                手机验证码登录
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref, unref, getCurrentInstance, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import login from '@/services/module/login.js';
const router = useRouter();
const { proxy } = getCurrentInstance();
const serviceId = ref();
// 获取serviceId
function getServiceId() {
    proxy.$http
        .get('/eoap/auth/service/id')
        .then((res) => {
            serviceId.value = res.data.data;
        })
        .catch(() => {});
}
onMounted(() => {
    getServiceId();
});

function loginOA() {
    window.location.href = login.loginByOa(serviceId.value);
}
function loginSms() {
    window.location.href = login.loginBySms(serviceId.value);
}
</script>
<style lang="scss" scoped>
.banner-container {
    // background-color: #f3f3f4;
    // height: 100vh;

    img {
        width: 100%;
    }
}

.action-container {
    width: 500px;
    margin: 0 auto;
    text-align: center;

    .action-title {
        font-size: 26px;
        margin: 40px 0;
    }

    button {
        margin-bottom: 20px;
        width: 100%;
        height: 48px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        background-color: #f60;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            opacity: 0.8;
        }
    }
}
</style>
