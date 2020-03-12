<template>
  <div id="had-allot-order-number">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        已分配单号列表
      </div>
      <div>
        <el-table
                v-loading="isWithdrawLoading"
                element-loading-text="拼命撤回中"
                :data="hadGivenList">
          <el-table-column prop="r_start" label="开始号码">
            <template slot-scope="scope">
              <span>{{addO(scope.row.r_start)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束号码">
            <template slot-scope="scope">
              <span>{{addO(scope.row.r_end)}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  prop="r_name"
                  label="网点名称">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="withdraw(scope.row)" size="mini">撤回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getHadGivenApi, withdrawApi} from '@/api/number'

  export default {
    name: "HadAllot",
    data() {
      return {
        hadGivenList: [],
        dialogTableVisible: false,
        isWithdrawLoading: false,
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
    },
    mounted() {
      this.getHadGiven()
    },
    methods: {
      withdraw(obj) {
        this.$msgBox().then(() => {
          let data = {};
          data.firstNumber = obj.r_start / 1;
          data.endNumber = obj.r_end / 1;
          data.u_id = this.userId;
          data.role = this.role;
          this.isWithdrawLoading = true;
          withdrawApi(data).then(() => {
            this.isWithdrawLoading = false;
            this.getHadGiven();
          })
        });
      },

      getHadGiven() {
        this.hadGivenList = [];
        let param = `u_id=${this.userId}&role=${this.role}`;
        getHadGivenApi(param).then(result => {
          this.hadGivenList = result.data.message
        })
      },
      // 补零函数
      addO(value) {
        value = value + '';
        while (value.length < 13) {
          value = '0' + value;
        }
        return value
      },
    }
  }
</script>

<style scoped>

</style>
