import { Module } from 'vuex'

import { requestUtils } from '@/utils'
import {
    JOY_LAYOUT_ACCOUNT_INFO,
    JOY_LAYOUT_ACCOUNT_TOKEN,
    JOY_LAYOUT_ACCOUNT_SITEID
} from '@/constant'

type AccountStateType = {
    accountInfo: Record<string, any>
    token: string
    siteId: number
    cacheSate: boolean
    navMenu: RouteType[]
    authButtonList: any
}

const accountStore: Module<AccountStateType, any> = {
    namespaced: true,
    state: {
        accountInfo: JSON.parse(
            sessionStorage.getItem(JOY_LAYOUT_ACCOUNT_INFO) || '{}'
        ),
        token: sessionStorage.getItem(JOY_LAYOUT_ACCOUNT_TOKEN) || '',
        siteId: sessionStorage.getItem(JOY_LAYOUT_ACCOUNT_SITEID)
            ? JSON.parse(
                  sessionStorage.getItem(JOY_LAYOUT_ACCOUNT_SITEID) || ''
              )
            : '',
        cacheSate: false,
        navMenu: [],
        authButtonList: []
    } as AccountStateType,

    mutations: {
        /**
         * 设置用户信息到状态，同时保存到 session
         * @param state 原始状态
         * @param accountInfo 用户信息
         */
        SET_ACCOUT_INFO: (
            state: AccountStateType,
            accountInfo: Record<string, any>
        ) => {
            state.accountInfo = accountInfo

            sessionStorage.setItem(
                JOY_LAYOUT_ACCOUNT_INFO,
                JSON.stringify(state.accountInfo || {})
            )
        },
        /**
         * 设置用户 token 到缓存，同时保存到 session
         * @param state 原始状态
         * @param token 用户 token
         */
        SET_ACCOUT_TOKEN: (state: AccountStateType, token: string) => {
            state.token = token
            sessionStorage.setItem(JOY_LAYOUT_ACCOUNT_TOKEN, token)
        },
        SET_SITE_ID: (state: AccountStateType, siteId: number) => {
            state.siteId = siteId
            sessionStorage.setItem(JOY_LAYOUT_ACCOUNT_SITEID, `${siteId || ''}`)
        },
        SET_NAV_MENU: (state: AccountStateType, menuTree: RouteType[]) => {
            state.navMenu = menuTree
            state.cacheSate = true
        },
        SET_AUTH_BTN: (state: AccountStateType, btnChildren: any[]) => {
            state.authButtonList = btnChildren.map((n) => n.menuCode)
        }
    },
    actions: {
        SetAccountSiteID({ commit }, siteId: any) {
            return new Promise((resolve, reject) => {
                requestUtils('joy.mdm.crm.accountService.siteSwitch', {
                    siteId: siteId
                })
                    .then((res: any) => {
                        commit('SET_SITE_ID', siteId)

                        resolve(res)
                    })
                    .catch((error: any) => {
                        reject(error)
                    })
            })
        },
        AccountLogin({ commit }, params: any) {
            return new Promise((resolve, reject) => {
                requestUtils('joy.sso.log.loginService.login', params)
                    .then((res: any) => {
                        commit('SET_ACCOUT_INFO', res.result.auth)
                        commit('SET_ACCOUT_TOKEN', res.result.token)

                        resolve(res)
                    })
                    .catch((error: any) => {
                        reject(error)
                    })
            })
        },

        // 获取用户信息
        GetAccountInfo({ commit, state }) {
            const token = state.token || sessionStorage.getItem('token')
            return new Promise((resolve, reject) => {
                requestUtils('joy.sso.log.loginService.getUser', { token })
                    .then((res: any) => {
                        commit('SET_ACCOUT_INFO', res.result.auth)
                        commit('SET_ACCOUT_TOKEN', res.result.token)

                        resolve(res)
                    })
                    .catch((error: any) => {
                        reject(error)
                    })
            })
        },
        // 后台登出
        AccountLoginOut({ state }) {
            return new Promise((resolve) => {
                // 请求后台清除对应缓存
                requestUtils('joy.sso.log.loginService.logout', {
                    token: state.token
                })
                    .then((res: any) => {
                        sessionStorage.clear()
                        localStorage.clear()

                        location.href = '/login'
                        resolve(res.data)
                    })
                    .catch((error: any) => {
                        resolve(error)
                    })
            })
        }
    }
}

export default accountStore
