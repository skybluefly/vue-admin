import request from '@/utils/request'

export function getAccountList(search) {
  return request({
    url: '/suning/accounts',
    method: 'get',
    params: search
  })
}

export function addAccount(account) {
  return request({
    url: '/suning/add_account',
    method: 'post',
    data: account
  })
}

