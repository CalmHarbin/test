/**
 * 后台获取的菜单详细信息
 */
type MenuTreeType = {
    children: MenuTreeType[]
    menuCode: string
    menuFatherid: number
    menuIcon: string
    menuLevel: number
    menuName: string
    menuOrder: number
    menuType: number
    menuUrl: string
}

const baseViews = import.meta.glob('../../views/**/index.vue')
const baseViewKeys = Object.keys(baseViews)

type buildNavMenu = (
    menuTree: MenuTreeType[],
    parentPath?: string
) => RouteType[]

/**
 * 构建左侧菜单列表项
 * @param menuTree 菜单树
 * @param parentPath 父级路径
 * @returns 构建好的左侧菜单项
 */
export const buildNavMenu: buildNavMenu = (menuTree = [], parentPath = '') => {
    if (menuTree === null) return []

    return menuTree.reduce<RouteType[]>((arr, current) => {
        const { menuCode, menuName, menuLevel, children } = current

        const currentRoute: any = {
            name: menuCode,
            meta: { title: menuName }
        }

        if (menuLevel === 1) {
            currentRoute.path = `/${menuCode}`
        } else {
            currentRoute.path = `${parentPath}/${menuCode}`
        }

        if (Array.isArray(children) && children.length > 0) {
            currentRoute.children = buildNavMenu(children, currentRoute.path)
        }

        return [...arr, currentRoute]
    }, [])
}

type buildMenuRoute = (
    menuTree: MenuTreeType[],
    parentPath?: string
) => RouteType[]

export const buildMenuRoute: buildMenuRoute = (
    menuTree = [],
    parentPath = ''
) => {
    if (menuTree === null) return []

    return menuTree.reduce<RouteType[]>((arr, current) => {
        const { menuCode, menuName, menuLevel, menuUrl, children } = current

        const currentRoute: any = {
            name: menuCode,
            meta: { title: menuName }
        }

        if (menuLevel === 1) {
            currentRoute.component = () =>
                import('@/layout/BasicLayout/index.vue')
            currentRoute.path = `/${menuCode}`

            currentRoute.children = buildMenuRoute(children, currentRoute.path)

            return [...arr, currentRoute]
        } else {
            if (Array.isArray(children) && children.length > 0) {
                return [
                    ...arr,
                    ...buildMenuRoute(children, `${parentPath}/${menuCode}`)
                ]
            } else {
                currentRoute.path = `${parentPath}/${menuCode}`
                const selectKeys = baseViewKeys.filter((n) =>
                    n.endsWith(`${menuUrl}/index.vue`)
                )[0]

                if (selectKeys) {
                    currentRoute.component = baseViews[selectKeys]
                }
                return [...arr, currentRoute]
            }
        }
    }, [])
}

type flatChildrenBtnAuthType = (menuTreeData: any[]) => any[]

export const flatChildrenBtnAuth: flatChildrenBtnAuthType = (menuTreeData) => {
    if (menuTreeData === null) return []

    return menuTreeData.reduce((arr, current) => {
        let btnList: any[] = []

        if (
            Array.isArray(current['btnChildren']) &&
            current['btnChildren'].length > 0
        ) {
            btnList = [...btnList, ...current['btnChildren']]
        }

        if (
            Array.isArray(current['children']) &&
            current['children'].length > 0
        ) {
            btnList = [...btnList, ...flatChildrenBtnAuth(current['children'])]
        }

        return [...arr, ...btnList]
    }, []) as any[]
}
