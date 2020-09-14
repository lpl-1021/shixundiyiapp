import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    cartClist:[],
    submitId:'',
    selecList:{},
    paryment:{},
    order:'',
    obj:{},
    historyList:[]
  },
  mutations: {
    LOGIN_TONK(state,token){
      state.token=token
    },
    
    ADD_LIST(state,item){
      state.cartClist=item
     
      state.cartClist.map((res)=>{
        // console.log(res)
        if(res==null){
          state.cartClist.pop()
        }
      })
      console.log(state.cartClist)
    },
    CART_REMOVE(state,index){
      state.cartClist.slice(index,1)
    },
    SUBMIT_LIST(state,id){
      state.submitId=id
    },
    SELEC_SITE(state,item){
      state.selecList=item
      console.log(state.selecList)
    },
    PARMENT_ADD(state,paryment){
      state.paryment=paryment
    },
    MONEY_ADD(state,order){
      state.order=order
    },
    SEARCH_ADD(state,value){
     
      let num=state.historyList.findIndex(item=>{
        return item==value
      })
      // console.log(num)
      if(num==-1){
        state.historyList.unshift(value)
      }else{
        state.historyList.splice(num,1)
        state.historyList.unshift(value)
      }

      if(state.historyList.length>5){
        state.historyList.pop()
      }
    },
    REMOVE_SEEK(state,index){
      state.historyList.splice(index,1)
    },
    REMOVE_SEEK02(state){
      state.historyList=[]
    },
    REMOVE_TOKEN(state){
      state.token=''
    }
  },
  actions: {
    LOGIN_TONK(context,token){
      context.commit("LOGIN_TONK",token)
    },
    ADD_LIST(context,cartlist){
      context.commit("ADD_LIST",cartlist)
    },
    CART_REMOVE(context,index){
      context.commit("CART_REMOVE",index)
    },
    SUBMIT_LIST(context,id){
      context.commit("SUBMIT_LIST",id)
    },
    SELEC_SITE(context,item){
      context.commit("SELEC_SITE",item)
    },
    PARMENT_ADD(context,paryment){
      context.commit("PARMENT_ADD",paryment)
    },
    MONEY_ADD(context,order){
      context.commit("MONEY_ADD",order)
    },
    SEARCH_ADD(context,value){
      context.commit("SEARCH_ADD",value)
    },
    REMOVE_SEEK(context,index){
      context.commit("REMOVE_SEEK",index)
    },
    REMOVE_SEEK02(context){
      context.commit("REMOVE_SEEK02")
    },
    REMOVE_TOKEN(context){
      context.commit("REMOVE_TOKEN")
    }
  },
  modules: {
  },
  plugins:[createPersistedState({
    storage: window.localStorage
})] //会自动保存创建的状态。刷新还在
})
