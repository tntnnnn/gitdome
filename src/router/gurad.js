import router from "./index";
import { getToken } from "@/utils/auth";
import asyncRoutes from "./asyncRouterMap";
import store from '@/store/index';
//导航守卫
router.beforeEach(async(to, from, next) => {
    //也可以先发请求 再判断token
    const hasToken = getToken();
    if (hasToken) {
        await store.dispatch("getRole")
        if (to.path == "/login") {
            next("/")
        } else {
            if (to.name == null) {
                //路由不存在添加路由
                //先添加路由  路由添加也是异步的
                // eslint-disable-next-line no-undef
                //筛选出角色对应所拥有的路由表
                let f = asyncRoutes.filter(item => item.meta.auth.includes(store.state.role))
                for (let i = 0; i < f.length; i++) {
                    router.addRoute(f[i])
                }
                //跳转路由 replace路由跳转不能返回
                //因为跳转有可能发生在路由添加成功之前，所以要反复执行
                //参数to找不到对应路由的话，就会再重复执行，直到找到为止，会执行else
                next({...to, replace: true })
            } else {
                next()
            }
            //动态添加路由 如果访问需要权限的路由，再添加路由
            /*  this.$router.addRoute({
                 path: "/attendance",
                 name: "Attendance",
                 meta: { auth: ["boss", "administration"] },
                 component: () =>
                     import ("@/views/AuthView/AuthAttendance")
             });
             console.log("路由表", this.$router.getRoutes()); */
            next()
        }
    } else {
        if (to.path == "/login") {
            next()
        } else {
            next("/login")
        }
    }
})