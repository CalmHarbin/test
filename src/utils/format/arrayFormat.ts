import { isArray, isEmpty, toString } from 'lodash'

/**
 * 转换数据数组为接口需要接受的字符串类型
 * @param value 原始数据可能时数字或者字符串数组也可能为空值
 * @returns 转换给后台拼接的数据字符串
 */
export const arrayToCancatString = (
    value: string | string[] | number | number[] = ''
) => {
    if (isArray(value)) {
        return value
            .map((n) => toString(n))
            .filter((n) => !isEmpty(`${n || ''}`))
            .join(',')
    }

    return toString(value)
}
