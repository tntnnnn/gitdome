import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./RouterMap"

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
    mode: 'history',
    routes,
    originalPush
})

export default router
//mixins//混入 脱离组件单独使用