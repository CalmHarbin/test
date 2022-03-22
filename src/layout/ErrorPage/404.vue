<template>
    <div class="wscn-http404-container">
        <div class="wscn-http404">
            <div class="pic-404">
                <img
                    class="pic-404__parent"
                    src="@/assets/imgs/404_images/404.png"
                    alt="404"
                />
                <img
                    class="pic-404__child left"
                    src="@/assets/imgs/404_images/404_cloud.png"
                    alt="404"
                />
                <img
                    class="pic-404__child mid"
                    src="@/assets/imgs/404_images/404_cloud.png"
                    alt="404"
                />
                <img
                    class="pic-404__child right"
                    src="@/assets/imgs/404_images/404_cloud.png"
                    alt="404"
                />
            </div>
            <div class="bullshit">
                <div class="bullshit__oops">OOPS!</div>
                <!-- <div class="bullshit__info">
                    版权所有
                    <a
                        class="link-type"
                        href="https://wallstreetcn.com"
                        target="_blank"
                        >华尔街见闻</a
                    >
                </div> -->
                <div class="bullshit__headline">{{ message }}</div>
                <div class="bullshit__info">
                    请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告
                </div>
                <router-link to="/" class="bullshit__return-home"
                    >返回首页</router-link
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'PageNotFound',
    setup() {
        return {
            message: '网管说这个页面飞到火星了......'
        }
    }
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.wscn-http404 {
    position: relative;
    width: 1200px;
    padding: 0 50px;
    overflow: hidden;

    .pic-404 {
        position: relative;
        float: left;
        width: 600px;
        overflow: hidden;

        &__parent {
            width: 100%;
        }

        &__child {
            position: absolute;

            &.left {
                top: 17px;
                left: 220px;
                width: 80px;
                opacity: 0;
                animation-name: cloud-left;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-delay: 1s;
                animation-fill-mode: forwards;
            }

            &.mid {
                top: 10px;
                left: 420px;
                width: 46px;
                opacity: 0;
                animation-name: cloud-mid;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-delay: 1.2s;
                animation-fill-mode: forwards;
            }

            &.right {
                top: 100px;
                left: 500px;
                width: 62px;
                opacity: 0;
                animation-name: cloud-right;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-delay: 1s;
                animation-fill-mode: forwards;
            }
            @keyframes cloud-left {
                0% {
                    top: 17px;
                    left: 220px;
                    opacity: 0;
                }

                20% {
                    top: 33px;
                    left: 188px;
                    opacity: 1;
                }

                80% {
                    top: 81px;
                    left: 92px;
                    opacity: 1;
                }

                100% {
                    top: 97px;
                    left: 60px;
                    opacity: 0;
                }
            }
            @keyframes cloud-mid {
                0% {
                    top: 10px;
                    left: 420px;
                    opacity: 0;
                }

                20% {
                    top: 40px;
                    left: 360px;
                    opacity: 1;
                }

                70% {
                    top: 130px;
                    left: 180px;
                    opacity: 1;
                }

                100% {
                    top: 160px;
                    left: 120px;
                    opacity: 0;
                }
            }
            @keyframes cloud-right {
                0% {
                    top: 100px;
                    left: 500px;
                    opacity: 0;
                }

                20% {
                    top: 120px;
                    left: 460px;
                    opacity: 1;
                }

                80% {
                    top: 180px;
                    left: 340px;
                    opacity: 1;
                }

                100% {
                    top: 200px;
                    left: 300px;
                    opacity: 0;
                }
            }
        }
    }

    .bullshit {
        position: relative;
        float: left;
        width: 300px;
        padding: 30px 0;
        overflow: hidden;

        &__oops {
            margin-bottom: 20px;
            color: #1482f0;
            font-weight: bold;
            font-size: 32px;
            line-height: 40px;
            opacity: 0;
            animation-name: slide-up;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }

        &__headline {
            margin-bottom: 10px;
            color: #222;
            font-weight: bold;
            font-size: 20px;
            line-height: 24px;
            opacity: 0;
            animation-name: slide-up;
            animation-duration: 0.5s;
            animation-delay: 0.1s;
            animation-fill-mode: forwards;
        }

        &__info {
            margin-bottom: 30px;
            color: grey;
            font-size: 13px;
            line-height: 21px;
            opacity: 0;
            animation-name: slide-up;
            animation-duration: 0.5s;
            animation-delay: 0.2s;
            animation-fill-mode: forwards;
        }

        &__return-home {
            display: block;
            float: left;
            width: 110px;
            height: 36px;
            color: #fff;
            font-size: 14px;
            line-height: 36px;
            text-align: center;
            background: #1482f0;
            border-radius: 100px;
            cursor: pointer;
            opacity: 0;
            animation-name: slide-up;
            animation-duration: 0.5s;
            animation-delay: 0.3s;
            animation-fill-mode: forwards;
        }
        @keyframes slide-up {
            0% {
                transform: translateY(60px);
                opacity: 0;
            }

            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
    }
}
</style>
