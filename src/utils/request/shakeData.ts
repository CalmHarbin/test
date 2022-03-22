import { JOY_SHAKE_DATA_PREFIXES } from '@/constant'
import dayjs from 'dayjs'

const buildCacheKey = (params: Record<string, any>) => {
    return Object.keys(params)
        .sort()
        .map((n) => `${n}${JSON.stringify(params[n])}`)
        .join(',')
}

/**
 * 缓存请求数据，相同请求数据时进行缓存，默认缓存五分钟
 * @param params 请求时数据源
 * @param cacheData
 * @param expirationTimeStamp
 */
export const setShakeData = (
    params: Record<string, any>,
    cacheData?: Record<string, any>
) => {
    const shakeDataStr = localStorage.getItem(JOY_SHAKE_DATA_PREFIXES)
    const shakeData = shakeDataStr ? JSON.parse(shakeDataStr) : {}

    const cacheKey = buildCacheKey(params)
    const expirationTime = dayjs().unix() + 300

    shakeData[cacheKey] = {
        expirationTime,
        data: cacheData
    }

    localStorage.setItem(JOY_SHAKE_DATA_PREFIXES, JSON.stringify(shakeData))
}

export const getShakeData = (params: Record<string, any>) => {
    try {
        const shakeDataStr = localStorage.getItem(JOY_SHAKE_DATA_PREFIXES)
        const shakeData = shakeDataStr ? JSON.parse(shakeDataStr) : {}

        const cacheKey = buildCacheKey(params)
        let cacheData = shakeData[cacheKey]
        if (cacheKey) {
            const current = dayjs().unix()

            /**
             * 已经过期了
             */
            if (current - cacheData.expirationTime >= 300) {
                cacheData = undefined
            }
        }

        return cacheData?.data
    } catch (error) {
        return undefined
    }
}

export const clearShakeData = () => {
    localStorage.removeItem(JOY_SHAKE_DATA_PREFIXES)
}
