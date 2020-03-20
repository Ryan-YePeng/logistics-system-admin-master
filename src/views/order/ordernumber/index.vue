<template>
  <el-card class="box-card" v-loading="isLoading">
    <div slot="header" class="clearfix">
      <span>单号管理</span>
    </div>
    <div>
      <import-order
              v-if="authority==='level0' || authority==='level'"
              @updateGiveSection="getCanGiveSection"
              :authority="authority"
              :userId="userId"
              :role="role"/>
      <el-form :model="form2" :rules="rules2" ref="Form2" inline label-width="100px" hide-required-asterisk
               v-if="authority !=='level2'">
        <el-form-item label="订单分配" prop="firstNumber">
          <el-input v-model="form2.firstNumber" placeholder="开始号码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="endNumber">
          <el-input v-model="form2.endNumber" placeholder="结束号码" clearable></el-input>
        </el-form-item>

        <el-form-item label="网点:" prop="to_id">
          <el-select
                  v-model="form2.to_id"
                  placeholder="请输入网点名称"
                  filterable
                  remote
                  clearable
                  reserve-keyword
                  :remote-method="remoteMethod"
                  :loading="searchLoading"
                  @change="siteNameSelected">
            <template v-for="item in siteNameOptions">
              <el-option
                      v-if="item.username !== '8560000' && item.username !== '8560001'"
                      :key="item.key"
                      :label="item.label"
                      :value="item.value">
                <span style="float: left">{{ item.c__branchesName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.l_branchesName }}</span>
              </el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="giveOrder" :disabled="isCanGive" :loading="isGiveLoading">分配</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
              title="单号分配中..."
              width="700px"
              :close-on-click-modal="false"
              :show-close='false'
              :visible.sync="isGiveLoading">
        <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>
        <div style="padding-bottom: 30px"></div>
      </el-dialog>
      <el-form>
        <el-form-item label-width="100px" label="可用单号">
          <pre class="my-pre-wrap">{{canGiveList}}</pre>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
  import {
    getMySiteApi, giveNumberApi,
    getMyNumberApi
  } from '@/api/number'
  import {searchSiteApi} from "@/api/site";
  import {validateThirteenNumber} from "@/utils/validate";
  import {isEmpty} from "@/utils/common";
  import ImportOrder from './import'

  export default {
    name: "OrderNumber",
    components: {ImportOrder},
    data() {
      return {
        isLoading: true,
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
        },

        /* 分批 */
        giveDataList: [],
        giveTimer: 0,
        timer: 0,
        /* 分批 */

        /* 模糊搜索 */
        searchLoading: false,
        siteNameOptions: [],
        siteObj: {},
        /* 模糊搜索 */
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
      authority() {
        return this.$store.getters.user.authorities[0]['authority'];
      },
      canGiveList() { // 可用单号 显示
        let list = this.canGiveSection;
        if (list.length === 0) {
          return ' '
        } else {
          let str = '';
          list.forEach(item => {
            if (item.start === item.end) {
              let start = this.addO(item.start);
              str = str + `${start},     `
            } else {
              let start = this.addO(item.start);
              let end = this.addO(item.end);
              str = str + `${start} ~ ${end},     `
            }
          });
          str = str.slice(0, str.length - 6);
          return str
        }
      },
      isCanGive() {
        return this.canGiveSection.length === 0;
      },
      percentage() {
        let timer = this.timer;
        let importTimer = this.giveTimer;
        if (this.timer === 0) return 0;
        return Math.ceil(timer / importTimer * 100)
      }
    },
    mounted() {
      this.getCanGiveSection(); // 获得可用的单号
    },
    methods: {
      /* 模糊搜索网点 */
      siteNameSelected() {
        let u_id = this.form2.to_id;
        setTimeout(() => {
          this.siteNameOptions.some(item => {
            if (item.u_id === u_id) {
              this.siteObj = item;
              return true
            }
          });
        }, 100)
      },
      remoteMethod(query) {
        if (query !== '') {
          this.searchLoading = true;
          let param = `pageNumber=1&pageCount=999999&s=${query}&u_id=${this.userId}&role=${this.role}`;
          getMySiteApi(param).then(result => {
            this.searchLoading = false;
            let siteNameOptionsData = [];
            let response = result.data.message;
            for (let i = 0; i < response.length; i++) {
              siteNameOptionsData.push({
                value: response[i].u_id,
                label: response[i].c__branchesName,
                c__branchesName: response[i].c__branchesName,
                l_branchesName: response[i].l_branchesName,
                role: response[i].authorities[0]['authority'],
                username: response[i].username,
                key: response[i].u_id,
                u_id: response[i].u_id
              })
            }
            this.siteNameOptions = siteNameOptionsData;
          }).catch(() => {
            this.searchLoading = false;
          })
        } else {
          this.siteNameOptions = [];
        }
      },
      /* 模糊搜索网点 */

      // 补零函数
      addO(value) {
        value = value + '';
        while (value.length < 13) {
          value = '0' + value;
        }
        return value
      },

      getCanGiveSection() { // 获得可分配单号
        this.canGiveSection = [];
        let param = `u_id=${this.userId}&role=${this.role}`;
        getMyNumberApi(param).then(result => {
          let response = result.data.message;
          if (response.length === 0) {
            this.isGiveLoading = false;
            this.isLoading = false;
            /* 进度条 */
            this.giveDataList = [];
            this.giveTimer = 0;
            this.timer = 0;
          }
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
          this.isGiveLoading = false;
          this.isLoading = false;
          /* 进度条 */
          this.giveDataList = [];
          this.giveTimer = 0;
          this.timer = 0;
        })
      },
      // 分配订单
      giveOrder() {
        this.$refs['Form2'].validate((valid) => {
          if (valid) {
            this.$msgBox().then(() => {
              this.isGiveLoading = true;
              let data = {...this.form2};
              data.firstNumber = data.firstNumber / 1;
              data.endNumber = data.endNumber / 1;
              data.u_id = this.userId;
              let i;
              let objRole = this.siteObj.role;
              if (objRole === 'level0') i = -1;
              if (objRole === 'level1') i = 0;
              if (objRole === 'level2') i = 1;
              data.i = i;
              if (data.firstNumber > data.endNumber) {
                this.$errorMsg('结束号码不得小于开始号码');
                this.isGiveLoading = false;
                return;
              }
              if (data.endNumber - data.firstNumber > 15000) {
                this.$errorMsg('一次分配不得超过15000条');
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
              data.name = this.siteObj.c__branchesName;
              /* 分批请求 */
              let temp = (data.endNumber - data.firstNumber) / 500;
              let timer = Math.floor(temp);
              if (timer === 0) timer = 1;
              let start = data.firstNumber;
              let end = data.endNumber;
              for (let i = 0; i <= timer; i++) {
                let obj = {};
                obj.to_id = data.to_id;
                obj.u_id = data.u_id;
                obj.name = data.name;
                obj.i = data.i;
                if (i + 1 === timer) {
                  obj.firstNumber = start;
                  obj.endNumber = end;
                  this.giveDataList.push(obj);
                  break
                }
                obj.firstNumber = start;
                obj.endNumber = start + 499;
                start = start + 500;
                this.giveDataList.push(obj)
              }
              this.giveTimer = this.giveDataList.length - 1;
              this.startGive()
            })
          } else {
            return false;
          }
        });
      },

      startGive() {
        giveNumberApi(this.giveDataList[this.timer]).then(result => {
          if (result.data.status === 200 && this.timer < this.giveTimer) {
            this.timer = this.timer + 1;
            this.startGive();
          } else {
            this.endGiveSuccess();
          }
        }).catch(() => {
          this.endGiveError();
        })
      },

      endGiveSuccess() {
        this.$successMsg('分配完成');
        this.giveTimer = 1;
        this.timer = 1;
        window.setTimeout(() => {
          Object.assign(this.$data.form2, this.$options.data().form2);
          this.$refs['Form2'].resetFields();
          this.getCanGiveSection();
          // this.giveDataList = [];
          // this.giveTimer = 0;
          // this.timer = 0;
        }, 1000)
      },

      endGiveError() {
        this.$errorMsg('分配中发生错误，已终止');
        Object.assign(this.$data.form2, this.$options.data().form2);
        this.$refs['Form2'].resetFields();
        this.getCanGiveSection();
        this.giveDataList = [];
        this.giveTimer = 0;
        this.timer = 0;
      }
    }
  }
</script>

<style lang="scss">
  .my-pre-wrap {
    white-space: pre-wrap !important;
  }
</style>
