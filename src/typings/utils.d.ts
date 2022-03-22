import { AxiosPromise, AxiosRequestConfig } from 'axios'

type ResponseType = {
    code: number
    success: boolean
    msg: string
    result: any
}

type RequestConfigType = AxiosRequestConfig & {
    apiName?: string
    isShake?: boolean
}

/**
 * 默认请求实例，纷享链所有项目请求都是 post 网关转发，不需要 get 封装
 * @param params { string | RequestConfigType } 类型为 string 时会用做 apiName，用作请求配置时会忽略之后参数
 * @param data { Record<string, any> } 请求数据，params 的类型为 string 时会作为请求数据
 * @param axiosOptions { boolean | AxiosRequestConfig } params 的类型为 string 时使用，boolean 类型时会作为 mock标识，
 *                                                      AxiosRequestConfig 为请求配置，需要更复杂的请求值简直直接使用 params 作为配置项
 */
type RequestUtilsType = (
    params: string | RequestConfigType,
    data?: Record<string, any> | undefined,
    axiosOptions?: boolean | AxiosRequestConfig<any> | undefined
) => Promise<ResponseType>
