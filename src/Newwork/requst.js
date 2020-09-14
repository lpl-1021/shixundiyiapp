import {request} from './http'
import {METHOD,PATH} from "./api"

const netClient={
    swiper(params){
        return request(METHOD.GET,PATH.swiper,params)
    },
    list(params){
        return request(METHOD.GET,PATH.list,params)
    },
    login(params){
        return request(METHOD.GET,PATH.login,params)
    },
    name(params){
        return request(METHOD.GET,PATH.name,params)
    },
    code(params){
        return request(METHOD.GET,PATH.code,params)
    },
    register(params){
        return request(METHOD.POST,PATH.register,params)
    },
    phone(params){
        return request(METHOD.POST,PATH.phone,params)
    },
    datalis(params){
        return request(METHOD.GET,PATH.datalis,params)
    },
    page(params){
        return request(METHOD.GET,PATH.page,params)
    },
    classification(params){
        return request(METHOD.GET,PATH.classification,params)
    },
    cart(params){
        return request(METHOD.POST,PATH.cart,params)
    },
    cartList(params){
        return request(METHOD.GET,PATH.cartList,params)
    },
    cartNum(params){
        return request(METHOD.PATCH,PATH.cartNum,params)
    },
    remove(params){
        return request(METHOD.PATCH,PATH.remove,params)
    },
    submit(params){
        return request(METHOD.GET,PATH.submit,params)
    },
    addsite(params){
        return request(METHOD.POST,PATH.addsite,params)
    },
    savesite(params){
        return request(METHOD.GET,PATH.savesite,params)
    },
    removesite(params){
        return request(METHOD.PATCH,PATH.removesite,params)
    },
    payment(params){
        return request(METHOD.POST,PATH.payment,params)
    },
    pass(params){
        return request(METHOD.POST,PATH.pass,params)
    },
    money(params){
        return request(METHOD.POST,PATH.money,params)
    },
    hot(params){
        return request(METHOD.GET,PATH.hot,params)
    },
    seargoods(params){
        return request(METHOD.GET,PATH.seargoods,params)
    },
    appwebpay(params){
        return request(METHOD.POST,PATH.appwebpay,params)
    },
}

export default netClient