export default {
    data() {
        return {
            breadList: []
        }
    },
    created() {
        this.getBreadCrumb()
    },
    watch: {
        //params query
        //监听data 计算属性 props $route
        $route() {
            this.getBreadCrumb()
        }
    },
    methods: {
        getBreadCrumb() {
            this.breadList = this.$route.meta.bread || []
        }
    }
}