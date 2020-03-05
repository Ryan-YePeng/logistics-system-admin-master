<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>单号管理</span>
    </div>
    <div>
      <el-form :model="form1" :rules="rules1" ref="Form1" inline label-width="100px" hide-required-asterisk
               v-if="authority==='level0'">
        <el-form-item label="单号录入">
          <el-input :disabled="true" v-model="form1.firstNumber"></el-input>
        </el-form-item>
        <el-form-item prop="endNumber">
          <el-input v-model="form1.endNumber" placeholder="结束号码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="importOrder" :loading="isImportantLoading">录入</el-button>
        </el-form-item>
      </el-form>

      <el-form :model="form2" :rules="rules2" ref="Form2" inline label-width="100px" hide-required-asterisk>
        <el-form-item label="订单分配">
          <el-input :disabled="true" v-model="form2.firstNumber"></el-input>
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
  import {validateOneToThirteenNumber} from "@/utils/validate";

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
          endNumber: [
            {required: true, message: '请输入结束号码', trigger: 'blur'},
            {min: 1, max: 13, message: '长度需为1-13位', trigger: 'blur'},
            {validator: validateOneToThirteenNumber, trigger: 'blur'}
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
      },
      canGiveList() {
        let list = this.canGiveSection;
        if (list.length === 0) {
          return '无可用单号'
        } else {
          let str = '';
          list.forEach(item => {
            if (item.ziji_first === item.ziji_end) {
              str = str + `${item.ziji_first}, `
            } else {
              str = str + `${item.ziji_first} ~ ${item.ziji_end}, `
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
      this.getMySite();
      this.getNumber();
      this.getCanGiveSection()
    },
    methods: {
      getCanGiveSection() {
        let haveSection = [];
        let hadGivenSection = [];
        this.canGiveSection = [];
        getMyNumberApi(this.userId) // 我所有的区间
            .then(result => {
              haveSection = result.data.message;
              // console.log('我有的', haveSection);
              let param = `u_id=${this.userId}&role=${this.role}`;
              return getHadGivenApi(param) // 已经分配的区间
            })
            .then(result => {
              hadGivenSection = result.data.message;
              // console.log('已经给了', hadGivenSection);


              let length = hadGivenSection.length;
              if (length !== 0) {
                let lastHadGivenItem = hadGivenSection[length - 1];
                haveSection.forEach(haveItem => {
                  if (lastHadGivenItem.l_r_endnumber > haveItem.ziji_first && lastHadGivenItem.l_r_endnumber < haveItem.ziji_end) {
                    this.canGiveSection.push({
                      ziji_first: lastHadGivenItem.l_r_endnumber + 1,
                      ziji_end: haveItem.ziji_end
                    })
                  }
                  if (lastHadGivenItem.l_r_endnumber === haveItem.ziji_first && lastHadGivenItem.l_r_endnumber < haveItem.ziji_end) {
                    this.canGiveSection.push({
                      ziji_first: lastHadGivenItem.l_r_endnumber + 1,
                      ziji_end: haveItem.ziji_end
                    })
                  }
                  if (lastHadGivenItem.l_r_endnumber < haveItem.ziji_first && lastHadGivenItem.l_r_endnumber < haveItem.ziji_end) {
                    this.canGiveSection.push({ziji_first: haveItem.ziji_first, ziji_end: haveItem.ziji_end})
                  }
                })
              } else {
                this.canGiveSection = haveSection
              }


              //  console.log('可分配的', this.canGiveSection);
              if (this.canGiveSection.length !== 0) {
                let firstItem = this.canGiveSection[0].ziji_first;
                firstItem = firstItem + '';
                while (firstItem.length < 13) {
                  firstItem = '0' + firstItem
                }
                this.form2.firstNumber = firstItem
              }
              this.isGiveLoading = false;
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
            let isIn = data.endNumber > this.canGiveSection[0].ziji_end;
            if (isIn) {
              this.$errorMsg('该区间存在不能使用的单号，请更换结束号码');
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
      // 获得开始单号
      getNumber() {
        if (this.authority !== 'level0') return;
        getNumberApi().then(result => { // 获得不可用区间
          this.canNotUsedList = result.data.message;
          let length = this.canNotUsedList.length;
          if (length === 0) {
            this.form1.firstNumber = '0000000000000'
          } else {
            let maxNumber = this.canNotUsedList[length - 1]['q_end'] + 1;
            maxNumber = maxNumber + '';
            while (maxNumber.length < 13) {
              maxNumber = '0' + maxNumber
            }
            this.form1.firstNumber = maxNumber;
          }
          this.isImportantLoading = false;
        })
      },
      // 单号录入
      importOrder() {
        this.$refs['Form1'].validate((valid) => {
          this.isImportantLoading = true;
          if (valid) {
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
      }
    }
  }
</script>

<style scoped>

</style>
