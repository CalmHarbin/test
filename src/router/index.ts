import { createRouter, createWebHistory } from 'vue-router'

/**
 * 示例路由直接全部进行注入，不需要权限配置
 */
const exampleViewRoute: any = {
    path: '/ExampleInstance',
    name: 'ExampleInstance',
    component: () => import('@/layout/BasicLayout/index.vue'),
    meta: { title: '组件示例' },
    children: []
}
const baseAsyncComponents = import.meta.globEager(
    '../views/ExampleViews/**/index.vue'
)
const baseComponents = import.meta.glob('../views/ExampleViews/**/index.vue')
Object.keys(baseAsyncComponents).forEach((componentKey) => {
    const componentFile = baseAsyncComponents[componentKey].default

    if (componentFile.isRoute) {
        exampleViewRoute.children.push({
            path: componentFile.name as string,
            component: baseComponents[componentKey],
            name: componentFile.name,
            meta: { ...componentFile.routeMeta }
        })
    }
})

const routes: RouteType[] = [
    {
        path: '/',
        component: () => import('@/layout/BasicLayout/index.vue'),
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/Dashboard/index.vue'),
                name: 'Dashboard',
                meta: { title: '首页', icon: 'dashboard', isKeepAlive: true }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/layout/LoginLayout/index.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/layout/ErrorPage/404.vue'),
        hidden: true
    },
    {
        path: '/401',
        name: '401',
        component: () => import('@/layout/ErrorPage/401.vue'),
        hidden: true
    },
    exampleViewRoute
]

export default createRouter({
    routes,
    history: createWebHistory()
})
