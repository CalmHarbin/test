import { Store } from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from '@/router'
import { buildMenuRoute, buildNavMenu, flatChildrenBtnAuth } from './utils'

/**
 * 不需要登录就可以进入的页面的路由 name
 */
const whiteList: string[] = ['/login']

export default async (store: Store<any>) => {
    router.beforeEach((to, from, next) => {
        NProgress.start()

        /**
         * 当前账号已经登陆时，跳转到首页
         */
        if (store.state.account.token) {
            if (!store.state.account.cacheSate) {
                buildMenuRoute(
                    store.state.account.accountInfo.menuTree
                ).forEach((n) => {
                    router.addRoute(n)
                })
                store.commit(
                    'account/SET_NAV_MENU',
                    buildNavMenu(store.state.account.accountInfo.menuTree)
                )

                store.commit(
                    'account/SET_AUTH_BTN',
                    flatChildrenBtnAuth(
                        store.state.account.accountInfo.menuTree
                    )
                )

                next({ ...to, replace: true })
                return
            }
            if (to.path === '/login') {
                next({ path: '/' })
                NProgress.done()
            } else {
                next()
            }
        } else {
            if (whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                next(`/login?redirect=${to.path}`)
            }
        }
    })

    router.afterEach(() => {
        NProgress.done()
    })
}
