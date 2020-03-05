<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>单号管理</span>
    </div>
    <div>
      <el-form :model="form1" :rules="rules1" ref="Form1" inline label-width="110px" hide-required-asterisk
               v-if="authority==='level0'">
        <el-form-item label="单号录入" prop="firstNumber">
          <el-input v-model="form1.firstNumber" placeholder="开始号码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="endNumber">
          <el-input v-model="form1.endNumber" placeholder="结束号码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="importOrder" :loading="isImportantLoading">录入</el-button>
        </el-form-item>
        <el-form-item label="当前最大订单号" style="margin-left: 50px">{{maxNumber}}</el-form-item>
      </el-form>

      <el-form :model="form2" :rules="rules2" ref="Form2" inline label-width="100px" hide-required-asterisk>
        <el-form-item label="订单分配" prop="firstNumber">
          <el-input v-model="form2.firstNumber" placeholder="开始号码"></el-input>
        </el-form-item>
        <el-form-item prop="endNumber">
          <el-input v-model="form2.endNumber" placeholder="结束号码"></el-input>
        </el-form-item>
        <el-form-item label="网点:" prop="to_id">
          <el-select v-model="form2.to_id" placeholder="请选择网点">
            <el-option
                    v-for="item in siteList"
                    :label="item.c__branchesName"
                    :value="item.u_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="giveOrder">分配</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
  import {addNumberApi, getMySiteApi, giveNumberApi, getNumberApi, getHadGivenApi, getMyNumberApi} from '@/api/number'
  import {validateOneToThirteenNumber} from "@/utils/validate";

  export default {
    name: "OrderNumber",
    data() {
      return {
        siteList: [],
        canNotUsedList: [],
        isImportantLoading: false,
        maxNumber: '',
        form1: {
          firstNumber: '',
          endNumber: ''
        },
        rules1: {
          firstNumber: [
            {required: true, message: '请输入开始号码', trigger: 'blur'},
            {min: 1, max: 13, message: '长度需为1-13位', trigger: 'blur'},
            {validator: validateOneToThirteenNumber, trigger: 'blur'}
          ],
          endNumber: [
            {required: true, message: '请输入结束号码', trigger: 'blur'},
            {min: 1, max: 13, message: '长度需为1-13位', trigger: 'blur'},
            {validator: validateOneToThirteenNumber, trigger: 'blur'}
          ]
        },
        form2: {
          firstNumber: '',
          endNumber: '',
          to_id: null,
        },
        rules2: {
          firstNumber: [
            {required: true, message: '请输入开始号码', trigger: 'blur'},
            {min: 1, max: 13, message: '长度需为1-13位', trigger: 'blur'},
            {validator: validateOneToThirteenNumber, trigger: 'blur'}
          ],
          endNumber: [
            {required: true, message: '请输入结束号码', trigger: 'blur'},
            {min: 1, max: 13, message: '长度需为1-13位', trigger: 'blur'},
            {validator: validateOneToThirteenNumber, trigger: 'blur'}
          ],
          to_id: {required: true, message: '请选择网点', trigger: 'change'}
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
      },
      authority() {
        return this.$store.getters.user.authorities[0]['authority'];
      }
    },
    mounted() {
      this.getMySite();
      this.getNumber();
      this.getHadGiven();
      this.getMyNumber();
    },
    methods: {
      getMyNumber() {
        getMyNumberApi(this.userId).then(result => {
          console.log('我有的', result)
        })
      },
      getHadGiven() {
        let param = `u_id=${this.userId}&role=${this.role}`;
        getHadGivenApi(param).then((res) => {
          console.log('已经给了', res)
        })
      },
      getMySite() {
        let param = `pageNumber=1&pageCount=99999&u_id=${this.userId}&role=${this.role}`;
        getMySiteApi(param).then(result => {
          let data = result.data.message;
          if (typeof (data) === 'string') {
            this.siteList = []
          } else {
            this.siteList = data
          }
        })
      },
      getNumber() {
        if (this.authority !== 'level0') return;
        getNumberApi().then(result => { // 获得不可用区间
          this.canNotUsedList = result.data.message;
          let length = this.canNotUsedList.length;
          if (length === 0) {
            this.maxNumber = '0000000000000'
          } else {
            let maxNumber = this.canNotUsedList[length - 1]['q_end'];
            maxNumber = maxNumber + '';
            while (maxNumber.length < 13) {
              maxNumber = '0' + maxNumber
            }
            this.maxNumber = maxNumber;
          }
          this.isImportantLoading = false;
        })
      },
      importOrder() { // 单号录入
        this.$refs['Form1'].validate((valid) => {
          this.isImportantLoading = true;
          if (valid) {
            let data = {...this.form1};
            data.firstNumber = data.firstNumber / 1;
            data.endNumber = data.endNumber / 1;
            if (data.firstNumber > data.endNumber) {
              this.$errorMsg('开始号码不得大于结束号码');
              return;
            }
            if (data.endNumber - data.firstNumber > 500) {
              this.$errorMsg('一次录入不得超过500条');
              return;
            }
            let isHas = this.canNotUsedList.some(item => {
              return data.firstNumber <= item.q_start && data.endNumber >= item.q_start
                  || data.firstNumber >= item.q_start && data.endNumber <= item.q_end
                  || data.firstNumber <= item.q_end && data.endNumber >= item.q_end
                  || data.firstNumber <= item.q_start && data.endNumber >= item.q_end;
            });
            if (isHas) {
              this.$errorMsg('该区间存在已被录入过的单号，请换一个区间');
              return
            }
            data.u_id = this.userId;
            addNumberApi(data).then(() => {
              Object.assign(this.$data.form1, this.$options.data().form1);
              this.$refs['Form1'].resetFields();
              this.getNumber();
            })
          } else {
            this.isImportantLoading = false;
            return false;
          }
        });
      },
      giveOrder() { // 分配订单
        this.$refs['Form2'].validate((valid) => {
          if (valid) {
            let data = {...this.form2};
            data.u_id = this.userId;
            data.i = this.role;
            giveNumberApi(data).then(() => {
              Object.assign(this.$data.form2, this.$options.data().form2);
              this.$refs['Form2'].resetFields();
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
