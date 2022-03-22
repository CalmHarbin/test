<template>
    <div class="err-page-container">
        <el-button icon="arrow-left" class="pan-back-btn" @click="back"
            >返回</el-button
        >
        <el-row>
            <el-col :span="12">
                <h1 class="text-jumbo text-ginormous">Oops!</h1>
                <h2>你没有权限访问该页面</h2>
                <h6>如有不满请联系你领导</h6>
                <ul class="list-unstyled">
                    <li>或者你可以去:</li>
                    <li class="link-type">
                        <router-link to="/dashboard">回首页</router-link>
                    </li>
                    <li class="link-type">
                        <a href="https://www.taobao.com/">随便看看</a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="dialogVisible = true">
                            点我看图
                        </a>
                    </li>
                </ul>
            </el-col>
            <el-col :span="12">
                <img
                    :src="errGif"
                    width="313"
                    height="428"
                    alt="Girl has dropped her ice cream."
                />
            </el-col>
        </el-row>
        <el-dialog v-model:visible="dialogVisible" title="随便看">
            <img :src="ewizardClap" class="pan-img" />
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { defineComponent } from 'vue'
import errGifUri from '@/assets/imgs/401_images/401.gif'
import { ref } from 'vue'
export default defineComponent({
    name: 'PageNoAuth',
    setup() {
        const route = useRoute()
        const router = useRouter()

        const errGif = ref(`${errGifUri}?${+new Date()}`)

        const back = () => {
            if (route.query.noGoBack) {
                router.push({ path: '/dashboard' })
            } else {
                router.go(-1)
            }
        }

        return {
            errGif,
            back,
            ewizardClap:
                'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
            dialogVisible: false
        }
    }
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.err-page-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;

    .pan-back-btn {
        color: #fff;
        background: #008489;
        border: none !important;
    }

    .pan-gif {
        display: block;
        margin: 0 auto;
    }

    .pan-img {
        display: block;
        width: 100%;
        margin: 0 auto;
    }

    .text-jumbo {
        color: #484848;
        font-weight: 700;
        font-size: 60px;
    }

    .list-unstyled {
        font-size: 14px;

        li {
            padding-bottom: 5px;
        }

        a {
            color: #008489;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
