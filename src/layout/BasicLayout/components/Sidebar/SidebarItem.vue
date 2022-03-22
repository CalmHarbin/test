<template>
    <div
        v-if="!item.hidden && item.children && item.children.length"
        class="menu-wrapper"
    >
        <template
            v-if="
                hasOneShowingChild(item.children, item) &&
                (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                !item.alwaysShow
            "
        >
            <router-link :to="resolvePath(onlyOneChild.path)">
                <el-menu-item
                    :index="resolvePath(onlyOneChild.path)"
                    :class="{ 'submenu-title-noDropdown': !isNest }"
                >
                    <!-- v-if="onlyOneChild.meta.icon || item.meta.icon" -->
                    <el-icon>
                        <edit />
                    </el-icon>
                    <template v-if="onlyOneChild.meta.title" #title>
                        {{ onlyOneChild.meta.title }}
                    </template>
                </el-menu-item>
            </router-link>
        </template>

        <el-sub-menu
            v-else
            ref="submenu"
            :index="resolvePath(item.path)"
            popper-append-to-body
        >
            <!-- v-if="item.meta.icon" -->

            <template v-if="item.meta.title" #title>
                <el-icon>
                    <edit />
                </el-icon>
                {{ collapse ? '' : item.meta.title }}
            </template>

            <template v-for="child in item.children">
                <sidebar-item
                    v-if="
                        child.children &&
                        child.children.length > 0 &&
                        !child.hidden
                    "
                    :key="child.path"
                    :is-nest="true"
                    :item="child"
                    :base-path="resolvePath(child.path)"
                    class="nest-menu"
                />

                <router-link
                    v-else
                    :key="child.name"
                    :to="resolvePath(child.path)"
                >
                    <el-menu-item :index="resolvePath(child.path)">
                        <!-- v-if="child.meta.icon" -->
                        <el-icon>
                            <edit />
                        </el-icon>
                        <template v-if="child.meta.title" #title>
                            {{ child.meta.title }}
                        </template>
                    </el-menu-item>
                </router-link>
            </template>
        </el-sub-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import path from 'path'

export default defineComponent({
    name: 'SidebarItem',
    components: { Edit },
    props: {
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        },
        collapse: {
            type: Boolean,
            default: false
        }
    },
    setup(props: any) {
        const onlyOneChild = ref<any>({})

        const resolvePath = (routePath: any) => {
            return path.resolve(props.basePath, routePath)
        }

        const hasOneShowingChild = (children: any, parent: any) => {
            const showingChildren = children.filter((item: any) => {
                if (item.hidden) {
                    return false
                } else {
                    onlyOneChild.value = item
                    return true
                }
            })

            if (showingChildren.length === 1) {
                return true
            }

            if (showingChildren.length === 0) {
                onlyOneChild.value = {
                    ...parent,
                    path: '',
                    noShowingChildren: true
                }
                return true
            }

            return false
        }

        return {
            onlyOneChild,
            resolvePath,
            hasOneShowingChild
        }
    }
})
</script>
