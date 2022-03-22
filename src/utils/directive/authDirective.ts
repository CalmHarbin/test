import store from '@/store'

export default {
    install: (app: any) => {
        app.directive('bauth', {
            beforeMount: (el: any, binding: any) => {
                const { value } = binding

                const btnAuth = store.state.account.authButtonList
                if (value && !btnAuth.includes(value)) {
                    el.style.display = 'none'
                }
            }
        })
    }
}
