import AuthDirective from './directive/authDirective'
import { CustomNotification } from './message/'

import { arrayToCancatString, convertToNumber } from './format'
import { default as requestUtils } from './request'
import { trim } from 'lodash'
import { read, utils } from 'xlsx'

type FlatTreeDataSourceType = (
    dataSource: Record<string, any> | Record<string, any>[],
    childrenKey: string
) => Record<string, any>[]

/**
 * 平铺数据源
 * 注意当前函数在平铺数据源时会包含当前到父级信息
 * @param dataSource 数据源
 * @param childrenKey 子级字段
 * @returns
 */
const flatTreeDataSource: FlatTreeDataSourceType = (
    dataSource,
    childrenKey
) => {
    const flatDataSource = Array.isArray(dataSource)
        ? [...dataSource]
        : [dataSource]

    return flatDataSource.reduce<Record<string, any>[]>((arr, current) => {
        if(!current || current === null) return [...arr]

        if (current[childrenKey] && current[childrenKey] !== null) {
            return [
                ...arr,
                current,
                ...flatTreeDataSource(current[childrenKey], childrenKey)
            ]
        }

        return [...arr, current]
    }, [])
}

type fetchExcelDataType = (
    file: File,
    fieldMapping?: Record<string, string>,
    fieldOptions?: (
        fieldRecord: Record<string, any>,
        index: number
    ) => Record<string, string>
) => Promise<Record<string, string>[]>

/**
 * 导入Excel
 * @param file
 * @param fieldMap
 * @param jObject
 */
const fetchExcelData: fetchExcelDataType = (
    file,
    fieldMapping,
    fieldOptions
) => {
    return new Promise<any>((resolve) => {
        if (file === undefined) {
            throw new Error('没有要上传的文件')
        }
        const fileReader = new FileReader()
        fileReader.onload = (e: any) => {
            const wb = read(e.target?.result, {
                type: 'binary',
                cellDates: true
            })
            const jArray = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

            if (fieldMapping) {
                const dataSource = jArray.reduce(
                    (arr: any[], cur: any, index: number) => {
                        const obj: any = {}
                        Object.keys(cur).forEach((item: string) => {
                            obj[fieldMapping[item]] = cur[trim(item)]
                        })
                        if (typeof fieldOptions === 'function') {
                            arr.push(fieldOptions(obj, index))
                        } else {
                            arr.push(obj)
                        }
                        return arr
                    },
                    []
                )
                resolve(dataSource)
            } else {
                resolve(jArray)
            }
        }

        fileReader.onerror = () => {
            throw new Error('Blob文件转换错误')
        }

        fileReader.readAsBinaryString(file)
    })
}

export {
    AuthDirective,
    fetchExcelData,
    requestUtils,
    arrayToCancatString,
    convertToNumber,
    flatTreeDataSource,
    CustomNotification
}
