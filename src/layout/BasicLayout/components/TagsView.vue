<template>
    <div class="tags-view-container">
        <scroll-pane class="tags-view-wrapper">
            <router-link
                v-for="tab in tabList"
                :key="tab.path"
                ref="tag"
                :class="handleIsActive(tab.path) ? 'active' : ''"
                :to="{
                    path: tab.path,
                    query: tab.query,
                    fullPath: tab.fullPath
                }"
                class="tags-view-item"
            >
                {{ tab.title }}
                <el-icon
                    v-if="tab.path !== '/dashboard'"
                    style="
                        font-size: 14px;
                        vertical-align: top;
                        margin-top: 4px;
                    "
                    @click.prevent.stop="handleTabClose(tab.path)"
                >
                    <icon-close />
                </el-icon>
            </router-link>
        </scroll-pane>
        <div class="tags-view-operation">
            <el-dropdown
                placement="bottom-end"
                :size="$layoutSize"
                @command="handleTabsCommand"
            >
                <el-button :size="$layoutSize" type="text">
                    页签操作
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="closeAll">
                            <div style="width: 130px">
                                <el-icon><icon-close /></el-icon>关闭 所有 页签
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item command="closeLeftAll" divided>
                            <div style="width: 130px">
                                <el-icon><icon-close /></el-icon>关闭 左侧 页签
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item command="closeRightAll">
                            <div style="width: 130px">
                                <el-icon> <icon-close /> </el-icon>关闭 右侧
                                页签
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item command="closeCurrentOutAll">
                            <div style="width: 130px">
                                <el-icon><icon-close /></el-icon>关闭 当前以外
                                页签
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="tsx">
import { computed, defineComponent, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { Close as IconClose } from '@element-plus/icons-vue'

export default defineComponent({
    components: { IconClose },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()

        const tabList = computed(() => store.state.layout.tabList as any[])

        const handleIsActive = (path: string) => path === route.path
        const handleSetNewTab = () => {
            store.dispatch('layout/setNewTab', {
                path: route.path,
                title: route.meta.title,
                name: route.name
            })
        }
        const handleTabClose = (path: string) => {
            const currentIndex = tabList.value.findIndex((n) => n.path === path)

            // 关闭的是当前路由才需要重定向
            if (path === route.path) {
                router.push(tabList.value[currentIndex - 1].path)
            }

            store.dispatch('layout/deleteTab', path)
        }

        watch(() => route.path, handleSetNewTab)

        onMounted(() => handleSetNewTab())

        const handleTabsCommand = (command: string) => {
            switch (command) {
                case 'closeAll':
                    store.dispatch('layout/deleteAllTab')

                    router.push({ name: 'Dashboard' })
                    break
                case 'closeLeftAll':
                    store.dispatch('layout/deleteLeftTab', route.path)
                    break
                case 'closeRightAll':
                    store.dispatch('layout/deleteRightTab', route.path)
                    break
                case 'closeCurrentOutAll':
                    store.dispatch('layout/deleteCurrentOutTab', route.path)
                    break

                default:
                    break
            }
        }

        return {
            tabList,

            handleTabClose,
            handleIsActive,
            handleTabsCommand
        }
    }
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #fff;
    border: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);

    .tags-view-wrapper {
        white-space: nowrap;
        flex: 1;

        margin-top: 4px;

        .tags-view-item {
            box-sizing: border-box;
            height: 24px;
            margin-left: 8px;
            padding: 2px 6px;
            color: #495060;
            font-size: 12px;
            line-height: 24px;
            vertical-align: top;
            background: #fff;
            border: 1px solid #d8dce5;
            border-radius: calc(var(--el-border-radius-base) - 1px);
            cursor: pointer;

            &.active {
                color: #fff;
                background-color: var(--el-color-primary);
                border-color: var(--el-color-primary);

                &::before {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    margin-right: 2px;
                    background: #fff;
                    border-radius: 50%;
                    content: '';
                }
            }
        }
    }

    .tags-view-operation {
        flex: 0;
        box-sizing: border-box;
        height: 24px;
        padding: 0 16px;
        color: #495060;
        font-size: 12px;
        line-height: 24px;
    }
}
</style>
