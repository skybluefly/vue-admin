'use strict'
import Vue from 'vue'
const arrMap = {
  vip:{
    0:'非',
    1:'正式',
    2:'试用'
  },
  graduate:{
    0:'正常',
    1:'毕业',
    2:'待毕业套钻'
  },
  abnormal:{
    0:'正常',
    1:'异常',
  },
  baodan:{
    0:'未报单',
    1:'已报单',

  },
}


Vue.filter('changeToText', function (value,mapValue) {
  let keys = Object.keys(arrMap)
  let key = keys.find(v=>v==mapValue)
  return key ? arrMap[key][value] :value
})
