<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>单号管理</span>
    </div>
    <div>
      <el-form :model="form1" :rules="rules1" ref="Form1" inline label-width="100px" hide-required-asterisk
               v-if="authority==='level0' || authority==='level'">
        <el-form-item label="单号录入" prop="firstNumber">
          <el-input v-model="form1.firstNumber" placeholder="开始号码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="endNumber">
          <el-input v-model="form1.endNumber" placeholder="结束号码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="importOrder" :loading="isImportantLoading">录入</el-button>
        </el-form-item>
      </el-form>

      <el-form :model="form2" :rules="rules2" ref="Form2" inline label-width="100px" hide-required-asterisk
               v-if="authority !=='level2'">
        <el-form-item label="订单分配" prop="firstNumber">
          <el-input v-model="form2.firstNumber" placeholder="开始号码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="endNumber">
          <el-input v-model="form2.endNumber" placeholder="结束号码" clearable></el-input>
        </el-form-item>
        <el-form-item label="网点:" prop="to_id">
          <el-select v-model="form2.to_id" placeholder="请选择网点">
            <el-option
                    v-for="item in siteList"
                    :key="item.u_id"
                    :label="item.c__branchesName"
                    :value="item.u_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="giveOrder" :disabled="isCanGive" :loading="isGiveLoading">分配</el-button>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label-width="100px" label="可用单号">{{canGiveList}}</el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
  import {
    addNumberApi, getMySiteApi, giveNumberApi,
    getNumberApi, getHadGivenApi, getMyNumberApi
  } from '@/api/number'
  import {validateThirteenNumber} from "@/utils/validate";

  export default {
    name: "OrderNumber",
    data() {
      return {
        /* 录入 */
        siteList: [], // 下级网点列表
        isImportantLoading: false,
        canNotUsedList: [], // 不能录入的区间
        form1: {
          firstNumber: '',
          endNumber: ''
        },
        rules1: {
          firstNumber: [
            {required: true, message: '请输入开始号码', trigger: 'blur'},
            {validator: validateThirteenNumber, trigger: 'blur'}
          ],
          endNumber: [
            {required: true, message: '请输入结束号码', trigger: 'blur'},
            {validator: validateThirteenNumber, trigger: 'blur'}
          ]
        },
        /* 分配 */
        canGiveSection: [], // 可分配区间
        isGiveLoading: false,
        form2: {
          firstNumber: '',
          endNumber: '',
          to_id: null,
        },
        rules2: {
          firstNumber: [
            {required: true, message: '请输入开始号码', trigger: 'blur'},
            {validator: validateThirteenNumber, trigger: 'blur'}
          ],
          endNumber: [
            {required: true, message: '请输入结束号码', trigger: 'blur'},
            {validator: validateThirteenNumber, trigger: 'blur'}
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
        if (authority === 'level') {
          return -1
        } else if (authority === 'level0') {
          return 0
        } else if (authority === 'level1') {
          return 1
        } else {
          return 2
        }
      },
      i() {
        let authority = this.$store.getters.user.authorities[0]['authority'];
        if (authority === 'level') {
          return 0
        } else if (authority === 'level0') {
          return 0
        } else if (authority === 'level1') {
          return 1
        } else {
          return 2
        }
      },
      authority() {
        return this.$store.getters.user.authorities[0]['authority'];
      },
      canGiveList() {
        let list = this.canGiveSection;
        if (list.length === 0) {
          return '暂无'
        } else {
          let str = '';
          list.forEach(item => {
            if (item.start === item.end) {
              str = str + `${item.start}, `
            } else {
              str = str + `${item.start} ~ ${item.end}, `
            }
          });
          str = str.slice(0, str.length - 2);
          return str
        }
      },
      isCanGive() {
        return this.canGiveSection.length === 0;
      }
    },
    mounted() {
      this.getMySite(); // 获得下级网点
      this.getNumber(); // 获得已经录入过的区间
      this.getCanGiveSection(); // 获得可用的单号
    },
    methods: {
      getCanGiveSection() { // 获得可分配单号
        if (this.authority === 'level2') return;
        this.canGiveSection = [];
        let param = `u_id=${this.userId}&role=${this.i}`;
        getMyNumberApi(param).then(result => {
          let response = result.data.message;
          if (response.length === 0) return;
          let start = response.shift();
          let last = start;
          let list = [];
          let length = response.length;
          response.forEach((current, index) => {
            if (last + 1 === current) {
              last++
            } else {
              list.push({start: start, end: last});
              last = start = response[index];
            }
            if (length === index + 1) {
              if (current === response[index - 1] + 1) {
                list.push({start: start, end: last});
              } else {
                list.push({start: current, end: current});
              }
            }
          });
          this.canGiveSection = list;
        })
      },
      // 分配订单
      giveOrder() {
        this.$refs['Form2'].validate((valid) => {
          if (valid) {
            this.isGiveLoading = true;
            let data = {...this.form2};
            data.firstNumber = data.firstNumber / 1;
            data.endNumber = data.endNumber / 1;
            data.u_id = this.userId;
            data.i = this.role;
            if (data.firstNumber > data.endNumber) {
              this.$errorMsg('结束号码不得小于开始号码');
              this.isGiveLoading = false;
              return;
            }
            if (data.endNumber - data.firstNumber > 500) {
              this.$errorMsg('一次录入不得超过500条');
              this.isGiveLoading = false;
              return;
            }
            let isIn = this.canGiveSection.some(item => {
              return data.firstNumber >= item.start && data.endNumber <= item.end;
            });
            if (!isIn) {
              this.$errorMsg('该区间存在不能使用的单号，请换一个区间');
              this.isGiveLoading = false;
              return
            }
            giveNumberApi(data).then(() => {
              Object.assign(this.$data.form2, this.$options.data().form2);
              this.$refs['Form2'].resetFields();
              this.getCanGiveSection();
            })
          } else {
            return false;
          }

        });
      },


      // 获得下级网点
      getMySite() {
        if (this.authority === 'level2') return;
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
      // 获得已经录入过的区间
      getNumber() {
        if (this.authority !== 'level' && this.authority !== 'level0') return;
        getNumberApi().then(result => { // 获得不可用区间
          this.canNotUsedList = result.data.message;
          this.isImportantLoading = false;
        })
      },
      // 单号录入
      importOrder() {
        this.$refs['Form1'].validate((valid) => {
          if (valid) {
            this.isImportantLoading = true;
            let data = {...this.form1};
            data.firstNumber = data.firstNumber / 1;
            data.endNumber = data.endNumber / 1;
            if (data.firstNumber > data.endNumber) {
              this.$errorMsg('结束号码不得小于开始号码');
              this.isImportantLoading = false;
              return;
            }
            if (data.endNumber - data.firstNumber > 500) {
              this.$errorMsg('一次录入不得超过500条');
              this.isImportantLoading = false;
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
              this.isImportantLoading = false;
              return
            }
            data.u_id = this.userId;
            addNumberApi(data).then(() => {
              Object.assign(this.$data.form1, this.$options.data().form1);
              this.$refs['Form1'].resetFields();
              this.getNumber();
              this.getCanGiveSection();
            })
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss">

</style>
