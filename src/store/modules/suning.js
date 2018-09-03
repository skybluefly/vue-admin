import { getAddressList, getOrderList } from '@/api/suning-order'
import { getAccountList } from '@/api/suning-account'

const suning = {
  state: {
    address: null,
    accountData: null,
    orderData: null,
    accountPage: {},
    orderPage: {}
  },

  mutations: {
    SET_ADDRESS: (state, data) => {
      data.unshift({ value: 0, label: '所有' })
      state.address = data
    },
    SET_ACCOUNTDATA:(state,data)=>{
      state.accountData = data
    },
    SET_ACCOUNTPAGE:(state,data)=>{
      state.accountPage = data
    },
    SET_ORDERDATA:(state,data)=>{
      state.orderData = data
    },
    SET_ORDERPAGE:(state,data)=>{
      state.orderPage = data
    },
  },

  actions: {
    // 下单地址
    GetAddress({ commit }) {
      return new Promise((resolve, reject) => {
        getAddressList().then(response => {
          const data = response.data
          commit('SET_ADDRESS',data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取账号列表
    GetAccount({commit},params){
      return new Promise((resolve,reject)=>{
        getAccountList(params).then(res=>{
          console.log(res)
          let {pagination,data} = res
          commit('SET_ACCOUNTDATA',data)
          commit('SET_ACCOUNTPAGE',pagination)
          resolve(res)
        }).catch(e=>{
          reject(e)
        })
      })
    },
    //获取订单列表
    GetOrder({commit},params){
      return  new Promise((resolve,reject)=>{
        getOrderList(params).then(res=>{
          console.log(res)
          setTimeout(()=>{
            let {pagination,data} = res
            commit('SET_ORDERDATA',data)
            commit('SET_ORDERPAGE',pagination)
            resolve(res)
          },1000)

        }).catch(e=>{
          reject(e)
        })
      })
    },

  }
}

export default suning
