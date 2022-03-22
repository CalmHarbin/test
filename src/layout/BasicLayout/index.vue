<template>
    <el-container class="wrapper-container">
        <el-aside
            :width="menuWidthStyle"
            style="background-color: rgb(238 241 246)"
        >
            <sidebar class="sidebar-container" />
        </el-aside>
        <el-container class="main-container">
            <el-header style="height: 36px; padding: 0 8px !important">
                <navbar />
            </el-header>
            <el-container>
                <el-header style="height: 32px; margin: 0; padding: 0">
                    <tags-view />
                </el-header>
                <el-container style="height: calc(100vh - 85px)">
                    <app-main />
                </el-container>
            </el-container>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { Navbar, Sidebar, AppMain, TagsView } from './components'

export default defineComponent({
    name: 'BasicLayout',
    components: {
        Navbar,
        Sidebar,
        AppMain,
        TagsView
    },
    setup() {
        const store = useStore()

        const menuWidthStyle = computed(() =>
            store.state.layout.isMenuFold
                ? '64px'
                : `${import.meta.env.JOY_LAYOUT_MENU_WIDTH}px`
        )

        return {
            menuWidthStyle
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
