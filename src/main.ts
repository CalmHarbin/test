import '@/assets/styles/normalize.css'
import '@/assets/styles/hack.css'
import '@/assets/styles/element/index.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import ElementZHCN from 'element-plus/lib/locale/lang/zh-cn'

import VueAMap from '@vuemap/vue-amap'

import '@vuemap/vue-amap/dist/style.css'
import Router from '@/router'
import Store from '@/store'

import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import App from '@/App.vue'

const app = createApp(App)

app.config.globalProperties.$layoutSize = import.meta.env.JOY_LAYOUT_SIZE
import '@vuemap/vue-amap/dist/style.css'

app.use(VueAMap)
// 部分引入 element plus ui
app.use(ElementPlus, { locale: ElementZHCN })

app.use(ContextMenu)
app.use(VueViewer)

app.use(Router).use(Store)

Router.isReady().then(() => {
    app.mount('#app')
})
