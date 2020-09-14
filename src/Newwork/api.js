export const METHOD={
    GET:'get',
    POST:'post'
}

export const PATH={
     swiper:'/api/Home/getHomeREC',
     list:'/api/Home/getHomeShowGoods',
     login:'/api/Verify/GetPhone',
     name:'/api/Verify/LoginName',
     code:'/api/SMSCode/GetCode',
     register:'/api/LoginPage/AddLogin',
     phone:'/api/LoginPage/Login',
     datalis:'/api/Goods/GetGoodsInfo',
     page:'/api/Goods/getCatsTree',
     classification:'/api/Goods/getCadGoods',
     cart:'/api/Cart/addCart',
     cartList:'/api/Cart/getCart',
     cartNum:'/api/Cart/patchCartNum',
     remove:'/api/Cart/DeleteCart',
     submit:'/api/Order/getOrderInfo',
     addsite:'/api/UserInfo/addArea',
     savesite:'/api/UserInfo/getArea',
     removesite:'/api/UserInfo/deleteArea',
     payment:'/api/Order/cretaeOrder',
     pass:'/api/Order/verifyPayPWD',
     money:'/api/Order/payOrder',
     hot:'/api/Goods/getSearchHot',
     seargoods:'/api/Goods/getGoods',
     appwebpay:'/api/Alipay/appWebPay'
}