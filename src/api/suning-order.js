import request from '@/utils/request'


export function getOrderList(search) {
  return request({
    url: '/suning/orders',
    method: 'get',
    params: search
  })
}

export function getAddressList() {
  return request({
    url: '/suning/address_shorts',
    method: 'get',

  })
}
