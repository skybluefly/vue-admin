<template>
  <el-form-item :label="label">
    <el-select v-model="defaultValue" :placeholder="placeholder" :style="{width:width+'px'}">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
    export default {
        name: "Select",
        model:{
          prop:'value',
          event:'change'
        },
        props:{
          value:'',
          label:{
            type:String,
            default:''
          },
          placeholder:{
            type:String,
            default:''
          },
          options:{
            type:Array,
            default:()=>[]
          },
          width:{
            type:Number,
            default:120
          }


        },
        data(){
          return{
            defaultValue:(typeof this.value) === 'Object' ? JSON.parse(JSON.stringify(this.value)) : this.value,
          }
        },
        watch:{
          value(newVal) {
            this.defaultValue = newVal;
          },
          defaultValue(newVal) {
            this.$emit('change', newVal);
          },
        }

    }
</script>

<style scoped>

</style>
