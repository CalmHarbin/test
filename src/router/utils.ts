/**
 * 转换菜单全路径为有效路径数组
 * @param rootPath 菜单根路径
 */
const menuRouterPathResolve = (rootPath: string) => {
    return `/${rootPath.split('/').slice(3, -1).join('/')}`
}

export const generalViewRouterList = function (): Array<RouteType> {
    const routerList: Array<RouteType> = []
    const asyncModules = import.meta.glob('/src/views/**/*.vue')
    const modules = import.meta.globEager('/src/views/**/*.vue')

    Object.keys(modules).forEach((key) => {
        const asyncCurrentModule = asyncModules[key]
        const currentModule = modules[key].default

        const menuPath = menuRouterPathResolve(asyncCurrentModule.name)
        routerList.push({
            component: asyncModules,
            path: menuPath,
            name: currentModule.name
        })
    })
    return routerList
}
