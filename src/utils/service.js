/* eslint-disable no-undef */
import axios from "axios"
import { Message } from 'element-ui';
import { getToken } from "./auth";
// eslint-disable-next-line no-unused-vars
const service = axios.create({
        baseURL: "http://localhost:8080",
        timeout: 5000

    })
    //请求拦截器
service.interceptors.request.use((config) => {
        if (getToken()) {
            config.headers.token = getToken() // 请求头里加
        }
        // console.log(config);
        // config.data.token="123456" data里加

        return config
    }, () => {
        Message({
            type: "error",
            message: "请求错误"
        })
        return Promise.reject(new Error("请求错误"))
    })
    //响应拦截器
service.interceptors.response.use((res) => {
        const result = res.data;
        if (result.success) {
            return result
        } else {
            Message({
                type: "error",
                message: result.message || "请求错误"
            })
            return Promise.reject(new Error(result.message || "请求错误"))
        }
        // eslint-disable-next-line no-unused-vars
    }, () => {
        Message({
            type: "error",
            message: "请求错误"
        })
        return Promise.reject(new Error("请求错误"))
    })
    //导出 
export default service