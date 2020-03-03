<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>单号管理</span>
    </div>
    <div>
      <el-form :model="form1" :rules="rules1" ref="Form1" inline label-width="100px" hide-required-asterisk>
        <el-form-item label="单号录入" prop="firstNumber">
          <el-input v-model="form1.firstNumber" placeholder="开始号码"></el-input>
        </el-form-item>
        <el-form-item prop="endNumber">
          <el-input v-model="form1.endNumber" placeholder="结束号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="importOrder">录入</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
  import {addNumberApi, getMySiteApi} from '@/api/number'

  export default {
    name: "OrderNumber",
    data() {
      return {
        siteList: [],
        form1: {
          firstNumber: '',
          endNumber: ''
        },
        rules1: {
          firstNumber: [
            {required: true, message: '请输入开始号码', trigger: 'blur'},
            // {min: 13, max: 13, message: '号码需为13位数字', trigger: 'blur'},
          ],
          endNumber: [
            {required: true, message: '请输入结束号码', trigger: 'blur'},
            //  {min: 13, max: 13, message: '号码需为13位数字', trigger: 'blur'},
          ]
        }
      }
    },
    computed: {
      userId() {
        return this.$store.getters.userId
      },
      role() {
        let authority = this.$store.getters.user.authorities[0]['authority'];
        if (authority === 'level0') {
          return 0
        } else if (authority === 'level') {
          return 1
        } else {
          return 2
        }
      }
    },
    mounted() {
      this.getMySite();
    },
    methods: {
      getMySite() {
        let param = `pageNumber=1&pageCount=99999&u_id=${this.userId}&role=${this.role}`;
        getMySiteApi(param).then(result => {
          this.siteList = result.data.message;
        })
      },
      importOrder() {
        this.$refs['Form1'].validate((valid) => {
          if (valid) {
            let data = {...this.form1};
            addNumberApi(data).then(() => {
              Object.assign(this.$data.form1, this.$options.data().form1)
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
