<template>
    <section class="app-main">
        <router-view v-slot="{ Component }">
            <keep-alive :include="cachedTabs">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </section>
</template>

<script lang="tsx">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    setup() {
        const store = useStore()

        const cachedTabs: any = computed(() => {
            const tabList = store.state.layout.tabList as any[]

            return tabList.reduce((arr, { name }) => {
                return [...arr, name]
            }, [])
        })

        return {
            cachedTabs
        }
    }
})
</script>

<style lang="scss" scoped>
.app-main {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f2f6fc;
    transform: scale(1);

    :deep(.el-form-item) {
        margin-bottom: 12px;
    }
    :deep(.el-form-item__error) {
        padding-top: 0px;
    }

    // 表单输入 hack 宽度设置
    :deep(.el-input) {
        width: 100% !important;
    }

    // 表单输入数字 hack 宽度设置，同时设置显示时的对齐
    :deep(.el-input-number) {
        width: 100% !important;

        /* stylelint-disable-next-line selector-class-pattern */
        .el-input__inner {
            text-align: left;
        }
    }

    // 表单输入自定义封装的选择框 hack 宽度设置
    :deep(.el-select) {
        width: 100% !important;
    }

    :deep(.el-date-editor) {
        width: 100% !important;
    }

    :deep(.el-cascader) {
        width: 100% !important;
    }

    /* stylelint-disable-next-line selector-class-pattern */
    :deep(.el-form-item.is-required .el-form-item__label) {
        color: var(--el-color-danger) !important;
    }
}
</style>
