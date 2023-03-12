export default [{
        // 权限管理  控制路由  分为静态路由和动态路由俩部分
        path: "/",
        name: "Layout",
        component: () =>
            import ("../views/LayOut.vue"),
        redirect: "/index",
        children: [{
            path: "/index",
            name: "index",
            component: () =>
                import ("../views/index/Homeindex.vue")
        }, {
            path: "/orders/list",
            name: "orders_list",
            component: () =>
                import ("../views/orders/OrdersList.vue"),
            meta: {
                bread: ["订单管理", "订单列表"]
            }
        }, {
            path: "/waybill/in",
            name: "waybill_in",
            component: () =>
                import ("../views/orders/OrderList2.vue"),
            meta: {
                bread: ["运单管理", "运单录入"]
            },
        }, {
            path: "/waybill/list",
            name: "waybill_list",
            meta: {
                bread: ["运单管理", "运单列表"],
                keepAlive: true
            },
            component: () =>
                import ("../views/waybill/WaybillList.vue")

        }, {
            path: "/waybill/list/detail",
            name: "waybill_list_detail",
            meta: {
                bread: ["运单管理", "运单列表", "运单详情"]
            },
            component: () =>
                import ("../views/waybill/waybillDetail.vue")
        }, {
            path: "/depart/data",
            name: "waybill_list_in",
            meta: {
                bread: ["发车管理", "发车数据单"]
            },
            component: () =>
                import ("../views/depart/DepartData.vue")
        }]
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("../views/LoginVue.vue")
    }

]