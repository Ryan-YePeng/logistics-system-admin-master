<template>
  <div id="had-allot-order-number">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        可撤回单号列表
      </div>
      <div>
        <el-table v-loading="isWithdrawLoading" :data="hadGivenList">
          <el-table-column
                  prop="start"
                  label="开始号码">
          </el-table-column>
          <el-table-column
                  prop="end"
                  label="结束号码">
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
  import {withdrawApi, getHadGivenApi} from '@/api/number'

  export default {
    name: "HadAllot",
    data() {
      return {
        hadGivenList: [],
        isWithdrawLoading: false
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
      withdraw() {
        // withdrawApi()
      },

      getHadGiven() {
        this.hadGivenList = [];
        let param = `u_id=${this.userId}&role=${this.role}`;
        this.isWithdrawLoading = true;
        getHadGivenApi(param).then(result => {
          let response = result.data.message;
          if (response.length === 0) {
            this.isWithdrawLoading = false;
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
          list.forEach(item => {
            item.start = this.addO(item.start);
            item.end = this.addO(item.end);
          });
          this.hadGivenList = list;
          this.isWithdrawLoading = false;
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
