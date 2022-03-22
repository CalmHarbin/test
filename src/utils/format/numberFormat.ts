import { isNull, isNaN, isNumber, isUndefined } from 'lodash'

type ConvertToNumberType = (
    baseValue: string | number | null | undefined,
    defaultValue: number | undefined
) => number | undefined

/**
 * 转换到数字类型
 * @param baseValue 原始值
 * @param defaultValue 不是数字的时候使用的默认值
 */
export const convertToNumber: ConvertToNumberType = (
    baseValue,
    defaultValue = undefined
) => {
    if (isNull(baseValue) || isNaN(baseValue) || isUndefined(baseValue))
        return defaultValue

    if (isNumber(+baseValue) && !isNaN(+baseValue)) return +baseValue

    return defaultValue
}
