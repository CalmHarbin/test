import { Module } from 'vuex'
import { JOY_LAYOUT_MENU_FOLD } from '@/constant'

interface LayoutStateType {
    // 菜单是否展开
    isMenuFold: boolean

    // 导航列表
    tabList: { title: string; path: string; name: string }[]
}

const dashboardTab = { path: '/dashboard', title: '首页', name: 'Dsashboard' }

const layoutStore: Module<LayoutStateType, any> = {
    namespaced: true,
    state: {
        isMenuFold: localStorage.getItem(JOY_LAYOUT_MENU_FOLD) === '1',
        tabList: [dashboardTab]
    } as LayoutStateType,
    mutations: {
        /**
         * 切换菜单的展开状态，当前状态会保存到用户的 localstroage 之中，用户登入登出不清除缓存
         * @param state 当前的状态
         * @param isMenuFold true 收起菜单 false 展开菜单
         */
        TOGGLE_MENU_FLOD: (state, isMenuFold) => {
            state.isMenuFold = isMenuFold

            localStorage.setItem(JOY_LAYOUT_MENU_FOLD, isMenuFold ? '1' : '0')
        },

        /**
         * 切换菜单的展开状态，当前状态会保存到用户的 localstroage 之中，用户登入登出不清除缓存
         * @param state 当前的状态
         * @param isMenuFold true 收起菜单 false 展开菜单
         */
        SET_TAB_VIEWS: (state, tabList) => {
            state.tabList = [...tabList]
        }
    },
    actions: {
        // 收起菜单
        setMenuFold({ commit }) {
            commit('TOGGLE_MENU_FLOD', true)
        },
        // 展开菜单
        setMenuUnFold({ commit }) {
            commit('TOGGLE_MENU_FLOD', false)
        },
        // 添加 tab 页签
        setNewTab({ commit, state }, newTab) {
            if (
                state.tabList.filter((n) => n.path === newTab.path).length <= 0
            ) {
                commit('SET_TAB_VIEWS', [...state.tabList, newTab])
            }
        },
        // 删除当前页签
        deleteTab({ commit, state }, tabPath) {
            const newTabList =
                state.tabList.filter((n) => n.path !== tabPath) ?? []

            commit('SET_TAB_VIEWS', [...newTabList])
        },
        // 删除当前左边的页签
        deleteLeftTab({ commit, state }, tabPath) {
            const currentIndex = state.tabList.findIndex(
                (n) => n.path === tabPath
            )

            commit('SET_TAB_VIEWS', [
                dashboardTab,
                ...state.tabList.slice(currentIndex)
            ])
        },
        // 删除当前右边的页签
        deleteRightTab({ commit, state }, tabPath) {
            const currentIndex = state.tabList.findIndex(
                (n) => n.path === tabPath
            )

            commit('SET_TAB_VIEWS', [
                ...state.tabList.slice(0, currentIndex + 1)
            ])
        },
        // 删除除了当前所有的页签
        deleteCurrentOutTab({ commit, state }, tabPath) {
            const currentTab = state.tabList.filter(
                (n) => n.path === tabPath
            )[0]

            commit('SET_TAB_VIEWS', [dashboardTab, currentTab])
        },
        // 删除所有页签
        deleteAllTab({ commit }) {
            commit('SET_TAB_VIEWS', [dashboardTab])
        }
    }
}

export default layoutStore
