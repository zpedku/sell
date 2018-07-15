// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import router from './router'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
import './common/stylus/index.styl'
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.productionTip = false

const routes = [
    { path: '/goods', component: goods },
    { path: '/ranting', component: ratings },
    { path: '/seller', component: seller },
    {path: '/', redirect: '/goods'}
]
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
// const app =
new Vue({
    router,
    components: { App },
    template: '<App/>',
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    }
}).$mount('#app')
