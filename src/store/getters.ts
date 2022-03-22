import { GetterTree } from 'vuex'

const getters: GetterTree<any, any> = {
    token: (state: any) => state.account.token,
    accountInfo: (state: any) => state.account.accountInfo,
    siteId: (state: any) => state.account.siteId
}
export default getters
