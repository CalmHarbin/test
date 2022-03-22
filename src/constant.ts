/**
 * 常量定义配置
 */

/**
 * 请求路由配置
 */

const GateWayMDMCRM = 'JOYMDMCRM/in'
const GateWayOA = 'JOYOA/in'
const GateWayOTMS = 'JOYOTMS/in'
const GateWayWMS = 'JOYWMS/in'
const GateWayQABI = 'JOYQABI/in'
const GateWayBMS = 'JOYBMS/in'
const GateWayEDIAPI = 'JOYAPI/in'
const GateWaySSO = 'JOYSSO/in'

const GateWayRouteMap = {
    oa: GateWayOA,
    otms: GateWayOTMS,
    wms: GateWayWMS,
    qa: GateWayQABI,
    bms: GateWayBMS,
    mdm: GateWayMDMCRM,
    api: GateWayEDIAPI,
    sso: GateWaySSO
}

export {
    GateWayMDMCRM,
    GateWayOA,
    GateWayOTMS,
    GateWayWMS,
    GateWayQABI,
    GateWayBMS,
    GateWayEDIAPI,
    GateWaySSO,
    GateWayRouteMap
}

/**
 * 布局部分
 */

/**
 * 菜单展开收缩状态缓存 key
 */
export const JOY_LAYOUT_MENU_FOLD = 'joy-layout-menu-fold'

/**
 * 菜单展开收缩状态缓存 key
 */
export const JOY_LAYOUT_ACCOUNT_INFO = 'joy-account-info'

/**
 * 菜单展开收缩状态缓存 key
 */
export const JOY_LAYOUT_ACCOUNT_TOKEN = 'joy-account-token'

/**
 * 当前用户站点信息缓存
 */
export const JOY_LAYOUT_ACCOUNT_SITEID = 'joy-account-site'

/**
 * 缓存请求数据
 */
export const JOY_SHAKE_DATA_PREFIXES = 'joy-shake-data-prefixes'
