import axios, { AxiosRequestConfig } from 'axios'

import {
    RequestConfigType,
    RequestUtilsType,
    ResponseType
} from '@/typings/utils'

import { CustomNotification } from '@/utils'

import {
    GateWayRouteMap,
    GateWaySSO,
    JOY_LAYOUT_ACCOUNT_TOKEN
} from '@/constant'

import { getShakeData, setShakeData } from './shakeData'

const instance = axios.create({
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

let noticeInstance: any = undefined

// request interceptor
instance.interceptors.request.use(
    (config: RequestConfigType) => {
        /**
         * 全局配置是否需要 Mock
         */
        const { apiName = '', data = {} } = config

        /**
         * 根据接口名称判断调用接口路由，当接口名称不规范时需要自己指定路由
         * data 之后包含两个个 hack 字段
         * GATEWAYROUTE 网关路由
         * GATEWAYVERSION 网关版本号
         *
         * {
         *     'GATEWAYROUTE': GateWayMDMCRM,
         *     'GATEWAYVERSION': '1.2'
         *     ...data
         * }
         *
         */

        const { GATEWAYROUTE, GATEWAYVERSION, ...restBodyData } = data
        config.data = { ...restBodyData }

        /**
         * 设置网关路由
         */
        let gateWayRoute = GateWaySSO
        if (GATEWAYROUTE) {
            gateWayRoute = GATEWAYROUTE
        } else {
            const apiRoutePri = apiName.split('.')[1] as
                | 'oa'
                | 'otms'
                | 'wms'
                | 'qa'
                | 'bms'
                | 'mdm'
                | 'api'
                | 'sso'

            if (apiRoutePri) {
                gateWayRoute = GateWayRouteMap[apiRoutePri]
            }
        }
        let gateWayVersion = undefined
        if (import.meta.env.JOY_GATEWAY_VERSION) {
            gateWayVersion = import.meta.env.JOY_GATEWAY_VERSION
        }
        if (GATEWAYVERSION) {
            gateWayVersion = GATEWAYVERSION
        }

        config.url += `${gateWayRoute}?api=${apiName}${
            gateWayVersion ? `&v=${gateWayVersion}` : ''
        }`

        /**
         * token 不需要从 store 取值，session 失效时需要保证 store 也被清空
         */
        const token = sessionStorage.getItem(JOY_LAYOUT_ACCOUNT_TOKEN) || ''

        if (!config.headers) config.headers = {}
        config.headers['Authorization'] = token

        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

instance.interceptors.response.use((response) => {
    const res: ResponseType = response.data
    if (res.success) return response

    switch (res.code) {
        case 301:
            CustomNotification.error({
                title: '服务调用错误！',
                message: '请查看服务连接，查看服务可用状态！'
            })
            break
        case 500:
            CustomNotification.error({
                title: '服务错误！',
                message: res.msg
            })
            break
        case 799:
            if (noticeInstance) {
                return undefined
            }

            noticeInstance = CustomNotification.warning({
                title: '登陆过期！',
                message: '用户登录信息已失效，请重新登录！'
            })

            setTimeout(() => {
                sessionStorage.clear()
                location.href = '/login'
            }, 3000)
    }

    return Promise.reject(response)
})

const request: RequestUtilsType = (
    params: string | RequestConfigType,
    data?: Record<string, any>,
    shakeOption: boolean | AxiosRequestConfig = false
) =>
    new Promise<ResponseType>((resolve, reject) => {
        try {
            let requestOptions: RequestConfigType = {}
            if (typeof params === 'string') {
                requestOptions = {
                    url: import.meta.env.JOY_APPLICATION_REQUEST_URI,
                    method: 'post',
                    apiName: params,
                    data
                }
                if (typeof shakeOption === 'boolean') {
                    requestOptions.isShake = shakeOption
                } else {
                    requestOptions = { ...requestOptions, ...shakeOption }
                }
            } else {
                requestOptions = { ...params }
            }

            if (requestOptions.isShake) {
                const shakeData = getShakeData(requestOptions)

                if (shakeData) {
                    resolve(shakeData)
                    return
                }
            }

            instance(requestOptions)
                .then((response) => {
                    if (requestOptions.isShake && response) {
                        setShakeData(requestOptions, response.data)
                    }
                    resolve(response.data)
                })
                .catch((response) => {
                    reject(response.data)
                })
        } catch (error) {
            reject(error)
        }
    })

export default request
