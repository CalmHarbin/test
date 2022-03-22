import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { Notify } from 'element-plus'

import { RequestUtilsType } from './utils'

declare module 'vue' {
    interface ComponentCustomProperties {
        $store: Store<any>
        $request: RequestUtilsType
        $notify: Notify
        $alert: (
            message: string,
            title?: string | any,
            options?: any
        ) => Promise<any>
        $confirm: (
            message: string,
            title?: string | any,
            options?: any
        ) => Promise<any>
        $prompt: (
            message: string,
            title?: string | any,
            options?: any
        ) => Promise<any>
        $layoutSize: string
    }
}
