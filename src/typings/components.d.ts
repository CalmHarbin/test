import { ElTableColumn } from 'element-plus'
import { RouteRecordRaw } from 'vue-router'

declare global {
    type RouteType = {
        hidden?: boolean
        alwaysShow?: boolean
        children?: RouteType[]
        meta?: {
            roles?: string[]
            title?: string
            icon?: string
            noCache?: boolean
        }
    } & RouteRecordRaw

    type FormType =
        /**
         * 普通文本类型
         */
        | 'text'
        /**
         * 整数类型，不显示小数，千分位显示
         */
        | 'number'
        /**
         * 浮点数类型，显示小数（小数位数查看全局配置），千分位显示
         */
        | 'decimal'
        /**
         * 日期类型，显示格式 YYYY-MM-DD
         */
        | 'date'
        /**
         * 日期区间类型，显示格式 YYYY-MM-DD
         */
        | 'dateRange'

        /**
         *
         */
        | 'monthrange'
        /**
         * 带时间类型日期，显示格式 YYYY-MM-DD HH:mm:ss
         */
        | 'dateTime'
        /**
         * 带时间类型区间日期，显示格式 YYYY-MM-DD HH:mm:ss
         */
        | 'dateTimeRange'
        /**
         * 数据字典，所有属性兼容 element-plus select
         */
        | 'dataChangeover'
        /**
         * 承运商下拉选择表格，所有属性兼容 joy-table-select
         */
        | 'carrierTableSelect'
        /**
         * 客户下拉选择表格，所有属性兼容 joy-table-select
         */
        | 'clientTableSelect'
        /**
         * 省市区下拉组件
         */
        | 'organizationCascader'
        /**
         * 人员下拉选择表格
         */
        | 'personalTableSelect'
        /**
         * 组织机构树选择
         */
        | 'oraganTreeSelect'

        /**
         *  审批科目
         */
        | 'subjectTreeSelect'
        /**
         * 组织机构树选择
         */
        | 'roleSelect'
        | 'tableSelect'
        | 'week'
        | 'month'
        | 'year'
        | 'template'

    type JoyFormColumnType = {
        formType?: FormType
        dataIndex?: string
        title?: string
        orderIndex?: number
        proxyDataIndex?: string
        /**
         * 自定义表单项
         */
        formSlot?: string

        /**
         * formItem 自定义项
         */
        searchSlot?: string
        /**
         * 扩展多余不提示类型作为组件的扩展属性，所有外部属性都会注入到组件之中
         * 组件在运行时需要注意控制台抛出的错误以及警告
         */
        expandProps?: Record<string, any>

        /**
         * 扩展事件，类型定义如上
         */
        expandEvents?: Record<string, any>
    }

    type OptionColumnType = {
        /**
         * 绑定字段
         */
        prop: string
        /**
         * 下拉表格显示的表头名称
         */
        label: string
    }

    type JoyColumnType = JoyFormColumnType & {
        formType?: FormType
        /**
         * 表格列宽度
         */
        width?: number
        /**
         * 表格列排序索引，用在 查询列表上面也会影响
         */
        orderIndex?: number
        /**
         * 0 表格表单都显示
         * 1 表单不显示，表格显示
         * 2 表单显示，表格不显示
         */
        showMod?: '0' | '1' | '2'

        /**
         * 是否显示表头查询列，自定义列，操作列默认不会显示
         */
        showHeaderSearch?: boolean

        fixed?: 'left' | 'right'
        /**
         * 自定义表格列
         */
        slot?: string
        /**
         * 列对齐方式
         */
        align?: 'left' | 'center' | 'right'

        readonly?: boolean

        layoutOption?: {
            span?: number
        }
    }

    type formSettingConfType = {
        initialShowRow?: number
        /**
         * 一行的列数
         */
        initialShowCol?: number
    }
}
