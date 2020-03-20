<template>
  <div id="import-order">
    <el-form :model="form1" :rules="rules1" ref="Form1" inline label-width="100px" hide-required-asterisk>
      <el-form-item label="单号录入" prop="firstNumber">
        <el-input v-model="form1.firstNumber" placeholder="开始号码" clearable></el-input>
      </el-form-item>
      <el-form-item prop="endNumber">
        <el-input v-model="form1.endNumber" placeholder="结束号码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="importOrder" :loading="isImportantLoading">录入</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="success" @click="checkHadInputOrder">查看已录入的单号</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
            title="单号录入中..."
            width="700px"
            :close-on-click-modal="false"
            :show-close='false'
            :visible.sync="isImportantLoading">
      <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>
      <div style="padding-bottom: 30px"></div>
    </el-dialog>

    <el-dialog
            title="已录入的单号"
            width="700px"
            fullscreen
            :visible.sync="dialogTableVisible">
      <div>
        <span v-for="item in canNotUsedList">{{item.q_start}}~{{item.q_end}}, </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {validateThirteenNumber} from "@/utils/validate";
  import {addNumberApi, getNumberApi} from "@/api/number";

  export default {
    name: "ImportOrder",
    data() {
      return {
        /* 录入 */
        dialogTableVisible: false,

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
        /* 分批 */
        importDataList: [],
        importTimer: 0,
        timer: 0,
      }
    },
    computed: {
      percentage() {
        let timer = this.timer;
        let importTimer = this.importTimer;
        if (this.timer === 0) return 0;
        return Math.ceil(timer / importTimer * 100)
      }
    },
    props: {
      authority: {type: String},
      role: {type: Number},
      userId: {type: Number},
    },
    mounted() {
      this.getNumber(); // 获得已经录入过的区间
    },
    methods: {
      // 查看已录入的单号
      checkHadInputOrder() {
        this.dialogTableVisible = true
      },

      // 获得已经录入过的区间
      getNumber() {
        if (this.authority !== 'level' && this.authority !== 'level0') return;
        getNumberApi().then(result => { // 获得不可用区间
          this.canNotUsedList = result.data.message;
          this.isImportantLoading = false;
          this.importDataList = [];
          this.importTimer = 0;
          this.timer = 0;
        })
      },
      // 单号录入
      importOrder() {
        this.$refs['Form1'].validate((valid) => {
          if (valid) {
            this.$msgBox().then(() => {
              this.isImportantLoading = true;
              let data = {...this.form1};
              data.firstNumber = data.firstNumber / 1;
              data.endNumber = data.endNumber / 1;
              if (data.firstNumber > data.endNumber) {
                this.$errorMsg('结束号码不得小于开始号码');
                this.isImportantLoading = false;
                return;
              }
              if (data.endNumber - data.firstNumber > 30000) {
                this.$errorMsg('一次录入不得超过30000条');
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
              data.role = this.role;
              /* 分批请求 */
              let temp = (data.endNumber - data.firstNumber) / 500;
              let timer = Math.floor(temp);
              if (timer === 0) timer = 1;
              let start = data.firstNumber;
              let end = data.endNumber;
              for (let i = 0; i <= timer; i++) {
                let obj = {};
                obj.u_id = data.u_id;
                obj.role = data.role;
                if (i + 1 === timer) {
                  obj.firstNumber = start;
                  obj.endNumber = end;
                  this.importDataList.push(obj);
                  break
                }
                obj.firstNumber = start;
                obj.endNumber = start + 499;
                start = start + 500;
                this.importDataList.push(obj)
              }
              this.importTimer = this.importDataList.length - 1;
              this.startImport()
            })
          } else {
            return false;
          }
        });
      },

      // 开始导入
      startImport() {
        addNumberApi(this.importDataList[this.timer]).then(result => {
          if (result.data.status === 200 && this.timer < this.importTimer) {
            this.timer = this.timer + 1;
            this.startImport();
          } else {
            this.endImportSuccess();
          }
        }).catch(() => {
          this.endImportError();
        })
      },

      // 结束录入
      endImportSuccess() {
        this.$successMsg('录入完成');
        this.importTimer = 1;
        this.timer = 1;
        window.setTimeout(() => {
          Object.assign(this.$data.form1, this.$options.data().form1);
          this.$refs['Form1'].resetFields();
          this.getNumber();
          this.$emit('updateGiveSection');
          // this.importDataList = [];
          // this.importTimer = 0;
          // this.timer = 0;
        }, 1000)
      },

      // 结束录入
      endImportError() {
        this.$errorMsg('录入中发生错误，已终止');
        Object.assign(this.$data.form1, this.$options.data().form1);
        this.$refs['Form1'].resetFields();
        this.getNumber();
        this.$emit('updateGiveSection');
        this.importDataList = [];
        this.importTimer = 0;
        this.timer = 0;
      }
    }
  }
</script>

<style lang="scss">
  #import-order {

  }
</style>
