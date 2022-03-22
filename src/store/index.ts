import { createStore, ModuleTree } from 'vuex'

import AccountAuthPlugin from './plugins/accountAuth'

import AccountStore from './modules/accountStore'
import LayoutStore from './modules/layoutStore'
import getters from './getters'

const Modules: ModuleTree<any> = {
    account: AccountStore,
    layout: LayoutStore
}

export default createStore({
    modules: Modules,
    getters,
    plugins: [AccountAuthPlugin]
})
