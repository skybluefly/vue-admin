ss<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="账号">
          <el-input v-model="formInline.name" style="width:120px"></el-input>
      </el-form-item>

      <el-form-item label="订单号">
        <el-input v-model="formInline.order_number" style="width:140px"></el-input>
      </el-form-item>
      <m-select v-model="formInline.address" label="地址"  :options="address_opt"/>
      <m-select v-model="formInline.apple_cond" label="是否苹果单"  :options="apple_cond_opt" />
      <m-select v-model="formInline.status" label="订单状态"  :options="status_opt"/>
      <m-select v-model="formInline.order_by" label="排序条件"  :options="order_by_opt"/>
      <m-select v-model="formInline.sort" label="排序顺序"  :options="sort_opt"/>
      <el-date-picker
        v-model="formInline.order_time"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="下单时间">
      </el-date-picker>
      <el-date-picker
        v-model="formInline.recv_time"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="收货时间">
      </el-date-picker>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>


    <el-table
      :data="table_list"
      :border="true"
      v-loading="listLoading"
      style="width: 100%"
      height="550">
      <el-table-column label="账号" align="center" fixed  prop="name" width="130">
        <template  slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center"   prop="order_num" width="150"></el-table-column>
      <el-table-column label="订单简称" align="center"   prop="goods_short" width="250"></el-table-column>
      <el-table-column label="提交订单时间" align="center"  sortable  prop="order_time" width="140"></el-table-column>
      <el-table-column label="地址简称" align="center"   prop="address_short"></el-table-column>
      <el-table-column label="收货时间" align="center"  sortable  prop="recv_time" width="140"></el-table-column>
      <el-table-column label="订单状态" align="center"   prop="status">
        <template  slot-scope="scope">
          {{scope.row.status  | changeToText('status')}}
        </template>
      </el-table-column>
      <el-table-column label="订单价格" align="center"   prop="price"></el-table-column>
      <el-table-column label="已用苏宁卡" align="center" sortable  prop="card" width="140"></el-table-column>
      <el-table-column label="结算价格" align="center"   prop="return_money"></el-table-column>
      <!--<el-table-column label="是否报单" align="center"   prop="baodan"></el-table-column>-->
      <!--<el-table-column label="成本价格" align="center"   prop="cost"></el-table-column>-->
      <!--<el-table-column label="额外优惠" align="center"   prop="special"></el-table-column>-->
      <!--<el-table-column label="产生无敌券" align="center"   prop="wudi_quan"></el-table-column>-->


    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="formInline.page"
      :page-sizes="[50, 100, 150, 200]"
      :page-size="pagination.size"
      layout="total,sizes, prev, pager, next"
      :total="pagination.total"
      style="text-align:center;margin-top:20px"
    >
    </el-pagination>
  </div>
</template>

<script>
    import MSelect from '@/components/Form/Select'
    import {getOrderList} from '@/api/suning-order'
    import {mapActions} from 'vuex'
    export default {
        name: "suning-order",
        components:{MSelect},
        data(){
          return {
            formInline:{
              name:'',
              order_number:'',
              address:0,
              order_time:'',
              recv_time:'',
              status:-1,
              order_by:'order_time',
              sort:-1,
              apple_cond:-1,
              page:1
            },
            listLoading:false,
            return_money_opt:[
              {
                label:'是',
                value:1
              },
              {
                label:'否',
                value:0
              },
            ],
            status_opt:[
              {
                label:'所有',
                value:-1
              },
              {
                label:'未签收',
                value:0
              },
              {
                label:'已签收',
                value:1
              },

            ],
            order_by_opt:[
            {
              value:'order_time',
              label:'下单时间'
            },
            {
              value:'recv_time',
              label:'收货时间'
            },
          ],
            sort_opt:[
            {
              value:-1,
              label:'降序'
            },
            {
              value:1,
              label:'升序'
            },
          ],
          apple_cond_opt:[
            {
              value:-1,
              label:'所有'
            },
            {
              value:0,
              label:'非苹果单'
            },
            {
              value:1,
              label:'苹果单'
            },

          ],
          formatForm:{}
          }
        },
      computed:{
        address_opt(){
          return this.$store.state.suning.address
        },
        table_list(){
          return this.$store.state.suning.orderData
        },
        pagination(){
          return this.$store.state.suning.orderPage
        },
      },
      methods:{
        ...mapActions({
          GetOrder:'GetOrder',
          GetAddress:'GetAddress'
        }),
        onSubmit(){
          this.formInline.page = 1
          this.fetchData(this.formInline)
          this.formInline = this.formatForm
        },
        handleSizeChange(val) {
          this.formInline.size = val
          this.fetchData(this.formInline)
        },
        handleCurrentChange(val) {
          this.formInline.page = val
          this.fetchData(this.formInline)
        },
        fetchData(obj){
          this.listLoading = true
          console.log(this.formInline)
          this.GetOrder(obj || this.formInline).then(res=>{
            this.listLoading = false

          }).catch(e=>{console.log(e)})

        },
        getAddress (){
          if(!this.$store.state.suning.address){
            this.GetAddress()
          }
        }
      },
      mounted(){
        if(!this.table_list){
          this.fetchData()

        }
        this.getAddress()
        this.formatForm = JSON.parse(JSON.stringify(this.formInline))

      }


    }
</script>

<style scoped>

</style>
