<template>
    <div>
        <div class="navbar-header">
            <div class="navbar-header-logo">
                <img style="height: 100%" src="/img/logo.png" />
            </div>
            <div v-if="!isMenuFold" class="navbar-header-title">
                <p class="navbar-header-title-content">
                    {{ title }}
                </p>
            </div>
        </div>
    </div>
    <el-scrollbar class="navbar-menu-container">
        <el-menu
            :show-timeout="200"
            :default-active="$route.path"
            :unique-opened="true"
            :collapse="isMenuFold"
            :collapse-transition="false"
            mode="vertical"
            background-color="#081e40"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            class="navbar-menu-container"
        >
            <sidebar-item
                v-for="route in userRoutes"
                :key="route.path"
                :collapse="isMenuFold"
                :item="route"
                :base-path="route.path"
            />
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import SidebarItem from './SidebarItem.vue'

export default defineComponent({
    name: 'SideBar',
    components: { SidebarItem },
    inheritAttrs: false,
    setup() {
        /**
         * 缓存中设置的用户菜单展开和收起
         */
        const store = useStore()
        const router = useRouter()

        const isMenuFold = computed(() => store.state.layout.isMenuFold)

        /**
         * 根据根目录白名单获取到当前用户注册的路由信息并且进行绑定
         */
        const userRoutes = computed(() => {
            return [
                ...router
                    .getRoutes()
                    .filter((n) => n.name === 'ExampleInstance'),
                ...store.state.account.navMenu
            ]
        })

        const title = import.meta.env.JOY_APPLICATION_TITLE

        return {
            title,
            isMenuFold,
            userRoutes
        }
    }
})
</script>

<style lang="scss" scoped>
.navbar-header {
    display: flex;
    align-items: center;
    justify-self: center;
    box-sizing: border-box;
    width: 100%;
    height: 68px;
    color: var(--el-color-primary-light-9);
    background-color: #081e40;
    border-bottom: 1px solid var(--el-text-color-regular);

    .navbar-header-logo {
        flex: 0;
        width: 68px;
        height: 68px;
    }

    .navbar-header-title {
        flex: 1;
        width: 100%;
        height: 68px;

        .navbar-header-title-content {
            display: inline-block;
            text-align: center;
            vertical-align: middle;
        }
    }
}

.navbar-menu-container {
    box-sizing: border-box;
    height: calc(100vh - 68px);
    border: none;
}
</style>
