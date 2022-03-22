/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'path'
interface ImportMetaEnv extends Readonly<Record<string, string>> {
    /**
     * 应用标题
     */
    readonly JOY_APPLICATION_TITLE: string

    /**
     * 系统组件大小
     */
    readonly JOY_LAYOUT_SIZE: 'medium' | 'small' | 'mini'

    /**
     * 网关请求地址
     */
    readonly JOY_APPLICATION_REQUEST_URI: string

    /**
     * 文件上传地址
     */
    readonly JOY_APPLICATION_FILEUPLOAD_URI: string

    /**
     * 开发跳过登录，同时会跳过权限验证，请求头不会附带 Token
     */
    readonly JOY_AUTH_JUMP_LOGIN: string
    /**
     * 请求网关的版本号
     */
    readonly JOY_GATEWAY_VERSION: string

    /**
     * 菜单布局宽度
     */
    readonly JOY_LAYOUT_MENU_WIDTH: string

    /**
     * form 表单标签对齐
     */
    readonly JOY_LAYOUT_FORM_LABEL_POSTION: 'left' | 'center' | 'right'

    /**
     * form 表单标签宽度
     */
    readonly JOY_LAYOUT_FORM_LABEL_WIDTH: string

    /**
     * form 表单标签后缀
     */
    readonly JOY_LAYOUT_FORM_LABEL_SUFFIX: string

    /**
     * form 表单初始显示行数
     */
    readonly JOY_LAYOUT_FORM_INITIAL_ROW_COUNT: number
    /**
     * form 表单初始显示列数
     */
    readonly JOY_LAYOUT_FORM_INITIAL_COL_COUNT: number
    /**
     * 是否开启全局 Mock
     */
    readonly JOY_GATEWAY_MOCK: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
