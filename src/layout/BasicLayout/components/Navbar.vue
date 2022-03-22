<template>
    <div class="navbar">
        <el-button
            :size="$layoutSize"
            :icon="isMenuFold ? Expand : Fold"
            @click="handleToggleMenuFold"
        >
            {{ !isMenuFold ? '收起' : '展开' }}
        </el-button>
        <div class="right-menu">
            <el-space>
                <el-select
                    :model-value="siteId"
                    size="small"
                    placeholder="请选择切换站点"
                    @change="handleChangeSite"
                >
                    <el-option
                        v-for="singleSite in siteDataList"
                        :key="singleSite.id"
                        size="small"
                        :value="singleSite.id"
                        :label="singleSite.companyName"
                    />
                </el-select>
                <screen-full />
                <el-dropdown
                    :size="$layoutSize"
                    trigger="click"
                    placement="bottom-end"
                    @command="handleClick"
                >
                    <el-link
                        type="primary"
                        :underline="false"
                        class="drop-hover-link"
                    >
                        {{ userName }}
                    </el-link>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="clearShakeData">
                                <el-button
                                    :icon="Failed"
                                    type="text"
                                    :size="$layoutSize"
                                >
                                    清除缓存
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item command="accountLoginOut">
                                <el-button
                                    :icon="Ship"
                                    type="text"
                                    :size="$layoutSize"
                                >
                                    退出登录
                                </el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-space>
        </div>
    </div>
</template>

<script lang="tsx">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { mapGetters, useStore } from 'vuex'

import { Expand, Fold, Ship, Failed } from '@element-plus/icons-vue'
import { clearShakeData } from '@/utils/request/shakeData'

export default defineComponent({
    name: 'NavBar',
    setup() {
        const store = useStore()
        const siteDataList = ref(
            store.getters.accountInfo.accountSiteList ?? []
        )
        const isMenuFold = computed(() => store.state.layout.isMenuFold)

        onMounted(() => {
            store.dispatch('account/SetAccountSiteID', siteDataList.value[0].id)
        })

        const handleToggleMenuFold = () => {
            if (isMenuFold.value) {
                store.dispatch('layout/setMenuUnFold')
            } else {
                store.dispatch('layout/setMenuFold')
            }
        }

        const siteId = computed(() => store.getters.siteId)

        return {
            userName: store.getters.accountInfo.accountName,
            isMenuFold,
            handleToggleMenuFold,
            siteDataList,
            Expand,
            siteId,
            Fold,
            Ship,
            Failed
        }
    },
    data() {
        return {
            dataForm: {
                id: '',
                name: '',
                oldPassword: '',
                newPassword: '',
                tenantId: '',
                checkPass: ''
            },
            msgText: 0,
            backgroundone: '#eee',
            backgroundtwo: '#eee',
            backgroundthree: '#eee',
            btnLoading: false,
            dialogFormVisible: false,
            passwordType2: 'password'
        }
    },
    computed: {
        ...mapGetters(['name', 'avatar', 'userInfo'])
    },
    methods: {
        accountLoginOut() {
            this.$store.dispatch('account/AccountLoginOut')
        },
        handleClick(command: string) {
            if (command === 'accountLoginOut') {
                this.accountLoginOut()
            } else if (command === 'clearShakeData') {
                clearShakeData()
            }
        },
        handleChangeSite(value: any) {
            if (value) {
                this.$store
                    .dispatch('account/SetAccountSiteID', value)
                    .then(() => {
                        this.$notify.success(
                            '切换站点成功，当前操作会关闭当前所有页签以及清除相关的缓存数据。'
                        )

                        this.$router.push({ name: 'Dashboard' })
                        this.$store.dispatch('layout/deleteAllTab')
                    })
                    .catch(() => {
                        this.$notify.error('切换站点失败，请重试。')
                    })
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.navbar {
    height: 100%;
    line-height: 36px;
    border-radius: 0 !important;

    .right-menu {
        float: right;
        height: calc(100% - 12px);
        padding: 6px;

        &:focus {
            outline: none;
        }
    }
}

.drop-hover-link {
    vertical-align: text-top;
}
</style>
