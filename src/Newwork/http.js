import axios from "axios"
import {METHOD} from  './api'
import Vue from 'vue';
import { Toast } from 'vant';
import store from '../store/index'
import router from '../router/index'
const {baseUrl}=require('../config/env.'+process.env.NODE_ENV+".js");

Vue.use(Toast);

const instance=axios.create({
    // baseURL:'http://www.hj0819.top:44369',
    baseURL:baseUrl,
    timeout:20000
})

instance.interceptors.request.use(function(res){
    // console.log(router.options.routes[0])
    if(router.options.routes[0]){
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
    }
    if(store.state.token){
        res.headers.token=  store.state.token
    }
      return res
},
function(err){
    return Promise.reject(err)
}
)

instance.interceptors.response.use(function(res){
    // Toast.clear()
    return res
},
function(err){
    return Promise.reject(err)
})

export function request(method,url,params){
    switch(method){
        case METHOD.GET:
            return GET(url,params);
        case METHOD.POST:
            return POST(url,params);
        case METHOD.PATCH:
            return PATCH(url,params);
    }
}

function GET(url,params){
    return instance.get(url,params)
}

function POST(url,params){
    return instance.post(url,params)
}

function PATCH(url,params){
    return instance.patch(url,params)
}



