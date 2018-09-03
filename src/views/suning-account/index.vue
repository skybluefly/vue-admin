<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <m-select v-model="formInline.graduate" label="是否毕业"  :options="graduate_opt"/>
      <m-select v-model="formInline.wudi_quan" label="是否有无敌券"  :options="wudi_quan_opt"/>
      <m-select v-model="formInline.card" label="是否有苏宁卡"  :options="card_opt"/>
      <m-select v-model="formInline.vip" label="是否vip"  :options="vip_opt"/>
      <m-select v-model="formInline.order_by" label="排序条件"  :options="order_by_opt"/>
      <m-select v-model="formInline.sort" label="排序顺序"  :options="sort_opt"/>
      <m-select v-model="formInline.apple_cond" label="可下苹果"  :options="apple_cond_opt"/>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="success" @click="dialogFormVisible=true" style="margin-bottom:20px">添加账号</el-button>
    <el-table
      :data="table_list"
      :border="true"
      v-loading="listLoading"
      height="550"
      >
        <el-table-column label="账号" align="center" fixed  prop="name" width="130">
          <template  slot-scope="scope">
              {{scope.row.name}}
          </template>
        </el-table-column>

        <el-table-column label="手机" align="center" fixed  prop="phone" width="150">
          <template  slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>

        <el-table-column label="super返钻" align="center"   prop="super_zuan" width="150"></el-table-column>
        <el-table-column label="未使用云钻" align="center"  sortable  prop="rest_zuan" width="150"></el-table-column>
        <el-table-column label="vip" align="center"   prop="vip" width="150">
          <template  slot-scope="scope">
            {{scope.row.vip | changeToText('vip')}}
          </template>
        </el-table-column>
        <el-table-column label="苏宁卡" align="center"   prop="card" width="150"></el-table-column>
        <el-table-column label="无敌券总面额" align="center"   prop="wudi_quan" width="150"></el-table-column>
        <el-table-column label="无敌券过期日期" align="center"   prop="quan_expire" width="150"></el-table-column>
        <el-table-column label="购物天数" align="center"   prop="buy_day" width="150"></el-table-column>
        <el-table-column label="是否毕业" align="center"   prop="graduate" width="150">
          <template  slot-scope="scope">
            {{scope.row.vip | changeToText('graduate')}}
          </template>
        </el-table-column>
        <el-table-column label="是否违规" align="center"   prop="abnormal" width="150">
          <template  slot-scope="scope">
            {{scope.row.vip | changeToText('abnormal')}}
          </template>
        </el-table-column>
        <el-table-column label="添加时间" sortable align="center"   prop="add_time" width="150"></el-table-column>
        <el-table-column label="更新时间" sortable align="center"   prop="mod_time" width="150"></el-table-column>


      <!--<el-table-column-->
          <!--v-for="item in table_opt"-->
          <!--:label="item.text"-->
          <!--align="center"-->
          <!--:key="item.text"-->
          <!--width="150"-->

        <!--&gt;-->
          <!--<template slot-scope="scope">-->
           <!--{{ scope.row[item.value] | changeToText(item.value) }}-->
          <!--</template>-->
        <!--</el-table-column>-->


    </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.page"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="pagination.size"
        layout="total,sizes, prev, pager, next"
        :total="pagination.total"
        style="text-align:center;margin-top:20px"
      >
      </el-pagination>



    <el-dialog title="添加账号" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="accountForm" :rules="rules" ref="accountForm">
        <el-form-item label="账号名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="accountForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pw">
          <el-input v-model="accountForm.pw" type="password"></el-input>
        </el-form-item>

        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="accountForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAccount">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  import MSelect from '@/components/Form/Select'
  import {getAccountList,addAccount} from '@/api/suning-account'
  import { Message } from 'element-ui'
  import {mapActions} from 'vuex'
  export default {
    name:'suning-account',
    components:{MSelect},
    data() {
      return {
        dialogFormVisible:false,
        formLabelWidth: '70px',
        listLoading:false,
        accountForm:{
          name:'',
          pw:'',
          phone:''
        },
        rules: {
          name: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          pw: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入手机', trigger: 'blur'},
          ]

        },
        formInline: {
          graduate: 0,
          wudi_quan: -1,
          card:-1,
          vip:-1,
          order_by:'add_time',
          sort:-1,
          apple_cond:0,
          page:1
        },
        graduate_opt:[
          {
            value:-1,
            label:'所有'
          },
          {
            value:0,
            label:'未毕业'
          },
          {
            value:1,
            label:'已毕业'
          },
          {
            value:2,
            label:'待毕业套钻'
          },
        ],
        wudi_quan_opt:[
          {
            value:-1,
            label:'所有'
          },
          {
            value:0,
            label:'无'
          },
          {
            value:1,
            label:'有'
          }
        ],
        card_opt:[
          {
            value:-1,
            label:'所有'
          },
          {
            value:0,
            label:'无'
          },
          {
            value:1,
            label:'有'
          },
        ],
        vip_opt:[
          {
            value:-1,
            label:'所有'
          },
          {
            value:0,
            label:'未开通'
          },
          {
            value:1,
            label:'已开通'
          }
        ],
        order_by_opt:[
          {
            value:'super_zuan',
            label:'super返钻'
          },
          {
            value:'rest_zuan',
            label:'未使用云钻'
          },
          {
            value:'add_time',
            label:'添加时间'
          },
          {
            value:'mod_time',
            label:'更新时间'
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
            value:1,
            label:'小8'
          },
          {
            value:2,
            label:'8p'
          },
          {
            value:3,
            label:'x'
          },
          {
            value:0,
            label:'所有'
          },

        ]
      }

    },
    computed:{
      table_list(){
        return this.$store.state.suning.accountData
      },
      pagination(){
        return this.$store.state.suning.accountPage
      },
    },
    methods: {
      ...mapActions({
        GetAccount:'GetAccount'
      }),
      fetchData(obj){
        this.listLoading = true
        console.log(this.formInline)
        this.GetAccount(obj || this.formInline).then(res=>{
          this.listLoading = false
        }).catch(e=>{console.log(e)})

      },
      addAccount(){
        this.$refs.accountForm.validate((valid) => {
          if (valid) {
            addAccount(this.accountForm).then((res)=>{
              Message({
                message: '添加成功！',
                type: 'success',
                duration: 2 * 1000
              })
              this.dialogFormVisible = false
              this.fetchData()
            }).catch(e=>{console.log(e)})
          } else {
            console.log('error submit!!');
            return false;
          }
        })

      },
      handleSizeChange(val) {
        this.formInline.size = val
        this.fetchData(this.formInline)
      },
      handleCurrentChange(val) {
        this.formInline.page = val
        this.fetchData(this.formInline)
      },
      onSubmit(){
        this.formInline.page = 1
        this.fetchData(this.formInline)

      }
    },
    mounted(){
      if(!this.table_list){
        this.fetchData()
      }

    }
  }
</script>
