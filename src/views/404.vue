<template>
    <div class="container">
        <div class="container-box">
            <div class="no-content">
                <span class="box-content">404</span><br />
                <span class="notFoundOne">对不起</span>
                <div class="no-content-one">
                    <span class="notFoundTwo">该页面不存在</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        #f3f3f3 0%,
        #f3f3f3 50%,
        white 50.01%,
        white 100%
    );
    display: flex;
    justify-content: center;
    align-items: center;
}
.container-box {
    width: 800px;
    height: 500px;
    background-color: white;
    box-shadow: 10px 10px 10px 5px #ebebeb, -10px -10px 10px 5px#ebebeb,
        10px -10px 10px 5px#ebebeb, -10px 10px 10px 5px#ebebeb;
    display: flex;
    justify-content: center;
}
.no-content {
    margin-top: 20px;
}
.box-content {
    color: rgba(255, 157, 0, 0.867);
    font-size: 200px;
    text-shadow: 4px 4px 0px rgba(255, 183, 68, 0.867);
    display: flex;
    justify-content: center;
}
.no-content-one {
    margin-top: 20px;
}
.notFoundOne {
    font-size: 80px;
    display: flex;
    justify-content: center;
}
.notFoundTwo {
    font-size: 60px;
    display: flex;
    justify-content: center;
}
</style>
